import clsx from 'clsx'

import { MediaImage } from '@/components/MediaImage'
import type { Partner } from '@/payload-types'
import { asMediaClient } from '@/lib/media-client'

/** Sonsuz kayan logo şeridi (CSS animasyonu, JS gerektirmez). */
export function PartnerMarquee({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null
  const loop = [...partners, ...partners]
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <ul className="marquee flex w-max gap-6 group-hover:[animation-play-state:paused]" style={{ ['--marquee-duration' as string]: `${partners.length * 4}s` }}>
        {loop.map((p, i) => {
          const logo = asMediaClient(p.logo)
          return (
            <li
              key={`${p.id}-${i}`}
              aria-hidden={i >= partners.length}
              className={clsx(
                'relative flex h-24 w-52 shrink-0 items-center justify-center rounded-xl border px-6 transition duration-500',
                p.logoPlate === 'dark' ? 'border-ink-800 bg-ink-900 text-white' : 'border-steel-300/40 bg-white text-ink-700',
                p.grayscale !== false && 'grayscale hover:grayscale-0',
              )}
            >
              {logo ? (
                <div className="relative h-12 w-full">
                  <MediaImage media={logo} size="logo" sizes="200px" className="!object-contain" alt={p.name} />
                </div>
              ) : (
                <span className="font-display text-sm font-bold uppercase tracking-widest">{p.name}</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
