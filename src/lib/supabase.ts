import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any); // Fallback for build time

// Helper for server-side actions that need elevated privileges
export const getSupabaseService = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceKey) {
    throw new Error('Supabase URL or Service Role Key is missing');
  }
  return createClient(supabaseUrl, serviceKey);
}
