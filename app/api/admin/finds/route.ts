import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/requireAdmin'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { FIND_DOMAINS } from '@/lib/types'
import { toErrorMessage } from '@/lib/dbErrorMessage'

export async function POST(req: Request) {
  try {
    await requireAdmin()
  } catch (res) {
    if (res instanceof Response) return res
    throw res
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body.title !== 'string' || !body.title.trim()) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }
  if (!FIND_DOMAINS.includes(body.domain)) {
    return NextResponse.json({ error: 'Invalid domain' }, { status: 400 })
  }

  const row = {
    domain: body.domain,
    title: body.title.trim(),
    url: typeof body.url === 'string' && body.url.trim() ? body.url.trim() : null,
    note: typeof body.note === 'string' ? body.note.trim() || null : null,
  }

  let data, error
  try {
    ({ data, error } = await supabaseAdmin.from('finds').insert(row).select().single())
  } catch (err) {
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 502 })
  }

  if (error) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 })
  }

  revalidatePath('/feed')

  return NextResponse.json(data, { status: 201 })
}
