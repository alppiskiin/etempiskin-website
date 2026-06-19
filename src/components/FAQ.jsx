import { useState } from 'react';
import useReveal from '../hooks/useReveal.js';

const faqs = [
  {
    q: 'Bebeğimi ilk muayeneye ne zaman getirmeliyim?',
    a: 'Yenidoğan bebeğinizi hastaneden taburcu olduktan sonraki ilk 3-7 gün içinde ilk muayeneye getirmenizi öneririz. Bu ilk kontrol, bebeğinizin genel sağlık durumunu, beslenmesini, sarılık kontrolünü ve doğumsal anomali taramasını kapsar.',
    icon: '👶'
  },
  {
    q: 'Aşı yan etkileri konusunda ne yapmalıyım?',
    a: 'Aşı sonrası hafif ateş, iğne yerinde kızarıklık ve huzursuzluk normal olabilir. Ateş düşürücü kullanabilir ve bol sıvı verebilirsiniz. Ancak 38.5°C üzeri ateş, aşırı ağlama veya döküntü durumunda mutlaka bizi arayın.',
    icon: '💉'
  },
  {
    q: 'Çocuğumun ateşi ne zaman tehlikelidir?',
    a: '3 aydan küçük bebeklerde 38°C ve üzeri ateş acil değerlendirme gerektirir. Daha büyük çocuklarda 39°C üzeri ateş, ateşin 3 günden fazla sürmesi, çocuğun uyuşuk veya aşırı huzursuz olması durumunda mutlaka doktora başvurun.',
    icon: '🌡️'
  },
  {
    q: 'Ek gıdaya ne zaman başlamalıyım?',
    a: 'Dünya Sağlık Örgütü, ilk 6 ay yalnızca anne sütü önermektedir. 6. aydan itibaren, bebeğin gelişim belirtilerine göre ek gıdaya geçişe başlayabilirsiniz. Her bebeğin hazır olma zamanı farklı olabilir.',
    icon: '🍎'
  },
  {
    q: 'Bebeğimin uyku düzeni nasıl olmalı?',
    a: 'Yenidoğanlar günde 16-17 saat uyur ve bu süre yaşla birlikte azalır. Güvenli uyku için bebeğinizi sırt üstü, sert bir yatakta ve yalnız yatırın.',
    icon: '😴'
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const rHeader = useReveal();
  const rList = useReveal();

  return (
    <section className="faq" id="sss">
      <div className="container">
        <div className="faq__inner">
        <div ref={rHeader} className="faq__header reveal-right">
          <span className="section-tag">Sık Sorulan Sorular</span>
          <h2 className="section-title">Ebeveyn Bilgi Köşesi</h2>
          <p className="section-desc">
            Ebeveynlerin en çok merak ettiği soruları sizin için yanıtladık. Aklınıza takılan başka sorular için bize ulaşmaktan çekinmeyin.
          </p>
          <div className="faq__illustration">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" fill="#4A90D9" opacity="0.08" />
              <circle cx="100" cy="100" r="55" fill="#4A90D9" opacity="0.08" />
              <text x="100" y="115" textAnchor="middle" fontSize="64">🤔</text>
            </svg>
          </div>
        </div>

        <div ref={rList} className="faq__list reveal-left">
          {faqs.map((f, i) => (
            <div key={i} className={`accordion ${openIdx === i ? 'active' : ''}`}>
              <button className="accordion__header" aria-expanded={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span className="accordion__icon-left">{f.icon}</span>
                <span className="accordion__title">{f.q}</span>
                <span className="accordion__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
              <div className="accordion__content">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
