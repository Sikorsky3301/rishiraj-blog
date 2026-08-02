import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Post } from '@/lib/types'

export const revalidate = 3600

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  const p = post as Post

  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{p.title}</h1>
        <p className="post-meta">{formatDate(p.date)}</p>
        {p.tags?.length > 0 && (
          <div className="tech-stack">
            {p.tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className="post-content" dangerouslySetInnerHTML={{ __html: p.body_html }} />
    </article>
  )
}
