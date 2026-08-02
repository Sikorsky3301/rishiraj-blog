import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Post, Find } from '@/lib/types'
import DeleteButton from '@/components/admin/DeleteButton'
import PublishToggle from '@/components/admin/PublishToggle'

export const dynamic = 'force-dynamic'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export default async function AdminDashboardPage() {
  const [{ data: posts }, { data: finds }] = await Promise.all([
    supabaseAdmin.from('posts').select('*').order('date', { ascending: false }),
    supabaseAdmin.from('finds').select('*').order('created_at', { ascending: false }),
  ])

  return (
    <div>
      <section className="admin-section">
        <h2>Posts</h2>
        <ul className="admin-list">
          {(posts as Post[] | null)?.map(post => (
            <li key={post.id} className="admin-list-item">
              <div>
                <span className="post-meta">{formatDate(post.date)} {post.published ? '' : '(draft)'}</span>
                <span className="admin-list-title">{post.title}</span>
              </div>
              <div className="admin-list-actions">
                <a className="admin-btn" href={`/admin/posts/${post.id}/edit`}>Edit</a>
                <PublishToggle id={post.id} published={post.published} />
                <DeleteButton url={`/api/admin/posts/${post.id}`} />
              </div>
            </li>
          ))}
          {(!posts || posts.length === 0) && <p className="post-meta">No posts yet.</p>}
        </ul>
      </section>

      <section className="admin-section">
        <h2>Finds</h2>
        <ul className="admin-list">
          {(finds as Find[] | null)?.map(find => (
            <li key={find.id} className="admin-list-item">
              <div>
                <span className="post-meta">{find.domain}</span>
                <span className="admin-list-title">{find.title}</span>
              </div>
              <div className="admin-list-actions">
                <a className="admin-btn" href={`/admin/finds/${find.id}/edit`}>Edit</a>
                <DeleteButton url={`/api/admin/finds/${find.id}`} />
              </div>
            </li>
          ))}
          {(!finds || finds.length === 0) && <p className="post-meta">No finds yet.</p>}
        </ul>
      </section>
    </div>
  )
}
