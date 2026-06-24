-- Run this in your Supabase SQL editor (supabase.com → project → SQL editor)

create table posts (
  id          uuid default gen_random_uuid() primary key,
  video_id    text unique not null,
  slug        text unique not null,
  title       text not null,
  date        date not null,
  channel     text,
  tech_stack  text,
  summary     text,
  description text,
  created_at  timestamp with time zone default now()
);

-- Allow public read access
alter table posts enable row level security;

create policy "Public read" on posts
  for select using (true);
