import type { Payload } from 'payload'

export type Severity = 'error' | 'warning' | 'info'
export type Issue = { severity: Severity; area: string; item: string; problem: string; fix: string; editUrl: string }

const LOCALES = ['tr', 'en'] as const
const TITLE_MAX = 60
const DESC_MIN = 100
const DESC_MAX = 150

const GLOBALS: { slug: 'home-page' | 'about-page' | 'products-page' | 'partners-page' | 'contact-page' | 'privacy-page'; name: string; desc: (d: any) => string | undefined }[] = [
  { slug: 'home-page', name: 'Ana Sayfa', desc: (d) => d.heroSubtitle },
  { slug: 'about-page', name: 'Hakkımızda', desc: (d) => d.intro || d.hero?.subtitle },
  { slug: 'products-page', name: 'Ürünlerimiz', desc: (d) => d.hero?.subtitle || d.catalog?.description },
  { slug: 'partners-page', name: 'Çalıştığımız Firmalar', desc: (d) => d.hero?.subtitle },
  { slug: 'contact-page', name: 'İletişim', desc: (d) => d.hero?.subtitle },
  { slug: 'privacy-page', name: 'KVKK / Gizlilik', desc: () => undefined },
]

const lang = (l: string) => (l === 'tr' ? 'TR' : 'EN')

/** Başlık / açıklama uzunluğu ve eksiklik kontrolleri (bir kayıt + dil için). */
function checkMeta(
  issues: Issue[],
  ctx: { area: string; item: string; editUrl: string; locale: string },
  meta: { title?: string | null; description?: string | null } | null | undefined,
  fallbackDescription: string | null | undefined,
) {
  const L = lang(ctx.locale)
  const title = meta?.title?.trim()
  const desc = (meta?.description || fallbackDescription || '').trim()
  if (title && title.length > TITLE_MAX)
    issues.push({ ...ctx, severity: 'warning', problem: `${L} SEO başlığı ${title.length} karakter (önerilen ≤ ${TITLE_MAX})`, fix: 'SEO sekmesinde başlığı kısaltın; Google uzun başlıkları keser.' })
  if (!desc)
    issues.push({ ...ctx, severity: 'error', problem: `${L} açıklama yok`, fix: 'SEO sekmesinde açıklama yazın ya da "Otomatik doldur"u kullanın.' })
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX)
    issues.push({ ...ctx, severity: 'warning', problem: `${L} açıklama ${desc.length} karakter (önerilen ${DESC_MIN}–${DESC_MAX})`, fix: 'Ürünü/sayfayı özetleyen 1–2 cümlelik bir SEO açıklaması girin.' })
  else if (!meta?.description)
    issues.push({ ...ctx, severity: 'info', problem: `${L} SEO açıklaması boş — kısa açıklama kullanılıyor`, fix: 'İsterseniz aramalara özel bir açıklama yazabilirsiniz.' })
}

/** Tüm site içeriğini SEO açısından tarar. */
export async function runSeoAudit(payload: Payload): Promise<Issue[]> {
  const issues: Issue[] = []
  const admin = '/admin'

  // Sunucu adresi
  const server = process.env.NEXT_PUBLIC_SERVER_URL || ''
  if (!server || /localhost|127\.0\.0\.1/.test(server))
    issues.push({
      severity: process.env.NODE_ENV === 'production' ? 'error' : 'info',
      area: 'Sistem',
      item: 'NEXT_PUBLIC_SERVER_URL',
      problem: `Site adresi "${server || 'tanımsız'}" — kanonik adresler ve sitemap bu adresi kullanır`,
      fix: 'Yayında .env içinde gerçek alan adını yazın (ör. https://www.firma.com).',
      editUrl: `${admin}/seo-kontrol`,
    })

  // Ürünler
  const titles = new Map<string, string[]>()
  for (const locale of LOCALES) {
    const products = await payload.find({ collection: 'products', locale, fallbackLocale: false as never, pagination: false, depth: 1 })
    for (const p of products.docs) {
      const ctx = { area: 'Ürünler', item: p.name || `#${p.id}`, editUrl: `${admin}/collections/products/${p.id}`, locale }
      if (!p.isActive) continue
      if (!p.name) {
        issues.push({ ...ctx, item: `#${p.id} (${p.slug})`, severity: 'warning', problem: `${lang(locale)} ürün adı yok`, fix: 'Sağ üstteki dil seçiciden İngilizce’ye geçip ürün adını girin.' })
        continue
      }
      checkMeta(issues, ctx, p.meta, p.summary)
      if (locale === 'tr') {
        const cover = typeof p.coverImage === 'object' ? p.coverImage : null
        if (!cover) issues.push({ ...ctx, severity: 'error', problem: 'Ana görsel yok', fix: 'Görseller sekmesinden ana görsel ekleyin (paylaşım kartlarında da kullanılır).' })
        if (!p.cas && p.code !== 'GK-BLK-14') issues.push({ ...ctx, severity: 'info', problem: 'CAS numarası yok', fix: 'Kimyasal ürünlerde CAS ile arama yapan alıcılar sizi daha kolay bulur.' })
        const key = (p.meta?.title || p.name).toLocaleLowerCase('tr')
        titles.set(key, [...(titles.get(key) ?? []), p.name])
      }
    }
  }
  for (const [title, names] of titles)
    if (names.length > 1)
      issues.push({ severity: 'warning', area: 'Ürünler', item: names.join(', '), problem: `Aynı başlık birden fazla üründe: "${title}"`, fix: 'Her ürünün başlığı benzersiz olmalı.', editUrl: `${admin}/collections/products` })

  // Kategoriler
  for (const locale of LOCALES) {
    const cats = await payload.find({ collection: 'product-categories', locale, fallbackLocale: false as never, pagination: false, depth: 0 })
    for (const c of cats.docs) {
      const ctx = { area: 'Kategoriler', item: c.name || `#${c.id}`, editUrl: `${admin}/collections/product-categories/${c.id}`, locale }
      if (!c.name) {
        issues.push({ ...ctx, item: `#${c.id} (${c.slug})`, severity: 'warning', problem: `${lang(locale)} kategori adı yok`, fix: 'İngilizce’ye geçip kategori adını girin.' })
        continue
      }
      checkMeta(issues, ctx, c.meta, c.summary)
      if (locale === 'tr' && !c.image) issues.push({ ...ctx, severity: 'warning', problem: 'Kapak görseli yok', fix: 'Kategori kapak görseli ekleyin.' })
    }
  }

  // Sayfalar
  for (const g of GLOBALS) {
    for (const locale of LOCALES) {
      const doc = (await payload.findGlobal({ slug: g.slug, locale, fallbackLocale: false as never, depth: 0 })) as any
      checkMeta(issues, { area: 'Sayfalar', item: g.name, editUrl: `${admin}/globals/${g.slug}`, locale }, doc.meta, g.desc(doc))
    }
  }

  // Görsellerin alternatif metinleri
  const media = await payload.find({ collection: 'media', locale: 'tr', fallbackLocale: false as never, pagination: false, depth: 0, select: { alt: true, filename: true, mimeType: true } })
  for (const m of media.docs) {
    if (m.mimeType?.startsWith('image/') && !m.alt?.trim())
      issues.push({ severity: 'warning', area: 'Görseller', item: m.filename ?? `#${m.id}`, problem: 'Alternatif metin (alt) yok', fix: 'Görseli kısaca tarif edin; Google Görseller ve erişilebilirlik için gerekli.', editUrl: `${admin}/collections/media/${m.id}` })
  }

  // Bilgi: adresi değişmiş kayıtlar (otomatik yönlendiriliyor)
  for (const collection of ['products', 'product-categories', 'processes'] as const) {
    const moved = await payload.find({ collection, where: { previousSlugs: { exists: true } }, pagination: false, depth: 0, select: { slug: true, previousSlugs: true } })
    for (const d of moved.docs) {
      if (!d.previousSlugs?.length) continue
      issues.push({
        severity: 'info',
        area: 'Yönlendirmeler',
        item: d.slug ?? `#${d.id}`,
        problem: `Eski adres(ler): ${d.previousSlugs.join(', ')} → otomatik 301 yönlendiriliyor`,
        fix: 'İşlem gerekmez. Google Search Console’da yeni adresin dizinlendiğini kontrol edebilirsiniz.',
        editUrl: `${admin}/collections/${collection}/${d.id}`,
      })
    }
  }

  const order: Record<Severity, number> = { error: 0, warning: 1, info: 2 }
  return issues.sort((a, b) => order[a.severity] - order[b.severity])
}
