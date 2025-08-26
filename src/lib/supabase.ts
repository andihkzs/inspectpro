/**
 * Supabase client configuration
 * Handles database connection and authentication
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that we have real Supabase credentials, not placeholder values
const isValidSupabaseUrl = supabaseUrl && 
  supabaseUrl !== 'your-supabase-project-url' && 
  supabaseUrl.startsWith('https://') && 
  supabaseUrl.includes('.supabase.co');

const isValidSupabaseKey = supabaseAnonKey && 
  supabaseAnonKey !== 'your-supabase-anon-key' &&
  supabaseAnonKey.length > 20;

if (!isValidSupabaseUrl || !isValidSupabaseKey) {
  console.warn('Supabase environment variables not found. Using localStorage fallback.');
}

export const supabase = isValidSupabaseUrl && isValidSupabaseKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null;
};