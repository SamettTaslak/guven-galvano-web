import type { SEOPluginConfig } from '@payloadcms/plugin-seo/types'

import { BRAND_NAME } from './brand'
import { routes } from './i18n'

const siteUrl = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
const idOf = (v: unknown): number | string | null =>
  v == null ? null : typeof v === 'object' && 'id' in (v as object) ? (v as { id: number }).id : (v as number)

const GLOBAL_PATHS: Record<string, string> = {
  'home-page': routes.home,
  'about-page': routes.about,
  'products-page': routes.products,
  'partners-page': routes.partners,
  'contact-page': routes.contact,
  'privacy-page': routes.privacy,
}

/** Google başlıkları ~60 karakterde kesilir. */
const clamp = (text: string, max: number) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`)

/** Panelde "Otomatik doldur" butonlarının önerileri ve Google önizlemesindeki adres. */
export const seoPluginConfig: SEOPluginConfig = {
  collections: ['products', 'product-categories'],
  globals: Object.keys(GLOBAL_PATHS),
  uploadsCollection: 'media',
  tabbedUI: true,
  generateTitle: ({ doc }) => {
    const base = doc?.name || doc?.hero?.title || doc?.title || doc?.heroTitle || ''
    return clamp(base ? `${base} | ${BRAND_NAME}` : BRAND_NAME, 60)
  },
  generateDescription: ({ doc }) =>
    clamp(String(doc?.summary || doc?.hero?.subtitle || doc?.intro || doc?.heroSubtitle || doc?.catalog?.description || ''), 150),
  generateImage: ({ doc }) =>
    (idOf(doc?.coverImage) ?? idOf(doc?.image) ?? idOf(doc?.hero?.image) ?? idOf(doc?.slides?.[0]?.image) ?? '') as string,
  generateURL: ({ doc, collectionConfig, globalConfig, locale }) => {
    const l = locale || 'tr'
    if (collectionConfig?.slug === 'products') return `${siteUrl()}/${l}${routes.products}/${doc?.slug ?? ''}`
    if (collectionConfig?.slug === 'product-categories') return `${siteUrl()}/${l}${routes.catalog}?grup=${doc?.slug ?? ''}`
    return `${siteUrl()}/${l}${GLOBAL_PATHS[globalConfig?.slug ?? ''] ?? ''}`
  },
}
