---
layout: post
title: "Why MCP and ChatGPT Apps Use Double Iframes — Frédéric Barthelet, Alpic"
date: 2026-06-15
youtube_id: c-2eEv2ou7Y
tech_stack: "MCP, ChatGPT, iframe, srcdoc, CSP, sandbox, allow-same-origin, Skybridge's CSP inspector, Facebook, HTML, localStorage, cookies, GitHub, LinkedIn, x.com"
---

## Summary

The video by Frédéric Barthelet explores the reasoning behind the use of double iframes in MCP and ChatGPT apps. By inspecting the DOM of ChatGPT while an MCP app is rendering, it is observed that an iframe is nested inside another iframe. This approach is taken due to the limitations and security concerns of simpler methods. For instance, using `srcdoc` alone is not feasible as it shares the parent origin, causing ChatGPT's Content Security Policy (CSP) to block all third-party scripts.

The video delves into the issues that arise when attempting to relax the CSP or add `sandbox` attributes to the iframe. Relaxing the CSP would allow any app to read ChatGPT's localStorage and cookies, posing a significant security risk. On the other hand, adding `sandbox` removes origin-indexed storage, but adding `allow-same-origin` to restore it can lead to the classic sandbox escape. As a result, the double iframe approach is employed as a compromise. The outer iframe serves a lightweight script from a controlled subdomain, which then loads the actual app HTML into the inner frame via `srcdoc`.

This pattern, first used by Facebook for their app marketplace, has practical implications for developers. Every external domain that the view touches must be declared in the MCP app metadata; otherwise, the submission will be rejected. To facilitate this process, Barthelet demonstrates Skybridge's CSP inspector, which compares declared domains against actual network calls in real-time during development. This tool helps developers identify and resolve any discrepancies, ensuring that their apps comply with the required security standards.

The use of double iframes in MCP and ChatGPT apps highlights the importance of balancing security and functionality in web development. By understanding the technical limitations and trade-offs involved, developers can create more secure and efficient applications. The video provides valuable insights into the complexities of web security and the measures taken to protect user data. As the web continues to evolve, it is essential for developers to stay informed about the latest security best practices and technologies.

The presentation also underscores the value of tools like Skybridge's CSP inspector in streamlining the development process. By leveraging such tools, developers can identify potential security issues early on and ensure that their applications meet the required standards. As the web development landscape continues to shift, it is crucial for developers to stay up-to-date with the latest technologies and security measures to create robust and secure applications.

---

## Description

Inspect ChatGPT's DOM while an MCP app is rendering and you find an iframe nested inside another iframe. Frédéric Barthelet traces why each simpler approach fails: `srcdoc` shares the parent origin so ChatGPT's CSP blocks all third party scripts; relaxing that CSP lets any app read ChatGPT's localStorage and cookies; adding `sandbox` removes origin indexed storage; adding `allow-same-origin` to restore it is the classic sandbox escape. The double iframe is what remains after ruling all of that out.

The outer iframe serves one lightweight script from a controlled subdomain (different subdomain per app to prevent cross app storage collisions), which loads the actual app HTML via `srcdoc` into the inner frame — the same pattern Facebook first shipped for their app marketplace. The practical implication: every external domain your view touches must be declared in your MCP app metadata or the submission gets rejected. Barthelet demos Skybridge's CSP inspector, which diffs declared domains against actual network calls live in dev.

Speaker info:
- https://x.com/bartheletf
- https://www.linkedin.com/in/frederic-barthelet/
- https://github.com/fredericbarthelet
