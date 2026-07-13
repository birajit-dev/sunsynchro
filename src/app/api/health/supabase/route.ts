import { NextResponse } from 'next/server'
import { hasSupabaseEnv } from '../../../../lib/supabase/env'

/**
 * GET /api/health/supabase
 * Shows whether public Supabase env vars are present in this deployment.
 * Does not expose secret values.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  return NextResponse.json({
    ok: hasSupabaseEnv(),
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(key),
    urlHost: url ? safeHost(url) : null,
    browserProxy: '/supabase/*',
    hint: hasSupabaseEnv()
      ? 'Env OK. Browser traffic is proxied via /supabase to avoid QUIC errors. Redeploy after this change.'
      : 'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then Redeploy.',
  })
}

function safeHost(raw: string) {
  try {
    return new URL(raw).host
  } catch {
    return 'invalid-url'
  }
}
