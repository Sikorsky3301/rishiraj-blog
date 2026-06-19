#!/usr/bin/env python3
"""
Runs via GitHub Actions every 6 hours.
For each new video: tries transcript → falls back to RSS description → sends to Groq.
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

FEED_URL     = os.environ.get('YOUTUBE_RSS_URL', '')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')
POSTS_DIR    = '_posts'
GROQ_MODEL   = 'llama-3.3-70b-versatile'


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
        print(f'  Transcript OK ({len(text)} chars)')
        return text[:80000]
    except Exception as e:
        print(f'  Transcript failed: {e}')
        return None


def get_description(entry):
    """Pull description from the RSS entry — tries multiple feedparser fields."""
    for field in ('summary', 'media_description', 'description'):
        val = entry.get(field, '').strip()
        if val:
            return val
    # feedparser sometimes puts media:description inside tags
    for tag in getattr(entry, 'tags', []):
        if 'description' in tag.get('term', '').lower():
            return tag.get('label', '')
    return ''


def analyze(title, source_text, source_label):
    """Return (summary, tech_stack). source_label is 'transcript' or 'description'."""
    if Groq is None or not GROQ_API_KEY:
        print('  Groq not available — skipping')
        return '', ''

    client = Groq(api_key=GROQ_API_KEY)
    prompt = f"""You are writing a post for an AI engineering blog.

Video title: {title}

{'Full transcript' if source_label == 'transcript' else 'Video description'}:
{source_text}

Reply in EXACTLY this format (keep the labels on their own lines):

SUMMARY:
3 to 5 paragraphs covering the key technical insights and takeaways.

TECH_STACK:
Comma-separated list of every specific technology, tool, framework, API, model, or library mentioned. If none, write None."""

    try:
        resp = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{'role': 'user', 'content': prompt}],
            temperature=0.3,
            max_tokens=2000,
        )
        raw = resp.choices[0].message.content.strip()
        print(f'  Groq responded ({len(raw)} chars)')

        summary    = ''
        tech_stack = ''

        # robust split — handle case where model adds extra text before SUMMARY:
        if 'TECH_STACK:' in raw:
            parts      = raw.split('TECH_STACK:', 1)
            tech_stack = parts[1].strip()
            summary_block = parts[0]
            if 'SUMMARY:' in summary_block:
                summary = summary_block.split('SUMMARY:', 1)[1].strip()
            else:
                summary = summary_block.strip()
        elif 'SUMMARY:' in raw:
            summary = raw.split('SUMMARY:', 1)[1].strip()

        return summary, tech_stack

    except Exception as e:
        print(f'  Groq error: {e}')
        return '', ''


def build_body(summary, description):
    parts = []
    if summary:
        parts.append(f'## Summary\n\n{summary}')
    if description:
        parts.append(f'## Description\n\n{description}')
    return '\n\n---\n\n'.join(parts) if parts else ''


def main():
    if not FEED_URL:
        print('Error: YOUTUBE_RSS_URL is not set.')
        return

    os.makedirs(POSTS_DIR, exist_ok=True)
    feed = feedparser.parse(FEED_URL)

    if not feed.entries:
        print('No entries in feed.')
        return

    print(f'Feed has {len(feed.entries)} entries')
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
            print(f'Skip (exists): {filename}')
            continue

        print(f'\nProcessing: {title}')
        description = get_description(entry)

        # Try transcript first; fall back to RSS description
        transcript = get_transcript(video_id)
        if transcript:
            source_text, source_label = transcript, 'transcript'
        elif description:
            print(f'  Using RSS description as source ({len(description)} chars)')
            source_text, source_label = description, 'description'
        else:
            source_text, source_label = '', ''

        summary, tech_stack = '', ''
        if source_text:
            summary, tech_stack = analyze(title, source_text, source_label)
        else:
            print('  No source text — skipping Groq')

        safe_title = title.replace('"', '\\"')
        safe_tech  = (tech_stack or '').replace('"', '\\"').strip()
        body       = build_body(summary, description)

        content = f"""---
layout: post
title: "{safe_title}"
date: {date_str}
youtube_id: {video_id}
tech_stack: "{safe_tech}"
---

{body}
"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  Created: {filename}')
        new_count += 1

    print(f'\nDone — {new_count} new post(s) created.')


if __name__ == '__main__':
    main()
