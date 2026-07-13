import { type NextRequest, NextResponse } from 'next/server'
import {
  getSupabaseAuthStorageKey,
  hasSupabaseEnv,
} from './lib/supabase/env'

/**
 * Edge middleware must not call Supabase over the network.
 * Session cookies from @supabase/ssr look like:
 *   sb-<ref>-auth-token = base64-<base64url(JSON session)>
 * or chunked: sb-<ref>-auth-token.0, .1, ...
 */
function getAccessTokenFromCookies(request: NextRequest): string | null {
  const storageKey = getSupabaseAuthStorageKey()
  if (!storageKey) return null

  const direct = request.cookies.get(storageKey)?.value
  const chunked = request.cookies
    .getAll()
    .filter((c) => c.name.startsWith(`${storageKey}.`))
    .sort((a, b) => {
      const ai = Number(a.name.split('.').pop())
      const bi = Number(b.name.split('.').pop())
      return ai - bi
    })
    .map((c) => c.value)
    .join('')

  const raw = chunked || direct
  if (!raw) return null

  return extractAccessToken(raw)
}

function base64UrlToString(value: string): string {
  const b64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4))
  const normalized = b64 + pad
  if (typeof atob === 'function') {
    return atob(normalized)
  }
  return Buffer.from(normalized, 'base64').toString('utf8')
}

function extractAccessToken(raw: string): string | null {
  let text = raw
  try {
    text = decodeURIComponent(raw)
  } catch {
    /* keep raw */
  }

  // @supabase/ssr cookieEncoding: "base64url" → values start with "base64-"
  if (text.startsWith('base64-')) {
    try {
      text = base64UrlToString(text.slice('base64-'.length))
    } catch {
      return null
    }
  }

  if (text.startsWith('eyJ')) {
    return text
  }

  try {
    const parsed = JSON.parse(text) as {
      access_token?: string
      currentSession?: { access_token?: string }
    }
    return (
      parsed.access_token ||
      parsed.currentSession?.access_token ||
      null
    )
  } catch {
    return null
  }
}

function isAccessTokenValid(token: string): boolean {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return false
    const payload = JSON.parse(base64UrlToString(parts[1])) as {
      exp?: number
    }
    if (!payload.exp) return false
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
