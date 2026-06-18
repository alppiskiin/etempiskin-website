import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase.js';
import AdminLogin from '../components/AdminLogin.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';

export default function Admin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <Helmet>
        <title>Yönetim Paneli | Prof. Dr. İbrahim Etem Pişkin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      {loading ? (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Yükleniyor...
        </div>
      ) : session ? (
        <AdminDashboard session={session} />
      ) : (
        <AdminLogin />
      )}
    </>
  );
}
