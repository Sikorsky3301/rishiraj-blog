import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'

export const revalidate = 3600

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

export default async function HomePage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, title, date, channel')
    .order('date', { ascending: false })

  return (
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
  )
}
