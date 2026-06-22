import { useEffect, useState } from 'react';
import { getBookingEnabled, setBookingEnabled } from '../lib/settings.js';

export default function AdminSettings() {
  const [enabled, setEnabled] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => { getBookingEnabled().then(setEnabled); }, []);

  const toggle = async () => {
    const next = !enabled;
    setSaving(true);
    setMsg(null);
    try {
      await setBookingEnabled(next);
      setEnabled(next);
      setMsg({ type: 'ok', text: next ? 'Online randevu sistemi AÇILDI. Siteye yansıdı.' : 'Online randevu sistemi KAPATILDI. Siteye yansıdı.' });
    } catch (err) {
      setMsg({ type: 'err', text: 'Kaydedilemedi: ' + (err.message || 'bilinmeyen hata') + '. (settings tablosu Supabase\'de kurulu olmalı.)' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)', maxWidth: '640px' }}>
      <h3 style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Site Ayarları</h3>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
        padding: '1.25rem',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
        background: '#f9fbfd'
      }}>
        <div>
          <strong style={{ color: 'var(--text-dark)', fontSize: '1.05rem' }}>Online Randevu Sistemi</strong>
          <p style={{ fontSize: '.85rem', color: 'var(--text-light)', marginTop: '.25rem', maxWidth: '380px' }}>
            Kapatırsan sitedeki randevu formu gizlenir, yerine "telefonla arayın" mesajı çıkar. Tatil/yokluk dönemlerinde kullanışlıdır.
          </p>
        </div>

        {enabled === null ? (
          <span style={{ color: 'var(--text-light)', fontSize: '.9rem' }}>Yükleniyor...</span>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{
              fontWeight: 700,
              fontSize: '.85rem',
              color: enabled ? 'var(--success)' : 'var(--danger)'
            }}>
              {enabled ? 'AÇIK' : 'KAPALI'}
            </span>
            <button
              onClick={toggle}
              disabled={saving}
              aria-label="Randevu sistemini aç/kapat"
              style={{
                position: 'relative',
                width: '58px',
                height: '32px',
                borderRadius: '999px',
                border: 'none',
                cursor: saving ? 'wait' : 'pointer',
                background: enabled ? 'var(--success)' : '#cbd5e1',
                transition: 'background .2s',
                flexShrink: 0
              }}
            >
              <span style={{
                position: 'absolute',
                top: '3px',
                left: enabled ? '29px' : '3px',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#fff',
                transition: 'left .2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }} />
            </button>
          </div>
        )}
      </div>

      {msg && (
        <p style={{
          marginTop: '1rem',
          padding: '.75rem 1rem',
          borderRadius: '8px',
          fontSize: '.9rem',
          background: msg.type === 'ok' ? '#F0FDF4' : '#FEF2F2',
          color: msg.type === 'ok' ? '#166534' : '#DC2626',
          border: `1px solid ${msg.type === 'ok' ? '#bbf7d0' : '#fecaca'}`
        }}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
