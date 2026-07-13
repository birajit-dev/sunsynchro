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
 * Browser always uses same-origin `/api/supabase` so:
 * - Localhost: Node proxy + DNS-bypass reach Supabase on restricted networks
 * - Netlify: Next function (or rewrite) proxies; browser never hits *.supabase.co
 *   (avoids Chrome QUIC / mixed network failures that caused silent static fallback)
 */
export function getBrowserSupabaseUrl() {
  if (typeof window === 'undefined') {
    return getSupabaseEnv().url
  }
  return `${window.location.origin}/api/supabase`
}
