import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const onScroll = () => setVis(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top ${vis ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Yukarı çık"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" /><path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
