import 'server-only'

import config from '@payload-config'
import { cache } from 'react'
import { getPayload, type GlobalSlug } from 'payload'

import type { Media } from '@/payload-types'
import type { Locale } from './i18n'
import { asMediaClient } from './media-client'

export const getPayloadClient = cache(() => getPayload({ config }))

/** Ziyaretçi için sayfa global'i (erişim kuralları uygulanmadan, sunucu tarafında). */
export const getGlobal = cache(async <T extends GlobalSlug>(slug: T, locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, locale, depth: 2 })
})

export const getSettings = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  // overrideAccess varsayılan olarak true; alıcı e-postaları asla istemciye gönderilmez.
  const settings = await payload.findGlobal({ slug: 'site-settings', locale, depth: 1 })
  const { quoteRecipients: _omit, ...publicSettings } = settings
  return publicSettings
})

export type PublicSettings = Awaited<ReturnType<typeof getSettings>>

export const asMedia = asMediaClient

export const asMediaList = (value: unknown): Media[] =>
  Array.isArray(value) ? (value.map(asMedia).filter(Boolean) as Media[]) : []
