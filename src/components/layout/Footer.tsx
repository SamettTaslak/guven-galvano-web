import { BRAND_NAME } from '@/lib/brand'
import { Mail, MapPin, Phone, Printer } from 'lucide-react'
import Link from 'next/link'

import { mediaUrl } from '@/components/MediaImage'
import { SocialIcon } from '@/components/SocialIcon'
import { asMediaClient } from '@/lib/media-client'
import { type Dictionary, type Locale, href, routes } from '@/lib/i18n'
import type { PublicSettings } from '@/lib/payload'

export function Footer({ locale, t, settings }: { locale: Locale; t: Dictionary; settings: PublicSettings }) {
  const links = [
    { href: href(locale, routes.about), label: t.nav.about },
    { href: href(locale, routes.products), label: t.nav.products },
    { href: href(locale, routes.partners), label: t.nav.partners },
    { href: href(locale, routes.contact), label: t.nav.contact },
    { href: href(locale, routes.quote), label: t.quote },
  ]

  return (
    <footer className="bg-metal relative overflow-hidden text-white/70">
      <div aria-hidden className="brand-rule absolute inset-x-0 top-0 opacity-70" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-brand-500/15 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl(asMediaClient(settings.logoLight)) || '/brand/logo-light.png'}
            alt={settings.siteName ?? BRAND_NAME}
            className="h-14 w-auto"
          />
          {settings.footerNote && <p className="mt-4 max-w-sm text-sm leading-relaxed">{settings.footerNote}</p>}
          <div className="mt-6 flex gap-2">
            {settings.socials?.map((s) => (
              <a
                key={s.id ?? s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              >
                <SocialIcon platform={s.platform} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Alt menü">
          <ul className="space-y-3 font-display text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-brand-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-4 text-sm">
          {settings.address && (
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span className="whitespace-pre-line">{settings.address}</span>
            </li>
          )}
          {settings.phones?.map((p) => (
            <li key={p.id ?? p.number} className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-400" />
              <a href={`tel:${p.number.replace(/\s/g, '')}`} className="hover:text-white">
                {p.number}
              </a>
            </li>
          ))}
          {settings.fax && (
            <li className="flex gap-3">
              <Printer className="h-4 w-4 shrink-0 text-brand-400" />
              <span>
                {t.contactCards.fax}: {settings.fax}
              </span>
            </li>
          )}
          {settings.emails?.map((e) => (
            <li key={e.id ?? e.email} className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-400" />
              <a href={`mailto:${e.email}`} className="hover:text-white">
                {e.email}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {settings.legalName || settings.siteName || BRAND_NAME}. {t.rights}
          </p>
          <Link href={href(locale, routes.privacy)} className="transition hover:text-white">
            {t.privacy}
          </Link>
        </div>
      </div>
    </footer>
  )
}
