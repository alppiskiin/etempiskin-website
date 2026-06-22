import { Stethoscope, Microscope } from 'lucide-react';
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
            <h3 className="specialties__subtitle"><Stethoscope size={22} style={{ verticalAlign: '-4px', marginRight: '8px' }} /> Sık Karşılaştığımız Hastalıklar</h3>
            <div className="diseases-cloud">
              {diseases.map((d, i) => <span className="disease-tag" key={i}>{d}</span>)}
            </div>
          </div>

          <div ref={rProcedures} className="specialties__procedures reveal-left">
            <h3 className="specialties__subtitle"><Microscope size={22} style={{ verticalAlign: '-4px', marginRight: '8px' }} /> Klinikte Uygulanan İşlemler</h3>
            <div className="procedures-grid">
              {procedures.map((p, i) => {
                const Icon = p.icon;
                return (
                <div className="procedure-card" key={i}>
                  <div className="procedure-icon" style={{ color: 'var(--primary-dark)', display: 'flex' }}><Icon size={26} strokeWidth={1.75} /></div>
                  <div>
                    <h4 className="procedure-card__title">{p.title}</h4>
                    <p className="procedure-card__desc">{p.desc}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
