/** Firmanın gerçek iletişim bilgilerini panele yazar: npm run contact:apply */
import config from '@payload-config'
import { getPayload } from 'payload'

import { applyContactInfo } from './contact'

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await applyContactInfo(await getPayload({ config }))
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
