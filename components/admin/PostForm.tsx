'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { slugify } from '@/lib/slugify'
import { Post } from '@/lib/types'

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false })

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter()
  const isEdit = Boolean(post)

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(isEdit)
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(', ') ?? '')
  const [date, setDate] = useState(post?.date ?? new Date().toISOString().slice(0, 10))
  const [published, setPublished] = useState(post?.published ?? false)
  const [bodyHtml, setBodyHtml] = useState(post?.body_html ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    const payload = { title, slug, excerpt, tags, date, published, body_html: bodyHtml }

    const url = isEdit ? `/api/admin/posts/${post!.id}` : '/api/admin/posts'
    const method = isEdit ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSaving(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Something went wrong')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="admin-form-error">{error}</p>}

      <label className="admin-field">
        <span>Title</span>
        <input value={title} onChange={e => handleTitleChange(e.target.value)} required />
      </label>

      <label className="admin-field">
        <span>Slug</span>
        <input
          value={slug}
          onChange={e => { setSlugTouched(true); setSlug(e.target.value) }}
          required
        />
      </label>

      <label className="admin-field">
        <span>Excerpt</span>
        <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} />
      </label>

      <label className="admin-field">
        <span>Tags (comma-separated)</span>
        <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="computer-vision, llm" />
      </label>

      <label className="admin-field">
        <span>Date</span>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </label>

      <label className="admin-field admin-field-inline">
        <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
        <span>Published</span>
      </label>

      <label className="admin-field">
        <span>Body</span>
        <TiptapEditor content={bodyHtml} onChange={setBodyHtml} />
      </label>

      <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
        {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Create post'}
      </button>
    </form>
  )
}
