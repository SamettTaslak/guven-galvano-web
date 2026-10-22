import type { Field, FieldHook } from 'payload'

const TR_MAP: Record<string, string> = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  İ: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
  Ç: 'c',
  Ğ: 'g',
  Ö: 'o',
  Ş: 's',
  Ü: 'u',
}

export const slugify = (value: string): string =>
  value
    .replace(/[çğıİöşüÇĞÖŞÜ]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)

/** Boş bırakılırsa kaynak alandan (Türkçe değer) otomatik üretilir. */
const formatSlug =
  (sourceField: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    const source = data?.[sourceField] ?? originalDoc?.[sourceField]
    const text = typeof source === 'string' ? source : (source?.tr ?? '')
    return text ? slugify(text) : value
  }

/**
 * Adres değişince eski adresi `previousSlugs`e ekler. Böylece Google'daki, paylaşılmış veya
 * ziyaretçi sepetindeki eski bağlantılar kalıcı (301) yönlendirmeyle yeni adrese gider.
 */
const rememberPreviousSlug: FieldHook = ({ value, originalDoc, siblingData, operation }) => {
  if (operation !== 'update') return value
  const old = originalDoc?.slug as string | undefined
  const history = new Set<string>((originalDoc?.previousSlugs as string[] | undefined) ?? [])
  if (old && value && old !== value) history.add(old)
  if (value) history.delete(value) // eski adrese geri dönüldüyse listeden çıkar
  siblingData.previousSlugs = [...history].slice(-20)
  return value
}

export const slugField = (sourceField = 'name'): Field[] => [
  {
    name: 'slug',
    type: 'text',
    label: { tr: 'URL kısa adı', en: 'Slug' },
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: {
        tr: 'Boş bırakırsanız addan otomatik oluşturulur. Değiştirirseniz eski adres otomatik olarak yeni adrese yönlendirilir.',
        en: 'Generated from the name when left empty. Old URLs redirect automatically when changed.',
      },
    },
    hooks: { beforeValidate: [formatSlug(sourceField)], beforeChange: [rememberPreviousSlug] },
  },
  {
    name: 'previousSlugs',
    type: 'text',
    hasMany: true,
    index: true,
    label: { tr: 'Eski adresler (yönlendirilir)', en: 'Previous slugs (redirected)' },
    admin: {
      position: 'sidebar',
      readOnly: true,
      condition: (data) => Boolean(data?.previousSlugs?.length),
      description: { tr: 'Bu adreslere gelen ziyaretçiler güncel adrese yönlendirilir.', en: 'Visitors are redirected to the current URL.' },
    },
  },
]
