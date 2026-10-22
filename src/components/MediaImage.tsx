import Image from 'next/image'
import clsx from 'clsx'

import type { Media } from '@/payload-types'

type Size = 'thumb' | 'card' | 'wide' | 'hero' | 'logo'

/** Payload, serverURL tanımlıyken mutlak URL döner; aynı origin'den sunulduğu için yolu göreli hale getiriyoruz. */
const toRelative = (url: string): string => {
  const i = url.indexOf('/api/media/')
  return i > 0 ? url.slice(i) : url
}

export const mediaUrl = (media: Media | null | undefined, size?: Size): string | null => {
  if (!media) return null
  const url = (size && media.sizes?.[size]?.url) || media.url
  return url ? toRelative(url) : null
}

/**
 * CMS görseli. Görsel yoksa marka renklerinde bir degrade gösterir,
 * böylece içerik girilmeden de tasarım bozulmaz.
 */
export function MediaImage({
  media,
  size = 'card',
  className,
  sizes = '100vw',
  priority,
  alt,
}: {
  media: Media | null | undefined
  size?: Size
  className?: string
  sizes?: string
  priority?: boolean
  alt?: string
}) {
  const src = mediaUrl(media, size)
  if (!src) {
    return (
      <div
        aria-hidden
        className={clsx('absolute inset-0 bg-gradient-to-br from-ink-800 via-ink-700 to-steel-500', className)}
      />
    )
  }
  const pos =
    media?.focalX != null && media?.focalY != null ? `${media.focalX}% ${media.focalY}%` : 'center'
  return (
    <Image
      src={src}
      alt={alt ?? media?.alt ?? ''}
      fill
      sizes={sizes}
      priority={priority}
      // SVG (vektör logolar) Next görsel optimizasyonundan geçirilmez.
      unoptimized={media?.mimeType === 'image/svg+xml'}
      className={clsx('object-cover', className)}
      style={{ objectPosition: pos }}
    />
  )
}
