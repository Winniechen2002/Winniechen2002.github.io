---
layout: home
permalink: /
title: "Chen Feng"
excerpt: "Chen Feng (Winnie), a Ph.D. student at the University of Hong Kong working on robotics."
keywords: "Agentic Robotics, Robot Learning, Dexterous Manipulation, Generative Simulation"
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<section id="player-profile" class="home-hero" aria-labelledby="intro-title">
  <div class="hero-copy">
    <h1 id="intro-title">Chen Feng <span lang="zh-CN">陈枫</span></h1>
    <p class="hero-greeting">Hi there! You can also call me <strong>Winnie</strong>. I go by <strong>Winniechen</strong> online.</p>
    <p>I'm a Ph.D. student at the <strong>University of Hong Kong</strong>, advised by Professor Yi Ma. My research goal is to build a universal robot to solve productivity challenges.</p>
    <p>I graduated from the Institute for Interdisciplinary Information Sciences at <strong>Tsinghua University</strong>. I have conducted research at Tsinghua and was a visiting student working with robotics researchers at <strong>MIT</strong>.</p>
    <div class="hero-socials" aria-label="Academic and social profiles">
      <a href="mailto:cf24@connect.hku.hk">Email</a>
      <a href="{{ site.baseurl }}/cv/">CV</a>
      <a href="{{ site.author.googlescholar }}">Google Scholar</a>
      <a href="https://github.com/{{ site.author.github }}">GitHub</a>
      <a href="https://twitter.com/{{ site.author.twitter }}">Twitter / X</a>
      {% if site.author.redbook %}<a href="{{ site.author.redbook | escape }}" lang="zh-CN">小红书</a>{% endif %}
    </div>
  </div>
  <figure class="hero-portrait"><img src="{{ site.baseurl }}/images/{{ site.author.avatar }}" alt="Chen Feng wearing sunglasses outdoors" width="1280" height="1392" fetchpriority="high"></figure>
</section>

<div class="research-strip" aria-label="Research keywords"><span class="strip-label">Research interests</span><div class="research-keywords"><span>Agentic Robotics</span><span>Robot Learning</span><span>Dexterous Manipulation</span><span>Generative Simulation</span></div></div>

<section id="research" class="home-section" aria-labelledby="research-heading">
  <div class="section-heading--row"><h2 id="research-heading">Selected research</h2><a href="{{ site.baseurl }}/publications/">All publications →</a></div>
  <div class="research-list">
    {% assign selected_papers = site.publications | where: "featured", true | sort: "date" | reverse %}
    {% for paper in selected_papers %}
    <article class="research-entry">
      <div class="research-year">{% if paper.display_year %}{{ paper.display_year }}{% else %}{{ paper.date | date: "%Y" }}{% endif %}</div>
      <div class="research-body"><h3><a href="{{ site.baseurl }}{{ paper.url }}">{{ paper.short_title }}</a></h3><p>{{ paper.excerpt | markdownify | strip_html }}</p><div class="paper-links"><span>{{ paper.display_venue | default: paper.venue }}</span><a href="{{ paper.paperurl }}">Paper</a><a href="{{ paper.project_url }}">Project</a><a href="{{ site.baseurl }}{{ paper.url }}">Details</a></div></div>
    </article>
    {% endfor %}
  </div>
</section>

<section id="updates" class="home-section" aria-labelledby="news-heading">
  <h2 id="news-heading">News</h2>
  <div class="news-list">
    <div class="news-item"><time datetime="2026-05">May 2026</time><p><a href="https://dexholdem.github.io/">DexHoldem</a> is on arXiv.</p></div>
    <div class="news-item"><time datetime="2025-11">Nov 2025</time><p><a href="https://winniechen2002.github.io/GenDexHand/">GenDexHand</a> is on arXiv.</p></div>
    <div class="news-item"><time datetime="2024-10">Oct 2024</time><p><a href="{{ site.baseurl }}/publication/EvalTask">EvalTask</a> is on arXiv.</p></div>
    <div class="news-item"><time datetime="2024-09">Sep 2024</time><p>Started my Ph.D. at the University of Hong Kong.</p></div>
    <details class="earlier-news"><summary>Older updates</summary>
      <div class="news-item"><time datetime="2024-06">Jun 2024</time><p>Graduated from IIIS, Tsinghua University.</p></div>
      <div class="news-item"><time datetime="2024-05">May 2024</time><p><a href="{{ site.baseurl }}/publication/RoboGen">RoboGen</a> was accepted to ICML 2024.</p></div>
      <div class="news-item"><time datetime="2023-09">Sep 2023</time><p><a href="{{ site.baseurl }}/publication/DiffVL">DiffVL</a> was accepted to NeurIPS 2023.</p></div>
      <div class="news-item"><time datetime="2020-09">Sep 2020</time><p>Started my undergraduate studies at Tsinghua University.</p></div>
    </details>
  </div>
</section>

<section id="contact" class="home-section contact-section" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Say hello</h2>
  <p>If you're interested in chatting about robots, AI, research, cooking, Riot Games, the reason why we're here, or anything else, feel free to shoot me an email.</p>
  <div class="contact-addresses"><a href="mailto:cf24@connect.hku.hk">cf24@connect.hku.hk</a><a href="mailto:chenf20@tsinghua.org.cn">chenf20@tsinghua.org.cn</a><a href="mailto:winniechen315@qq.com">winniechen315@qq.com</a></div>
  <p>You can also <a href="{{ site.baseurl }}/game/">find me in a game</a>. <span lang="zh-CN">我们一起做一些有趣的事情吧！</span></p>
  <p class="personal-signoff">Love yourselves guys, the future is ours.</p>
</section>
