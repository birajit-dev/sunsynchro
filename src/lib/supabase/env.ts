/**
 * Shared Supabase public env. NEXT_PUBLIC_* must be set at BUILD time
 * on the host (Vercel / Netlify / etc.) and the app redeployed.
 */
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Add both in your hosting Environment Variables, then redeploy ' +
        '(Next.js inlines these at build time).'
    )
  }

  return { url, anonKey }
}

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

/** Project ref from https://<ref>.supabase.co — used for stable auth cookie keys. */
export function getSupabaseProjectRef() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!raw) return null
  try {
    const host = new URL(raw).hostname
    const ref = host.split('.')[0]
    return ref || null
  } catch {
    return null
  }
}

export function getSupabaseAuthStorageKey() {
  const ref = getSupabaseProjectRef()
  return ref ? `sb-${ref}-auth-token` : undefined
}

/**
 * Browser talks to same-origin `/api/supabase` so:
 * - Production Chrome avoids QUIC/HTTP3 bugs to *.supabase.co
 * - Localhost works even when system DNS poisons supabase.co
 *   (the API route resolves via 1.1.1.1 and proxies).
 */
export function getBrowserSupabaseUrl() {
  if (typeof window === 'undefined') {
    return getSupabaseEnv().url
  }
  return `${window.location.origin}/api/supabase`
}
