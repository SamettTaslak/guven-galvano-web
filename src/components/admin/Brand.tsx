/* eslint-disable @next/next/no-img-element */
import { BRAND_NAME } from '@/lib/brand'

/** Admin paneli giriş ekranı logosu (açık zemin). */
export function AdminLogo() {
  return <img src="/brand/logo-dark.png" alt={BRAND_NAME} style={{ height: 96, width: 'auto' }} />
}

/** Admin menüsündeki küçük ikon: logodaki "G" kıvrımı. */
export function AdminIcon() {
  return <img src="/brand/mark-dark.png" alt="" style={{ height: 30, width: 'auto' }} />
}
