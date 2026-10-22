'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

import { PartnerCard } from '@/components/PartnerCard'
import type { Partner } from '@/payload-types'

type Filter = 'all' | 'supplier' | 'customer'

export function PartnersGrid({
  partners,
  labels,
}: {
  partners: Partner[]
  labels: { all: string; supplier: string; customer: string; supplierOne: string; customerOne: string }
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = useMemo(() => (filter === 'all' ? partners : partners.filter((p) => p.relation === filter)), [partners, filter])
  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: labels.all, count: partners.length },
    { key: 'supplier', label: labels.supplier, count: partners.filter((p) => p.relation === 'supplier').length },
    { key: 'customer', label: labels.customer, count: partners.filter((p) => p.relation === 'customer').length },
  ]

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={filter === tab.key}
            onClick={() => setFilter(tab.key)}
            className={clsx(
              'relative rounded-full px-5 py-2.5 font-display text-sm font-semibold transition',
              filter === tab.key ? 'text-white' : 'text-ink-700 hover:bg-steel-100',
            )}
          >
            {filter === tab.key && <motion.span layoutId="partner-tab" className="absolute inset-0 rounded-full bg-ink-900" />}
            <span className="relative">
              {tab.label} <span className="opacity-50">({tab.count})</span>
            </span>
          </button>
        ))}
      </div>

      <motion.ul layout className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => {
            return (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: Math.min(i, 12) * 0.03 }}
              >
                <PartnerCard partner={p} relationLabel={p.relation === 'supplier' ? labels.supplierOne : labels.customerOne} />
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  )
}
