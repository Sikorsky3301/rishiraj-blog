---
layout: post
title: "Why Can't Anyone Answer Questions About the Business? — Garrett Galow, WorkOS"
date: 2026-06-11
youtube_id: iUWwcG-C8OU
---

Every business question that needs SQL follows the same loop: explain the question, wait for an engineer, get an answer, realize it needs one more join, share a one-off in Slack, repeat. Garrett Galow from WorkOS built Studio to break that loop — an internal workspace where anyone can ask questions against Snowflake, Linear, and Notion in natural language and get answers or reusable widgets without filing a request.

The widgets are the interesting part: the LLM writes them once as declarative JavaScript that calls the underlying data sources directly, so every subsequent run is deterministic and cheap. Three things made it reliable enough to hand to a support team. Preflight sequencing that injects schema context only at the moment a tool is invoked, not upfront, keeping the context window clean. A layering rule that explicitly tells the model to distrust its own knowledge about WorkOS and go to primary sources. And query validation that runs every generated Snowflake query before hardcoding it into a widget, catching the valid SQL that returns zero rows failure mode.

Speaker info:
- https://www.linkedin.com/in/garrett-galow/
