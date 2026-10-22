import type { Metadata } from 'next'

import { QuoteBasket } from '@/components/cart/QuoteBasket'
import { PageHero } from '@/components/PageHero'
import { type Locale, getDictionary, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, getGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  return buildMetadata({ locale, path: routes.quote, title: getDictionary(locale).quote, noindex: true })
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const page = await getGlobal('quote-page', locale)

  return (
    <>
      <PageHero image={asMedia(page.hero?.image)} title={page.hero?.title || t.quote} subtitle={page.hero?.subtitle} eyebrow={t.quote} />
      <section className="container-x py-16 md:py-24">
        <QuoteBasket locale={locale} t={t} successMessage={page.successMessage} />
      </section>
    </>
  )
}
