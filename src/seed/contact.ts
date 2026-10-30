import type { Payload } from 'payload'

/** Firmanın gerçek iletişim bilgileri (eski web sitesindeki künye). */
export const CONTACT = {
  legalName: 'Güven Galvano Kimyasalları ve San. Tic. Ltd. Şti.',
  address: {
    tr: 'İkitelli Organize Sanayi Bölgesi\nSaraçlar Sanayi Sitesi 9. Blok No:18\nBaşakşehir / İstanbul / Türkiye',
    en: 'İkitelli Organized Industrial Zone\nSaraçlar Industrial Site, Block 9 No:18\nBaşakşehir / Istanbul / Türkiye',
  },
  phones: ['+90 212 485 88 25', '+90 212 485 88 26'],
  fax: '+90 212 485 88 27',
  email: 'info@guvengalvanokimya.com',
  // OpenStreetMap: Saraçlar Sanayi Sitesi, İkitelli OSB (sitenin ortası)
  map: { lat: 41.0838, lng: 28.7868 },
}

// Eski örnek değerler: yalnızca bunlar varsa gerçekleriyle değiştirilir.
const PLACEHOLDER_QUOTE = /@galvanokimya\.(com|local)$/i
const DEFAULT_HUB = { lat: 40.77, lng: 29.94 }

/** Site ayarlarına iletişim bilgilerini, Hakkımızda künyesine merkez/depo ayrımını yazar: npm run contact:apply */
export async function applyContactInfo(payload: Payload) {
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0, locale: 'tr' })
  const recipients = settings.quoteRecipients ?? []
  const onlyPlaceholders = !recipients.length || recipients.every((r) => PLACEHOLDER_QUOTE.test(r.email))

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'tr',
    data: {
      legalName: CONTACT.legalName,
      address: CONTACT.address.tr,
      phones: CONTACT.phones.map((number) => ({ number })),
      fax: CONTACT.fax,
      emails: [{ email: CONTACT.email }],
      mapLat: CONTACT.map.lat,
      mapLng: CONTACT.map.lng,
      ...(onlyPlaceholders ? { quoteRecipients: [{ email: CONTACT.email }] } : {}),
    },
  })
  await payload.updateGlobal({ slug: 'site-settings', locale: 'en', data: { address: CONTACT.address.en } })

  // Ticaret haritasının merkezi: varsayılan (Kocaeli) koordinatlar duruyorsa İstanbul'a taşınır.
  const home = await payload.findGlobal({ slug: 'home-page', depth: 0 })
  if (home.hubLat === DEFAULT_HUB.lat && home.hubLng === DEFAULT_HUB.lng) {
    await payload.updateGlobal({ slug: 'home-page', data: { hubLat: 41.01, hubLng: 28.97 } })
  }

  // Hakkımızda künyesi: "Merkez & depo: Çatalca" satırı merkez (İkitelli) ve depo (Çatalca) olarak ikiye ayrılır.
  // Satırlar diller arasında ortaktır: önce TR'de satır eklenir, sonra EN metinleri aynı satırlara yazılır.
  const aboutTr = await payload.findGlobal({ slug: 'about-page', depth: 0, locale: 'tr' })
  const trFacts = aboutTr.company?.facts ?? []
  const i = trFacts.findIndex((f) => f.label === 'Merkez & depo')
  if (i !== -1) {
    const next = [...trFacts]
    next.splice(
      i,
      1,
      { ...trFacts[i], label: 'Merkez', value: 'İkitelli OSB, Başakşehir / İstanbul' },
      { label: 'Depo', value: 'Çatalca / İstanbul' },
    )
    await payload.updateGlobal({ slug: 'about-page', locale: 'tr', data: { company: { ...aboutTr.company, facts: next } } })
  }
  const trAfter = (await payload.findGlobal({ slug: 'about-page', depth: 0, locale: 'tr' })).company?.facts ?? []
  const aboutEn = await payload.findGlobal({ slug: 'about-page', depth: 0, locale: 'en', fallbackLocale: false })
  const enText: Record<string, { label: string; value: string }> = {
    Merkez: { label: 'Head office', value: 'İkitelli OSB, Başakşehir / Istanbul' },
    Depo: { label: 'Warehouse', value: 'Çatalca / Istanbul' },
  }
  const enFacts = (aboutEn.company?.facts ?? []).map((f, k) => {
    const fix = enText[trAfter[k]?.label ?? '']
    return fix ? { ...f, ...fix } : f
  })
  await payload.updateGlobal({ slug: 'about-page', locale: 'en', data: { company: { ...aboutEn.company, facts: enFacts } } })

  payload.logger.info(`✓ İletişim bilgileri güncellendi${onlyPlaceholders ? ' (teklif alıcısı: ' + CONTACT.email + ')' : ''}`)
}
