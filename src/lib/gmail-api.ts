import crypto from 'crypto'
import MailComposer from 'nodemailer/lib/mail-composer'
import type { SendEmailOptions } from 'payload'

/**
 * Google Workspace: servis hesabı + alan geneli yetki (domain-wide delegation) ile Gmail API gönderimi.
 * Yalnızca gönderme yetkisi istenir (gmail.send); SMTP'nin gerektirdiği tam posta erişimi (mail.google.com) gerekmez.
 * Belgeler: developers.google.com/identity/protocols/oauth2/service-account,
 *           developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/send
 */
export const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'

export type ServiceAccountKey = { type: string; client_email: string; private_key: string; client_id?: string; project_id?: string }

/** Yapıştırılan JSON anahtar dosyasını doğrular. */
export function parseServiceAccountKey(raw: string): ServiceAccountKey {
  let key: ServiceAccountKey
  try {
    key = JSON.parse(raw)
  } catch {
    throw new Error('Servis hesabı anahtarı geçerli bir JSON değil. Google Cloud’dan indirdiğiniz .json dosyasının tamamını yapıştırın.')
  }
  if (key?.type !== 'service_account' || !key.client_email || !key.private_key?.includes('PRIVATE KEY')) {
    throw new Error('Bu bir servis hesabı anahtarı değil (type: "service_account", client_email ve private_key alanları olmalı).')
  }
  return key
}

const b64url = (input: Buffer | string) => Buffer.from(input).toString('base64url')
const tokenCache = new Map<string, { token: string; expires: number }>()

async function accessToken(key: ServiceAccountKey, subject: string): Promise<string> {
  const cacheKey = `${key.client_email}:${subject}`
  const cached = tokenCache.get(cacheKey)
  if (cached && cached.expires > Date.now() + 60_000) return cached.token

  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = b64url(JSON.stringify({ iss: key.client_email, sub: subject, scope: GMAIL_SEND_SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }))
  const signature = crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(key.private_key)
  const assertion = `${header}.${claims}.${b64url(signature)}`

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
    signal: AbortSignal.timeout(15_000),
  })
  const json = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string; error_description?: string }
  if (!res.ok || !json.access_token) {
    throw new Error(`Google oturum açma hatası (${json.error ?? res.status}): ${json.error_description ?? res.statusText}`)
  }
  tokenCache.set(cacheKey, { token: json.access_token, expires: Date.now() + (json.expires_in ?? 3600) * 1000 })
  return json.access_token
}

export async function sendViaGmailApi(key: ServiceAccountKey, sender: string, message: SendEmailOptions, from: { address: string; name?: string }) {
  const token = await accessToken(key, sender)
  // MIME iletisini nodemailer oluşturur (Türkçe karakterler, HTML, ekler doğru kodlanır).
  const mime = await new MailComposer({ ...message, from } as never).compile().build()

  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(sender)}/messages/send`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ raw: b64url(mime) }),
    signal: AbortSignal.timeout(20_000),
  })
  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: { status?: string; message?: string; errors?: { reason?: string }[] } }
    if (res.status === 401) tokenCache.delete(`${key.client_email}:${sender}`)
    const reason = err.error?.errors?.[0]?.reason ?? err.error?.status ?? ''
    throw new Error(`Gmail API gönderim hatası (${res.status}${reason ? ` ${reason}` : ''}): ${err.error?.message ?? res.statusText}`)
  }
  return { provider: 'google', accepted: true }
}
