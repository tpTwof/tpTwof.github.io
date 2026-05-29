# 工作日志

## 上次工作结果
- 完成 Apple 风格改造，config.json 可读性优化
- 分离出 style.css、indexStyle.css、indexScript.js 源文件
- 创建 build-config.sh 构建脚本

## 本次工作目标
- 修复 Gmeek 渲染 bug

## 预期结果
1. 修复 `indexScript.js` 中 `postList.json` 数据格式不匹配问题（文章列表无法加载）
2. 修复博客文章页裸露 CSS 文本问题
3. 修复 `docs/index.html` 中无效的外部 CSS 引用
4. 同步更新 `config.json` 中的 minified 代码

## 实际结果

### Bug 1 修复：indexScript.js postList.json 解析
- `renderSections()` 重写为处理实际 JSON 格式：
  - 遍历对象键（跳过 `labelColorDict`）而非数组
  - 使用 `post.postTitle`、`post.postUrl`、`post.createdDate` 字段名
  - `labels` 为字符串数组，颜色从 `labelColorDict` 映射
- 同步更新 `config.json` 中的 `indexScript` 字段

### Bug 2 修复：博客文章页裸露 CSS 文本
- `config.json` 的 `style` 字段精简为仅全局样式（body、links、scrollbar、selection）
- 所有布局相关 CSS 移至 `indexStyle` 字段（含 `#header{display:none}` 和 `#footer{display:none}`）
- 同步更新源文件：`style.css`（仅全局）、`indexStyle.css`（含 header/footer 隐藏）

### Bug 3 修复：docs/index.html CSS 引用
- 移除无效的 `<link rel="stylesheet" href="../layout.css" />` 引用
- 将完整布局 CSS 内联到 `<style>` 块中，使文件自包含

### 修改的文件
1. `indexScript.js` — 修复 postList.json 解析逻辑
2. `config.json` — 更新 style、indexStyle、indexScript 字段
3. `style.css` — 精简为仅全局样式
4. `indexStyle.css` — 添加 #header/#footer 隐藏规则
5. `docs/index.html` — 移除外部 CSS 引用，内联完整样式
