import clsx from 'clsx'
import { ArrowUpRight } from 'lucide-react'

import { MediaImage } from '@/components/MediaImage'
import { asMediaClient } from '@/lib/media-client'
import type { Partner } from '@/payload-types'

const Logo = ({ partner, className }: { partner: Partner; className?: string }) => {
  const logo = asMediaClient(partner.logo)
  return logo ? (
    <div className={clsx('relative', className)}>
      <MediaImage media={logo} size="logo" sizes="240px" className="!object-contain" alt={partner.name} />
    </div>
  ) : (
    <span className="font-display text-base font-bold uppercase tracking-widest">{partner.name}</span>
  )
}

/**
 * Çalıştığımız firma kartı.
 *  - Kart görseli varsa: fotoğraf arka plan + üstte logo plakası + altta ad/ülke
 *  - Yalnız logo varsa: logo ortada, ad hover'da alttan kayar
 *  - Hiçbiri yoksa: firma adı
 */
export function PartnerCard({ partner, relationLabel }: { partner: Partner; relationLabel: string }) {
  const photo = asMediaClient(partner.image)
  const dark = partner.logoPlate === 'dark'
  const gray = partner.grayscale !== false
  const Wrapper = partner.website ? 'a' : 'div'
  const linkProps = partner.website ? { href: partner.website, target: '_blank', rel: 'noopener noreferrer' } : {}

  if (photo) {
    return (
      <Wrapper {...linkProps} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink-900 text-white">
        <MediaImage media={photo} size="card" sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" className="transition duration-[1.6s] ease-soft group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-ink-950/10" />

        {/* Logo plakası */}
        <div
          className={clsx(
            'absolute left-4 top-4 flex h-16 w-36 items-center justify-center rounded-xl p-3 shadow-lg backdrop-blur-md transition duration-500 group-hover:-translate-y-0.5',
            dark ? 'bg-ink-900/85 text-white' : 'bg-white/95 text-ink-900',
          )}
        >
          <Logo partner={partner} className={clsx('h-full w-full transition duration-500', gray && 'grayscale group-hover:grayscale-0')} />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold">{partner.name}</p>
            <p className="mt-0.5 flex items-center gap-2 text-xs text-white/70">
              <span className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide">{relationLabel}</span>
              {partner.country}
            </p>
          </div>
          {partner.website && (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 transition group-hover:border-brand-400 group-hover:bg-brand-500">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper
      {...linkProps}
      className={clsx(
        'group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border p-8 transition duration-500 hover:-translate-y-1 hover:shadow-xl',
        dark ? 'border-ink-800 bg-ink-900 text-white' : 'border-steel-300/40 bg-white text-ink-700',
      )}
    >
      <Logo partner={partner} className={clsx('h-20 w-full transition duration-500', gray && 'grayscale group-hover:grayscale-0')} />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-2 bg-ink-900 px-4 py-3 text-xs text-white transition duration-500 group-hover:translate-y-0">
        <span className="truncate font-semibold">{partner.name}</span>
        <span className="flex shrink-0 items-center gap-1 text-white/60">
          {partner.country}
          {partner.website && <ArrowUpRight className="h-3.5 w-3.5" />}
        </span>
      </div>
    </Wrapper>
  )
}
