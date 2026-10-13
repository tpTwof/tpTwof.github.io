---
layout: default
title: "博客"
---

<div id="index" class="row">
    <div class="post-area">
     	 <div class="post-list-body">
        <div post-cate="All">
        <ul class="posts">
	{% for post in site.posts %}
	<li>	
	<h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
	<span class="date">{{ post.date | date_to_string }}</span>
	
	<hr>
	<p>{% if post.excerpt.size > 32 %}{{ post.excerpt }}{% else %}{{ post.content | strip_html | strip_newlines | truncate: 160 }}{% endif %}</p>
		<p> <a href="{{ post.url }}"><span>阅读全文 &raquo; </span></a></p>
	<hr>
	</li>
	{% endfor %}
	</ul>
	</div>
	 </div>
</div>
</div>

{% if site.posts.size == 0 %}
<p style="text-align:center; color:#999; padding:60px 0;">暂无文章，敬请期待...</p>
{% endif %}
