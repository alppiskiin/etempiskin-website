import useReveal from '../hooks/useReveal.js';

export default function About() {
  const rImage = useReveal();
  const rContent = useReveal();

  return (
    <section id="hakkimda" className="about">
      <div className="container about__inner">
        <div ref={rImage} className="about__image reveal-right">
          <div className="about__image-card">
            <img src="/assets/about.jpeg" alt="Prof. Dr. İbrahim Etem Pişkin" />
          </div>
          <div className="about__image-decoration"></div>
          <div className="about__exp-card">
            <span className="about__exp-number">25+</span>
            <span className="about__exp-text">Yıl Deneyim</span>
          </div>
        </div>

        <div ref={rContent} className="about__content reveal-left">
          <span className="section-tag">Hakkımda</span>
          <h2 className="section-title">Prof. Dr. İbrahim Etem Pişkin</h2>
          <p className="section-subtitle">Çocuk Sağlığı ve Hastalıkları Uzmanı</p>

          <div className="about__bio">
            <p>
              Profesör Doktor İbrahim Etem Pişkin 1975 yılında Konya'da doğdu. İlk ve Ortaokul eğitimini Karabük ve Rize illerinde tamamladı. Konya Meram Fen Lisesi'nden 1992 yılında mezun olarak Hacettepe Üniversitesi Tıp Fakültesi'ni kazandı ve 1999 yılında mezun oldu.
            </p>
            <p>
              2000-2005 yılları arasında Dr. Sami Ulus Çocuk Sağlığı ve Hastalıkları Eğitim ve Araştırma Hastanesi'nde uzmanlık eğitimini tamamladı. 2005-2006 yıllarında Kastamonu Münif İslamoğlu Devlet Hastanesi'nde Çocuk Hastalıkları Uzmanı olarak çalıştı.
            </p>
            <p>
              2006 yılında Bülent Ecevit Üniversitesi Tıp Fakültesi Çocuk Sağlığı ve Hastalıkları Anabilim Dalı'nda yardımcı doçent olarak göreve başladı. Aynı üniversitede anabilim dalı başkanlığı, etik kurul üyeliği, dönem koordinatör yardımcılığı ve hastane enfeksiyon kontrol komitesi üyeliği görevlerinde bulundu.
            </p>
            <p>
              2010 yılında Harvard Üniversitesi'ne bağlı Children's Hospital Boston Çocuk Yoğun Bakım bölümünde observership olarak görev yaptı. 2014 yılında Doçent oldu ve ardından Profesör unvanını alarak halen Bülent Ecevit Üniversitesi Tıp Fakültesi'nde öğretim üyesi olarak çalışmalarını sürdürmektedir.
            </p>
          </div>

          <div className="about__tags">
            <span className="tag">Türk Pediatri Derneği Üyesi</span>
            <span className="tag">Çocuk Acil ve Yoğun Bakım Derneği Üyesi</span>
            <span className="tag">Türk Tabipleri Birliği Üyesi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
