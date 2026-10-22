import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: { tr: 'Çalıştığımız Firma', en: 'Partner' },
    plural: { tr: 'Çalıştığımız Firmalar', en: 'Partners' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['logo', 'name', 'relation', 'country', 'order'],
    group: { tr: 'İçerik', en: 'Content' },
    description: {
      tr: 'Her firma için logo ve isteğe bağlı bir kart görseli (fotoğraf) yükleyebilirsiniz. Fotoğraf varsa logo kartın üstünde beyaz bir plaka içinde görünür.',
      en: 'Upload a logo and an optional card photo for each partner.',
    },
  },
  // Her kayıt için son 25 değişiklik saklanır (panelde "Sürümler" sekmesi → geri yükle).
  versions: { maxPerDoc: 25 },
  defaultSort: 'order',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'name', type: 'text', required: true, label: { tr: 'Firma adı', en: 'Company' } },
    {
      type: 'row',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: { tr: 'Logo', en: 'Logo' },
          filterOptions: { mimeType: { contains: 'image' } },
          admin: {
            width: '50%',
            description: {
              tr: 'Şeffaf arka planlı PNG veya SVG önerilir (en az 400 px genişlik). Logo yoksa kartta firma adı yazılır.',
              en: 'Transparent PNG/SVG recommended.',
            },
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: { tr: 'Kart görseli (isteğe bağlı)', en: 'Card photo (optional)' },
          filterOptions: { mimeType: { contains: 'image' } },
          admin: {
            width: '50%',
            description: {
              tr: 'Kartın arka planı: firmanın tesisi, ürünü veya ortak bir proje fotoğrafı. Yatay fotoğraf (en az 1200 px) önerilir.',
              en: 'Card background photo (landscape, 1200px+).',
            },
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'logoPlate',
          type: 'select',
          defaultValue: 'light',
          label: { tr: 'Logo zemini', en: 'Logo background' },
          admin: {
            width: '50%',
            description: {
              tr: 'Koyu renkli logolar için "Açık", beyaz/açık renkli logolar için "Koyu" seçin.',
              en: 'Light plate for dark logos, dark plate for white logos.',
            },
          },
          options: [
            { label: { tr: 'Açık (beyaz plaka)', en: 'Light' }, value: 'light' },
            { label: { tr: 'Koyu (grafit plaka)', en: 'Dark' }, value: 'dark' },
          ],
        },
        {
          name: 'grayscale',
          type: 'checkbox',
          defaultValue: true,
          label: { tr: 'Logoyu gri göster, üzerine gelince renklendir', en: 'Grayscale logo until hover' },
          admin: { width: '50%', style: { alignSelf: 'center' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'relation',
          type: 'select',
          required: true,
          defaultValue: 'customer',
          label: { tr: 'İlişki', en: 'Relation' },
          options: [
            { label: { tr: 'Tedarikçi', en: 'Supplier' }, value: 'supplier' },
            { label: { tr: 'Müşteri', en: 'Customer' }, value: 'customer' },
          ],
        },
        { name: 'country', type: 'text', localized: true, label: { tr: 'Ülke', en: 'Country' } },
      ],
    },
    {
      name: 'website',
      type: 'text',
      label: { tr: 'Web sitesi', en: 'Website' },
      validate: (value: unknown) =>
        !value || /^https?:\/\/[^\s]+\.[^\s]+$/i.test(String(value)) ? true : 'Adres http:// veya https:// ile başlamalı.',
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
