#!/usr/bin/env python3
"""
Fetches the 5 most recent videos from each YouTube RSS feed
and inserts them into Supabase (no transcript, no Groq).

Env vars required:
  YOUTUBE_RSS_URLS     — comma-separated YouTube RSS feed URLs
  SUPABASE_URL         — Supabase project URL
  SUPABASE_SERVICE_KEY — Supabase service role key
"""
import feedparser
import os
import re

try:
    from supabase import create_client
except ImportError:
    create_client = None

RSS_URLS     = [u.strip() for u in os.environ.get('YOUTUBE_RSS_URLS', '').split(',') if u.strip()]
SUPABASE_URL = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_KEY', '')


def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')[:60]


def get_description(entry):
    for field in ('summary', 'media_description', 'description'):
        val = entry.get(field, '').strip()
        if val:
            return val
    return ''


def process_feed(rss_url, db):
    print(f'\nFetching: {rss_url}')
    feed = feedparser.parse(rss_url)

    if not feed.entries:
        print('  No entries.')
        return 0

    channel_name = feed.feed.get('title', 'Unknown')
    print(f'  Channel: {channel_name} — processing latest 5')

    new_count = 0
    for entry in feed.entries[:5]:
        video_id = entry.get('yt_videoid', '')
        if not video_id:
            continue

        title     = entry.title
        published = entry.published
        date_str  = published[:10]

        existing = db.table('posts').select('id').eq('video_id', video_id).execute()
        if existing.data:
            print(f'  Skip (exists): {title}')
            continue

        description = get_description(entry)
        slug        = slugify(title)

        row = {
            'video_id':    video_id,
            'slug':        slug,
            'title':       title,
            'date':        date_str,
            'channel':     channel_name,
            'tech_stack':  '',
            'summary':     '',
            'description': description,
        }

        try:
            db.table('posts').insert(row).execute()
            print(f'  Inserted: {title}')
            new_count += 1
        except Exception as e:
            print(f'  Insert error: {e}')

    return new_count


def main():
    if not RSS_URLS:
        print('Error: YOUTUBE_RSS_URLS not set.')
        return
    if not SUPABASE_URL or not SUPABASE_KEY:
        print('Error: SUPABASE_URL or SUPABASE_SERVICE_KEY not set.')
        return
    if create_client is None:
        print('Error: pip install supabase')
        return

    db = create_client(SUPABASE_URL, SUPABASE_KEY)

    total = 0
    for url in RSS_URLS:
        total += process_feed(url, db)

    print(f'\nDone — {total} new post(s) inserted.')


if __name__ == '__main__':
    main()
