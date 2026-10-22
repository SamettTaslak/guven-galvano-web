/** Logo varyantlarını panele yükler: npm run brand:apply */
import config from '@payload-config'
import { getPayload } from 'payload'

import { applyBrandLogos } from './brand'

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await applyBrandLogos(await getPayload({ config }))
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
