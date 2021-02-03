---
layout: default
---

The books in the Keywords series collect essays by authors across the humanities and social sciences, with each essay focusing on a single term and set of debates.  The Keywords website provides access to online essays selected from each of the volumes, as well as preview text for all of the print-only essays. [Read More...]({{ 'about-this-site' | absolute_url }})

{% for book in site.books %}
  <article class="selfclearing site-list">
    <a href="{{ book.url | absolute_url }}">
      <img src="{{ book.img | absolute_url }}" alt="Image for {{ book.title }}" />
    </a>
    <div class="site-details">
      <h1><a href="{{ book.url | absolute_url }}">{{ book.title }}</a></h1>
      <span>Edited by
        {% for editor in book.editors %}
          <a href="{{ editor.link }}">{{ editor.name }}</a>{% unless forloop.last %}, {% endunless %}
        {% endfor %}
      </span>
      {% if book._date %}<span>Date: {{ book._date }}</span>{% endif %}
    </div>
  </article>
{% endfor %}
