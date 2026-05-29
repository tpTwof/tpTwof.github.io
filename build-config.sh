#!/bin/bash
# 将分离的CSS/JS文件合并到config.json
# 用法: bash build-config.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 读取并压缩CSS/JS（移除注释、换行、多余空格）
minify_css() {
    sed 's|/\*.*\*/||g' "$1" |     # 移除CSS多行注释
    tr '\n' ' ' |                   # 合并为单行
    sed 's/  */ /g' |               # 压缩空格
    sed 's/ *{ */{/g' |             # 移除花括号周围空格
    sed 's/ *} */}/g' |
    sed 's/ *: */:/g' |             # 移除冒号周围空格
    sed 's/ *; */;/g' |             # 移除分号周围空格
    sed 's/ *, */,/g' |             # 移除逗号周围空格
    sed 's/^ *//;s/ *$//'           # 移除首尾空格
}

minify_js() {
    grep -v '^\s*//' "$1" |          # 移除JS单行注释行（仅行首）
    tr '\n' ' ' |                    # 合并为单行
    sed 's/  */ /g' |                # 压缩空格
    sed 's/^ *//;s/ *$//'            # 移除首尾空格
}

# 转义字符串以便安全嵌入JSON字符串值
json_escape() {
    printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g; s/\t/\\t/g'
}

echo "正在压缩 style.css..."
STYLE=$(minify_css style.css)

echo "正在压缩 indexStyle.css..."
INDEX_STYLE=$(minify_css indexStyle.css)

echo "正在压缩 indexScript.js..."
INDEX_SCRIPT=$(minify_js indexScript.js)

echo "正在生成 config.json..."

# 使用 jq 生成 JSON（推荐，自动处理转义）
if command -v jq &> /dev/null; then
    jq -n \
        --arg style "$STYLE" \
        --arg indexStyle "$INDEX_STYLE" \
        --arg indexScript "$INDEX_SCRIPT" \
        '{
            "title": "tpTwof'\''s Blog",
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
            "head": "<link href='\''https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap'\'' rel='\''stylesheet'\''>",
            "style": $style,
            "indexStyle": $indexStyle,
            "indexScript": $indexScript,
            "iconList": {},
            "exlink": {},
            "singlePage": [],
            "singeListJson": {}
        }' > config.json
else
    # 没有 jq 时的备选方案（使用 python3 确保转义正确）
    if command -v python3 &> /dev/null; then
        python3 -c "
import json
config = {
    'title': \"tpTwof's Blog\",
    'subTitle': 'Thoughts on code, design, and life',
    'avatarUrl': 'https://github.githubassets.com/favicons/favicon.svg',
    'GMEEK_VERSION': 'last',
    'themeMode': 'manual',
    'dayTheme': 'light',
    'nightTheme': 'dark',
    'commentLabelColor': '#0066cc',
    'yearColorList': ['#0066cc', '#1d1d1f', '#333333', '#7a7a7a'],
    'filingNum': '',
    'startSite': '2026-05-28',
    'UTC': 8,
    'needComment': 1,
    'showPostSource': 1,
    'urlMode': 'pinyin',
    'onePageListNum': 15,
    'rssSplit': 'sentence',
    'bottomText': '',
    'head': \"<link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap' rel='stylesheet'>\",
    'style': '''$STYLE''',
    'indexStyle': '''$INDEX_STYLE''',
    'indexScript': '''$INDEX_SCRIPT''',
    'iconList': {},
    'exlink': {},
    'singlePage': [],
    'singeListJson': {}
}
with open('config.json', 'w', encoding='utf-8') as f:
    json.dump(config, f, ensure_ascii=False, indent=4)
"
    else
        echo "错误：需要 jq 或 python3 来生成正确的 JSON 格式"
        exit 1
    fi
fi

echo "完成！config.json 已生成。"

# 验证JSON格式
if command -v jq &> /dev/null; then
    jq -r ".GMEEK_VERSION" config.json > /dev/null 2>&1 && echo "JSON格式验证通过。" || echo "警告：JSON格式可能有问题。"
elif command -v python3 &> /dev/null; then
    python3 -c "import json; json.load(open('config.json'))" 2>/dev/null && echo "JSON格式验证通过。" || echo "警告：JSON格式可能有问题。"
fi
