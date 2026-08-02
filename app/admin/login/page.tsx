'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setBusy(false)

    if (!res.ok) {
      setError('Incorrect password')
      return
    }

    router.push(searchParams.get('from') || '/admin')
    router.refresh()
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="admin-form-error">{error}</p>}
      <label className="admin-field">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          required
        />
      </label>
      <button type="submit" className="admin-btn admin-btn-primary" disabled={busy}>
        {busy ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
