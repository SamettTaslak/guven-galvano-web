'use client'

import { BRAND_NAME } from '@/lib/brand'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, ShoppingBasket, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useCart } from '@/components/cart/CartProvider'
import { mediaUrl } from '@/components/MediaImage'
import { asMediaClient } from '@/lib/media-client'
import { type Dictionary, type Locale, href, routes } from '@/lib/i18n'
import type { PublicSettings } from '@/lib/payload'

export function Header({ locale, t, settings }: { locale: Locale; t: Dictionary; settings: PublicSettings }) {
  const pathname = usePathname()
  const { count, open } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Hero'lu sayfalarda menü şeffaf başlar, kaydırınca koyulaşır.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const links = [
    { href: href(locale, routes.home), label: t.nav.home },
    { href: href(locale, routes.about), label: t.nav.about },
    { href: href(locale, routes.products), label: t.nav.products },
    { href: href(locale, routes.partners), label: t.nav.partners },
    { href: href(locale, routes.contact), label: t.nav.contact },
  ]

  const isActive = (link: string) =>
    link === `/${locale}` ? pathname === link : pathname === link || pathname.startsWith(`${link}/`)

  const otherLocale: Locale = locale === 'tr' ? 'en' : 'tr'
  const switchHref = pathname.replace(/^\/(tr|en)(?=\/|$)/, `/${otherLocale}`)
  const logo = mediaUrl(asMediaClient(settings.logoLight))
  const solid = scrolled || mobileOpen

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-soft',
        solid ? 'bg-ink-950/75 py-3 shadow-[0_10px_30px_-15px_rgb(0_0_0/0.5)] backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent py-5',
      )}
    >
      <div aria-hidden className={clsx('brand-rule absolute inset-x-0 bottom-0 transition-opacity duration-700', solid ? 'opacity-60' : 'opacity-0')} />
      <div className="container-x flex items-center justify-between gap-6">
        <Link href={href(locale)} className="flex min-w-0 shrink items-center" aria-label={settings.siteName ?? BRAND_NAME}>
          {/* Koyu zemin logosu (Site Ayarları → Logo (koyu zemin)); yoksa varsayılan marka dosyası. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo || '/brand/logo-light.png'}
            alt={settings.siteName ?? BRAND_NAME}
            className={clsx('w-auto transition-all duration-500', solid ? 'h-9 sm:h-10' : 'h-10 sm:h-12')}
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Ana menü">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                'relative whitespace-nowrap rounded-md px-4 py-2 font-display text-sm font-medium text-white/80 transition hover:text-white',
                isActive(l.href) && 'text-white',
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-brand-400" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href={switchHref}
            className="rounded-md border border-white/20 px-2 py-1.5 font-display text-[11px] sm:px-2.5 sm:text-xs font-semibold tracking-wider text-white/80 transition hover:border-white hover:text-white"
          >
            <span className={clsx(locale === 'tr' && 'text-brand-300')}>TR</span>
            <span className="mx-1 text-white/30">|</span>
            <span className={clsx(locale === 'en' && 'text-brand-300')}>EN</span>
          </Link>
          <button
            type="button"
            onClick={open}
            className="relative grid h-10 w-10 place-items-center rounded-full text-white transition hover:bg-white/10"
            aria-label={t.quote}
          >
            <ShoppingBasket className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-bold"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-white xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t.close : t.menu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden xl:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-6">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    href={l.href}
                    className={clsx(
                      'block border-b border-white/10 py-4 font-display text-2xl font-semibold',
                      isActive(l.href) ? 'text-brand-300' : 'text-white',
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
