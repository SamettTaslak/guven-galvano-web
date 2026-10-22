import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { DEFAULT_HOME_ORDER, HOME_SECTIONS } from '../lib/home-sections'
import { image, text, textarea } from './shared'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: { tr: 'Ana Sayfa', en: 'Home Page' },
  admin: { group: { tr: 'Sayfalar', en: 'Pages' } },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { tr: 'Hero / Slayt', en: 'Hero / Slider' },
          fields: [
            text('heroTitle', { tr: 'Büyük başlık', en: 'Title' }),
            textarea('heroSubtitle', { tr: 'Alt başlık', en: 'Subtitle' }, { maxLength: 140 }),
            {
              name: 'slides',
              type: 'array',
              label: { tr: 'Arka plan slaytları', en: 'Background slides' },
              labels: { singular: { tr: 'Slayt', en: 'Slide' }, plural: { tr: 'Slaytlar', en: 'Slides' } },
              admin: {
                description: {
                  tr: 'Fotoğraf ya da kısa video (mp4) ekleyin. Drone çekimleri için idealdir.',
                  en: 'Add photos or short mp4 videos.',
                },
              },
              fields: [
                image('image', { tr: 'Görsel', en: 'Image' }, { required: true }),
                image('video', { tr: 'Video (opsiyonel)', en: 'Video (optional)' }),
                text('caption', { tr: 'Küçük etiket', en: 'Caption' }),
              ],
            },
            {
              type: 'collapsible',
              label: { tr: 'Ticaret rotaları (animasyonlu harita)', en: 'Trade routes (animated map)' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    text('hubName', { tr: 'Merkez adı', en: 'Hub name' }, { defaultValue: 'Türkiye' }),
                    { name: 'hubLat', type: 'number', defaultValue: 40.77, label: { tr: 'Merkez enlem', en: 'Hub lat' } },
                    { name: 'hubLng', type: 'number', defaultValue: 29.94, label: { tr: 'Merkez boylam', en: 'Hub lng' } },
                  ],
                },
                {
                  name: 'routes',
                  type: 'array',
                  label: { tr: 'Rotalar', en: 'Routes' },
                  labels: { singular: { tr: 'Rota', en: 'Route' }, plural: { tr: 'Rotalar', en: 'Routes' } },
                  admin: {
                    description: {
                      tr: 'Koordinatları Google Haritalar\'da şehre sağ tıklayarak alabilirsiniz.',
                      en: 'Right-click a city on Google Maps to copy coordinates.',
                    },
                  },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        text('label', { tr: 'Ülke / şehir', en: 'Country / city' }, { required: true }),
                        {
                          name: 'direction',
                          type: 'select',
                          required: true,
                          defaultValue: 'export',
                          label: { tr: 'Yön', en: 'Direction' },
                          options: [
                            { label: { tr: 'İthalat (gelen)', en: 'Import' }, value: 'import' },
                            { label: { tr: 'İhracat (giden)', en: 'Export' }, value: 'export' },
                          ],
                        },
                        { name: 'lat', type: 'number', required: true, label: { tr: 'Enlem', en: 'Lat' } },
                        { name: 'lng', type: 'number', required: true, label: { tr: 'Boylam', en: 'Lng' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { tr: 'Rakamlar', en: 'Stats' },
          fields: [
            {
              name: 'stats',
              type: 'array',
              maxRows: 6,
              label: { tr: 'Sayaçlar', en: 'Counters' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'number', required: true, label: { tr: 'Sayı', en: 'Value' } },
                    { name: 'suffix', type: 'text', label: { tr: 'Ek (+, %, t…)', en: 'Suffix' } },
                    text('label', { tr: 'Etiket', en: 'Label' }, { required: true }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { tr: 'Bölümler', en: 'Sections' },
          fields: [
            {
              name: 'layout',
              type: 'array',
              label: { tr: 'Bölüm sırası', en: 'Section order' },
              labels: { singular: { tr: 'Bölüm', en: 'Section' }, plural: { tr: 'Bölümler', en: 'Sections' } },
              admin: {
                initCollapsed: true,
                description: {
                  tr: 'Slider’ın altındaki bölümlerin sırası. Satırların solundaki tutamaçtan sürükleyerek sıralayın; bir bölümü gizlemek için "Göster" işaretini kaldırın. Listede olmayan bölümler sona eklenir.',
                  en: 'Drag rows to reorder the sections below the slider; untick "Visible" to hide one.',
                },
                components: { RowLabel: '/components/admin/HomeSectionRowLabel#HomeSectionRowLabel' },
              },
              defaultValue: DEFAULT_HOME_ORDER.map((section) => ({ section, visible: true })),
              validate: ((rows: { section?: string }[] | null | undefined) => {
                const seen = new Set<string>()
                for (const r of rows ?? []) {
                  if (!r.section) continue
                  if (seen.has(r.section)) return 'Aynı bölüm listede iki kez yer alamaz.'
                  seen.add(r.section)
                }
                return true
              }) as never,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'section',
                      type: 'select',
                      required: true,
                      label: { tr: 'Bölüm', en: 'Section' },
                      options: HOME_SECTIONS.map((s) => ({ value: s.value, label: s.label })),
                      admin: { width: '70%' },
                    },
                    {
                      name: 'visible',
                      type: 'checkbox',
                      defaultValue: true,
                      label: { tr: 'Göster', en: 'Visible' },
                      admin: { width: '30%', style: { alignSelf: 'center' } },
                    },
                  ],
                },
              ],
            },
            {
              name: 'categoriesSection',
              type: 'group',
              label: { tr: 'Ürün grupları bölümü', en: 'Categories section' },
              fields: [
                text('title', { tr: 'Başlık', en: 'Title' }),
                text('subtitle', { tr: 'Alt başlık', en: 'Subtitle' }),
              ],
            },
            {
              name: 'featuredSection',
              type: 'group',
              label: { tr: 'Öne çıkan ürünler bölümü', en: 'Featured products section' },
              admin: {
                description: {
                  tr: 'Ürün düzenleme ekranında "Öne çıkan ürün" işaretli ürünler burada gösterilir (en fazla 8). Hiç işaretli ürün yoksa bölüm gizlenir.',
                  en: 'Products marked as "Featured" appear here (max 8). Hidden when none.',
                },
              },
              fields: [
                text('title', { tr: 'Başlık', en: 'Title' }),
                text('subtitle', { tr: 'Üst etiket', en: 'Eyebrow' }),
              ],
            },
            {
              name: 'showcase',
              type: 'group',
              label: { tr: 'Tam genişlik görsel bant', en: 'Full-width showcase' },
              fields: [
                image('image', { tr: 'Görsel', en: 'Image' }),
                image('video', { tr: 'Video (opsiyonel)', en: 'Video (optional)' }),
                text('title', { tr: 'Başlık', en: 'Title' }),
                text('subtitle', { tr: 'Alt başlık', en: 'Subtitle' }),
              ],
            },
            {
              name: 'gallery',
              type: 'group',
              label: { tr: 'Görsel şerit (tesis / depo)', en: 'Image strip' },
              fields: [
                text('title', { tr: 'Başlık', en: 'Title' }),
                image('images', { tr: 'Görseller', en: 'Images' }, { hasMany: true }),
              ],
            },
            {
              name: 'partnersSection',
              type: 'group',
              label: { tr: 'Firmalar bölümü', en: 'Partners section' },
              fields: [text('title', { tr: 'Başlık', en: 'Title' })],
            },
            {
              name: 'cta',
              type: 'group',
              label: { tr: 'Kapanış çağrısı', en: 'Call to action' },
              fields: [
                image('image', { tr: 'Görsel', en: 'Image' }),
                text('title', { tr: 'Başlık', en: 'Title' }),
                text('buttonLabel', { tr: 'Buton yazısı', en: 'Button label' }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
