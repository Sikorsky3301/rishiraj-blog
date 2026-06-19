---
layout: post
title: "You Might Not Need 50 Diffusion Steps — Ziv Ilan, Nvidia"
date: 2026-06-16
youtube_id: gHs5ZiY80PM
---

At GTC a few weeks ago, Ziv Ilan's team at NVIDIA got a video diffusion model generating in close to real time on a single Blackwell B200. The trick wasn't a new architecture, it was stripping out most of the fifty step denoising process diffusion models default to, by combining quantization, caching, and step distillation: training a student model to match a teacher's output using four steps, eight steps, or in some cases just one.

Ilan walks through each layer of that stack: dynamic quantization work done with Black Forest Labs on Flux 2, a caching method that skips recomputing latent chunks that barely change between denoising steps, and distillation approaches split into trajectory based training, where the student copies the teacher's exact path, and distribution based training, where it only has to land on the same output, now the more common and higher quality of the two. NVIDIA's open source FastGen repo packages the post training and GPU sharding work needed to apply all this at scale, and Ilan frames the gains as additive, quantization alone can be enough on its own, or you can stack it with caching and distillation to reach the ten to two hundred times speedup that real time generation needs.

Speaker info:
- https://www.linkedin.com/in/ziv-ilan-deci/
