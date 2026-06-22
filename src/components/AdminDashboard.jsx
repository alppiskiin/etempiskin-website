import { useState } from 'react';
import { supabase } from '../lib/supabase.js';
import AdminBookings from './AdminBookings.jsx';
import AdminReviews from './AdminReviews.jsx';
import AdminSettings from './AdminSettings.jsx';

export default function AdminDashboard({ session }) {
  const [tab, setTab] = useState('bookings');

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ background: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{
        background: '#fff',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)' }}>Yönetim Paneli</h1>
          <p style={{ fontSize: '.85rem', color: 'var(--text-light)' }}>Hoş geldiniz, {session.user.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <a href="/" className="btn btn--outline btn--sm">Siteyi Gör →</a>
          <button className="btn btn--outline btn--sm" onClick={logout} style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
            Çıkış Yap
          </button>
        </div>
      </header>

      <nav style={{
        background: '#fff',
        padding: '0 2rem',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        gap: '.5rem'
      }}>
        <button onClick={() => setTab('bookings')} style={tabStyle(tab === 'bookings')}>
          📅 Randevular
        </button>
        <button onClick={() => setTab('reviews')} style={tabStyle(tab === 'reviews')}>
          💬 Yorumlar
        </button>
        <button onClick={() => setTab('settings')} style={tabStyle(tab === 'settings')}>
          ⚙️ Ayarlar
        </button>
      </nav>

      <main style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
        {tab === 'bookings' && <AdminBookings />}
        {tab === 'reviews' && <AdminReviews />}
        {tab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
}

function tabStyle(active) {
  return {
    padding: '1rem 1.5rem',
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '.95rem',
    background: 'transparent',
    border: 'none',
    borderBottom: active ? '3px solid var(--primary)' : '3px solid transparent',
    color: active ? 'var(--primary)' : 'var(--text-light)',
    cursor: 'pointer'
  };
}
