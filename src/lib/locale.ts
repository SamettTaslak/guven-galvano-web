import 'server-only'

import { notFound } from 'next/navigation'

import { type Locale, isLocale } from './i18n'

/** Sayfa parametresindeki dili doğrular; geçersizse 404. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return locale
}
