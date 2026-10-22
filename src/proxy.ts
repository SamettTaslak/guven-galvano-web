import { NextResponse, type NextRequest } from 'next/server'

import { guardAuthEndpoint } from './lib/auth-guard'

type Rule = { to: string; status: 301 | 302 }

// Panelden girilen yönlendirmeler (SEO → Yönlendirmeler); her istekte veritabanına gitmemek için 60 sn önbellek.
const TTL = 60_000
let cache: { at: number; rules: Map<string, Rule> } | null = null
let inflight: Promise<Map<string, Rule>> | null = null

async function loadRules(origin: string): Promise<Map<string, Rule>> {
  if (cache && Date.now() - cache.at < TTL) return cache.rules
  inflight ??= (async () => {
    try {
      const res = await fetch(`${origin}/api/redirects?limit=0&pagination=false&depth=0`, { signal: AbortSignal.timeout(3000) })
      const json = (await res.json()) as { docs?: { from: string; to: string; type?: string }[] }
      const rules = new Map((json.docs ?? []).map((d) => [d.from, { to: d.to, status: d.type === '302' ? 302 : 301 } as Rule]))
      cache = { at: Date.now(), rules }
      return rules
    } catch {
      return cache?.rules ?? new Map() // API erişilemezse siteyi bozma
    } finally {
      inflight = null
    }
  })()
  return inflight
}

const normalize = (pathname: string, search: string) => {
  let p = decodeURIComponent(pathname).toLowerCase()
  if (p.length > 1) p = p.replace(/\/+$/, '')
  return { path: p, withQuery: `${p}${search.toLowerCase()}` }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // 0) Panel giriş uçları: IP sınırı + parola kuralı; diğer API istekleri olduğu gibi geçer.
  if (pathname.startsWith('/api/')) return (await guardAuthEndpoint(request)) ?? NextResponse.next()

  // 1) Elle tanımlı yönlendirmeler (sorgu dizesiyle tam eşleşme önce, sonra yalnız yol)
  const rules = await loadRules(request.nextUrl.origin)
  if (rules.size) {
    const { path, withQuery } = normalize(pathname, search)
    const rule = rules.get(withQuery) ?? rules.get(path)
    if (rule) return NextResponse.redirect(new URL(rule.to, request.url), rule.status)
  }

  // 2) Uzantılı dosyalar (robots.txt, sitemap.xml, görseller) olduğu gibi geçer
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next()

  // 3) Dil öneki yoksa /tr altına
  const first = pathname.split('/')[1] ?? ''
  if (first === 'tr' || first === 'en') return NextResponse.next()
  const url = request.nextUrl.clone()
  url.pathname = `/tr${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // panel, API, Next iç dosyaları ve marka dosyaları hariç her şey (eski sitenin .php/.html adresleri dahil)
  matcher: ['/((?!admin|api|_next|brand/).*)', '/api/users/:path*'],
}
