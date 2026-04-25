import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co').trim().replace(/\/+$/, '');
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder').trim();

// Create a single supabase client for interaction with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper for server-side actions that need elevated privileges
export const getSupabaseService = () => {
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder').trim();
  return createClient(supabaseUrl, serviceKey);
}
