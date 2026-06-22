import { useEffect, useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

export default function AdminReviews() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    setList(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const approve = async (id) => {
    const { error } = await supabase.from('reviews').update({ is_approved: true }).eq('id', id);
    if (error) { alert('Hata: ' + error.message); return; }
    load();
  };

  const unapprove = async (id) => {
    const { error } = await supabase.from('reviews').update({ is_approved: false }).eq('id', id);
    if (error) { alert('Hata: ' + error.message); return; }
    load();
  };

  const remove = async (id) => {
    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) { alert('Hata: ' + error.message); return; }
    load();
  };

  const filtered = filter === 'all' ? list : list.filter((r) => (filter === 'approved' ? r.is_approved : !r.is_approved));
  const counts = {
    all: list.length,
    pending: list.filter((r) => !r.is_approved).length,
    approved: list.filter((r) => r.is_approved).length
  };

  return (
    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ color: 'var(--text-dark)', fontFamily: 'var(--font-heading)' }}>Yorum Yönetimi</h3>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          {[['all', 'Tümü'], ['pending', 'Bekleyen'], ['approved', 'Yayında']].map(([k, l]) => (
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
              {l} ({counts[k]})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>Yükleniyor...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem 0' }}>
          Sistemde hiç yorum bulunmuyor.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((r) => (
            <div key={r.id} style={{
              borderLeft: r.is_approved ? '4px solid var(--success)' : '4px solid var(--warning)',
              background: r.is_approved ? 'var(--bg-warm)' : '#FEFCBF',
              padding: '1.25rem',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
                  <strong style={{ color: 'var(--text-dark)' }}>{r.author}</strong>
                  <span style={{ color: '#f1c40f' }}>{'★'.repeat(r.rating)}</span>
                  <span style={{
                    background: r.is_approved ? 'var(--success)' : 'var(--warning)',
                    color: '#fff',
                    padding: '.15rem .6rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '.7rem',
                    fontWeight: 700
                  }}>
                    {r.is_approved ? 'YAYINDA' : 'BEKLİYOR'}
                  </span>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>"{r.text}"</p>
                <small style={{ color: 'var(--text-light)' }}>{new Date(r.created_at).toLocaleString('tr-TR')}</small>
              </div>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                {r.is_approved ? (
                  <button className="btn btn--sm" style={{ background: 'var(--bg-section-alt)', color: 'var(--text)', border: 'none' }} onClick={() => unapprove(r.id)}>
                    Yayından Kaldır
                  </button>
                ) : (
                  <button className="btn btn--primary btn--sm" onClick={() => approve(r.id)}>
                    <Check size={15} /> Onayla
                  </button>
                )}
                <button className="btn btn--sm" style={{ background: '#FEE2E2', color: '#DC2626', border: 'none' }} onClick={() => remove(r.id)}>
                  <Trash2 size={15} /> Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
