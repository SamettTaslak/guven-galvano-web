/** Ana sayfada (slider'ın altında) sıralanabilen bölümler. Panel ve site bu listeyi ortak kullanır. */
export const HOME_SECTIONS = [
  { value: 'partners', label: { tr: 'Çalıştığımız Firmalar (logo bandı)', en: 'Partners (logo band)' } },
  { value: 'stats', label: { tr: 'Rakamlar', en: 'Stats' } },
  { value: 'categories', label: { tr: 'Ürün grupları', en: 'Product groups' } },
  { value: 'featured', label: { tr: 'Öne çıkan ürünler', en: 'Featured products' } },
  { value: 'showcase', label: { tr: 'Tam genişlik görsel bant', en: 'Showcase band' } },
  { value: 'gallery', label: { tr: 'Görsel şerit (tesis / depo)', en: 'Image strip' } },
  { value: 'cta', label: { tr: 'Kapanış çağrısı', en: 'Call to action' } },
] as const

export type HomeSectionKey = (typeof HOME_SECTIONS)[number]['value']

export const DEFAULT_HOME_ORDER: HomeSectionKey[] = HOME_SECTIONS.map((s) => s.value)

/**
 * Paneldeki sıralamadan görüntülenecek bölümleri çıkarır.
 * Listede olmayan (ör. sonradan eklenmiş) bölümler sona eklenir; "Göster" işareti kaldırılanlar gizlenir.
 */
export function resolveHomeOrder(layout: { section?: string | null; visible?: boolean | null }[] | null | undefined): HomeSectionKey[] {
  const known = new Set<string>(DEFAULT_HOME_ORDER)
  const rows = (layout ?? []).filter((r): r is { section: HomeSectionKey; visible?: boolean | null } => !!r.section && known.has(r.section))
  const listed = new Set(rows.map((r) => r.section))
  const ordered = rows.filter((r) => r.visible !== false).map((r) => r.section)
  const missing = DEFAULT_HOME_ORDER.filter((k) => !listed.has(k))
  return [...new Set([...ordered, ...missing])]
}
