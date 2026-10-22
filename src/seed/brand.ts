import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

const BRAND_DIR = path.resolve(process.cwd(), 'public/brand')

/**
 * public/brand altındaki logo varyantlarını Medya Kütüphanesi'ne yükler ve
 * Site Ayarları'ndaki logo alanlarına bağlar. Tekrar çalıştırılırsa mevcut kayıtları günceller.
 */
export async function applyBrandLogos(payload: Payload) {
  const upload = async (file: string, alt: { tr: string; en: string }) => {
    const data = fs.readFileSync(path.join(BRAND_DIR, file))
    const fileData = { data, mimetype: 'image/png', name: file, size: data.length }
    const existing = await payload.find({ collection: 'media', where: { filename: { like: file.replace('.png', '') } }, limit: 1, depth: 0 })
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'media', id: existing.docs[0].id, locale: 'tr', data: { alt: alt.tr }, file: fileData })
      : await payload.create({ collection: 'media', locale: 'tr', data: { alt: alt.tr }, file: fileData })
    await payload.update({ collection: 'media', id: doc.id, locale: 'en', data: { alt: alt.en } })
    return doc.id
  }

  const logo = await upload('logo-dark.png', { tr: 'Güven Galvano Kimyasalları logosu', en: 'Güven Galvano Kimyasalları logo' })
  const logoLight = await upload('logo-light.png', { tr: 'Güven Galvano Kimyasalları logosu (koyu zemin)', en: 'Güven Galvano Kimyasalları logo (dark)' })
  await payload.updateGlobal({ slug: 'site-settings', data: { logo, logoLight } })
  payload.logger.info('✓ Logolar Site Ayarları’na bağlandı.')
}
