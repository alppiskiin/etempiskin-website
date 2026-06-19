import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import { reviews as defaultReviews } from '../data/reviews.js';
import { supabase } from '../lib/supabase.js';

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', color: '#ffc107', fontSize: '18px' }}>
      {[...Array(5)].map((_, n) => <span key={n}>{n < rating ? '★' : '☆'}</span>)}
    </div>
  );
}

function StarRating({ rating, hoverRating, onRate, onHover, onLeave }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer', fontSize: '2rem' }}>
      {[1, 2, 3, 4, 5].map((a) => (
        <span
          key={a}
          onClick={() => onRate(a)}
          onMouseEnter={() => onHover(a)}
          onMouseLeave={onLeave}
          style={{ color: a <= (hoverRating || rating) ? '#ffc107' : '#e2e8f0', transition: 'color 0.2s' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const maskName = (s) =>
  s
    ? s
        .split(' ')
        .map((w) => (w.length > 0 ? (w.includes('*') ? w : w.charAt(0).toUpperCase() + '***') : w))
        .join(' ')
    : '';

export default function Reviews({ isMarqueeOnly }) {
  const [list, setList] = useState(defaultReviews);
  const [form, setForm] = useState({ author: '', rating: 5, text: '', website: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const rHeader = useReveal();
  const rForm = useReveal();

  useEffect(() => {
    let active = true;
    (async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (!active || !data || data.length === 0) return;
        const mapped = data.map((r) => ({
          ...r,
          date: new Date(r.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
          author: maskName(r.author)
        }));
        setList([...mapped, ...defaultReviews]);
      } catch (err) {
        console.error('Yorumlar çekilirken hata oluştu:', err.message);
      }
    })();
    return () => { active = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) {
      setSuccess('Yorumunuz başarıyla eklendi! Onaylandıktan sonra yayınlanacaktır. Teşekkür ederiz.');
      setForm({ author: '', rating: 5, text: '', website: '' });
      return;
    }
    setSubmitting(true);
    try {
      if (supabase) {
        const { error } = await supabase.from('reviews').insert([{
          author: form.author,
          rating: parseInt(form.rating),
          text: form.text
        }]);
        if (error) throw error;
      }
      setSuccess('Yorumunuz başarıyla eklendi! Onaylandıktan sonra yayınlanacaktır. Teşekkür ederiz.');
      setError('');
      setForm({ author: '', rating: 5, text: '', website: '' });
      setHoverRating(0);
      setTimeout(() => setSuccess(''), 6000);
    } catch (err) {
      console.error('Yorum eklenirken hata:', err.message);
      setError('Yorum eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      setSuccess('');
      setTimeout(() => setError(''), 6000);
    } finally {
      setSubmitting(false);
    }
  };

  if (isMarqueeOnly) {
    const marqueeList = [...list, ...list];
    return (
      <div className="reviews-marquee-container">
        <div className="reviews-marquee">
          {marqueeList.map((r, i) => (
            <div className="review-card marquee-card" key={`${r.id}-${i}`}>
              <div className="review-card__header">
                <div className="review-card__avatar">{r.author.charAt(0)}</div>
                <div>
                  <div className="review-card__author">{r.author}</div>
                  <Stars rating={r.rating} />
                </div>
              </div>
              <p className="review-card__text">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="reviews-section" id="yorumlar">
      <div className="container">
        <div ref={rHeader} className="reviews-header reveal-up">
          <div>
            <span className="section-tag">Değerlendirmeler</span>
            <h2 className="section-title">Hasta Yorumları</h2>
            <div className="reviews-rating-summary">
              <span className="reviews-rating-number">5.0</span>
              <Stars rating={5} />
              <span className="reviews-rating-count">(519+ Değerlendirme)</span>
            </div>
          </div>
        </div>

        <div className="reviews-grid scrollable-reviews">
          {list.map((r) => (
            <div className="review-card" key={r.id}>
              <div className="review-card__header">
                <div className="review-card__avatar">{r.author.charAt(0)}</div>
                <div>
                  <div className="review-card__author">{r.author}</div>
                  <Stars rating={r.rating} />
                </div>
                <div className="review-card__date">{r.date}</div>
              </div>
              <p className="review-card__text">"{r.text}"</p>
            </div>
          ))}
        </div>

        <div ref={rForm} className="reviews-form-wrapper reveal-up">
          <div className="reviews-form-card">
            <h3 className="reviews-form-card__title">Siz de Yorumunuzu Bırakın</h3>
            <p className="reviews-form-card__desc">Deneyiminizi bizimle paylaşın. Yorumlarınız doktorumuz tarafından onaylandıktan sonra yayınlanacaktır.</p>
            {success && <div className="contact-alert contact-alert--success"><span>✅</span> {success}</div>}
            {error && <div className="contact-alert contact-alert--error"><span>❌</span> {error}</div>}
            <form onSubmit={submit}>
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
                <label htmlFor="review-website">Website</label>
                <input type="text" id="review-website" name="website" autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>
              <div className="reviews-form-row">
                <div className="form-group">
                  <label>Adınız Soyadınız (Gizli tutulacaktır)</label>
                  <input type="text" required placeholder="Örn: Ayşe Y." value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Puanınız</label>
                  <StarRating
                    rating={form.rating}
                    hoverRating={hoverRating}
                    onRate={(n) => setForm({ ...form, rating: n })}
                    onHover={setHoverRating}
                    onLeave={() => setHoverRating(0)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Yorumunuz</label>
                <textarea rows="3" required placeholder="Deneyiminizi bizimle paylaşın..." value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
              </div>
              <button type="submit" className="btn btn--primary btn--lg" disabled={submitting}>
                {submitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
