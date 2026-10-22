/**
 * Medya kütüphanesindeki yer tutucu görsellerin dosyalarını assets/stock/ altındaki
 * fotoğraflarla değiştirir. Kayıt kimlikleri korunduğu için ürün/sayfa bağlantıları bozulmaz.
 *   npm run media:stock
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { placeholderSets, type PlaceholderKey } from './placeholders'
import { loadStockPhoto } from './stock'

async function main() {
  const payload = await getPayload({ config })
  let replaced = 0

  for (const key of Object.keys(placeholderSets) as PlaceholderKey[]) {
    const data = await loadStockPhoto(key)
    if (!data) {
      payload.logger.warn(`Fotoğraf yok, atlandı: ${key}`)
      continue
    }
    const found = await payload.find({
      collection: 'media',
      where: { filename: { like: key } },
      limit: 10,
      depth: 0,
    })
    // "port" araması "port2"yi de bulur; tam eşleşmeyi seç.
    const doc = found.docs.find((d) => d.filename?.replace(/(-\d+)?\.\w+$/, '') === key)
    if (!doc) {
      payload.logger.warn(`Medya kaydı bulunamadı: ${key}`)
      continue
    }
    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {},
      file: { data, mimetype: 'image/jpeg', name: `${key}.jpg`, size: data.length },
    })
    replaced++
    payload.logger.info(`✓ ${key}`)
  }

  // Çinko anot için depo görseli yerine metal/anot görseli daha uygun.
  const anode = await payload.find({ collection: 'media', where: { filename: { like: 'crystalsCopper' } }, limit: 1, depth: 0 })
  const zinc = await payload.find({ collection: 'products', where: { code: { equals: 'GK-ZA-10' } }, limit: 1, depth: 0 })
  if (anode.docs[0] && zinc.docs[0]) {
    await payload.update({ collection: 'products', id: zinc.docs[0].id, data: { coverImage: anode.docs[0].id } })
  }

  payload.logger.info(`Tamamlandı: ${replaced} görsel değiştirildi.`)
  process.exit(0)
}

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
