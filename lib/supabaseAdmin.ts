import 'server-only'
import { createClient } from '@supabase/supabase-js'

// Generous enough to tolerate a cold-started free-tier Supabase project
// waking up, while still failing eventually instead of hanging forever.
const REQUEST_TIMEOUT_MS = 25000

// Service-role key: full write access, bypasses RLS.
// The `server-only` import above makes it a build-time error to import this
// file from a client component, so the service key can never reach the browser.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }),
    },
  }
)
