---
layout: post
title: "Road to 5 Million Tokens: Breaking Barriers in Long Context Training — Max Ryabinin, Together AI"
date: 2026-06-08
youtube_id: TUnPNY4E2fw
---

Training a standard LLaMA 3B model with a 3 million token context on a single 8xH100 node fails before you even start: the model parameters alone exhaust GPU memory. Max Ryabinin from Together AI walks through the full stack of techniques needed to get there: fully sharded data parallelism, DeepSpeed Ulysses context parallelism for an 8x activation reduction, activation checkpointing for another 8x, CPU offloading for transformer block inputs, and chunked sequence training to avoid allocating buffers 3 million tokens wide.

Even that stack falls short at 5 million tokens. The novel contribution, Untied Ulysses, goes deeper into the context parallelism step: instead of allocating one large buffer per attention head group, it chunks the heads further and reuses those buffers across iterations, cutting activation memory with negligible throughput impact. At both 8B and 32B scale the results match the most memory optimized transformer training baselines while pushing sequence length 25% further than prior Ulysses implementations.

Speaker info:
- https://www.linkedin.com/in/max-ryabinin/
- https://x.com/m_ryabinin
