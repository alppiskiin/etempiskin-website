import { useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import { supabase } from '../lib/supabase.js';
import { sendAppointmentEmail } from '../lib/emailjs.js';

const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

function nextDays(count = 14) {
  const days = [];
  const dn = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const mn = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
  const today = new Date();
  for (let i = 1; days.length < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({
      iso,
      label: `${dn[d.getDay()]}, ${d.getDate()} ${mn[d.getMonth()]}`,
      isSaturday: d.getDay() === 6
    });
  }
  return days;
}

export default function Booking() {
  const rInner = useReveal();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ date: '', time: '', parentName: '', childName: '', phone: '', reason: '', company: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const days = nextDays();

  const selectedDay = days.find((d) => d.iso === data.date);
  const availableTimes = selectedDay?.isSaturday ? TIMES.filter((t) => t < '13:30') : TIMES;

  const next = () => {
    if (step === 1 && (!data.date || !data.time)) return;
    setStep(step + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!data.parentName.trim() || !data.childName.trim() || !data.phone.trim()) return;
    if (data.company) { setSubmitted(true); return; }

    setSubmitting(true);
    setError(null);
    try {
      if (supabase) {
        const { error: dbErr } = await supabase.from('appointments').insert([{
          parent_name: data.parentName,
          child_name: data.childName,
          phone: data.phone,
          appointment_date: data.date,
          appointment_time: data.time,
          reason: data.reason,
          status: 'pending'
        }]);
        if (dbErr) throw dbErr;
      }
      await sendAppointmentEmail({
        parentName: data.parentName,
        childName: data.childName,
        phone: data.phone,
        date: data.date,
        time: data.time,
        reason: data.reason
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Bir hata oluştu, lütfen tekrar deneyin veya bizi doğrudan arayın: 0538 785 08 78');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setData({ date: '', time: '', parentName: '', childName: '', phone: '', reason: '', company: '' });
    setSubmitted(false);
    setError(null);
  };

  return (
    <section id="randevu" className="booking-section">
      <div className="container">
        <div ref={rInner} className="booking-inner reveal-up">
          <div>
            <span className="section-tag" style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}>Online Randevu Sistemi</span>
            <h2 className="section-title booking-title">Hemen Randevu Oluşturun</h2>
            <p className="booking-desc">
              Doktorsitesi benzeri randevu sistemimizle beklemeden randevunuzu oluşturun. Talebiniz doktorumuza ulaştığında size geri dönüş sağlanarak randevunuz kesinleştirilecektir.
            </p>
            <div className="booking-features">
              <div className="feature"><span>📅</span><span>Esnek tarih ve saat seçimi</span></div>
              <div className="feature"><span>📞</span><span>Hızlı geri dönüş</span></div>
              <div className="feature"><span>🔒</span><span>Bilgileriniz güvende (KVKK)</span></div>
              <div className="feature"><span>👨‍⚕️</span><span>Doğrudan doktorumuza ulaşır</span></div>
            </div>
          </div>

          <div className="booking-form-card">
            {submitted ? (
              <div className="booking-success">
                <div className="success-icon">✓</div>
                <h3 className="section-title" style={{ fontSize: '1.4rem' }}>Randevu Talebiniz Alındı!</h3>
                <p>Sayın <strong>{data.parentName}</strong>, randevu talebiniz başarıyla iletildi.</p>
                <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
                  <strong>{selectedDay?.label}</strong> günü saat <strong>{data.time}</strong> için talebiniz değerlendirilecek ve size geri dönüş yapılacaktır.
                </p>
                <button className="btn btn--outline booking-reset-btn" onClick={reset}>Yeni Randevu Al</button>
              </div>
            ) : (
              <>
                <div className="booking-steps">
                  <div className={`step ${step === 1 ? 'active' : ''}`}>1. Tarih & Saat</div>
                  <div className={`step ${step === 2 ? 'active' : ''}`}>2. Bilgileriniz</div>
                </div>

                {step === 1 && (
                  <div>
                    <h4 className="booking-time-title">Tarih Seçin</h4>
                    <div className="date-selector">
                      {days.map((d) => (
                        <button key={d.iso} type="button" className={`date-btn ${data.date === d.iso ? 'selected' : ''}`} onClick={() => setData({ ...data, date: d.iso, time: '' })}>
                          {d.label}{d.isSaturday && <span className="booking-saturday-note">(yarım gün)</span>}
                        </button>
                      ))}
                    </div>

                    {data.date && (
                      <>
                        <h4 className="booking-time-title">Saat Seçin</h4>
                        <div className="time-selector">
                          {availableTimes.map((t) => (
                            <button key={t} type="button" className={`time-btn ${data.time === t ? 'selected' : ''}`} onClick={() => setData({ ...data, time: t })}>{t}</button>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="booking-next-wrapper">
                      <button className="btn btn--primary" disabled={!data.date || !data.time} onClick={next}>Devam Et →</button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={submit}>
                    {error && <div className="contact-alert contact-alert--error">❌ {error}</div>}
                    <div className="form-group">
                      <label>Veli Adı Soyadı *</label>
                      <input type="text" value={data.parentName} onChange={(e) => setData({ ...data, parentName: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Çocuğun Adı Soyadı *</label>
                      <input type="text" value={data.childName} onChange={(e) => setData({ ...data, childName: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Telefon Numaranız *</label>
                      <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="05XX XXX XX XX" required />
                    </div>
                    <div className="form-group">
                      <label>Başvuru Sebebi <span className="optional">(opsiyonel)</span></label>
                      <textarea value={data.reason} onChange={(e) => setData({ ...data, reason: e.target.value })} rows="3" placeholder="Şikayet veya muayene sebebi" />
                    </div>
                    <input type="text" tabIndex="-1" autoComplete="off" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} aria-hidden="true" />
                    <div className="booking-form-actions">
                      <button type="button" className="btn btn--outline" onClick={() => setStep(1)} disabled={submitting}>← Geri</button>
                      <button type="submit" className="btn btn--primary booking-submit-btn" disabled={submitting}>
                        {submitting ? 'Gönderiliyor...' : 'Randevuyu Tamamla'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
