/** KVKK şablonunu ve öne çıkan ürünler başlığını panele yükler: npm run privacy:apply */
import config from '@payload-config'
import { getPayload } from 'payload'

import { applyPrivacyAndFeatured } from './privacy'

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await applyPrivacyAndFeatured(await getPayload({ config }))
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
