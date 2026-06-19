---
layout: post
title: "Road to 5 Million Tokens: Breaking Barriers in Long Context Training — Max Ryabinin, Together AI"
date: 2026-06-08
youtube_id: TUnPNY4E2fw
tech_stack: "LLaMA, DeepSpeed, Ulysses, GPU, H100, CPU, transformer, activation checkpointing, chunked sequence training, Untied Ulysses, data parallelism, context parallelism"
---

## Summary

The video presentation by Max Ryabinin from Together AI discusses the challenges of training a standard LLaMA 3B model with a long context of 3 million tokens on a single 8xH100 node. The primary issue is that the model parameters alone exceed the available GPU memory, making it impossible to start training. To overcome this, Ryabinin presents a stack of techniques, including fully sharded data parallelism, DeepSpeed Ulysses context parallelism, activation checkpointing, CPU offloading for transformer block inputs, and chunked sequence training.

These techniques collectively reduce memory usage and enable training with longer contexts. However, even with this optimized stack, training at 5 million tokens remains unfeasible. To address this, Ryabinin introduces a novel contribution called Untied Ulysses, which further optimizes the context parallelism step. Instead of allocating one large buffer per attention head group, Untied Ulysses chunks the heads and reuses buffers across iterations, significantly reducing activation memory with minimal impact on throughput.

The results of Untied Ulysses are impressive, matching the most memory-optimized transformer training baselines while pushing sequence length 25% further than prior Ulysses implementations at both 8B and 32B scales. This achievement demonstrates the potential of Untied Ulysses to break barriers in long context training and enable more efficient and effective training of large language models. The presentation highlights the importance of innovative techniques and optimizations in overcoming the limitations of current hardware and training methodologies.

The key takeaway from the presentation is that achieving long context training requires a combination of advanced techniques and optimizations. By applying these methods, researchers and engineers can push the boundaries of what is possible with current hardware and enable the development of more powerful and capable language models. The success of Untied Ulysses demonstrates the value of continued innovation and research in this area, with potential applications in natural language processing, machine learning, and other fields.

The presentation by Max Ryabinin provides valuable insights into the challenges and opportunities of long context training, highlighting the importance of optimizing memory usage, reducing activation memory, and developing novel techniques to overcome current limitations. As the field continues to evolve, it is likely that further innovations and breakthroughs will emerge, enabling even more efficient and effective training of large language models and driving progress in AI research and applications.

---

## Description

Training a standard LLaMA 3B model with a 3 million token context on a single 8xH100 node fails before you even start: the model parameters alone exhaust GPU memory. Max Ryabinin from Together AI walks through the full stack of techniques needed to get there: fully sharded data parallelism, DeepSpeed Ulysses context parallelism for an 8x activation reduction, activation checkpointing for another 8x, CPU offloading for transformer block inputs, and chunked sequence training to avoid allocating buffers 3 million tokens wide.

Even that stack falls short at 5 million tokens. The novel contribution, Untied Ulysses, goes deeper into the context parallelism step: instead of allocating one large buffer per attention head group, it chunks the heads further and reuses those buffers across iterations, cutting activation memory with negligible throughput impact. At both 8B and 32B scale the results match the most memory optimized transformer training baselines while pushing sequence length 25% further than prior Ulysses implementations.

Speaker info:
- https://www.linkedin.com/in/max-ryabinin/
- https://x.com/m_ryabinin
