#!/bin/bash

# ============================================================================
# MindJoy Portal 同步腳本
# 目的：建置 React 前端並將產出同步到 Flask 後端的靜態目錄
# ============================================================================

# 遇到錯誤即停止
set -e

# 將常見的 Mac 路徑以及 node_modules/.bin 加入 PATH
export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin:$(pwd)/node_modules/.bin

# 定義目錄路徑 (假設兩者在同一層目錄)
SOURCE_DIR=$(pwd)
BACKEND_NAME="MindJoyStreamServer"
DEST_DIR="../$BACKEND_NAME/static/portal"

echo "🎨 [前端] 開始建置 React Portal..."

# 1. 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 錯誤：請在 MindJoy_TheSoulOfSale 目錄下執行此腳本"
    exit 1
fi

# 2. 檢查 node_modules 是否健康 (特別是 vite)
if [ ! -d "node_modules" ] || [ ! -f "node_modules/vite/package.json" ]; then
    echo "   📦 node_modules 不完整或不存在，正在執行 npm install..."
    npm install
fi

# 3. 執行建置
echo "   🔨 執行建置 (vite build)..."

# 使用本地安裝的 vite 執行建置
# 這比 npx 更安全，因為 npx 有時會嘗試下載錯誤的版本
if [ -f "./node_modules/.bin/vite" ]; then
    ./node_modules/.bin/vite build
else
    # 備用方案：使用 npm run
    npm run build
fi

# 4. 檢查並同步到後端
if [ -d "../$BACKEND_NAME" ]; then
    echo "   📁 同步 dist/ -> $DEST_DIR..."
    
    # 清除舊版
    rm -rf "$DEST_DIR"
    mkdir -p "$DEST_DIR"
    
    # 複製新版
    cp -r dist/. "$DEST_DIR/"
    
    echo ""
    echo "✅ 同步成功！"
    echo "   📍 前端已編譯並存放到：$DEST_DIR"
    echo "   💡 現在你可以啟動 $BACKEND_NAME 並訪問 http://localhost:5001 查看結果"
else
    echo ""
    echo "⚠️  警告：找不到後端目錄 ($DEST_DIR)"
    echo "   請確認 $BACKEND_NAME 與本目錄位於同一層。"
    exit 1
fi
