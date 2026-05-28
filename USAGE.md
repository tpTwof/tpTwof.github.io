# Gmeek 博客使用指南

## 目录

- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [修改个人信息](#修改个人信息)
- [修改样式](#修改样式)
- [发布文章](#发布文章)
- [配置字段参考](#配置字段参考)
- [常见问题](#常见问题)

---

## 项目结构

```
tpTwof.github.io/
├── .github/workflows/
│   └── Gmeek.yml          # GitHub Actions 构建配置
├── .ai-temp/               # AI 工作日志（可忽略）
├── docs/                   # 生成的博客页面（勿手动修改）
├── backup/                 # 文章备份
├── config.json             # 博客配置文件（核心）
├── style.css               # 全局样式源文件
├── indexStyle.css           # 首页样式源文件
├── indexScript.js           # 首页脚本源文件
├── build-config.sh          # 构建脚本（合并CSS/JS到config.json）
└── USAGE.md                 # 本使用指南
```

---

## 快速开始

### 1. 修改个人信息

编辑 `indexScript.js`，找到对应位置修改：

```javascript
// 改名字
<h1 class="profile-name">你的名字</h1>

// 改一句话介绍
<p class="profile-bio">你的一句话介绍</p>

// 改详细描述
<p class="profile-desc">你的详细介绍...</p>

// 改头像（替换URL）
<img src="你的头像URL" alt="avatar" class="profile-avatar">

// 改链接
<a href="你的GitHub链接" target="_blank">GitHub</a>
```

### 2. 修改侧边栏

同样在 `indexScript.js` 中：

```javascript
<!-- 关于我 -->
<p>你的个人简介</p>
<p>你的职业</p>
<p>你的坐标</p>

<!-- 技能标签 -->
<span>技能1</span>
<span>技能2</span>
<span>技能3</span>

<!-- 联系方式 -->
<p>邮箱：your@email.com</p>
<p>Twitter：@your-handle</p>
```

### 3. 生成 config.json

```bash
bash build-config.sh
```

### 4. 推送到 GitHub

```bash
git add .
git commit -m "update blog config"
git push
```

### 5. 触发构建

- 手动触发：GitHub 仓库 → Actions → "build Gmeek" → "Run workflow"
- 或创建一个 Issue 自动触发

### 6. 拉取更新

```bash
git pull
```

---

## 修改个人信息

### 博客标题和副标题

编辑 `config.json`：

```json
{
    "title": "你的博客标题",
    "subTitle": "你的博客副标题"
}
```

### 个人简介卡片

编辑 `indexScript.js` 中的 `profile` 部分：

| 字段 | 位置 | 说明 |
|------|------|------|
| 名字 | `profile-name` | 显示在简介卡片的大标题 |
| 介绍 | `profile-bio` | 一句话介绍，显示在名字下方 |
| 描述 | `profile-desc` | 详细描述，显示在介绍下方 |
| 头像 | `profile-avatar` | img 标签的 src 属性 |
| 链接 | `profile-links` | GitHub、RSS 等按钮 |

### 侧边栏

编辑 `indexScript.js` 中的 `sidebar` 部分：

| 卡片 | 说明 |
|------|------|
| About Me | 个人简介、职业、坐标 |
| Skills | 技能标签（可增删） |
| Quick Links | 快速导航链接 |
| Contact | 联系方式 |

---

## 修改样式

### 全局样式

编辑 `style.css`，可修改：

- 字体、字号、行高
- 文字颜色
- 背景色
- 链接样式
- 文章列表样式
- 滚动条样式

### 首页样式

编辑 `indexStyle.css`，可修改：

- 简介卡片样式
- 侧边栏样式
- 响应式断点

### 修改后

1. 运行 `bash build-config.sh` 重新生成 config.json
2. 推送到 GitHub
3. 触发构建

---

## 发布文章

### 方法：通过 GitHub Issue

1. 打开 https://github.com/tpTwof/tpTwof.github.io/issues
2. 点击 "New Issue"
3. 填写：
   - **Title**：文章标题
   - **Body**：文章内容（支持 Markdown）
   - **Labels**：添加 `blog` 标签（或其他分类标签）
4. 点击 "Submit new issue"
5. GitHub Actions 自动构建（约2-3分钟）
6. 运行 `git pull` 拉取更新

### Markdown 语法示例

```markdown
# 一级标题

## 二级标题

正文内容...

- 列表项1
- 列表项2

**加粗** *斜体*

> 引用内容

```代码块```

[链接文字](URL)

![图片描述](图片URL)
```

### 文章管理

- **编辑文章**：编辑对应的 Issue，会自动触发重建
- **删除文章**：关闭对应的 Issue，会自动触发重建
- **文章分类**：通过 Issue 的 Labels 管理

---

## 配置字段参考

### 基础字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `title` | string | 博客标题 | `"My Blog"` |
| `subTitle` | string | 博客副标题 | `"My thoughts"` |
| `avatarUrl` | string | 页头头像URL | `"https://..."` |
| `GMEEK_VERSION` | string | Gmeek版本 | `"last"` |
| `startSite` | string | 建站日期 | `"2026-05-28"` |
| `UTC` | number | 时区 | `8` |
| `filingNum` | string | 备案号 | `""` |

### 主题配置

| 字段 | 类型 | 说明 | 可选值 |
|------|------|------|--------|
| `themeMode` | string | 主题模式 | `"manual"` / `"auto"` / `"day"` / `"night"` |
| `dayTheme` | string | 日间主题 | `"light"` / `"dark"` |
| `nightTheme` | string | 夜间主题 | `"dark"` / `"dark_dimmed"` |

### 功能配置

| 字段 | 类型 | 说明 | 可选值 |
|------|------|------|--------|
| `needComment` | number | 启用评论 | `1` 启用 / `0` 禁用 |
| `showPostSource` | number | 显示文章源链接 | `1` 显示 / `0` 隐藏 |
| `urlMode` | string | URL模式 | `"pinyin"` 拼音 / `"issue"` Issue编号 |
| `onePageListNum` | number | 每页文章数 | `15` |
| `rssSplit` | string | RSS摘要方式 | `"sentence"` 句子 / `"full"` 全文 |

### 样式注入

| 字段 | 类型 | 说明 |
|------|------|------|
| `head` | string | 注入到所有页面的 `<head>` |
| `style` | string | 全局CSS样式 |
| `indexStyle` | string | 首页专用CSS |
| `indexScript` | string | 首页专用JavaScript |
| `script` | string | 全局JavaScript |
| `allHead` | string | 高优先级 `<head>` 内容 |

### 颜色配置

| 字段 | 类型 | 说明 |
|------|------|------|
| `commentLabelColor` | string | 评论标签颜色 |
| `yearColorList` | array | 年份标签颜色列表 |

---

## 常见问题

### Q: 修改了 config.json 但网站没变化？

A: Gmeek 的构建不会在 push 时自动触发，需要：
1. 手动触发 Actions（推荐）
2. 或创建一个 Issue 触发
3. 或等待每天凌晨自动构建

### Q: 如何本地预览？

A: Gmeek 不支持本地预览，必须推送到 GitHub 后通过 Actions 构建。

### Q: 如何自定义域名？

A: 在仓库的 Settings → Pages → Custom domain 中配置。

### Q: 如何添加 Google Analytics？

A: 在 `head` 字段中添加：
```json
"head": "<script async src='https://www.googletagmanager.com/gtag/js?id=GA_ID'></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','GA_ID');</script>"
```

### Q: 如何修改页脚文字？

A: 编辑 `bottomText` 字段。

### Q: 文章支持哪些 Markdown 扩展？

A: 支持 GitHub Flavored Markdown（GFM），包括：
- 任务列表
- 表格
- 代码块
- 自动链接
- 删除线

---

## 工作流速查

### 修改样式/配置

```
编辑 style.css / indexStyle.css / indexScript.js
    ↓
运行 bash build-config.sh
    ↓
git add . && git commit -m "update" && git push
    ↓
GitHub 手动触发 Actions
    ↓
git pull
```

### 发布文章

```
GitHub 创建 Issue（标题=文章标题，内容=Markdown）
    ↓
自动触发构建
    ↓
git pull
```

### 编辑文章

```
GitHub 编辑对应 Issue
    ↓
自动触发构建
    ↓
git pull
```
