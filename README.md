# MindJoy｜The Soul of Sale — 入口網站

MindJoy 的對外入口網站，提供訪客瀏覽、會員註冊/登入，以及購買影片製作點數的功能。前端使用 **React + Vite + Tailwind CSS** 開發，與後端 `MindJoyStreamServer` 共用資料庫與會員系統。

---

## 系統架構

```
訪客瀏覽器
    │
    ▼
MindJoy_TheSoulOfSale   (React / Vite, port 3000)
    │  /api/*、/payment/* (dev proxy → port 5001)
    ▼
MindJoyStreamServer     (Flask, port 5001)
    ├─ /api/register, /api/login, /api/me   ← 會員 API
    ├─ /payment/packages, /payment/create   ← 點數購買
    └─ /payment/callback                    ← 藍新金流回傳
```

---

## 快速啟動

### 前置需求

- [MindJoyStreamServer](../MindJoyStreamServer) 必須先啟動（提供 API）
- Node.js 18+

### 1. 安裝前端相依套件

```bash
cd MindJoy_TheSoulOfSale
npm install
```

### 2. 啟動前端開發伺服器

```bash
npm run dev
```

開啟瀏覽器：[http://localhost:3000](http://localhost:3000)

> **注意**：Vite 已設定 proxy，開發時所有 `/api/*` 和 `/payment/*` 請求會自動轉送至 `http://localhost:5001`（Flask 後端）。

### 3. 建置正式版本

```bash
npm run build
# 輸出至 dist/ 資料夾
```

### 4. 預覽建置結果（本地）

```bash
npm run preview
```

---

## 環境變數設定

在專案根目錄建立 `.env` 檔案（可選）：

```env
# 後端 API 位址（正式部署時使用，開發時不需要設定 proxy 已自動處理）
VITE_API_BASE=https://your-backend-domain.com
```

---

## 前端功能說明

| 功能 | 說明 |
|------|------|
| **首頁** | 品牌展示、作品畫廊、理念說明 |
| **登入/註冊** | 右上角按鈕開啟 Modal |
| **點數方案** | Navbar「點數方案」或點數餘額按鈕跳轉 |
| **點數顯示** | 登入後 Navbar 顯示剩餘點數（金幣圖示） |
| **付款流程** | 點擊購買 → 後端產生藍新表單 → 自動跳轉付款 |

### 會員註冊必填欄位

| 欄位 | 對應資料庫欄位 | 必填 |
|------|---------------|------|
| 姓名 | `name` | ✅ |
| Email | `email` | ✅ |
| 密碼 | `password` | ✅（最少 6 字元）|
| 手機 | `mobile` | 選填 |
| 職稱 | `job_title` | 選填 |
| 公司名稱 | `company_name` | 選填 |
| Line ID | `line_id` | 選填 |

---

## 後端 API 速查

| 路徑 | 方法 | 說明 |
|------|------|------|
| `/api/register` | POST | 會員註冊（JSON body） |
| `/api/login` | POST | 會員登入（JSON body） |
| `/api/logout` | POST | 登出 |
| `/api/me` | GET | 取得目前登入者資料（含 credit_balance）|
| `/payment/packages` | GET | 取得點數套餐列表 |
| `/payment/create` | POST | 建立藍新付款表單（需登入）|
| `/payment/callback` | POST | 藍新 Server Notify 回傳（自動入帳）|
| `/payment/history` | GET | 取得當前用戶交易記錄（需登入）|

---

## 點數套餐（可在 `routes/payment.py` 調整）

| 方案 | 點數 | 金額 | 每點 |
|------|------|------|------|
| 入門方案 | 50 點 | NT$1,500 | NT$30 |
| 專業方案 | 150 點 | NT$3,990 | NT$26.6 |
| 旗艦方案 | 350 點 | NT$8,500 | NT$24.3 |

---

## 技術棧

| 類別 | 使用技術 |
|------|---------|
| 框架 | React 19 + TypeScript |
| 建置工具 | Vite 6 |
| 樣式 | Tailwind CSS 3 |
| 圖示 | Lucide React |
| API 通訊 | Fetch API（Credentials: include）|

---

## 相關専案

- **[MindJoyStreamServer](../MindJoyStreamServer)** — Flask 後端，負責資料庫、會員驗證、金流處理
- **[VideoFactory](../VideoFactory)** — 影片合成服務（由 MindJoyStreamServer 呼叫）
