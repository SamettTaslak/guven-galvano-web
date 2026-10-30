import type { Payload } from 'payload'

type TrEn = { tr: string; en: string }

/** Düz paragraflardan Lexical zengin metin belgesi üretir. */
const lexical = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
    })),
  },
})

const BODY: { tr: string[]; en: string[] } = {
  tr: [
    'Güven Galvano Kimyasalları, galvanik kaplama ve yüzey işlem sektörüne hammadde tedarik eden bir ithalat, ihracat ve toptan satış firmasıdır. Kaplama yapmıyoruz; kaplama yapan işletmelerin banyolarında kullandığı metal tuzlarını, asit ve bazları, anotları ve yardımcı kimyasalları doğru kaynaktan bulup zamanında teslim ediyoruz.',
    'Avrupa ve Asya’daki üreticilerle çalışarak nikel, bakır ve çinko tuzlarından kromik aside, siyanürlü tuzlardan kostik sodaya kadar geniş bir ürün yelpazesini tek noktadan sunuyoruz. Ürünlerimizi orijinal ambalajlarında, üretici etiket ve belgeleriyle birlikte teslim ediyoruz.',
    'İstanbul Çatalca’daki depomuz, sık kullanılan hammaddeleri stokta tutmamızı ve siparişleri kısa sürede sevk etmemizi sağlıyor. Torba ve varil gibi küçük ambalajlardan IBC tank ve dökme sevkiyata kadar ihtiyaca uygun teslimat seçenekleri sunuyoruz.',
    'Türkiye’deki kaplama işletmelerinin yanı sıra çevre ülkelerdeki müşterilerimize de ihracat yapıyoruz. Teknik veri föyü (TDS) ve güvenlik bilgi formu (MSDS) gibi belgeler, talep üzerine ürünle birlikte paylaşılır.',
  ],
  en: [
    'Güven Galvano Kimyasalları is an import, export and wholesale company supplying raw materials to the electroplating and surface treatment industry. We do not do plating ourselves; we source the metal salts, acids and bases, anodes and auxiliary chemicals used in plating baths and deliver them on time.',
    'Working with producers in Europe and Asia, we offer a wide range from nickel, copper and zinc salts to chromic acid, from cyanide salts to caustic soda — all from a single supplier. Products are delivered in their original packaging with the producer’s labels and documents.',
    'Our warehouse in Çatalca, Istanbul, lets us keep frequently used raw materials in stock and dispatch orders quickly. We offer delivery options to suit every need, from bags and drums to IBC tanks and bulk shipments.',
    'Besides plating companies across Türkiye, we export to customers in neighbouring markets. Documents such as technical data sheets (TDS) and safety data sheets (MSDS) are shared with the product on request.',
  ],
}

const SERVICES: { icon: string; title: TrEn; text: TrEn }[] = [
  {
    icon: 'globe',
    title: { tr: 'Tedarik & ithalat', en: 'Sourcing & import' },
    text: {
      tr: 'Güvenilir üreticilerden doğrudan alım yapar, gümrük ve ithalat süreçlerini sizin yerinize yönetiriz.',
      en: 'We buy directly from reliable producers and handle customs and import procedures for you.',
    },
  },
  {
    icon: 'warehouse',
    title: { tr: 'Depolama', en: 'Warehousing' },
    text: {
      tr: 'Çatalca deposunda kritik hammaddeleri stokta tutarak üretiminizin aksamamasını sağlarız.',
      en: 'We keep critical raw materials in stock at our Çatalca warehouse so your production never stops.',
    },
  },
  {
    icon: 'truck',
    title: { tr: 'Sevkiyat & lojistik', en: 'Shipping & logistics' },
    text: {
      tr: 'Torba, varil, IBC veya dökme; yurt içi ve ihracat sevkiyatlarını planlayıp kapınıza ulaştırırız.',
      en: 'Bags, drums, IBCs or bulk — we plan domestic and export shipments and deliver to your door.',
    },
  },
  {
    icon: 'document',
    title: { tr: 'Belge desteği', en: 'Document support' },
    text: {
      tr: 'TDS, MSDS ve menşe gibi ürün belgelerini talep üzerine hızlıca iletiriz.',
      en: 'We promptly provide product documents such as TDS, MSDS and certificates of origin on request.',
    },
  },
]

const SECTORS: TrEn[] = [
  { tr: 'Nikel kaplama', en: 'Nickel plating' },
  { tr: 'Krom kaplama', en: 'Chrome plating' },
  { tr: 'Çinko kaplama', en: 'Zinc plating' },
  { tr: 'Bakır kaplama', en: 'Copper plating' },
  { tr: 'Altın & değerli metal', en: 'Gold & precious metals' },
  { tr: 'Pasivasyon', en: 'Passivation' },
  { tr: 'Fosfat kaplama', en: 'Phosphating' },
  { tr: 'Yağ alma & ön işlem', en: 'Degreasing & pre-treatment' },
  { tr: 'Atık su arıtımı', en: 'Wastewater treatment' },
]

const STORY: { image: string; title: TrEn; text: TrEn }[] = [
  {
    image: 'ship-1.jpg',
    title: { tr: 'Küresel tedarik ağı', en: 'Global sourcing network' },
    text: {
      tr: 'Avrupa ve Asya’daki üreticilerle kurduğumuz uzun soluklu ilişkiler sayesinde hammaddeleri doğrudan kaynağından alıyoruz. Bu, hem fiyat istikrarı hem de sürekli tedarik anlamına geliyor.\n\nPiyasadaki dalgalanmaları yakından takip ediyor, müşterilerimizi fiyat ve teslim süreleri konusunda önceden bilgilendiriyoruz.',
      en: 'Long-standing relationships with producers in Europe and Asia let us buy raw materials directly at the source — meaning stable prices and continuous supply.\n\nWe follow market movements closely and keep our customers informed about prices and lead times in advance.',
    },
  },
  {
    image: 'catalca-depo-2.jpg',
    title: { tr: 'Çatalca deposu', en: 'Çatalca warehouse' },
    text: {
      tr: 'İstanbul Çatalca’daki depomuzda sık kullanılan ürünleri stokta tutuyoruz. Paletli düzen ve forkliftli yükleme ile siparişleri hızla hazırlayıp sevk ediyoruz.\n\nKimyasallar, türüne ve tehlike sınıfına göre ayrılarak orijinal ambalajlarında saklanır.',
      en: 'At our warehouse in Çatalca, Istanbul, we keep frequently used products in stock. Palletised storage and forklift loading let us prepare and dispatch orders quickly.\n\nChemicals are stored in their original packaging, separated by type and hazard class.',
    },
  },
  {
    image: 'konteyner-kostik-soda.jpg',
    title: { tr: 'İhracat ve sevkiyat', en: 'Export and shipping' },
    text: {
      tr: 'Yurt içinde kaplama işletmelerine düzenli sevkiyat yaparken çevre ülkelerdeki müşterilerimize konteyner ve parsiyel yüklemelerle ihracat gerçekleştiriyoruz.\n\nİhracat evrakı, tehlikeli madde taşımacılığı (ADR/IMDG) gereklilikleri ve ambalaj seçimi konusunda süreci baştan sona yönetiyoruz.',
      en: 'Alongside regular deliveries to plating companies in Türkiye, we export to customers in neighbouring countries with full and part container loads.\n\nWe manage the whole process, including export documents, dangerous goods (ADR/IMDG) requirements and packaging choice.',
    },
  },
]

const VALUES: { icon: string; title: TrEn; text: TrEn }[] = [
  {
    icon: 'handshake',
    title: { tr: 'Güven', en: 'Trust' },
    text: { tr: 'Adımızdaki sözü işimizde tutarız: doğru ürün, doğru miktar, zamanında teslim.', en: 'We live up to our name: the right product, the right quantity, delivered on time.' },
  },
  {
    icon: 'warehouse',
    title: { tr: 'Stok gücü', en: 'Stock strength' },
    text: { tr: 'Kritik hammaddeleri stokta tutarak üretiminizin kesintisiz sürmesine destek oluruz.', en: 'Keeping critical raw materials in stock helps your production run without interruption.' },
  },
  {
    icon: 'shield',
    title: { tr: 'Güvenli taşıma', en: 'Safe handling' },
    text: { tr: 'Tehlikeli maddeleri mevzuata uygun ambalaj, etiket ve evrakla taşırız.', en: 'Dangerous goods are moved with compliant packaging, labels and documents.' },
  },
  {
    icon: 'clock',
    title: { tr: 'Hızlı yanıt', en: 'Quick response' },
    text: { tr: 'Teklif ve belge taleplerinize aynı gün dönüş yapmayı hedefleriz.', en: 'We aim to answer quote and document requests the same day.' },
  },
]

const mediaId = async (payload: Payload, filename: string) =>
  (await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, depth: 0 })).docs[0]?.id

/** Hakkımızda sayfasını ayrıntılı TR/EN içerikle doldurur. Tekrar çalıştırılabilir: npm run about:apply */
export async function applyAboutContent(payload: Payload) {
  const [products, categories, processes, home] = await Promise.all([
    payload.count({ collection: 'products', where: { isActive: { equals: true } } }),
    payload.count({ collection: 'product-categories' }),
    payload.count({ collection: 'processes' }),
    payload.findGlobal({ slug: 'home-page', depth: 0 }),
  ])
  const countries = new Set((home.routes ?? []).map((r) => r.label)).size

  const facts: { label: TrEn; value: TrEn }[] = [
    { label: { tr: 'Merkez', en: 'Head office' }, value: { tr: 'İkitelli OSB, Başakşehir / İstanbul', en: 'İkitelli OSB, Başakşehir / Istanbul' } },
    { label: { tr: 'Depo', en: 'Warehouse' }, value: { tr: 'Çatalca / İstanbul', en: 'Çatalca / Istanbul' } },
    { label: { tr: 'Faaliyet alanı', en: 'Business' }, value: { tr: 'İthalat · İhracat · Toptan', en: 'Import · Export · Wholesale' } },
    {
      label: { tr: 'Ürün yelpazesi', en: 'Product range' },
      value: { tr: `${products.totalDocs}+ ürün, ${categories.totalDocs} grup`, en: `${products.totalDocs}+ products, ${categories.totalDocs} groups` },
    },
    { label: { tr: 'Ambalaj', en: 'Packaging' }, value: { tr: 'Torba · Varil · IBC · Dökme', en: 'Bag · Drum · IBC · Bulk' } },
    { label: { tr: 'Teknik belgeler', en: 'Technical documents' }, value: { tr: 'TDS / MSDS talep üzerine', en: 'TDS / MSDS on request' } },
  ]
  const stats: { value: number; suffix: string; label: TrEn }[] = [
    { value: products.totalDocs, suffix: '+', label: { tr: 'Ürün', en: 'Products' } },
    { value: categories.totalDocs, suffix: '', label: { tr: 'Ürün grubu', en: 'Product groups' } },
    { value: processes.totalDocs, suffix: '', label: { tr: 'Kaplama prosesi', en: 'Plating processes' } },
    { value: countries || 10, suffix: '+', label: { tr: 'Tedarik & ihracat noktası', en: 'Sourcing & export points' } },
  ]

  const storyImages = await Promise.all(STORY.map((s) => mediaId(payload, s.image)))
  const ctaImage = await mediaId(payload, 'catalca-depo-3.jpg')
  const current = await payload.findGlobal({ slug: 'about-page', depth: 0, locale: 'tr' })

  for (const locale of ['tr', 'en'] as const) {
    // Dizi satırları TR'de oluşturulur; EN'de aynı satır kimlikleriyle yalnızca metinler yazılır.
    const tr = locale === 'tr' ? null : await payload.findGlobal({ slug: 'about-page', depth: 0, locale: 'tr' })
    const ids = (rows?: { id?: string | null }[] | null) => (rows ?? []).map((r) => r.id ?? undefined)
    await payload.updateGlobal({
      slug: 'about-page',
      locale,
      data: {
        hero: {
          image: current.hero?.image,
          title: locale === 'tr' ? current.hero?.title || 'Hakkımızda' : 'About Us',
          subtitle: locale === 'tr' ? 'Kaplama sektörüne dünyadan hammadde, Çatalca’dan güvenilir teslimat.' : 'Raw materials from around the world for the plating industry, delivered reliably from Çatalca.',
        },
        intro:
          locale === 'tr'
            ? 'Kaplama işletmelerinin ihtiyaç duyduğu hammaddeleri dünyanın dört bir yanından tedarik ediyor, stokluyor ve zamanında teslim ediyoruz.'
            : 'We source, stock and deliver on time the raw materials that plating companies need, from all over the world.',
        company: {
          eyebrow: locale === 'tr' ? 'Biz kimiz' : 'Who we are',
          title: locale === 'tr' ? 'Kaplama sektörünün hammadde tedarikçisi' : 'Raw material supplier to the plating industry',
          body: lexical(BODY[locale]) as never,
          facts: facts.map((f, i) => ({ id: ids(tr?.company?.facts)[i], label: f.label[locale], value: f.value[locale] })),
        },
        stats: stats.map((s, i) => ({ id: ids(tr?.stats)[i], value: s.value, suffix: s.suffix, label: s.label[locale] })),
        services: {
          eyebrow: locale === 'tr' ? 'Ne yapıyoruz' : 'What we do',
          title: locale === 'tr' ? 'Kaynaktan banyonuza kadar tedarik zinciri' : 'The supply chain from source to your bath',
          intro:
            locale === 'tr'
              ? 'Hammaddenin üreticiden alınmasından tesisinize teslimine kadar her adımı biz yönetiyoruz; siz üretiminize odaklanın.'
              : 'We manage every step from buying at the producer to delivery at your plant, so you can focus on production.',
          items: SERVICES.map((s, i) => ({ id: ids(tr?.services?.items)[i], icon: s.icon as never, title: s.title[locale], text: s.text[locale] })),
        },
        sectors: {
          title: locale === 'tr' ? 'Hizmet verdiğimiz prosesler' : 'Processes we serve',
          text:
            locale === 'tr'
              ? 'Ürünlerimiz, farklı kaplama ve yüzey işlem proseslerinde banyo hazırlama ve takviyesi için kullanılır.'
              : 'Our products are used for bath make-up and replenishment across many plating and surface treatment processes.',
          items: SECTORS.map((s, i) => ({ id: ids(tr?.sectors?.items)[i], label: s[locale] })),
        },
        story: STORY.map((s, i) => ({ id: ids(tr?.story)[i], image: storyImages[i] ?? current.story?.[i]?.image, title: s.title[locale], text: s.text[locale] })) as never,
        valuesTitle: locale === 'tr' ? 'Çalışma ilkelerimiz' : 'How we work',
        values: VALUES.map((v, i) => ({ id: ids(tr?.values)[i], icon: v.icon as never, title: v.title[locale], text: v.text[locale] })),
        timelineTitle: locale === 'tr' ? 'Yolculuğumuz' : 'Our journey',
        gallery: { images: current.gallery?.images, title: locale === 'tr' ? 'Depodan ve sevkiyattan kareler' : 'From our warehouse and shipments' },
        cta: {
          image: ctaImage ?? current.cta?.image,
          title: locale === 'tr' ? 'İhtiyacınız olan hammadde stokta olabilir' : 'The raw material you need may already be in stock',
          text:
            locale === 'tr'
              ? 'Ürün kataloğumuzu inceleyin ya da ihtiyaç listenizi teklif sepetine ekleyin; size en kısa sürede dönüş yapalım.'
              : 'Browse our catalogue or add your needs to the quote basket and we will get back to you shortly.',
        },
      },
    })
  }
  payload.logger.info('✓ Hakkımızda içeriği yüklendi (TR/EN)')
}
