---
layout: post
title: "The Production AI Playbook: Deploying Agents at Enterprise Scale — Sandipan Bhaumik, Databricks"
date: 2026-06-18
youtube_id: ObTPqBGsEbA
---

A retail bank spent £85,000 over six months on a chatbot PoC that could not reach production. No one could explain why it was failing. When Sandipan Bhaumik's team got involved, they picked the model in week seven of an eight-week engagement — the first six weeks went to evaluation data, tracing infrastructure, and a measurement pipeline. Six weeks post launch, when the bank updated its interest rate policy and customer satisfaction dropped, the tracing system caught the cause: the new policy document had not been reembedded and the agent was serving stale answers.

The talk covers the five pillars he built from that and similar engagements: evaluation (define success numerically before touching code), observability (trace every agent decision — European regulators require it), data foundation (agents do not forgive bad data the way humans do), multi agent orchestration patterns, and governance (47 PII breaches caught in testing before launch). The evaluation data set is a living system, not a fixed benchmark. The production incident playbook connects all five.

Speaker info:
- https://www.linkedin.com/in/sandipanbhaumik
