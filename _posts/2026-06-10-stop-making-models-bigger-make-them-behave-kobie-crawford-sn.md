---
layout: post
title: "Stop Making Models Bigger, Make Them Behave — Kobie Crawford, Snorkel"
date: 2026-06-10
youtube_id: TNwJ1LMiENk
---

Qwen 3 235B was asked for YouTube's year over year ad revenue growth from 2023 to 2024. It queried a table that didn't exist, tried again, got nothing back both times, and hallucinated an answer. The 4B model Snorkel finetuned with RL called `get_table_name` first, inspected the schema, ran a query, hit a column error, self-corrected, and got the right answer. The training run cost under $500.

Kobe Crawford covers why tool discipline matters more than reasoning depth for this class of tasks, how single table training transferred cleanly to harder multi table problems (13.9% to 26.6% on the FinQA reasoning benchmark), and why breaking evals into rubrics helps identify which specific behavior to fix before writing any training data.

Speaker info:
- https://www.linkedin.com/in/kobie-crawford
- https://snorkel.ai/author/kobie-crawford/
