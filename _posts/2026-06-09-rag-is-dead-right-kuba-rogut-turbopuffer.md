---
layout: post
title: "RAG is dead, right?? — Kuba Rogut, Turbopuffer"
date: 2026-06-09
youtube_id: UM6sFg_jdlE
---

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
