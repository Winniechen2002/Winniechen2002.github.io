---
layout: library
title: "Curriculum Vitae"
permalink: /cv/
excerpt: "Chen Feng — education, research experience, publications, honors, and professional service."
keywords: "Agentic Robotics, Dexterous Manipulation, Embodied Agents, Generative Simulation, Reinforcement Learning, Computer Vision"
author_profile: false
section_label: "Profile"
kicker: "PROFILE / EXPERIENCE & EXPLORATION"
redirect_from:
  - /resume
---

Ph.D. student at the **University of Hong Kong**, advised by **Prof. Yi Ma**, working on dexterous manipulation, generative robotic simulation, and embodied-agent evaluation. I build real robot systems and benchmarks that connect data collection, policy learning, perception, and closed-loop decision making.

<div class="cv-actions">
<a class="personal-button" href="{{ site.baseurl }}/files/Chen-Feng-CV.pdf" download>DOWNLOAD CV (PDF) <span aria-hidden="true">↓</span></a>
<a class="text-link" href="mailto:cf24@connect.hku.hk">cf24@connect.hku.hk <span aria-hidden="true">↗</span></a>
</div>

## Research interests

**Agentic Robotics**, dexterous manipulation, embodied agents, generative simulation, reinforcement learning, and computer vision.

## Education

### The University of Hong Kong

<p class="cv-date">Sept. 2024 - June 2028 (expected) · Hong Kong, China</p>

Ph.D., HKU Musketeers Foundation Institute of Data Science

### Tsinghua University (Yao Class)

<p class="cv-date">Sept. 2020 - June 2024 · Beijing, China</p>

B.S., Institute for Interdisciplinary Information Sciences

## Honors & awards

**Gold Medal, National Olympiad in Informatics (NOI 2019)** — ranked **25 / 600**.

## Research experience

### Sharpa

<p class="cv-date">June 2026 - Sept. 2026</p>

**Research Intern** · Mentor: Kaifeng Zhang

- Developed a simulation benchmark for LLM-based robotic agents, evaluating closed-loop perception, planning, and control under constrained observations and tool access.
- Designed evaluation protocols to assess task success, rule compliance, and physical validity across robotic manipulation tasks.

### University of Hong Kong

<p class="cv-date">Sept. 2024 - Present</p>

**Ph.D. Student** · Mentor: Yi Ma

- Co-proposed and led **DexHoldem**, a real-world Texas Hold'em embodied-system benchmark on ShadowHand/UR10e; built the data-collection infrastructure, maintained the hardware platform, and curated **1,470 teleoperated demonstrations across 14 card and chip primitives**.
- Designed DexHoldem's policy, perception, and system-level evaluations, including multi-view observations, **36 structured perception problems**, and closed-loop case studies linking scene parsing, action routing, and dexterous policy execution.
- Benchmarked pretrained and from-scratch dexterous policy families (π-series, RDT, diffusion policies, ACT, BAKU), analyzing task completion, scene preservation, data scaling, and real-world failure modes.
- Developed **GenDexHand**, a generative simulation pipeline for dexterous hands that synthesizes tasks, refines object placements/scales with VLM feedback, and decomposes tasks for sequential reinforcement learning.

### Tsinghua University

<p class="cv-date">Aug. 2023 - June 2024</p>

**Research Assistant** · Mentor: Huazhe Xu

- Designed a comprehensive evaluation framework for generative robotic simulations across quality, diversity, and generalization axes.
- Developed automatic LLM/VLM-based metrics for task realism and trajectory completeness, validated scores against human judgments, and identified low-generalization bottlenecks in current generative simulation pipelines.

### Massachusetts Institute of Technology

<p class="cv-date">Feb. 2023 - Aug. 2023</p>

**Visiting Student / Research Assistant** · Mentor: Joshua Tenenbaum

- Developed **DiffVL**, a vision-language-driven differentiable physics framework for soft-body manipulation, combining language-conditioned goals with visual observations.
- Built automated robot-task generation pipelines with vision models and LLMs for **RoboGen**; implemented rendering and simulation components for generative robot learning projects accepted at NeurIPS 2023 and ICML 2024.

## Publications

<ol class="cv-publications">
<li><strong>Feng Chen*†</strong>, Tianzhe Chu*, Li Sun*, Pei Zhou*, Zhuxiu Xu, Shenghua Gao, Yuexiang Zhai, Yanchao Yang, Yi Ma. <a href="https://arxiv.org/abs/2605.18727">DexHoldem: Playing Texas Hold'em with Dexterous Embodied System.</a> <em>arXiv:2605.18727, 2026.</em></li>
<li>Zhiao Huang*, <strong>Feng Chen*</strong>, Yewen Pu, Chunru Lin, Hao Su, Chuang Gan. <a href="{{ site.baseurl }}/publication/DiffVL">DiffVL: Scaling Up Soft Body Manipulation using Vision-Language Driven Differentiable Physics.</a> <em>NeurIPS, 2023.</em></li>
<li>Yufei Wang*, Zhou Xian*, <strong>Feng Chen*</strong>, Tsun-Hsuan Wang, Yian Wang, Katerina Fragkiadaki, Zackory Erickson, David Held, Chuang Gan. <a href="{{ site.baseurl }}/publication/RoboGen">RoboGen: Towards Unleashing Infinite Data for Automated Robot Learning via Generative Simulation.</a> <em>ICML, 2024.</em></li>
<li><strong>Feng Chen*</strong>, Zhuxiu Xu*, Tianzhe Chu, Xunzhe Zhou, Li Sun, Zewen Wu, Shenghua Gao, Zhongyu Li, Yanchao Yang, Yi Ma. <a href="https://arxiv.org/abs/2511.01791">GenDexHand: Generative Simulation for Dexterous Hands.</a></li>
<li><strong>Feng Chen*</strong>, Botian Xu*, Pu Hua, Peiqi Duan, Yanchao Yang, Yi Ma, Huazhe Xu. <a href="https://arxiv.org/abs/2410.08172">On the Evaluation of Generative Robotic Simulations.</a> <em>arXiv:2410.08172, 2024.</em></li>
<li>Genesis Authors. <strong>Genesis: A Universal and Generative Physics Engine for Robotics and Beyond.</strong></li>
<li>Li Sun, Jiefeng Wu, <strong>Feng Chen</strong>, Ruizhe Liu, Yanchao Yang. <strong>HyperTASR: Hypernetwork-Driven Task-Aware Scene Representations for Robust Manipulation.</strong> <em>CoRL, 2025.</em></li>
<li>Zhihan Cai, Kailu Wu, Dapeng Cao, <strong>Feng Chen</strong>, Kaisheng Ma. <strong>DRAFT: Direct Radiance Fields Editing with Composable Operations.</strong> <em>BMVC, 2024.</em></li>
</ol>

\* Equal contribution; † Project leader.

## Professional service

**Teaching Assistant** · Sept. 2025 - Dec. 2025<br>
HKU DATA8014: Principles of Deep Representation Learning

**Reviewer:** ICLR 2025, ICLR 2026, ICML 2025.

## Talks

<ul>
{% for post in site.talks %}
<li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> — {{ post.venue }}, {{ post.date | date: '%Y' }}.</li>
{% endfor %}
</ul>
