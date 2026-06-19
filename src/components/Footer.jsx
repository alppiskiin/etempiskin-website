import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">🩺</span>
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
              <li><a href="#sss">Bilgi Köşesi</a></li>
              <li><a href="#iletisim">İletişim</a></li>
            </ul>
          </div>

          <div className="footer__links">
            <h4>Hizmetlerimiz</h4>
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
            <p>📍 <a href="https://maps.app.goo.gl/ar7Ku4UyF3Zojt2Z9" target="_blank" rel="noopener noreferrer">Zonguldak Merkez</a></p>
            <p>📞 <a href="tel:+908508118176">0850 811 81 76</a></p>
            <p>💬 <a href="https://wa.me/905387850878" target="_blank" rel="noopener noreferrer">0538 785 08 78</a></p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} Prof. Dr. İbrahim Etem Pişkin. Tüm hakları saklıdır. |{' '}
            <Link to="/gizlilik" style={{ color: 'rgba(255,255,255,0.7)' }}>Gizlilik Politikası &amp; KVKK</Link>
          </p>
          <div className="footer__emergency">
            🚨 <strong>Acil durumlarda 112'yi arayın.</strong> Bu site tıbbi acil yardım hizmeti sunmamaktadır.
          </div>
        </div>
      </div>
    </footer>
  );
}
