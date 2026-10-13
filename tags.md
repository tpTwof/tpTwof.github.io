---
layout: default
title: "标签"
---

<style>
/* ===== 标签气泡区域 ===== */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 30px 10px;
  justify-content: center;
}

.tag-bubble {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 25px;
  text-decoration: none;
  color: #555;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.04),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  transform: translateY(0);
  backdrop-filter: blur(4px);
}

.tag-bubble:hover, .tag-bubble.active {
  color: #333;
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-3px);
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
}

.tag-bubble:active {
  transform: translateY(1px);
  box-shadow:
    0 1px 4px rgba(0, 0, 0, 0.08),
    inset 0 1px 3px rgba(0, 0, 0, 0.06);
}

.tag-count {
  display: inline-block;
  margin-left: 6px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 1px 8px;
  font-size: 13px;
  color: #888;
}

.tags-empty {
  text-align: center;
  color: #999;
  padding: 60px 0;
  font-size: 16px;
}

/* ===== 标签文章列表区域 ===== */
.tag-posts-section {
  display: none;
  margin-top: 20px;
}

.tag-posts-section.visible {
  display: block;
}

.tag-posts-header {
  text-align: center;
  padding: 10px 0 20px;
}

.tag-posts-header h2 {
  display: inline-block;
  padding: 8px 24px;
  border-radius: 25px;
  color: #555;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.04),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  font-size: 20px;
  margin: 0;
}

.tag-back {
  text-align: center;
  margin-bottom: 20px;
}

.tag-back a {
  color: #888;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

.tag-back a:hover {
  text-decoration: underline;
}

.tag-posts-list {
  list-style: none;
  padding: 0;
}

.tag-posts-list li {
  padding: 18px 0;
  border-bottom: 1px solid #eee;
}

.tag-posts-list li:last-child {
  border-bottom: none;
}

.tag-posts-list h3 {
  margin: 0 0 6px;
  font-size: 20px;
}

.tag-posts-list h3 a {
  color: #333;
  text-decoration: none;
}

.tag-posts-list h3 a:hover {
  color: #555;
}

.tag-posts-list .date {
  color: #999;
  font-size: 13px;
}

.tag-posts-list p {
  color: #666;
  margin-top: 8px;
  line-height: 1.6;
}

.tag-posts-list .read-more {
  color: #888;
  text-decoration: none;
  font-size: 14px;
}

.tag-posts-list .read-more:hover {
  text-decoration: underline;
}
</style>

<!-- 标签气泡 -->
<div class="tags-container" id="tagsContainer">
{% if site.tags.size > 0 %}
  {% for tag in site.tags %}
    <a href="javascript:;" class="tag-bubble" data-tag="{{ tag[0] }}" onclick="showTagPosts('{{ tag[0] }}')">
      {{ tag[0] }}<span class="tag-count">{{ tag[1].size }}</span>
    </a>
  {% endfor %}
{% else %}
  <div class="tags-empty">暂无标签，写文章时添加 tags 字段即可生成标签</div>
{% endif %}
</div>

<!-- 标签文章列表（默认隐藏） -->
<div class="tag-posts-section" id="tagPostsSection">
  <div class="tag-posts-header">
    <h2 id="tagPostsTitle"></h2>
  </div>
  <div class="tag-back">
    <a onclick="hideTagPosts()">&larr; 返回所有标签</a>
  </div>
  <ul class="tag-posts-list" id="tagPostsList"></ul>
</div>

<!-- 预存所有标签的文章数据 -->
<script>
var tagPostsData = {
{% for tag in site.tags %}
  "{{ tag[0] }}": [
    {% for post in tag[1] %}
    {
      "title": {{ post.title | jsonify }},
      "url": "{{ post.url }}",
      "date": "{{ post.date | date_to_string }}",
      "excerpt": {{ post.content | strip_html | strip_newlines | truncate: 160 | jsonify }}
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]{% unless forloop.last %},{% endunless %}
{% endfor %}
};

function showTagPosts(tagName) {
  // 高亮当前标签
  var bubbles = document.querySelectorAll('.tag-bubble');
  bubbles.forEach(function(b) { b.classList.remove('active'); });
  event.target.closest('.tag-bubble').classList.add('active');

  // 填充文章列表
  var posts = tagPostsData[tagName] || [];
  var listHtml = '';
  posts.forEach(function(post) {
    listHtml += '<li>' +
      '<h3><a href="' + post.url + '">' + post.title + '</a></h3>' +
      '<span class="date">' + post.date + '</span>' +
      '<p>' + post.excerpt + '</p>' +
      '<a href="' + post.url + '" class="read-more">阅读全文 &raquo;</a>' +
      '</li>';
  });

  document.getElementById('tagPostsTitle').textContent = tagName;
  document.getElementById('tagPostsList').innerHTML = listHtml;

  // 切换显示
  document.getElementById('tagsContainer').style.display = 'none';
  document.getElementById('tagPostsSection').classList.add('visible');

  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideTagPosts() {
  document.getElementById('tagsContainer').style.display = 'flex';
  document.getElementById('tagPostsSection').classList.remove('visible');

  var bubbles = document.querySelectorAll('.tag-bubble');
  bubbles.forEach(function(b) { b.classList.remove('active'); });
}
</script>
