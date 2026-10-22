import { type CollectionConfig, ValidationError } from 'payload'

import { admins, adminsField, adminsOrSelf, isAdminUser } from '../access'
import { checkPassword } from '../lib/password-policy'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { tr: 'Kullanıcı', en: 'User' },
    plural: { tr: 'Kullanıcılar', en: 'Users' },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
    group: { tr: 'Sistem', en: 'System' },
    // Editörler kullanıcı listesini menüde görmez (kendi hesabına sağ üstten erişir).
    hidden: ({ user }) => !isAdminUser(user),
  },
  auth: {
    // Hesap başına kaba kuvvet koruması (IP bazlı sınır ayrıca proxy'dedir).
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    // Oturum 4 saat; panel açıkken otomatik yenilenir. Oturumlar sunucuda tutulur, çıkışta iptal edilir.
    tokenExpiration: 4 * 60 * 60,
    useSessions: true,
    // Erişim belirteci (JWT) yanıt gövdesine yazılmaz; yalnızca HttpOnly çerezde taşınır (XSS ile çalınamaz).
    removeTokenFromResponses: true,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    forgotPassword: {
      // Sıfırlama bağlantısı 30 dk geçerli.
      expiration: 30 * 60 * 1000,
    },
  },
  access: {
    read: adminsOrSelf,
    create: admins,
    update: adminsOrSelf,
    delete: admins,
  },
  fields: [
    { name: 'name', type: 'text', label: { tr: 'Ad Soyad', en: 'Full name' } },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      label: { tr: 'Rol', en: 'Role' },
      options: [
        { label: { tr: 'Yönetici', en: 'Admin' }, value: 'admin' },
        { label: { tr: 'Editör', en: 'Editor' }, value: 'editor' },
      ],
      admin: {
        position: 'sidebar',
        description: {
          tr: 'Editör: ürün, kategori, firma, medya ve sayfa içeriklerini düzenler. Yönetici: ayrıca kullanıcıları ve teklif e-postalarını yönetir.',
          en: 'Editors manage content; admins also manage users and quote recipients.',
        },
      },
      // Rolü yalnızca yönetici değiştirebilir (editör kendini yükseltemez).
      access: { create: adminsField, update: adminsField },
    },
  ],
  hooks: {
    beforeValidate: [
      // Yeni kullanıcı ve parola değişikliğinde parola kuralı (şifre sıfırlama proxy'de denetlenir).
      ({ data, originalDoc }) => {
        if (data && typeof data.password === 'string' && data.password) {
          const problem = checkPassword(data.password, data.email ?? originalDoc?.email)
          if (problem) throw new ValidationError({ collection: 'users', errors: [{ message: problem, path: 'password' }] })
        }
        return data
      },
    ],
    beforeChange: [
      // İlk kullanıcı (panelin "ilk kullanıcıyı oluştur" ekranı) her zaman yönetici olur.
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({ collection: 'users', req })
          if (totalDocs === 0) data.role = 'admin'
        }
        return data
      },
    ],
  },
}
