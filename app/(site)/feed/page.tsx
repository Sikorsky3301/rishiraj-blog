import { supabase } from '@/lib/supabase'
import { FIND_DOMAINS, Find } from '@/lib/types'

export const revalidate = 3600

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: { domain?: string }
}) {
  const activeDomain = searchParams.domain

  let query = supabase.from('finds').select('*').order('created_at', { ascending: false })
  if (activeDomain) query = query.eq('domain', activeDomain)

  const { data: finds } = await query

  return (
    <div>
      <p className="feed-intro">
        Things I've come across across computer vision, design, LLMs, research papers, and more —
        posted here as I find them.
      </p>

      <nav className="feed-filters">
        <a href="/feed" className={`channel-label${!activeDomain ? ' active' : ''}`}>All</a>
        {FIND_DOMAINS.map(domain => (
          <a
            key={domain}
            href={`/feed?domain=${encodeURIComponent(domain)}`}
            className={`channel-label${activeDomain === domain ? ' active' : ''}`}
          >
            {domain}
          </a>
        ))}
      </nav>

      <ul className="post-list feed-list">
        {(finds as Find[] | null)?.map(find => (
          <li key={find.id}>
            <span className="post-meta">{find.domain} · {formatDate(find.created_at)}</span>
            <h2>
              {find.url ? (
                <a className="post-link" href={find.url} target="_blank" rel="noreferrer">{find.title}</a>
              ) : (
                find.title
              )}
            </h2>
            {find.note && <p className="post-excerpt">{find.note}</p>}
          </li>
        ))}
        {(!finds || finds.length === 0) && <p className="post-meta">Nothing here yet.</p>}
      </ul>
    </div>
  )
}
