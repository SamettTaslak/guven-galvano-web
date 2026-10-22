import type { CollectionConfig, FieldHook } from 'payload'

import { anyone, authenticated } from '../access'

/** "https://eskisite.com/Urunler.php?id=5" → "/urunler.php?id=5" (alan adı atılır, küçük harfe çevrilir). */
export const normalizeRedirectPath = (value: string): string => {
  let v = value.trim()
  try {
    if (/^https?:\/\//i.test(v)) {
      const u = new URL(v)
      v = `${u.pathname}${u.search}`
    }
  } catch {
    /* geçersiz URL: olduğu gibi işlenir */
  }
  if (!v.startsWith('/')) v = `/${v}`
  if (v.length > 1) v = v.replace(/\/+$/, '').replace(/\/+(?=\?)/, '')
  return v.toLowerCase()
}

const normalizeFrom: FieldHook = ({ value }) => (typeof value === 'string' && value ? normalizeRedirectPath(value) : value)

/**
 * Elle yönlendirmeler (ör. eski web sitesinin adresleri). Proxy tarafından ~1 dk önbellekle uygulanır.
 * Ürün/kategori adresi değişince oluşan yönlendirmeler otomatiktir; buraya eklemeye gerek yoktur.
 */
export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: {
    singular: { tr: 'Yönlendirme', en: 'Redirect' },
    plural: { tr: 'Yönlendirmeler', en: 'Redirects' },
  },
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type', 'updatedAt'],
    group: { tr: 'SEO', en: 'SEO' },
    description: {
      tr: 'Eski web sitesinin adreslerini veya kaldırılan sayfaları yeni adreslere bağlayın. Değişiklikler en geç 1 dakikada etkinleşir. Ürün/kategori adresi değiştiğinde yönlendirme zaten otomatik yapılır.',
      en: 'Map old URLs to new ones. Takes effect within a minute.',
    },
  },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: { tr: 'Eski adres', en: 'From' },
      admin: {
        placeholder: '/urunler.php?id=12  veya  https://eskisite.com/hakkimizda.html',
        description: { tr: 'Tam adres yapıştırabilirsiniz; alan adı otomatik çıkarılır.', en: 'Full URLs are accepted; the domain is stripped.' },
      },
      hooks: { beforeValidate: [normalizeFrom] },
      validate: (value: unknown) => {
        const v = String(value ?? '')
        if (!v) return 'Eski adres zorunludur.'
        if (/^\/(admin|api|_next)(\/|$)/.test(v)) return 'Panel ve sistem adresleri yönlendirilemez.'
        return true
      },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      label: { tr: 'Yeni adres', en: 'To' },
      admin: {
        placeholder: '/tr/urunler/nikel-sulfat',
        description: { tr: 'Site içi adres (/ ile başlar) veya tam adres (https://…).', en: 'Internal path or full URL.' },
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        const v = String(value ?? '').trim()
        if (!v) return 'Yeni adres zorunludur.'
        if (!v.startsWith('/') && !/^https?:\/\//i.test(v)) return 'Adres / veya https:// ile başlamalı.'
        if (siblingData?.from && normalizeRedirectPath(v) === siblingData.from) return 'Eski ve yeni adres aynı olamaz.'
        return true
      },
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: '301',
      label: { tr: 'Tür', en: 'Type' },
      options: [
        { label: { tr: '301 — Kalıcı (SEO için önerilen)', en: '301 — Permanent' }, value: '301' },
        { label: { tr: '302 — Geçici', en: '302 — Temporary' }, value: '302' },
      ],
    },
    { name: 'note', type: 'text', label: { tr: 'Not', en: 'Note' } },
  ],
}
