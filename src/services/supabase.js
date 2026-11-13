import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if valid credentials are provided
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// Create the Supabase client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Checks connection health to live Supabase backend.
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message: 'Supabase credentials not configured in environment variables.'
    };
  }

  try {
    const { data, error } = await supabase.from('schemes').select('id').limit(1);
    if (error) {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: 'Connected successfully to live Supabase PostgreSQL database!' };
  } catch (err) {
    return { ok: false, message: err.message || 'Connection failed' };
  }
}
