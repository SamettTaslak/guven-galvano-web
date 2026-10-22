import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Fragment } from 'react'

import { HeroSlider } from '@/components/home/HeroSlider'
import { ScrollGallery } from '@/components/home/ScrollGallery'
import { ShowcaseBand } from '@/components/home/ShowcaseBand'
import type { TradeRoute } from '@/components/home/TradeMap'
import { MediaImage } from '@/components/MediaImage'
import { CountUp, Reveal } from '@/components/motion/Reveal'
import { PartnerMarquee } from '@/components/PartnerMarquee'
import { CategoryTile } from '@/components/products/CategoryTile'
import { ProductCard } from '@/components/products/ProductCard'
import { BRAND_NAME } from '@/lib/brand'
import { type HomeSectionKey, resolveHomeOrder } from '@/lib/home-sections'
import { getDictionary, href, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, asMediaList, getGlobal, getPayloadClient, getSettings } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

// Asimetrik mozaik: 1. ve 4. karo geniş.
const tileSpan = [
  'min-w-0 md:col-span-7 aspect-[16/11]',
  'min-w-0 md:col-span-5 aspect-[4/5] md:aspect-auto',
  'min-w-0 md:col-span-5 aspect-[4/5] md:aspect-auto',
  'min-w-0 md:col-span-7 aspect-[16/11]',
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const [home, settings] = await Promise.all([getGlobal('home-page', locale), getSettings(locale)])
  return buildMetadata({
    locale,
    path: routes.home,
    meta: home.meta,
    title: settings.siteName || BRAND_NAME,
    description: home.heroSubtitle || settings.tagline,
    image: asMedia(home.slides?.[0]?.image),
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const payload = await getPayloadClient()

  const [home, categories, partners, featured] = await Promise.all([
    getGlobal('home-page', locale),
    payload.find({ collection: 'product-categories', locale, limit: 6, depth: 1, sort: 'order' }),
    payload.find({ collection: 'partners', locale, limit: 40, depth: 1, sort: 'order' }),
    payload.find({
      collection: 'products',
      locale,
      where: { and: [{ featured: { equals: true } }, { isActive: { equals: true } }] },
      limit: 8,
      depth: 1,
      sort: 'order',
    }),
  ])

  const slides = (home.slides ?? []).map((s) => ({
    image: asMedia(s.image),
    video: asMedia(s.video),
    caption: s.caption,
  }))
  const routesData: TradeRoute[] = (home.routes ?? []).map((r) => ({
    label: r.label,
    lat: r.lat,
    lng: r.lng,
    direction: r.direction,
  }))

  // Slider altındaki bölümler; sıra ve görünürlük panelden (Ana Sayfa → Bölümler → Bölüm sırası).
  const sections: Record<HomeSectionKey, React.ReactNode> = {
    partners: (
      <>
        {!!partners.docs.length && (
          <section className="py-24 md:py-32">
            <Reveal className="container-x mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 className="h-display text-4xl md:text-5xl">{home.partnersSection?.title}</h2>
              <Link
                href={href(locale, routes.partners)}
                className="group inline-flex items-center gap-2 font-display font-semibold"
              >
                {t.nav.partners}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </Reveal>
            <PartnerMarquee partners={partners.docs} />
          </section>
        )}
      </>
    ),
    stats: (
      <>
        {!!home.stats?.length && (
          <section className="bg-metal relative text-white">
            <div aria-hidden className="brand-rule absolute inset-x-0 top-0" />
            <div className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
              {home.stats.map((s, i) => (
                <Reveal key={s.id ?? i} delay={i * 0.1} className="px-2 py-12 text-center md:py-16">
                  <p className="h-display whitespace-nowrap text-4xl text-white sm:text-5xl lg:text-7xl">
                    <CountUp value={s.value} suffix={s.suffix ?? ''} />
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-brand-300">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </>
    ),
    categories: (
      <>
        {!!categories.docs.length && (
          <section className="container-x py-24 md:py-32">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <p className="eyebrow mb-3">{home.categoriesSection?.subtitle}</p>
                <h2 className="h-display text-4xl md:text-6xl">{home.categoriesSection?.title}</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link
                  href={href(locale, routes.products)}
                  className="group inline-flex items-center gap-2 font-display font-semibold"
                >
                  {t.allProducts}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
            <div className="grid gap-5 md:grid-cols-12 md:auto-rows-[minmax(0,1fr)]">
              {categories.docs.map((c, i) => (
                <Reveal key={c.id} delay={(i % 2) * 0.1} className={tileSpan[i % 4]}>
                  <CategoryTile
                    category={c}
                    index={i}
                    className="h-full min-h-[320px]"
                    link={href(locale, `${routes.catalog}?grup=${c.slug}`)}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </>
    ),
    featured: (
      <>
        {!!featured.docs.length && (
          <section className="bg-steel-100/60 py-24 md:py-32">
            <div className="container-x">
              <Reveal className="mb-12">
                {home.featuredSection?.subtitle && (
                  <p className="eyebrow mb-3">{home.featuredSection.subtitle}</p>
                )}
                <h2 className="h-display text-4xl md:text-6xl">
                  {home.featuredSection?.title || t.featured}
                </h2>
              </Reveal>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featured.docs.map((p, i) => (
                  <Reveal as="li" key={p.id} delay={(i % 4) * 0.08} y={30}>
                    <ProductCard product={p} locale={locale} t={t} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}
      </>
    ),
    showcase: (
      <>
        <ShowcaseBand
          image={asMedia(home.showcase?.image)}
          video={asMedia(home.showcase?.video)}
          title={home.showcase?.title}
          subtitle={home.showcase?.subtitle}
          playLabel={t.play}
        />
      </>
    ),
    gallery: (
      <>
        <ScrollGallery title={home.gallery?.title} images={asMediaList(home.gallery?.images)} />
      </>
    ),
    cta: (
      <>
        <section className="container-x py-16 md:py-24">
          <Reveal className="relative overflow-hidden rounded-3xl bg-ink-900 text-white">
            <div className="absolute inset-0">
              <MediaImage media={asMedia(home.cta?.image)} size="wide" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-brand-800/60 to-brand-700/10" />
            <div className="relative flex min-h-[420px] flex-col items-start justify-center gap-8 p-8 md:p-16">
              <h2 className="h-display max-w-xl text-4xl md:text-6xl">{home.cta?.title}</h2>
              <Link href={href(locale, routes.products)} className="btn-brand">
                {home.cta?.buttonLabel || t.browseProducts}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </>
    ),
  }
  const order = resolveHomeOrder(home.layout)

  return (
    <>
      <HeroSlider
        title={home.heroTitle || BRAND_NAME.toLocaleUpperCase('tr-TR')}
        subtitle={home.heroSubtitle}
        slides={slides.length ? slides : [{ image: null, video: null }]}
        hub={{ lat: home.hubLat ?? 40.77, lng: home.hubLng ?? 29.94, name: home.hubName }}
        routes={routesData}
        labels={{ import: t.import, export: t.export, scroll: t.scroll }}
      />

      <div id="content">
        {order.map((key) => (
          <Fragment key={key}>{sections[key]}</Fragment>
        ))}
      </div>
    </>
  )
}
