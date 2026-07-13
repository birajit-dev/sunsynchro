import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  getBrowserSupabaseUrl,
  getSupabaseAuthStorageKey,
  getSupabaseEnv,
  hasSupabaseEnv,
} from './env'

function createBrowserSupabase() {
  const { anonKey } = getSupabaseEnv()
  const storageKey = getSupabaseAuthStorageKey()

  return createBrowserClient(getBrowserSupabaseUrl(), anonKey, {
    auth: storageKey ? { storageKey } : undefined,
  })
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
