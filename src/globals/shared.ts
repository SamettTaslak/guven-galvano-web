import type { Field } from 'payload'

type L = { tr: string; en: string }

export const text = (name: string, label: L, extra: Record<string, unknown> = {}): Field =>
  ({ name, type: 'text', localized: true, label, ...extra }) as Field

export const textarea = (name: string, label: L, extra: Record<string, unknown> = {}): Field =>
  ({ name, type: 'textarea', localized: true, label, ...extra }) as Field

export const image = (name: string, label: L, extra: Record<string, unknown> = {}): Field =>
  ({ name, type: 'upload', relationTo: 'media', label, ...extra }) as Field

/** Her iç sayfanın üstündeki görsel başlık alanı. */
export const pageHero = (): Field => ({
  name: 'hero',
  type: 'group',
  label: { tr: 'Sayfa başlığı (görsel alan)', en: 'Page hero' },
  fields: [
    image('image', { tr: 'Arka plan görseli', en: 'Background image' }),
    text('title', { tr: 'Başlık', en: 'Title' }),
    textarea('subtitle', { tr: 'Kısa alt başlık', en: 'Subtitle' }, { maxLength: 180 }),
  ],
})
