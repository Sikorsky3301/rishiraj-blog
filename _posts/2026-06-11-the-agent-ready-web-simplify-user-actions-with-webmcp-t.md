---
layout: post
title: "The agent-ready web: Simplify user actions with WebMCP — Tara Agyemang, Google"
date: 2026-06-11
youtube_id: ghJmWQCIHRM
channel: "AI Engineer"
tech_stack: "WebMCP, HTML, JSON schema, JavaScript, DOM, Chrome 146, eval CLI, inspector extension."
---

## Overview
This video discusses WebMCP, a proposed web standard that simplifies user actions for AI agents by providing structured tools, and its potential to replace complex and error-prone processes. The speaker, Tara Agyemang, introduces the benefits and implementation paths of WebMCP, making it a crucial topic for AI engineers and web developers. By adopting WebMCP, developers can make their websites more agent-friendly and efficient.

## Key Insights
- WebMCP replaces the need for AI agents to parse the entire DOM, accessibility tree, and screenshot to perform actions.
- The declarative API adds HTML attributes to existing forms to generate JSON schema automatically.
- The imperative API allows registering custom tools in JavaScript for complex multi-step flows.
- WebMCP enables agents to call named, typed, and described actions directly, reducing errors and improving efficiency.
- A live demo showcases the completion of a concert ticket purchase in three tool calls using WebMCP.
- WebMCP is currently experimental and available in early preview on Chrome 146.

## Tech & Tools
WebMCP, HTML, JSON schema, JavaScript, DOM, Chrome 146, eval CLI, inspector extension.

## Takeaway
The most important thing to know is that WebMCP has the potential to revolutionize how AI agents interact with websites by providing a standardized and structured way to perform actions, making it easier to develop more efficient and agent-friendly web applications.

---

## Description

Buying two concert tickets costs an AI agent the entire DOM, the accessibility tree, a screenshot, pixel coordinate math, and then a click that might miss because an ad just loaded and shifted the layout. Tara Agyemang from the Google Chrome team introduces WebMCP, a proposed web standard that replaces that process with structured tools: instead of guessing what your site does, agents get a menu of named, typed, described actions they can call directly.

The talk covers two implementation paths. The declarative API adds a few HTML attributes to existing forms and the browser generates the JSON schema automatically. The imperative API lets you register custom tools in JavaScript for complex multi step flows, with an execute block that runs normal DOM code and returns state back to the agent. The live demo completes a concert ticket purchase in three tool calls: search by name, open the concert page, call purchase with quantity and section. Still experimental and in early preview on Chrome 146, but an eval CLI and inspector extension are available now for testing your own sites.

Speaker info:
- https://x.com/tara_ojo
- https://uk.linkedin.com/in/taraojo
- https://github.com/taraojo
