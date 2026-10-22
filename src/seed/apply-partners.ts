/** Örnek firma logolarını ve kart görsellerini yükler: npm run partners:apply */
import config from '@payload-config'
import { getPayload } from 'payload'

import { applyPartnerMedia } from './partners'

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await applyPartnerMedia(await getPayload({ config }))
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
