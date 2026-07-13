import { NextResponse } from 'next/server'
import { hasSupabaseEnv } from '../../../../lib/supabase/env'
import { supabaseFetch } from '../../../../lib/supabase/fetch'

export const runtime = 'nodejs'

/**
 * GET /api/health/supabase
 * Shows whether public Supabase env vars are present and whether the project is reachable.
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const host = url ? safeHost(url) : null

  let reachable: boolean | null = null
  let reachError: string | null = null
  let healthStatus: number | null = null

  if (url) {
    try {
      const res = await supabaseFetch(
        `${url.replace(/\/$/, '')}/auth/v1/health`,
        {
          method: 'GET',
          headers: key ? { apikey: key } : undefined,
          cache: 'no-store',
        }
      )
      healthStatus = res.status
      // /auth/v1/health may return 200; without key some projects return 401 — still reachable.
      reachable = res.status > 0 && res.status < 500
      if (!reachable) reachError = `HTTP ${res.status}`
    } catch (err) {
      reachable = false
      const msg = err instanceof Error ? err.message : String(err)
      reachError = msg
    }
  }

  return NextResponse.json({
    ok: hasSupabaseEnv() && reachable === true,
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(key),
    urlHost: host,
    reachable,
    healthStatus,
    reachError,
    hint: !hasSupabaseEnv()
      ? 'On Netlify: Site configuration → Environment variables → add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then Trigger deploy. Local .env is not used in production.'
      : reachable
        ? 'Env OK. Production browser talks to Supabase directly; localhost uses /api/supabase.'
        : 'Env is set but Supabase is unreachable from this server.',
  })
}

function safeHost(raw: string) {
  try {
    return new URL(raw).host
  } catch {
    return 'invalid-url'
  }
}
