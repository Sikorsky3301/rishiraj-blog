#!/usr/bin/env python3
"""
Runs via GitHub Actions every 6 hours.
Reads YOUTUBE_RSS_URL from env, creates a _posts/*.md file for each new video.
"""
import feedparser
import os
import re
from datetime import datetime

FEED_URL = os.environ.get('YOUTUBE_RSS_URL', '')
POSTS_DIR = '_posts'


def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')[:60]


def main():
    if not FEED_URL:
        print('Error: YOUTUBE_RSS_URL secret is not set.')
        return

    os.makedirs(POSTS_DIR, exist_ok=True)
    feed = feedparser.parse(FEED_URL)

    if not feed.entries:
        print('No entries found in feed.')
        return

    new_count = 0
    for entry in feed.entries:
        video_id = entry.get('yt_videoid', '')
        if not video_id:
            continue

        title = entry.title
        published = entry.published          # "2024-06-19T15:30:00+00:00"
        description = entry.get('summary', '')

        date_str = published[:10]            # "YYYY-MM-DD"
        slug = slugify(title)
        filename = f'{date_str}-{slug}.md'
        filepath = os.path.join(POSTS_DIR, filename)

        if os.path.exists(filepath):
            continue

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
        print(f'Created: {filename}')
        new_count += 1

    print(f'Done — {new_count} new post(s) created.')


if __name__ == '__main__':
    main()
