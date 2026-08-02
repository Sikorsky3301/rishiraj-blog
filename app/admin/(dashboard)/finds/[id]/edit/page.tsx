import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Find } from '@/lib/types'
import FindForm from '@/components/admin/FindForm'

export default async function EditFindPage({ params }: { params: { id: string } }) {
  const { data: find } = await supabaseAdmin.from('finds').select('*').eq('id', params.id).single()

  if (!find) notFound()

  return (
    <div>
      <h1>Edit Find</h1>
      <FindForm find={find as Find} />
    </div>
  )
}
