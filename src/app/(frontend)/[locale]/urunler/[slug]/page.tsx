import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowLeft, FileText } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { cache } from 'react'

import { QuickAdd } from '@/components/catalog/QuickAdd'
import { mediaUrl } from '@/components/MediaImage'
import { Reveal } from '@/components/motion/Reveal'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductGallery } from '@/components/products/ProductGallery'
import { WhatsappIcon } from '@/components/WhatsappButton'
import { BRAND_NAME } from '@/lib/brand'
import { formatFormula } from '@/lib/chem'
import { type Locale, getDictionary, href, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, asMediaList, getPayloadClient, getSettings } from '@/lib/payload'
import { JsonLd, absoluteUrl, breadcrumbLd, buildMetadata } from '@/lib/seo'
import { documentRequestHref, normalizeWhatsapp } from '@/lib/whatsapp'
import type { Process, ProductCategory } from '@/payload-types'

const getProduct = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    locale,
    where: { and: [{ slug: { equals: slug } }, { isActive: { equals: true } }] },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
})

/** Eski adresi (previousSlugs) bu olan aktif ürünün güncel adresi. */
const findMovedProduct = async (slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    where: { and: [{ previousSlugs: { in: [slug] } }, { isActive: { equals: true } }] },
    limit: 1,
    depth: 0,
    select: { slug: true },
  })
  return res.docs[0]?.slug ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const { slug } = await params
  const product = await getProduct(slug, locale)
  if (!product) return {}
  return buildMetadata({
    locale,
    path: `${routes.products}/${product.slug}`,
    meta: product.meta,
    title: product.name,
    description: product.summary,
    image: asMedia(product.coverImage),
  })
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const locale = await resolveLocale(params)
  const { slug } = await params
  const t = getDictionary(locale)
  const product = await getProduct(slug, locale)
  if (!product) {
    // Adresi değiştirilmiş ürün: eski bağlantıları kalıcı olarak yeni adrese yönlendir.
    const moved = await findMovedProduct(slug)
    if (moved) permanentRedirect(href(locale, `${routes.products}/${moved}`))
    notFound()
  }

  const category = typeof product.category === 'object' ? (product.category as ProductCategory) : null
  const processes = (product.processes ?? []).filter((p): p is Process => typeof p === 'object')
  const settings = await getSettings(locale)
  const wa = normalizeWhatsapp(settings.whatsappNumber)
  const doc = documentRequestHref(locale, wa, { name: product.name, cas: product.cas })
  const cover = asMedia(product.coverImage)
  const images = [cover, ...asMediaList(product.gallery)].filter(Boolean) as NonNullable<typeof cover>[]

  const payload = await getPayloadClient()
  const related = category
    ? await payload.find({
        collection: 'products',
        locale,
        where: { and: [{ category: { equals: category.id } }, { id: { not_equals: product.id } }, { isActive: { equals: true } }] },
        limit: 4,
        depth: 1,
        sort: 'order',
      })
    : null

  // Yapısal veri: Google ürün bilgisini ve sayfa yolunu (breadcrumb) anlasın.
  const productPath = href(locale, `${routes.products}/${product.slug}`)
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.meta?.description || product.summary || undefined,
    sku: product.code || undefined,
    image: images.map((m) => absoluteUrl(mediaUrl(m, 'wide') ?? '')).filter(Boolean),
    url: absoluteUrl(productPath),
    category: category?.name,
    brand: { '@type': 'Brand', name: settings.siteName || BRAND_NAME },
    countryOfOrigin: product.origin || undefined,
    additionalProperty: [
      product.cas && { '@type': 'PropertyValue', name: 'CAS', value: product.cas },
      product.formula && { '@type': 'PropertyValue', name: 'Formula', value: product.formula },
      ...(product.specs ?? []).map((sp) => ({ '@type': 'PropertyValue', name: sp.label, value: sp.value })),
    ].filter(Boolean),
  }
  const crumbs = breadcrumbLd([
    { name: t.nav.home, url: href(locale) },
    { name: t.nav.products, url: href(locale, routes.products) },
    ...(category ? [{ name: category.name, url: href(locale, `${routes.catalog}?grup=${category.slug}`) }] : []),
    { name: product.name, url: productPath },
  ])

  return (
    <>
      <JsonLd data={[productLd, crumbs]} />
      <div className="h-24 bg-ink-950" />
      <section className="container-x grid gap-12 py-12 lg:grid-cols-2 lg:gap-20 lg:py-20">
        <Reveal>
          <ProductGallery images={images} name={product.name} />
        </Reveal>

        <div>
          <Reveal>
            <Link
              href={category ? href(locale, `${routes.catalog}?grup=${category.slug}`) : href(locale, routes.products)}
              className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-steel-500 hover:text-ink-900"
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              {category?.name ?? t.nav.products}
            </Link>
            <h1 className="h-display text-4xl md:text-6xl">{product.name}</h1>
            {(product.cas || product.formula) && (
              <p className="mt-4 font-mono text-sm text-steel-500">
                {product.cas && <>CAS: {product.cas}</>}
                {product.cas && product.formula && ' · '}
                {product.formula && formatFormula(product.formula)}
              </p>
            )}
            {!!processes.length && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {processes.map((pr) => (
                  <Link
                    key={pr.id}
                    href={href(locale, `${routes.catalog}?proses=${pr.slug}`)}
                    className="rounded bg-steel-100 px-2.5 py-1 font-mono text-[11px] text-ink-700 transition hover:bg-brand-500 hover:text-white"
                  >
                    {pr.name}
                  </Link>
                ))}
              </div>
            )}
            {product.summary && <p className="mt-6 text-lg leading-relaxed text-steel-500">{product.summary}</p>}
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <QuickAdd
              item={{ id: product.id, slug: product.slug ?? '', name: product.name, image: mediaUrl(cover, 'thumb'), unit: product.unit ?? 'kg' }}
              unitLabel={product.unit === 'pcs' ? (locale === 'tr' ? 'adet' : 'pcs') : (product.unit ?? 'kg')}
              label={t.catalog.addToQuote}
              addedLabel={t.added}
            />
            <a
              href={doc.href}
              {...(doc.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center gap-2 rounded-lg border border-steel-300/70 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-ink-800 transition hover:border-brand-500 hover:text-brand-600"
            >
              {wa ? <WhatsappIcon className="h-4 w-4 text-[#25d366]" /> : <FileText className="h-4 w-4" />}
              {t.catalog.docs} · {t.catalog.requestDoc}
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 divide-y divide-steel-300/50 border-y border-steel-300/50">
              {product.code && (
                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-steel-500">{t.code}</dt>
                  <dd className="font-display font-semibold">{product.code}</dd>
                </div>
              )}
              {product.origin && (
                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-steel-500">{t.origin}</dt>
                  <dd className="font-display font-semibold">{product.origin}</dd>
                </div>
              )}
              {product.specs?.map((s) => (
                <div key={s.id} className="flex justify-between gap-6 py-4">
                  <dt className="text-sm text-steel-500">{s.label}</dt>
                  <dd className="text-right font-display font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {!!product.packaging?.length && (
            <Reveal delay={0.2} className="mt-10">
              <p className="eyebrow mb-4">{t.packaging}</p>
              <ul className="flex flex-wrap gap-2">
                {product.packaging.map((p) => (
                  <li key={p.id} className="rounded-full border border-steel-300/60 bg-white px-4 py-2 text-sm font-medium">
                    {p.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {product.description && (
            <Reveal delay={0.25} className="prose-sm mt-10 max-w-none space-y-4 leading-relaxed text-ink-700 [&_a]:text-brand-600 [&_h2]:font-display [&_h2]:text-2xl [&_h3]:font-display [&_h3]:text-xl [&_ul]:list-disc [&_ul]:pl-5">
              <RichText data={product.description} />
            </Reveal>
          )}
        </div>
      </section>

      {!!related?.docs.length && (
        <section className="container-x pb-24">
          <Reveal>
            <h2 className="h-display mb-8 text-3xl">{t.related}</h2>
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.docs.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.06}>
                <ProductCard product={p} locale={locale} t={t} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
