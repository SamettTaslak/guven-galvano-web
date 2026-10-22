'use client'

import { useRowLabel } from '@payloadcms/ui'

import { HOME_SECTIONS } from '@/lib/home-sections'

/** Sıralama listesinde satır başlığı: "2. Rakamlar" / gizliyse "(gizli)". */
export function HomeSectionRowLabel() {
  const { data, rowNumber } = useRowLabel<{ section?: string; visible?: boolean }>()
  const label = HOME_SECTIONS.find((s) => s.value === data?.section)?.label.tr ?? 'Bölüm seçin'
  return (
    <span style={{ opacity: data?.visible === false ? 0.5 : 1 }}>
      {(rowNumber ?? 0) + 1}. {label}
      {data?.visible === false && ' (gizli)'}
    </span>
  )
}
