'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FIND_DOMAINS, Find } from '@/lib/types'

export default function FindForm({ find }: { find?: Find }) {
  const router = useRouter()
  const isEdit = Boolean(find)

  const [domain, setDomain] = useState(find?.domain ?? FIND_DOMAINS[0])
  const [title, setTitle] = useState(find?.title ?? '')
  const [url, setUrl] = useState(find?.url ?? '')
  const [note, setNote] = useState(find?.note ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = { domain, title, url, note }
    const endpoint = isEdit ? `/api/admin/finds/${find!.id}` : '/api/admin/finds'
    const method = isEdit ? 'PATCH' : 'POST'

    const res = await fetch(endpoint, {
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
        <span>Domain</span>
        <select value={domain} onChange={e => setDomain(e.target.value as typeof domain)}>
          {FIND_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </label>

      <label className="admin-field">
        <span>Title</span>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>

      <label className="admin-field">
        <span>URL (optional)</span>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
      </label>

      <label className="admin-field">
        <span>Note</span>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} />
      </label>

      <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
        {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Add find'}
      </button>
    </form>
  )
}
