import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { tr } from '@payloadcms/translations/languages/tr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { BRAND_NAME } from './lib/brand'
import { panelEmailAdapter } from './lib/email-adapter'
import { seoPluginConfig } from './lib/seo-config'
import { Media } from './collections/Media'
import { Partners } from './collections/Partners'
import { ProductCategories } from './collections/ProductCategories'
import { Processes } from './collections/Processes'
import { Redirects } from './collections/Redirects'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { EmailSettings } from './globals/EmailSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage, ContactPage, PartnersPage, PrivacyPage, ProductsPage, QuotePage } from './globals/Pages'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Panel ve API'ye istek yapabilecek kökenler: sitenin adresi (+ geliştirmede localhost).
const SITE_ORIGINS = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000', 'http://127.0.0.1:3000'] : []),
].filter((v): v is string => Boolean(v))

const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 300)
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024

const requireEnv = (key: string): string => {
  const value = process.env[key]
  if (!value) throw new Error(`Eksik ortam değişkeni: ${key}`)
  return value
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  // Çerezle kimlik doğrulamada yalnızca sitenin kendi adresinden gelen istekler kabul edilir (CSRF koruması).
  csrf: SITE_ORIGINS,
  cors: SITE_ORIGINS,
  // Site GraphQL kullanmıyor; gereksiz saldırı yüzeyi olarak kapalı.
  graphQL: { disable: true },
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ` — ${BRAND_NAME} Yönetim` },
    // Logo açık zemin için tasarlandı; koyu temada "G" ikonu kayboluyordu.
    theme: 'light',
    components: {
      afterNavLinks: ['/components/admin/SeoNavLink#SeoNavLink'],
      views: {
        seoKontrol: { Component: '/components/admin/SeoReport#SeoReport', path: '/seo-kontrol', meta: { title: 'SEO Kontrol' } },
      },
      graphics: {
        Logo: '/components/admin/Brand#AdminLogo',
        Icon: '/components/admin/Brand#AdminIcon',
      },
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: {
    supportedLanguages: { tr, en },
    fallbackLanguage: 'tr',
  },
  localization: {
    locales: [
      { code: 'tr', label: 'Türkçe' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'tr',
    fallback: true,
  },
  collections: [Products, ProductCategories, Processes, Partners, Media, Redirects, Users],
  globals: [HomePage, AboutPage, ProductsPage, PartnersPage, ContactPage, QuotePage, PrivacyPage, SiteSettings, EmailSettings],
  editor: lexicalEditor(),
  secret: requireEnv('PAYLOAD_SECRET'),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: requireEnv('DATABASE_URL') },
    // Şema, geliştirmede otomatik; üretimde migration ile yönetilir.
    push: process.env.NODE_ENV !== 'production',
  }),
  // Gönderim yöntemi panelden seçilir (Ayarlar → E-posta Gönderimi); .env yalnızca varsayılandır.
  email: panelEmailAdapter({
    fromAddress: process.env.SMTP_FROM || 'web@galvanokimya.com',
    fromName: BRAND_NAME,
    envSmtp: {
      host: process.env.SMTP_HOST || '127.0.0.1',
      port: Number(process.env.SMTP_PORT || 1025),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || undefined,
      pass: process.env.SMTP_PASS || undefined,
    },
  }),
  // Büyük dosyalar (drone videoları) için yükleme sınırı. Üretimde ters proxy'de
  // (nginx client_max_body_size) da aynı değer verilmelidir.
  // Payload varsayılanı dosya başına 20 MB / istek başına 50 MB'tır; ikisi birlikte yükseltilir.
  upload: {
    limits: { fileSize: MAX_UPLOAD_BYTES },
    requestSizeLimit: MAX_UPLOAD_BYTES + 2 * 1024 * 1024, // form alanları için pay
    abortOnLimit: true,
    responseOnLimit: `Dosya çok büyük (en fazla ${MAX_UPLOAD_MB} MB).`,
  },
  sharp,
  plugins: [seoPlugin(seoPluginConfig)],
})
