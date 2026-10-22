'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { MediaImage, mediaUrl } from '@/components/MediaImage'
import type { Media } from '@/payload-types'

/** Masonry galeri + tam ekran lightbox (klavye ile gezinme). */
export function Gallery({ images, className }: { images: Media[]; className?: string }) {
  const [active, setActive] = useState<number | null>(null)

  const move = useCallback(
    (dir: number) => setActive((i) => (i == null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (active == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, move])

  if (!images.length) return null
  const current = active != null ? images[active] : null

  return (
    <>
      <div className={clsx('columns-1 gap-4 sm:columns-2 lg:columns-3', className)}>
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
            className="group relative mb-4 block w-full overflow-hidden rounded-xl bg-ink-800"
            style={{ aspectRatio: img.width && img.height ? `${img.width}/${img.height}` : '4/3' }}
          >
            <MediaImage media={img} size="card" sizes="(min-width:1024px) 33vw, 100vw" className="transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-ink-950/0 transition group-hover:bg-ink-950/20" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-950/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              key={current.id}
              src={mediaUrl(current, 'hero') ?? ''}
              alt={current.alt ?? ''}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[88vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" aria-label="Kapat" className="absolute right-5 top-5 text-white/80 hover:text-white">
              <X className="h-8 w-8" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Önceki"
                  onClick={(e) => (e.stopPropagation(), move(-1))}
                  className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  aria-label="Sonraki"
                  onClick={(e) => (e.stopPropagation(), move(1))}
                  className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
