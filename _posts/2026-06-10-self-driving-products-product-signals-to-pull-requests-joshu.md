---
layout: post
title: "Self Driving Products: Product Signals to Pull Requests — Joshua Snyder, PostHog"
date: 2026-06-10
youtube_id: zMiSRliEzv4
---

A rage click, a 2am error spike, a customer Slack message — today each sits until a developer notices, triages, tickets, and writes a fix. PostHog is building a pipeline that collapses that chain: signal arrives, a background agent groups it with related errors and session replays, researches the codebase, and opens a PR. You wake up to green PRs instead of dashboards.

Three lessons from building it: off the shelf embedding models cluster signals by structural similarity rather than meaning, so errors land next to errors and Slack messages land next to Slack messages — the fix is to embed LLM generated queries rather than the signals themselves. Specificity determines whether the agent produces a useful PR or just fixes something at random; error tracking is immediately actionable, Slack and session replay usually are not. And start with agents even when it looks expensive — run the same problem through an agent 100 times, find the patterns, then collapse the expensive step into a one shot call.

Speaker info:
- https://x.com/joshsny
-https://www.linkedin.com/in/joshsny/
