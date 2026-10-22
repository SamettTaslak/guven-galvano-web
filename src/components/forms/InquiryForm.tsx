'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Loader2, Send } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'

import { submitContact, submitQuote } from '@/app/(frontend)/actions'
import { useCart } from '@/components/cart/CartProvider'
import { type Dictionary, type Locale, href, routes } from '@/lib/i18n'

type Fields = { company: string; name: string; email: string; phone: string; country: string; message: string; website: string }
const empty: Fields = { company: '', name: '', email: '', phone: '', country: '', message: '', website: '' }

/** Teklif ve iletişim formu (mode ile seçilir). Gönderim e-posta ile yapılır. */
export function InquiryForm({
  mode,
  locale,
  t,
  successMessage,
  dark,
  initialMessage,
}: {
  mode: 'quote' | 'contact'
  locale: Locale
  t: Dictionary
  successMessage?: string | null
  dark?: boolean
  /** "Belge İste" gibi bağlantılardan gelen hazır mesaj. */
  initialMessage?: string
}) {
  const { items, clear } = useCart()
  const [values, setValues] = useState<Fields>({ ...empty, message: initialMessage?.slice(0, 3000) ?? '' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'rate'>('idle')
  const [invalid, setInvalid] = useState<string[]>([])
  const [pending, startTransition] = useTransition()

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInvalid([])
    startTransition(async () => {
      const base = { ...values, locale }
      const res =
        mode === 'quote'
          ? await submitQuote({ ...base, items: items.map((i) => ({ id: i.id, quantity: i.quantity, unit: i.unit })) })
          : await submitContact(base)
      if (res.ok) {
        setStatus('success')
        setValues(empty)
        if (mode === 'quote') clear()
      } else {
        setStatus(res.error === 'rate' ? 'rate' : 'error')
        setInvalid(res.fields ?? [])
      }
    })
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={clsx('flex flex-col items-center gap-5 rounded-3xl p-12 text-center', dark ? 'bg-white/5' : 'bg-white')}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.15 }}
          className="grid h-20 w-20 place-items-center rounded-full bg-brand-500 text-white"
        >
          <Check className="h-10 w-10" />
        </motion.span>
        <p className="font-display text-xl font-semibold">{successMessage || t.form.success}</p>
      </motion.div>
    )
  }

  const field = (key: keyof Fields, label: string, opts: { type?: string; required?: boolean; auto?: string } = {}) => (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider opacity-60">
        {label}
        {opts.required && ' *'}
      </span>
      <input
        type={opts.type ?? 'text'}
        required={opts.required}
        autoComplete={opts.auto}
        value={values[key]}
        onChange={set(key)}
        maxLength={key === 'phone' ? 40 : 160}
        aria-invalid={invalid.includes(key)}
        className={clsx('field', invalid.includes(key) && '!border-red-500')}
      />
    </label>
  )

  const disabled = pending || (mode === 'quote' && !items.length)

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        {field('company', t.form.company, { required: true, auto: 'organization' })}
        {field('name', t.form.name, { required: true, auto: 'name' })}
        {field('email', t.form.email, { type: 'email', required: true, auto: 'email' })}
        {field('phone', t.form.phone, { type: 'tel', auto: 'tel' })}
      </div>
      {field('country', t.form.country, { auto: 'country-name' })}
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-wider opacity-60">{t.form.message}</span>
        <textarea value={values.message} onChange={set('message')} rows={4} maxLength={3000} className="field resize-none" />
      </label>

      {/* Honeypot — ekran okuyucular ve kullanıcılardan gizli */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      <AnimatePresence>
        {(status === 'error' || status === 'rate') && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600" role="alert">
            {t.form.error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs opacity-60">
          {t.form.kvkk}{' '}
          <Link href={href(locale, routes.privacy)} target="_blank" className="underline underline-offset-2 hover:text-brand-500">
            {t.form.kvkkLink}
          </Link>
        </p>
        <button type="submit" disabled={disabled} className="btn-brand shrink-0">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {pending ? t.form.sending : mode === 'quote' ? t.form.submit : t.form.send}
        </button>
      </div>
    </form>
  )
}
