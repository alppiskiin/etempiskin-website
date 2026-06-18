# Prof. Dr. İbrahim Etem Pişkin — Web Sitesi

Çocuk sağlığı ve hastalıkları uzmanı tanıtım web sitesi. React + Vite + Supabase + EmailJS.

## Backend Bağlantıları

Bu site iki dış servisi kullanır:

- **Supabase** — randevu ve yorum veritabanı (`pwwlkgfrsjjazfnewuqi.supabase.co`)
- **EmailJS** — randevu/iletişim formlarından doktora e-posta gönderimi (servis `service_mfhbp03`)

API anahtarları `.env` veya Netlify ortam değişkenleri (Environment Variables) üzerinden ayarlanır. Örnek için `.env.example`.

## Netlify Deploy (GitHub üzerinden, Node.js'siz)

1. Bu repoyu GitHub'a push et.
2. https://app.netlify.com → **Add new site → Import an existing project**
3. GitHub'ı bağla, bu repoyu seç.
4. Build settings otomatik gelir (`netlify.toml`'dan):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Site settings → Environment variables**'a şunları ekle:
   - `VITE_SUPABASE_URL` = `https://pwwlkgfrsjjazfnewuqi.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `sb_publishable_iQfHKL6qGaz2xoScFkpxAQ_sXXd3Jaw`
   - `VITE_EMAILJS_SERVICE_ID` = `service_mfhbp03`
   - `VITE_EMAILJS_TEMPLATE_ID` = `template_l8bua86`
   - `VITE_EMAILJS_PUBLIC_KEY` = `jglDdjXpkUqUapbrW`
6. Sonra **Deploys → Trigger deploy → Deploy site**.

Netlify kendi sunucusunda `npm install` ve `npm run build` çalıştırır. Senin bilgisayarına Node.js gerekmez.

## Custom Domain Ekleme

1. Netlify → **Domain settings → Add custom domain**.
2. Domain'ini gir (örn. `eteminpiskin.com`).
3. Netlify sana DNS kayıtları verir — domain sağlayıcının panelinden bunları ekle.
4. SSL otomatik olarak aktif olur (Let's Encrypt).

## Lokal Geliştirme (Node.js gerekli)

```bash
cp .env.example .env
npm install
npm run dev
```

`http://localhost:5173` adresinde açılır.

## İçerik Düzenleme

- **Bölüm metinleri**: `src/components/` altında her bölüm için bir dosya
- **Hizmetler**: `src/data/services.js`
- **Yorumlar (varsayılan)**: `src/data/reviews.js` (canlı yorumlar Supabase'den gelir)
- **SSS**: `src/components/FAQ.jsx`
- **KVKK metni**: `src/pages/Privacy.jsx`
- **Görseller**: `public/assets/`
- **Renkler/fontlar**: `src/styles.css` dosyasındaki `:root` değişkenleri
