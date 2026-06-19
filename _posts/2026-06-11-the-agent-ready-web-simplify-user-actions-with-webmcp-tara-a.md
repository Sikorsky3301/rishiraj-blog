---
layout: post
title: "The agent-ready web: Simplify user actions with WebMCP — Tara Agyemang, Google"
date: 2026-06-11
youtube_id: ghJmWQCIHRM
tech_stack: "WebMCP, HTML, JSON, JavaScript, DOM, Chrome, CLI, API"
---

## Summary

The concept of the agent-ready web, as introduced by Tara Agyemang from the Google Chrome team, aims to simplify user actions with the help of WebMCP, a proposed web standard. Currently, AI agents have to go through a complex process to perform tasks on a website, involving the entire DOM, accessibility tree, screenshot, pixel coordinate math, and a click that may miss its target. WebMCP replaces this process with structured tools, providing agents with a menu of named, typed, and described actions that can be called directly.

The proposed standard offers two implementation paths: the declarative API and the imperative API. The declarative API adds a few HTML attributes to existing forms, and the browser generates the JSON schema automatically. This approach simplifies the process of integrating WebMCP into existing websites. On the other hand, the imperative API allows developers to register custom tools in JavaScript for complex multi-step flows. The execute block runs normal DOM code and returns state back to the agent, providing more flexibility and control.

The live demo presented by Tara Agyemang showcases the potential of WebMCP, completing a concert ticket purchase in just three tool calls: search by name, open the concert page, and call purchase with quantity and section. Although WebMCP is still experimental and in early preview on Chrome 146, developers can start testing their own sites using the eval CLI and inspector extension. This early preview and the availability of testing tools demonstrate Google's commitment to making the web more agent-ready and simplifying user interactions.

The introduction of WebMCP has significant implications for the development of AI agents and their interactions with websites. By providing a standardized way for agents to interact with websites, WebMCP can improve the efficiency and accuracy of AI-powered tasks. As the web becomes increasingly agent-ready, we can expect to see more seamless and automated interactions between users, agents, and websites. The potential applications of WebMCP are vast, and its development is an exciting step forward in the evolution of the web.

The future of WebMCP looks promising, with ongoing development and testing. As more developers and websites adopt this proposed standard, we can expect to see significant improvements in the way AI agents interact with the web. With its potential to simplify user actions and improve the efficiency of AI-powered tasks, WebMCP is an important development in the field of AI engineering and web development. As the technology continues to evolve, it will be interesting to see how WebMCP is adopted and integrated into various applications and websites.

---

## Description

Buying two concert tickets costs an AI agent the entire DOM, the accessibility tree, a screenshot, pixel coordinate math, and then a click that might miss because an ad just loaded and shifted the layout. Tara Agyemang from the Google Chrome team introduces WebMCP, a proposed web standard that replaces that process with structured tools: instead of guessing what your site does, agents get a menu of named, typed, described actions they can call directly.

The talk covers two implementation paths. The declarative API adds a few HTML attributes to existing forms and the browser generates the JSON schema automatically. The imperative API lets you register custom tools in JavaScript for complex multi step flows, with an execute block that runs normal DOM code and returns state back to the agent. The live demo completes a concert ticket purchase in three tool calls: search by name, open the concert page, call purchase with quantity and section. Still experimental and in early preview on Chrome 146, but an eval CLI and inspector extension are available now for testing your own sites.

Speaker info:
- https://x.com/tara_ojo
- https://uk.linkedin.com/in/taraojo
- https://github.com/taraojo
