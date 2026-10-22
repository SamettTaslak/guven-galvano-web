/** Hakkımızda sayfasının ayrıntılı TR/EN içeriğini panele yükler: npm run about:apply */
import config from '@payload-config'
import { getPayload } from 'payload'

import { applyAboutContent } from './about'

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await applyAboutContent(await getPayload({ config }))
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
