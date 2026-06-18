import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__logo">
              <span className="footer__logo-icon">👨‍⚕️</span>
              <div>
                <strong>Prof. Dr. İbrahim Etem Pişkin</strong>
                <span>Çocuk Sağlığı ve Hastalıkları Uzmanı</span>
              </div>
            </div>
            <p className="footer__desc">
              Zonguldak'ta çocuklarınız için güvenilir, sıcak ve profesyonel sağlık hizmeti. Her çocuk özeldir, her aile değerlidir.
            </p>
          </div>

          <div className="footer__links">
            <h4>Hızlı Erişim</h4>
            <ul>
              <li><a href="#hero">Ana Sayfa</a></li>
              <li><a href="#hakkimda">Hakkımda</a></li>
              <li><a href="#hizmetler">Hizmetler</a></li>
              <li><a href="#bilgi">Bilgi Köşesi</a></li>
              <li><a href="#iletisim">İletişim</a></li>
              <li><a href="#randevu">Randevu Al</a></li>
            </ul>
          </div>

          <div className="footer__links">
            <h4>Hizmetler</h4>
            <ul>
              <li><a href="#hizmetler">Sağlam Çocuk Takibi</a></li>
              <li><a href="#hizmetler">Aşı Uygulamaları</a></li>
              <li><a href="#hizmetler">Yenidoğan Muayenesi</a></li>
              <li><a href="#hizmetler">Beslenme Danışmanlığı</a></li>
              <li><a href="#hizmetler">Alerji ve Astım</a></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4>İletişim</h4>
            <p>📍 Acılık Caddesi, Kont İşhanı No:11/6<br />Zonguldak Merkez</p>
            <p>📞 <a href="tel:+905387850878">0538 785 08 78</a></p>
            <p>
              <a href="https://wa.me/905387850878?text=Merhaba%2C%20randevu%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">
                💬 WhatsApp'tan bize ulaşın
              </a>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <div>
            © {year} Prof. Dr. İbrahim Etem Pişkin. Tüm hakları saklıdır. |{' '}
            <Link to="/gizlilik">Gizlilik Politikası &amp; KVKK</Link>
          </div>
          <div className="footer__emergency">
            ⚠️ Acil durumlarda 112'yi arayın. Bu site tıbbi acil yardım hizmeti sunmamaktadır.
          </div>
        </div>
      </div>
    </footer>
  );
}
