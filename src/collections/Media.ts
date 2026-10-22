import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { tr: 'Medya', en: 'Media' },
    plural: { tr: 'Medya Kütüphanesi', en: 'Media Library' },
  },
  admin: { group: { tr: 'İçerik', en: 'Content' } },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      label: { tr: 'Alternatif metin', en: 'Alt text' },
      admin: {
        description: {
          tr: 'Görseli kısaca tarif edin (erişilebilirlik ve SEO için).',
          en: 'Short description of the image (accessibility & SEO).',
        },
      },
    },
  ],
  upload: {
    // Docker'da bu klasör kalıcı volume olarak bağlanır.
    staticDir: process.env.MEDIA_DIR || path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumb', width: 480, height: 360, position: 'centre' },
      { name: 'card', width: 960, height: 720, position: 'centre' },
      { name: 'wide', width: 1600 },
      { name: 'hero', width: 2400 },
      // Logolar için: kırpma yok, yalnızca genişlik sınırı.
      { name: 'logo', width: 600, withoutEnlargement: true },
    ],
    // Logo/şeffaf görseller panel önizlemesinde kırpılmasın.
    adminThumbnail: ({ doc }) => {
      const d = doc as { mimeType?: string; url?: string; sizes?: Record<string, { url?: string | null }> }
      if (d.mimeType === 'image/svg+xml') return d.url ?? null
      if (d.mimeType === 'image/png' || d.mimeType === 'image/webp') return d.sizes?.logo?.url ?? d.url ?? null
      return d.sizes?.thumb?.url ?? d.url ?? null
    },
  },
}
