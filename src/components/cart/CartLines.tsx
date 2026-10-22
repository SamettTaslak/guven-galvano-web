'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { type Dictionary, type Locale, href, routes } from '@/lib/i18n'
import { useCart } from './CartProvider'

const unitText = (unit: string, locale: Locale) => (unit === 'pcs' ? (locale === 'tr' ? 'adet' : 'pcs') : unit)

/** Sepet satırları: miktar düzenleme ve kaldırma (çekmece ve teklif sayfasında ortak). */
export function CartLines({ locale, t, dark }: { locale: Locale; t: Dictionary; dark?: boolean }) {
  const { items, update, remove, close } = useCart()
  const step = (unit: string) => (unit === 'ton' ? 1 : unit === 'pcs' ? 1 : 25)

  return (
    <ul className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30, height: 0, marginTop: 0 }}
            className={`flex items-center gap-4 rounded-2xl p-3 ${dark ? 'bg-white/5' : 'border border-steel-300/40 bg-white'}`}
          >
            <Link
              href={href(locale, `${routes.products}/${item.slug}`)}
              onClick={close}
              className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-ink-800 to-steel-500"
            >
              {item.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              )}
            </Link>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display font-semibold">{item.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="-"
                  onClick={() => update(item.id, item.quantity - step(item.unit))}
                  className="grid h-7 w-7 place-items-center rounded-full border border-current/20 opacity-70 hover:opacity-100"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="number"
                  min={1}
                  inputMode="numeric"
                  aria-label={t.quantity}
                  value={item.quantity}
                  onChange={(e) => update(item.id, Number(e.target.value))}
                  className={`w-20 rounded-md px-2 py-1 text-center text-sm outline-none ${dark ? 'bg-white/10' : 'bg-steel-100'}`}
                />
                <button
                  type="button"
                  aria-label="+"
                  onClick={() => update(item.id, item.quantity + step(item.unit))}
                  className="grid h-7 w-7 place-items-center rounded-full border border-current/20 opacity-70 hover:opacity-100"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <span className="text-sm opacity-60">{unitText(item.unit, locale)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => remove(item.id)}
              aria-label={t.remove}
              className="grid h-9 w-9 place-items-center rounded-full opacity-50 transition hover:bg-red-500/10 hover:text-red-500 hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
