#!/usr/bin/env python3
"""
Fetches videos from multiple YouTube RSS feeds, extracts transcripts,
sends to Groq for structured summaries, inserts into Supabase.

Env vars required:
  YOUTUBE_RSS_URLS     — comma-separated YouTube RSS feed URLs
  GROQ_API_KEY         — Groq API key
  SUPABASE_URL         — Supabase project URL
  SUPABASE_SERVICE_KEY — Supabase service role key (for inserts)
"""
import feedparser
import os
import re

try:
    from youtube_transcript_api import YouTubeTranscriptApi
except ImportError:
    YouTubeTranscriptApi = None

try:
    from groq import Groq
except ImportError:
    Groq = None

try:
    from supabase import create_client
except ImportError:
    create_client = None

RSS_URLS       = [u.strip() for u in os.environ.get('YOUTUBE_RSS_URLS', '').split(',') if u.strip()]
GROQ_API_KEY   = os.environ.get('GROQ_API_KEY', '')
SUPABASE_URL   = os.environ.get('SUPABASE_URL', '')
SUPABASE_KEY   = os.environ.get('SUPABASE_SERVICE_KEY', '')
GROQ_MODEL     = 'llama-3.3-70b-versatile'


def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')[:60]


def get_transcript(video_id):
    if YouTubeTranscriptApi is None:
        return None
    try:
        entries = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join(e['text'] for e in entries)
        print(f'  Transcript: {len(text)} chars')
        return text[:90000]
    except Exception as e:
        print(f'  Transcript blocked: {e}')
        return None


def get_description(entry):
    for field in ('summary', 'media_description', 'description'):
        val = entry.get(field, '').strip()
        if val:
            return val
    return ''


def groq_summarize(title, channel, source_text, source_label):
    if Groq is None or not GROQ_API_KEY:
        print('  Groq not configured — skipping')
        return '', ''

    client = Groq(api_key=GROQ_API_KEY)
    prompt = f"""You are writing a blog post summary for an AI engineering blog.

Channel: {channel}
Video title: {title}
Source ({source_label}):
{source_text}

Write a structured markdown summary using EXACTLY these four sections.
Do not add any other text before or after.

## Overview
2–3 sentences explaining what this video is about and why it matters.

## Key Insights
- 4–6 specific, technical bullet points from the video content.

## Tech & Tools
A single comma-separated line listing every technology, tool, model, framework, API, or library mentioned. If none, write: None.

## Takeaway
One sentence: the single most important thing a viewer should walk away knowing."""

    try:
        resp = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{'role': 'user', 'content': prompt}],
            temperature=0.3,
            max_tokens=1500,
        )
        output = resp.choices[0].message.content.strip()
        print(f'  Groq: {len(output)} chars')

        # Extract tech stack line
        tech_stack = ''
        in_tech = False
        for line in output.split('\n'):
            if '## Tech' in line:
                in_tech = True
                continue
            if in_tech:
                stripped = line.strip()
                if stripped and not stripped.startswith('#'):
                    tech_stack = stripped
                    break
                if stripped.startswith('#'):
                    break

        return output, tech_stack

    except Exception as e:
        print(f'  Groq error: {e}')
        return '', ''


def process_feed(rss_url, db):
    print(f'\nFetching: {rss_url}')
    feed = feedparser.parse(rss_url)

    if not feed.entries:
        print('  No entries.')
        return 0

    channel_name = feed.feed.get('title', 'Unknown')
    print(f'  Channel: {channel_name} — {len(feed.entries)} videos')

    new_count = 0
    for entry in feed.entries:
        video_id = entry.get('yt_videoid', '')
        if not video_id:
            continue

        title     = entry.title
        published = entry.published
        date_str  = published[:10]

        # Check if already in Supabase
        existing = db.table('posts').select('id').eq('video_id', video_id).execute()
        if existing.data:
            continue

        print(f'\n  New: {title}')
        description = get_description(entry)
        transcript  = get_transcript(video_id)

        if transcript:
            source_text, source_label = transcript, 'transcript'
        elif description:
            print(f'  Using description ({len(description)} chars)')
            source_text, source_label = description, 'description'
        else:
            source_text, source_label = '', ''

        summary_md = ''
        tech_stack = ''
        if source_text:
            summary_md, tech_stack = groq_summarize(title, channel_name, source_text, source_label)

        slug = slugify(title)

        row = {
            'video_id':    video_id,
            'slug':        slug,
            'title':       title,
            'date':        date_str,
            'channel':     channel_name,
            'tech_stack':  tech_stack,
            'summary':     summary_md,
            'description': description,
        }

        try:
            db.table('posts').insert(row).execute()
            print(f'  Inserted: {slug}')
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

    print(f'\nDone — {total} new post(s) inserted into Supabase.')


if __name__ == '__main__':
    main()
