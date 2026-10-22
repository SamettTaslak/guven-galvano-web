/**
 * Sağlayıcı hata metinlerini (Microsoft, Google, SMTP) panelde gösterilecek Türkçe çözüm önerisine çevirir.
 * Kaynaklar: Microsoft Entra AADSTS kodları, Exchange SMTP yanıtları, Gmail SMTP/OAuth hataları.
 */
const HINTS: [RegExp, string][] = [
  // Microsoft 365 — SMTP
  [/5\.7\.139|SmtpClientAuthentication is disabled/i, 'Bu posta kutusunda SMTP AUTH kapalı. Microsoft 365 yönetim merkezinde kullanıcının "Kimliği doğrulanmış SMTP" seçeneğini açın ya da (önerilen) "Microsoft 365 bağlantısı" yöntemine geçin.'],
  [/5\.7\.30|Basic authentication is not supported/i, 'Microsoft, SMTP’de şifreyle girişi bu kiracı için kapatmış (genel kapatma Aralık 2026). "Microsoft 365 bağlantısı" yöntemini kullanın.'],
  [/5\.7\.3 Authentication unsuccessful|535 5\.7\.3/i, 'Microsoft kullanıcı adı/şifreyi kabul etmedi. Hesapta MFA açıksa SMTP şifresi çalışmaz; "Microsoft 365 bağlantısı" yöntemini kullanın.'],
  [/5\.7\.60|SendAsDenied|not allowed to send as/i, 'Gönderen adres, posta kutusu adına gönderim yetkisine sahip değil. Gönderen adresi posta kutusunun kendisi yapın veya "Farklı Gönder" (Send As) yetkisi verin.'],
  // Microsoft Entra / Graph
  [/AADSTS7000215/i, 'İstemci gizli dizisi hatalı. Entra’da gizli dizinin “Kimlik”ini değil “Değer” sütununu kopyalayın.'],
  [/AADSTS7000222/i, 'İstemci gizli dizisinin süresi dolmuş. Entra’da yeni gizli dizi oluşturup panelden girin.'],
  [/AADSTS700016/i, 'Uygulama (istemci) kimliği bu kiracıda bulunamadı. Kiracı ve istemci kimliklerini kontrol edin.'],
  [/AADSTS53003/i, 'Microsoft Entra Koşullu Erişim (Conditional Access) politikası uygulamanın oturum açmasını engelledi. BT yöneticisi bu uygulamayı (iş yükü kimliği) politikadan hariç tutmalı veya sunucunun IP adresini güvenilir konum olarak eklemelidir.'],
  [/AADSTS7000229|AADSTS700024|AADSTS7000112/i, 'Kurumsal uygulama (servis sorumlusu) eksik veya devre dışı. Entra → Kurumsal uygulamalar’da uygulamanın etkin olduğunu ve yönetici onayının verildiğini kontrol edin.'],
  [/AADSTS90002|AADSTS900023|AADSTS900021/i, 'Dizin (kiracı) kimliği geçersiz. Entra → Genel bakış sayfasındaki “Dizin (kiracı) kimliği”ni girin.'],
  [/ErrorAccessDenied|Microsoft Graph gönderim hatası \(403/i, 'Uygulamanın bu posta kutusundan gönderme izni yok. Entra’daki Mail.Send yönetici onayını veya Exchange RBAC atamasını (Application Mail.Send) kontrol edin. RBAC değişikliklerinin etkinleşmesi 30 dk–2 saat sürebilir.'],
  [/ErrorInvalidUser|MailboxNotEnabledForRESTAPI|Microsoft Graph gönderim hatası \(404/i, 'Gönderen posta kutusu bulunamadı veya lisanslı bir Exchange posta kutusu değil.'],
  // Google
  [/unauthorized_client/i, 'Google, servis hesabına alan geneli yetki (domain-wide delegation) verilmediğini söylüyor. Admin Console → Güvenlik → API denetimleri → Alan geneli yetki bölümüne servis hesabının Client ID’sini ve https://www.googleapis.com/auth/gmail.send kapsamını ekleyin (etkinleşmesi 24 saati bulabilir).'],
  [/invalid_grant/i, 'Google oturumu reddetti: gönderen posta kutusu bu Workspace alanının kullanıcısı olmalı; sunucu saati de doğru olmalı.'],
  [/admin_policy_enforced/i, 'Google Workspace yöneticisi bu uygulamanın erişimini politika ile engellemiş.'],
  [/534-5\.7\.9|Application-specific password required/i, 'Gmail uygulama şifresi istiyor: hesapta 2 Adımlı Doğrulama açıp myaccount.google.com/apppasswords adresinden oluşturduğunuz 16 haneli şifreyi girin.'],
  [/535-5\.7\.8|Username and Password not accepted|BadCredentials/i, 'Gmail kullanıcı adı veya uygulama şifresi hatalı. Normal hesap şifresi çalışmaz; uygulama şifresi kullanın. Workspace’te yönetici uygulama şifrelerini kapatmışsa "Google Workspace bağlantısı" yöntemini kullanın.'],
  [/Mail service not enabled|failedPrecondition/i, 'Gönderen kullanıcı için Gmail hizmeti açık değil veya Gmail API projede etkin değil (Google Cloud → API’ler → Gmail API → Etkinleştir).'],
  [/accessNotConfigured|has not been used in project/i, 'Gmail API bu Google Cloud projesinde etkin değil. Konsolda Gmail API’yi etkinleştirin.'],
  // Bağlantı
  [/ECONNREFUSED|ETIMEDOUT|ENOTFOUND|EHOSTUNREACH|Greeting never received|Connection timeout/i, 'Sunucuya bağlanılamadı: sunucu adı/port yanlış olabilir ya da sunucunun güvenlik duvarı giden 587/465 portlarını engelliyor olabilir.'],
  [/wrong version number|SSL routines/i, 'Güvenlik ayarı port ile uyuşmuyor: 587 için STARTTLS, 465 için SSL/TLS seçin.'],
]

export function explainEmailError(message: string): string | null {
  for (const [re, hint] of HINTS) if (re.test(message)) return hint
  return null
}
