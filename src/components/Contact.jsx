import { useState } from 'react';
import { MapPin, Phone, Clock, CreditCard, Wifi, CheckCircle2, XCircle } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';
import { sendAppointmentEmail } from '../lib/emailjs.js';

export default function Contact() {
  const rHeader = useReveal();
  const rInfo = useReveal();
  const rForm = useReveal();
  const [form, setForm] = useState({ name: '', phone: '', message: '', website: '' });
  const [status, setStatus] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) {
      setStatus({ ok: true, msg: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapılacaktır.' });
      setForm({ name: '', phone: '', message: '', website: '' });
      return;
    }
    setSending(true);
    setErrMsg(null);
    try {
      await sendAppointmentEmail({
        parentName: form.name,
        phone: form.phone,
        reason: form.message,
        childName: '-',
        date: 'Mesaj Formu',
        time: '-'
      });
      setStatus({ ok: true, msg: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapılacaktır.' });
      setForm({ name: '', phone: '', message: '', website: '' });
      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      console.error('Mesaj gönderilirken hata:', err.message);
      setErrMsg('Mesaj gönderilirken bir hata oluştu. Lütfen doğrudan bizi arayın.');
      setTimeout(() => setErrMsg(null), 6000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="iletisim" className="contact">
      <div className="container">
        <div ref={rHeader} className="contact__header reveal-up">
          <span className="section-tag">İletişim</span>
          <h2 className="section-title">Bize Ulaşın</h2>
          <p className="section-desc">
            Sorularınız, önerileriniz veya bilgi almak için bize mesaj bırakabilir ya da doğrudan arayabilirsiniz.
          </p>
        </div>

        <div className="contact__inner">
          <div ref={rInfo} className="contact__info reveal-right">
            <div className="contact-card">
              <div className="contact-card__icon" style={{ color: 'var(--primary)', display: 'flex' }}><MapPin size={24} /></div>
              <div className="contact-card__content">
                <h4>Muayenehane Adresi</h4>
                <p className="contact-card__address">Acılık Caddesi, Kont İşhanı No:11/6, 67030 Zonguldak Merkez</p>
                <p className="contact-card__address-note">Belediye kapalı otoparkın yan tarafı</p>
                <div className="contact__map">
                  <iframe
                    className="contact__map-iframe"
                    title="Muayenehane Konumu"
                    src="https://maps.google.com/maps?q=Ac%C4%B1l%C4%B1k+Caddesi+Kont+%C4%B0%C5%9Fhan%C4%B1+Zonguldak&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="250"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon" style={{ color: 'var(--primary)', display: 'flex' }}><Phone size={24} /></div>
              <div className="contact-card__content">
                <h4>Telefon</h4>
                <a href="tel:+908508118176" className="contact-card__phone">0850 811 81 76</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon" style={{ color: 'var(--primary)', display: 'flex' }}><Clock size={24} /></div>
              <div className="contact-card__content">
                <h4>Çalışma Saatleri</h4>
                <div className="hours-table">
                  <div className="hours-row"><span>Pazartesi - Cuma</span><span>09:00 - 17:00</span></div>
                  <div className="hours-row"><span>Cumartesi</span><span>09:00 - 13:00</span></div>
                  <div className="hours-row hours-row--closed"><span>Pazar</span><span>Kapalı</span></div>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon" style={{ color: 'var(--primary)', display: 'flex' }}><CreditCard size={24} /></div>
              <div className="contact-card__content">
                <h4>Ödeme Yöntemleri</h4>
                <div className="contact-card__tags">
                  <span className="contact-tag">Nakit</span>
                  <span className="contact-tag">Kredi Kartı</span>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon" style={{ color: 'var(--primary)', display: 'flex' }}><Wifi size={24} /></div>
              <div className="contact-card__content">
                <h4>Muayenehane Olanakları</h4>
                <div className="contact-card__tags">
                  <span className="contact-tag">Ücretsiz Wi-Fi</span>
                  <span className="contact-tag">Çocuk Dostu Ortam</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={rForm} className="contact__form-wrapper reveal-left">
            <form className="contact-form" onSubmit={submit}>
              <h3 className="contact-form__title">Bize Mesaj Gönderin</h3>
              <p className="contact-form__desc">Sorularınızı bize iletin, en kısa sürede size dönüş yapalım.</p>

              {status && <div className="contact-alert contact-alert--success"><CheckCircle2 size={18} /> {status.msg}</div>}
              {errMsg && <div className="contact-alert contact-alert--error"><XCircle size={18} /> {errMsg}</div>}

              <div className="form-group">
                <label>Adınız Soyadınız</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Telefon Numaranız</label>
                <input type="tel" required placeholder="05XX XXX XX XX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Mesajınız</label>
                <textarea required rows="4" placeholder="Sorunuzu veya mesajınızı yazın..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <input type="text" tabIndex="-1" autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} aria-hidden="true" />

              <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={sending}>
                {sending ? 'Gönderiliyor...' : 'Mesajı Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
