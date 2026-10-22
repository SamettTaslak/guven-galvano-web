import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { image, pageHero, text, textarea } from './shared'

const base = (slug: string, label: { tr: string; en: string }): Pick<GlobalConfig, 'slug' | 'label' | 'admin' | 'access' | 'versions'> => ({
  slug,
  label,
  admin: { group: { tr: 'Sayfalar', en: 'Pages' } },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
})

export const AboutPage: GlobalConfig = {
  ...base('about-page', { tr: 'Hakkımızda', en: 'About' }),
  fields: [
    pageHero(),
    textarea('intro', { tr: 'Giriş cümlesi (büyük yazı)', en: 'Intro statement' }, { maxLength: 260 }),
    {
      name: 'story',
      type: 'array',
      label: { tr: 'Hikâye blokları (görsel + kısa metin)', en: 'Story blocks' },
      labels: { singular: { tr: 'Blok', en: 'Block' }, plural: { tr: 'Bloklar', en: 'Blocks' } },
      fields: [
        image('image', { tr: 'Görsel', en: 'Image' }, { required: true }),
        text('title', { tr: 'Başlık', en: 'Title' }),
        textarea('text', { tr: 'Kısa metin', en: 'Text' }, { maxLength: 320 }),
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: { tr: 'Zaman çizelgesi', en: 'Timeline' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'year', type: 'text', required: true, label: { tr: 'Yıl', en: 'Year' } },
            text('title', { tr: 'Olay', en: 'Milestone' }, { required: true }),
          ],
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      maxRows: 4,
      label: { tr: 'Değerler (ikon kartları)', en: 'Values' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'globe',
          options: [
            { label: { tr: 'Dünya', en: 'Globe' }, value: 'globe' },
            { label: { tr: 'Gemi', en: 'Ship' }, value: 'ship' },
            { label: { tr: 'Depo', en: 'Warehouse' }, value: 'warehouse' },
            { label: { tr: 'El sıkışma', en: 'Handshake' }, value: 'handshake' },
            { label: { tr: 'Kalkan', en: 'Shield' }, value: 'shield' },
            { label: { tr: 'Saat', en: 'Clock' }, value: 'clock' },
          ],
        },
        text('title', { tr: 'Başlık', en: 'Title' }, { required: true }),
        text('text', { tr: 'Kısa metin', en: 'Text' }),
      ],
    },
    {
      name: 'gallery',
      type: 'group',
      label: { tr: 'Galeri (tesis & drone)', en: 'Gallery' },
      fields: [
        text('title', { tr: 'Başlık', en: 'Title' }),
        image('images', { tr: 'Görseller', en: 'Images' }, { hasMany: true }),
      ],
    },
  ],
}

export const PartnersPage: GlobalConfig = {
  ...base('partners-page', { tr: 'Çalıştığımız Firmalar Sayfası', en: 'Partners Page' }),
  fields: [pageHero()],
}

export const ProductsPage: GlobalConfig = {
  ...base('products-page', { tr: 'Ürünlerimiz Sayfası', en: 'Products Page' }),
  fields: [
    pageHero(),
    {
      name: 'catalog',
      type: 'group',
      label: { tr: 'Katalog (liste) sayfası', en: 'Catalogue page' },
      fields: [
        text('title', { tr: 'Başlık', en: 'Title' }),
        textarea('description', { tr: 'Açıklama', en: 'Description' }, { maxLength: 300 }),
      ],
    },
  ],
}

export const ContactPage: GlobalConfig = {
  ...base('contact-page', { tr: 'İletişim Sayfası', en: 'Contact Page' }),
  fields: [pageHero(), text('formTitle', { tr: 'Form başlığı', en: 'Form title' })],
}

export const PrivacyPage: GlobalConfig = {
  ...base('privacy-page', { tr: 'KVKK / Gizlilik', en: 'Privacy' }),
  fields: [
    text('title', { tr: 'Sayfa başlığı', en: 'Title' }, { required: true }),
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: { tr: 'Metin', en: 'Content' },
      admin: {
        description: {
          tr: 'KVKK aydınlatma metni ve gizlilik politikası. Hukuk danışmanınızın onayladığı metni buraya girin.',
          en: 'Privacy notice approved by your legal advisor.',
        },
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: { tr: 'Son güncelleme tarihi', en: 'Last updated' },
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' } },
    },
  ],
}

export const QuotePage: GlobalConfig = {
  ...base('quote-page', { tr: 'Teklif Sepeti Sayfası', en: 'Quote Page' }),
  fields: [
    pageHero(),
    textarea('successMessage', { tr: 'Gönderim sonrası mesaj', en: 'Success message' }),
  ],
}
