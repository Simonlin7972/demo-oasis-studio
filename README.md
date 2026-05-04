# 綠洲所 Oasis Studio

> 打造屬於你的城市綠洲

以「綠色植物」為主題的電商平台 prototype，受眾為 20–30 歲都市租屋族 / 小資族。目前為前端 prototype 階段，尚未接後端 API。

## Preview

**首頁** — Hero 輪播、促銷倒數、商品卡片、情境推薦、評價輪播、養護指南

**商品詳細頁** — 圖片 gallery、屬性卡、尺寸選擇、Tab 資訊切換、相關推薦

## 技術架構

| 層級 | 技術 |
|------|------|
| UI Framework | React 18 (CDN UMD build) |
| JSX 編譯 | Babel Standalone — 瀏覽器端即時編譯，無需 build step |
| 樣式 | CSS Variables design tokens + React inline styles |
| 字體 | Noto Serif TC / Noto Sans TC / JetBrains Mono (Google Fonts) |
| 資料 | 靜態 `data.js`（`window.OASIS_DATA`） |
| Dev Server | `npx serve .` |

## 檔案結構

```
index.html                — 入口，載入字體 + React CDN + 各 script
styles.css                — design tokens、按鈕樣式、toast 動畫
│
├── src/
│   ├── app.jsx           — App Root（路由 + 全域 state）
│   ├── pages/            — 頁面元件（Home, ProductDetail, Cart, About）
│   ├── components/
│   │   ├── layout/       — Nav, Footer, ViewportProvider
│   │   ├── sections/     — 首頁區塊（Hero, Promo, Featured...）
│   │   └── ui/           — 可複用元件（Icon, SafeImg, ProductCard）
│   ├── hooks/            — 自訂 hooks（useCart, useToast...）
│   └── utils/            — 工具函式（NT 格式化）
│
├── data/                 — 靜態 mock 資料
├── design-system/        — DS 預覽 / 文件頁
├── tokens/               — Design tokens JSON
└── docs/                 — PRD、設計規範文件
```

## 快速開始

```bash
# 安裝 serve（如尚未安裝）
npm install

# 啟動開發伺服器
npm run dev
```

瀏覽器開啟 `http://localhost:3000` 即可預覽。

## 設計系統

### 色彩

| Token | 色碼 | 用途 |
|-------|------|------|
| `--forest-800` | `#1f3a2e` | 主色（深森綠） |
| `--forest-600` | `#3a6b4a` | 輔色 |
| `--sage-300` | `#c9d5b5` | 輔色（鼠尾草綠） |
| `--cream-50` | `#f4f6ee` | 淺色背景 |
| `--paper` | `#fafaf6` | 頁面背景 |
| `--accent` | `#d97757` | 強調色（願望清單愛心） |

### 字體

- **標題** — Noto Serif TC (`.serif`)
- **內文** — Noto Sans TC（預設）
- **標籤 / 數字** — JetBrains Mono (`.mono`, `.eyebrow`)

### 風格規則

- 全站直角（`border-radius: 0`）
- 按鈕三層級：Primary（深綠實心）→ Secondary（描邊）→ Ghost（文字）
- RWD 三斷點：Desktop ≥ 1024px / Tablet 640–1023px / Mobile < 640px
- 使用 ResizeObserver container-based breakpoints

## 功能

- Hero 輪播（6s 自動、hover 暫停）
- 促銷倒數計時器
- 商品卡片 hover 顯示第二張圖 + 屬性 badges
- 願望清單（localStorage 持久化）
- Toast 通知（加入購物車 / 願望清單）
- 商品詳細頁（URL 參數路由 `?product=p1`，支援瀏覽器上一頁 / 下一頁）
- 圖片載入失敗自動 fallback（SafeImg）
- 響應式 Nav（Desktop 完整選單 / Mobile 漢堡選單 + 側邊抽屜）

## License

This project is for demonstration purposes.
