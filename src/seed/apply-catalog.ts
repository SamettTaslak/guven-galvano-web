/** Katalog verisini (prosesler, CAS, formüller, WhatsApp) panele yükler: npm run catalog:apply */
import config from '@payload-config'
import { getPayload } from 'payload'

import { applyCatalogData } from './catalog'

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await applyCatalogData(await getPayload({ config }))
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
