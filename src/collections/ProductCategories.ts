import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: {
    singular: { tr: 'Ürün Kategorisi', en: 'Product Category' },
    plural: { tr: 'Ürün Kategorileri', en: 'Product Categories' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
    group: { tr: 'Ürünler', en: 'Products' },
  },
  // Her kayıt için son 25 değişiklik saklanır (panelde "Sürümler" sekmesi → geri yükle).
  versions: { maxPerDoc: 25 },
  defaultSort: 'order',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { tr: 'Kategori adı', en: 'Name' },
    },
    ...slugField('name'),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { tr: 'Kapak görseli', en: 'Cover image' },
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      label: { tr: 'Kısa açıklama', en: 'Short description' },
      maxLength: 200,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { tr: 'Sıralama', en: 'Order' },
      admin: { position: 'sidebar' },
    },
  ],
}
