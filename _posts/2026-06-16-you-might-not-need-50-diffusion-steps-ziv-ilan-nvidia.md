---
layout: post
title: "You Might Not Need 50 Diffusion Steps — Ziv Ilan, Nvidia"
date: 2026-06-16
youtube_id: gHs5ZiY80PM
tech_stack: "NVIDIA, Blackwell B200, Flux 2, FastGen, Black Forest Labs, GPU sharding"
---

## Summary

Ziv Ilan's team at NVIDIA has made a significant breakthrough in optimizing video diffusion models, enabling real-time generation on a single Blackwell B200. The key to this achievement lies not in introducing a new architecture, but rather in streamlining the denoising process by reducing the number of diffusion steps. Ilan's approach combines quantization, caching, and step distillation to achieve this goal. By training a student model to match a teacher's output using fewer steps, the team was able to significantly reduce the computational requirements.

The team's approach involves dynamic quantization, which was developed in collaboration with Black Forest Labs on Flux 2. This quantization method allows for more efficient computation and is a crucial component of the optimized pipeline. Additionally, a caching method is used to skip recomputing latent chunks that barely change between denoising steps, further reducing computational overhead. The distillation approach is split into two categories: trajectory-based training, where the student model copies the teacher's exact path, and distribution-based training, where the student model only needs to produce the same output.

Ilan highlights the benefits of this approach, noting that the gains from quantization, caching, and distillation are additive. This means that each technique can be used independently or in combination to achieve the desired level of optimization. The NVIDIA open-source FastGen repo provides the necessary tools and frameworks to apply these optimizations at scale. By leveraging these techniques, developers can achieve significant speedups, ranging from 10 to 200 times, making real-time generation a feasible reality.

The implications of this breakthrough are substantial, as it enables the deployment of video diffusion models in a wide range of applications, from content creation to video conferencing. The ability to generate high-quality video in real-time can revolutionize the way we interact with visual content, and Ilan's team has taken a significant step towards making this a reality. As the field continues to evolve, it will be exciting to see how these optimizations are applied and further improved upon.

The presentation provides a detailed walkthrough of the technical stack and the optimizations used to achieve real-time generation. Ilan's explanation of the distillation approaches and the caching method provides valuable insights into the engineering decisions behind the optimized pipeline. The open-sourcing of the FastGen repo is a significant contribution to the community, as it provides a starting point for developers to explore and build upon these optimizations.

---

## Description

At GTC a few weeks ago, Ziv Ilan's team at NVIDIA got a video diffusion model generating in close to real time on a single Blackwell B200. The trick wasn't a new architecture, it was stripping out most of the fifty step denoising process diffusion models default to, by combining quantization, caching, and step distillation: training a student model to match a teacher's output using four steps, eight steps, or in some cases just one.

Ilan walks through each layer of that stack: dynamic quantization work done with Black Forest Labs on Flux 2, a caching method that skips recomputing latent chunks that barely change between denoising steps, and distillation approaches split into trajectory based training, where the student copies the teacher's exact path, and distribution based training, where it only has to land on the same output, now the more common and higher quality of the two. NVIDIA's open source FastGen repo packages the post training and GPU sharding work needed to apply all this at scale, and Ilan frames the gains as additive, quantization alone can be enough on its own, or you can stack it with caching and distillation to reach the ten to two hundred times speedup that real time generation needs.

Speaker info:
- https://www.linkedin.com/in/ziv-ilan-deci/
