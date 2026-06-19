---
layout: post
title: "GPU Cloud Deployment Without Leaving Your IDE — Audry Hsu, RunPod"
date: 2026-06-09
youtube_id: zDGHt0LB-dA
---

The iteration cycle before Flash: commit, push, build a Docker image, pull it from the registry, load it onto a server, allocate a GPU, then find out if it works. Audrey Hsu demos what replacing that with a single decorator looks like — add `@flash.endpoint` to an async Python function and it deploys to GPU cloud from your IDE, with hot reload so a model swap is one line of code rather than a container rebuild.

The second demo chains three models: Qwen 3 generates image prompts, DreamShaper renders them, Nano Banana 2 composes the results into a single photo. H100 pricing is $0.00116 per second, charged only while a worker is handling a request. RunPod's recommendation: start with pods while experimenting, switch to serverless when you need hundreds of workers autoscaling across data centers.

Speaker info:
- https://www.linkedin.com/in/audry-hsu/
