import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Post } from '@/lib/types'

export const revalidate = 3600

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

function renderMarkdown(text: string) {
  if (!text) return null
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
    if (line.startsWith('- '))  return <li key={i}>{line.slice(2)}</li>
    if (line === '---')          return <hr key={i} />
    if (line.trim() === '')      return null
    return <p key={i}>{line}</p>
  })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) notFound()

  const p = post as Post
  const techs = p.tech_stack?.split(',').map(t => t.trim()).filter(t => t && t !== 'None') ?? []

  return (
    <article className="post">
      <header className="post-header">
        {p.channel && <span className="channel-label">{p.channel}</span>}
        <h1 className="post-title">{p.title}</h1>
        <p className="post-meta">{formatDate(p.date)}</p>
      </header>

      <div className="post-content">
        {p.video_id && (
          <div className="video-embed">
            <iframe
              src={`https://www.youtube.com/embed/${p.video_id}`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}

        {techs.length > 0 && (
          <div className="tech-stack">
            <span className="tech-stack-label">Tech</span>
            {techs.map(tech => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}

        {p.summary && <div>{renderMarkdown(p.summary)}</div>}

        {p.description && (
          <>
            <hr />
            <h2>Description</h2>
            <p>{p.description}</p>
          </>
        )}
      </div>
    </article>
  )
}
