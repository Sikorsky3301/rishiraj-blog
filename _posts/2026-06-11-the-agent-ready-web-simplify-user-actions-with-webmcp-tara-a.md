---
layout: post
title: "The agent-ready web: Simplify user actions with WebMCP — Tara Agyemang, Google"
date: 2026-06-11
youtube_id: ghJmWQCIHRM
---

Buying two concert tickets costs an AI agent the entire DOM, the accessibility tree, a screenshot, pixel coordinate math, and then a click that might miss because an ad just loaded and shifted the layout. Tara Agyemang from the Google Chrome team introduces WebMCP, a proposed web standard that replaces that process with structured tools: instead of guessing what your site does, agents get a menu of named, typed, described actions they can call directly.

The talk covers two implementation paths. The declarative API adds a few HTML attributes to existing forms and the browser generates the JSON schema automatically. The imperative API lets you register custom tools in JavaScript for complex multi step flows, with an execute block that runs normal DOM code and returns state back to the agent. The live demo completes a concert ticket purchase in three tool calls: search by name, open the concert page, call purchase with quantity and section. Still experimental and in early preview on Chrome 146, but an eval CLI and inspector extension are available now for testing your own sites.

Speaker info:
- https://x.com/tara_ojo
- https://uk.linkedin.com/in/taraojo
- https://github.com/taraojo
