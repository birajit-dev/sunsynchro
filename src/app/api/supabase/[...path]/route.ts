import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseEnv, hasSupabaseEnv } from '../../../../lib/supabase/env'
import { supabaseFetch } from '../../../../lib/supabase/fetch'

export const runtime = 'nodejs'

/** Headers that must not be forwarded to Supabase. */
const SKIP_REQUEST_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
  // Browser compression breaks our proxy if we strip content-encoding on the way back.
  'accept-encoding',
  // Do not forward the Next.js site cookies to Supabase.
  'cookie',
  'origin',
  'referer',
])

const SKIP_RESPONSE_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'content-encoding',
  'content-length',
])

async function proxy(request: NextRequest, path: string[]) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: 'Supabase env not configured' },
      { status: 503 }
    )
  }

  const { url: baseUrl, anonKey } = getSupabaseEnv()
  const target = new URL(`${baseUrl}/${path.join('/')}`)
  target.search = request.nextUrl.search

  const headers = new Headers()
  request.headers.forEach((value, key) => {
    if (SKIP_REQUEST_HEADERS.has(key.toLowerCase())) return
    headers.set(key, value)
  })

  if (!headers.has('apikey')) {
    headers.set('apikey', anonKey)
  }
  // Force plain responses so the browser can parse JSON.
  headers.set('accept-encoding', 'identity')

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: 'no-store',
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer()
  }

  try {
    const upstream = await supabaseFetch(target, init)
    const responseHeaders = new Headers()
    upstream.headers.forEach((value, key) => {
      if (SKIP_RESPONSE_HEADERS.has(key.toLowerCase())) return
      responseHeaders.set(key, value)
    })
    responseHeaders.set('cache-control', 'no-store')

    const body = await upstream.arrayBuffer()
    return new NextResponse(body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Proxy failed'
    return NextResponse.json(
      {
        error: message,
        hint: 'Could not reach Supabase from this server.',
      },
      { status: 502 }
    )
  }
}

type Ctx = { params: Promise<{ path: string[] }> }

export async function GET(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(request, path)
}

export async function POST(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(request, path)
}

export async function PUT(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(request, path)
}

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(request, path)
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(request, path)
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'access-control-allow-headers':
        'authorization,apikey,content-type,x-client-info,x-supabase-api-version',
    },
  })
}
