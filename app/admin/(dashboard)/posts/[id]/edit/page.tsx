import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Post } from '@/lib/types'
import PostForm from '@/components/admin/PostForm'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const { data: post } = await supabaseAdmin.from('posts').select('*').eq('id', params.id).single()

  if (!post) notFound()

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm post={post as Post} />
    </div>
  )
}
