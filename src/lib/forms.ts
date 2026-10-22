import 'server-only'

import { headers } from 'next/headers'
import { z } from 'zod'

import { getClientIp } from './client-ip'

export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!)

/** E-posta başlıklarına satır sonu enjeksiyonunu engeller. */
export const headerSafe = (value: string): string => value.replace(/[\r\n]+/g, ' ').trim()

const trimmed = (max: number) => z.string().trim().max(max)

export const contactSchema = z.object({
  company: trimmed(160).min(2),
  name: trimmed(120).min(2),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: trimmed(40).regex(/^[0-9+()\-\s]*$/).optional().or(z.literal('')),
  country: trimmed(120).optional().or(z.literal('')),
  message: trimmed(3000).optional().or(z.literal('')),
  // Honeypot: gerçek kullanıcılar bu alanı görmez, doldurmaz.
  website: z.string().max(0).optional().or(z.literal('')),
  locale: z.enum(['tr', 'en']).default('tr'),
})

export const quoteSchema = contactSchema.extend({
  items: z
    .array(
      z.object({
        id: z.number().int().positive(),
        quantity: z.number().positive().max(1_000_000),
        unit: z.enum(['kg', 'ton', 'lt', 'pcs']),
      }),
    )
    .min(1)
    .max(50),
})

export type FormState = { ok: boolean; error?: 'validation' | 'rate' | 'server'; fields?: string[] }

// Basit, süreç içi IP hız sınırı (tek konteyner için yeterli).
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

export async function rateLimited(bucket: string): Promise<boolean> {
  const h = await headers()
  const ip = getClientIp(h)
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((ts) => now - ts < WINDOW_MS)) hits.delete(k)
  }
  return false
}

export const emailLayout = (title: string, body: string) => `<!doctype html>
<html><body style="margin:0;background:#f5f7f9;font-family:Arial,Helvetica,sans-serif;color:#14181d">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px">
<table width="640" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden">
<tr><td style="background:#14181d;border-bottom:4px solid #1170ab;color:#fff;padding:20px 28px;font-size:18px;font-weight:bold;letter-spacing:2px">GÜVEN <span style="color:#8ec5ea;font-weight:normal">GALVANO KİMYASALLARI</span></td></tr>
<tr><td style="padding:28px"><h2 style="margin:0 0 20px;font-size:20px">${title}</h2>${body}</td></tr>
</table></td></tr></table></body></html>`

export const infoTable = (rows: [string, string | undefined | null][]) =>
  `<table cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #e9edf1;color:#66717c;width:160px">${escapeHtml(k)}</td><td style="border-bottom:1px solid #e9edf1;white-space:pre-wrap">${escapeHtml(v!)}</td></tr>`,
    )
    .join('')}</table>`
