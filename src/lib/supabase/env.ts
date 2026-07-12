/**
 * Shared Supabase public env. NEXT_PUBLIC_* must be set at BUILD time
 * on the host (Vercel / Netlify / etc.) and the app redeployed.
 */
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
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
