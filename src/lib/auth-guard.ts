import { NextResponse, type NextRequest } from 'next/server'

import { getClientIp } from './client-ip'
import { checkPassword } from './password-policy'

/**
 * Panel kimlik doğrulama uçları için proxy katmanı koruması:
 *  - IP başına deneme sınırı (Payload'ın hesap başına kilidine ek olarak; farklı e-postalarla denemeyi de keser)
 *  - Şifre sıfırlama / ilk kullanıcı kaydında parola kuralı (Payload bu akışta kullanıcı kancalarını çağırmıyor)
 * Bellek içi sayaç tek konteyner için yeterlidir; birden fazla sunucuda Redis gibi ortak bir depo gerekir.
 */
type Rule = { limit: number; windowMs: number }
const RULES: Record<string, Rule> = {
  login: { limit: 10, windowMs: 15 * 60_000 },
  'forgot-password': { limit: 5, windowMs: 60 * 60_000 },
  'reset-password': { limit: 10, windowMs: 60 * 60_000 },
  'first-register': { limit: 5, windowMs: 60 * 60_000 },
}
const hits = new Map<string, number[]>()

const json = (status: number, message: string, headers: Record<string, string> = {}) =>
  NextResponse.json({ errors: [{ message }] }, { status, headers })

async function readPassword(req: NextRequest): Promise<{ password?: unknown; email?: string } | null> {
  try {
    const type = req.headers.get('content-type') ?? ''
    if (type.includes('application/json')) return (await req.clone().json()) as { password?: unknown; email?: string }
    if (type.includes('form')) {
      const form = await req.clone().formData()
      const raw = form.get('_payload')
      if (typeof raw === 'string') return JSON.parse(raw)
      return { password: form.get('password'), email: String(form.get('email') ?? '') }
    }
  } catch {
    /* gövde okunamazsa Payload kendi doğrulamasını yapar */
  }
  return null
}

/** Korunan bir uçsa yanıt (429/400) döner; değilse null (istek Payload'a geçer). */
export async function guardAuthEndpoint(req: NextRequest): Promise<NextResponse | null> {
  if (req.method !== 'POST') return null
  const action = req.nextUrl.pathname.match(/^\/api\/users\/(login|forgot-password|reset-password|first-register)\/?$/)?.[1]
  if (!action) return null

  const rule = RULES[action]
  const key = `${action}:${getClientIp(req.headers)}`
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < rule.windowMs)
  if (recent.length >= rule.limit) {
    const retry = Math.ceil((rule.windowMs - (now - recent[0])) / 1000)
    return json(429, `Çok fazla deneme yapıldı. Lütfen ${Math.ceil(retry / 60)} dakika sonra tekrar deneyin.`, { 'Retry-After': String(retry) })
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 10_000) for (const [k, v] of hits) if (!v.some((t) => now - t < 60 * 60_000)) hits.delete(k)

  if (action === 'reset-password' || action === 'first-register') {
    const body = await readPassword(req)
    if (body?.password !== undefined) {
      const problem = checkPassword(body.password, body.email)
      if (problem) return json(400, problem)
    }
  }
  return null
}
