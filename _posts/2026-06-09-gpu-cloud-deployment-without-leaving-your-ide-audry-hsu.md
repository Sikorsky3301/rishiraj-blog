---
layout: post
title: "GPU Cloud Deployment Without Leaving Your IDE — Audry Hsu, RunPod"
date: 2026-06-09
youtube_id: zDGHt0LB-dA
channel: "AI Engineer"
tech_stack: "Python, Docker, GPU cloud, @flash.endpoint decorator, Qwen 3, DreamShaper, Nano Banana 2, H100 GPU, RunPod."
---

## Overview
This video features Audry Hsu from RunPod demonstrating a streamlined approach to deploying GPU cloud applications directly from an IDE, eliminating the need for manual iteration cycles. The solution utilizes a single decorator to deploy and manage models, making it a significant improvement for AI engineers. This approach has the potential to greatly simplify the development and deployment process for AI applications.

## Key Insights
- The traditional iteration cycle for deploying AI models involves multiple steps, including committing, pushing, building a Docker image, and allocating a GPU.
- The `@flash.endpoint` decorator can be used to deploy an async Python function to the GPU cloud from an IDE with hot reload capabilities.
- The solution supports chaining multiple models together, as demonstrated with Qwen 3, DreamShaper, and Nano Banana 2.
- Pricing for the H100 GPU is $0.00116 per second, with costs only incurred when a worker is handling a request.
- RunPod recommends starting with pods for experimentation and switching to serverless when hundreds of workers are needed for autoscaling.

## Tech & Tools
Python, Docker, GPU cloud, @flash.endpoint decorator, Qwen 3, DreamShaper, Nano Banana 2, H100 GPU, RunPod.

## Takeaway
The most important thing to know from this video is that AI engineers can now deploy and manage GPU cloud applications directly from their IDE using a single decorator, greatly simplifying the development and deployment process.

---

## Description

The iteration cycle before Flash: commit, push, build a Docker image, pull it from the registry, load it onto a server, allocate a GPU, then find out if it works. Audrey Hsu demos what replacing that with a single decorator looks like — add `@flash.endpoint` to an async Python function and it deploys to GPU cloud from your IDE, with hot reload so a model swap is one line of code rather than a container rebuild.

The second demo chains three models: Qwen 3 generates image prompts, DreamShaper renders them, Nano Banana 2 composes the results into a single photo. H100 pricing is $0.00116 per second, charged only while a worker is handling a request. RunPod's recommendation: start with pods while experimenting, switch to serverless when you need hundreds of workers autoscaling across data centers.

Speaker info:
- https://www.linkedin.com/in/audry-hsu/
