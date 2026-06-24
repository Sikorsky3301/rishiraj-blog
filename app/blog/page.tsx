import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'

export const revalidate = 3600

const PER_PAGE = 10

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page  = Math.max(1, parseInt(searchParams.page ?? '1'))
  const start = (page - 1) * PER_PAGE
  const end   = start + PER_PAGE - 1

  const { data: posts, count } = await supabase
    .from('posts')
    .select('slug, title, date, channel', { count: 'exact' })
    .order('date', { ascending: false })
    .range(start, end)

  const totalPages = Math.ceil((count ?? 0) / PER_PAGE)

  return (
    <div>
      <ul className="post-list">
        {posts?.map((post: Pick<Post, 'slug' | 'title' | 'date' | 'channel'>) => (
          <li key={post.slug}>
            <span className="post-meta">{formatDate(post.date)}</span>
            <h2>
              <a className="post-link" href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav className="pagination">
          {page > 1 && (
            <a href={`/blog?page=${page - 1}`} className="pagination-link">← Newer</a>
          )}
          <span className="pagination-info">{page} / {totalPages}</span>
          {page < totalPages && (
            <a href={`/blog?page=${page + 1}`} className="pagination-link">Older →</a>
          )}
        </nav>
      )}
    </div>
  )
}
