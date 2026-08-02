const NETWORK_FAILURE_HINT =
  'Could not reach Supabase — check your network connection and that NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_KEY are correct.'

function isNetworkFailure(raw: string): boolean {
  return raw.includes('fetch failed') || raw.includes('TimeoutError') || raw.includes('AbortError')
}

// supabase-js/postgrest-js doesn't always throw on a network-level fetch
// failure — sometimes it catches it internally and returns it as a normal
// `{ error }` result instead. So this needs to handle both a thrown
// exception (from our own try/catch) AND a plain postgrest error object.
export function toErrorMessage(err: unknown): string {
  const raw = err instanceof Error ? err.message : String((err as any)?.message ?? err)
  return isNetworkFailure(raw) ? NETWORK_FAILURE_HINT : raw
}
