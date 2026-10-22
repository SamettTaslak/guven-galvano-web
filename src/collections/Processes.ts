import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

/** Proses / kaplama tipi (ör. Nikel Kaplama, Pasivasyon). Katalog filtresinde kullanılır. */
export const Processes: CollectionConfig = {
  slug: 'processes',
  labels: {
    singular: { tr: 'Proses / Kaplama Tipi', en: 'Process' },
    plural: { tr: 'Proses / Kaplama Tipleri', en: 'Processes' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    group: { tr: 'Ürünler', en: 'Products' },
    description: {
      tr: 'Ürün kataloğundaki "Proses / Kaplama Tipi" filtresi. Ürünlere, ürün düzenleme ekranından atanır.',
      en: 'Used as a filter in the product catalogue.',
    },
  },
  versions: { maxPerDoc: 25 },
  defaultSort: 'order',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true, label: { tr: 'Ad', en: 'Name' } },
    ...slugField('name'),
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { tr: 'Sıralama', en: 'Order' },
      admin: { position: 'sidebar' },
    },
  ],
}
