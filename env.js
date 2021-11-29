---
---

window.site = {
  "title": {{ site.title | jsonify }},
  "book_layouts": {{ site.book_layouts | jsonify }},
  "t": {{ site.data[site.lang] | jsonify }}
};

{%- capture results %}{% include results.html %}{% endcapture -%}
window.templates = {
  "results": {{ results | jsonify }}
};
