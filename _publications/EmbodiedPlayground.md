---
title: "Embodied Playground: A Long-Horizon Agentic Robotics Benchmark for Physical, Strategic, and Spatial Reasoning"
collection: publications
layout: research-detail
short_title: "Embodied Playground"
authors: "Feng Chen†*, Pei Zhou*, Lixuan He*, Yunchao Yao*, Li Sun*, Shenghua Gao, Mingyu Ding, Kaifeng Zhang, Kaichen Zhou, Yi Ma"
author_note: "† Project leader; * Core contributor."
featured: true
research_topic: "Agentic Robotics"
project_url: "https://winniechen2002.github.io/Agent-bench-website/"
paperurl: "https://arxiv.org/abs/2610.27039"
permalink: /publication/EmbodiedPlayground
excerpt: "We test whether robotic agents can carry out a plan and adapt when an action changes the scene. Tasks range from rearranging a bookshelf to assembling an interlocking puzzle."
date: 2026-10-19
venue: "arXiv"
---

Embodied Playground contains 410 simulated environments. In a Tower of Hanoi task, for example, the robot has to plan a sequence of moves and follow the stacking rules at every step. Reaching the target arrangement only counts if the moves that got it there were legal.

For a smaller evaluation, we selected 100 tasks across five suites for **EP-100**. Each task has four starting conditions. The protocol specifies what an agent can observe and which tools it can use, and checks its actions as well as the final state.

The [benchmark code](https://github.com/Winniechen2002/Embodied-Playground) is available on GitHub.
