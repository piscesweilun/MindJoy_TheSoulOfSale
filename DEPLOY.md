# MindJoy Portal — 部署說明

本專案（`MindJoy_TheSoulOfSale`）是 MindJoy 的 React 前端入口網站。

> **此專案不需要獨立部署。**
> 雲端發佈流程完全由後端（`MindJoyStreamServer`）的 `deploy.sh` 自動處理。

---

## 快速上手（本地開發）

### 1. 啟動前端開發伺服器

```bash
cd MindJoy_TheSoulOfSale
npm install
npm run dev
```

開啟：[http://localhost:3000](http://localhost:3000)

> Vite proxy 會將 `/api/*` 和 `/payment/*` 自動轉送至 `http://localhost:5001`（Flask 後端）。
> 請確保 `MindJoyStreamServer` 也在背景運行（`./run_local.sh`）。

---

## 雲端部署流程

前端和後端打包在**同一個 Google Cloud Run**。部署時，後端的 `deploy.sh` 會：

1. 自動進入本目錄執行 `npm install && npm run build`
2. 將 `dist/` 複製到後端的 `static/portal/` 目錄
3. 一同打包成 Docker image 部署至 Cloud Run
4. Flask 以 `/` 路由提供 React 的 `index.html`，所有 `/api/*` 保持走 Flask API

### Staging 環境

```bash
cd MindJoyStreamServer

# 自動重建 Neon staging 分支 + 部署 staging
./scripts/refresh_staging.sh
```

### Production 環境

```bash
cd MindJoyStreamServer

# 部署至正式環境
./deploy.sh production
```

---

## 環境說明

| 環境 | 前端 URL | API Base |
|------|----------|----------|
| **本地開發** | `http://localhost:3000` | 由 Vite proxy 自動代理 → `localhost:5001` |
| **Staging** | `https://mindjoy-stream-staging-xxx.run.app/` | 同網域，無需設定 |
| **Production** | `https://mindjoy-stream-xxx.run.app/` | 同網域，無需設定 |

> 同網域部署的優點：前端不需要設定 `VITE_API_BASE`，無跨域（CORS）問題，Cookie / Session 也可正常運作。

---

## 手動複製前端（本地測試整合）

若希望在本地用 Flask 提供 React 頁面（而非 Vite dev server），可手動執行：

```bash
# 在 MindJoy_TheSoulOfSale 目錄
npm run build

# 複製到後端靜態目錄
rm -rf ../MindJoyStreamServer/static/portal
mkdir -p ../MindJoyStreamServer/static/portal
cp -r dist/. ../MindJoyStreamServer/static/portal/

# 啟動 Flask
cd ../MindJoyStreamServer
./run_local.sh

# 訪問 http://localhost:5001 → 你會看到 React 渲染的入口網站
```
