import { APIError, type Field, type GlobalConfig, type PayloadRequest } from 'payload'

import { admins, isAdminUser } from '../access'
import { explainEmailError } from '../lib/email-errors'
import { GMAIL_SEND_SCOPE, parseServiceAccountKey } from '../lib/gmail-api'
import { encryptSecret } from '../lib/secrets'

export const SMTP_PRESETS = {
  office365: { host: 'smtp.office365.com', port: 587, security: 'starttls' },
  gmail: { host: 'smtp.gmail.com', port: 587, security: 'starttls' },
  yandex: { host: 'smtp.yandex.com.tr', port: 465, security: 'ssl' },
} as const

const when = (provider: string) => (data: Record<string, unknown>) => data?.provider === provider
const requiredFor =
  (provider: string, message = 'Bu alan zorunludur.') =>
  (value: unknown, { data }: { data: Record<string, unknown> }) =>
    data?.provider === provider && (value === undefined || value === null || value === '') ? message : true

/**
 * Gizli değer için üçlü alan:
 *  - `<name>Input`: panelde girilir, veritabanına yazılmaz (virtual)
 *  - `<name>Saved`: "kayıtlı" göstergesi (salt okunur)
 *  - `<name>Enc`:   şifreli değer; API ve panelden gizli (hidden)
 */
const secretFields = (name: string, label: { tr: string; en: string }): Field[] => [
  {
    name: `${name}Input`,
    type: 'text',
    virtual: true,
    label,
    admin: {
      components: { Field: '/components/admin/SecretField#SecretField' },
      description: {
        tr: 'Güvenlik için kayıtlı değer gösterilmez. Değiştirmek için yenisini yazıp kaydedin; boş bırakırsanız mevcut değer korunur.',
        en: 'Stored value is never shown. Enter a new one to replace it.',
      },
    },
  },
  {
    type: 'row',
    fields: [
      {
        name: `${name}Saved`,
        type: 'checkbox',
        label: { tr: 'Kayıtlı değer var', en: 'Value stored' },
        admin: { readOnly: true },
      },
      {
        name: `${name}Clear`,
        type: 'checkbox',
        virtual: true,
        label: { tr: 'Kayıtlı değeri sil', en: 'Clear stored value' },
      },
    ],
  },
  { name: `${name}Enc`, type: 'text', hidden: true },
]

/** Kayıt öncesi: gizli girişleri şifreler, girilmemişse mevcut şifreli değeri korur. */
async function protectSecrets({ data, req }: { data: Record<string, any>; req: PayloadRequest }) {
  const current = await req.payload.findGlobal({ slug: 'email-settings', overrideAccess: true, showHiddenFields: true, depth: 0, req })

  const handle = (group: 'smtp' | 'microsoft' | 'google', name: string) => {
    data[group] ??= {}
    const g = data[group]
    const input = typeof g[`${name}Input`] === 'string' ? g[`${name}Input`].trim() : ''
    const existing = (current as any)?.[group]?.[`${name}Enc`] ?? null
    if (g[`${name}Clear`]) {
      g[`${name}Enc`] = null
    } else if (input) {
      g[`${name}Enc`] = encryptSecret(input)
    } else {
      g[`${name}Enc`] = existing
    }
    g[`${name}Saved`] = Boolean(g[`${name}Enc`])
    delete g[`${name}Input`]
    delete g[`${name}Clear`]
  }
  // Google: yapıştırılan JSON anahtarı kaydetmeden önce doğrula; panelde gösterilecek (gizli olmayan) kimlikleri çıkar.
  const gInput = typeof data.google?.serviceAccountInput === 'string' ? data.google.serviceAccountInput.trim() : ''
  if (gInput) {
    try {
      const key = parseServiceAccountKey(gInput)
      data.google.serviceAccountEmail = key.client_email
      data.google.serviceClientId = key.client_id ?? ''
    } catch (err) {
      throw new APIError(err instanceof Error ? err.message : String(err), 400, undefined, true)
    }
  } else if (data.google?.serviceAccountClear) {
    data.google.serviceAccountEmail = null
    data.google.serviceClientId = null
  }

  handle('smtp', 'password')
  handle('microsoft', 'clientSecret')
  handle('google', 'serviceAccount')

  // Hazır ayar seçildiyse sunucu/port/güvenlik doldurulur.
  const preset = data.smtp?.preset as keyof typeof SMTP_PRESETS | 'custom' | undefined
  if (preset && preset !== 'custom' && SMTP_PRESETS[preset]) Object.assign(data.smtp, SMTP_PRESETS[preset])
  return data
}

export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  label: { tr: 'E-posta Gönderimi', en: 'E-mail Delivery' },
  admin: {
    group: { tr: 'Ayarlar', en: 'Settings' },
    hidden: ({ user }) => !isAdminUser(user),
    description: {
      tr: 'Teklif, iletişim ve panel (şifre sıfırlama) e-postalarının nasıl gönderileceği. Alıcı adresleri Site Ayarları → Teklif E-postaları’ndadır.',
      en: 'How quote, contact and admin e-mails are sent.',
    },
  },
  // Yalnızca Yönetici; gizli değerler ayrıca şifrelidir ve hiçbir zaman API'ye dönmez.
  access: { read: admins, update: admins },
  hooks: { beforeChange: [protectSecrets as never] },
  endpoints: [
    {
      path: '/test',
      method: 'post',
      handler: async (req) => {
        if (!isAdminUser(req.user)) return Response.json({ ok: false, message: 'Yetkiniz yok.' }, { status: 403 })
        const body = (req.json ? await req.json().catch(() => ({})) : {}) as { to?: string }
        const to = String(body.to ?? '').trim()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) || to.length > 200) {
          return Response.json({ ok: false, message: 'Geçerli bir alıcı e-posta adresi girin.' }, { status: 400 })
        }
        try {
          await req.payload.sendEmail({
            to,
            subject: 'Test e-postası — e-posta ayarları çalışıyor',
            html: '<p>Bu bir test e-postasıdır. Site, teklif ve iletişim taleplerini bu ayarlarla gönderecek.</p>',
          })
          return Response.json({ ok: true, message: `Test e-postası gönderildi: ${to}` })
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err)
          req.payload.logger.error({ err }, 'Test e-postası gönderilemedi')
          // Hata metninde gizli bilgi yoktur (sağlayıcının mesajı); Türkçe çözüm önerisiyle birlikte gösterilir.
          const hint = explainEmailError(message)
          return Response.json({ ok: false, message: message.slice(0, 500), hint }, { status: 502 })
        }
      },
    },
  ],
  fields: [
    {
      name: 'provider',
      type: 'radio',
      required: true,
      defaultValue: 'env',
      label: { tr: 'Gönderim yöntemi', en: 'Delivery method' },
      options: [
        { label: { tr: 'Sunucu varsayılanı (.env)', en: 'Server default (.env)' }, value: 'env' },
        { label: { tr: 'SMTP (hosting e-postası, Gmail uygulama şifresi, Yandex…)', en: 'SMTP' }, value: 'smtp' },
        { label: { tr: 'Microsoft 365 bağlantısı (Graph API / OAuth2 — Microsoft için önerilen)', en: 'Microsoft 365 (Graph API)' }, value: 'microsoft' },
        { label: { tr: 'Google Workspace bağlantısı (Gmail API / servis hesabı — Google için önerilen)', en: 'Google Workspace (Gmail API)' }, value: 'google' },
      ],
      admin: {
        description: {
          tr: 'Firma Microsoft 365 kullanıyorsa "Microsoft 365 bağlantısı", Google Workspace kullanıyorsa "Google Workspace bağlantısı" seçin. Şifreyle SMTP girişi Google Workspace’te Mayıs 2025’te kapandı, Microsoft 365’te Aralık 2026 sonunda varsayılan olarak kapanıyor.',
          en: 'Prefer the Microsoft 365 or Google Workspace connection; password-based SMTP is being retired by both.',
        },
      },
    },
    {
      type: 'row',
      admin: { condition: (data) => data?.provider !== 'env' },
      fields: [
        {
          name: 'fromAddress',
          type: 'email',
          label: { tr: 'Gönderen adres', en: 'From address' },
          validate: ((value: unknown, { data }: { data: Record<string, unknown> }) =>
            data?.provider !== 'env' && !value ? 'Gönderen adres zorunludur.' : true) as never,
          admin: { description: { tr: 'Microsoft 365 ve Google Workspace’te gönderen posta kutusunun kendisi veya ona tanımlı bir takma ad (alias) olmalıdır; aksi halde e-posta reddedilir ya da adres değiştirilir.', en: 'Must be the sending mailbox or its alias.' } },
        },
        { name: 'fromName', type: 'text', label: { tr: 'Gönderen adı', en: 'From name' } },
      ],
    },
    {
      name: 'smtp',
      type: 'group',
      label: 'SMTP',
      admin: { condition: when('smtp') },
      fields: [
        {
          name: 'preset',
          type: 'select',
          defaultValue: 'office365',
          label: { tr: 'Hazır ayar', en: 'Preset' },
          options: [
            { label: 'Microsoft 365 (smtp.office365.com:587) — şifreyle giriş Aralık 2026’da kapanıyor', value: 'office365' },
            { label: 'Gmail (smtp.gmail.com:587) — uygulama şifresiyle', value: 'gmail' },
            { label: 'Yandex (smtp.yandex.com.tr:465) — uygulama şifresiyle', value: 'yandex' },
            { label: { tr: 'Özel (hosting / diğer)', en: 'Custom' }, value: 'custom' },
          ],
          admin: {
            description: {
              tr: 'Hazır ayar seçiliyse sunucu, port ve güvenlik kaydederken otomatik doldurulur. • Gmail: normal şifre çalışmaz; hesapta 2 Adımlı Doğrulama açıp myaccount.google.com/apppasswords adresinden 16 haneli uygulama şifresi oluşturun (Workspace yöneticisi kapatmış olabilir). • Microsoft 365: posta kutusunda "Kimliği doğrulanmış SMTP" açık olmalı ve MFA’lı hesaplarda çalışmaz; Microsoft şifreyle SMTP’yi Aralık 2026 sonunda varsayılan olarak kapatıyor — kalıcı çözüm için "Microsoft 365 bağlantısı"nı kullanın. Kişisel Outlook.com hesapları desteklenmez.',
              en: 'Gmail requires an app password. Microsoft 365 basic-auth SMTP is being retired (end of 2026).',
            },
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'host',
              type: 'text',
              label: { tr: 'Sunucu', en: 'Host' },
              validate: requiredFor('smtp') as never,
              admin: { width: '50%' },
            },
            { name: 'port', type: 'number', defaultValue: 587, label: 'Port', validate: requiredFor('smtp') as never, admin: { width: '20%' } },
            {
              name: 'security',
              type: 'select',
              defaultValue: 'starttls',
              label: { tr: 'Güvenlik', en: 'Security' },
              options: [
                { label: 'STARTTLS (587)', value: 'starttls' },
                { label: 'SSL/TLS (465)', value: 'ssl' },
                { label: { tr: 'Yok (önerilmez)', en: 'None' }, value: 'none' },
              ],
              admin: { width: '30%' },
            },
          ],
        },
        { name: 'user', type: 'text', label: { tr: 'Kullanıcı adı', en: 'Username' }, admin: { autoComplete: 'off' } },
        ...secretFields('password', { tr: 'Şifre / uygulama şifresi', en: 'Password / app password' }),
      ],
    },
    {
      name: 'microsoft',
      type: 'group',
      label: { tr: 'Microsoft 365 bağlantısı', en: 'Microsoft 365' },
      admin: {
        condition: when('microsoft'),
        description: {
          tr: 'Kurulum (bir kez): 1) Microsoft Entra yönetim merkezi → Uygulama kayıtları → Yeni kayıt. 2) Sertifikalar ve gizli diziler → Yeni istemci gizli dizisi → "Değer"i kopyalayın (en fazla 24 ay geçerli; süre dolmadan yenileyin). 3) Gönderme izni — ÖNERİLEN (yalnız tek posta kutusu): Entra’da Mail.Send izni EKLEMEYİN; Exchange Online PowerShell’de: New-ServicePrincipal -AppId <uygulama kimliği> -ObjectId <Kurumsal uygulamalar sayfasındaki nesne kimliği> ; New-ManagementScope -Name "WebSitesi" -RecipientRestrictionFilter "PrimarySmtpAddress -eq \'web@firma.com\'" ; New-ManagementRoleAssignment -App <nesne kimliği> -Role "Application Mail.Send" -CustomResourceScope "WebSitesi" (Test: Test-ServicePrincipalAuthorization). BASİT (tüm posta kutuları): API izinleri → Microsoft Graph → Uygulama izinleri → Mail.Send → Yönetici onayı ver. 4) Aşağıya kiracı ve istemci kimliğini, gizli dizi değerini ve gönderen posta kutusunu girin, kaydedip test edin. RBAC izinleri 30 dk–2 saatte etkinleşir.',
          en: 'Register an Entra app + client secret; grant Mail.Send scoped to one mailbox via Exchange RBAC for Applications (recommended) or tenant-wide in Entra.',
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'tenantId',
              type: 'text',
              label: { tr: 'Dizin (kiracı) kimliği', en: 'Tenant ID' },
              validate: ((value: unknown, args: { data: Record<string, unknown> }) => {
                const required = requiredFor('microsoft')(value, args)
                if (required !== true) return required
                const v = String(value ?? '').trim().toLowerCase()
                if (['common', 'organizations', 'consumers'].includes(v))
                  return 'Uygulama girişi için kiracıya özel kimlik gerekir (GUID ya da firma.onmicrosoft.com), "common" kullanılamaz.'
                return true
              }) as never,
            },
            { name: 'clientId', type: 'text', label: { tr: 'Uygulama (istemci) kimliği', en: 'Client ID' }, validate: requiredFor('microsoft') as never },
          ],
        },
        ...secretFields('clientSecret', { tr: 'İstemci gizli dizisi (değer)', en: 'Client secret (value)' }),
        {
          name: 'senderMailbox',
          type: 'email',
          label: { tr: 'Gönderen posta kutusu', en: 'Sender mailbox' },
          validate: requiredFor('microsoft') as never,
          admin: {
            description: {
              tr: 'E-postaların gönderileceği Microsoft 365 posta kutusu (ör. web@firma.com). Gönderilen e-postalar bu kutunun "Gönderilmiş Öğeler"inde görünür.',
              en: 'Mailbox the e-mails are sent from.',
            },
          },
        },
      ],
    },
    {
      name: 'google',
      type: 'group',
      label: { tr: 'Google Workspace bağlantısı', en: 'Google Workspace' },
      admin: {
        condition: when('google'),
        description: {
          tr: `Kurulum (bir kez): 1) console.cloud.google.com → yeni proje → API’ler ve Hizmetler → "Gmail API"yi etkinleştirin. 2) IAM ve Yönetici → Servis hesapları → Servis hesabı oluştur → Anahtarlar → Anahtar ekle → JSON (indirilen dosyayı saklayın). Anahtar oluşturma engelliyse Mayıs 2024 sonrası kurulan kuruluşlarda "iam.disableServiceAccountKeyCreation" politikası varsayılan açıktır; bu proje için kapatılmalıdır. 3) admin.google.com → Güvenlik → Erişim ve veri denetimi → API denetimleri → Alan geneli yetki → Yeni ekle: kaydettikten sonra aşağıda görünen "İstemci kimliği" ve kapsam olarak yalnızca ${GMAIL_SEND_SCOPE} (etkinleşmesi birkaç dakika–24 saat). 4) JSON dosyasının içeriğini aşağıya yapıştırın, gönderen posta kutusunu girin, kaydedip test edin. Kişisel @gmail.com hesapları için "SMTP → Gmail" (uygulama şifresi) kullanın.`,
          en: 'Service account with domain-wide delegation, scope gmail.send only.',
        },
      },
      fields: [
        ...secretFields('serviceAccount', { tr: 'Servis hesabı anahtarı (JSON dosyasının içeriği)', en: 'Service account key (JSON)' }),
        {
          type: 'row',
          fields: [
            {
              name: 'serviceAccountEmail',
              type: 'text',
              label: { tr: 'Servis hesabı', en: 'Service account' },
              admin: { readOnly: true, description: { tr: 'Anahtardan otomatik okunur.', en: 'Read from the key.' } },
            },
            {
              name: 'serviceClientId',
              type: 'text',
              label: { tr: 'İstemci kimliği (Admin Console’a girilecek)', en: 'Client ID (for Admin console)' },
              admin: { readOnly: true, description: { tr: 'Alan geneli yetki eklerken bu sayıyı kullanın.', en: 'Use for domain-wide delegation.' } },
            },
          ],
        },
        {
          name: 'senderMailbox',
          type: 'email',
          label: { tr: 'Gönderen posta kutusu', en: 'Sender mailbox' },
          validate: requiredFor('google') as never,
          admin: {
            description: {
              tr: 'E-postaların gönderileceği Workspace kullanıcısı (ör. web@firma.com). Gönderen adres bu kutu ya da onun Gmail’de tanımlı "Farklı gönder" takma adı olmalıdır; e-postalar bu kutunun "Gönderilmiş" klasöründe görünür.',
              en: 'Workspace user to send as.',
            },
          },
        },
      ],
    },
    {
      name: 'testUi',
      type: 'ui',
      admin: { components: { Field: '/components/admin/EmailTest#EmailTest' } },
    },
  ],
}
