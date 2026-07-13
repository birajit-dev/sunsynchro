import { type NextRequest, NextResponse } from 'next/server'
import {
  getSupabaseAuthStorageKey,
  hasSupabaseEnv,
} from './lib/supabase/env'

/**
 * Edge middleware must not call Supabase over the network.
 * Poisoned DNS / TLS failures hang for ~30s and break /admin/login.
 * We only read the access token from cookies (same key the clients use).
 */
function getAccessTokenFromCookies(request: NextRequest): string | null {
  const storageKey = getSupabaseAuthStorageKey()
  if (!storageKey) return null

  const direct = request.cookies.get(storageKey)?.value
  const chunked = request.cookies
    .getAll()
    .filter((c) => c.name.startsWith(`${storageKey}.`))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => c.value)
    .join('')

  const raw = chunked || direct
  if (!raw) return null

  try {
    // Prefer JSON session payload; fall back to raw JWT.
    const decoded = raw.startsWith('eyJ')
      ? raw
      : decodeSessionPayload(raw)
    return decoded
  } catch {
    return null
  }
}

function base64UrlDecode(value: string): string {
  const b64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
  const normalized = b64 + pad
  if (typeof atob === 'function') {
    return atob(normalized)
  }
  // Node fallback (local middleware tooling)
  return Buffer.from(normalized, 'base64').toString('utf8')
}

function decodeSessionPayload(raw: string): string | null {
  // Cookie may be URL-encoded JSON, base64 JSON, or base64url.
  let text = raw
  try {
    text = decodeURIComponent(raw)
  } catch {
    /* keep raw */
  }

  const tryParse = (s: string) => {
    const parsed = JSON.parse(s) as {
      access_token?: string
      currentSession?: { access_token?: string }
    }
    return (
      parsed.access_token ||
      parsed.currentSession?.access_token ||
      null
    )
  }

  try {
    return tryParse(text)
  } catch {
    /* not plain JSON */
  }

  try {
    return tryParse(base64UrlDecode(text))
  } catch {
    return null
  }
}

function isAccessTokenValid(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return false
    const payload = JSON.parse(base64UrlDecode(parts[1])) as {
      exp?: number
      role?: string
    }
    if (!payload.exp) return false
    // 30s clock skew
    return payload.exp * 1000 > Date.now() - 30_000
  } catch {
    return false
  }
}

function clearAuthCookies(response: NextResponse, request: NextRequest) {
  const storageKey = getSupabaseAuthStorageKey()
  if (!storageKey) return
  for (const cookie of request.cookies.getAll()) {
    if (
      cookie.name === storageKey ||
      cookie.name.startsWith(`${storageKey}.`)
    ) {
      response.cookies.set(cookie.name, '', { maxAge: 0, path: '/' })
    }
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  if (!hasSupabaseEnv()) {
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      return NextResponse.redirect(redirectUrl)
    }
    return response
  }

  const token = getAccessTokenFromCookies(request)
  const loggedIn = Boolean(token && isAccessTokenValid(token))

  // Drop expired / corrupt session cookies so clients don't keep retrying refresh.
  if (token && !loggedIn) {
    clearAuthCookies(response, request)
  }

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!loggedIn) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      const redirect = NextResponse.redirect(redirectUrl)
      if (token) clearAuthCookies(redirect, request)
      return redirect
    }
  }

  if (pathname === '/admin/login' && loggedIn) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin'
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
