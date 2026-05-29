#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
将分离的CSS/JS文件合并到config.json
用法: python build-config.py
"""

import json
import re
import os

def minify_css(content):
    """压缩CSS"""
    # 移除注释
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # 移除换行和多余空格
    content = re.sub(r'\s+', ' ', content)
    # 移除选择器和花括号周围空格
    content = re.sub(r'\s*{\s*', '{', content)
    content = re.sub(r'\s*}\s*', '}', content)
    content = re.sub(r'\s*:\s*', ':', content)
    content = re.sub(r'\s*;\s*', ';', content)
    content = re.sub(r'\s*,\s*', ',', content)
    return content.strip()

def minify_js(content):
    """压缩JS（保留字符串内的空格）"""
    # 移除单行注释（仅行首）
    lines = content.split('\n')
    lines = [line for line in lines if not line.strip().startswith('//')]
    content = ' '.join(lines)
    # 移除多余空格（不影响引号内的内容）
    content = re.sub(r'\s+', ' ', content)
    content = content.strip()
    return content

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    print("正在读取 style.css...")
    with open('style.css', 'r', encoding='utf-8') as f:
        style = minify_css(f.read())

    print("正在读取 indexStyle.css...")
    with open('indexStyle.css', 'r', encoding='utf-8') as f:
        index_style = minify_css(f.read())

    print("正在读取 indexScript.js...")
    with open('indexScript.js', 'r', encoding='utf-8') as f:
        index_script = minify_js(f.read())

    print("正在生成 config.json...")

    # Gmeek 模板直接插入字段内容，不自动包裹标签
    # style/indexStyle 需要自带 <style> 标签，indexScript 需要自带 <script> 标签
    style_tag = f"<style>{style}</style>" if style else ""
    index_style_tag = f"<style>{index_style}</style>" if index_style else ""
    index_script_tag = f"<script>{index_script}</script>" if index_script else ""

    config = {
        "title": "tpTwof's Blog",
        "subTitle": "Thoughts on code, design, and life",
        "avatarUrl": "https://github.githubassets.com/favicons/favicon.svg",
        "GMEEK_VERSION": "last",
        "themeMode": "manual",
        "dayTheme": "light",
        "nightTheme": "dark",
        "commentLabelColor": "#0066cc",
        "yearColorList": ["#0066cc", "#1d1d1f", "#333333", "#7a7a7a"],
        "filingNum": "",
        "startSite": "2026-05-28",
        "UTC": 8,
        "needComment": 1,
        "showPostSource": 1,
        "urlMode": "pinyin",
        "onePageListNum": 15,
        "rssSplit": "sentence",
        "bottomText": "",
        "head": "<link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap' rel='stylesheet'>",
        "style": style_tag,
        "indexStyle": index_style_tag,
        "indexScript": index_script_tag,
        "iconList": {},
        "exlink": {},
        "singlePage": [],
        "singeListJson": {}
    }

    with open('config.json', 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=4)

    print("完成！config.json 已生成。")

    # 验证JSON格式
    with open('config.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("JSON格式验证通过。")

if __name__ == '__main__':
    main()
