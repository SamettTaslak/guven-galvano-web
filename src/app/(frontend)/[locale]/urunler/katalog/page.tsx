import clsx from 'clsx'
import { ChevronLeft, ChevronRight, FileText, Mail } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { permanentRedirect } from 'next/navigation'

import { CatalogFilters, CatalogSearch, CatalogToolbar } from '@/components/catalog/CatalogControls'
import { BasketButton, QuickAdd } from '@/components/catalog/QuickAdd'
import { MediaImage, mediaUrl } from '@/components/MediaImage'
import { WhatsappIcon } from '@/components/WhatsappButton'
import { catalogQueryString, getCatalog, parseCatalogQuery, resolveRenamedSlugs } from '@/lib/catalog'
import { formatFormula } from '@/lib/chem'
import { type Locale, getDictionary, href, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { asMedia, getGlobal, getPayloadClient, getSettings } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { documentRequestHref, normalizeWhatsapp, whatsappLink } from '@/lib/whatsapp'
import type { Process, ProductCategory } from '@/payload-types'

type SP = Promise<Record<string, string | string[] | undefined>>

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: SP }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const query = parseCatalogQuery(await searchParams)
  const page = await getGlobal('products-page', locale)
  const base = page.catalog?.title || getDictionary(locale).catalog.title

  // Tek kategori seçili katalog = dizinlenebilir kategori sayfası (kendi SEO alanlarıyla).
  // Arama, proses filtresi, çoklu seçim ve 2+ sayfalar kopya içerik olmasın diye noindex.
  const single = query.groups.length === 1 && !query.processes.length && !query.q ? query.groups[0] : null
  const category = single
    ? (await (await getPayloadClient()).find({ collection: 'product-categories', locale, where: { slug: { equals: single } }, limit: 1, depth: 1 })).docs[0]
    : null
  const noindex = Boolean(query.q || query.processes.length || query.groups.length > 1 || query.page > 1 || (single && !category))

  return buildMetadata({
    locale,
    path: category ? `${routes.catalog}?grup=${category.slug}` : routes.catalog,
    meta: category?.meta,
    title: category ? `${category.name} — ${base}` : base,
    description: category?.summary || page.catalog?.description,
    image: asMedia(category?.image),
    noindex,
  })
}

const unitText = (unit: string | null | undefined, locale: Locale) => (unit === 'pcs' ? (locale === 'tr' ? 'adet' : 'pcs') : (unit ?? 'kg'))

export default async function CatalogPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: SP }) {
  const locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const c = t.catalog
  const query = parseCatalogQuery(await searchParams)
  // Eski kategori/proses adresleriyle gelen bağlantıları güncel adrese kalıcı yönlendir.
  const renamed = await resolveRenamedSlugs(query)
  if (renamed) permanentRedirect(`${href(locale, routes.catalog)}${catalogQueryString(renamed)}`)

  const [page, settings, data] = await Promise.all([getGlobal('products-page', locale), getSettings(locale), getCatalog(locale, query)])
  const { products, categories, processes, totalAll, activeCategories } = data
  const wa = normalizeWhatsapp(settings.whatsappNumber)
  const catalogUrl = href(locale, routes.catalog)

  // Tek kategori seçiliyse başlık o kategori olur.
  const single = activeCategories.length === 1 ? (activeCategories[0] as ProductCategory) : null
  const title = single?.name || page.catalog?.title || c.title
  const description = single?.summary || page.catalog?.description

  const from = products.totalDocs ? (products.page! - 1) * products.limit + 1 : 0
  const to = Math.min(products.totalDocs, (products.page ?? 1) * products.limit)

  const linkWith = (updates: Record<string, string | null>) => {
    const sp = new URLSearchParams()
    if (query.q) sp.set('q', query.q)
    if (query.groups.length) sp.set('grup', query.groups.join(','))
    if (query.processes.length) sp.set('proses', query.processes.join(','))
    if (query.perPage !== 20) sp.set('adet', String(query.perPage))
    if (query.sort !== 'sira') sp.set('sirala', query.sort)
    for (const [k, v] of Object.entries(updates)) (v ? sp.set(k, v) : sp.delete(k))
    const qs = sp.toString().replace(/%2C/g, ',')
    return `${catalogUrl}${qs ? `?${qs}` : ''}`
  }

  const labels = {
    search: c.search,
    filters: c.filters,
    reset: c.reset,
    group: c.group,
    process: c.process,
    perPage: c.perPage,
    sort: c.sort,
    sortOptions: [
      { value: 'sira', label: c.sortOrder },
      { value: 'ad-artan', label: c.sortNameAsc },
      { value: 'ad-azalan', label: c.sortNameDesc },
      { value: 'yeni', label: c.sortNewest },
    ],
  }

  const chip = (active: boolean) =>
    clsx(
      'shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 font-mono text-xs font-medium transition',
      active ? 'bg-ink-900 text-white' : 'bg-steel-100 text-ink-800 hover:bg-steel-300/50',
    )

  return (
    <>
      {/* Başlık bandı */}
      <section className="bg-metal pb-10 pt-32 text-white md:pb-12 md:pt-36">
        <div className="container-x">
          <nav aria-label="breadcrumb" className="mb-4 font-mono text-[11px] tracking-wide text-white/50">
            <Link href={href(locale)} className="hover:text-white">
              {t.nav.home}
            </Link>
            <span className="mx-2">/</span>
            <Link href={href(locale, routes.products)} className="hover:text-white">
              {t.nav.products}
            </Link>
            {single && (
              <>
                <span className="mx-2">/</span>
                <span className="text-white/80">{single.name}</span>
              </>
            )}
          </nav>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="h-display text-4xl md:text-5xl">{title}</h1>
              {description && <p className="mt-3 text-white/65">{description}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              {wa ? (
                <a href={whatsappLink(wa, settings.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <WhatsappIcon className="h-4 w-4 text-[#25d366]" />
                  {c.requestDocs}
                </a>
              ) : (
                <Link href={href(locale, routes.contact)} className="btn-ghost">
                  <FileText className="h-4 w-4" />
                  {c.requestDocs}
                </Link>
              )}
              <BasketButton label={c.myBasket} />
            </div>
          </div>
        </div>
      </section>

      {/* Arama + grup sekmeleri */}
      <div className="sticky top-[60px] z-30 border-b border-steel-300/40 bg-white/95 backdrop-blur md:top-[64px]">
        <div className="container-x flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
          <div className="lg:w-96 lg:shrink-0">
            <CatalogSearch placeholder={c.search} />
          </div>
          <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:ml-auto lg:px-0 [&::-webkit-scrollbar]:hidden" aria-label={c.group}>
            <Link href={linkWith({ grup: null, sayfa: null })} className={chip(!query.groups.length)}>
              {c.allProducts} ({totalAll})
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={linkWith({ grup: cat.slug ?? null, sayfa: null })}
                className={chip(query.groups.length === 1 && query.groups[0] === cat.slug)}
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-paper">
        <div className="container-x py-8 md:py-10">
          {/* Grup özet kartları (filtre yokken) */}
          {!query.groups.length && !query.processes.length && !query.q && (
            <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={linkWith({ grup: cat.slug ?? null })}
                  className="group rounded-xl border border-steel-300/60 bg-white p-5 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-lg font-semibold group-hover:text-brand-600">{cat.name}</h2>
                    <span className="shrink-0 font-mono text-[11px] text-steel-500">
                      {cat.count} {c.products}
                    </span>
                  </div>
                  {cat.summary && <p className="mt-2 text-sm leading-relaxed text-steel-500">{cat.summary}</p>}
                </Link>
              ))}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside>
              <CatalogFilters
                groups={categories.map((cat) => ({ slug: cat.slug ?? '', name: cat.name, count: cat.count }))}
                processes={processes}
                labels={labels}
              />
            </aside>

            <div className="min-w-0">
              {/* Araç çubuğu */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border border-steel-300/60 bg-white px-4 py-3">
                <p className="text-sm text-steel-500">
                  <strong className="text-ink-900">{products.totalDocs}</strong> {c.listed}
                  {products.totalDocs > 0 && (
                    <span className="font-mono text-xs">
                      {' '}
                      · {from}–{to}
                    </span>
                  )}
                </p>
                <CatalogToolbar perPage={query.perPage} sort={query.sort} labels={labels} />
              </div>

              <div className="overflow-hidden rounded-b-xl border border-t-0 border-steel-300/60 bg-white">
                {/* Tablo başlığı (masaüstü) */}
                <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)_minmax(0,1fr)_auto] gap-6 border-b border-steel-300/60 bg-steel-100/70 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-700 xl:grid">
                  <span>{c.colProduct}</span>
                  <span>{c.colGroup}</span>
                  <span>{c.colDocs}</span>
                  <span className="w-[248px] text-right">{c.colQuote}</span>
                </div>

                {products.docs.length ? (
                  <ul className="divide-y divide-steel-300/40">
                    {products.docs.map((p) => {
                      const cover = asMedia(p.coverImage)
                      const cat = typeof p.category === 'object' ? (p.category as ProductCategory) : null
                      const procs = (p.processes ?? []).filter((x): x is Process => typeof x === 'object')
                      const productUrl = href(locale, `${routes.products}/${p.slug}`)
                      const doc = documentRequestHref(locale, wa, { name: p.name, cas: p.cas })
                      return (
                        <li
                          key={p.id}
                          className="grid gap-4 px-4 py-4 transition hover:bg-steel-100/40 sm:px-5 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,2fr)_minmax(0,1fr)_auto] xl:items-center xl:gap-6"
                        >
                          {/* Ürün */}
                          <Link href={productUrl} className="group flex min-w-0 items-center gap-4">
                            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-steel-300/50 bg-steel-100">
                              <MediaImage media={cover} size="thumb" sizes="56px" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate font-display text-lg font-semibold text-brand-600 group-hover:text-brand-700 group-hover:underline">
                                {p.name}
                              </span>
                              {(p.cas || p.formula || p.code) && (
                                <span className="mt-0.5 block truncate font-mono text-[11px] text-steel-500">
                                  {p.cas ? `CAS: ${p.cas}` : p.code}
                                  {p.formula && <> · {formatFormula(p.formula)}</>}
                                </span>
                              )}
                            </span>
                          </Link>

                          {/* Grup & proses */}
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-1.5">
                              {cat && (
                                <Link
                                  href={linkWith({ grup: cat.slug ?? null })}
                                  className="rounded bg-brand-500/10 px-2 py-1 font-mono text-[10.5px] font-medium text-brand-700 hover:bg-brand-500/20"
                                >
                                  {cat.name}
                                </Link>
                              )}
                              {procs.slice(0, 2).map((pr) => (
                                <Link
                                  key={pr.id}
                                  href={linkWith({ proses: pr.slug ?? null })}
                                  className="rounded bg-steel-100 px-2 py-1 font-mono text-[10.5px] text-ink-700 hover:bg-steel-300/50"
                                >
                                  {pr.name}
                                </Link>
                              ))}
                            </div>
                            {p.summary && <p className="mt-1.5 line-clamp-2 text-sm text-steel-500">{p.summary}</p>}
                          </div>

                          {/* Teknik belgeler: dosya yok, talep bağlantısı */}
                          <div className="flex items-center gap-4 xl:block xl:space-y-1">
                            <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-ink-800">
                              <FileText className="h-3.5 w-3.5 text-brand-500" />
                              {c.docs}
                            </p>
                            <a
                              href={doc.href}
                              {...(doc.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              className="flex items-center gap-1.5 font-mono text-[11px] text-steel-500 hover:text-brand-600"
                            >
                              {wa ? <WhatsappIcon className="h-3.5 w-3.5 text-[#25d366]" /> : <Mail className="h-3.5 w-3.5" />}
                              {c.requestDoc}
                            </a>
                          </div>

                          {/* Teklif */}
                          <div className="xl:w-[248px] xl:justify-self-end">
                            <QuickAdd
                              item={{ id: p.id, slug: p.slug ?? '', name: p.name, image: mediaUrl(cover, 'thumb'), unit: p.unit ?? 'kg' }}
                              unitLabel={unitText(p.unit, locale)}
                              label={c.addToQuote}
                              addedLabel={t.added}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className="px-6 py-20 text-center">
                    <p className="text-steel-500">{c.noResults}</p>
                    <Link href={catalogUrl} className="btn-dark mt-6">
                      {c.reset}
                    </Link>
                  </div>
                )}
              </div>

              {/* Sayfalama */}
              {products.totalPages > 1 && (
                <nav className="mt-6 flex items-center justify-center gap-1.5" aria-label="pagination">
                  {products.hasPrevPage && (
                    <Link href={linkWith({ sayfa: String(products.prevPage) })} className="flex items-center gap-1 rounded-lg px-3 py-2 font-mono text-xs hover:bg-white">
                      <ChevronLeft className="h-4 w-4" />
                      {c.prev}
                    </Link>
                  )}
                  {Array.from({ length: products.totalPages }, (_, i) => i + 1)
                    .filter((n) => n === 1 || n === products.totalPages || Math.abs(n - (products.page ?? 1)) <= 2)
                    .map((n, i, arr) => (
                      <span key={n} className="flex items-center gap-1.5">
                        {i > 0 && n - arr[i - 1] > 1 && <span className="px-1 text-steel-500">…</span>}
                        <Link
                          href={linkWith({ sayfa: n === 1 ? null : String(n) })}
                          aria-current={n === products.page ? 'page' : undefined}
                          className={clsx(
                            'grid h-9 min-w-9 place-items-center rounded-lg px-2 font-mono text-xs',
                            n === products.page ? 'bg-ink-900 text-white' : 'hover:bg-white',
                          )}
                        >
                          {n}
                        </Link>
                      </span>
                    ))}
                  {products.hasNextPage && (
                    <Link href={linkWith({ sayfa: String(products.nextPage) })} className="flex items-center gap-1 rounded-lg px-3 py-2 font-mono text-xs hover:bg-white">
                      {c.next}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
