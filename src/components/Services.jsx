import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import { services } from '../data/services.js';

function ServiceIcon({ paths, circles }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => <path key={i} d={d} />)}
      {(circles || []).map((c, i) => <circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} />)}
    </svg>
  );
}

export default function Services() {
  const rHeader = useReveal();
  const rGrid = useReveal();
  const rBanner = useReveal();
  const [open, setOpen] = useState(null);

  useEffect(() => {
    document.body.style.overflow = open !== null ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  return (
    <section id="hizmetler" className="services">
      <div className="container">
        <div ref={rHeader} className="services__header reveal-up">
          <span className="section-tag">Hizmetlerimiz</span>
          <h2 className="section-title">Çocuğunuz İçin Kapsamlı Sağlık Hizmetleri</h2>
          <p className="section-desc">Bebeğinizin ilk günlerinden büyüme çağına kadar, her aşamada yanınızdayız.</p>
        </div>

        <div ref={rGrid} className="services__grid reveal-up">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-card__icon"><ServiceIcon paths={s.iconPaths} circles={s.iconCircles} /></div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <button className="btn btn--outline btn--sm" onClick={() => setOpen(i)}>Detaylı Bilgi →</button>
            </div>
          ))}
        </div>

        <div ref={rBanner} className="services__image-banner reveal-up">
          <img src="/assets/services.jpeg" alt="Çocuklarla İletişim" loading="lazy" />
        </div>
      </div>

      <div className={`modal-overlay ${open !== null ? 'active' : ''}`} onClick={() => setOpen(null)}>
        {open !== null && (
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(null)} aria-label="Kapat">✕</button>
            <div className="modal-icon"><ServiceIcon paths={services[open].iconPaths} circles={services[open].iconCircles} /></div>
            <h3 className="modal-title">{services[open].title}</h3>
            <div className="modal-body"><p>{services[open].details}</p></div>
          </div>
        )}
      </div>
    </section>
  );
}
