#!/bin/bash
# 将分离的CSS/JS文件合并到config.json
# 用法: bash build-config.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 读取并压缩CSS/JS（移除注释、换行、多余空格）
minify() {
    sed 's|/\*.*\*/||g' "$1" |     # 移除CSS多行注释
    grep -v '^\s*//' |              # 移除JS单行注释行（仅行首）
    tr '\n' ' ' |                   # 合并为单行
    sed 's/  */ /g' |               # 压缩空格
    sed 's/ *{ */{/g' |             # 移除花括号周围空格
    sed 's/ *} */}/g' |
    sed 's/ *: */:/g' |             # 移除冒号周围空格
    sed 's/ *; */;/g' |             # 移除分号周围空格
    sed 's/ *, */,/g' |             # 移除逗号周围空格
    sed 's/^ *//;s/ *$//'           # 移除首尾空格
}

echo "正在压缩 style.css..."
STYLE=$(minify style.css)

echo "正在压缩 indexStyle.css..."
INDEX_STYLE=$(minify indexStyle.css)

echo "正在压缩 indexScript.js..."
INDEX_SCRIPT=$(minify indexScript.js)

echo "正在生成 config.json..."

# 使用 jq 生成 JSON（如果有的话），否则用 heredoc
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
    # 没有 jq 时的简单方案
    cat > config.json << 'CONFIGEOF'
{
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
CONFIGEOF

    echo '    "style": "'"$STYLE"'",' >> config.json
    echo '    "indexStyle": "'"$INDEX_STYLE"'",' >> config.json
    echo '    "indexScript": "'"$INDEX_SCRIPT"'",' >> config.json

    cat >> config.json << 'CONFIGEOF'
    "iconList": {},
    "exlink": {},
    "singlePage": [],
    "singeListJson": {}
}
CONFIGEOF
fi

echo "完成！config.json 已生成。"
echo "请检查 config.json 格式是否正确。"
