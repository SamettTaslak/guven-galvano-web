import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: { tr: 'Ürün', en: 'Product' },
    plural: { tr: 'Ürünler', en: 'Products' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'isActive', 'featured', 'updatedAt'],
    group: { tr: 'Ürünler', en: 'Products' },
    listSearchableFields: ['name', 'code', 'cas'],
  },
  // Her kayıt için son 25 değişiklik saklanır (panelde "Sürümler" sekmesi → geri yükle).
  versions: { maxPerDoc: 25 },
  defaultSort: 'order',
  access: {
    // Ziyaretçiler sadece aktif ürünleri görür; yöneticiler hepsini.
    read: ({ req }) => (req.user ? true : { isActive: { equals: true } }),
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { tr: 'Genel', en: 'General' },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
              label: { tr: 'Ürün adı', en: 'Product name' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'product-categories',
                  required: true,
                  label: { tr: 'Kategori', en: 'Category' },
                },
                {
                  name: 'code',
                  type: 'text',
                  label: { tr: 'Ürün kodu', en: 'Product code' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'cas',
                  type: 'text',
                  label: { tr: 'CAS numarası', en: 'CAS number' },
                  admin: { placeholder: '10101-97-0' },
                  validate: (value: unknown) =>
                    !value || /^\d{2,7}-\d{2}-\d$/.test(String(value).trim())
                      ? true
                      : 'Geçerli bir CAS numarası girin (ör. 7758-99-8).',
                },
                {
                  name: 'formula',
                  type: 'text',
                  label: { tr: 'Kimyasal formül', en: 'Chemical formula' },
                  admin: {
                    placeholder: 'NiSO₄·6H₂O',
                    description: {
                      tr: 'Rakamlar otomatik alt simge yapılır (H2SO4 → H₂SO₄).',
                      en: 'Digits are subscripted automatically.',
                    },
                  },
                },
              ],
            },
            {
              name: 'processes',
              type: 'relationship',
              relationTo: 'processes',
              hasMany: true,
              label: { tr: 'Proses / kaplama tipi', en: 'Processes' },
              admin: {
                description: {
                  tr: 'Ürünün kullanıldığı prosesler; katalogda filtre olarak görünür.',
                  en: 'Shown as catalogue filters.',
                },
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              localized: true,
              maxLength: 240,
              label: { tr: 'Kısa açıklama', en: 'Short description' },
              admin: {
                description: {
                  tr: 'Kartlarda görünen 1–2 cümlelik açıklama.',
                  en: 'One or two sentences shown on cards.',
                },
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              label: { tr: 'Detaylı açıklama', en: 'Description' },
            },
          ],
        },
        {
          label: { tr: 'Görseller', en: 'Images' },
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: { tr: 'Ana görsel', en: 'Cover image' },
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: { tr: 'Galeri', en: 'Gallery' },
            },
          ],
        },
        {
          label: { tr: 'Özellikler', en: 'Specifications' },
          fields: [
            {
              name: 'specs',
              type: 'array',
              label: { tr: 'Teknik özellikler', en: 'Specifications' },
              labels: {
                singular: { tr: 'Özellik', en: 'Spec' },
                plural: { tr: 'Özellikler', en: 'Specs' },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      localized: true,
                      label: { tr: 'Özellik', en: 'Label' },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      required: true,
                      localized: true,
                      label: { tr: 'Değer', en: 'Value' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'packaging',
              type: 'array',
              label: { tr: 'Ambalaj seçenekleri', en: 'Packaging options' },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: { tr: 'Ambalaj', en: 'Packaging' },
                },
              ],
            },
            {
              name: 'origin',
              type: 'text',
              localized: true,
              label: { tr: 'Menşe ülke', en: 'Country of origin' },
            },
            {
              name: 'unit',
              type: 'select',
              defaultValue: 'kg',
              label: { tr: 'Teklif birimi', en: 'Quote unit' },
              options: [
                { label: 'kg', value: 'kg' },
                { label: 'ton', value: 'ton' },
                { label: 'lt', value: 'lt' },
                { label: { tr: 'adet', en: 'pcs' }, value: 'pcs' },
              ],
            },
          ],
        },
      ],
    },
    ...slugField('name'),
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: { tr: 'Sitede göster', en: 'Visible on site' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: { tr: 'Öne çıkan ürün', en: 'Featured' },
      admin: { position: 'sidebar' },
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
