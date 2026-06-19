#!/usr/bin/env python3
"""
Runs via GitHub Actions every 6 hours.
For each new video: fetches transcript → Groq summary + tech stack → writes _posts/*.md
"""
import feedparser
import os
import re
from datetime import datetime

try:
    from youtube_transcript_api import YouTubeTranscriptApi
except ImportError:
    YouTubeTranscriptApi = None

try:
    from groq import Groq
except ImportError:
    Groq = None

FEED_URL    = os.environ.get('YOUTUBE_RSS_URL', '')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')
POSTS_DIR   = '_posts'
GROQ_MODEL  = 'llama-3.3-70b-versatile'


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
        return text[:80000]          # stay within token limits
    except Exception as e:
        print(f'  No transcript: {e}')
        return None


def analyze(title, transcript):
    """Return (summary_str, tech_stack_str) or (None, None) on failure."""
    if Groq is None or not GROQ_API_KEY:
        return None, None

    client = Groq(api_key=GROQ_API_KEY)
    prompt = f"""You are summarizing a technical YouTube video for an AI engineering blog.

Title: {title}

Transcript:
{transcript}

Respond in exactly this format (keep the labels):

SUMMARY:
Write 3–5 paragraphs covering the key technical insights, findings, and takeaways.

TECH_STACK:
Comma-separated list of every specific technology, tool, framework, API, model, or library mentioned. If none, write None."""

    try:
        resp = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[{'role': 'user', 'content': prompt}],
            temperature=0.3,
            max_tokens=2000,
        )
        out = resp.choices[0].message.content

        summary    = ''
        tech_stack = ''
        if 'SUMMARY:' in out and 'TECH_STACK:' in out:
            parts      = out.split('TECH_STACK:')
            summary    = parts[0].replace('SUMMARY:', '').strip()
            tech_stack = parts[1].strip()
        return summary, tech_stack
    except Exception as e:
        print(f'  Groq error: {e}')
        return None, None


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

    new_count = 0
    for entry in feed.entries:
        video_id = entry.get('yt_videoid', '')
        if not video_id:
            continue

        title       = entry.title
        published   = entry.published
        description = entry.get('summary', '')
        date_str    = published[:10]

        slug     = slugify(title)
        filename = f'{date_str}-{slug}.md'
        filepath = os.path.join(POSTS_DIR, filename)

        if os.path.exists(filepath):
            continue

        print(f'New video: {title}')

        transcript = get_transcript(video_id)
        summary, tech_stack = ('', '')
        if transcript:
            print(f'  Transcript: {len(transcript)} chars — sending to Groq...')
            summary, tech_stack = analyze(title, transcript)
        else:
            print('  Skipping AI analysis (no transcript)')

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

    print(f'Done — {new_count} new post(s) created.')


if __name__ == '__main__':
    main()
