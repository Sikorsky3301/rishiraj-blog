---
layout: post
title: "Your Attention Is the Bottleneck, Not Your Agents — Zack Proser, WorkOS"
date: 2026-06-11
youtube_id: so9l_MwS2yg
tech_stack: "Slack, Linear, Git, JSONL, Oura ring, MCP, Claude, LTE"
---

## Summary

The talk by Zack Proser highlights the importance of optimizing human attention in AI development, rather than just focusing on agent scalability. He shares his personal experience of using four parallel agents, which led to him being overwhelmed by 11am, emphasizing the need to manage human attention. Proser proposes a sustainable stack for AI development, consisting of four layers: signal agents, verification gates, weekly agent runs, and holistic well-being. The signal agents are designed to read notifications from tools like Slack and Linear, allowing developers to avoid context switching and minimize distractions.

The verification gates play a crucial role in ensuring the quality and reliability of the code, with checks ranging from lint and build to browser click-through and critic passes. The weekly agent run analyzes the developer's conversation history to identify inefficiencies and generate missing skills, enabling continuous improvement. Additionally, Proser integrates an Oura ring with his system, allowing him to receive notifications about his well-being, such as sleep quality, and take proactive measures to maintain his productivity. The talk also covers the importance of voice-first flows, remote control, and safety testing gates in the proposed stack.

Proser's approach emphasizes the need for a balanced developer workflow, where human attention is optimized, and agents are utilized efficiently. The system self-improvement aspect, using conversation history, enables developers to identify areas for improvement and develop new skills. The Q&A session covers various topics, including skill development, managing JSONL history, and handling complex features. The talk provides valuable insights into optimizing human attention and creating a sustainable AI development workflow.

The key takeaways from the talk include the importance of managing human attention, optimizing agent utilization, and creating a balanced developer workflow. Proser's proposed stack offers a comprehensive approach to sustainable AI development, incorporating signal agents, verification gates, weekly agent runs, and holistic well-being. By adopting this approach, developers can minimize distractions, improve code quality, and maintain their productivity and well-being.

The talk highlights the potential of AI agents in streamlining development workflows and improving productivity. However, it also emphasizes the need for developers to be mindful of their attention and well-being, ensuring that they can work efficiently and effectively with AI agents. By leveraging the proposed stack and optimizing human attention, developers can unlock the full potential of AI agents and achieve a more sustainable and efficient development workflow.

---

## Description

Simon Willison fires up four parallel agents and is wiped out by 11am. That is the problem Zack Proser is solving: not that the tools are too slow but that human attention is still the hard constraint. His loop: voice brief at 184 words per minute, agent dispatched to an isolated git worktree, laptop closed, progress checked from a phone on LTE miles away via remote control.

The talk covers four layers that make this sustainable: signal agents that read Slack and Linear on a loop so you never open them yourself, verification gates from lint and build up to browser click through and critic passes, a weekly agent run over your JSONL conversation history to surface inefficiencies and generate missing skills, and an Oura ring connected via MCP so Claude can tell you that you did not sleep last night. You can ignore it. But at least you thought about it.

Speaker info:
- https://linkedin.com/in/zackproser
- https://github.com/zackproser

Timestamps:
0:00 Introduction and the problem of AI developer burnout
1:08 A concrete example of using AI agents for bug fixing
3:36 The bottleneck: human attention vs. infinite agent scalability
5:13 The proposed stack for sustainable AI development
6:03 The Signal Layer: Managing notifications and context switching
7:04 Voice-first flows for coding efficiency
8:15 The Shower Principle and Remote Control for agents
11:13 Safety, verification, and testing gates
12:05 The new, balanced developer workflow
13:22 System self-improvement using conversation history
15:31 Holistic well-being (Oura ring integration)
17:35 Q&amp;A: Addressing skill development early in a career
20:07 Q&amp;A: Managing JSONL history and long-term conversation logs
21:30 Q&amp;A: Night shift/background agent execution
22:17 Q&amp;A: Voice interaction and audio feedback
23:39 Q&amp;A: Handling complex, multi-stack features
