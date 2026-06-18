# Yarın İçin Yapılacaklar (Yeni Bilgisayar)

Bu dosya, projeye yeni bir bilgisayarda devam ederken izlenecek adımları içerir.

## 0. Kod güncel mi? (ÖNEMLİ)

Bu repodaki kod, aşağıdakilerin TAMAMINI içermeli:
- `src/lib/supabase.js` ve `src/lib/emailjs.js` (backend bağlantıları)
- `src/pages/Admin.jsx` ve `src/components/Admin*.jsx` (admin paneli)
- `package.json` içinde `@supabase/supabase-js` ve `@emailjs/browser` bağımlılıkları

Eğer bu dosyalar repoda yoksa, eski bir sürümdür — en güncel kodu yükleyen kişiden al.

## 1. Node.js kurulumu

https://nodejs.org → LTS sürümünü indir ve kur.
Kontrol: terminalde `node -v` ve `npm -v` çalışmalı.

## 2. Projeyi çek ve kur

```bash
git clone <repo-url>
cd <proje-klasoru>
npm install
```

## 3. Ortam değişkenleri (.env)

`.env.example` dosyasını `.env` olarak kopyala (içindeki değerler zaten doğru):

```bash
cp .env.example .env
```

## 4. Lokal test

```bash
npm run dev
```

`http://localhost:5173` açılır. Test edilecekler:
- [ ] Tüm bölümler görünüyor (Hero, Hakkımda, Hizmetler, Uzmanlık, Randevu, Yorumlar, SSS, İletişim)
- [ ] Hizmet kartlarında "Detaylı Bilgi" modalı açılıyor
- [ ] Randevu formu 2 adımlı çalışıyor, gönderince başarı ekranı çıkıyor
- [ ] İletişim formu gönderiliyor
- [ ] Yorum formu gönderiliyor
- [ ] `/admin` → giriş yap → randevuları/yorumları gör, onayla/reddet
- [ ] Mobil görünüm (tarayıcıda F12 → responsive) düzgün

## 5. YAYINDAN ÖNCE — Güvenlik kontrolleri (KRİTİK)

### a) Supabase RLS (Row Level Security) politikaları
Supabase anon key tarayıcıda herkese açıktır. RLS yanlışsa hasta isim/telefonları sızabilir (KVKK ihlali!).
Supabase → Authentication → Policies → şu kurallar olmalı:
- `appointments`: anon **INSERT** yapabilmeli, **SELECT yapamamalı** (sadece giriş yapmış admin okuyabilmeli)
- `reviews`: anon **INSERT** + sadece `is_approved=true` olanları **SELECT** edebilmeli; admin hepsini görüp güncelleyebilmeli
- Test: çıkış yapmışken (gizli sekme) `appointments` okunmaya çalışıldığında boş/engelli dönmeli

### b) Admin şifresini değiştir
`dretem@gmail.com` şifresi bir ara sohbette paylaşıldı. Supabase → Authentication → Users → şifreyi yenile.

### c) Test verilerini temizle
Lokal testte oluşan sahte randevu/yorumları Supabase Table Editor'dan sil.

## 6. Netlify deploy

1. https://app.netlify.com → Add new site → Import from GitHub → bu repo
2. Build ayarları otomatik (`netlify.toml`): build `npm run build`, publish `dist`
3. Site settings → Environment variables → `.env`'deki 5 değişkeni ekle:
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
4. Deploy → Trigger deploy

## 7. Domain bağlama (etempiskin.com)

1. Netlify → Domain settings → Add custom domain → `etempiskin.com`
2. Metunic panelinde domain DNS ayarları → Netlify'ın verdiği kayıtları gir
   (ya nameserver değişimi ya da A/CNAME kayıtları)
3. `etempiskin.com.tr` → Metunic'te "URL Yönlendirme" ile `etempiskin.com`'a yönlendir
4. SSL otomatik aktif olur (15-60 dk)

## 8. Eski Netlify sitesi
`elegant-dolphin-0e7bdb.netlify.app` — yeni site doğrulandıktan sonra kapatılabilir/silinebilir.

## Bilinen eksikler / geliştirme fikirleri (yayın engeli DEĞİL)
- Randevu sisteminde aynı saat çift seçilebiliyor (orijinalde de yoktu) — istenirse dolu saat engellenebilir
- Google Analytics / ziyaretçi takibi eklenebilir
- sitemap.xml / robots.txt eklenebilir (SEO)
- Telefon numarası format doğrulaması eklenebilir
