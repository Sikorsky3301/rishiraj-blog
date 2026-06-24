#!/usr/bin/env python3
"""
Fetches videos from multiple YouTube RSS feeds, extracts transcripts,
sends to Groq for structured summaries, writes _posts/*.md files.

Env vars:
  YOUTUBE_RSS_URLS  — comma-separated list of YouTube RSS feed URLs
  GROQ_API_KEY      — Groq API key
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

RSS_URLS     = [u.strip() for u in os.environ.get('YOUTUBE_RSS_URLS', '').split(',') if u.strip()]
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')
POSTS_DIR    = '_posts'
GROQ_MODEL   = 'llama-3.3-70b-versatile'


def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')[:55]


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
        print(f'  Groq: {len(output)} chars returned')

        # Extract tech stack for frontmatter tags
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


def process_feed(rss_url):
    print(f'\nFetching: {rss_url}')
    feed = feedparser.parse(rss_url)

    if not feed.entries:
        print('  No entries found.')
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

        slug     = slugify(title)
        filename = f'{date_str}-{slug}.md'
        filepath = os.path.join(POSTS_DIR, filename)

        if os.path.exists(filepath):
            continue

        print(f'\n  New: {title}')

        description = get_description(entry)
        transcript  = get_transcript(video_id)

        if transcript:
            source_text, source_label = transcript, 'transcript'
        elif description:
            print(f'  Falling back to description ({len(description)} chars)')
            source_text, source_label = description, 'description'
        else:
            source_text, source_label = '', ''

        summary_md = ''
        tech_stack = ''
        if source_text:
            summary_md, tech_stack = groq_summarize(title, channel_name, source_text, source_label)
        else:
            print('  No source text — skipping Groq')

        # Build markdown body
        parts = []
        if summary_md:
            parts.append(summary_md)
        if description:
            parts.append(f'## Description\n\n{description}')
        body = '\n\n---\n\n'.join(parts) if parts else description

        safe_title   = title.replace('"', '\\"').replace('\\', '\\\\')
        safe_channel = channel_name.replace('"', '\\"')
        safe_tech    = tech_stack.replace('"', '\\"').strip() if tech_stack else ''

        content = f"""---
layout: post
title: "{safe_title}"
date: {date_str}
youtube_id: {video_id}
channel: "{safe_channel}"
tech_stack: "{safe_tech}"
---

{body}
"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  Created: {filename}')
        new_count += 1

    return new_count


def main():
    if not RSS_URLS:
        print('Error: YOUTUBE_RSS_URLS is not set.')
        return

    os.makedirs(POSTS_DIR, exist_ok=True)
    total = 0
    for url in RSS_URLS:
        total += process_feed(url)

    print(f'\nDone — {total} new post(s) created across {len(RSS_URLS)} channel(s).')


if __name__ == '__main__':
    main()
