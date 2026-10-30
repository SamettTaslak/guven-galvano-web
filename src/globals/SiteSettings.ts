import type { GlobalConfig } from 'payload'

import { BRAND_NAME } from '../lib/brand'
import { adminsField, authenticated } from '../access'
import { image, text, textarea } from './shared'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { tr: 'Site Ayarları', en: 'Site Settings' },
  admin: { group: { tr: 'Ayarlar', en: 'Settings' } },
  // Teklif alıcı e-postaları bu global'de olduğu için genel okuma kapalıdır;
  // ön yüz verileri sunucu tarafında Local API ile okur.
  access: { read: authenticated, update: authenticated },
  versions: { max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { tr: 'Genel', en: 'General' },
          fields: [
            { name: 'siteName', type: 'text', defaultValue: BRAND_NAME, label: { tr: 'Site adı', en: 'Site name' } },
            {
              name: 'legalName',
              type: 'text',
              label: { tr: 'Ticari unvan', en: 'Legal name' },
              admin: { description: { tr: 'Alt bilgideki telif satırında ve arama motoru bilgilerinde kullanılır.', en: 'Used in the footer copyright line and structured data.' } },
            },
            text('tagline', { tr: 'Slogan', en: 'Tagline' }),
            image('logo', { tr: 'Logo (açık zemin)', en: 'Logo (light bg)' }),
            image('logoLight', { tr: 'Logo (koyu zemin)', en: 'Logo (dark bg)' }),
            textarea('footerNote', { tr: 'Alt bilgi kısa metni', en: 'Footer note' }),
          ],
        },
        {
          label: { tr: 'İletişim', en: 'Contact' },
          fields: [
            textarea('address', { tr: 'Adres', en: 'Address' }),
            {
              name: 'phones',
              type: 'array',
              label: { tr: 'Telefonlar', en: 'Phones' },
              fields: [{ name: 'number', type: 'text', required: true, label: { tr: 'Numara', en: 'Number' } }],
            },
            { name: 'fax', type: 'text', label: { tr: 'Faks', en: 'Fax' } },
            {
              name: 'emails',
              type: 'array',
              label: { tr: 'Görünen e-postalar', en: 'Public e-mails' },
              fields: [{ name: 'email', type: 'email', required: true, label: 'E-posta' }],
            },
            {
              type: 'row',
              fields: [
                { name: 'mapLat', type: 'number', defaultValue: 40.7654, label: { tr: 'Harita enlem', en: 'Map latitude' } },
                { name: 'mapLng', type: 'number', defaultValue: 29.9408, label: { tr: 'Harita boylam', en: 'Map longitude' } },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              label: { tr: 'Sosyal medya', en: 'Social media' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: ['linkedin', 'instagram', 'facebook', 'youtube', 'x'].map((v) => ({ label: v, value: v })),
                    },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: { tr: 'WhatsApp', en: 'WhatsApp' },
          description: {
            tr: 'Numara girildiğinde sitenin sağ alt köşesinde WhatsApp butonu görünür; ürünlerdeki "Belge İste" bağlantıları da WhatsApp’a yönlendirir. Boş bırakılırsa buton gizlenir ve belge talepleri iletişim formuna gider.',
            en: 'When a number is set, a floating WhatsApp button appears and document requests open WhatsApp.',
          },
          fields: [
            {
              name: 'whatsappNumber',
              type: 'text',
              label: { tr: 'WhatsApp numarası', en: 'WhatsApp number' },
              admin: {
                placeholder: '+90 532 000 00 00',
                description: {
                  tr: 'Ülke koduyla birlikte yazın. Boşluk, tire ve parantez sorun değildir.',
                  en: 'Include the country code.',
                },
              },
              validate: (value: unknown) => {
                if (!value) return true
                const digits = String(value).replace(/\D/g, '')
                return digits.length >= 10 && digits.length <= 15
                  ? true
                  : 'Ülke koduyla birlikte geçerli bir numara girin (ör. +90 532 000 00 00).'
              },
            },
            textarea('whatsappMessage', { tr: 'Hazır mesaj', en: 'Default message' }, {
              maxLength: 300,
              admin: {
                description: {
                  tr: 'Butona tıklayınca ziyaretçinin mesaj kutusuna önceden yazılır.',
                  en: 'Pre-filled in the visitor’s message box.',
                },
              },
            }),
          ],
        },
        {
          label: { tr: 'Teklif E-postaları', en: 'Quote E-mails' },
          description: {
            tr: 'Teklif sepeti ve iletişim formundan gelen talepler aşağıdaki adreslere e-posta olarak gönderilir. Talepler panelde saklanmaz.',
            en: 'Quote basket and contact form submissions are e-mailed to these addresses. They are not stored.',
          },
          fields: [
            {
              name: 'quoteRecipients',
              type: 'array',
              minRows: 1,
              label: { tr: 'Alıcı e-postalar (mail grubu)', en: 'Recipients' },
              // Editörler görür ama değiştiremez; talepler yanlış adrese yönlendirilemesin.
              access: { update: adminsField },
              admin: {
                description: { tr: 'Yalnızca Yönetici rolü değiştirebilir.', en: 'Only admins can change this.' },
              },
              fields: [{ name: 'email', type: 'email', required: true, label: 'E-posta' }],
            },
          ],
        },
      ],
    },
  ],
}
