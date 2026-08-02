import { cookies } from 'next/headers'
import { verifySessionToken, SESSION_COOKIE } from '@/lib/adminAuth'

// Defense-in-depth check for admin mutation route handlers. middleware.ts
// already guards /api/admin/*, but a future edit to its matcher shouldn't be
// able to silently expose a write endpoint — each handler re-checks itself.
export async function requireAdmin() {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!(await verifySessionToken(token))) {
    throw new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
