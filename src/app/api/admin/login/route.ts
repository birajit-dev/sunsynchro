import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  getSupabaseAuthStorageKey,
  getSupabaseEnv,
  hasSupabaseEnv,
} from '../../../../lib/supabase/env'
import { supabaseFetch } from '../../../../lib/supabase/fetch'

export const runtime = 'nodejs'

/**
 * POST /api/admin/login
 * Server-side password login so cookies are set correctly for middleware,
 * and DNS-bypass fetch works on restricted local networks.
 */
export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      {
        error:
          'Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY',
      },
      { status: 503 }
    )
  }

  let email = ''
  let password = ''
  try {
    const body = (await request.json()) as {
      email?: string
      password?: string
    }
    email = (body.email ?? '').trim()
    password = body.password ?? ''
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    )
  }

  const { url, anonKey } = getSupabaseEnv()
  const storageKey = getSupabaseAuthStorageKey()
  const cookieStore = await cookies()

  const supabase = createServerClient(url, anonKey, {
    global: { fetch: supabaseFetch },
    auth: storageKey ? { storageKey } : undefined,
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
        })
      },
    },
  })

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const hint =
      /invalid login credentials/i.test(error.message)
        ? 'Create this user in Supabase → Authentication → Users (email + password), or reset the password.'
        : undefined
    return NextResponse.json(
      { error: error.message, hint },
      { status: 401 }
    )
  }

  return NextResponse.json({
    ok: true,
    user: data.user?.email ?? null,
  })
}
