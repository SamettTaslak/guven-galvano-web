/**
 * Örnek içerik yükleyici.
 *   npm run seed            → veritabanı boşsa doldurur
 *   npm run seed -- --reset → mevcut içerikleri silip yeniden doldurur
 * Admin hesabı .env içindeki SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD ile oluşturulur.
 */
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { BRAND_NAME } from '../lib/brand'
import { renderPlaceholder, type PlaceholderKey } from './placeholders'
import { applyBrandLogos } from './brand'
import { applyCatalogData } from './catalog'
import { applyPartnerMedia } from './partners'
import { applyPrivacyAndFeatured } from './privacy'
import { loadStockPhoto } from './stock'

const reset = process.argv.includes('--reset')

type TrEn = { tr: string; en: string }

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.count({ collection: 'product-categories' })
  if (existing.totalDocs > 0 && !reset) {
    payload.logger.info('İçerik zaten var; atlanıyor. Yeniden yüklemek için: npm run seed -- --reset')
    process.exit(0)
  }
  if (reset) {
    for (const collection of ['products', 'product-categories', 'partners', 'media'] as const) {
      await payload.delete({ collection, where: { id: { exists: true } } })
    }
    payload.logger.info('Mevcut içerik silindi.')
  }

  await ensureAdmin(payload)

  // ---- Medya ----
  const cache = new Map<PlaceholderKey, number>()
  const media = async (key: PlaceholderKey, alt: TrEn): Promise<number> => {
    const hit = cache.get(key)
    if (hit) return hit
    // assets/stock/ altında fotoğraf varsa onu, yoksa üretilen illüstrasyonu kullan.
    const data = (await loadStockPhoto(key)) ?? (await renderPlaceholder(key))
    const doc = await payload.create({
      collection: 'media',
      locale: 'tr',
      data: { alt: alt.tr },
      file: { data, mimetype: 'image/jpeg', name: `${key}.jpg`, size: data.length },
    })
    await payload.update({ collection: 'media', id: doc.id, locale: 'en', data: { alt: alt.en } })
    cache.set(key, doc.id)
    return doc.id
  }

  const img = {
    port: await media('port', { tr: 'Konteyner limanı', en: 'Container port' }),
    port2: await media('port2', { tr: 'Liman ve vinçler', en: 'Port cranes' }),
    ship: await media('ship', { tr: 'Konteyner gemisi', en: 'Container ship' }),
    warehouse: await media('warehouse', { tr: 'Depo', en: 'Warehouse' }),
    warehouse2: await media('warehouse2', { tr: 'Depo rafları', en: 'Warehouse racks' }),
    drumsBlue: await media('drumsBlue', { tr: 'Kimyasal variller', en: 'Chemical drums' }),
    drumsGreen: await media('drumsGreen', { tr: 'Variller', en: 'Drums' }),
    drumsCopper: await media('drumsCopper', { tr: 'Asit varilleri', en: 'Acid drums' }),
    crystalsGreen: await media('crystalsGreen', { tr: 'Nikel tuzu kristalleri', en: 'Nickel salt crystals' }),
    crystalsBlue: await media('crystalsBlue', { tr: 'Bakır sülfat kristalleri', en: 'Copper sulphate crystals' }),
    crystalsCopper: await media('crystalsCopper', { tr: 'Metal kristalleri', en: 'Metal crystals' }),
    ibc: await media('ibc', { tr: 'IBC tanklar', en: 'IBC containers' }),
    powderWhite: await media('powderWhite', { tr: 'Toz kimyasal', en: 'Powder chemical' }),
    powderGreen: await media('powderGreen', { tr: 'Toz katkı', en: 'Powder additive' }),
  }

  // ---- Yerelleştirilmiş oluşturma yardımcısı ----
  async function createLocalized<T extends 'product-categories' | 'products' | 'partners'>(
    collection: T,
    tr: Record<string, unknown>,
    en: Record<string, unknown>,
  ) {
    const doc = await payload.create({ collection, locale: 'tr', data: tr as never })
    await payload.update({ collection, id: doc.id, locale: 'en', data: en as never })
    return doc
  }

  // ---- Kategoriler ----
  const categoryDefs: { key: string; name: TrEn; summary: TrEn; image: number }[] = [
    { key: 'metal', name: { tr: 'Metal Tuzları', en: 'Metal Salts' }, summary: { tr: 'Nikel, bakır, çinko ve kalay tuzları.', en: 'Nickel, copper, zinc and tin salts.' }, image: img.crystalsGreen },
    { key: 'acid', name: { tr: 'Asitler & Bazlar', en: 'Acids & Bases' }, summary: { tr: 'Proses banyoları için temel asit ve bazlar.', en: 'Core acids and bases for process baths.' }, image: img.drumsCopper },
    { key: 'anode', name: { tr: 'Anot Malzemeleri', en: 'Anode Materials' }, summary: { tr: 'Nikel, bakır ve çinko anotlar.', en: 'Nickel, copper and zinc anodes.' }, image: img.crystalsCopper },
    { key: 'additive', name: { tr: 'Parlatıcı & Katkılar', en: 'Brighteners & Additives' }, summary: { tr: 'Banyo katkıları ve yardımcı maddeler.', en: 'Bath additives and auxiliaries.' }, image: img.powderGreen },
    { key: 'passivation', name: { tr: 'Pasivasyon', en: 'Passivation' }, summary: { tr: 'Pasivasyon ve son işlem hammaddeleri.', en: 'Passivation and post-treatment materials.' }, image: img.crystalsBlue },
    { key: 'bulk', name: { tr: 'Dökme & IBC Tedarik', en: 'Bulk & IBC Supply' }, summary: { tr: 'Varil, IBC ve dökme sevkiyat.', en: 'Drum, IBC and bulk shipments.' }, image: img.ibc },
  ]
  const categories: Record<string, number> = {}
  for (const [i, c] of categoryDefs.entries()) {
    const doc = await createLocalized(
      'product-categories',
      { name: c.name.tr, summary: c.summary.tr, image: c.image, order: i },
      { name: c.name.en, summary: c.summary.en },
    )
    categories[c.key] = doc.id
  }

  // ---- Ürünler ----
  type P = { name: TrEn; code: string; cat: string; img: number; summary: TrEn; specs: [TrEn, string][]; pack: TrEn[]; origin: TrEn; unit?: string; featured?: boolean }
  const bag25: TrEn = { tr: '25 kg torba', en: '25 kg bag' }
  const bigbag: TrEn = { tr: '1000 kg big bag', en: '1000 kg big bag' }
  const drum: TrEn = { tr: '200 lt varil', en: '200 L drum' }
  const ibcPack: TrEn = { tr: '1000 lt IBC', en: '1000 L IBC' }
  const purity: TrEn = { tr: 'Saflık', en: 'Purity' }
  const form: TrEn = { tr: 'Görünüm', en: 'Appearance' }
  const cas: TrEn = { tr: 'CAS No', en: 'CAS No' }

  const productDefs: P[] = [
    { name: { tr: 'Nikel Sülfat', en: 'Nickel Sulphate' }, code: 'GK-NS-01', cat: 'metal', img: img.crystalsGreen, summary: { tr: 'Nikel kaplama banyolarının ana hammaddesi.', en: 'Primary raw material for nickel plating baths.' }, specs: [[cas, '10101-97-0'], [purity, '≥ %22 Ni'], [form, 'Yeşil kristal']], pack: [bag25, bigbag], origin: { tr: 'Finlandiya', en: 'Finland' }, featured: true },
    { name: { tr: 'Nikel Klorür', en: 'Nickel Chloride' }, code: 'GK-NC-02', cat: 'metal', img: img.crystalsGreen, summary: { tr: 'Watts nikel banyoları için.', en: 'For Watts nickel baths.' }, specs: [[cas, '7791-20-0'], [purity, '≥ %24 Ni']], pack: [bag25], origin: { tr: 'Çin', en: 'China' } },
    { name: { tr: 'Bakır Sülfat', en: 'Copper Sulphate' }, code: 'GK-CS-03', cat: 'metal', img: img.crystalsBlue, summary: { tr: 'Asidik bakır banyoları için mavi kristal.', en: 'Blue crystals for acid copper baths.' }, specs: [[cas, '7758-99-8'], [purity, '≥ %25 Cu']], pack: [bag25, bigbag], origin: { tr: 'Almanya', en: 'Germany' }, featured: true },
    { name: { tr: 'Çinko Klorür', en: 'Zinc Chloride' }, code: 'GK-ZC-04', cat: 'metal', img: img.powderWhite, summary: { tr: 'Asidik çinko banyoları için.', en: 'For acid zinc baths.' }, specs: [[cas, '7646-85-7'], [purity, '≥ %98']], pack: [bag25], origin: { tr: 'Hindistan', en: 'India' } },
    { name: { tr: 'Borik Asit', en: 'Boric Acid' }, code: 'GK-BA-05', cat: 'acid', img: img.powderWhite, summary: { tr: 'Nikel banyolarında tampon madde.', en: 'Buffer agent for nickel baths.' }, specs: [[cas, '10043-35-3'], [purity, '≥ %99.9']], pack: [bag25, bigbag], origin: { tr: 'Türkiye', en: 'Türkiye' }, featured: true },
    { name: { tr: 'Sülfürik Asit', en: 'Sulphuric Acid' }, code: 'GK-SA-06', cat: 'acid', img: img.drumsCopper, summary: { tr: 'Dekapaj ve banyo hazırlığı.', en: 'Pickling and bath make-up.' }, specs: [[cas, '7664-93-9'], [purity, '%98']], pack: [drum, ibcPack], origin: { tr: 'Türkiye', en: 'Türkiye' }, unit: 'lt' },
    { name: { tr: 'Kostik Soda', en: 'Caustic Soda' }, code: 'GK-CSD-07', cat: 'acid', img: img.powderWhite, summary: { tr: 'Alkali çinko ve yağ alma banyoları.', en: 'Alkaline zinc and degreasing baths.' }, specs: [[cas, '1310-73-2'], [form, 'Pul / Flake']], pack: [bag25], origin: { tr: 'İtalya', en: 'Italy' } },
    { name: { tr: 'Nikel Anot', en: 'Nickel Anode' }, code: 'GK-NA-08', cat: 'anode', img: img.crystalsCopper, summary: { tr: 'Pul ve plaka formunda nikel anot.', en: 'Nickel anodes in pellet and plate form.' }, specs: [[purity, '≥ %99.9 Ni'], [form, 'Pellet / Plaka']], pack: [{ tr: '50 kg kasa', en: '50 kg case' }], origin: { tr: 'Kanada', en: 'Canada' }, featured: true },
    { name: { tr: 'Fosforlu Bakır Anot', en: 'Phosphorised Copper Anode' }, code: 'GK-CA-09', cat: 'anode', img: img.crystalsCopper, summary: { tr: 'Asidik bakır kaplama için.', en: 'For acid copper plating.' }, specs: [[purity, 'P: %0.04–0.06']], pack: [{ tr: 'Kasa', en: 'Case' }], origin: { tr: 'Almanya', en: 'Germany' } },
    { name: { tr: 'Çinko Anot', en: 'Zinc Anode' }, code: 'GK-ZA-10', cat: 'anode', img: img.drumsGreen, summary: { tr: 'Yüksek saflıkta çinko bilye ve plaka.', en: 'High-purity zinc balls and plates.' }, specs: [[purity, '≥ %99.995 Zn']], pack: [{ tr: '1 ton palet', en: '1 t pallet' }], origin: { tr: 'Güney Kore', en: 'South Korea' }, unit: 'ton' },
    { name: { tr: 'Sakarin Sodyum', en: 'Sodium Saccharin' }, code: 'GK-SS-11', cat: 'additive', img: img.powderGreen, summary: { tr: 'Nikel banyolarında birincil parlatıcı hammaddesi.', en: 'Primary brightener raw material for nickel.' }, specs: [[cas, '128-44-9']], pack: [bag25], origin: { tr: 'Çin', en: 'China' } },
    { name: { tr: 'Krom (III) Klorür', en: 'Chromium (III) Chloride' }, code: 'GK-CR-12', cat: 'passivation', img: img.crystalsBlue, summary: { tr: 'Trivalent pasivasyon hammaddesi.', en: 'Raw material for trivalent passivation.' }, specs: [[cas, '10060-12-5']], pack: [bag25], origin: { tr: 'Hindistan', en: 'India' } },
    { name: { tr: 'Kobalt Sülfat', en: 'Cobalt Sulphate' }, code: 'GK-CO-13', cat: 'passivation', img: img.crystalsCopper, summary: { tr: 'Pasivasyon ve alaşım banyoları için.', en: 'For passivation and alloy baths.' }, specs: [[cas, '10026-24-1']], pack: [bag25], origin: { tr: 'Belçika', en: 'Belgium' } },
    { name: { tr: 'Dökme Kimyasal Sevkiyat', en: 'Bulk Chemical Shipment' }, code: 'GK-BLK-14', cat: 'bulk', img: img.ibc, summary: { tr: 'IBC ve tanker ile dökme tedarik.', en: 'Bulk supply in IBC and tankers.' }, specs: [], pack: [ibcPack, { tr: 'Tanker', en: 'Tanker' }], origin: { tr: 'Çoklu', en: 'Multiple' }, unit: 'ton' },
  ]

  for (const [i, p] of productDefs.entries()) {
    const doc = await payload.create({
      collection: 'products',
      locale: 'tr',
      data: {
        name: p.name.tr,
        code: p.code,
        category: categories[p.cat],
        coverImage: p.img,
        gallery: [p.img === img.ibc ? img.warehouse : img.drumsBlue, img.warehouse2],
        summary: p.summary.tr,
        specs: p.specs.map(([label, value]) => ({ label: label.tr, value })),
        packaging: p.pack.map((x) => ({ label: x.tr })),
        origin: p.origin.tr,
        unit: (p.unit ?? 'kg') as 'kg',
        featured: Boolean(p.featured),
        isActive: true,
        order: i,
      },
    })
    // Dizi alanlarında satır kimlikleri korunarak İngilizce değerler yazılır.
    await payload.update({
      collection: 'products',
      id: doc.id,
      locale: 'en',
      data: {
        name: p.name.en,
        summary: p.summary.en,
        origin: p.origin.en,
        specs: (doc.specs ?? []).map((row, k) => ({ id: row.id, label: p.specs[k][0].en, value: p.specs[k][1] })),
        packaging: (doc.packaging ?? []).map((row, k) => ({ id: row.id, label: p.pack[k].en })),
      },
    })
  }

  // ---- Firmalar (örnek adlar — gerçekleriyle değiştirilecek) ----
  const partnerDefs: [string, 'supplier' | 'customer', TrEn][] = [
    ['Nordic Metals', 'supplier', { tr: 'Finlandiya', en: 'Finland' }],
    ['Rhein Chemie Handel', 'supplier', { tr: 'Almanya', en: 'Germany' }],
    ['Shanghai Plating Materials', 'supplier', { tr: 'Çin', en: 'China' }],
    ['Mumbai Salts Ltd.', 'supplier', { tr: 'Hindistan', en: 'India' }],
    ['Liguria Chimica', 'supplier', { tr: 'İtalya', en: 'Italy' }],
    ['Busan Zinc Co.', 'supplier', { tr: 'Güney Kore', en: 'South Korea' }],
    ['Anadolu Kaplama', 'customer', { tr: 'Türkiye', en: 'Türkiye' }],
    ['Marmara Galvaniz', 'customer', { tr: 'Türkiye', en: 'Türkiye' }],
    ['Bakü Metal Coating', 'customer', { tr: 'Azerbaycan', en: 'Azerbaijan' }],
    ['Erbil Surface Tech', 'customer', { tr: 'Irak', en: 'Iraq' }],
    ['Cairo Electroplating', 'customer', { tr: 'Mısır', en: 'Egypt' }],
    ['Tashkent Coating', 'customer', { tr: 'Özbekistan', en: 'Uzbekistan' }],
  ]
  for (const [i, [name, relation, country]] of partnerDefs.entries()) {
    await createLocalized('partners', { name, relation, country: country.tr, order: i }, { country: country.en })
  }

  // ---- Global'ler ----
  const hub = { lat: 40.77, lng: 29.94 }
  const routeDefs: [TrEn, 'import' | 'export', number, number][] = [
    [{ tr: 'Şanghay', en: 'Shanghai' }, 'import', 31.23, 121.47],
    [{ tr: 'Mumbai', en: 'Mumbai' }, 'import', 19.07, 72.88],
    [{ tr: 'Hamburg', en: 'Hamburg' }, 'import', 53.55, 9.99],
    [{ tr: 'Cenova', en: 'Genoa' }, 'import', 44.41, 8.93],
    [{ tr: 'Anvers', en: 'Antwerp' }, 'import', 51.22, 4.4],
    [{ tr: 'Busan', en: 'Busan' }, 'import', 35.18, 129.08],
    [{ tr: 'Bakü', en: 'Baku' }, 'export', 40.41, 49.87],
    [{ tr: 'Erbil', en: 'Erbil' }, 'export', 36.19, 44.01],
    [{ tr: 'Kahire', en: 'Cairo' }, 'export', 30.04, 31.24],
    [{ tr: 'Cezayir', en: 'Algiers' }, 'export', 36.75, 3.06],
    [{ tr: 'Bükreş', en: 'Bucharest' }, 'export', 44.43, 26.1],
    [{ tr: 'Taşkent', en: 'Tashkent' }, 'export', 41.3, 69.24],
    [{ tr: 'Riyad', en: 'Riyadh' }, 'export', 24.71, 46.68],
    [{ tr: 'Tiflis', en: 'Tbilisi' }, 'export', 41.72, 44.79],
  ]

  const home = await payload.updateGlobal({
    slug: 'home-page',
    locale: 'tr',
    data: {
      heroTitle: 'GÜVEN GALVANO KİMYASALLARI',
      heroSubtitle: 'Kaplama sektörünün küresel hammadde tedarikçisi',
      slides: [
        { image: img.port, caption: 'İthalat · İhracat' },
        { image: img.ship, caption: 'Küresel lojistik' },
        { image: img.warehouse, caption: 'Stoktan hızlı tedarik' },
      ],
      hubName: 'Türkiye',
      hubLat: hub.lat,
      hubLng: hub.lng,
      routes: routeDefs.map(([label, direction, lat, lng]) => ({ label: label.tr, direction, lat, lng })),
      stats: [
        { value: 30, suffix: '+', label: 'Ülke' },
        { value: 500, suffix: '+', label: 'Ürün' },
        { value: 25, suffix: '', label: 'Yıllık tecrübe' },
        { value: 12000, suffix: ' t', label: 'Yıllık tedarik' },
      ],
      categoriesSection: { title: 'Ürün Gruplarımız', subtitle: 'Hammadde' },
      showcase: { image: img.warehouse2, title: 'Stoktan hızlı tedarik', subtitle: 'Geniş depo, güçlü lojistik' },
      gallery: { title: 'Tesisimiz', images: [img.warehouse, img.port2, img.ibc, img.drumsBlue, img.ship] },
      partnersSection: { title: 'Çalıştığımız Firmalar' },
      cta: { image: img.port2, title: 'Teklif sepetinizi oluşturun', buttonLabel: 'Ürünleri İncele' },
    },
  })
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      heroTitle: 'GÜVEN GALVANO KİMYASALLARI',
      heroSubtitle: 'Global raw material supplier for the plating industry',
      slides: (home.slides ?? []).map((s, i) => ({ ...s, image: [img.port, img.ship, img.warehouse][i], caption: ['Import · Export', 'Global logistics', 'Fast supply from stock'][i] })),
      hubName: 'Türkiye',
      routes: (home.routes ?? []).map((r, i) => ({ ...r, label: routeDefs[i][0].en })),
      stats: (home.stats ?? []).map((s, i) => ({ ...s, label: ['Countries', 'Products', 'Years of experience', 'Annual supply'][i] })),
      categoriesSection: { title: 'Product Groups', subtitle: 'Raw materials' },
      showcase: { image: img.warehouse2, title: 'Fast supply from stock', subtitle: 'Large warehouse, strong logistics' },
      gallery: { title: 'Our Facility', images: [img.warehouse, img.port2, img.ibc, img.drumsBlue, img.ship] },
      partnersSection: { title: 'Our Partners' },
      cta: { image: img.port2, title: 'Build your quote basket', buttonLabel: 'Browse Products' },
    },
  })

  const about = await payload.updateGlobal({
    slug: 'about-page',
    locale: 'tr',
    data: {
      hero: { image: img.port2, title: 'Hakkımızda', subtitle: 'Dünyadan hammadde, sektöre güven.' },
      intro: 'Güven Galvano Kimyasalları, kaplama sektörüne ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik eder ve bölgedeki üreticilere ulaştırır.',
      story: [
        { image: img.ship, title: 'Küresel tedarik', text: 'Avrupa ve Asya’daki üreticilerden doğrudan ithalat.' },
        { image: img.warehouse, title: 'Güçlü stok', text: 'Geniş depomuzla kritik hammaddeler her zaman hazır.' },
        { image: img.port, title: 'İhracat ağı', text: 'Orta Doğu, Kafkasya, Orta Asya ve Kuzey Afrika’ya sevkiyat.' },
      ],
      values: [
        { icon: 'globe', title: 'Küresel ağ', text: '30+ ülke' },
        { icon: 'warehouse', title: 'Stok gücü', text: 'Hızlı teslimat' },
        { icon: 'ship', title: 'Lojistik', text: 'Kapıdan kapıya' },
        { icon: 'handshake', title: 'Güven', text: 'Uzun soluklu ortaklık' },
      ],
      timeline: [
        { year: '2000', title: 'Kuruluş' },
        { year: '2008', title: 'İlk ithalat anlaşmaları' },
        { year: '2015', title: 'İhracat ağı genişledi' },
        { year: '2024', title: 'Yeni depo' },
      ],
      gallery: { title: 'Tesisten kareler', images: [img.warehouse, img.warehouse2, img.ibc, img.drumsBlue, img.port, img.drumsGreen] },
    },
  })
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: {
      hero: { image: img.port2, title: 'About Us', subtitle: 'Raw materials from the world, trust for the industry.' },
      intro: 'Güven Galvano Kimyasalları sources the raw materials the plating industry needs from all over the world and delivers them to manufacturers across the region.',
      story: (about.story ?? []).map((s, i) => ({ ...s, image: [img.ship, img.warehouse, img.port][i], ...[{ title: 'Global sourcing', text: 'Direct imports from producers in Europe and Asia.' }, { title: 'Strong stock', text: 'Critical raw materials always ready in our warehouse.' }, { title: 'Export network', text: 'Shipments to the Middle East, Caucasus, Central Asia and North Africa.' }][i] })),
      values: (about.values ?? []).map((v, i) => ({ ...v, ...[{ title: 'Global network', text: '30+ countries' }, { title: 'Stock power', text: 'Fast delivery' }, { title: 'Logistics', text: 'Door to door' }, { title: 'Trust', text: 'Long-term partnership' }][i] })),
      timeline: (about.timeline ?? []).map((v, i) => ({ ...v, title: ['Founded', 'First import agreements', 'Export network expanded', 'New warehouse'][i] })),
      gallery: { title: 'From our facility', images: [img.warehouse, img.warehouse2, img.ibc, img.drumsBlue, img.port, img.drumsGreen] },
    },
  })

  const pageHeroes: { slug: 'products-page' | 'partners-page' | 'contact-page' | 'quote-page'; image: number; tr: TrEn; sub: TrEn }[] = [
    { slug: 'products-page', image: img.drumsBlue, tr: { tr: 'Ürünlerimiz', en: 'Products' }, sub: { tr: 'Kaplama sektörü için hammaddeler', en: 'Raw materials for the plating industry' } },
    { slug: 'partners-page', image: img.ship, tr: { tr: 'Çalıştığımız Firmalar', en: 'Our Partners' }, sub: { tr: 'Tedarikçilerimiz ve müşterilerimiz', en: 'Our suppliers and customers' } },
    { slug: 'contact-page', image: img.port, tr: { tr: 'İletişim', en: 'Contact' }, sub: { tr: 'Size nasıl yardımcı olabiliriz?', en: 'How can we help?' } },
    { slug: 'quote-page', image: img.warehouse2, tr: { tr: 'Teklif Sepeti', en: 'Quote Basket' }, sub: { tr: 'Ürünleri seçin, miktarları girin, gönderin.', en: 'Pick products, set quantities, send.' } },
  ]
  for (const p of pageHeroes) {
    for (const locale of ['tr', 'en'] as const) {
      await payload.updateGlobal({
        slug: p.slug,
        locale,
        data: {
          hero: { image: p.image, title: p.tr[locale], subtitle: p.sub[locale] },
          ...(p.slug === 'contact-page' ? { formTitle: locale === 'tr' ? 'Bize yazın' : 'Write to us' } : {}),
          ...(p.slug === 'quote-page'
            ? { successMessage: locale === 'tr' ? 'Teklif talebiniz ekibimize iletildi. En kısa sürede dönüş yapacağız.' : 'Your request has been sent to our team. We will get back to you shortly.' }
            : {}),
        } as never,
      })
    }
  }

  const settings = await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'tr',
    data: {
      siteName: BRAND_NAME,
      tagline: 'Kaplama sektörünün küresel hammadde tedarikçisi',
      footerNote: 'Kaplama sektörüne hammadde ithalatı, ihracatı ve tedariki.',
      address: 'Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye',
      phones: [{ number: '+90 262 000 00 00' }],
      emails: [{ email: 'info@galvanokimya.com' }],
      socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com' }, { platform: 'instagram', url: 'https://www.instagram.com' }],
      quoteRecipients: [{ email: process.env.SEED_QUOTE_EMAIL || 'teklif@galvanokimya.com' }],
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      tagline: 'Global raw material supplier for the plating industry',
      footerNote: 'Import, export and supply of raw materials for the plating industry.',
      address: 'Örnek Mah. Sanayi Cad. No: 1\nKocaeli / Türkiye',
      phones: settings.phones,
      emails: settings.emails,
      socials: settings.socials,
      quoteRecipients: settings.quoteRecipients,
    },
  })

  await applyBrandLogos(payload)
  await applyPrivacyAndFeatured(payload)
  await applyCatalogData(payload)
  await applyPartnerMedia(payload)

  payload.logger.info('✓ Örnek içerik yüklendi.')
  process.exit(0)
}

async function ensureAdmin(payload: Payload) {
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (!email || !password) {
    payload.logger.warn('SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD tanımlı değil; admin kullanıcısı oluşturulmadı.')
    return
  }
  const found = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (found.docs.length) return
  await payload.create({ collection: 'users', data: { email, password, name: 'Site Yöneticisi', role: 'admin' } })
  payload.logger.info(`Admin kullanıcısı oluşturuldu: ${email}`)
}

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
