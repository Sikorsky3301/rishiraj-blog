'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PublishToggle({ id, published }: { id: string; published: boolean }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function handleClick() {
    setBusy(true)
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published }),
    })
    setBusy(false)
    if (res.ok) router.refresh()
    else alert('Update failed')
  }

  return (
    <button type="button" className="admin-btn" onClick={handleClick} disabled={busy}>
      {busy ? 'Updating...' : published ? 'Unpublish' : 'Publish'}
    </button>
  )
}
