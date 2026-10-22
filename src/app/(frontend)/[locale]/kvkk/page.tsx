import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'

import { Reveal } from '@/components/motion/Reveal'
import { type Locale, getDictionary, routes } from '@/lib/i18n'
import { resolveLocale } from '@/lib/locale'
import { getGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const page = await getGlobal('privacy-page', locale)
  return buildMetadata({ locale, path: routes.privacy, meta: page.meta, title: page.title || getDictionary(locale).privacy })
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale: Locale = await resolveLocale(params)
  const t = getDictionary(locale)
  const page = await getGlobal('privacy-page', locale)

  return (
    <>
      <div className="bg-metal pb-16 pt-36 text-white md:pb-20 md:pt-44">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-4 !text-brand-300">{t.privacy}</p>
            <h1 className="h-display max-w-4xl text-4xl md:text-6xl">{page.title || t.privacy}</h1>
            {page.lastUpdated && (
              <p className="mt-5 text-sm text-white/50">
                {new Date(page.lastUpdated).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            )}
          </Reveal>
        </div>
      </div>
      <section className="container-x py-16 md:py-24">
        {page.content && (
          <div className="max-w-3xl space-y-5 leading-relaxed text-ink-700 [&_a]:text-brand-600 [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-ink-900 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
            <RichText data={page.content} />
          </div>
        )}
      </section>
    </>
  )
}
