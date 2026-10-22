'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { MediaImage } from '@/components/MediaImage'
import type { Media } from '@/payload-types'

export function ProductGallery({ images, name }: { images: Media[]; name: string }) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : [null]

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-ink-900">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MediaImage media={list[active]} size="wide" priority sizes="(min-width:1024px) 50vw, 100vw" alt={name} />
          </motion.div>
        </AnimatePresence>
      </div>
      {list.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {list.map((img, i) => (
            <button
              key={img?.id ?? i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${name} ${i + 1}`}
              className={clsx(
                'relative aspect-square overflow-hidden rounded-xl ring-2 ring-offset-2 transition',
                i === active ? 'ring-brand-500' : 'ring-transparent opacity-60 hover:opacity-100',
              )}
            >
              <MediaImage media={img} size="thumb" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
