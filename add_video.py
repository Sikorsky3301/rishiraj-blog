#!/usr/bin/env python3
"""
Manually add a YouTube video as a post with transcript + Groq summary.

Usage:
  python add_video.py https://www.youtube.com/watch?v=VIDEO_ID
  python add_video.py VIDEO_ID

Requires env var GROQ_API_KEY to be set for AI summarization.
"""
import sys
import re
import os
import json
import urllib.request
from datetime import datetime

try:
    from youtube_transcript_api import YouTubeTranscriptApi
except ImportError:
    YouTubeTranscriptApi = None
    print('Note: pip install youtube-transcript-api for transcript support')

try:
    from groq import Groq
except ImportError:
    Groq = None
    print('Note: pip install groq for AI summary support')

POSTS_DIR    = '_posts'
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')
GROQ_MODEL   = 'llama-3.3-70b-versatile'


def extract_video_id(text):
    if re.match(r'^[a-zA-Z0-9_-]{11}$', text):
        return text
    for pattern in [
        r'youtube\.com/watch\?v=([a-zA-Z0-9_-]{11})',
        r'youtu\.be/([a-zA-Z0-9_-]{11})',
        r'youtube\.com/embed/([a-zA-Z0-9_-]{11})',
    ]:
        m = re.search(pattern, text)
        if m:
            return m.group(1)
    return None


def fetch_title(video_id):
    url = f'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json'
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            return json.loads(resp.read()).get('title', video_id)
    except Exception:
        return input('Enter video title: ').strip()


def get_transcript(video_id):
    if YouTubeTranscriptApi is None:
        return None
    try:
        entries = YouTubeTranscriptApi.get_transcript(video_id)
        return ' '.join(e['text'] for e in entries)[:80000]
    except Exception as e:
        print(f'No transcript: {e}')
        return None


def analyze(title, transcript):
    if Groq is None or not GROQ_API_KEY:
        print('Skipping AI analysis (GROQ_API_KEY not set or groq not installed)')
        return '', ''

    client = Groq(api_key=GROQ_API_KEY)
    prompt = f"""You are summarizing a technical YouTube video for an AI engineering blog.

Title: {title}

Transcript:
{transcript}

Respond in exactly this format:

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
        summary, tech_stack = '', ''
        if 'SUMMARY:' in out and 'TECH_STACK:' in out:
            parts      = out.split('TECH_STACK:')
            summary    = parts[0].replace('SUMMARY:', '').strip()
            tech_stack = parts[1].strip()
        return summary, tech_stack
    except Exception as e:
        print(f'Groq error: {e}')
        return '', ''


def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')[:60]


def main():
    if len(sys.argv) < 2:
        print('Usage: python add_video.py <youtube_url_or_video_id>')
        sys.exit(1)

    video_id = extract_video_id(sys.argv[1])
    if not video_id:
        print(f'Could not extract video ID from: {sys.argv[1]}')
        sys.exit(1)

    print(f'Video ID: {video_id}')
    title = fetch_title(video_id)
    print(f'Title:    {title}')

    description = input('Paste description (or press Enter to skip): ').strip()

    print('Fetching transcript...')
    transcript = get_transcript(video_id)

    summary, tech_stack = '', ''
    if transcript:
        print(f'Transcript: {len(transcript)} chars — analyzing with Groq...')
        summary, tech_stack = analyze(title, transcript)
    else:
        print('No transcript available.')

    date_str = datetime.today().strftime('%Y-%m-%d')
    slug     = slugify(title)
    filename = f'{date_str}-{slug}.md'
    filepath = os.path.join(POSTS_DIR, filename)

    if os.path.exists(filepath):
        print(f'Post already exists: {filepath}')
        sys.exit(0)

    os.makedirs(POSTS_DIR, exist_ok=True)

    parts = []
    if summary:
        parts.append(f'## Summary\n\n{summary}')
    if description:
        parts.append(f'## Description\n\n{description}')
    body = '\n\n---\n\n'.join(parts) if parts else ''

    safe_title = title.replace('"', '\\"')
    safe_tech  = (tech_stack or '').replace('"', '\\"').strip()

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

    print(f'\nCreated: {filepath}')
    if tech_stack:
        print(f'Tech:    {tech_stack}')
    print('\nNext: git add _posts/ && git commit -m "Add: {title}" && git push')


if __name__ == '__main__':
    main()
