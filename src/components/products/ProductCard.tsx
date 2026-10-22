import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { MediaImage, mediaUrl } from '@/components/MediaImage'
import { type Dictionary, type Locale, href, routes } from '@/lib/i18n'
import { asMediaClient } from '@/lib/media-client'
import type { Product, ProductCategory } from '@/payload-types'
import { AddToQuoteButton } from './AddToQuoteButton'

export function ProductCard({ product, locale, t }: { product: Product; locale: Locale; t: Dictionary }) {
  const cover = asMediaClient(product.coverImage)
  const category = typeof product.category === 'object' ? (product.category as ProductCategory) : null

  return (
    <Link
      href={href(locale, `${routes.products}/${product.slug}`)}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-900 text-white"
    >
      <MediaImage
        media={cover}
        size="card"
        sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 100vw"
        className="transition duration-[1.6s] ease-soft group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/20 to-transparent transition duration-500 group-hover:from-ink-950" />

      <div className="absolute right-4 top-4 z-10 translate-y-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <AddToQuoteButton
          variant="icon"
          label={t.addToQuote}
          addedLabel={t.added}
          item={{
            id: product.id,
            slug: product.slug ?? '',
            name: product.name,
            image: mediaUrl(cover, 'thumb'),
            unit: product.unit ?? 'kg',
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        {category && <p className="eyebrow mb-2 !text-brand-300">{category.name}</p>}
        <h3 className="font-display text-xl font-semibold leading-tight">{product.name}</h3>
        <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            {product.summary && <p className="pt-2 text-sm text-white/70 line-clamp-2">{product.summary}</p>}
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-300">
              {t.viewProduct} <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
