'use client'

import clsx from 'clsx'
import { Check, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'

import { useCart, type CartItem } from '@/components/cart/CartProvider'

const DEFAULT_QTY: Record<string, number> = { kg: 25, lt: 200, ton: 1, pcs: 1 }

/** Katalog satırında miktar + "Teklife Ekle". Ürün sepetteyse miktarı günceller. */
export function QuickAdd({
  item,
  unitLabel,
  label,
  addedLabel,
}: {
  item: Omit<CartItem, 'quantity'>
  unitLabel: string
  label: string
  addedLabel: string
}) {
  const { add, has, update, open, items } = useCart()
  const inCart = has(item.id)
  const cartQty = items.find((i) => i.id === item.id)?.quantity
  const [qty, setQty] = useState<number>(cartQty ?? DEFAULT_QTY[item.unit] ?? 1)

  const submit = () => {
    const q = Math.max(1, Math.min(1_000_000, Math.round(qty) || 1))
    if (inCart) {
      update(item.id, q)
      open()
    } else add(item, q)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-lg bg-steel-100/80 focus-within:ring-2 focus-within:ring-brand-500/30">
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          aria-label={`${item.name} — ${unitLabel}`}
          className="w-16 bg-transparent py-2 pl-3 text-right font-mono text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="pr-3 pl-1.5 font-mono text-xs text-steel-500">{unitLabel}</span>
      </div>
      <button
        type="button"
        onClick={submit}
        className={clsx(
          'inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-white transition',
          inCart ? 'bg-ink-800 hover:bg-ink-700' : 'bg-brand-500 hover:bg-brand-600',
        )}
      >
        {inCart ? <Check className="h-3.5 w-3.5" /> : <ShoppingBasket className="h-3.5 w-3.5" />}
        {inCart ? addedLabel : label}
      </button>
    </div>
  )
}

/** Sayfa başlığındaki "Teklif Sepetim (n)" butonu. */
export function BasketButton({ label }: { label: string }) {
  const { count, open } = useCart()
  return (
    <button type="button" onClick={open} className="btn-brand">
      <ShoppingBasket className="h-4 w-4" />
      {label}
      <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[11px]">{count}</span>
    </button>
  )
}
