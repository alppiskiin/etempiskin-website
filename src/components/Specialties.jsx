import useReveal from '../hooks/useReveal.js';
import { diseases, procedures } from '../data/services.js';

export default function Specialties() {
  const rHeader = useReveal();
  const rDiseases = useReveal();
  const rProcedures = useReveal();

  return (
    <section id="uzmanliklar" className="specialties">
      <div className="container">
        <div ref={rHeader} className="specialties__header reveal-up">
          <span className="section-tag">Uzmanlık ve İşlemler</span>
          <h2 className="section-title">İlgilendiğimiz Hastalıklar &amp; Klinik İşlemler</h2>
          <p className="section-desc">
            Çocuk sağlığına dair geniş bir yelpazede teşhis, tedavi ve takip hizmeti sunmaktayız. Kliniğimizde uygulanan başlıca işlemler ve tedavi edilen hastalıklar aşağıda yer almaktadır.
          </p>
        </div>

        <div className="specialties__content">
          <div ref={rDiseases} className="specialties__diseases reveal-right">
            <h3 className="specialties__subtitle">🩺 Sık Karşılaştığımız Hastalıklar</h3>
            <div className="diseases-cloud">
              {diseases.map((d, i) => <span className="disease-tag" key={i}>{d}</span>)}
            </div>
          </div>

          <div ref={rProcedures} className="specialties__procedures reveal-left">
            <h3 className="specialties__subtitle">🔬 Klinikte Uygulanan İşlemler</h3>
            <div className="procedures-grid">
              {procedures.map((p, i) => (
                <div className="procedure-card" key={i}>
                  <div className="procedure-icon">{p.icon}</div>
                  <div>
                    <h4 className="procedure-card__title">{p.title}</h4>
                    <p className="procedure-card__desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
