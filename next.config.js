// Node's fetch (undici) tries IPv6 first when a host has AAAA records; on
// networks/ISPs where outbound IPv6 is broken (common on Windows, especially
// with some routers/VPNs), that shows up as "TypeError: fetch failed" even
// though the same host is reachable fine over IPv4 (e.g. via curl/browser,
// which fall back automatically). Force IPv4 resolution first to avoid it.
const dns = require('dns')
try {
  dns.setDefaultResultOrder('ipv4first')
} catch {
  // Node < 17.5 doesn't support this API — safe to ignore, older Node
  // resolves IPv4-first by default anyway.
}

/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig
