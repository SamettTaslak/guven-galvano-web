import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'

import { CartProvider } from '@/components/cart/CartProvider'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { WhatsappButton } from '@/components/WhatsappButton'
import { BRAND_NAME } from '@/lib/brand'
import { getDictionary, isLocale, locales } from '@/lib/i18n'
import { getSettings } from '@/lib/payload'
import { JsonLd, absoluteUrl, siteUrl } from '@/lib/seo'
import { normalizeWhatsapp } from '@/lib/whatsapp'
import '../globals.css'

// Başlıklar: Türkçe karakterlerde dengeli, kurumsal bir grotesk.
const display = Plus_Jakarta_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-display-face', display: 'swap' })
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-jetbrains', display: 'swap' })

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const settings = await getSettings(locale)
  const name = settings.siteName || BRAND_NAME
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: { default: name, template: `%s | ${name}` },
    description: settings.tagline || undefined,
    // hreflang / canonical her sayfada ayrı üretilir (lib/seo → buildMetadata).
    openGraph: { siteName: name, locale: locale === 'tr' ? 'tr_TR' : 'en_US' },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const settings = await getSettings(locale)
  const t = getDictionary(locale)
  const whatsapp = normalizeWhatsapp(settings.whatsappNumber)
  // Firma bilgisi (Google bilgi paneli / arama sonuçları için).
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName || BRAND_NAME,
    url: `${siteUrl()}/${locale}`,
    logo: absoluteUrl('/brand/logo-dark.png'),
    description: settings.tagline || undefined,
    email: settings.emails?.[0]?.email,
    legalName: settings.legalName || undefined,
    telephone: settings.phones?.[0]?.number,
    faxNumber: settings.fax || undefined,
    address: settings.address ? { '@type': 'PostalAddress', streetAddress: settings.address.replace(/\n/g, ', ') } : undefined,
    sameAs: settings.socials?.map((s) => s.url).filter(Boolean),
  }

  return (
    <html lang={locale} className={`${display.variable} ${inter.variable} ${mono.variable}`} data-scroll-behavior="smooth">
      <body>
        <JsonLd data={organizationLd} />
        <CartProvider>
          <Header locale={locale} t={t} settings={settings} />
          <main>{children}</main>
          <Footer locale={locale} t={t} settings={settings} />
          <CartDrawer locale={locale} t={t} />
          {whatsapp && <WhatsappButton number={whatsapp} message={settings.whatsappMessage} label={t.whatsapp} />}
        </CartProvider>
      </body>
    </html>
  )
}
