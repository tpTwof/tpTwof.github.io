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
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  background: linear-gradient(145deg, #6a82fb, #4a6cf7);
  box-shadow:
    0 4px 6px rgba(74, 108, 247, 0.3),
    0 8px 16px rgba(74, 108, 247, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
}

.tag-bubble:nth-child(3n+1) {
  background: linear-gradient(145deg, #f093fb, #d645e1);
  box-shadow:
    0 4px 6px rgba(214, 69, 225, 0.3),
    0 8px 16px rgba(214, 69, 225, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.tag-bubble:nth-child(3n+2) {
  background: linear-gradient(145deg, #4facfe, #00c6fb);
  box-shadow:
    0 4px 6px rgba(0, 198, 251, 0.3),
    0 8px 16px rgba(0, 198, 251, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.tag-bubble:nth-child(3n) {
  background: linear-gradient(145deg, #43e97b, #38c172);
  box-shadow:
    0 4px 6px rgba(56, 193, 114, 0.3),
    0 8px 16px rgba(56, 193, 114, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.tag-bubble:hover, .tag-bubble.active {
  transform: translateY(-4px);
  box-shadow:
    0 8px 12px rgba(0, 0, 0, 0.2),
    0 16px 24px rgba(0, 0, 0, 0.15),
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.tag-bubble:active {
  transform: translateY(1px);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

.tag-count {
  display: inline-block;
  margin-left: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1px 8px;
  font-size: 13px;
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
  color: #fff;
  background: linear-gradient(145deg, #6a82fb, #4a6cf7);
  box-shadow:
    0 4px 6px rgba(74, 108, 247, 0.3),
    0 8px 16px rgba(74, 108, 247, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.25),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  margin: 0;
}

.tag-back {
  text-align: center;
  margin-bottom: 20px;
}

.tag-back a {
  color: #4a6cf7;
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
  color: #4a6cf7;
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
  color: #4a6cf7;
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
