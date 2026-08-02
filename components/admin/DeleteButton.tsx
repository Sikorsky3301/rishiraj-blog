'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteButton({ url, label = 'Delete' }: { url: string; label?: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  async function handleClick() {
    if (!confirm('Delete this item? This cannot be undone.')) return
    setBusy(true)
    const res = await fetch(url, { method: 'DELETE' })
    setBusy(false)
    if (res.ok) router.refresh()
    else alert('Delete failed')
  }

  return (
    <button type="button" className="admin-btn admin-btn-danger" onClick={handleClick} disabled={busy}>
      {busy ? 'Deleting...' : label}
    </button>
  )
}
