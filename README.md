# Güven Galvano Kimyasalları — Kurumsal Web Sitesi

Payload CMS 3 + Next.js 16 + PostgreSQL. Türkçe / İngilizce. Tüm içerik `/admin` panelinden yönetilir.

---

## 1. İçerik yöneticileri için kılavuz

Panel: **`https://<alan-adı>/admin`** — e-posta ve parola ile giriş yapılır.
Sağ üstteki **dil seçicisiyle** (Türkçe / English) her içeriğin iki dildeki metni ayrı ayrı girilir.
İngilizce alan boş bırakılırsa sitede Türkçesi gösterilir.

| Yapmak istediğiniz | Paneldeki yer |
|---|---|
| Yeni ürün eklemek / düzenlemek / gizlemek | **Ürünler → Ürünler** (“Sitede göster” kutusu ile gizlenir, silinmez) |
| Ürün görselleri | Ürün → **Görseller** sekmesi (ana görsel + galeri) |
| Teknik özellik, ambalaj, menşe | Ürün → **Özellikler** sekmesi |
| CAS numarası, kimyasal formül, proses | Ürün → **Genel** sekmesi (formüldeki rakamlar otomatik alt simge olur: H2SO4 → H₂SO₄) |
| Proses / kaplama tipi listesi (katalog filtresi) | **Ürünler → Proses / Kaplama Tipleri** |
| Kategori eklemek / sıralamak | **Ürünler → Ürün Kategorileri** (“Sıralama” küçükten büyüğe) |
| Çalıştığımız firmalar (logo, kart fotoğrafı, ülke, tedarikçi/müşteri) | **İçerik → Çalıştığımız Firmalar** — *Logo*: şeffaf PNG/SVG; *Kart görseli*: isteğe bağlı fotoğraf (varsa logo kartın üstünde plakada görünür); beyaz logolar için *Logo zemini → Koyu* |
| Tüm görseller / videolar | **İçerik → Medya Kütüphanesi** (odak noktası seçilebilir) |
| Ana sayfa slaytları, harita rotaları, rakamlar | **Sayfalar → Ana Sayfa** |
| Ana sayfa bölümlerinin sırası / gizlenmesi | **Sayfalar → Ana Sayfa → Bölümler → Bölüm sırası** (satırları tutamaçtan sürükleyin; “Göster” işaretiyle gizleyin) |
| Hakkımızda metinleri, zaman çizelgesi, drone galerisi | **Sayfalar → Hakkımızda** |
| Diğer sayfa başlıkları ve kapak görselleri | **Sayfalar → …** |
| Site adı, logo (açık / koyu zemin) | **Ayarlar → Site Ayarları → Genel** |
| Adres, telefon, e-posta, sosyal medya | **Ayarlar → Site Ayarları → İletişim** |
| WhatsApp numarası ve hazır mesaj | **Ayarlar → Site Ayarları → WhatsApp** (boşsa buton gizlenir; “Belge İste” iletişim formuna gider) |
| Katalog sayfası başlığı / açıklaması | **Sayfalar → Ürünlerimiz Sayfası → Katalog** |
| **Teklif / iletişim maillerinin gideceği adresler** | **Ayarlar → Site Ayarları → Teklif E-postaları** |

| Ana sayfada öne çıkan ürünler | Ürün → sağ panelde **“Öne çıkan ürün”** (en fazla 8 gösterilir) |
| KVKK / gizlilik metni | **Sayfalar → KVKK / Gizlilik** (hukuk danışmanının onayladığı metin girilmeli) |
| Yanlış bir değişikliği geri almak | Kaydın üstündeki **Sürümler** sekmesi → eski sürümü seç → **Geri yükle** (son 25 değişiklik) |
| Yeni kullanıcı / rol | **Sistem → Kullanıcılar** (yalnızca Yönetici) |

**Roller**
- **Yönetici:** her şey; kullanıcı ekler/siler, teklif e-postalarını değiştirir.
- **Editör:** ürün, kategori, firma, medya ve sayfa içeriklerini düzenler; kullanıcıları göremez, teklif alıcılarını değiştiremez, kendi rolünü yükseltemez.

**İpuçları**
- Yüklenebilecek en büyük dosya **300 MB**’tır (`MAX_UPLOAD_MB`). Video dosyaları gerçek MP4/WebM olmalıdır; bozuk dosyalar reddedilir.
- Görseller en az **2400 px** genişliğinde yüklenmeli (hero/slayt). Sistem küçük boyutları otomatik üretir.
- Slayt veya “tam genişlik bant” alanına **mp4 video** (drone çekimi) eklenebilir; varsa görselin yerine oynar.
- Ana sayfa haritasındaki rota koordinatları: Google Haritalar’da şehre sağ tıklayıp çıkan sayıları kopyalayın (ilk sayı enlem, ikinci boylam).
- TDS / MSDS dosyaları sitede **barındırılmaz**; ürünlerdeki “Belge İste” bağlantısı ürün adı ve CAS’ı içeren hazır mesajla WhatsApp’ı (yoksa iletişim formunu) açar.
- Katalog adresleri paylaşılabilir: `/tr/urunler/katalog?grup=metal-tuzlari&proses=nikel-kaplama`
- Teklif talepleri **panelde saklanmaz**; doğrudan tanımlı mail grubuna gider (yanıtla → müşteriye döner).

---

**E-posta gönderimi (yalnızca Yönetici) — Ayarlar → E-posta Gönderimi**

Teklif, iletişim ve “şifremi unuttum” e-postaları buradaki yöntemle gönderilir. Kaydettikten sonra sayfanın altındaki **“Test e-postası gönder”** ile doğrulayın; hata olursa sağlayıcının mesajı ve **Türkçe çözüm önerisi** gösterilir.

> Güncel durum (Ekim 2026): Google Workspace’te kullanıcı adı + şifre ile SMTP **Mayıs 2025’te kapandı** (yalnız OAuth veya uygulama şifresi). Microsoft 365’te şifreyle SMTP (Basic auth) **Aralık 2026 sonunda varsayılan olarak kapanıyor** (MC786329). Kalıcı çözüm: aşağıdaki OAuth bağlantıları.

| Yöntem | Ne zaman | Gerekenler |
|---|---|---|
| Sunucu varsayılanı (.env) | Kurulum / geliştirme | Sunucudaki `SMTP_*` değişkenleri |
| SMTP | Hosting e-postası, kişisel Gmail (uygulama şifresi), Yandex | Hazır ayar → kullanıcı adı + şifre/uygulama şifresi |
| **Microsoft 365 bağlantısı** | Firma Microsoft 365 kullanıyorsa | Entra uygulaması: kiracı + istemci kimliği, gizli dizi, gönderen posta kutusu |
| **Google Workspace bağlantısı** | Firma Google Workspace kullanıyorsa | Servis hesabı JSON anahtarı + alan geneli yetki (`gmail.send`), gönderen posta kutusu |

Microsoft 365 bağlantısı (Graph API, bir kez):
1. Entra yönetim merkezi → **Uygulama kayıtları → Yeni kayıt**.
2. **Sertifikalar ve gizli diziler → Yeni istemci gizli dizisi** → **Değer**’i kopyalayın (en fazla 24 ay; süresi dolmadan yenileyin — dolarsa test `AADSTS7000222` verir).
3. Gönderme izni — **önerilen, yalnızca tek posta kutusu (RBAC for Applications):** Entra’da `Mail.Send` *eklemeyin*; Exchange Online PowerShell’de:
   ```powershell
   Connect-ExchangeOnline
   New-ServicePrincipal -AppId <Uygulama kimliği> -ObjectId <Kurumsal uygulamalar → Nesne kimliği> -DisplayName "Web Sitesi"
   New-ManagementScope -Name "WebSitesiPostaKutusu" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'web@firma.com'"
   New-ManagementRoleAssignment -App <Nesne kimliği> -Role "Application Mail.Send" -CustomResourceScope "WebSitesiPostaKutusu"
   Test-ServicePrincipalAuthorization -Identity <Nesne kimliği> -Resource web@firma.com
   ```
   (Eski *Application Access Policy* yönteminin yerini bu almıştır; izinler 30 dk–2 saatte etkinleşir.)
   **Basit (tüm posta kutuları):** API izinleri → Microsoft Graph → Uygulama izinleri → `Mail.Send` → Yönetici onayı ver.
4. Panelde kiracı kimliği (GUID veya `firma.onmicrosoft.com`, `common` değil), istemci kimliği, gizli dizi değeri ve gönderen posta kutusunu girip test edin.

Google Workspace bağlantısı (Gmail API, bir kez):
1. console.cloud.google.com → proje → **Gmail API**’yi etkinleştirin.
2. **IAM ve Yönetici → Servis hesapları** → oluştur → **Anahtarlar → JSON** indirin. (Mayıs 2024 sonrası kurulan kuruluşlarda `iam.disableServiceAccountKeyCreation` politikası varsayılan açıktır; bu proje için kapatılmalıdır.)
3. JSON içeriğini panele yapıştırıp kaydedin; panelde **İstemci kimliği** görünür.
4. admin.google.com → **Güvenlik → API denetimleri → Alan geneli yetki → Yeni ekle**: bu istemci kimliği + yalnızca `https://www.googleapis.com/auth/gmail.send` (birkaç dakika–24 saat).
5. Gönderen posta kutusunu girip test edin. (SMTP’nin aksine tam posta erişimi değil, yalnızca gönderme yetkisi istenir.)

Şifre ve gizli diziler veritabanında AES-256-GCM ile şifreli saklanır, panele/API’ye geri gönderilmez; değiştirmek için yenisini yazmak, silmek için “Kayıtlı değeri sil” yeterlidir.

**SEO**

| İş | Panelde |
|---|---|
| Sayfa/ürün/kategori için Google başlığı, açıklaması, paylaşım görseli | İlgili kaydın **SEO** sekmesi (“Otomatik oluştur” + Google önizlemesi; TR/EN ayrı) |
| Eksikleri bulmak | Sol menü → **SEO Kontrol** (hata/uyarı/bilgi listesi, her satırda “Düzenle”) |
| Eski web sitesi adreslerini yeni sayfalara bağlamak | **SEO → Yönlendirmeler** (tam adres yapıştırılabilir; ≤1 dk’da etkin) |

Otomatik yapılanlar:
- Ürün / kategori / proses **adresi (URL kısa adı) değişince** eski adres kaydın “Eski adresler” listesine eklenir ve kalıcı yönlendirilir (Google’daki, paylaşılmış, WhatsApp’ta gönderilmiş ve ziyaretçi sepetindeki bağlantılar kopmaz).
- Site içi tüm bağlantılar veritabanındaki güncel adresten üretilir; adres değişince elle güncellenecek bağlantı yoktur.
- Her sayfada kanonik adres, TR/EN `hreflang`, Open Graph/Twitter kartı; ürünlerde `Product` + `BreadcrumbList`, tüm sitede `Organization` yapısal verisi.
- `/sitemap.xml`: sayfalar, kategori sayfaları (`/urunler/katalog?grup=…`) ve aktif ürünler. Arama, proses filtresi ve 2+ sayfalar `noindex`.

Panelden değiştirilemeyen (kodda sabit) yerler:
- Sayfa adres yolları (`/hakkimizda`, `/urunler`, `/firmalar`, `/iletisim`, `/teklif-sepeti`, `/kvkk`) — İngilizce sayfalar da Türkçe yolu kullanır.
- Menü, buton ve form etiketleri (`src/lib/i18n.ts`), e-posta şablonunun başlık bandı (`src/lib/forms.ts`), `robots.txt` kuralları (`src/app/robots.ts`).
- Yayında `.env` → `NEXT_PUBLIC_SERVER_URL` gerçek alan adı olmalıdır; kanonik adresler ve sitemap bunu kullanır (SEO Kontrol uyarır).

## 2. Geliştirici kurulumu (yerel)

Gereksinimler: Node 22+, Docker Desktop.

```bash
cp .env.example .env            # değerleri doldurun (PAYLOAD_SECRET: uzun rastgele değer)
npm install
npm run dev:services            # PostgreSQL (5433) + Mailpit (8025)
npm run seed                    # örnek içerik + admin hesabı (SEED_ADMIN_* değişkenleri)
npm run dev                     # http://localhost:3000  ·  panel: /admin
```

- Gönderilen e-postalar yerelde **Mailpit**’te görünür: http://localhost:8025
- Örnek içeriği sıfırdan yüklemek: `npm run seed -- --reset`
- Tekil güncellemeler: `npm run media:stock` (stok fotoğraflar), `npm run media:real` (assets/real altındaki gerçek ürün/depo fotoğrafları; `node scripts/real-photos.cjs "<klasör>"` ile hazırlanır), `npm run brand:apply` (logolar), `npm run privacy:apply` (KVKK şablonu), `npm run catalog:apply` (prosesler, CAS/formül, WhatsApp), `npm run partners:apply` (örnek firma logoları)
- SEO: `/sitemap.xml` ve `/robots.txt` otomatik üretilir (`NEXT_PUBLIC_SERVER_URL` canlı alan adı olmalı)
- İçerik modeli değişince: `npm run generate:types` (ve admin bileşeni eklendiyse `npm run generate:importmap`)

### Klasör yapısı
```
src/
  collections/      Ürünler, Kategoriler, Firmalar, Medya, Kullanıcılar
  globals/          Sayfa içerikleri + Site Ayarları
  app/(frontend)/   Site sayfaları (/[locale]/...) ve form sunucu aksiyonları
  app/(payload)/    Admin paneli ve REST/GraphQL API (otomatik)
  components/       Arayüz bileşenleri (hero haritası, sepet, formlar…)
  lib/              i18n, Payload yardımcıları, form doğrulama
  seed/             Örnek içerik + yer tutucu görsel üreteci
```

### Panel (admin) güvenliği
- **Parola kuralı:** en az 12 karakter, küçük/büyük harf, rakam, sembolden en az 3’ü; “galvano”, “admin”, “123456” gibi tahmin edilebilir kelimeler ve e-posta adı yasak. Yeni kullanıcı, parola değişikliği, şifre sıfırlama ve ilk kurulumda uygulanır.
- **Kaba kuvvet koruması:** hesap başına 5 hatalı denemede 15 dk kilit + IP başına 15 dk’da 10 giriş, saatte 5 şifre sıfırlama isteği (aşılınca 429).
- **Oturum:** 4 saat, sunucu tarafında tutulur (çıkışta iptal). Belirteç yanıt gövdesine yazılmaz, yalnızca `HttpOnly; SameSite=Lax` (yayında `Secure`) çerezde taşınır.
- **CSRF/CORS:** çerezle yapılan istekler yalnızca `NEXT_PUBLIC_SERVER_URL` kökeninden kabul edilir.
- GraphQL kapalı; güvenlik başlıkları (HSTS, X-Frame-Options, nosniff, Referrer/Permissions-Policy), `X-Powered-By` gizli; `/admin` arama motorlarına kapalı; yüklenen dosyalar `sandbox` CSP ile sunulur (SVG içindeki betikler çalışmaz).
- Şifre sıfırlama, kayıtlı olmayan e-postayı belli etmez; bağlantı 30 dk geçerlidir.

**Yayına alırken (sunucu):**
- Uygulama portu (3000) internete açılmamalı; yalnızca nginx üzerinden erişilmeli ve nginx `proxy_set_header X-Real-IP $remote_addr;` göndermeli (IP sınırları buna güvenir).
- `NEXT_PUBLIC_SERVER_URL=https://gercek-alan-adi` olmalı (CSRF, çerez `Secure`, kanonik adresler).
- İlk kurulumdan sonra `.env`’den `SEED_ADMIN_PASSWORD` silinmeli ve yönetici parolası panelden değiştirilmeli.
- Birden fazla uygulama sunucusu çalıştırılacaksa IP sayaçları (bellek içi) Redis gibi ortak bir depoya taşınmalı.

### Güvenlik notları
- Formlar: sunucu tarafı zod doğrulaması, honeypot, IP başına hız sınırı (10 dk / 5 istek), e-posta HTML kaçışı, başlık enjeksiyon koruması.
- Ürün adları maile istemciden değil veritabanından yazılır.
- `site-settings` global’i (alıcı adresleri) dış API’ye kapalıdır.
- Admin: 5 hatalı denemede 10 dk kilit.

## 3. Sunucuya kurulum (Docker)
Site, sunucuda iki konteynerle çalışır: `web` (site + panel) ve `db` (PostgreSQL). Adres: **https://ch5.chainasc.com**, yerel port: **5081** (5080 portal tarafından kullanılıyor).

**1) Yerelde içeriği paketleyin** (ürünler, sayfalar, ayarlar ve yüklenen görseller):
```bash
bash scripts/export-content.sh
```
`deploy-data/content.sql` ve `deploy-data/media.tar.gz` oluşur. Bu dosyalar git'e girmez (kullanıcı ve ayar bilgisi içerir); sunucuya scp vb. ile kopyalayın.

**2) Sunucuda projeyi alın ve ayarları yazın:**
```bash
git clone https://github.com/SamettTaslak/guven-galvano-web.git && cd guven-galvano-web
cp .env.production.example .env   # PAYLOAD_SECRET (yereldeki ile aynı) ve POSTGRES_PASSWORD yazın
```

**3) Derleyip başlatın** — ilk açılışta tablolar migration ile otomatik kurulur:
```bash
docker compose up -d --build
docker compose logs -f web
```

**4) İçeriği yükleyin** (`deploy-data/` klasörü proje klasöründe olmalı; mevcut içeriğin yerine geçer):
```bash
bash scripts/import-content.sh
```

**5) Nginx** — ch5.chainasc.com için sunucu bloğu (sertifika mevcut düzene göre, ör. certbot):
```nginx
server {
    server_name ch5.chainasc.com;
    client_max_body_size 300m;          # MAX_UPLOAD_MB ile aynı
    location / {
        proxy_pass http://127.0.0.1:5081;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;   # giriş denemesi sınırı gerçek IP'yi buradan okur
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 300s;
    }
    listen 443 ssl;   # + ssl_certificate satırları
}
```

**Güncelleme:** `git pull && docker compose up -d --build` (yeni migration'lar açılışta uygulanır). Kod tarafında şema değişirse yerelde `npx payload migrate:create <ad>` ile migration üretilip commit edilmelidir.

**Yedek:** `docker compose exec -T db pg_dump -U galvano galvano > yedek.sql` ve medya birimi (`galvano-site_media`).
