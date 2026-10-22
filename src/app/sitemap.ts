import type { MetadataRoute } from 'next'

import { locales, routes } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** /sitemap.xml — tüm sayfalar ve aktif ürünler, iki dilde (hreflang alternatifleriyle). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const products = await payload.find({
    collection: 'products',
    where: { isActive: { equals: true } },
    limit: 1000,
    depth: 0,
    select: { slug: true, updatedAt: true },
  })
  const categories = await payload.find({
    collection: 'product-categories',
    pagination: false,
    depth: 0,
    select: { slug: true, updatedAt: true },
  })

  const entry = (path: string, lastModified?: string, priority = 0.7): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}/tr${path}`,
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])) },
  })

  return [
    entry(routes.home, undefined, 1),
    entry(routes.about),
    entry(routes.products, undefined, 0.9),
    entry(routes.partners),
    entry(routes.contact),
    entry(routes.privacy, undefined, 0.3),
    entry(routes.catalog, undefined, 0.8),
    ...categories.docs.filter((c) => c.slug).map((c) => entry(routes.catalog + '?grup=' + c.slug, c.updatedAt, 0.8)),
    ...products.docs.filter((p) => p.slug).map((p) => entry(`${routes.products}/${p.slug}`, p.updatedAt, 0.8)),
  ]
}
