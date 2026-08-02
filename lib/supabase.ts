import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// A slow/paused Supabase project (common on the free tier after inactivity)
// would otherwise hang page rendering indefinitely with no feedback — cap
// each request so the page can fall back to an empty state instead.
// Generous enough to tolerate a cold-started free-tier Supabase project
// waking up, while still failing eventually instead of hanging forever.
const REQUEST_TIMEOUT_MS = 25000

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (input, init) =>
      fetch(input, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }),
  },
})
