import { supabase } from './supabase.js';

// Settings tablosu henüz kurulmadıysa ya da satır yoksa kullanılacak varsayılan.
// Şu an randevu sistemi varsayılan olarak KAPALI.
const BOOKING_ENABLED_FALLBACK = false;

export async function getBookingEnabled() {
  if (!supabase) return BOOKING_ENABLED_FALLBACK;
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'booking_enabled')
      .maybeSingle();
    if (error || !data) return BOOKING_ENABLED_FALLBACK;
    return !!data.value;
  } catch {
    return BOOKING_ENABLED_FALLBACK;
  }
}

export async function setBookingEnabled(enabled) {
  if (!supabase) throw new Error('Supabase bağlantısı yok.');
  const { error } = await supabase
    .from('settings')
    .upsert(
      { key: 'booking_enabled', value: enabled, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );
  if (error) throw error;
}
