# Gmeek 博客使用指南

## 发布文章

博客通过 GitHub Issues 管理，发布流程如下：

### 1. 创建文章

打开 https://github.com/tpTwof/tpTwof.github.io/issues/new

**填写内容：**
- **Title**：文章标题
- **Body**：文章内容（Markdown 格式）
- **Labels**：选择分类标签

### 2. 板块与标签对应

| 板块名称 | 使用的标签 |
|----------|-----------|
| My Work | `work` |
| What I'm good at | `skills` |
| Blog | `blog` |
| 随笔 | `essay` |
| 技术 | `tech` |
| 笔记 | `note` |

### 3. 示例

发布一篇"My Work"文章：
1. 创建 Issue，Title 为 "我的作品集"
2. Body 填写 Markdown 内容
3. Labels 选择 `work`

文章会自动出现在首页的 **My Work** 板块下。

### 4. Markdown 语法

```markdown
# 文章标题

正文内容...

## 代码示例

```javascript
console.log('Hello World');
```

## 图片

![描述](图片URL)
```

### 5. 提交后

- GitHub Actions 自动构建（约2分钟）
- 运行 `git pull` 拉取生成的页面

### 6. 管理文章

- **编辑**：在对应 Issue 中修改内容
- **删除**：关闭对应的 Issue

---

## 修改个人信息

编辑 `indexScript.js` 中的内容：
- 左侧导航：修改 `.sidebar-title` 和 `.sidebar-subtitle`
- 简介卡片：修改 `.profile-name`、`.profile-bio` 等
- 导航链接：修改 `.nav-item` 的 `href` 属性

如需添加新板块，修改 `sectionNames` 对象中的配置。

编辑后运行 `bash build-config.sh` 或 `python build-config.py`，然后推送到 GitHub。

---

## 版权信息

页面底部保留 Gmeek 版权信息，控制台也会输出 Gmeek 信息。