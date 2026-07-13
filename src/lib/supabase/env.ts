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

/**
 * Browser clients use a same-origin proxy (/supabase → real project)
 * so Chrome does not hit *.supabase.co over QUIC/HTTP3.
 * Server-side code keeps the real Supabase URL.
 */
export function getBrowserSupabaseUrl(realUrl: string) {
  if (typeof window === 'undefined') return realUrl
  return `${window.location.origin}/supabase`
}
