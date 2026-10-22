import type { Payload } from 'payload'

type TrEn = { tr: string; en: string }

export const PROCESS_DEFS: { slug: string; name: TrEn }[] = [
  { slug: 'akimsiz-nikel', name: { tr: 'Akımsız Nikel', en: 'Electroless Nickel' } },
  { slug: 'altin-kaplama', name: { tr: 'Altın Kaplama', en: 'Gold Plating' } },
  { slug: 'bakir-kaplama', name: { tr: 'Bakır Kaplama', en: 'Copper Plating' } },
  { slug: 'cinko-kaplama', name: { tr: 'Çinko Kaplama', en: 'Zinc Plating' } },
  { slug: 'cinko-demir-kaplama', name: { tr: 'Çinko-Demir Kaplama', en: 'Zinc-Iron Plating' } },
  { slug: 'fosfat-kaplama', name: { tr: 'Fosfat Kaplama', en: 'Phosphating' } },
  { slug: 'kalay-kaplama', name: { tr: 'Kalay Kaplama', en: 'Tin Plating' } },
  { slug: 'krom-kaplama', name: { tr: 'Krom Kaplama', en: 'Chrome Plating' } },
  { slug: 'lak-sokuculer', name: { tr: 'Lak & Sökücüler', en: 'Lacquers & Strippers' } },
  { slug: 'nikel-kaplama', name: { tr: 'Nikel Kaplama', en: 'Nickel Plating' } },
  { slug: 'pasivasyon', name: { tr: 'Pasivasyon', en: 'Passivation' } },
  { slug: 'pirinc-dekoratif', name: { tr: 'Pirinç & Dekoratif', en: 'Brass & Decorative' } },
  { slug: 'yag-alma-on-islem', name: { tr: 'Yağ Alma & Ön İşlem', en: 'Degreasing & Pre-treatment' } },
]

/** Ürün koduna göre CAS, formül ve prosesler. */
const PRODUCT_DATA: Record<string, { cas?: string; formula?: string; processes: string[] }> = {
  'GK-NS-01': { cas: '10101-97-0', formula: 'NiSO4·6H2O', processes: ['nikel-kaplama', 'akimsiz-nikel'] },
  'GK-NC-02': { cas: '7791-20-0', formula: 'NiCl2·6H2O', processes: ['nikel-kaplama'] },
  'GK-CS-03': { cas: '7758-99-8', formula: 'CuSO4·5H2O', processes: ['bakir-kaplama', 'pirinc-dekoratif'] },
  'GK-ZC-04': { cas: '7646-85-7', formula: 'ZnCl2', processes: ['cinko-kaplama', 'cinko-demir-kaplama'] },
  'GK-BA-05': { cas: '10043-35-3', formula: 'H3BO3', processes: ['nikel-kaplama'] },
  'GK-SA-06': { cas: '7664-93-9', formula: 'H2SO4', processes: ['bakir-kaplama', 'yag-alma-on-islem'] },
  'GK-CSD-07': { cas: '1310-73-2', formula: 'NaOH', processes: ['cinko-kaplama', 'yag-alma-on-islem'] },
  'GK-NA-08': { cas: '7440-02-0', formula: 'Ni', processes: ['nikel-kaplama'] },
  'GK-CA-09': { cas: '7440-50-8', formula: 'Cu-P', processes: ['bakir-kaplama'] },
  'GK-ZA-10': { cas: '7440-66-6', formula: 'Zn', processes: ['cinko-kaplama'] },
  'GK-SS-11': { cas: '128-44-9', formula: 'C7H4NNaO3S', processes: ['nikel-kaplama'] },
  'GK-CR-12': { cas: '10060-12-5', formula: 'CrCl3·6H2O', processes: ['krom-kaplama', 'pasivasyon'] },
  'GK-CO-13': { cas: '10026-24-1', formula: 'CoSO4·7H2O', processes: ['pasivasyon'] },
  'GK-BLK-14': { processes: [] },
}

const CATEGORY_SUMMARY: Record<string, TrEn> = {
  'metal-tuzlari': { tr: 'Kaplama banyolarının ana metal kaynağı olan nikel, bakır, çinko ve kobalt tuzları.', en: 'Nickel, copper, zinc and cobalt salts — the metal source of plating baths.' },
  'asitler-bazlar': { tr: 'Banyo hazırlama, pH ayarı, dekapaj ve yağ almada kullanılan asit ve bazlar.', en: 'Acids and bases for bath make-up, pH control, pickling and degreasing.' },
  'anot-malzemeleri': { tr: 'Akım altında çalışan banyolarda çözülerek metale kaplanan anot çeşitleri.', en: 'Anodes that dissolve in electrolytic baths and deposit onto the part.' },
  'parlatici-katkilar': { tr: 'Banyonun çalışmasını ve kaplama kalitesini destekleyen toz ve sıvı katkılar.', en: 'Powder and liquid additives supporting bath performance and deposit quality.' },
  pasivasyon: { tr: 'Kaplama sonrası korozyon direnci sağlayan pasivasyon hammaddeleri.', en: 'Raw materials for post-plating passivation and corrosion resistance.' },
  'dokme-ibc-tedarik': { tr: 'Varil, IBC ve tanker ile dökme kimyasal tedariki.', en: 'Bulk chemical supply in drums, IBCs and tankers.' },
}

/** Katalog verisi: prosesler, ürün CAS/formül/proses atamaları, açıklamalar, WhatsApp. Tekrar çalıştırılabilir. */
export async function applyCatalogData(payload: Payload) {
  // 1) Prosesler (slug ile eşleşir; varsa günceller)
  const processIds: Record<string, number> = {}
  for (const [i, p] of PROCESS_DEFS.entries()) {
    const found = await payload.find({ collection: 'processes', where: { slug: { equals: p.slug } }, limit: 1, depth: 0 })
    const doc = found.docs[0]
      ? await payload.update({ collection: 'processes', id: found.docs[0].id, locale: 'tr', data: { name: p.name.tr, order: i } })
      : await payload.create({ collection: 'processes', locale: 'tr', data: { name: p.name.tr, slug: p.slug, order: i } })
    await payload.update({ collection: 'processes', id: doc.id, locale: 'en', data: { name: p.name.en } })
    processIds[p.slug] = doc.id
  }

  // 2) Ürünler: CAS / formül / prosesler; CAS artık ayrı alanda olduğu için özellik listesinden çıkarılır.
  const products = await payload.find({ collection: 'products', limit: 1000, depth: 0, locale: 'tr' })
  for (const product of products.docs) {
    const info = product.code ? PRODUCT_DATA[product.code] : undefined
    if (!info) continue
    const specs = (product.specs ?? []).filter((s) => !/^CAS/i.test(s.label))
    await payload.update({
      collection: 'products',
      id: product.id,
      locale: 'tr',
      data: {
        cas: info.cas ?? null,
        formula: info.formula ?? null,
        processes: info.processes.map((s) => processIds[s]).filter(Boolean),
        specs,
      },
    })
  }

  // 3) Kategori açıklamaları
  const categories = await payload.find({ collection: 'product-categories', limit: 100, depth: 0 })
  for (const c of categories.docs) {
    const s = c.slug ? CATEGORY_SUMMARY[c.slug] : undefined
    if (!s) continue
    await payload.update({ collection: 'product-categories', id: c.id, locale: 'tr', data: { summary: s.tr } })
    await payload.update({ collection: 'product-categories', id: c.id, locale: 'en', data: { summary: s.en } })
  }

  // 4) Katalog sayfası metinleri
  await payload.updateGlobal({
    slug: 'products-page',
    locale: 'tr',
    data: { catalog: { title: 'Ürün Kataloğu', description: 'Tedarik ettiğimiz ürünleri gruplara ve kullanıldıkları proseslere göre listeledik. Teknik belgeler için bize ulaşın.' } },
  })
  await payload.updateGlobal({
    slug: 'products-page',
    locale: 'en',
    data: { catalog: { title: 'Product Catalogue', description: 'Our products listed by group and by the processes they are used in. Contact us for technical documents.' } },
  })

  // 5) WhatsApp: numara henüz yoksa örnek numara (iletişimdeki örnek telefon) yazılır — gerçeğiyle değiştirilmelidir.
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  const number = settings.whatsappNumber || process.env.SEED_WHATSAPP_NUMBER || '+90 262 000 00 00'
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'tr',
    data: { whatsappNumber: number, whatsappMessage: 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.' },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: { whatsappMessage: 'Hello, I would like to get information about your products.' },
  })

  payload.logger.info(`✓ Katalog verisi yüklendi: ${PROCESS_DEFS.length} proses, ${products.docs.length} ürün güncellendi.`)
}
