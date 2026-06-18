import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = ['hero', 'hakkimda', 'hizmetler', 'bilgi', 'iletisim'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location.pathname]);

  const close = () => setOpen(false);
  const onHomePage = location.pathname === '/';
  const link = (id) => (onHomePage ? `#${id}` : `/#${id}`);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo" onClick={close}>
            <img src="/assets/logo-icon.png" alt="Prof. Dr. Etem Pişkin Logo" className="navbar__logo-icon" />
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">Prof. Dr. Etem Pişkin</span>
              <span className="navbar__logo-title">Çocuk Sağlığı ve Hastalıkları Uzmanı</span>
            </div>
          </Link>

          <div className={`navbar__menu ${open ? 'open' : ''}`}>
            <a href={link('hero')} className={`navbar__link ${active === 'hero' ? 'active' : ''}`} onClick={close}>Ana Sayfa</a>
            <a href={link('hakkimda')} className={`navbar__link ${active === 'hakkimda' ? 'active' : ''}`} onClick={close}>Hakkımda</a>
            <a href={link('hizmetler')} className={`navbar__link ${active === 'hizmetler' ? 'active' : ''}`} onClick={close}>Hizmetler</a>
            <a href={link('bilgi')} className={`navbar__link ${active === 'bilgi' ? 'active' : ''}`} onClick={close}>Bilgi Köşesi</a>
            <a href={link('iletisim')} className={`navbar__link ${active === 'iletisim' ? 'active' : ''}`} onClick={close}>İletişim</a>
          </div>

          <div className="navbar__actions">
            <a href="tel:+905387850878" className="btn btn--outline btn--sm navbar__cta-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Bizi Arayın
            </a>
            <a href={link('randevu')} className="btn btn--primary btn--sm navbar__cta">Randevu Al</a>
          </div>

          <button className={`navbar__hamburger ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-label="Menüyü Aç">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`menu-overlay ${open ? 'active' : ''}`} onClick={close}></div>
    </>
  );
}
