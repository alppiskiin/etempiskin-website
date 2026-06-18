import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import { reviews as defaultReviews } from '../data/reviews.js';
import { supabase } from '../lib/supabase.js';

function Stars({ n }) {
  return <div style={{ color: '#f1c40f', letterSpacing: '2px' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</div>;
}

function ReviewCard({ r, marquee }) {
  const initial = (r.author || '?').trim().charAt(0);
  return (
    <div className={`review-card ${marquee ? 'marquee-card' : ''}`}>
      <div className="review-card__header">
        <div className="review-card__avatar">{initial}</div>
        <div>
          <div className="review-card__author">{r.author}</div>
          <Stars n={r.rating} />
        </div>
        <span className="review-card__date">{r.date}</span>
      </div>
      <p className="review-card__text">"{r.text}"</p>
    </div>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return ''; }
}

export default function Reviews() {
  const [list, setList] = useState(defaultReviews);
  const [form, setForm] = useState({ author: '', rating: 5, text: '' });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const rHeader = useReveal();
  const rGrid = useReveal();
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
          id: r.id,
          author: r.author,
          rating: r.rating,
          date: formatDate(r.created_at),
          text: r.text
        }));
        setList([...mapped, ...defaultReviews]);
      } catch (err) {
        console.error('Yorumlar çekilirken hata oluştu:', err);
      }
    })();
    return () => { active = false; };
  }, []);

  const avg = (list.reduce((s, r) => s + r.rating, 0) / list.length).toFixed(1);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) {
      setStatus({ ok: false, msg: 'Lütfen tüm alanları doldurun.' });
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
      setStatus({ ok: true, msg: 'Yorumunuz başarıyla eklendi! Onaylandıktan sonra yayınlanacaktır. Teşekkür ederiz.' });
      setForm({ author: '', rating: 5, text: '' });
      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      console.error('Yorum eklenirken hata:', err);
      setStatus({ ok: false, msg: 'Yorum eklenirken bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setSubmitting(false);
    }
  };

  const marqueeList = [...list, ...list];

  return (
    <>
      <div className="reviews-marquee-container">
        <div className="reviews-marquee">
          {marqueeList.map((r, i) => <ReviewCard r={r} marquee key={i} />)}
        </div>
      </div>

      <section className="reviews-section">
        <div className="container">
          <div ref={rHeader} className="reviews-header reveal-up">
            <div>
              <span className="section-tag">Yorumlar</span>
              <h2 className="section-title">Hasta Yorumları</h2>
            </div>
            <div className="reviews-rating-summary">
              <Stars n={5} />
              <span className="reviews-rating-number">{avg}</span>
              <span className="reviews-rating-count">({list.length} değerlendirme)</span>
            </div>
          </div>

          <div ref={rGrid} className="reviews-grid scrollable-reviews">
            {list.map((r, i) => <ReviewCard r={r} key={i} />)}
          </div>

          <div ref={rForm} className="reviews-form-wrapper reveal-up">
            <div className="reviews-form-card">
              <h3 className="reviews-form-card__title">Siz de Yorumunuzu Bırakın</h3>
              <p className="reviews-form-card__desc">Deneyiminizi bizimle paylaşın. Yorumlarınız doktorumuz tarafından onaylandıktan sonra yayınlanacaktır.</p>
              {status && (
                <div className={`contact-alert contact-alert--${status.ok ? 'success' : 'error'}`}>{status.msg}</div>
              )}
              <form onSubmit={submit}>
                <div className="reviews-form-row">
                  <div className="form-group">
                    <label>Adınız Soyadınız</label>
                    <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Ad Soyad" />
                  </div>
                  <div className="form-group">
                    <label>Puanınız</label>
                    <select value={form.rating} onChange={(e) => setForm({ ...form, rating: +e.target.value })}>
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Yorumunuz</label>
                  <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Deneyiminizi paylaşın..." rows="4" />
                </div>
                <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={submitting}>
                  {submitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
