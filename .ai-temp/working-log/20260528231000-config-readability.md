# 工作日志

## 上次工作结果
- config.json 已完成 Apple 风格改造
- 包含个人简介卡片和侧边栏
- 但 config.json 可读性差（CSS/JS 为单行）

## 本次工作目标
- 提高 config.json 可读性
- 生成完整的使用指南

## 预期结果
- 分离出独立的 CSS/JS 文件
- 提供构建脚本合并到 config.json
- 生成 USAGE.md 使用指南

## 实际结果
- 创建文件：
  - `style.css` - 全局样式（可读格式）
  - `indexStyle.css` - 首页样式（可读格式）
  - `indexScript.js` - 首页脚本（可读格式）
  - `build-config.sh` - 构建脚本
  - `USAGE.md` - 完整使用指南
- 工作流：
  1. 编辑 CSS/JS 源文件
  2. 运行 `bash build-config.sh` 生成 config.json
  3. 推送到 GitHub
  4. 触发 Actions 构建
  5. `git pull` 拉取更新
