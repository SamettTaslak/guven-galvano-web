'use client'

import clsx from 'clsx'
import { Check, Plus } from 'lucide-react'

import { useCart, type CartItem } from '@/components/cart/CartProvider'

/** Sepete ilk eklemede önerilen miktar (birime göre). */
const DEFAULT_QTY: Record<string, number> = { kg: 25, lt: 200, ton: 1, pcs: 1 }

export function AddToQuoteButton({
  item,
  label,
  addedLabel,
  variant = 'solid',
}: {
  item: Omit<CartItem, 'quantity'>
  label: string
  addedLabel: string
  variant?: 'solid' | 'icon'
}) {
  const { add, has, open } = useCart()
  const inCart = has(item.id)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCart) open()
    else add(item, DEFAULT_QTY[item.unit] ?? 1)
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={inCart ? addedLabel : label}
        className={clsx(
          'grid h-11 w-11 place-items-center rounded-full shadow-lg transition duration-300 hover:scale-110',
          inCart ? 'bg-ink-900 text-white' : 'bg-brand-500 text-white',
        )}
      >
        {inCart ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </button>
    )
  }

  return (
    <button type="button" onClick={onClick} className={inCart ? 'btn-dark' : 'btn-brand'}>
      {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {inCart ? addedLabel : label}
    </button>
  )
}
