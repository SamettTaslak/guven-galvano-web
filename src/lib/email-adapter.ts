import nodemailer from 'nodemailer'
import type { EmailAdapter, Payload, SendEmailOptions } from 'payload'

import { parseServiceAccountKey, sendViaGmailApi } from './gmail-api'
import { decryptSecret } from './secrets'

type EnvSmtp = { host: string; port: number; secure: boolean; user?: string; pass?: string }
type Address = { address: string; name?: string }

/** "Ad <a@b>", "a@b", {address, name} veya bunların listesi → Address[] */
const toAddresses = (value: unknown): Address[] => {
  if (!value) return []
  const list = Array.isArray(value) ? value : String(value).includes(',') && typeof value === 'string' ? value.split(',') : [value]
  return list
    .map((v): Address | null => {
      if (v && typeof v === 'object' && 'address' in v) return { address: String((v as Address).address), name: (v as Address).name }
      const s = String(v).trim()
      const m = s.match(/^\s*"?([^"<]*)"?\s*<([^>]+)>\s*$/)
      return m ? { address: m[2].trim(), name: m[1].trim() || undefined } : s ? { address: s } : null
    })
    .filter((a): a is Address => !!a)
}

// --- Microsoft Graph (OAuth2 client credentials) ---
const tokenCache = new Map<string, { token: string; expires: number }>()

async function graphToken(tenantId: string, clientId: string, clientSecret: string): Promise<string> {
  const key = `${tenantId}:${clientId}`
  const cached = tokenCache.get(key)
  if (cached && cached.expires > Date.now() + 60_000) return cached.token

  const res = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
    }),
    signal: AbortSignal.timeout(15_000),
  })
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error_description?: string }
  if (!res.ok || !json.access_token) {
    throw new Error(`Microsoft oturum açma hatası: ${(json.error_description ?? res.statusText).split('\r\n')[0]}`)
  }
  tokenCache.set(key, { token: json.access_token, expires: Date.now() + (json.expires_in ?? 3600) * 1000 })
  return json.access_token
}

async function sendViaGraph(cfg: { tenantId: string; clientId: string; clientSecret: string; mailbox: string }, message: SendEmailOptions, from: Address) {
  const token = await graphToken(cfg.tenantId, cfg.clientId, cfg.clientSecret)
  const recipients = (v: unknown) => toAddresses(v).map((a) => ({ emailAddress: { address: a.address, name: a.name } }))
  const html = typeof message.html === 'string' ? message.html : undefined
  const body = {
    message: {
      subject: message.subject ?? '',
      body: { contentType: html ? 'HTML' : 'Text', content: html ?? (typeof message.text === 'string' ? message.text : '') },
      toRecipients: recipients(message.to),
      ccRecipients: recipients(message.cc),
      bccRecipients: recipients(message.bcc),
      replyTo: recipients(message.replyTo),
      // Gönderen adres posta kutusundan farklıysa (alias / "Send As" yetkisi) belirtilir.
      ...(from.address.toLowerCase() !== cfg.mailbox.toLowerCase() ? { from: { emailAddress: from } } : {}),
    },
    saveToSentItems: true,
  }
  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(cfg.mailbox)}/sendMail`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  })
  if (res.status !== 202) {
    const err = (await res.json().catch(() => ({}))) as { error?: { code?: string; message?: string } }
    if (res.status === 401 || res.status === 403) tokenCache.delete(`${cfg.tenantId}:${cfg.clientId}`)
    throw new Error(`Microsoft Graph gönderim hatası (${res.status}${err.error?.code ? ` ${err.error.code}` : ''}): ${err.error?.message ?? res.statusText}`)
  }
  return { provider: 'microsoft', accepted: true }
}

// --- SMTP ---
const smtpSend = (opts: EnvSmtp & { security?: 'starttls' | 'ssl' | 'none' }, message: SendEmailOptions, from: Address) => {
  const security = opts.security ?? (opts.secure ? 'ssl' : 'none')
  const transport = nodemailer.createTransport({
    host: opts.host,
    port: opts.port,
    secure: security === 'ssl',
    requireTLS: security === 'starttls',
    ignoreTLS: security === 'none',
    auth: opts.user ? { user: opts.user, pass: opts.pass ?? '' } : undefined,
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 30_000,
  })
  return transport.sendMail({ ...message, from })
}

async function loadSettings(payload: Payload) {
  try {
    return (await payload.findGlobal({ slug: 'email-settings', overrideAccess: true, showHiddenFields: true, depth: 0 })) as Record<string, any>
  } catch {
    return null // tablo henüz yoksa (ilk kurulum) .env ile devam
  }
}

/**
 * Panelden (Ayarlar → E-posta Gönderimi) yönetilen e-posta adaptörü.
 * Her gönderimde ayarları okur: SMTP, Microsoft 365 (Graph), Google Workspace (Gmail API) veya .env'deki varsayılan SMTP.
 */
export const panelEmailAdapter =
  (defaults: { fromAddress: string; fromName: string; envSmtp: EnvSmtp }): EmailAdapter =>
  ({ payload }) => ({
    name: 'panel-email',
    defaultFromAddress: defaults.fromAddress,
    defaultFromName: defaults.fromName,
    sendEmail: async (message) => {
      const s = await loadSettings(payload)
      const provider = s?.provider ?? 'env'
      const from: Address =
        provider !== 'env' && s?.fromAddress
          ? { address: s.fromAddress, name: s.fromName || defaults.fromName }
          : toAddresses(message.from)[0] ?? { address: defaults.fromAddress, name: defaults.fromName }

      if (provider === 'smtp') {
        const pass = decryptSecret(s?.smtp?.passwordEnc)
        if (s?.smtp?.passwordEnc && pass === null) throw new Error('Kayıtlı SMTP şifresi çözülemedi (PAYLOAD_SECRET değişmiş olabilir). Şifreyi panelden yeniden girin.')
        return smtpSend({ host: s?.smtp?.host, port: Number(s?.smtp?.port), secure: false, security: s?.smtp?.security, user: s?.smtp?.user, pass: pass ?? undefined }, message, from)
      }

      if (provider === 'microsoft') {
        const secret = decryptSecret(s?.microsoft?.clientSecretEnc)
        if (!secret) throw new Error('Microsoft istemci gizli dizisi kayıtlı değil veya çözülemedi. Panelden girin.')
        return sendViaGraph({ tenantId: s?.microsoft?.tenantId, clientId: s?.microsoft?.clientId, clientSecret: secret, mailbox: s?.microsoft?.senderMailbox || from.address }, message, from)
      }

      if (provider === 'google') {
        const raw = decryptSecret(s?.google?.serviceAccountEnc)
        if (!raw) throw new Error('Google servis hesabı anahtarı kayıtlı değil veya çözülemedi. Panelden yeniden yapıştırın.')
        const sender = s?.google?.senderMailbox || from.address
        // Gmail, gönderen adresi posta kutusu (veya onun "Farklı gönder" takma adı) dışına izin vermez.
        return sendViaGmailApi(parseServiceAccountKey(raw), sender, message, { address: from.address || sender, name: from.name })
      }

      return smtpSend(defaults.envSmtp, message, from)
    },
  })
