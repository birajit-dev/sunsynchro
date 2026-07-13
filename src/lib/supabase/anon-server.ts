import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseEnv, hasSupabaseEnv } from './env'
import { supabaseFetch } from './fetch'

/**
 * Server-only anon client (no cookies). Uses DNS-bypass fetch so Netlify
 * and restricted local networks can reach *.supabase.co reliably.
 */
export function createServiceAnonClient(): SupabaseClient | null {
  if (!hasSupabaseEnv()) return null
  const { url, anonKey } = getSupabaseEnv()
  return createClient(url, anonKey, {
    global: { fetch: supabaseFetch },
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
