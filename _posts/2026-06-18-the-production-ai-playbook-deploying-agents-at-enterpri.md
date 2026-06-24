---
layout: post
title: "The Production AI Playbook: Deploying Agents at Enterprise Scale — Sandipan Bhaumik, Databricks"
date: 2026-06-18
youtube_id: ObTPqBGsEbA
channel: "AI Engineer"
tech_stack: "None"
---

## Overview
This video discusses the importance of deploying AI agents at enterprise scale, highlighting a case study where a retail bank's chatbot PoC failed to reach production despite significant investment. The speaker, Sandipan Bhaumik, shares his experience and the lessons learned from similar engagements. The talk focuses on the five pillars of a production AI playbook, which are crucial for successful AI agent deployment.

## Key Insights
- Evaluation is a critical step that defines success numerically before touching code
- Observability is required to trace every agent decision, especially in regulated industries like finance
- A robust data foundation is necessary because agents are less forgiving of bad data than humans
- Multi-agent orchestration patterns are essential for complex AI systems
- Governance is vital to prevent data breaches, with 47 PII breaches caught in testing before launch in the given example

## Tech & Tools
None

## Takeaway
The single most important thing a viewer should walk away knowing is that a well-structured production AI playbook, covering evaluation, observability, data foundation, multi-agent orchestration, and governance, is essential for successfully deploying AI agents at enterprise scale.

---

## Description

A retail bank spent £85,000 over six months on a chatbot PoC that could not reach production. No one could explain why it was failing. When Sandipan Bhaumik's team got involved, they picked the model in week seven of an eight-week engagement — the first six weeks went to evaluation data, tracing infrastructure, and a measurement pipeline. Six weeks post launch, when the bank updated its interest rate policy and customer satisfaction dropped, the tracing system caught the cause: the new policy document had not been reembedded and the agent was serving stale answers.

The talk covers the five pillars he built from that and similar engagements: evaluation (define success numerically before touching code), observability (trace every agent decision — European regulators require it), data foundation (agents do not forgive bad data the way humans do), multi agent orchestration patterns, and governance (47 PII breaches caught in testing before launch). The evaluation data set is a living system, not a fixed benchmark. The production incident playbook connects all five.

Speaker info:
- https://www.linkedin.com/in/sandipanbhaumik
