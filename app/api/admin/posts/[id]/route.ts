import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/requireAdmin'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { sanitizePostBody } from '@/lib/sanitizePost'
import { slugify } from '@/lib/slugify'
import { toErrorMessage } from '@/lib/dbErrorMessage'

async function revalidatePostPaths(slug: string | undefined) {
  revalidatePath('/')
  revalidatePath('/blog')
  if (slug) revalidatePath(`/blog/${slug}`)
}

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

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() }

  if (typeof body.title === 'string' && body.title.trim()) update.title = body.title.trim()
  if (typeof body.slug === 'string' && body.slug.trim()) update.slug = slugify(body.slug)
  if (typeof body.excerpt === 'string') update.excerpt = body.excerpt.trim() || null
  if (typeof body.body_html === 'string') update.body_html = sanitizePostBody(body.body_html)
  if (Array.isArray(body.tags)) {
    update.tags = body.tags.filter((t: unknown) => typeof t === 'string' && t.trim())
  }
  if (typeof body.date === 'string' && body.date) update.date = body.date
  if (typeof body.published === 'boolean') update.published = body.published

  let data, error
  try {
    ({ data, error } = await supabaseAdmin
      .from('posts')
      .update(update)
      .eq('id', params.id)
      .select()
      .single())
  } catch (err) {
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 502 })
  }

  if (error) {
    const status = error.code === '23505' ? 409 : 500
    return NextResponse.json({ error: toErrorMessage(error) }, { status })
  }

  await revalidatePostPaths(data?.slug)

  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
  } catch (res) {
    if (res instanceof Response) return res
    throw res
  }

  let data, error
  try {
    ({ data, error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', params.id)
      .select()
      .single())
  } catch (err) {
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 502 })
  }

  if (error) {
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 })
  }

  await revalidatePostPaths(data?.slug)

  return NextResponse.json({ ok: true })
}
