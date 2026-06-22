import { Stethoscope, Award, Users, Baby } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';

export default function Hero() {
  const rContent = useReveal();
  const rImage = useReveal();
  const rBadges = useReveal();

  return (
    <section id="hero" className="hero">
      <video
        className="hero__video-bg"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero.jpeg"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay"></div>
      <div className="container hero__inner">
        <div ref={rContent} className="hero__content reveal-right">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Zonguldak'ın Güvenilir Çocuk Doktoru
          </div>
          <h1 className="hero__title">
            Çocuğunuzun <span className="text-gradient">Sağlığı</span>,<br />
            Bizim <span className="text-gradient">Önceliğimiz</span>
          </h1>
          <p className="hero__subtitle">
            Sevgi, güven ve güncel tıp yaklaşımlarıyla çocuklarınızın yanındayız. Her muayene, her kontrol, her an — çocuğunuz için en iyisi.
          </p>
          <div className="hero__buttons">
            <a href="#randevu" className="btn btn--primary btn--lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Randevu Al
            </a>
            <a href="tel:+908508118176" className="btn btn--outline btn--lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Bizi Arayın
            </a>
          </div>
        </div>

        <div ref={rImage} className="hero__image reveal-left">
          <div className="hero__image-wrapper">
            <img src="/assets/hero.jpeg" alt="Prof. Dr. İbrahim Etem Pişkin" loading="eager" style={{ width: '100%', height: 'auto', borderRadius: '20px', border: '6px solid rgba(255,255,255,0.9)', boxShadow: '0 30px 60px rgba(15,23,42,0.28)' }} />
            <div className="hero__image-glow"></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div ref={rBadges} className="hero__badges reveal-up">
          <div className="trust-badge">
            <div className="trust-badge__icon" style={{ color: 'var(--primary)', display: 'flex' }}><Stethoscope size={30} strokeWidth={1.75} /></div>
            <div className="trust-badge__text"><strong>Profesör Doktor</strong><span>Çocuk Sağlığı Uzmanı</span></div>
          </div>
          <div className="trust-badge">
            <div className="trust-badge__icon" style={{ color: 'var(--primary)', display: 'flex' }}><Award size={30} strokeWidth={1.75} /></div>
            <div className="trust-badge__text"><strong>25+ Yıl</strong><span>Mesleki Deneyim</span></div>
          </div>
          <div className="trust-badge">
            <div className="trust-badge__icon" style={{ color: 'var(--primary)', display: 'flex' }}><Users size={30} strokeWidth={1.75} /></div>
            <div className="trust-badge__text"><strong>Binlerce</strong><span>Mutlu Aile</span></div>
          </div>
          <div className="trust-badge">
            <div className="trust-badge__icon" style={{ color: 'var(--primary)', display: 'flex' }}><Baby size={30} strokeWidth={1.75} /></div>
            <div className="trust-badge__text"><strong>Çocuk Dostu</strong><span>Muayenehane</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
