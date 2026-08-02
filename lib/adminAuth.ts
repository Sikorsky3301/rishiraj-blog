// Runtime-agnostic (Edge + Node) session signing using Web Crypto.
// No Node `crypto` / `Buffer` dependency so this works unmodified in
// both middleware.ts (Edge runtime) and route handlers (Node runtime).

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days
const encoder = new TextEncoder()

export const SESSION_COOKIE = 'admin_session'
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message))
  return toHex(sig)
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET!
  const expiry = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const sig = await hmacHex(secret, String(expiry))
  return `${expiry}.${sig}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [expiryStr, sig] = token.split('.')
  const expiry = Number(expiryStr)
  if (!expiryStr || !sig || Number.isNaN(expiry)) return false
  if (Math.floor(Date.now() / 1000) > expiry) return false
  const secret = process.env.ADMIN_SESSION_SECRET!
  const expected = await hmacHex(secret, expiryStr)
  return constantTimeEqual(expected, sig)
}

// Hashing both sides before comparing normalizes length up front, so a
// raw string compare can't leak the real password's length via timing.
export async function verifyPassword(submitted: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD!
  const digestA = toHex(await crypto.subtle.digest('SHA-256', encoder.encode(submitted)))
  const digestB = toHex(await crypto.subtle.digest('SHA-256', encoder.encode(expected)))
  return constantTimeEqual(digestA, digestB)
}
