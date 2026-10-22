'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'

/** Katalog filtrelerini URL'de tutar (paylaşılabilir bağlantı, geri tuşu çalışır). */
export function useCatalogUrl() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [pending, startTransition] = useTransition()

  const set = useCallback(
    (updates: Record<string, string | null>) => {
      const sp = new URLSearchParams(params.toString())
      for (const [k, v] of Object.entries(updates)) (v ? sp.set(k, v) : sp.delete(k))
      // Filtre değişince ilk sayfaya dön.
      if (!('sayfa' in updates)) sp.delete('sayfa')
      const qs = sp.toString().replace(/%2C/g, ',')
      startTransition(() => router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false }))
    },
    [params, pathname, router],
  )

  const toggleInList = useCallback(
    (key: string, value: string) => {
      const current = (params.get(key) ?? '').split(',').filter(Boolean)
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      set({ [key]: next.join(',') || null })
    },
    [params, set],
  )

  return { params, set, toggleInList, pending }
}
