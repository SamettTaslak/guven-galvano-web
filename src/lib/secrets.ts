import crypto from 'crypto'

/**
 * Panelden girilen gizli değerleri (SMTP şifresi, Microsoft client secret) veritabanında
 * AES-256-GCM ile şifreler. Anahtar PAYLOAD_SECRET'tan türetilir; PAYLOAD_SECRET değişirse
 * kayıtlı şifreler çözülemez ve panelden yeniden girilmeleri gerekir.
 */
const PREFIX = 'enc:v1:'

const key = () => {
  const secret = process.env.PAYLOAD_SECRET
  if (!secret) throw new Error('PAYLOAD_SECRET tanımlı değil')
  return crypto.createHash('sha256').update(`${secret}:galvano-secrets`).digest()
}

export const isEncrypted = (value: unknown): value is string => typeof value === 'string' && value.startsWith(PREFIX)

export function encryptSecret(plain: string): string {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', key(), iv)
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return `${PREFIX}${iv.toString('base64')}:${cipher.getAuthTag().toString('base64')}:${data.toString('base64')}`
}

/** Çözülemezse (anahtar değişmiş / veri bozuk) null döner. */
export function decryptSecret(value: string | null | undefined): string | null {
  if (!isEncrypted(value)) return null
  try {
    const [iv, tag, data] = value.slice(PREFIX.length).split(':')
    const decipher = crypto.createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64'))
    decipher.setAuthTag(Buffer.from(tag, 'base64'))
    return Buffer.concat([decipher.update(Buffer.from(data, 'base64')), decipher.final()]).toString('utf8')
  } catch {
    return null
  }
}
