'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { MediaImage, mediaUrl } from '@/components/MediaImage'
import { Parallax, Reveal } from '@/components/motion/Reveal'
import type { Media } from '@/payload-types'

/** Tam genişlik paralaks görsel bant; video varsa oynat butonu ile modalda açılır. */
export function ShowcaseBand({
  image,
  video,
  title,
  subtitle,
  playLabel,
}: {
  image: Media | null
  video: Media | null
  title?: string | null
  subtitle?: string | null
  playLabel: string
}) {
  const [open, setOpen] = useState(false)
  const videoSrc = mediaUrl(video)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden bg-ink-950 text-white">
      <Parallax className="absolute inset-0">
        <MediaImage media={image} size="hero" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-brand-800/25 to-ink-950/45" />
      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        {videoSrc && (
          <Reveal>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={playLabel}
              className="group relative mb-10 grid h-24 w-24 place-items-center rounded-full bg-white/10 backdrop-blur-md transition hover:bg-brand-500"
            >
              <span className="absolute inset-0 animate-ping rounded-full border border-white/40" />
              <Play className="ml-1 h-8 w-8 fill-white" />
            </button>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <h2 className="h-display text-4xl md:text-7xl">{title}</h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p className="mt-4 text-lg text-white/70">{subtitle}</p>
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {open && videoSrc && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-ink-950/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <button type="button" className="absolute right-6 top-6 text-white" aria-label="Kapat">
              <X className="h-8 w-8" />
            </button>
            <motion.video
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={videoSrc}
              controls
              autoPlay
              className="max-h-[85vh] w-full max-w-6xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
