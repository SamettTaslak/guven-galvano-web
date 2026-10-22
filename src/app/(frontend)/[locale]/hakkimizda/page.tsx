import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  ArrowRight,
  Clock,
  FileText,
  FlaskConical,
  Globe,
  Handshake,
  Package,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
} from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Gallery } from '@/components/Lightbox'
import { MediaImage } from '@/components/MediaImage'
import { CountUp, Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/PageHero'
import { getDictionary, href, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, asMediaList, getGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

const icons = {
  globe: Globe,
  ship: Ship,
  warehouse: Warehouse,
  truck: Truck,
  document: FileText,
  flask: FlaskConical,
  handshake: Handshake,
  shield: ShieldCheck,
  clock: Clock,
  package: Package,
}
const iconFor = (name?: string | null) => icons[(name ?? 'globe') as keyof typeof icons] ?? Globe

// Panelden girilen zengin metin için okunaklı tipografi.
const prose =
  'text-[17px] leading-[1.8] text-ink-700 [&_p]:mb-6 [&_p:last-child]:mb-0[&_a]:text-brand-600 [&_a]:underline [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink-900 [&_li]:my-1 [&_ul]:list-disc [&_ul]:pl-6 [&_strong]:font-semibold [&_strong]:text-ink-900'

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
  const company = page.company
  const services = page.services
  const sectors = page.sectors
  const gallery = asMediaList(page.gallery?.images)

  return (
    <>
      <PageHero image={asMedia(page.hero?.image)} title={page.hero?.title || t.nav.about} subtitle={page.hero?.subtitle} eyebrow={t.nav.about} />

      {/* Biz kimiz: uzun metin + yapışkan künye kartı */}
      <section className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            {company?.eyebrow && <p className="eyebrow mb-4">{company.eyebrow}</p>}
            {company?.title && <h2 className="h-display text-3xl leading-tight md:text-[2.75rem]">{company.title}</h2>}
          </Reveal>
          {page.intro && (
            <Reveal delay={0.05}>
              <p className="mt-8 border-l-2 border-brand-500 pl-6 text-xl leading-relaxed text-ink-900 md:text-2xl">{page.intro}</p>
            </Reveal>
          )}
          {company?.body && (
            <Reveal delay={0.1} className={`mt-10 ${prose}`}>
              <RichText data={company.body} />
            </Reveal>
          )}
        </div>

        {!!company?.facts?.length && (
          <aside className="lg:col-span-5">
            <Reveal delay={0.15} className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-steel-300/50 bg-white shadow-[0_20px_60px_-30px_rgba(10,17,24,0.35)]">
                <div className="bg-metal relative px-8 py-6 text-white">
                  <div aria-hidden className="brand-rule absolute inset-x-0 bottom-0" />
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
                    {locale === 'tr' ? 'Künye' : 'At a glance'}
                  </p>
                </div>
                <dl className="divide-y divide-steel-300/40">
                  {company.facts.map((f, i) => (
                    <div key={f.id ?? i} className="flex items-baseline justify-between gap-6 px-8 py-5">
                      <dt className="text-sm text-steel-500">{f.label}</dt>
                      <dd className="text-right font-display text-lg font-semibold text-ink-900">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex flex-wrap gap-3 border-t border-steel-300/40 bg-paper px-8 py-6">
                  <Link href={href(locale, routes.products)} className="btn-brand !px-5 !py-3">
                    {t.browseProducts}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href={href(locale, routes.contact)} className="btn !px-5 !py-3 border border-steel-300 text-ink-900 hover:border-brand-500">
                    {t.nav.contact}
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        )}
      </section>

      {/* Rakamlar */}
      {!!page.stats?.length && (
        <section className="bg-metal relative text-white">
          <div aria-hidden className="brand-rule absolute inset-x-0 top-0" />
          <div className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
            {page.stats.map((s, i) => (
              <Reveal key={s.id ?? i} delay={i * 0.08} className="px-2 py-12 text-center md:py-16">
                <p className="h-display whitespace-nowrap text-4xl sm:text-5xl lg:text-6xl">
                  <CountUp value={s.value} suffix={s.suffix ?? ''} />
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-300">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Ne yapıyoruz: tedarik zinciri adımları */}
      {!!services?.items?.length && (
        <section className="container-x py-20 md:py-28">
          <Reveal className="max-w-3xl">
            {services.eyebrow && <p className="eyebrow mb-4">{services.eyebrow}</p>}
            {services.title && <h2 className="h-display text-3xl leading-tight md:text-[2.75rem]">{services.title}</h2>}
            {services.intro && <p className="mt-6 text-[17px] leading-[1.75] text-steel-500">{services.intro}</p>}
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((s, i) => {
              const Icon = iconFor(s.icon)
              return (
                <Reveal
                  as="li"
                  key={s.id ?? i}
                  delay={i * 0.08}
                  className="group relative rounded-2xl border border-steel-300/50 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-brand-400 hover:shadow-[0_24px_50px_-30px_rgba(17,112,171,0.55)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-600 transition duration-500 group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-display text-sm font-semibold text-steel-300">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-ink-900">{s.title}</h3>
                  {s.text && <p className="mt-3 text-[15px] leading-relaxed text-steel-500">{s.text}</p>}
                </Reveal>
              )
            })}
          </ol>
        </section>
      )}

      {/* Hizmet verilen prosesler */}
      {!!sectors?.items?.length && (
        <section className="bg-steel-100/60 py-20 md:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              {sectors.title && <h2 className="h-display text-3xl leading-tight md:text-4xl">{sectors.title}</h2>}
              {sectors.text && <p className="mt-5 text-[17px] leading-[1.75] text-steel-500">{sectors.text}</p>}
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="flex flex-wrap gap-3">
                {sectors.items.map((s, i) => (
                  <li
                    key={s.id ?? i}
                    className="rounded-full border border-steel-300/70 bg-white px-5 py-2.5 font-display text-sm font-medium text-ink-900 transition hover:border-brand-500 hover:text-brand-600"
                  >
                    {s.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Hikâye blokları: görsel ve metin dönüşümlü */}
      {!!page.story?.length && (
        <section className="container-x space-y-20 py-20 md:space-y-28 md:py-28">
          {page.story.map((block, i) => (
            <div key={block.id ?? i} className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-6 ${i % 2 ? 'md:order-2' : ''}`}>
                <MediaImage media={asMedia(block.image)} size="wide" sizes="(min-width:768px) 50vw, 100vw" />
              </Reveal>
              <Reveal delay={0.12} className={`md:col-span-6 ${i % 2 ? 'md:order-1' : ''}`}>
                <p className="eyebrow mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="h-display text-3xl leading-tight md:text-4xl">{block.title}</h2>
                {block.text && <p className="mt-6 whitespace-pre-line text-[17px] leading-[1.75] text-steel-500">{block.text}</p>}
              </Reveal>
            </div>
          ))}
        </section>
      )}

      {/* Değerler */}
      {!!page.values?.length && (
        <section className="bg-metal py-20 text-white md:py-28">
          <div className="container-x">
            {page.valuesTitle && (
              <Reveal>
                <h2 className="h-display mb-12 text-3xl md:text-4xl">{page.valuesTitle}</h2>
              </Reveal>
            )}
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {page.values.map((v, i) => {
                const Icon = iconFor(v.icon)
                return (
                  <Reveal key={v.id ?? i} delay={i * 0.08} className="group bg-ink-900 p-8 transition hover:bg-ink-800 md:p-10">
                    <Icon className="h-9 w-9 text-brand-400 transition duration-500 group-hover:scale-110" strokeWidth={1.5} />
                    <h3 className="mt-7 font-display text-lg font-semibold">{v.title}</h3>
                    {v.text && <p className="mt-3 text-[15px] leading-relaxed text-white/65">{v.text}</p>}
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Zaman çizelgesi */}
      {!!page.timeline?.length && (
        <section className="container-x py-20 md:py-28">
          {page.timelineTitle && (
            <Reveal>
              <h2 className="h-display mb-14 text-3xl md:text-4xl">{page.timelineTitle}</h2>
            </Reveal>
          )}
          <ol className="relative grid gap-10 border-l border-steel-300/60 pl-8 md:grid-flow-col md:auto-cols-fr md:border-l-0 md:border-t md:pl-0 md:pt-10">
            {page.timeline.map((item, i) => (
              <Reveal as="li" key={item.id ?? i} delay={i * 0.1} className="relative md:pr-6">
                <span className="absolute -left-[37px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-brand-500/20 md:-top-[46px] md:left-0" />
                <p className="h-display text-3xl text-brand-500">{item.year}</p>
                <p className="mt-2 font-display text-lg font-semibold text-ink-900">{item.title}</p>
                {item.text && <p className="mt-2 text-[15px] leading-relaxed text-steel-500">{item.text}</p>}
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* Galeri (drone & tesis) */}
      {!!gallery.length && (
        <section className="container-x pb-20 md:pb-28">
          {page.gallery?.title && (
            <Reveal>
              <h2 className="h-display mb-10 text-3xl md:text-4xl">{page.gallery.title}</h2>
            </Reveal>
          )}
          <Gallery images={gallery} />
        </section>
      )}

      {/* Kapanış çağrısı */}
      {page.cta?.title && (
        <section className="container-x pb-20 md:pb-28">
          <Reveal className="relative overflow-hidden rounded-3xl bg-ink-900 text-white">
            <div className="absolute inset-0">
              <MediaImage media={asMedia(page.cta.image)} size="wide" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-brand-800/70 to-brand-700/20" />
            <div className="relative flex min-h-[360px] flex-col items-start justify-center gap-6 p-8 md:p-16">
              <h2 className="h-display max-w-2xl text-3xl leading-tight md:text-5xl">{page.cta.title}</h2>
              {page.cta.text && <p className="max-w-xl text-[17px] leading-relaxed text-white/75">{page.cta.text}</p>}
              <div className="flex flex-wrap gap-3">
                <Link href={href(locale, routes.products)} className="btn-brand">
                  {t.browseProducts}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={href(locale, routes.quote)} className="btn-ghost">
                  {t.goToQuote}
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}
    </>
  )
}
