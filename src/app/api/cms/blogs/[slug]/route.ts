import { NextResponse } from 'next/server'
import { createServiceAnonClient } from '../../../../../lib/supabase/anon-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, ctx: Ctx) {
  const { slug } = await ctx.params
  const supabase = createServiceAnonClient()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase env not configured', data: null },
      { status: 503 }
    )
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) {
    return NextResponse.json(
      { error: error.message, data: null },
      { status: 502 }
    )
  }

  return NextResponse.json({ data: data ?? null })
}
