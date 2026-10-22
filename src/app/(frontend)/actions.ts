'use server'

import { contactSchema, emailLayout, escapeHtml, headerSafe, infoTable, quoteSchema, rateLimited, type FormState } from '@/lib/forms'
import { getPayloadClient } from '@/lib/payload'

const unitLabel: Record<string, string> = { kg: 'kg', ton: 'ton', lt: 'lt', pcs: 'adet' }

async function getRecipients(): Promise<string[]> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  return (settings.quoteRecipients ?? []).map((r) => r.email).filter(Boolean)
}

/** Teklif sepeti: talep veritabanına yazılmaz, yalnızca mail grubuna gönderilir. */
export async function submitQuote(input: unknown): Promise<FormState> {
  const parsed = quoteSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'validation', fields: parsed.error.issues.map((i) => String(i.path[0])) }
  const data = parsed.data
  if (data.website) return { ok: true } // bot — sessizce yut
  if (await rateLimited('quote')) return { ok: false, error: 'rate' }

  try {
    const payload = await getPayloadClient()
    const recipients = await getRecipients()
    if (!recipients.length) {
      payload.logger.error('Teklif alıcı e-postası tanımlı değil (Site Ayarları → Teklif E-postaları).')
      return { ok: false, error: 'server' }
    }

    // Ürün adlarını istemciden değil veritabanından al.
    const products = await payload.find({
      collection: 'products',
      locale: 'tr',
      where: { and: [{ id: { in: data.items.map((i) => i.id) } }, { isActive: { equals: true } }] },
      limit: 50,
      depth: 1,
    })
    const byId = new Map(products.docs.map((p) => [p.id, p]))
    const lines = data.items.filter((i) => byId.has(i.id))
    if (!lines.length) return { ok: false, error: 'validation', fields: ['items'] }

    const rows = lines
      .map((line, idx) => {
        const p = byId.get(line.id)!
        const cat = typeof p.category === 'object' && p.category ? p.category.name : ''
        return `<tr>
<td style="border-bottom:1px solid #e9edf1">${idx + 1}</td>
<td style="border-bottom:1px solid #e9edf1"><strong>${escapeHtml(p.name)}</strong>${p.code ? `<br><span style="color:#66717c">${escapeHtml(p.code)}</span>` : ''}</td>
<td style="border-bottom:1px solid #e9edf1">${escapeHtml(cat)}</td>
<td style="border-bottom:1px solid #e9edf1;text-align:right;white-space:nowrap">${line.quantity.toLocaleString('tr-TR')} ${unitLabel[line.unit]}</td>
</tr>`
      })
      .join('')

    const body = `${infoTable([
      ['Firma', data.company],
      ['Yetkili', data.name],
      ['E-posta', data.email],
      ['Telefon', data.phone],
      ['Ülke / şehir', data.country],
      ['Site dili', data.locale.toUpperCase()],
      ['Not', data.message],
    ])}
<h3 style="margin:28px 0 8px;font-size:16px">İlgilenilen ürünler (${lines.length})</h3>
<table cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
<tr style="background:#f5f7f9;text-align:left"><th>#</th><th>Ürün</th><th>Kategori</th><th style="text-align:right">Miktar</th></tr>${rows}</table>`

    await payload.sendEmail({
      to: recipients,
      replyTo: data.email,
      subject: headerSafe(`Teklif Talebi — ${data.company} (${lines.length} ürün)`),
      html: emailLayout('Yeni teklif talebi', body),
    })
    return { ok: true }
  } catch (err) {
    const payload = await getPayloadClient()
    payload.logger.error({ err }, 'Teklif e-postası gönderilemedi')
    return { ok: false, error: 'server' }
  }
}

/** İletişim formu: aynı mail grubuna gönderilir. */
export async function submitContact(input: unknown): Promise<FormState> {
  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'validation', fields: parsed.error.issues.map((i) => String(i.path[0])) }
  const data = parsed.data
  if (data.website) return { ok: true }
  if (await rateLimited('contact')) return { ok: false, error: 'rate' }

  try {
    const payload = await getPayloadClient()
    const recipients = await getRecipients()
    if (!recipients.length) return { ok: false, error: 'server' }
    await payload.sendEmail({
      to: recipients,
      replyTo: data.email,
      subject: headerSafe(`İletişim Formu — ${data.company}`),
      html: emailLayout(
        'Yeni iletişim mesajı',
        infoTable([
          ['Firma', data.company],
          ['Ad Soyad', data.name],
          ['E-posta', data.email],
          ['Telefon', data.phone],
          ['Ülke / şehir', data.country],
          ['Mesaj', data.message],
        ]),
      ),
    })
    return { ok: true }
  } catch (err) {
    const payload = await getPayloadClient()
    payload.logger.error({ err }, 'İletişim e-postası gönderilemedi')
    return { ok: false, error: 'server' }
  }
}
