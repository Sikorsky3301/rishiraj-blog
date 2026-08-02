-- Run this in your Supabase SQL editor (supabase.com → project → SQL editor)
-- WARNING: this drops and recreates `posts` with a new, incompatible shape.
-- Any existing rows (the old video-scraped posts) will be permanently lost.
-- Back up first with `select * from posts;` → export if you want to keep them.

drop table if exists posts cascade;

create table posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  body_html   text not null default '',
  tags        text[] not null default '{}',
  date        date not null default current_date,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index posts_published_date_idx on posts (published, date desc);

alter table posts enable row level security;

-- Only published posts are visible to the anon (public) key.
-- The admin panel reads with the service-role key, which bypasses RLS entirely,
-- so drafts remain visible there regardless of this policy.
create policy "Public read published posts" on posts
  for select using (published = true);

drop table if exists finds cascade;

create table finds (
  id          uuid primary key default gen_random_uuid(),
  domain      text not null check (domain in (
                'Computer Vision', 'Design', 'LLM', 'Research Paper',
                'Video', 'Article', 'Other'
              )),
  title       text not null,
  url         text,
  note        text,
  created_at  timestamptz not null default now()
);

create index finds_domain_created_idx on finds (domain, created_at desc);

alter table finds enable row level security;

create policy "Public read finds" on finds
  for select using (true);
