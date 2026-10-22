import { type Locale, href, routes } from './i18n'

/** "+90 (532) 000 00 00" → "905320000000"; geçersizse null. */
export const normalizeWhatsapp = (value?: string | null): string | null => {
  const digits = (value ?? '').replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15 ? digits : null
}

export const whatsappLink = (number: string, text?: string | null) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const docMessage = (locale: Locale, name: string, cas?: string | null) =>
  locale === 'tr'
    ? `Merhaba, ${name}${cas ? ` (CAS ${cas})` : ''} ürünü için TDS / MSDS belgelerini rica ediyorum.`
    : `Hello, could you please send the TDS / MSDS documents for ${name}${cas ? ` (CAS ${cas})` : ''}?`

/**
 * Teknik belge (TDS/MSDS) talebi bağlantısı. WhatsApp numarası tanımlıysa WhatsApp'ı hazır mesajla açar,
 * değilse iletişim formunu mesaj alanı doldurulmuş olarak açar. Belgeler sitede barındırılmaz.
 */
export const documentRequestHref = (
  locale: Locale,
  whatsappNumber: string | null,
  product: { name: string; cas?: string | null },
): { href: string; external: boolean } => {
  const text = docMessage(locale, product.name, product.cas)
  if (whatsappNumber) return { href: whatsappLink(whatsappNumber, text), external: true }
  return { href: `${href(locale, routes.contact)}?mesaj=${encodeURIComponent(text)}#form`, external: false }
}
