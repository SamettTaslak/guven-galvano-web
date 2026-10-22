'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { MediaImage } from '@/components/MediaImage'
import type { Media } from '@/payload-types'

/** Dikey kaydırmayla yatay akan büyük görsel şeridi (tesis / depo / drone fotoğrafları). */
export function ScrollGallery({ title, images }: { title?: string | null; images: Media[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${Math.max(0, images.length - 1.6) * (100 / images.length)}%`])

  if (!images.length) return null

  if (reduce) {
    return (
      <section className="container-x grid gap-4 py-24 md:grid-cols-3">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <MediaImage media={img} size="wide" />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section ref={ref} className="relative bg-ink-950" style={{ height: `${images.length * 60}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {title && (
          <h2 className="h-display container-x mb-10 text-4xl text-white md:text-6xl">
            {title}
          </h2>
        )}
        <motion.div style={{ x }} className="flex gap-6 pl-4 md:pl-12">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="relative h-[55vh] shrink-0 overflow-hidden rounded-2xl"
              style={{ width: i % 3 === 1 ? '34vw' : '48vw', minWidth: 280 }}
            >
              <MediaImage media={img} size="wide" sizes="50vw" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
