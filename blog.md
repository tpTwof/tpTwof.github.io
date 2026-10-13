---
layout: default
title: "博客"
---

<div>
{% for tag in site.tags %}
	<h3>{{ tag[0] }}({{ tag[1].size }})</h3>
	<ul>
	{% for post in tag[1] %}
		<li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
	{% endfor %}
	</ul>
{% endfor %}
</div>

{% if site.tags.size == 0 %}
<p style="text-align:center; color:#999; padding:60px 0;">暂无文章，敬请期待...</p>
{% endif %}
