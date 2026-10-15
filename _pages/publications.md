---
layout: library
title: "Publications"
permalink: /publications/
author_profile: false
section_label: "Research"
kicker: "RESEARCH / THE COLLECTION"
lede: "Exploring how robots learn, perceive, and act — from generative simulation to dexterous embodied systems."
---

<div class="collection-toolbar"><p><strong>{{ site.publications.size }}</strong> research projects <span>/ recent first</span></p><a class="text-link" href="{{ site.author.googlescholar }}">Google Scholar <span aria-hidden="true">↗</span></a></div>
<div class="publication-list">
{% assign papers = site.publications | sort: 'date' | reverse %}
{% for post in papers %}
{% include publication-card.html index=forloop.index %}
{% endfor %}
</div>
<div class="library-outro"><div><p class="eyebrow">BEHIND THE RESEARCH</p><h2>More about the journey.</h2><p>Research experience, collaborations, and the work along the way.</p></div><a class="outline-button" href="{{ site.baseurl }}/cv/">EXPLORE MY CV <span aria-hidden="true">↗</span></a></div>
