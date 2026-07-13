import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseEnv, hasSupabaseEnv } from '../../../../lib/supabase/env'
import { supabaseFetch } from '../../../../lib/supabase/fetch'

export const runtime = 'nodejs'

const HOP_BY_HOP = new Set([
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
])

async function proxy(request: NextRequest, path: string[]) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: 'Supabase env not configured' },
      { status: 503 }
    )
  }

  const { url: baseUrl } = getSupabaseEnv()
  const target = new URL(`${baseUrl}/${path.join('/')}`)
  target.search = request.nextUrl.search

  const headers = new Headers()
  request.headers.forEach((value, key) => {
    if (HOP_BY_HOP.has(key.toLowerCase())) return
    headers.set(key, value)
  })

  // Ensure apikey is present for Supabase REST/Auth.
  if (!headers.has('apikey')) {
    headers.set('apikey', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }

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
      if (HOP_BY_HOP.has(key.toLowerCase())) return
      // Avoid compressed double-decoding issues through Next.
      if (key.toLowerCase() === 'content-encoding') return
      if (key.toLowerCase() === 'content-length') return
      responseHeaders.set(key, value)
    })

    return new NextResponse(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Proxy failed'
    return NextResponse.json(
      {
        error: message,
        hint: 'Could not reach Supabase from this server. Check DNS/network.',
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

export async function OPTIONS(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(request, path)
}
