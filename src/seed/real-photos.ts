/**
 * Firmanın gerçek fotoğraflarını (assets/real/*.jpg) medya kütüphanesine yükler ve
 * ürünlere, kategorilere, ana sayfa ve Hakkımızda sayfasına bağlar. Fotoğrafı olan ama
 * katalogda bulunmayan ürünler oluşturulur. Tekrar çalıştırılabilir (dosya adı / ürün kodu ile eşleşir).
 *   npm run media:real
 */
import config from '@payload-config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload, type Payload } from 'payload'

type TrEn = { tr: string; en: string }

const DIR = path.resolve(process.cwd(), 'assets/real')

const PHOTOS: Record<string, TrEn> = {
  'catalca-depo-1': { tr: 'Çatalca deposunda raflı kimyasal stok alanı', en: 'Racked chemical stock at our Çatalca warehouse' },
  'catalca-depo-2': { tr: 'Çatalca deposunda forklift ve paletli kimyasallar', en: 'Forklift and palletised chemicals at the Çatalca warehouse' },
  'catalca-depo-3': { tr: 'Çatalca deposu önünde IBC tanklar', en: 'IBC tanks in front of the Çatalca warehouse' },
  'konteyner-kostik-soda': { tr: 'Konteynerde paletli kostik soda çuvalları', en: 'Palletised caustic soda bags in a container' },
  'treyler-krom-trioksit': { tr: 'Treylere yüklenmiş krom trioksit varilleri', en: 'Chromium trioxide drums loaded on a trailer' },
  'cinko-klorur-torbalar': { tr: 'Çinko klorür torbaları', en: 'Zinc chloride bags' },
  'cinko-klorur-25kg': { tr: '25 kg çinko klorür torbası', en: '25 kg zinc chloride bag' },
  'amonyum-klorur': { tr: '25 kg amonyum klorür torbası', en: '25 kg ammonium chloride bag' },
  'baryum-klorur': { tr: '25 kg baryum klorür dihidrat torbası', en: '25 kg barium chloride dihydrate bag' },
  'sodyum-nitrat': { tr: '25 kg sodyum nitrat torbası', en: '25 kg sodium nitrate bag' },
  'bakir-sulfat': { tr: '25 kg bakır sülfat pentahidrat torbası', en: '25 kg copper sulphate pentahydrate bag' },
  'sodyum-siyanur-varil': { tr: '50 kg sodyum siyanür varili', en: '50 kg sodium cyanide drum' },
  'sodyum-siyanur-fici': { tr: 'Sodyum siyanür fıçısı', en: 'Sodium cyanide drum' },
  'sodyum-hidroksit-cuval': { tr: 'Sodyum hidroksit (kostik soda) mikroinci çuvalı', en: 'Sodium hydroxide (caustic soda) micropearls bag' },
  'kostik-soda-cuval': { tr: '25 kg kostik soda çuvalı', en: '25 kg caustic soda bag' },
  'kromik-asit-1': { tr: 'Kromik asit (krom trioksit) varili', en: 'Chromic acid (chromium trioxide) drum' },
  'kromik-asit-2': { tr: 'Kromik asit varili tehlike etiketleri', en: 'Chromic acid drum hazard labels' },
  'kimyasal-varil-mavi': { tr: 'Mavi kimyasal varil', en: 'Blue chemical drum' },
  'potasyum-hidroksit': { tr: '25 kg potasyum hidroksit torbası', en: '25 kg potassium hydroxide bag' },
  'potasyum-klorur': { tr: '25 kg potasyum klorür torbası', en: '25 kg potassium chloride bag' },
  'potasyum-siyanur': { tr: '50 kg potasyum siyanür varili', en: '50 kg potassium cyanide drum' },
  'sodyum-bikromat': { tr: '25 kg sodyum bikromat torbası', en: '25 kg sodium dichromate bag' },
  'sodyum-metabisulfit': { tr: '25 kg sodyum metabisülfit torbası', en: '25 kg sodium metabisulphite bag' },
  'hidrojen-peroksit': { tr: 'Hidrojen peroksit varili', en: 'Hydrogen peroxide drum' },
  'izopropil-alkol': { tr: '165 kg izopropil alkol varili', en: '165 kg isopropyl alcohol drum' },
}

type ProductDef = {
  name: TrEn
  category: string
  cas?: string
  formula?: string
  processes: string[]
  summary?: TrEn
  cover: string
  gallery?: string[]
}

/** Ürün kodu → fotoğraflar. Mevcut ürünlerde yalnızca görseller güncellenir; olmayanlar oluşturulur. */
const PRODUCTS: Record<string, ProductDef> = {
  'GK-CS-03': { name: { tr: 'Bakır Sülfat', en: 'Copper Sulphate' }, category: 'metal-tuzlari', processes: [], cover: 'bakir-sulfat' },
  'GK-ZC-04': { name: { tr: 'Çinko Klorür', en: 'Zinc Chloride' }, category: 'metal-tuzlari', processes: [], cover: 'cinko-klorur-25kg', gallery: ['cinko-klorur-torbalar'] },
  'GK-CSD-07': {
    name: { tr: 'Kostik Soda', en: 'Caustic Soda' },
    category: 'asitler-bazlar',
    processes: [],
    cover: 'kostik-soda-cuval',
    gallery: ['sodyum-hidroksit-cuval', 'konteyner-kostik-soda'],
  },
  'GK-BLK-14': { name: { tr: 'Dökme Kimyasal Sevkiyat', en: 'Bulk Chemical Shipment' }, category: 'dokme-ibc-tedarik', processes: [], cover: 'catalca-depo-3' },
  'GK-AK-15': {
    name: { tr: 'Amonyum Klorür', en: 'Ammonium Chloride' },
    category: 'metal-tuzlari',
    cas: '12125-02-9',
    formula: 'NH4Cl',
    processes: ['cinko-kaplama'],
    summary: { tr: 'Asidik çinko banyolarında iletkenlik tuzu olarak kullanılır. 25 kg torba.', en: 'Conductivity salt for acid zinc baths. 25 kg bags.' },
    cover: 'amonyum-klorur',
  },
  'GK-BK-16': {
    name: { tr: 'Baryum Klorür Dihidrat', en: 'Barium Chloride Dihydrate' },
    category: 'metal-tuzlari',
    cas: '10326-27-9',
    formula: 'BaCl2·2H2O',
    processes: ['krom-kaplama'],
    summary: { tr: 'Krom banyolarında sülfat dengesinin ayarlanmasında kullanılır. 25 kg torba.', en: 'Used to adjust sulphate levels in chrome baths. 25 kg bags.' },
    cover: 'baryum-klorur',
  },
  'GK-SN-17': {
    name: { tr: 'Sodyum Nitrat', en: 'Sodium Nitrate' },
    category: 'parlatici-katkilar',
    cas: '7631-99-4',
    formula: 'NaNO3',
    processes: ['fosfat-kaplama'],
    summary: { tr: 'Fosfat ve karartma banyolarında oksitleyici katkı. 25 kg torba.', en: 'Oxidising additive for phosphating and blackening baths. 25 kg bags.' },
    cover: 'sodyum-nitrat',
  },
  'GK-NCN-18': {
    name: { tr: 'Sodyum Siyanür', en: 'Sodium Cyanide' },
    category: 'metal-tuzlari',
    cas: '143-33-9',
    formula: 'NaCN',
    processes: ['bakir-kaplama', 'cinko-kaplama'],
    summary: { tr: 'Siyanürlü bakır ve çinko banyoları için. 50 kg varil.', en: 'For cyanide copper and zinc baths. 50 kg drums.' },
    cover: 'sodyum-siyanur-varil',
    gallery: ['sodyum-siyanur-fici'],
  },
  'GK-KCN-19': {
    name: { tr: 'Potasyum Siyanür', en: 'Potassium Cyanide' },
    category: 'metal-tuzlari',
    cas: '151-50-8',
    formula: 'KCN',
    processes: ['altin-kaplama', 'bakir-kaplama'],
    summary: { tr: 'Siyanürlü altın ve bakır banyoları için. 50 kg varil.', en: 'For cyanide gold and copper baths. 50 kg drums.' },
    cover: 'potasyum-siyanur',
  },
  'GK-CRO-20': {
    name: { tr: 'Kromik Asit (Krom Trioksit)', en: 'Chromic Acid (Chromium Trioxide)' },
    category: 'asitler-bazlar',
    cas: '1333-82-0',
    formula: 'CrO3',
    processes: ['krom-kaplama'],
    summary: { tr: 'Sert ve dekoratif krom banyolarının ana hammaddesi. Varil ambalaj.', en: 'The main raw material of hard and decorative chrome baths. Drums.' },
    cover: 'kromik-asit-1',
    gallery: ['kromik-asit-2', 'treyler-krom-trioksit'],
  },
  'GK-KOH-21': {
    name: { tr: 'Potasyum Hidroksit', en: 'Potassium Hydroxide' },
    category: 'asitler-bazlar',
    cas: '1310-58-3',
    formula: 'KOH',
    processes: ['yag-alma-on-islem'],
    summary: { tr: 'Alkali yağ alma ve pH ayarında kullanılır. 25 kg torba.', en: 'Used in alkaline degreasing and pH adjustment. 25 kg bags.' },
    cover: 'potasyum-hidroksit',
  },
  'GK-KCL-22': {
    name: { tr: 'Potasyum Klorür', en: 'Potassium Chloride' },
    category: 'metal-tuzlari',
    cas: '7447-40-7',
    formula: 'KCl',
    processes: ['cinko-kaplama'],
    summary: { tr: 'Klorürlü (asidik) çinko banyolarının temel tuzu. 25 kg torba.', en: 'Base salt of chloride (acid) zinc baths. 25 kg bags.' },
    cover: 'potasyum-klorur',
  },
  'GK-SDC-23': {
    name: { tr: 'Sodyum Bikromat', en: 'Sodium Dichromate' },
    category: 'pasivasyon',
    cas: '7789-12-0',
    formula: 'Na2Cr2O7·2H2O',
    processes: ['pasivasyon'],
    summary: { tr: 'Kromat pasivasyon ve yüzey işlemlerinde kullanılır. 25 kg torba.', en: 'Used in chromate passivation and surface treatment. 25 kg bags.' },
    cover: 'sodyum-bikromat',
  },
  'GK-SMB-24': {
    name: { tr: 'Sodyum Metabisülfit', en: 'Sodium Metabisulphite' },
    category: 'parlatici-katkilar',
    cas: '7681-57-4',
    formula: 'Na2S2O5',
    processes: [],
    summary: { tr: 'İndirgeyici; krom (VI) indirgeme ve atık su arıtımında kullanılır. 25 kg torba.', en: 'Reducing agent for chromium (VI) reduction and wastewater treatment. 25 kg bags.' },
    cover: 'sodyum-metabisulfit',
  },
  'GK-HP-25': {
    name: { tr: 'Hidrojen Peroksit', en: 'Hydrogen Peroxide' },
    category: 'parlatici-katkilar',
    cas: '7722-84-1',
    formula: 'H2O2',
    processes: [],
    summary: { tr: 'Banyo arıtma ve yüzey hazırlamada oksitleyici olarak kullanılır. Varil.', en: 'Oxidiser for bath purification and surface preparation. Drums.' },
    cover: 'hidrojen-peroksit',
  },
  'GK-IPA-26': {
    name: { tr: 'İzopropil Alkol', en: 'Isopropyl Alcohol' },
    category: 'parlatici-katkilar',
    cas: '67-63-0',
    formula: 'C3H8O',
    processes: ['yag-alma-on-islem'],
    summary: { tr: 'Yüzey temizleme ve kurutmada kullanılan çözücü. 165 kg varil.', en: 'Solvent for surface cleaning and drying. 165 kg drums.' },
    cover: 'izopropil-alkol',
  },
}

const CATEGORY_IMAGES: Record<string, string> = {
  'metal-tuzlari': 'cinko-klorur-torbalar',
  'asitler-bazlar': 'konteyner-kostik-soda',
  pasivasyon: 'treyler-krom-trioksit',
  'dokme-ibc-tedarik': 'catalca-depo-3',
}

const FACILITY = ['catalca-depo-1', 'catalca-depo-2', 'catalca-depo-3', 'konteyner-kostik-soda', 'treyler-krom-trioksit', 'cinko-klorur-torbalar']

async function uploadPhotos(payload: Payload) {
  const ids: Record<string, number> = {}
  for (const [key, alt] of Object.entries(PHOTOS)) {
    const data = await fs.readFile(path.join(DIR, `${key}.jpg`)).catch(() => null)
    if (!data) {
      payload.logger.warn(`Dosya yok, atlandı: ${key}`)
      continue
    }
    const found = await payload.find({ collection: 'media', where: { filename: { equals: `${key}.jpg` } }, limit: 1, depth: 0 })
    const file = { data, mimetype: 'image/jpeg', name: `${key}.jpg`, size: data.length }
    const doc = found.docs[0]
      ? found.docs[0]
      : await payload.create({ collection: 'media', locale: 'tr', data: { alt: alt.tr }, file })
    // Kayıt zaten varsa alt metinleri yalnızca boşsa doldurulur (panelde düzenlenmiş olabilir).
    if (!found.docs[0] || !found.docs[0].alt) await payload.update({ collection: 'media', id: doc.id, locale: 'tr', data: { alt: alt.tr } })
    const en = await payload.findByID({ collection: 'media', id: doc.id, locale: 'en', fallbackLocale: false, depth: 0 })
    if (!en.alt) await payload.update({ collection: 'media', id: doc.id, locale: 'en', data: { alt: alt.en } })
    ids[key] = doc.id
  }
  return ids
}

const idBySlug = async (payload: Payload, collection: 'processes' | 'product-categories', slugs: string[]) => {
  const res = await payload.find({ collection, where: { slug: { in: slugs } }, limit: 100, depth: 0 })
  return Object.fromEntries(res.docs.map((d) => [d.slug, d.id])) as Record<string, number>
}

async function main() {
  const payload = await getPayload({ config })
  const media = await uploadPhotos(payload)
  const pick = (keys: string[]) => keys.map((k) => media[k]).filter(Boolean)

  // Ürünler
  const categories = await idBySlug(payload, 'product-categories', Object.keys({ ...CATEGORY_IMAGES, 'parlatici-katkilar': 1 }))
  const processes = await idBySlug(payload, 'processes', [...new Set(Object.values(PRODUCTS).flatMap((p) => p.processes))])
  let created = 0
  let updated = 0
  const last = await payload.find({ collection: 'products', sort: '-order', limit: 1, depth: 0 })
  let order = (last.docs[0]?.order ?? 0) + 1

  for (const [code, def] of Object.entries(PRODUCTS)) {
    const found = await payload.find({ collection: 'products', where: { code: { equals: code } }, limit: 1, depth: 0 })
    const images = { coverImage: media[def.cover], gallery: pick(def.gallery ?? []) }
    if (found.docs[0]) {
      await payload.update({ collection: 'products', id: found.docs[0].id, data: images })
      updated++
      continue
    }
    if (!categories[def.category]) {
      payload.logger.warn(`Kategori yok (${def.category}), ürün atlandı: ${code}`)
      continue
    }
    const doc = await payload.create({
      collection: 'products',
      locale: 'tr',
      data: {
        name: def.name.tr,
        code,
        category: categories[def.category],
        cas: def.cas,
        formula: def.formula,
        processes: def.processes.map((s) => processes[s]).filter(Boolean),
        summary: def.summary?.tr,
        unit: 'kg',
        isActive: true,
        order: order++,
        ...images,
      },
    })
    await payload.update({ collection: 'products', id: doc.id, locale: 'en', data: { name: def.name.en, summary: def.summary?.en } })
    created++
  }

  // Kategori kapakları
  for (const [slug, key] of Object.entries(CATEGORY_IMAGES)) {
    if (categories[slug] && media[key]) await payload.update({ collection: 'product-categories', id: categories[slug], data: { image: media[key] } })
  }

  // Ana sayfa: ilk slayt gerçek depo fotoğrafı, görsel şerit ve tam genişlik bant tesis fotoğrafları.
  const home = await payload.findGlobal({ slug: 'home-page', depth: 0, locale: 'tr' })
  const slides = (home.slides ?? []).filter((s) => s.image !== media['catalca-depo-1'])
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'tr',
    data: {
      slides: [{ image: media['catalca-depo-1'], caption: 'Çatalca Depomuz' }, ...slides],
      showcase: { ...home.showcase, image: media['catalca-depo-2'] },
      gallery: { ...home.gallery, images: pick(FACILITY) },
    },
  })
  const homeTr = await payload.findGlobal({ slug: 'home-page', depth: 0, locale: 'tr' })
  const homeEn = await payload.findGlobal({ slug: 'home-page', depth: 0, locale: 'en', fallbackLocale: false })
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      slides: (homeTr.slides ?? []).map((s, i) => ({
        ...s,
        caption: i === 0 ? 'Our Çatalca warehouse' : (homeEn.slides ?? []).find((e) => e.id === s.id)?.caption,
      })),
    },
  })

  // Hakkımızda: başlık görseli ve galeri gerçek tesis fotoğrafları.
  const about = await payload.findGlobal({ slug: 'about-page', depth: 0 })
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      hero: { ...about.hero, image: media['catalca-depo-1'] },
      gallery: { ...about.gallery, images: pick(FACILITY) },
    },
  })

  payload.logger.info(`Tamamlandı: ${Object.keys(media).length} fotoğraf, ${created} yeni ürün, ${updated} ürün görseli güncellendi.`)
  process.exit(0)
}

// `payload run` modül yüklenince çıktığı için top-level await zorunlu.
try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
