import { Clock, Globe, Handshake, ShieldCheck, Ship, Warehouse } from 'lucide-react'
import type { Metadata } from 'next'

import { Gallery } from '@/components/Lightbox'
import { MediaImage } from '@/components/MediaImage'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/PageHero'
import { type Locale, getDictionary, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, asMediaList, getGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

const icons = { globe: Globe, ship: Ship, warehouse: Warehouse, handshake: Handshake, shield: ShieldCheck, clock: Clock }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const page = await getGlobal('about-page', locale)
  return buildMetadata({
    locale,
    path: routes.about,
    meta: page.meta,
    title: page.hero?.title || getDictionary(locale).nav.about,
    description: page.intro || page.hero?.subtitle,
    image: asMedia(page.hero?.image),
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const page = await getGlobal('about-page', locale)

  return (
    <>
      <PageHero image={asMedia(page.hero?.image)} title={page.hero?.title || t.nav.about} subtitle={page.hero?.subtitle} eyebrow={t.nav.about} />

      {page.intro && (
        <section className="container-x py-24 md:py-36">
          <Reveal>
            <p className="h-display max-w-5xl text-3xl leading-tight text-ink-900 md:text-5xl">
              {page.intro}
            </p>
          </Reveal>
        </section>
      )}

      {/* Hikâye blokları: görsel ve metin dönüşümlü */}
      <section className="container-x space-y-24 pb-24 md:space-y-36 md:pb-36">
        {page.story?.map((block, i) => (
          <div key={block.id ?? i} className="grid items-center gap-10 md:grid-cols-12">
            <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-3xl md:col-span-7 ${i % 2 ? 'md:order-2' : ''}`}>
              <MediaImage media={asMedia(block.image)} size="wide" sizes="(min-width:768px) 60vw, 100vw" />
            </Reveal>
            <Reveal delay={0.15} className={`md:col-span-5 ${i % 2 ? 'md:order-1 md:pr-8' : 'md:pl-8'}`}>
              <span className="font-display text-7xl font-bold text-steel-100">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="h-display -mt-6 text-3xl md:text-4xl">{block.title}</h2>
              {block.text && <p className="mt-5 text-lg leading-relaxed text-steel-500">{block.text}</p>}
            </Reveal>
          </div>
        ))}
      </section>

      {/* Değerler */}
      {!!page.values?.length && (
        <section className="bg-metal py-24 text-white md:py-32">
          <div className="container-x grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {page.values.map((v, i) => {
              const Icon = icons[(v.icon ?? 'globe') as keyof typeof icons] ?? Globe
              return (
                <Reveal key={v.id ?? i} delay={i * 0.08} className="group bg-ink-900 p-8 transition hover:bg-ink-800 md:p-10">
                  <Icon className="h-10 w-10 text-brand-400 transition duration-500 group-hover:scale-110" strokeWidth={1.4} />
                  <h3 className="mt-8 font-display text-xl font-semibold">{v.title}</h3>
                  {v.text && <p className="mt-2 text-sm text-white/60">{v.text}</p>}
                </Reveal>
              )
            })}
          </div>
        </section>
      )}

      {/* Zaman çizelgesi */}
      {!!page.timeline?.length && (
        <section className="container-x py-24 md:py-32">
          <ol className="relative grid gap-10 border-l border-steel-300/60 pl-8 md:grid-flow-col md:auto-cols-fr md:border-l-0 md:border-t md:pl-0 md:pt-10">
            {page.timeline.map((item, i) => (
              <Reveal as="li" key={item.id ?? i} delay={i * 0.1} className="relative">
                <span className="absolute -left-[37px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-brand-500/20 md:-top-[46px] md:left-0" />
                <p className="h-display text-4xl text-brand-500">{item.year}</p>
                <p className="mt-2 font-display text-lg font-medium">{item.title}</p>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* Galeri (drone & tesis) */}
      {!!asMediaList(page.gallery?.images).length && (
        <section className="container-x pb-24 md:pb-32">
          {page.gallery?.title && (
            <Reveal>
              <h2 className="h-display mb-10 text-4xl md:text-5xl">{page.gallery.title}</h2>
            </Reveal>
          )}
          <Gallery images={asMediaList(page.gallery?.images)} />
        </section>
      )}
    </>
  )
}
