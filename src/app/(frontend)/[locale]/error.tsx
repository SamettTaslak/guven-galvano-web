'use client'

import { RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { getDictionary, isLocale } from '@/lib/i18n'

/** Sayfa render hatası: kullanıcıya sade bir mesaj, ayrıntı yalnızca sunucu günlüğünde. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale: string }>()
  const locale = isLocale(params?.locale ?? '') ? (params.locale as 'tr' | 'en') : 'tr'
  const t = getDictionary(locale)

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="grid min-h-[80vh] place-items-center bg-metal px-4 text-center text-white">
      <div className="max-w-lg">
        <p className="h-display text-[clamp(4rem,14vw,9rem)] leading-none text-brand-400">500</p>
        <h1 className="h-display mt-6 text-3xl">{t.error}</h1>
        <p className="mt-4 text-white/70">{t.errorHint}</p>
        {error.digest && <p className="mt-3 font-mono text-xs text-white/30">#{error.digest}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn-brand">
            <RotateCcw className="h-4 w-4" />
            {t.retry}
          </button>
          <Link href={`/${locale}`} className="btn-ghost">
            {t.toHome}
          </Link>
        </div>
      </div>
    </section>
  )
}
