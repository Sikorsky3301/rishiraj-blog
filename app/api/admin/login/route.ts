import { NextResponse } from 'next/server'
import { verifyPassword, createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/adminAuth'

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }))

  if (typeof password !== 'string' || !(await verifyPassword(password))) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
