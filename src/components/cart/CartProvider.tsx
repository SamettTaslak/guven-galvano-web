'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: number
  slug: string
  name: string
  image?: string | null
  unit: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  update: (id: number, quantity: number) => void
  remove: (id: number) => void
  clear: () => void
  has: (id: number) => boolean
}

const STORAGE_KEY = 'galvano-quote-basket-v1'
const MAX_ITEMS = 50
const CartContext = createContext<CartContextValue | null>(null)

const readStorage = (): CartItem[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as CartItem[]).filter((i) => typeof i?.id === 'number') : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(readStorage())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* gizli sekme vb. — sepet bellekte çalışmaya devam eder */
    }
  }, [items, hydrated])

  const add = useCallback<CartContextValue['add']>((item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i))
      if (prev.length >= MAX_ITEMS) return prev
      return [...prev, { ...item, quantity }]
    })
    setIsOpen(true)
  }, [])

  const update = useCallback((id: number, quantity: number) => {
    const q = Math.max(1, Math.min(1_000_000, Math.round(quantity) || 1))
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: q } : i)))
  }, [])

  const remove = useCallback((id: number) => setItems((prev) => prev.filter((i) => i.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.length,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      update,
      remove,
      clear,
      has: (id) => items.some((i) => i.id === id),
    }),
    [items, isOpen, add, update, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart, CartProvider içinde kullanılmalı')
  return ctx
}
