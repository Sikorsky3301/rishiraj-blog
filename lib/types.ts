export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string | null
  body_html: string
  tags: string[]
  date: string
  published: boolean
  created_at: string
  updated_at: string
}

export const FIND_DOMAINS = [
  'Computer Vision', 'Design', 'LLM', 'Research Paper',
  'Video', 'Article', 'Other',
] as const

export type FindDomain = typeof FIND_DOMAINS[number]

export interface Find {
  id: string
  domain: FindDomain
  title: string
  url: string | null
  note: string | null
  created_at: string
}
