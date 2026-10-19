---
layout: library
title: "Publications"
permalink: /publications/
author_profile: false
---

<p class="collection-note">A selection of my work. See <a href="{{ site.author.googlescholar }}">Google Scholar</a> for the full publication list.</p>
<div class="publication-list">
{% assign papers = site.publications | sort: 'date' | reverse %}
{% for post in papers %}
{% include publication-card.html index=forloop.index %}
{% endfor %}
</div>
<p class="publication-author-note">* Equal contribution; † Project leader.</p>
