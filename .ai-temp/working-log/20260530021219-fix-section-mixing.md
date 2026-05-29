# 工作日志：修复板块混乱 + 404 错误处理

## 上次工作结果
- 完成 SPA 风格文章详情内联加载
- 新增 Blog 独立板块，blog→blog，works→works

## 本次工作目标
- 修复删除 issue 后文章仍显示、点击后 Loading 卡死的问题
- 修复新 issue 文章不显示的问题

## 根因分析

### Bug 1：删除文章点击后 Loading 卡死
`loadPostDetail` 中 `xhr.onload` 对非 200 状态的处理是 `return`，不更新 UI。
→ 文章 HTML 文件不存在时，用户看到 "Loading..." 永远不消失。

### Bug 2：数据同步
经核查 `postList.json`、Gmeek 默认列表、`docs/post/*.html` 三者数据一致。
被删除文章已经不在数据中。用户看到旧文章可能是浏览器缓存未更新。

## 修改内容

### 1. 修复 loadPostDetail 404 处理
```javascript
// 旧：静默 return，Loading 卡死
if (xhr.status !== 200 || !detailContent) return;

// 新：显示友好错误提示
if (!detailContent) return;
if (xhr.status !== 200) {
    detailContent.innerHTML = '<p class="post-error">Post not found (404). It may have been deleted.</p>';
    return;
}
```

### 2. 添加 postList.json 缓存破坏
```javascript
// 旧
xhr.open('GET', 'postList.json', true);

// 新：添加时间戳参数避免浏览器缓存
xhr.open('GET', 'postList.json?_=' + Date.now(), true);
```

### 修改的文件
1. `indexScript.js` — loadPostDetail 错误处理 + 缓存破坏
2. `docs/index.html` — 同步内联脚本修改
3. `config.json` — 通过 build-config.py 重新生成

## 预期结果
- 点击已删除文章 → 显示 "Post not found (404). It may have been deleted." 而非永久 Loading
- postList.json 每次加载都获取最新版本，不受浏览器缓存影响
- 新 issue 文章在 Gmeek action 构建后正常显示

## 实际结果
（待用户验证后回填）
