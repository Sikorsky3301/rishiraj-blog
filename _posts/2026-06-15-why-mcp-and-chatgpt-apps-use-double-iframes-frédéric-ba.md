---
layout: post
title: "Why MCP and ChatGPT Apps Use Double Iframes — Frédéric Barthelet, Alpic"
date: 2026-06-15
youtube_id: c-2eEv2ou7Y
channel: "AI Engineer"
tech_stack: "MCP, ChatGPT, iframe, srcdoc, CSP, sandbox, allow-same-origin, Skybridge CSP inspector, localStorage, cookies, HTML."
---

## Overview
This video discusses the use of double iframes in MCP and ChatGPT apps, a technique that may seem unusual at first but is necessary for security reasons. Frédéric Barthelet explains the reasoning behind this approach and its implications for app development. Understanding this concept is crucial for AI engineers working with MCP and ChatGPT apps.

## Key Insights
- The use of a single iframe with `srcdoc` is not secure because it shares the parent origin, causing ChatGPT's Content Security Policy (CSP) to block third-party scripts.
- Relaxing the CSP would allow any app to read ChatGPT's localStorage and cookies, which is a significant security risk.
- Adding `sandbox` to the iframe removes origin-indexed storage, but adding `allow-same-origin` to restore it can lead to a classic sandbox escape.
- The double iframe approach serves a lightweight script from a controlled subdomain, which loads the actual app HTML into the inner frame, preventing cross-app storage collisions.
- This pattern requires every external domain touched by the view to be declared in the MCP app metadata.
- The Skybridge CSP inspector tool can be used to diff declared domains against actual network calls live in development.

## Tech & Tools
MCP, ChatGPT, iframe, srcdoc, CSP, sandbox, allow-same-origin, Skybridge CSP inspector, localStorage, cookies, HTML.

## Takeaway
The use of double iframes in MCP and ChatGPT apps is a necessary security measure that requires careful consideration of CSP, sandboxing, and origin-indexed storage to prevent security risks and ensure secure app development.

---

## Description

Inspect ChatGPT's DOM while an MCP app is rendering and you find an iframe nested inside another iframe. Frédéric Barthelet traces why each simpler approach fails: `srcdoc` shares the parent origin so ChatGPT's CSP blocks all third party scripts; relaxing that CSP lets any app read ChatGPT's localStorage and cookies; adding `sandbox` removes origin indexed storage; adding `allow-same-origin` to restore it is the classic sandbox escape. The double iframe is what remains after ruling all of that out.

The outer iframe serves one lightweight script from a controlled subdomain (different subdomain per app to prevent cross app storage collisions), which loads the actual app HTML via `srcdoc` into the inner frame — the same pattern Facebook first shipped for their app marketplace. The practical implication: every external domain your view touches must be declared in your MCP app metadata or the submission gets rejected. Barthelet demos Skybridge's CSP inspector, which diffs declared domains against actual network calls live in dev.

Speaker info:
- https://x.com/bartheletf
- https://www.linkedin.com/in/frederic-barthelet/
- https://github.com/fredericbarthelet
