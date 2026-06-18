import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Gizlilik Politikası &amp; KVKK | Prof. Dr. İbrahim Etem Pişkin</title>
      </Helmet>
      <Navbar />
      <main className="privacy-page">
        <div className="container">
          <Link to="/" className="privacy-back">← Ana Sayfaya Dön</Link>
          <h1 className="privacy-title">Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
          <p className="privacy-date">Son güncelleme: 2026</p>

          <div className="privacy-content">
            <section>
              <h2>1. Veri Sorumlusu</h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla
                Prof. Dr. İbrahim Etem Pişkin (Acılık Caddesi, Kont İşhanı No:11/6, Zonguldak Merkez) olarak,
                kişisel verilerinizin işlenmesine ilişkin sizleri bilgilendirmek isteriz.
              </p>
            </section>

            <section>
              <h2>2. İşlenen Kişisel Veri Kategorileri</h2>
              <p>
                <strong>Randevu Formu:</strong> Veli adı soyadı, çocuğun adı soyadı, telefon numarası,
                randevu tarihi/saati, başvuru sebebi.
              </p>
              <p><strong>İletişim Formu:</strong> Ad soyad, telefon numarası, mesaj içeriği.</p>
              <p><strong>Yorum Formu:</strong> Ad soyad, puan, yorum metni.</p>
            </section>

            <section>
              <h2>3. Kişisel Verilerin İşlenme Amaçları</h2>
              <ul>
                <li>Randevu taleplerinin alınması ve yönetilmesi</li>
                <li>Hasta ile iletişime geçilmesi ve randevu onayı</li>
                <li>Sorularınıza ve taleplerinize geri dönüş sağlanması</li>
                <li>Sunulan sağlık hizmetinin kalitesinin değerlendirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              </ul>
            </section>

            <section>
              <h2>4. Kişisel Verilerin Aktarılması</h2>
              <p>
                Kişisel verileriniz, randevu bildirim süreçleri kapsamında e-posta hizmet sağlayıcısına (EmailJS)
                ve veritabanı hizmet sağlayıcısına (Supabase) aktarılmaktadır. Bu aktarımlar, hizmetin sunulabilmesi
                için zorunlu olup, verileriniz üçüncü kişilerle pazarlama amacıyla paylaşılmamaktadır.
              </p>
            </section>

            <section>
              <h2>5. Saklama Süresi</h2>
              <p>
                Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal yükümlülükler çerçevesinde
                saklanmaktadır. Randevu bilgileri randevu tarihinden itibaren 1 yıl süreyle, yorum verileri yayında
                kaldığı süre boyunca muhafaza edilir.
              </p>
            </section>

            <section>
              <h2>6. KVKK Kapsamındaki Haklarınız</h2>
              <p>KVKK'nın 11. maddesi gereğince aşağıdaki haklara sahipsiniz:</p>
              <ul>
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Eksik veya yanlış işlenmesi hâlinde düzeltilmesini isteme</li>
                <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>
            </section>

            <section>
              <h2>7. İletişim</h2>
              <p>
                Yukarıdaki haklarınıza ilişkin taleplerinizi <a href="tel:+905387850878">0538 785 08 78</a> numaralı
                telefondan veya Muayenehane Adresi (Acılık Caddesi, Kont İşhanı No:11/6, 67030 Zonguldak Merkez)
                üzerinden iletebilirsiniz.
              </p>
              <p>Bu gizlilik politikası gerektiğinde güncellenebilir. Güncellemeler bu sayfada yayınlanacaktır.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
