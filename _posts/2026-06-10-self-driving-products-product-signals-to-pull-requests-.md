---
layout: post
title: "Self Driving Products: Product Signals to Pull Requests — Joshua Snyder, PostHog"
date: 2026-06-10
youtube_id: zMiSRliEzv4
channel: "AI Engineer"
tech_stack: "PostHog, LLM, embedding models, background agents, codebase, pull requests, error tracking, Slack, session replays."
---

## Overview
This video discusses the development of a pipeline by PostHog that automates the process of identifying and fixing errors, allowing developers to wake up to resolved issues instead of dashboards. The pipeline uses a background agent to group related errors and session replays, research the codebase, and open a pull request. This automation has the potential to significantly improve the efficiency of error resolution and reduce the workload of developers.

## Key Insights
- Off-the-shelf embedding models may not effectively cluster signals by meaning, requiring alternative approaches such as embedding LLM generated queries.
- Specificity is crucial in determining whether the agent produces a useful pull request or a random fix.
- Error tracking is immediately actionable, while Slack and session replay data often require additional context.
- Starting with agents, even if it seems expensive, can lead to the discovery of patterns that can be collapsed into more efficient one-shot calls.
- Running a problem through an agent multiple times can help identify patterns and optimize the process.

## Tech & Tools
PostHog, LLM, embedding models, background agents, codebase, pull requests, error tracking, Slack, session replays.

## Takeaway
The most important thing to know is that automating the process of identifying and fixing errors using a background agent and alternative embedding approaches can significantly improve the efficiency of error resolution and reduce developer workload.

---

## Description

A rage click, a 2am error spike, a customer Slack message — today each sits until a developer notices, triages, tickets, and writes a fix. PostHog is building a pipeline that collapses that chain: signal arrives, a background agent groups it with related errors and session replays, researches the codebase, and opens a PR. You wake up to green PRs instead of dashboards.

Three lessons from building it: off the shelf embedding models cluster signals by structural similarity rather than meaning, so errors land next to errors and Slack messages land next to Slack messages — the fix is to embed LLM generated queries rather than the signals themselves. Specificity determines whether the agent produces a useful PR or just fixes something at random; error tracking is immediately actionable, Slack and session replay usually are not. And start with agents even when it looks expensive — run the same problem through an agent 100 times, find the patterns, then collapse the expensive step into a one shot call.

Speaker info:
- https://x.com/joshsny
-https://www.linkedin.com/in/joshsny/
