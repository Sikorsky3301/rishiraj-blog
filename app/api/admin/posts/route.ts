import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/requireAdmin'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { sanitizePostBody } from '@/lib/sanitizePost'
import { slugify } from '@/lib/slugify'
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

  const slug = (typeof body.slug === 'string' && body.slug.trim())
    ? slugify(body.slug)
    : slugify(body.title)

  if (!slug) {
    return NextResponse.json({ error: 'Could not derive a slug from the title' }, { status: 400 })
  }

  const row = {
    slug,
    title: body.title.trim(),
    excerpt: typeof body.excerpt === 'string' ? body.excerpt.trim() : null,
    body_html: sanitizePostBody(typeof body.body_html === 'string' ? body.body_html : ''),
    tags: Array.isArray(body.tags) ? body.tags.filter((t: unknown) => typeof t === 'string' && t.trim()) : [],
    date: typeof body.date === 'string' && body.date ? body.date : new Date().toISOString().slice(0, 10),
    published: Boolean(body.published),
  }

  let data, error
  try {
    ({ data, error } = await supabaseAdmin.from('posts').insert(row).select().single())
  } catch (err) {
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 502 })
  }

  if (error) {
    const status = error.code === '23505' ? 409 : 500
    return NextResponse.json({ error: toErrorMessage(error) }, { status })
  }

  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)

  return NextResponse.json(data, { status: 201 })
}
