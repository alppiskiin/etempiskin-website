import { useState } from 'react';
import useReveal from '../hooks/useReveal.js';
import { supabase } from '../lib/supabase.js';
import { sendAppointmentEmail } from '../lib/emailjs.js';

const WEEKDAY_TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:30', '14:00', '15:00', '16:00'];
const SATURDAY_TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'];

function nextDays() {
  const days = [];
  const today = new Date();
  for (let t = 1; t <= 7; t++) {
    const n = new Date();
    n.setDate(today.getDate() + t);
    if (n.getDay() !== 0) {
      days.push({
        dateString: n.toISOString().split('T')[0],
        display: n.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })
      });
    }
  }
  return days;
}

export default function Booking() {
  const rInner = useReveal();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({ date: '', time: '', parentName: '', childName: '', phone: '', reason: '', company: '' });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const isSaturday = data.date ? new Date(data.date).getDay() === 6 : false;
  const availableTimes = isSaturday ? SATURDAY_TIMES : WEEKDAY_TIMES;

  const next = () => {
    if (step === 1 && (!data.date || !data.time)) {
      alert('Lütfen bir tarih ve saat seçin.');
      return;
    }
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (data.company) {
      setSubmitting(false);
      setSubmitted(true);
      return;
    }
    setSubmitting(true);
    try {
      if (supabase) {
        const { error } = await supabase.from('appointments').insert([{
          parent_name: data.parentName,
          child_name: data.childName,
          phone: data.phone,
          appointment_date: data.date,
          appointment_time: data.time,
          reason: data.reason,
          status: 'pending'
        }]);
        if (error) throw error;
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
      alert('Bir hata oluştu, lütfen doğrudan arayın.');
    } finally {
      setSubmitting(false);
    }
  };

  const days = nextDays();

  return (
    <section className="booking-section" id="randevu">
      <div className="container">
        <div ref={rInner} className="booking-inner reveal-up">
          <div className="booking-info">
            <span className="section-tag">Hemen Yer Ayırtın</span>
            <h2 className="section-title booking-title">Online Randevu Sistemi</h2>
            <p className="booking-desc">
              Doktorsitesi benzeri randevu sistemimizle beklemeden randevunuzu oluşturun. Talebiniz doktorumuza ulaştığında size geri dönüş sağlanarak randevunuz kesinleştirilecektir.
            </p>
            <div className="booking-features">
              <div className="feature"><span className="icon">⏱️</span> Hızlı ve Kolay</div>
              <div className="feature"><span className="icon">📱</span> Anında Bildirim</div>
              <div className="feature"><span className="icon">🛡️</span> Güvenli Altyapı</div>
            </div>
          </div>

          <div className="booking-form-card">
            {submitted ? (
              <div className="booking-success">
                <div className="success-icon">✓</div>
                <h3>Randevu Talebiniz Alındı!</h3>
                <p><strong>{data.parentName}</strong>, randevu talebiniz başarıyla iletildi.</p>
                <p>
                  <strong>{data.date} - {data.time}</strong> saati için sizinle en kısa sürede <strong>{data.phone}</strong> numaralı telefonunuzdan iletişime geçilip onay verilecektir.
                </p>
                <button className="btn btn--outline booking-reset-btn" onClick={() => { setSubmitted(false); setStep(1); }}>Yeni Randevu Al</button>
              </div>
            ) : (
              <>
                <div className="booking-steps">
                  <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Tarih / Saat</div>
                  <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Hasta Bilgileri</div>
                </div>

                {step === 1 && (
                  <div className="step-content">
                    <h4>Tarih Seçin</h4>
                    <div className="date-selector">
                      {days.map((d) => (
                        <button
                          key={d.dateString}
                          className={`date-btn ${data.date === d.dateString ? 'selected' : ''}`}
                          onClick={() => {
                            const keep = (new Date(d.dateString).getDay() === 6 ? SATURDAY_TIMES : WEEKDAY_TIMES).includes(data.time);
                            setData({ ...data, date: d.dateString, time: keep ? data.time : '' });
                          }}
                        >
                          {d.display}
                        </button>
                      ))}
                    </div>

                    {data.date && (
                      <>
                        <h4 className="booking-time-title">
                          Saat Seçin
                          {isSaturday && <span className="booking-saturday-note">(Cumartesi: 09:00 - 13:00)</span>}
                        </h4>
                        <div className="time-selector">
                          {availableTimes.map((t) => (
                            <button key={t} className={`time-btn ${data.time === t ? 'selected' : ''}`} onClick={() => setData({ ...data, time: t })}>{t}</button>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="booking-next-wrapper">
                      <button className="btn btn--primary" onClick={next} disabled={!data.date || !data.time}>Devam Et →</button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={submit} className="step-content">
                    <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" tabIndex={-1}>
                      <label htmlFor="company">Şirket</label>
                      <input type="text" id="company" name="company" autoComplete="off" value={data.company} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Veli Adı Soyadı</label>
                      <input type="text" name="parentName" value={data.parentName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Çocuğun Adı Soyadı</label>
                      <input type="text" name="childName" value={data.childName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Telefon Numarası</label>
                      <input type="tel" name="phone" value={data.phone} onChange={handleChange} required placeholder="05XX XXX XX XX" />
                    </div>
                    <div className="form-group">
                      <label>Şikayetiniz / Gelme Sebebiniz</label>
                      <textarea name="reason" value={data.reason} onChange={handleChange} rows="3" required />
                    </div>
                    <div className="booking-form-actions">
                      <button type="button" className="btn btn--outline" onClick={() => setStep(1)}>← Geri</button>
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
