import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getBrowserSupabaseUrl, getSupabaseEnv, hasSupabaseEnv } from './env'

function createBrowserSupabase() {
  const { url, anonKey } = getSupabaseEnv()
  return createBrowserClient(getBrowserSupabaseUrl(url), anonKey)
}

/** Throws if env is missing — use for admin flows that require Supabase. */
export function createClient() {
  return createBrowserSupabase()
}

/** Returns null when env is not configured (common misconfigured production). */
export function tryCreateClient(): SupabaseClient | null {
  if (!hasSupabaseEnv()) return null
  try {
    return createBrowserSupabase()
  } catch {
    return null
  }
}
