---
layout: post
title: "Self Driving Products: Product Signals to Pull Requests — Joshua Snyder, PostHog"
date: 2026-06-10
youtube_id: zMiSRliEzv4
tech_stack: "LLMs, embedding models, PostHog, Slack, GitHub (for PRs)"
---

## Summary

The video discusses PostHog's efforts to build a pipeline that automates the process of identifying and fixing errors in self-driving products. Currently, errors are manually identified, triaged, and fixed by developers, which can be a time-consuming process. PostHog's pipeline aims to collapse this chain by using a background agent that groups related errors and session replays, researches the codebase, and opens a pull request (PR). The speaker, Joshua Snyder, shares three key lessons learned from building this pipeline.

One of the key takeaways is that off-the-shelf embedding models may not be effective in clustering signals by meaning, but rather by structural similarity. To overcome this, PostHog uses Large Language Models (LLMs) to generate queries that are then embedded, allowing the agent to group signals by meaning. Another important lesson is that specificity is crucial in determining whether the agent produces a useful PR or just fixes something at random. The speaker notes that error tracking is immediately actionable, while Slack and session replay data may not be.

The third lesson learned is the importance of starting with agents, even if it seems expensive. By running the same problem through an agent multiple times, patterns can be identified, and the expensive step can be collapsed into a one-shot call. This approach allows for more efficient and effective automation of the error-fixing process. Overall, the video highlights the potential of using AI and automation to improve the development process and reduce the workload of developers.

The pipeline built by PostHog has the potential to revolutionize the way errors are identified and fixed in self-driving products. By automating the process, developers can focus on more complex and high-value tasks, rather than spending time on manual error fixing. The use of LLMs and embedding models also highlights the importance of natural language processing and machine learning in automation and AI.

The video provides valuable insights into the technical challenges and solutions involved in building an automated error-fixing pipeline. The lessons learned by PostHog can be applied to other areas of software development, highlighting the potential for AI and automation to improve efficiency and productivity.

---

## Description

A rage click, a 2am error spike, a customer Slack message — today each sits until a developer notices, triages, tickets, and writes a fix. PostHog is building a pipeline that collapses that chain: signal arrives, a background agent groups it with related errors and session replays, researches the codebase, and opens a PR. You wake up to green PRs instead of dashboards.

Three lessons from building it: off the shelf embedding models cluster signals by structural similarity rather than meaning, so errors land next to errors and Slack messages land next to Slack messages — the fix is to embed LLM generated queries rather than the signals themselves. Specificity determines whether the agent produces a useful PR or just fixes something at random; error tracking is immediately actionable, Slack and session replay usually are not. And start with agents even when it looks expensive — run the same problem through an agent 100 times, find the patterns, then collapse the expensive step into a one shot call.

Speaker info:
- https://x.com/joshsny
-https://www.linkedin.com/in/joshsny/
