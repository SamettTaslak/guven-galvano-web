import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import clsx from 'clsx'

import { MediaImage } from '@/components/MediaImage'
import { asMediaClient } from '@/lib/media-client'
import type { ProductCategory } from '@/payload-types'

/** Büyük görselli kategori karosu: sadece ad görünür, hover'da açıklama kayar. */
export function CategoryTile({
  category,
  link,
  className,
  index,
  count,
}: {
  category: ProductCategory
  link: string
  className?: string
  index?: number
  /** Örn. "12 ürün" — verilirse sağ üstte rozet olarak görünür. */
  count?: string
}) {
  return (
    <Link href={link} className={clsx('group relative block overflow-hidden rounded-2xl bg-ink-900 text-white', className)}>
      <MediaImage
        media={asMediaClient(category.image)}
        size="wide"
        sizes="(min-width:1024px) 50vw, 100vw"
        className="transition duration-[1.8s] ease-soft group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
      {count && (
        <span className="absolute right-5 top-5 rounded-full bg-ink-950/60 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-md">
          {count}
        </span>
      )}
      {index != null && (
        <span className="absolute left-6 top-6 font-display text-sm font-semibold text-white/50">{String(index + 1).padStart(2, '0')}</span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
        <div>
          <h3 className="font-display text-2xl font-bold md:text-3xl">{category.name}</h3>
          {category.summary && (
            <p className="mt-2 max-w-sm text-sm text-white/0 transition duration-500 group-hover:text-white/75">{category.summary}</p>
          )}
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/30 transition duration-500 group-hover:rotate-[-45deg] group-hover:border-brand-400 group-hover:bg-brand-gradient">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  )
}
