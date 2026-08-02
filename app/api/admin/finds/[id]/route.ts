import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/requireAdmin'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { FIND_DOMAINS } from '@/lib/types'
import { toErrorMessage } from '@/lib/dbErrorMessage'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
  } catch (res) {
    if (res instanceof Response) return res
    throw res
  }

  const body = await req.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const update: Record<string, unknown> = {}

  if (typeof body.title === 'string' && body.title.trim()) update.title = body.title.trim()
  if (typeof body.domain === 'string') {
    if (!FIND_DOMAINS.includes(body.domain as any)) {
      return NextResponse.json({ error: 'Invalid domain' }, { status: 400 })
    }
    update.domain = body.domain
  }
  if (typeof body.url === 'string') update.url = body.url.trim() || null
  if (typeof body.note === 'string') update.note = body.note.trim() || null

  let data, error
  try {
    ({ data, error } = await supabaseAdmin
      .from('finds')
      .update(update)
      .eq('id', params.id)
      .select()
      .single())
  } catch (err) {
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 502 })
  }

  if (error) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 })
  }

  revalidatePath('/feed')

  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
  } catch (res) {
    if (res instanceof Response) return res
    throw res
  }

  let error
  try {
    ({ error } = await supabaseAdmin.from('finds').delete().eq('id', params.id))
  } catch (err) {
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 502 })
  }

  if (error) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 })
  }

  revalidatePath('/feed')

  return NextResponse.json({ ok: true })
}
