import { ArrowRight, FileText, Search } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Reveal } from '@/components/motion/Reveal'
import { PageHero } from '@/components/PageHero'
import { CategoryTile } from '@/components/products/CategoryTile'
import { WhatsappIcon } from '@/components/WhatsappButton'
import { getCategoryCounts } from '@/lib/catalog'
import { getDictionary, href, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, getGlobal, getPayloadClient, getSettings } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { normalizeWhatsapp, whatsappLink } from '@/lib/whatsapp'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const page = await getGlobal('products-page', locale)
  return buildMetadata({
    locale,
    path: routes.products,
    meta: page.meta,
    title: page.hero?.title || getDictionary(locale).nav.products,
    description: page.hero?.subtitle || page.catalog?.description,
    image: asMedia(page.hero?.image),
  })
}

// Asimetrik mozaik (ana sayfadakiyle aynı ritim).
const span = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7', 'md:col-span-6', 'md:col-span-6']

/** Ürünler girişi: önce kategoriler; kategoriye tıklayınca filtreli katalog açılır. */
export default async function ProductsLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const c = t.catalog
  const payload = await getPayloadClient()

  const [page, categories, processes, counts, settings] = await Promise.all([
    getGlobal('products-page', locale),
    payload.find({ collection: 'product-categories', locale, limit: 100, depth: 1, sort: 'order' }),
    payload.find({ collection: 'processes', locale, limit: 100, depth: 0, sort: 'order' }),
    getCategoryCounts(),
    getSettings(locale),
  ])
  const total = [...counts.values()].reduce((a, b) => a + b, 0)
  const catalogUrl = href(locale, routes.catalog)
  const wa = normalizeWhatsapp(settings.whatsappNumber)

  return (
    <>
      <PageHero image={asMedia(page.hero?.image)} title={page.hero?.title || t.nav.products} subtitle={page.hero?.subtitle} eyebrow={t.nav.products} />

      {/* Arama + tümünü listele */}
      <section className="container-x relative z-10 -mt-10">
        <Reveal className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-[0_25px_60px_-30px_rgba(20,24,29,0.45)] md:flex-row md:items-center">
          <form action={catalogUrl} className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
            <input name="q" type="search" placeholder={c.search} aria-label={c.search} maxLength={80} className="field border-transparent bg-steel-100/70 pl-11" />
          </form>
          <Link href={catalogUrl} className="btn-dark shrink-0">
            {c.browseAll}
            <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[11px]">{total}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Kategoriler */}
      <section className="container-x py-16 md:py-24">
        <div className="grid gap-5 md:grid-cols-12">
          {categories.docs.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 2) * 0.08} className={`min-w-0 ${span[i % span.length]}`}>
              <CategoryTile
                category={cat}
                index={i}
                count={`${counts.get(cat.id) ?? 0} ${c.products}`}
                className="h-[300px] w-full md:h-[380px]"
                link={`${catalogUrl}?grup=${cat.slug}`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Prosese göre */}
      {!!processes.docs.length && (
        <section className="border-t border-steel-300/40 bg-white py-16 md:py-20">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow mb-6">{c.process}</p>
            </Reveal>
            <Reveal delay={0.05} className="flex flex-wrap gap-2">
              {processes.docs.map((p) => (
                <Link
                  key={p.id}
                  href={`${catalogUrl}?proses=${p.slug}`}
                  className="rounded-full border border-steel-300/70 px-4 py-2 font-display text-sm font-medium text-ink-800 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                >
                  {p.name}
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Belge talebi */}
      <section className="container-x py-16 md:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink-900 p-8 text-white md:flex-row md:items-center md:p-12">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 h-8 w-8 shrink-0 text-brand-400" strokeWidth={1.5} />
            <p className="max-w-xl font-display text-xl md:text-2xl">{c.docsNote}</p>
          </div>
          {wa ? (
            <a href={whatsappLink(wa, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn shrink-0 bg-[#25d366] text-white hover:brightness-95">
              <WhatsappIcon className="h-5 w-5" />
              {c.requestDocs}
            </a>
          ) : (
            <Link href={href(locale, routes.contact)} className="btn-brand shrink-0">
              {c.requestDocs}
            </Link>
          )}
        </Reveal>
      </section>
    </>
  )
}
