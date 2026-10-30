import { Mail, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'

import { InquiryForm } from '@/components/forms/InquiryForm'
import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/PageHero'
import { type Locale, getDictionary, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, getGlobal, getSettings } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const page = await getGlobal('contact-page', locale)
  return buildMetadata({
    locale,
    path: routes.contact,
    meta: page.meta,
    title: page.hero?.title || getDictionary(locale).nav.contact,
    description: page.hero?.subtitle,
    image: asMedia(page.hero?.image),
  })
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ mesaj?: string }>
}) {
  const { mesaj } = await searchParams
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const [page, settings] = await Promise.all([getGlobal('contact-page', locale), getSettings(locale)])

  const lat = settings.mapLat ?? 40.7654
  const lng = settings.mapLng ?? 29.9408
  const d = 0.02
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d / 2}%2C${lng + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lng}`

  const cards = [
    settings.address && { icon: MapPin, title: t.contactCards.address, lines: [settings.address] },
    settings.phones?.length && {
      icon: Phone,
      title: t.contactCards.phone,
      lines: settings.phones.map((p) => p.number),
      href: (v: string) => `tel:${v.replace(/\s/g, '')}`,
      extra: settings.fax ? `${t.contactCards.fax}: ${settings.fax}` : undefined,
    },
    settings.emails?.length && {
      icon: Mail,
      title: t.contactCards.email,
      lines: settings.emails.map((e) => e.email),
      href: (v: string) => `mailto:${v}`,
    },
  ].filter(Boolean) as { icon: typeof Mail; title: string; lines: string[]; href?: (v: string) => string; extra?: string }[]

  return (
    <>
      <PageHero image={asMedia(page.hero?.image)} title={page.hero?.title || t.nav.contact} subtitle={page.hero?.subtitle} eyebrow={t.nav.contact} />

      <section className="container-x relative z-10 -mt-16 grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08} className="group rounded-2xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,31,51,0.4)] transition hover:-translate-y-1">
            <c.icon className="h-8 w-8 text-brand-500 transition group-hover:scale-110" strokeWidth={1.5} />
            <p className="eyebrow mt-6 !text-steel-500">{c.title}</p>
            <div className="mt-2 space-y-1 font-display text-lg font-semibold">
              {c.lines.map((line) =>
                c.href ? (
                  <a key={line} href={c.href(line)} className="block hover:text-brand-600">
                    {line}
                  </a>
                ) : (
                  <p key={line} className="whitespace-pre-line">
                    {line}
                  </p>
                ),
              )}
            </div>
            {c.extra && <p className="mt-3 text-sm text-steel-500">{c.extra}</p>}
          </Reveal>
        ))}
      </section>

      <section className="container-x grid gap-10 py-20 lg:grid-cols-2 lg:py-28">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-3xl bg-steel-100">
          <iframe
            title="Harita"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full grayscale-[60%] transition duration-700 hover:grayscale-0"
          />
        </Reveal>
        <Reveal delay={0.1} className="scroll-mt-28" id="form">
          {page.formTitle && <h2 className="h-display mb-8 text-3xl md:text-4xl">{page.formTitle}</h2>}
          <InquiryForm mode="contact" locale={locale} t={t} initialMessage={typeof mesaj === 'string' ? mesaj : undefined} />
        </Reveal>
      </section>
    </>
  )
}
