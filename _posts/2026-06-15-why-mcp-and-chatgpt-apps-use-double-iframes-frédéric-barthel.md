---
layout: post
title: "Why MCP and ChatGPT Apps Use Double Iframes — Frédéric Barthelet, Alpic"
date: 2026-06-15
youtube_id: c-2eEv2ou7Y
---

Inspect ChatGPT's DOM while an MCP app is rendering and you find an iframe nested inside another iframe. Frédéric Barthelet traces why each simpler approach fails: `srcdoc` shares the parent origin so ChatGPT's CSP blocks all third party scripts; relaxing that CSP lets any app read ChatGPT's localStorage and cookies; adding `sandbox` removes origin indexed storage; adding `allow-same-origin` to restore it is the classic sandbox escape. The double iframe is what remains after ruling all of that out.

The outer iframe serves one lightweight script from a controlled subdomain (different subdomain per app to prevent cross app storage collisions), which loads the actual app HTML via `srcdoc` into the inner frame — the same pattern Facebook first shipped for their app marketplace. The practical implication: every external domain your view touches must be declared in your MCP app metadata or the submission gets rejected. Barthelet demos Skybridge's CSP inspector, which diffs declared domains against actual network calls live in dev.

Speaker info:
- https://x.com/bartheletf
- https://www.linkedin.com/in/frederic-barthelet/
- https://github.com/fredericbarthelet
