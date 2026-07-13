import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseAuthStorageKey, getSupabaseEnv } from './env'
import { supabaseFetch } from './fetch'

export async function createClient() {
  const cookieStore = await cookies()
  const { url, anonKey } = getSupabaseEnv()
  const storageKey = getSupabaseAuthStorageKey()

  return createServerClient(url, anonKey, {
    global: { fetch: supabaseFetch },
    auth: storageKey ? { storageKey } : undefined,
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from a Server Component – cookies can't be set.
          // The middleware will refresh the session.
        }
      },
    },
  })
}
