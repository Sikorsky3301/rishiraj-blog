---
layout: post
title: "Why Can't Anyone Answer Questions About the Business? — Garrett Galow, WorkOS"
date: 2026-06-11
youtube_id: iUWwcG-C8OU
channel: "AI Engineer"
tech_stack: "Snowflake, Linear, Notion, JavaScript, LLMs."
---

## Overview
This video features Garrett Galow from WorkOS discussing the challenges of answering business questions that require SQL and how his team built Studio to address this issue. Studio is an internal workspace that allows anyone to ask questions in natural language and receive answers or reusable widgets without needing to file a request. This solution has the potential to increase efficiency and reduce the burden on engineers.

## Key Insights
- The traditional loop of explaining a question, waiting for an engineer, and refining the answer can be broken with a more automated approach.
- Studio uses natural language processing to generate declarative JavaScript that calls underlying data sources directly, making subsequent runs deterministic and cheap.
- Preflight sequencing, layering rules, and query validation are used to ensure the reliability of the generated widgets.
- The layering rule explicitly tells the model to distrust its own knowledge and go to primary sources, such as Snowflake, Linear, and Notion.
- Query validation catches valid SQL that returns zero rows, a common failure mode.
- The use of large language models (LLMs) enables the generation of reusable widgets that can be used by non-technical teams.

## Tech & Tools
Snowflake, Linear, Notion, JavaScript, LLMs.

## Takeaway
The most important thing to know is that it's possible to build an internal workspace like Studio that allows non-technical teams to ask business questions in natural language and receive reliable, reusable answers without needing to file a request, by leveraging large language models and careful validation techniques.

---

## Description

Every business question that needs SQL follows the same loop: explain the question, wait for an engineer, get an answer, realize it needs one more join, share a one-off in Slack, repeat. Garrett Galow from WorkOS built Studio to break that loop — an internal workspace where anyone can ask questions against Snowflake, Linear, and Notion in natural language and get answers or reusable widgets without filing a request.

The widgets are the interesting part: the LLM writes them once as declarative JavaScript that calls the underlying data sources directly, so every subsequent run is deterministic and cheap. Three things made it reliable enough to hand to a support team. Preflight sequencing that injects schema context only at the moment a tool is invoked, not upfront, keeping the context window clean. A layering rule that explicitly tells the model to distrust its own knowledge about WorkOS and go to primary sources. And query validation that runs every generated Snowflake query before hardcoding it into a widget, catching the valid SQL that returns zero rows failure mode.

Speaker info:
- https://www.linkedin.com/in/garrett-galow/
