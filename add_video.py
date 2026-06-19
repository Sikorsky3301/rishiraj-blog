#!/usr/bin/env python3
"""
Manually add a YouTube video as a post.

Usage:
  python add_video.py https://www.youtube.com/watch?v=VIDEO_ID
  python add_video.py VIDEO_ID
"""
import sys
import re
import os
import json
import urllib.request
from datetime import datetime

POSTS_DIR = '_posts'


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
    url = (
        f'https://www.youtube.com/oembed'
        f'?url=https://www.youtube.com/watch?v={video_id}&format=json'
    )
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            data = json.loads(resp.read())
        return data.get('title', video_id)
    except Exception as e:
        print(f'Could not fetch title automatically: {e}')
        return input('Enter video title manually: ').strip()


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
    print(f'Title: {title}')

    description = input('Paste description (or press Enter to leave blank): ').strip()

    date_str = datetime.today().strftime('%Y-%m-%d')
    slug = slugify(title)
    filename = f'{date_str}-{slug}.md'
    filepath = os.path.join(POSTS_DIR, filename)

    if os.path.exists(filepath):
        print(f'Post already exists: {filepath}')
        sys.exit(0)

    os.makedirs(POSTS_DIR, exist_ok=True)
    safe_title = title.replace('"', '\\"')
    content = f"""---
layout: post
title: "{safe_title}"
date: {date_str}
youtube_id: {video_id}
---

{description}
"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'\nCreated: {filepath}')
    print('Next step: git add _posts/ && git commit -m "Add: {title}" && git push')


if __name__ == '__main__':
    main()
