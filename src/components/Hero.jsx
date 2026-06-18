import useReveal from '../hooks/useReveal.js';

export default function Hero() {
  const rContent = useReveal();
  const rImage = useReveal();
  const rBadges = useReveal();

  return (
    <section id="hero" className="hero">
      <div className="hero__overlay"></div>
      <div className="container hero__inner">
        <div ref={rContent} className="hero__content reveal-right">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Zonguldak'ın Güvenilir Çocuk Doktoru
          </div>
          <h1 className="hero__title">
            Çocuğunuzun <span className="text-gradient">Sağlığı</span> Önceliğimiz
          </h1>
          <p className="hero__subtitle">
            Sevgi, güven ve güncel tıp yaklaşımlarıyla çocuklarınızın yanındayız. Her muayene, her kontrol, her an — çocuğunuz için en iyisi.
          </p>
          <div className="hero__buttons">
            <a href="#randevu" className="btn btn--primary btn--lg">Randevu Al</a>
            <a href="#hakkimda" className="btn btn--outline btn--lg">Hakkımda</a>
          </div>
        </div>

        <div ref={rImage} className="hero__image reveal-left">
          <div className="hero__image-wrapper">
            <div className="hero__image-glow"></div>
            <img src="/assets/hero.jpeg" alt="Prof. Dr. İbrahim Etem Pişkin" />
          </div>
        </div>
      </div>

      <div className="container">
        <div ref={rBadges} className="hero__badges reveal-up">
          <div className="trust-badge">
            <div className="trust-badge__icon">👨‍⚕️</div>
            <div className="trust-badge__text"><strong>Profesör Doktor</strong><span>Çocuk Sağlığı Uzmanı</span></div>
          </div>
          <div className="trust-badge">
            <div className="trust-badge__icon">⏳</div>
            <div className="trust-badge__text"><strong>25+ Yıl</strong><span>Mesleki Deneyim</span></div>
          </div>
          <div className="trust-badge">
            <div className="trust-badge__icon">👶</div>
            <div className="trust-badge__text"><strong>Mutlu Aile</strong><span>Çocuk Dostu</span></div>
          </div>
          <div className="trust-badge">
            <div className="trust-badge__icon">🏥</div>
            <div className="trust-badge__text"><strong>Muayenehane</strong><span>Zonguldak Merkez</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
