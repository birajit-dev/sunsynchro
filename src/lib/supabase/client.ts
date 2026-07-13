import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseEnv, hasSupabaseEnv } from './env'

/** Throws if env is missing — use for admin flows that require Supabase. */
export function createClient() {
  const { url, anonKey } = getSupabaseEnv()
  return createBrowserClient(url, anonKey)
}

/** Returns null when env is not configured (common misconfigured production). */
export function tryCreateClient(): SupabaseClient | null {
  if (!hasSupabaseEnv()) return null
  try {
    const { url, anonKey } = getSupabaseEnv()
    return createBrowserClient(url, anonKey)
  } catch {
    return null
  }
}
