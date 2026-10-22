'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { MediaImage, mediaUrl } from '@/components/MediaImage'
import type { Media } from '@/payload-types'
import { TradeMap, type TradeRoute } from './TradeMap'

export type HeroSlide = { image: Media | null; video: Media | null; caption?: string | null }

const INTERVAL = 7000

export function HeroSlider({
  title,
  subtitle,
  slides,
  hub,
  routes,
  labels,
}: {
  title: string
  subtitle?: string | null
  slides: HeroSlide[]
  hub: { lat: number; lng: number; name?: string | null }
  routes: TradeRoute[]
  labels: { import: string; export: string; scroll: string }
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = Math.max(slides.length, 1)

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + total) % total), [total])

  useEffect(() => {
    if (paused || reduce || total < 2) return
    const id = window.setTimeout(() => go(1), INTERVAL)
    return () => window.clearTimeout(id)
  }, [index, paused, reduce, total, go])

  const slide = slides[index]
  const videoSrc = mediaUrl(slide?.video)
  const words = title.split(' ').filter(Boolean)
  // Logodaki gibi: 3+ kelimede ilk kelime ("GÜVEN"), 2 kelimede son kelime vurgulanır.
  const accentIndex = words.length >= 3 ? 0 : words.length === 2 ? 1 : -1
  // En uzun kelime ekran genişliğine sığacak şekilde yazı boyutu (büyük harf ≈ 0.68em).
  const longest = Math.max(...words.map((w) => w.length), 1)
  const titleSize = `clamp(2.25rem, ${(86 / (longest * 0.68)).toFixed(2)}vw, 8.5rem)`

  return (
    <section
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Arka plan slaytları: çapraz geçiş + Ken Burns */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.4, ease: [0.45, 0, 0.25, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.5, ease: 'linear' }}
          >
            {videoSrc ? (
              <video className="absolute inset-0 h-full w-full object-cover" src={videoSrc} autoPlay muted loop playsInline />
            ) : (
              <MediaImage media={slide?.image} size="hero" priority={index === 0} />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/50 to-ink-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,rgb(17_112_171/0.22)_0%,transparent_70%),radial-gradient(ellipse_at_center,transparent_0%,rgb(10_17_24/0.65)_78%)]" />

      {/* Ticaret rotaları haritası */}
      <div className="absolute inset-0 opacity-90 mix-blend-screen">
        <TradeMap hub={hub} routes={routes} />
      </div>

      {/* Başlık */}
      <div className="container-x relative z-10 flex h-full flex-col items-center justify-center pt-[12vh] text-center">
        <h1 className="h-display leading-[0.9]" style={{ fontSize: titleSize }}>
          {words.map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.08em] pt-[0.14em] align-top">
              <motion.span
                className={wi === accentIndex ? 'inline-block text-brand-300' : 'inline-block'}
                initial={reduce ? false : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.5 + wi * 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
                {wi < words.length - 1 && ' '}
              </motion.span>
            </span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base text-white/75 md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {slide?.caption && (
            <motion.p
              key={`cap-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="eyebrow mt-8 !text-brand-300"
            >
              {slide.caption}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Alt kontrol çubuğu */}
      <div className="container-x absolute inset-x-0 bottom-8 z-10 flex items-end justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm tabular-nums text-white/80">
            <span className="text-white">{String(index + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-white/30">/</span>
            {String(total).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slayt ${i + 1}`}
                className="relative h-0.5 w-10 overflow-hidden bg-white/25 md:w-16"
              >
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-brand-500"
                    initial={{ width: paused || reduce ? '100%' : '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: paused || reduce ? 0 : INTERVAL / 1000, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>
          {total > 1 && (
            <div className="hidden gap-1 md:flex">
              <button type="button" onClick={() => go(-1)} aria-label="Önceki" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 hover:bg-white/10">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Sonraki" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium backdrop-blur-md sm:flex"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-silver-300 shadow-[0_0_10px] shadow-silver-300" />
            {labels.import}
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_10px] shadow-brand-400" />
            {labels.export}
          </span>
        </motion.div>

        <a href="#content" className="hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60 md:flex">
          {labels.scroll}
          <motion.span animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </a>
      </div>
    </section>
  )
}
