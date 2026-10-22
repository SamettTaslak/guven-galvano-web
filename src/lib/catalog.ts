import 'server-only'

import type { Where } from 'payload'

import type { Locale } from './i18n'
import { getPayloadClient } from './payload'

export const PER_PAGE_OPTIONS = [20, 50, 100] as const
export const SORT_OPTIONS = {
  sira: 'order',
  'ad-artan': 'name',
  'ad-azalan': '-name',
  yeni: '-createdAt',
} as const
export type SortKey = keyof typeof SORT_OPTIONS

export type CatalogQuery = {
  groups: string[]
  processes: string[]
  q: string
  page: number
  perPage: number
  sort: SortKey
}

const list = (v: unknown): string[] =>
  typeof v === 'string' && v ? [...new Set(v.split(',').map((s) => s.trim()).filter(Boolean))].slice(0, 30) : []

/** URL parametrelerini güvenli şekilde ayrıştırır (bilinmeyen değerler varsayılana döner). */
export const parseCatalogQuery = (sp: Record<string, string | string[] | undefined>): CatalogQuery => {
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : sp[k]) as string | undefined
  const perPage = Number(one('adet'))
  const sort = one('sirala') as SortKey
  return {
    groups: list(one('grup')),
    processes: list(one('proses')),
    q: (one('q') ?? '').trim().slice(0, 80),
    page: Math.max(1, Math.min(1000, Math.floor(Number(one('sayfa')) || 1))),
    perPage: (PER_PAGE_OPTIONS as readonly number[]).includes(perPage) ? perPage : 20,
    sort: sort in SORT_OPTIONS ? sort : 'sira',
  }
}

const searchWhere = (q: string): Where | null =>
  q ? { or: [{ name: { like: q } }, { code: { like: q } }, { cas: { like: q } }] } : null

const relId = (v: unknown): number | null =>
  typeof v === 'number' ? v : v && typeof v === 'object' && 'id' in v ? (v as { id: number }).id : null

/**
 * Katalog verisi: filtre seçenekleri (adetleriyle), sayfalanmış ürünler ve toplamlar.
 * Adetler "faceted" hesaplanır: grup adetleri seçili proseslere, proses adetleri seçili gruplara göre.
 */
export async function getCatalog(locale: Locale, query: CatalogQuery) {
  const payload = await getPayloadClient()

  const [categories, processes] = await Promise.all([
    payload.find({ collection: 'product-categories', locale, limit: 200, depth: 1, sort: 'order' }),
    payload.find({ collection: 'processes', locale, limit: 200, depth: 0, sort: 'order' }),
  ])

  const catBySlug = new Map(categories.docs.map((c) => [c.slug, c]))
  const procBySlug = new Map(processes.docs.map((p) => [p.slug, p]))
  const groupIds = query.groups.map((s) => catBySlug.get(s)?.id).filter((id): id is number => !!id)
  const processIds = query.processes.map((s) => procBySlug.get(s)?.id).filter((id): id is number => !!id)

  const base: Where[] = [{ isActive: { equals: true } }]
  const search = searchWhere(query.q)
  if (search) base.push(search)

  // Adetler için tüm eşleşen ürünlerin yalnızca kategori/proses kimlikleri (küçük katalogda tek sorgu yeterli).
  const facetDocs = await payload.find({
    collection: 'products',
    locale,
    where: { and: base },
    pagination: false,
    depth: 0,
    select: { category: true, processes: true },
  })
  const rows = facetDocs.docs.map((d) => ({
    category: relId(d.category),
    processes: (d.processes ?? []).map(relId).filter((id): id is number => id != null),
  }))
  const inGroups = (r: (typeof rows)[number]) => !groupIds.length || (r.category != null && groupIds.includes(r.category))
  const inProcesses = (r: (typeof rows)[number]) => !processIds.length || r.processes.some((p) => processIds.includes(p))

  const groupCounts = new Map<number, number>()
  const processCounts = new Map<number, number>()
  for (const r of rows) {
    if (inProcesses(r) && r.category != null) groupCounts.set(r.category, (groupCounts.get(r.category) ?? 0) + 1)
    if (inGroups(r)) for (const p of r.processes) processCounts.set(p, (processCounts.get(p) ?? 0) + 1)
  }
  const totalAll = rows.filter(inProcesses).length

  const where: Where[] = [...base]
  if (groupIds.length) where.push({ category: { in: groupIds } })
  if (processIds.length) where.push({ processes: { in: processIds } })

  const products =
    query.sort === 'ad-artan' || query.sort === 'ad-azalan'
      ? await findSortedByName(locale, { and: where }, query)
      : await payload.find({
          collection: 'products',
          locale,
          where: { and: where },
          sort: SORT_OPTIONS[query.sort],
          page: query.page,
          limit: query.perPage,
          depth: 1,
        })

  return {
    categories: categories.docs.map((c) => ({ ...c, count: groupCounts.get(c.id) ?? 0 })),
    processes: processes.docs.map((p) => ({ slug: p.slug ?? '', name: p.name, count: processCounts.get(p.id) ?? 0 })),
    products,
    totalAll,
    activeCategories: query.groups.map((s) => catBySlug.get(s)).filter(Boolean),
  }
}

/**
 * Ada göre sıralama dile duyarlı yapılır (veritabanı harmanlaması "Ç, Ş, İ"yi alfabenin sonuna atar).
 * Önce yalnızca id+ad çekilip Intl.Collator ile sıralanır, sonra yalnızca o sayfanın ürünleri yüklenir.
 */
async function findSortedByName(locale: Locale, where: Where, query: CatalogQuery) {
  const payload = await getPayloadClient()
  const all = await payload.find({ collection: 'products', locale, where, pagination: false, depth: 0, select: { name: true } })
  const collator = new Intl.Collator(locale === 'tr' ? 'tr' : 'en', { sensitivity: 'base', numeric: true })
  const sorted = all.docs.sort((a, b) => collator.compare(a.name, b.name) * (query.sort === 'ad-azalan' ? -1 : 1))

  const totalDocs = sorted.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / query.perPage))
  const page = Math.min(query.page, totalPages)
  const ids = sorted.slice((page - 1) * query.perPage, page * query.perPage).map((d) => d.id)
  const pageDocs = ids.length
    ? await payload.find({ collection: 'products', locale, where: { id: { in: ids } }, pagination: false, depth: 1 })
    : { docs: [] }
  const byId = new Map(pageDocs.docs.map((d) => [d.id, d]))

  return {
    docs: ids.map((id) => byId.get(id)!).filter(Boolean),
    totalDocs,
    limit: query.perPage,
    totalPages,
    page,
    pagingCounter: (page - 1) * query.perPage + 1,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  }
}

/** Sorgudan katalog adresi üretir (varsayılan değerler adrese yazılmaz). */
export const catalogQueryString = (query: CatalogQuery): string => {
  const sp = new URLSearchParams()
  if (query.q) sp.set('q', query.q)
  if (query.groups.length) sp.set('grup', query.groups.join(','))
  if (query.processes.length) sp.set('proses', query.processes.join(','))
  if (query.perPage !== 20) sp.set('adet', String(query.perPage))
  if (query.sort !== 'sira') sp.set('sirala', query.sort)
  if (query.page > 1) sp.set('sayfa', String(query.page))
  const qs = sp.toString().replace(/%2C/g, ',')
  return qs ? `?${qs}` : ''
}

/**
 * Adresi değiştirilmiş kategori/proses kısa adlarını güncelleriyle değiştirir.
 * Değişen bir şey yoksa null döner (sayfa yönlendirme yapmaz).
 */
export async function resolveRenamedSlugs(query: CatalogQuery): Promise<CatalogQuery | null> {
  if (!query.groups.length && !query.processes.length) return null
  const payload = await getPayloadClient()
  let changed = false
  const remap = async (collection: 'product-categories' | 'processes', slugs: string[]) => {
    if (!slugs.length) return slugs
    const current = await payload.find({ collection, where: { slug: { in: slugs } }, pagination: false, depth: 0, select: { slug: true } })
    const known = new Set(current.docs.map((d) => d.slug))
    const unknown = slugs.filter((s) => !known.has(s))
    if (!unknown.length) return slugs
    const moved = await payload.find({
      collection,
      where: { previousSlugs: { in: unknown } },
      pagination: false,
      depth: 0,
      select: { slug: true, previousSlugs: true },
    })
    const map = new Map<string, string>()
    for (const d of moved.docs) for (const old of d.previousSlugs ?? []) if (d.slug) map.set(old, d.slug)
    return slugs.map((s) => {
      const next = map.get(s)
      if (next) changed = true
      return next ?? s
    })
  }
  const groups = await remap('product-categories', query.groups)
  const processes = await remap('processes', query.processes)
  return changed ? { ...query, groups: [...new Set(groups)], processes: [...new Set(processes)] } : null
}

/** Kategori karşılama sayfası için kategori başına aktif ürün sayısı. */
export async function getCategoryCounts(): Promise<Map<number, number>> {
  const payload = await getPayloadClient()
  const docs = await payload.find({
    collection: 'products',
    where: { isActive: { equals: true } },
    pagination: false,
    depth: 0,
    select: { category: true },
  })
  const counts = new Map<number, number>()
  for (const d of docs.docs) {
    const id = relId(d.category)
    if (id != null) counts.set(id, (counts.get(id) ?? 0) + 1)
  }
  return counts
}
