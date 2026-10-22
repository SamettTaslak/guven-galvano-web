'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ShoppingBasket, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { type Dictionary, type Locale, href, routes } from '@/lib/i18n'
import { CartLines } from './CartLines'
import { useCart } from './CartProvider'

export function CartDrawer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { isOpen, close, items } = useCart()
  const pathname = usePathname()

  useEffect(() => close(), [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink-950/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t.quote}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-ink-900 text-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <p className="flex items-center gap-3 font-display text-lg font-semibold">
                <ShoppingBasket className="h-5 w-5 text-brand-400" />
                {t.quote}
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{items.length}</span>
              </p>
              <button type="button" onClick={close} aria-label={t.close} className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length ? (
                <CartLines locale={locale} t={t} dark />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <motion.div initial={{ scale: 0.6, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} className="grid h-24 w-24 place-items-center rounded-full bg-white/5">
                    <ShoppingBasket className="h-10 w-10 text-white/40" />
                  </motion.div>
                  <p className="font-display text-lg">{t.cartEmpty}</p>
                  <p className="text-sm text-white/50">{t.cartEmptyHint}</p>
                  <Link href={href(locale, routes.products)} onClick={close} className="btn-ghost mt-4">
                    {t.browseProducts}
                  </Link>
                </div>
              )}
            </div>

            {!!items.length && (
              <div className="border-t border-white/10 p-6">
                <Link href={href(locale, routes.quote)} onClick={close} className="btn-brand w-full">
                  {t.goToQuote}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
