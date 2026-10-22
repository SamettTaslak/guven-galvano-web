import type { Metadata } from 'next'

import { mediaUrl } from '@/components/MediaImage'
import type { Media } from '@/payload-types'
import { BRAND_NAME } from './brand'
import { type Locale, locales } from './i18n'
import { asMediaClient } from './media-client'

export const siteUrl = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${siteUrl()}${path.startsWith('/') ? '' : '/'}${path}`)

type Meta = { title?: string | null; description?: string | null; image?: unknown } | null | undefined

/**
 * Sayfa meta etiketleri. Öncelik: panelde girilen SEO alanları → sayfa içeriğinden yedek değerler.
 * `path` dil öneki olmadan verilir (ör. "/urunler/nikel-sulfat"); hreflang her iki dil için üretilir.
 */
export function buildMetadata({
  locale,
  path,
  meta,
  title,
  description,
  image,
  noindex,
  siteName = BRAND_NAME,
  type = 'website',
}: {
  locale: Locale
  path: string
  meta?: Meta
  title?: string | null
  description?: string | null
  image?: Media | null
  noindex?: boolean
  siteName?: string
  type?: 'website' | 'article'
}): Metadata {
  const metaImage = asMediaClient(meta?.image) ?? image ?? null
  const imgUrl = mediaUrl(metaImage, 'wide') ?? `/brand/logo-dark.png`
  const desc = (meta?.description || description || '').trim() || undefined
  const url = `${siteUrl()}/${locale}${path}`

  return {
    // Panelde SEO başlığı girildiyse olduğu gibi kullanılır (marka eki dahil); değilse şablon uygulanır.
    title: meta?.title ? { absolute: meta.title } : (title ?? undefined),
    description: desc,
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `${siteUrl()}/${l}${path}`])), 'x-default': `${siteUrl()}/tr${path}` },
    },
    openGraph: {
      type,
      url,
      siteName,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: locale === 'tr' ? ['en_US'] : ['tr_TR'],
      title: meta?.title || title || siteName,
      description: desc,
      images: [{ url: absoluteUrl(imgUrl), width: metaImage?.width ?? undefined, height: metaImage?.height ?? undefined, alt: metaImage?.alt ?? siteName }],
    },
    twitter: { card: 'summary_large_image', title: meta?.title || title || siteName, description: desc, images: [absoluteUrl(imgUrl)] },
    robots: noindex ? { index: false, follow: true } : undefined,
  }
}

/** schema.org yapısal veri; "<" kaçışı ile script enjeksiyonuna kapalı. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export const breadcrumbLd = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.url) })),
})
