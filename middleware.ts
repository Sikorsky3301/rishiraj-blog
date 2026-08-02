import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from '@/lib/adminAuth'

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Login page and login API must stay reachable without a session.
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value
  const valid = await verifySessionToken(token)

  if (!valid) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
