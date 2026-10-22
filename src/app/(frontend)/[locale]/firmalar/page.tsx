import type { Metadata } from 'next'

import { PageHero } from '@/components/PageHero'
import { PartnersGrid } from '@/components/PartnersGrid'
import { type Locale, getDictionary, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, getGlobal, getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const page = await getGlobal('partners-page', locale)
  return buildMetadata({
    locale,
    path: routes.partners,
    meta: page.meta,
    title: page.hero?.title || getDictionary(locale).nav.partners,
    description: page.hero?.subtitle,
    image: asMedia(page.hero?.image),
  })
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const payload = await getPayloadClient()
  const [page, partners] = await Promise.all([
    getGlobal('partners-page', locale),
    payload.find({ collection: 'partners', locale, limit: 500, depth: 1, sort: 'order' }),
  ])

  return (
    <>
      <PageHero image={asMedia(page.hero?.image)} title={page.hero?.title || t.nav.partners} subtitle={page.hero?.subtitle} eyebrow={t.nav.partners} />
      <section className="container-x py-20 md:py-28">
        <PartnersGrid partners={partners.docs} labels={{ all: t.all, supplier: t.suppliers, customer: t.customers, supplierOne: t.supplierOne, customerOne: t.customerOne }} />
      </section>
    </>
  )
}
