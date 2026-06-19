---
layout: post
title: "The Production AI Playbook: Deploying Agents at Enterprise Scale — Sandipan Bhaumik, Databricks"
date: 2026-06-18
youtube_id: ObTPqBGsEbA
tech_stack: "None"
---

## Summary

The video discusses the challenges of deploying AI agents at an enterprise scale, citing the example of a retail bank that spent £85,000 on a chatbot proof of concept that failed to reach production. The speaker, Sandipan Bhaumik, shares his experience of rescuing the project by identifying the key issues and implementing a structured approach. He emphasizes the importance of defining success numerically before starting to code and having a robust evaluation framework in place.

The talk highlights the five pillars of deploying AI agents at scale, which include evaluation, observability, data foundation, multi-agent orchestration patterns, and governance. The speaker stresses that evaluation is not a one-time activity, but rather a continuous process that requires a living system of data. He also emphasizes the need for observability, citing the example of European regulators requiring tracing of every agent decision. Additionally, he highlights the importance of a strong data foundation, as AI agents are less forgiving of bad data than humans.

The speaker shares his experience of working with the retail bank, where his team was able to identify the cause of the chatbot's failure using a tracing system. The system revealed that the new policy document had not been reembedded, causing the agent to serve stale answers. This example illustrates the importance of having a robust production incident playbook that connects all five pillars. The speaker also mentions that his team caught 47 PII breaches during testing, highlighting the importance of governance in AI deployments.

The talk provides valuable insights for AI engineers and practitioners looking to deploy AI agents at scale. The speaker's experience and the five pillars he outlines provide a framework for ensuring the successful deployment of AI agents. By emphasizing the importance of evaluation, observability, data foundation, multi-agent orchestration patterns, and governance, the speaker provides a comprehensive approach to deploying AI agents that can be applied to a wide range of industries and use cases.

The key takeaway from the talk is that deploying AI agents at scale requires a structured approach that prioritizes evaluation, observability, data foundation, multi-agent orchestration patterns, and governance. By following these five pillars, AI engineers and practitioners can ensure the successful deployment of AI agents and avoid common pitfalls such as poor data quality and lack of transparency. The talk provides a valuable resource for anyone looking to deploy AI agents at scale and achieve meaningful business outcomes.

---

## Description

A retail bank spent £85,000 over six months on a chatbot PoC that could not reach production. No one could explain why it was failing. When Sandipan Bhaumik's team got involved, they picked the model in week seven of an eight-week engagement — the first six weeks went to evaluation data, tracing infrastructure, and a measurement pipeline. Six weeks post launch, when the bank updated its interest rate policy and customer satisfaction dropped, the tracing system caught the cause: the new policy document had not been reembedded and the agent was serving stale answers.

The talk covers the five pillars he built from that and similar engagements: evaluation (define success numerically before touching code), observability (trace every agent decision — European regulators require it), data foundation (agents do not forgive bad data the way humans do), multi agent orchestration patterns, and governance (47 PII breaches caught in testing before launch). The evaluation data set is a living system, not a fixed benchmark. The production incident playbook connects all five.

Speaker info:
- https://www.linkedin.com/in/sandipanbhaumik
