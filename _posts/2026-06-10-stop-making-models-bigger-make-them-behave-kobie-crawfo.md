---
layout: post
title: "Stop Making Models Bigger, Make Them Behave — Kobie Crawford, Snorkel"
date: 2026-06-10
youtube_id: TNwJ1LMiENk
channel: "AI Engineer"
tech_stack: "Qwen 3 235B, Snorkel, RL, FinQA reasoning benchmark, `get_table_name` function."
---

## Overview
This video features Kobie Crawford from Snorkel discussing the importance of making AI models behave correctly rather than simply increasing their size. Crawford highlights the limitations of large models, such as Qwen 3 235B, which can hallucinate answers due to a lack of discipline in their design. By focusing on tool discipline and behavior, Crawford demonstrates how smaller models can outperform larger ones in certain tasks.

## Key Insights
- The Qwen 3 235B model failed to retrieve the correct answer due to its inability to query the correct table and instead hallucinated a response.
- In contrast, a 4B model fine-tuned with RL by Snorkel was able to correctly retrieve the answer by calling `get_table_name`, inspecting the schema, and self-correcting after hitting a column error.
- Single table training can transfer cleanly to harder multi-table problems, as demonstrated by a 13.9% to 26.6% improvement on the FinQA reasoning benchmark.
- Breaking evaluations into rubrics helps identify specific behaviors to fix before writing any training data.
- The training run for the 4B model cost under $500, demonstrating the efficiency of this approach.
- Tool discipline matters more than reasoning depth for certain classes of tasks.

## Tech & Tools
Qwen 3 235B, Snorkel, RL, FinQA reasoning benchmark, `get_table_name` function.

## Takeaway
The most important thing to take away from this video is that focusing on tool discipline and making models behave correctly can be more effective than simply increasing their size, leading to better performance and efficiency in certain tasks.

---

## Description

Qwen 3 235B was asked for YouTube's year over year ad revenue growth from 2023 to 2024. It queried a table that didn't exist, tried again, got nothing back both times, and hallucinated an answer. The 4B model Snorkel finetuned with RL called `get_table_name` first, inspected the schema, ran a query, hit a column error, self-corrected, and got the right answer. The training run cost under $500.

Kobe Crawford covers why tool discipline matters more than reasoning depth for this class of tasks, how single table training transferred cleanly to harder multi table problems (13.9% to 26.6% on the FinQA reasoning benchmark), and why breaking evals into rubrics helps identify which specific behavior to fix before writing any training data.

Speaker info:
- https://www.linkedin.com/in/kobie-crawford
- https://snorkel.ai/author/kobie-crawford/
