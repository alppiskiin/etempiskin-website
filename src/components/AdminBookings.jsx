import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { sendAppointmentEmail } from '../lib/emailjs.js';

const STATUS = {
  pending: { label: 'Bekliyor', color: 'var(--warning)', bg: '#FEFCBF' },
  approved: { label: 'Onaylandı', color: 'var(--success)', bg: '#F0FDF4' },
  rejected: { label: 'Reddedildi', color: 'var(--danger)', bg: '#FEF2F2' }
};

export default function AdminBookings() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (item, newStatus) => {
    const { error } = await supabase.from('appointments').update({ status: newStatus }).eq('id', item.id);
    if (error) {
      alert('Güncelleme başarısız: ' + error.message);
      return;
    }
    if (newStatus === 'approved') {
      try {
        await sendAppointmentEmail({
          parentName: item.parent_name,
          childName: item.child_name,
          phone: item.phone,
          date: item.appointment_date,
          time: item.appointment_time,
          reason: item.reason || ''
        });
        alert('Randevu onaylandı ve hastaya bildirim gönderildi.');
      } catch (err) {
        console.error(err);
        alert('Randevu onaylandı ancak bildirim gönderilemedi. Lütfen hastayı telefonla arayın.');
      }
    }
    load();
  };

  const remove = async (item) => {
    if (!confirm('Bu randevuyu silmek istediğinize emin misiniz?')) return;
    const { error } = await supabase.from('appointments').delete().eq('id', item.id);
    if (error) { alert('Silme başarısız: ' + error.message); return; }
    load();
  };

  const filtered = filter === 'all' ? list : list.filter((r) => r.status === filter);
  const counts = { all: list.length, pending: 0, approved: 0, rejected: 0 };
  list.forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1; });

  return (
    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>Randevu Yönetimi</h3>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          {[
            ['all', 'Tümü'],
            ['pending', 'Bekleyen'],
            ['approved', 'Onaylanmış'],
            ['rejected', 'Reddedilmiş']
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              style={{
                padding: '.4rem .9rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
                background: filter === k ? 'var(--primary)' : 'var(--white)',
                color: filter === k ? '#fff' : 'var(--text)',
                fontSize: '.85rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {l} ({counts[k] || 0})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>Yükleniyor...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem 0' }}>
          {filter === 'pending' ? 'Bekleyen randevu talebi bulunmuyor.' : 'Randevu bulunmuyor.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((e) => {
            const s = STATUS[e.status] || STATUS.pending;
            return (
              <div key={e.id} style={{
                borderLeft: `4px solid ${s.color}`,
                background: s.bg,
                padding: '1.25rem',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '.75rem' }}>
                  <div>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>{e.parent_name}</strong>
                    <span style={{ color: 'var(--text-light)', marginLeft: '.5rem' }}>(çocuk: {e.child_name})</span>
                  </div>
                  <span style={{
                    background: s.color,
                    color: '#fff',
                    padding: '.2rem .8rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '.8rem',
                    fontWeight: 700
                  }}>
                    {s.label}
                  </span>
                </div>
                <div style={{ fontSize: '.9rem', color: 'var(--text)', display: 'grid', gap: '.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: '1rem' }}>
                  <div>📅 <strong>{e.appointment_date}</strong> · 🕐 {e.appointment_time}</div>
                  <div>📞 <a href={`tel:${e.phone}`}>{e.phone}</a></div>
                  {e.reason && <div style={{ gridColumn: '1 / -1' }}>📝 {e.reason}</div>}
                </div>
                <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                  {e.status !== 'approved' && (
                    <button className="btn btn--primary btn--sm" onClick={() => updateStatus(e, 'approved')}>
                      ✅ Onayla
                    </button>
                  )}
                  {e.status !== 'rejected' && (
                    <button className="btn btn--sm" style={{ background: '#FEE2E2', color: '#DC2626', border: 'none' }} onClick={() => updateStatus(e, 'rejected')}>
                      ❌ Reddet
                    </button>
                  )}
                  <button className="btn btn--sm" style={{ background: 'transparent', color: 'var(--text-light)', border: '1px solid var(--border)' }} onClick={() => remove(e)}>
                    🗑️ Sil
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
