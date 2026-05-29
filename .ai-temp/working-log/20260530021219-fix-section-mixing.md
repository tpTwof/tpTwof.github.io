# 工作日志：修复板块混乱问题

## 上次工作结果
- 完成 SPA 风格文章详情内联加载（点击文章 → 右侧主页面显示内容）
- 导航切换正常，postList.json 动态渲染

## 本次工作目标
- 修复 issue 添加的新 blog 文章不显示在对应位置的问题
- 板块之间不混乱：blog 文章和 works 文章各自归属独立板块

## 完成内容

### 根因分析
`labelMap` 将 `blog` 标签文章映射到 `about-section`（About Me），导致博客文章和个人介绍共处一个板块。`works` 标签映射正确。

根本问题：缺少独立的 Blog 板块。

### 修改内容

1. **新增 Blog 导航项** — 左侧边栏新增 "Blog" 菜单（含文档图标 SVG），位于 About Me 和 Skills 之间
2. **新增 blog-section** — 右侧主内容区新增 `#blog-section`，用于承载 blog 标签文章
3. **修正 labelMap** — `{ 'blog': 'blog', 'works': 'works' }`，各自进入独立板块
4. **更新 pageMeta** — 新增 Blog 页面的标题和简介文案
5. **about-section 精简** — 仅保留个人介绍静态内容，不再承载博客文章

### 修改的文件
1. `indexScript.js` — Gmeek 模式布局创建 + nav + labelMap + pageMeta
2. `docs/index.html` — 内联脚本同步更新
3. `config.json` — 通过 build-config.py 重新生成

## 板块结构（修改后）
| 导航项 | Section ID | 内容 |
|---|---|---|
| About Me | about-section | 个人介绍（静态） |
| Blog | blog-section | blog 标签文章（postList.json） |
| What I'm good at | skills-section | 技能标签（静态） |
| My Work | works-section | works 标签文章（postList.json） |
| Contact Me | contact-section | 联系表单（静态） |

## 预期结果
- 5 个导航项各自对应独立板块，内容不混
- blog 标签文章只出现在 Blog 板块
- works 标签文章只出现在 My Work 板块
- 导航切换时标题和简介同步更新

## 实际结果
（待用户验证后回填）
