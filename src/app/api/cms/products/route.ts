import { NextResponse } from 'next/server'
import { createServiceAnonClient } from '../../../../lib/supabase/anon-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createServiceAnonClient()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase env not configured', data: [] },
      { status: 503 }
    )
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message, data: [] },
      { status: 502 }
    )
  }

  return NextResponse.json({ data: data ?? [] })
}
