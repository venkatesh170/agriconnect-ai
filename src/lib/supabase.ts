// Supabase Integration Client for AgriConnect AI
// This client can be connected with your live Supabase project by providing
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isConfigured: boolean;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey),
  };
};

export const SUPABASE_STATUS = {
  active: getSupabaseConfig().isConfigured,
  mode: getSupabaseConfig().isConfigured ? 'Remote PostgreSQL' : 'Local Mock Data Engine (Indexed & LocalStorage Synced)',
};
