import type { Field, GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { image, pageHero, text, textarea } from './shared'

const base = (slug: string, label: { tr: string; en: string }): Pick<GlobalConfig, 'slug' | 'label' | 'admin' | 'access' | 'versions'> => ({
  slug,
  label,
  admin: { group: { tr: 'Sayfalar', en: 'Pages' } },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
})

const iconOptions = [
  { label: { tr: 'Dünya', en: 'Globe' }, value: 'globe' },
  { label: { tr: 'Gemi', en: 'Ship' }, value: 'ship' },
  { label: { tr: 'Depo', en: 'Warehouse' }, value: 'warehouse' },
  { label: { tr: 'Kamyon', en: 'Truck' }, value: 'truck' },
  { label: { tr: 'Belge', en: 'Document' }, value: 'document' },
  { label: { tr: 'Laboratuvar şişesi', en: 'Flask' }, value: 'flask' },
  { label: { tr: 'El sıkışma', en: 'Handshake' }, value: 'handshake' },
  { label: { tr: 'Kalkan', en: 'Shield' }, value: 'shield' },
  { label: { tr: 'Saat', en: 'Clock' }, value: 'clock' },
  { label: { tr: 'Kutu', en: 'Package' }, value: 'package' },
]

const iconField = (defaultValue: string): Field => ({
  name: 'icon',
  type: 'select',
  defaultValue,
  label: { tr: 'İkon', en: 'Icon' },
  options: iconOptions,
})

export const AboutPage: GlobalConfig = {
  ...base('about-page', { tr: 'Hakkımızda', en: 'About' }),
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { tr: 'Giriş', en: 'Intro' },
          fields: [
            pageHero(),
            textarea('intro', { tr: 'Giriş cümlesi (büyük yazı)', en: 'Intro statement' }, { maxLength: 260 }),
          ],
        },
        {
          label: { tr: 'Biz Kimiz', en: 'Who We Are' },
          fields: [
            {
              name: 'company',
              type: 'group',
              label: { tr: 'Firma tanıtımı', en: 'Company profile' },
              fields: [
                text('eyebrow', { tr: 'Üst etiket', en: 'Eyebrow' }),
                text('title', { tr: 'Başlık', en: 'Title' }),
                {
                  name: 'body',
                  type: 'richText',
                  localized: true,
                  label: { tr: 'Metin (paragraflar)', en: 'Text (paragraphs)' },
                },
                {
                  name: 'facts',
                  type: 'array',
                  maxRows: 6,
                  label: { tr: 'Künye kartı (sağdaki kısa bilgiler)', en: 'Key facts card' },
                  labels: { singular: { tr: 'Bilgi', en: 'Fact' }, plural: { tr: 'Bilgiler', en: 'Facts' } },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        text('label', { tr: 'Etiket', en: 'Label' }, { required: true }),
                        text('value', { tr: 'Değer', en: 'Value' }, { required: true }),
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              maxRows: 4,
              label: { tr: 'Rakamlar bandı', en: 'Stats band' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'number', required: true, label: { tr: 'Sayı', en: 'Value' } },
                    { name: 'suffix', type: 'text', label: { tr: 'Ek (+, %, m²…)', en: 'Suffix' } },
                    text('label', { tr: 'Etiket', en: 'Label' }, { required: true }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { tr: 'Ne Yapıyoruz', en: 'What We Do' },
          fields: [
            {
              name: 'services',
              type: 'group',
              label: { tr: 'Faaliyet adımları', en: 'Services' },
              fields: [
                text('eyebrow', { tr: 'Üst etiket', en: 'Eyebrow' }),
                text('title', { tr: 'Başlık', en: 'Title' }),
                textarea('intro', { tr: 'Kısa açıklama', en: 'Intro' }, { maxLength: 300 }),
                {
                  name: 'items',
                  type: 'array',
                  maxRows: 6,
                  label: { tr: 'Adımlar', en: 'Steps' },
                  labels: { singular: { tr: 'Adım', en: 'Step' }, plural: { tr: 'Adımlar', en: 'Steps' } },
                  fields: [
                    iconField('globe'),
                    text('title', { tr: 'Başlık', en: 'Title' }, { required: true }),
                    textarea('text', { tr: 'Açıklama', en: 'Text' }, { maxLength: 400 }),
                  ],
                },
              ],
            },
            {
              name: 'sectors',
              type: 'group',
              label: { tr: 'Hizmet verilen prosesler', en: 'Processes served' },
              fields: [
                text('title', { tr: 'Başlık', en: 'Title' }),
                textarea('text', { tr: 'Kısa açıklama', en: 'Text' }, { maxLength: 400 }),
                {
                  name: 'items',
                  type: 'array',
                  label: { tr: 'Etiketler', en: 'Tags' },
                  fields: [text('label', { tr: 'Ad', en: 'Name' }, { required: true })],
                },
              ],
            },
          ],
        },
        {
          label: { tr: 'Hikâye & Değerler', en: 'Story & Values' },
          fields: [
            {
              name: 'story',
              type: 'array',
              label: { tr: 'Hikâye blokları (görsel + metin)', en: 'Story blocks' },
              labels: { singular: { tr: 'Blok', en: 'Block' }, plural: { tr: 'Bloklar', en: 'Blocks' } },
              fields: [
                image('image', { tr: 'Görsel', en: 'Image' }, { required: true }),
                text('title', { tr: 'Başlık', en: 'Title' }),
                textarea('text', { tr: 'Metin', en: 'Text' }, { maxLength: 900 }),
              ],
            },
            text('valuesTitle', { tr: 'Değerler başlığı', en: 'Values title' }),
            {
              name: 'values',
              type: 'array',
              maxRows: 4,
              label: { tr: 'Değerler (ikon kartları)', en: 'Values' },
              fields: [
                iconField('globe'),
                text('title', { tr: 'Başlık', en: 'Title' }, { required: true }),
                textarea('text', { tr: 'Kısa metin', en: 'Text' }, { maxLength: 300 }),
              ],
            },
            text('timelineTitle', { tr: 'Zaman çizelgesi başlığı', en: 'Timeline title' }),
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
                textarea('text', { tr: 'Açıklama (opsiyonel)', en: 'Description' }, { maxLength: 300 }),
              ],
            },
          ],
        },
        {
          label: { tr: 'Galeri & Çağrı', en: 'Gallery & CTA' },
          fields: [
            {
              name: 'gallery',
              type: 'group',
              label: { tr: 'Galeri (tesis & drone)', en: 'Gallery' },
              fields: [
                text('title', { tr: 'Başlık', en: 'Title' }),
                image('images', { tr: 'Görseller', en: 'Images' }, { hasMany: true }),
              ],
            },
            {
              name: 'cta',
              type: 'group',
              label: { tr: 'Kapanış çağrısı', en: 'Call to action' },
              fields: [
                image('image', { tr: 'Görsel', en: 'Image' }),
                text('title', { tr: 'Başlık', en: 'Title' }),
                textarea('text', { tr: 'Metin', en: 'Text' }, { maxLength: 300 }),
              ],
            },
          ],
        },
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
