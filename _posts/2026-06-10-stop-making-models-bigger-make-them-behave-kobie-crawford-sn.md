---
layout: post
title: "Stop Making Models Bigger, Make Them Behave — Kobie Crawford, Snorkel"
date: 2026-06-10
youtube_id: TNwJ1LMiENk
tech_stack: "Qwen 3 235B, Snorkel, Reinforcement Learning (RL)"
---

## Summary

The video features Kobie Crawford from Snorkel, discussing the importance of tool discipline in AI model development. Crawford highlights the limitations of relying solely on increasing model size to improve performance, citing the example of Qwen 3 235B, which failed to provide an accurate answer to a query due to its inability to interact with the environment effectively. In contrast, a 4B model fine-tuned with reinforcement learning (RL) by Snorkel was able to successfully retrieve the correct answer by first querying the table name, inspecting the schema, running a query, and self-correcting when encountering a column error.

Crawford emphasizes that tool discipline is more crucial than reasoning depth for this class of tasks, where the ability to interact with the environment and adapt to new situations is essential. The Snorkel model's success can be attributed to its ability to break down complex tasks into manageable components, allowing it to transfer knowledge from single-table training to more challenging multi-table problems. This is evident in the model's performance on the FinQA reasoning benchmark, where it achieved a significant improvement from 13.9% to 26.6%.

The video also touches on the importance of evaluation metrics and the need to break down evaluations into rubrics to identify specific areas for improvement. By doing so, developers can pinpoint which behaviors need to be addressed before investing time and resources into creating new training data. This approach enables more efficient and targeted model development, as demonstrated by the Snorkel model's achievement of accurate results at a relatively low training cost of under $500.

Crawford's presentation offers valuable insights into the development of more effective and efficient AI models. By prioritizing tool discipline and leveraging techniques such as reinforcement learning, developers can create models that are better equipped to handle complex tasks and interact with their environment in a more adaptive and effective manner. The success of the Snorkel model serves as a testament to the potential of this approach, and its implications are likely to be felt across a range of applications and industries.

The key takeaways from the video are the importance of tool discipline, the value of breaking down evaluations into rubrics, and the potential of reinforcement learning to improve model performance. By adopting these strategies, developers can create more robust and effective AI models that are capable of handling complex tasks and providing accurate results, even in the face of uncertainty or incomplete information.

---

## Description

Qwen 3 235B was asked for YouTube's year over year ad revenue growth from 2023 to 2024. It queried a table that didn't exist, tried again, got nothing back both times, and hallucinated an answer. The 4B model Snorkel finetuned with RL called `get_table_name` first, inspected the schema, ran a query, hit a column error, self-corrected, and got the right answer. The training run cost under $500.

Kobe Crawford covers why tool discipline matters more than reasoning depth for this class of tasks, how single table training transferred cleanly to harder multi table problems (13.9% to 26.6% on the FinQA reasoning benchmark), and why breaking evals into rubrics helps identify which specific behavior to fix before writing any training data.

Speaker info:
- https://www.linkedin.com/in/kobie-crawford
- https://snorkel.ai/author/kobie-crawford/
