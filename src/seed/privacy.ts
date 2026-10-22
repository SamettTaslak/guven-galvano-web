import type { Payload } from 'payload'

import { BRAND_NAME } from '../lib/brand'

// --- Lexical (zengin metin) için küçük yardımcılar ---
const txt = (text: string, bold = false) => ({ type: 'text', text, format: bold ? 1 : 0, detail: 0, mode: 'normal', style: '', version: 1 })
const para = (...children: ReturnType<typeof txt>[]) => ({ type: 'paragraph', children, direction: 'ltr', format: '', indent: 0, textFormat: 0, version: 1 })
const h2 = (text: string) => ({ type: 'heading', tag: 'h2', children: [txt(text)], direction: 'ltr', format: '', indent: 0, version: 1 })
const list = (items: string[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((item, i) => ({ type: 'listitem', value: i + 1, children: [txt(item)], direction: 'ltr', format: '', indent: 0, version: 1 })),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})
const doc = (...children: unknown[]) => ({ root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } })

/** ÖRNEK şablon — yayından önce hukuk danışmanının onayladığı metinle değiştirilmelidir. */
const privacyContent = {
  tr: doc(
    para(txt('Bu metin örnek bir şablondur. Yayından önce hukuk danışmanınızın onayladığı metinle değiştirin.', true)),
    h2('Veri Sorumlusu'),
    para(txt(`6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla ${BRAND_NAME} tarafından aşağıda açıklanan kapsamda işlenmektedir.`)),
    h2('İşlenen Kişisel Veriler'),
    list(['Kimlik ve iletişim bilgileri: ad soyad, firma adı, e-posta, telefon, ülke/şehir', 'Talep bilgileri: teklif sepetindeki ürünler, miktarlar ve mesajınız', 'İşlem güvenliği bilgileri: IP adresi ve istek zamanı']),
    h2('İşleme Amaçları ve Hukuki Sebep'),
    para(txt('Verileriniz; teklif ve iletişim taleplerinize yanıt verilmesi, ticari ilişkinin kurulması ve kötüye kullanımın önlenmesi amaçlarıyla, KVKK m.5/2 (c) ve (f) bentlerine dayanılarak işlenir. Talepler web sitesinde saklanmaz; yalnızca yetkili satış ekibine e-posta ile iletilir.')),
    h2('Aktarım'),
    para(txt('Verileriniz, e-posta hizmet sağlayıcıları ve yasal yükümlülükler kapsamında yetkili kamu kurumları dışında üçüncü kişilere aktarılmaz.')),
    h2('Haklarınız'),
    para(txt('KVKK m.11 kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına sahipsiniz. Başvurularınızı İletişim sayfasındaki adreslere iletebilirsiniz.')),
  ),
  en: doc(
    para(txt('This is a sample template. Replace it with the text approved by your legal advisor before going live.', true)),
    h2('Data Controller'),
    para(txt(`Under the Turkish Personal Data Protection Law No. 6698 ("KVKK"), your personal data is processed by ${BRAND_NAME} as data controller, as described below.`)),
    h2('Data We Process'),
    list(['Identity and contact details: name, company, e-mail, phone, country/city', 'Request details: products and quantities in your quote basket and your message', 'Security data: IP address and request time']),
    h2('Purposes and Legal Basis'),
    para(txt('Your data is processed to respond to your quote and contact requests, to establish a business relationship and to prevent abuse. Requests are not stored on the website; they are only e-mailed to our authorised sales team.')),
    h2('Transfers'),
    para(txt('Your data is not shared with third parties other than e-mail service providers and competent authorities where legally required.')),
    h2('Your Rights'),
    para(txt('Under Article 11 of KVKK you may ask whether your data is processed, request its correction or deletion, and object to processing. Please use the addresses on our Contact page.')),
  ),
}

/** KVKK sayfası ve öne çıkan ürünler başlığı (tekrar çalıştırılabilir). */
export async function applyPrivacyAndFeatured(payload: Payload) {
  const today = new Date().toISOString()
  await payload.updateGlobal({
    slug: 'privacy-page',
    locale: 'tr',
    data: { title: 'KVKK Aydınlatma Metni ve Gizlilik Politikası', content: privacyContent.tr as never, lastUpdated: today },
  })
  await payload.updateGlobal({
    slug: 'privacy-page',
    locale: 'en',
    data: { title: 'Privacy Notice', content: privacyContent.en as never },
  })
  await payload.updateGlobal({ slug: 'home-page', locale: 'tr', data: { featuredSection: { title: 'Öne Çıkan Ürünler', subtitle: 'Seçkiler' } } })
  await payload.updateGlobal({ slug: 'home-page', locale: 'en', data: { featuredSection: { title: 'Featured Products', subtitle: 'Highlights' } } })
  payload.logger.info('✓ KVKK sayfası ve öne çıkan ürünler başlığı yüklendi.')
}
