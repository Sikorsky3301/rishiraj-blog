'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleClick() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button type="button" className="admin-nav-link admin-nav-button" onClick={handleClick}>
      Logout
    </button>
  )
}
