---
layout: post
title: "RAG is dead, right?? — Kuba Rogut, Turbopuffer"
date: 2026-06-09
youtube_id: UM6sFg_jdlE
tech_stack: "RAG, Vector Search, Full Text Search, Glob, Regex, Filters, Cursor, Claude Code, Embeddings, Jeff Dean's context windows and stage retrieval"
---

## Summary

The concept of RAG (Retrieval-Augmented Generation) has been a topic of discussion, with some claiming it is no longer relevant. However, Kuba Rogut argues that the problem was not with retrieval itself, but rather with the narrow definition of it. RAG is not just a simple vector search call, but rather a complex process that involves multiple search methods, including vector search, full text search, glob, regex, and filters, used iteratively by an agent. This process allows the agent to continue searching until it has found the necessary information.

The speaker highlights the difference between two approaches to search: Claude Code, which uses a grep-based approach with no indexing, and Cursor, which uses a one-time upfront indexing approach with lightweight tool calls at runtime. The Claude Code approach is not incorrect, but rather a deliberate tradeoff, as it depends on the query volume to determine whether to cache compute. This concept is also referred to as "embeddings as cached compute" by Kuba Rogut. The idea is that embeddings are a form of cached compute, and whether to cache depends on the query volume.

Kuba Rogut also references Jeff Dean's statement that "you do not need a trillion tokens at once, you need the right million." This highlights the importance of context windows and stage retrieval in the search process. The speaker also mentions that Cursor added semantic search and measured a significant increase in answer accuracy and code retention, as well as a drop in dissatisfied user requests. This suggests that the use of semantic search and indexing can lead to improved search results and user satisfaction.

The speaker's argument is that RAG is not dead, but rather evolving into a more complex and nuanced concept, which he refers to as "Agentic Retrieval." This involves the use of multiple search methods and iterative searching by an agent to find the necessary information. The speaker also notes that the Google search volume for RAG has increased significantly, indicating a growing interest in the topic. Overall, the speaker's argument highlights the importance of redefining RAG and understanding its evolution into a more complex and nuanced concept.

The key takeaway from the speaker's argument is that RAG is not a simple concept, but rather a complex process that involves multiple search methods and iterative searching. The use of semantic search, indexing, and caching can lead to improved search results and user satisfaction. The concept of embeddings as cached compute and the importance of context windows and stage retrieval are also crucial in understanding the evolution of RAG into Agentic Retrieval.

---

## Description

Cursor added semantic search and measured a 24% increase in answer accuracy on their composer model, a 2.6% gain in code retention in large codebases, and a 2.2% drop in dissatisfied user requests. Those numbers look small until you factor in that semantic search does not fire on every query. Meanwhile Google search volume for RAG hit a new inflection point in mid 2025 and went through the roof. The Twitter "RAG is dead" discourse and the actual usage curve are moving in opposite directions.

Kuba Rogut's argument is that the problem was never retrieval, it was the narrow definition of it. RAG is not just a vector search call. It is vector search, full text search, glob, regex, and filters used iteratively by an agent that keeps searching until it has what it needs. He contrasts Claude Code (grep per session, no index, repeat cost every run) with Cursor (one time upfront indexing, lightweight tool calls at runtime). Claude Code's approach is not wrong, it is a deliberate tradeoff. The frame that clarifies it: embeddings are cached compute, and whether to cache depends on query volume. Jeff Dean's version: you do not need a trillion tokens at once, you need the right million.

Speaker info:
- https://www.linkedin.com/in/kubarogut/
- https://x.com/rogutkuba

Timestamps:
0:00 Introduction to the "RAG is dead" discourse
1:12 Google search volume trends for RAG
1:39 Defining RAG vs. Agentic Search
3:15 Cursor's indexing and semantic search approach
6:10 Contrasting Claude Code (grep) vs. Cursor (indexed)
6:40 The concept of embeddings as cached compute
8:38 The shift from simple RAG to Agentic Retrieval
9:44 Jeff Dean on context windows and stage retrieval
