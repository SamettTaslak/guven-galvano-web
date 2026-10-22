import { MediaImage } from '@/components/MediaImage'
import { Parallax, Reveal } from '@/components/motion/Reveal'
import type { Media } from '@/payload-types'

/** İç sayfaların üstündeki görsel başlık (paralaks). */
export function PageHero({
  image,
  title,
  subtitle,
  eyebrow,
}: {
  image?: Media | null
  title?: string | null
  subtitle?: string | null
  eyebrow?: string
}) {
  return (
    <section className="relative flex h-[62vh] min-h-[420px] items-end overflow-hidden bg-ink-950 text-white">
      <Parallax className="absolute inset-0">
        <MediaImage media={image} size="hero" priority className="scale-105" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-brand-800/30" />
      <div className="container-x relative pb-14 md:pb-20">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-4 !text-brand-300">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <h1 className="h-display max-w-4xl text-4xl md:text-6xl lg:text-7xl">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-lg text-white/70">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
