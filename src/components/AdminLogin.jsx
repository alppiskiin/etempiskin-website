import { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!supabase) { setError('Supabase yapılandırması eksik.'); return; }
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError(err.message === 'Invalid login credentials' ? 'E-posta veya şifre hatalı.' : err.message);
    setLoading(false);
  };

  return (
    <div style={{ background: '#f4f7f6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
          <Stethoscope size={24} style={{ color: 'var(--primary)' }} /> Yönetici Girişi
        </h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Email Adresi</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" autoComplete="username" />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {error && <div className="contact-alert contact-alert--error" style={{ marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '.85rem', color: 'var(--text-light)' }}>
          <a href="/">← Ana Sayfaya Dön</a>
        </p>
      </div>
    </div>
  );
}
