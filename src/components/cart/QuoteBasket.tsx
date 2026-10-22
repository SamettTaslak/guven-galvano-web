'use client'

import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'

import { InquiryForm } from '@/components/forms/InquiryForm'
import { type Dictionary, type Locale, href, routes } from '@/lib/i18n'
import { CartLines } from './CartLines'
import { useCart } from './CartProvider'

export function QuoteBasket({ locale, t, successMessage }: { locale: Locale; t: Dictionary; successMessage?: string | null }) {
  const { items } = useCart()

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div>
        <h2 className="h-display mb-6 flex items-center gap-3 text-2xl">
          <ShoppingBasket className="h-6 w-6 text-brand-500" />
          {t.quote}
          <span className="rounded-full bg-ink-900 px-2.5 py-0.5 text-sm text-white">{items.length}</span>
        </h2>
        {items.length ? (
          <CartLines locale={locale} t={t} />
        ) : (
          <div className="rounded-3xl border border-dashed border-steel-300 p-12 text-center">
            <p className="font-display text-lg">{t.cartEmpty}</p>
            <p className="mt-2 text-sm text-steel-500">{t.cartEmptyHint}</p>
            <Link href={href(locale, routes.products)} className="btn-dark mt-6">
              {t.browseProducts}
            </Link>
          </div>
        )}
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(11,31,51,0.35)] md:p-10">
        <InquiryForm mode="quote" locale={locale} t={t} successMessage={successMessage} />
      </div>
    </div>
  )
}
