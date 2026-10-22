'use client'

import clsx from 'clsx'
import { Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useCatalogUrl } from './useCatalogUrl'

type Option = { slug: string; name: string; count: number }
type Labels = {
  search: string
  filters: string
  reset: string
  group: string
  process: string
  perPage: string
  sort: string
  sortOptions: { value: string; label: string }[]
}

/** Arama kutusu: yazmayı bırakınca 350 ms sonra uygular. */
export function CatalogSearch({ placeholder }: { placeholder: string }) {
  const { params, set, pending } = useCatalogUrl()
  const [value, setValue] = useState(params.get('q') ?? '')

  useEffect(() => {
    if (value === (params.get('q') ?? '')) return
    const id = window.setTimeout(() => set({ q: value.trim().slice(0, 80) || null }), 350)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <label className="relative block w-full">
      <Search className={clsx('pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500', pending && 'animate-pulse')} />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        maxLength={80}
        className="field border-transparent bg-steel-100/80 pl-11"
      />
    </label>
  )
}

function CheckList({ title, options, paramKey }: { title: string; options: Option[]; paramKey: string }) {
  const { params, toggleInList } = useCatalogUrl()
  const selected = (params.get(paramKey) ?? '').split(',').filter(Boolean)
  return (
    <fieldset className="border-b border-steel-300/40 py-4 last:border-0">
      <legend className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-steel-500">{title}</legend>
      <ul className="space-y-0.5">
        {options.map((o) => {
          const checked = selected.includes(o.slug)
          const disabled = !checked && o.count === 0
          return (
            <li key={o.slug}>
              <label
                className={clsx(
                  'flex cursor-pointer items-center gap-3 rounded-md px-1.5 py-1.5 text-sm transition hover:bg-steel-100',
                  disabled && 'cursor-not-allowed opacity-40 hover:bg-transparent',
                )}
              >
                <input type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={() => toggleInList(paramKey, o.slug)} />
                <span
                  aria-hidden
                  className={clsx(
                    'grid h-4 w-4 shrink-0 place-items-center rounded border transition peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/40',
                    checked ? 'border-brand-500 bg-brand-500 text-white' : 'border-steel-300 bg-white',
                  )}
                >
                  {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className={clsx('flex-1', checked && 'font-semibold text-ink-900')}>{o.name}</span>
                <span className="font-mono text-[11px] text-steel-500">{o.count}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

/** Sol filtre paneli; mobilde "Filtreler" butonuyla açılır. */
export function CatalogFilters({ groups, processes, labels }: { groups: Option[]; processes: Option[]; labels: Labels }) {
  const { params, set } = useCatalogUrl()
  const [open, setOpen] = useState(false)
  const activeCount = ['grup', 'proses'].reduce((n, k) => n + (params.get(k) ?? '').split(',').filter(Boolean).length, 0)

  return (
    <div className="lg:sticky lg:top-24">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-steel-300/60 bg-white px-4 py-3 font-display text-sm font-semibold lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {labels.filters}
          {activeCount > 0 && <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[11px] text-white">{activeCount}</span>}
        </span>
        <ChevronDown className={clsx('h-4 w-4 transition', open && 'rotate-180')} />
      </button>

      <div className={clsx('mt-3 rounded-xl border border-steel-300/60 bg-white px-4 lg:mt-0 lg:block', open ? 'block' : 'hidden')}>
        <div className="flex items-center justify-between border-b border-steel-300/40 py-3.5">
          <p className="flex items-center gap-2 font-display font-semibold">
            <SlidersHorizontal className="h-4 w-4 text-brand-500" />
            {labels.filters}
          </p>
          {activeCount > 0 && (
            <button type="button" onClick={() => set({ grup: null, proses: null })} className="flex items-center gap-1 font-mono text-[11px] text-steel-500 hover:text-brand-600">
              <X className="h-3 w-3" />
              {labels.reset}
            </button>
          )}
        </div>
        <CheckList title={labels.group} options={groups} paramKey="grup" />
        {!!processes.length && <CheckList title={labels.process} options={processes} paramKey="proses" />}
      </div>
    </div>
  )
}

/** Sayfa başına ve sıralama seçimleri. */
export function CatalogToolbar({ perPage, sort, labels }: { perPage: number; sort: string; labels: Labels }) {
  const { set } = useCatalogUrl()
  const select =
    'appearance-none rounded-lg border border-steel-300/60 bg-white py-2 pl-3 pr-8 font-mono text-xs font-medium text-ink-900 outline-none focus:border-brand-500'
  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500 xl:inline">{labels.perPage}</span>
        <span className="relative">
          <select value={perPage} onChange={(e) => set({ adet: e.target.value === '20' ? null : e.target.value })} aria-label={labels.perPage} className={select}>
            {[20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel-500" />
        </span>
      </label>
      <label className="flex items-center gap-2">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-steel-500 xl:inline">{labels.sort}</span>
        <span className="relative">
          <select value={sort} onChange={(e) => set({ sirala: e.target.value === 'sira' ? null : e.target.value })} aria-label={labels.sort} className={select}>
            {labels.sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel-500" />
        </span>
      </label>
    </div>
  )
}
