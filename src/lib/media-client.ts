import type { Media } from '@/payload-types'

export const asMediaClient = (value: unknown): Media | null =>
  value && typeof value === 'object' && 'url' in (value as Media) ? (value as Media) : null
