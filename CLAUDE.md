# 綠洲所 Oasis Studio

## 專案概述

以「綠色植物」為主題的電商平台，受眾為 20–30 歲都市租屋族 / 小資族，品牌定位是「打造屬於你的城市綠洲」。

目前為前端 prototype 階段，尚未接後端 API。

## 技術架構

- **React 18** (CDN UMD build) + **Babel Standalone** — 瀏覽器端即時編譯 JSX，無需 build step
- **純 CSS Variables** 做 design tokens，無 CSS 框架
- **inline styles** 為主（React style objects），搭配少量 CSS class（`.oasis`, `.btn-primary`, `.serif`, `.mono`, `.eyebrow`）
- 靜態檔案直接用 `npx serve .` 提供，`npm run dev` 啟動

## 檔案結構

```
index.html              — 入口，載入字體 + React CDN + 各 script（依序載入）
styles.css              — design tokens (CSS variables)、按鈕樣式、toast 動畫、全站直角���蓋
│
├── data/
│   └── data.js         — 所有內容資料，掛在 window.OASIS_DATA
│
���── src/
│   ├─�� app.jsx         — App Root：路由 + 全域 state + providers，掛在 window.OasisApp
│   │
│   ├── pages/          — 路由對應的頂層頁面
│   │   ├── HomePage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   └── AboutPage.jsx
│   │
│   ├─�� components/
│   │   ├─��� layout/     — 全站共用骨架
│   │   │   ├── ViewportProvider.jsx  — ResizeObserver container-based breakpoints
│   │   │   ├── Nav.jsx               — 響應式導覽列
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── sections/   — 首頁區塊元件
│   │   │   ├── Hero.jsx, Promo.jsx, Featured.jsx
│   │   │   ├── Categories.jsx, Scenarios.jsx
│   │   │   └── Reviews.jsx, Guides.jsx
│   │   │
│   │   └── ui/         — 跨頁面可複用 UI
│   │       ├── Icon.jsx, SafeImg.jsx, ProductCard.jsx
│   │
│   ├── hooks/          — 自訂 hooks（各一檔）
│   │   ├── useCountdown.js, useToast.jsx, useWishlist.js
│   │   └── useCart.js, useCarousel.js
│   │
│   └── utils/
│       └── format.js   — NT() 價格格式化
│
├── design-system/      — DS 預覽 / 文件頁（非產品功能）
│   ├── ds.jsx
│   └── ds-button.jsx
��
├── tokens/             — Design tokens JSON
│   ├── primitives.json
│   └── semantics.json
│
└── docs/               — PRD、設計規範、handoff 文件
```

所有元件透過 `window` 全域物件傳遞（Babel Standalone 無 module 支援）。
`index.html` 中的 `<script>` 載入順序即為依賴順序：utils → ui → hooks → layout → sections → pages → app。

## 設計系統

### 色彩
- 主色：`--forest-800: #1f3a2e`（深森綠）
- 輔色：`--forest-600: #3a6b4a`, `--sage-300: #c9d5b5`, `--cream-50: #f4f6ee`
- 背景：`--paper: #fafaf6`
- 強調：`--accent: #d97757`（用於願望清單愛心）
- 文字透明度層級：`--ink`, `--ink-60`, `--ink-40`, `--ink-15`, `--ink-08`

### 字體
- 標題：Noto Serif TC (`.serif`)
- 內文：Noto Sans TC（預設）
- 標籤/數字：JetBrains Mono (`.mono`, `.eyebrow`)

### 風格規則
- **全站直角**：所有元素 `border-radius: 0 !important`，在 styles.css 最底部以高優先級覆蓋
- 按鈕三層級：Primary（深綠實心）→ Secondary（深綠描邊）→ Ghost（文字 + hover 底線）
- 按鈕 class 使用 `.oasis .btn-*` 提升 specificity，以覆蓋 `.oasis button` 的 reset

### RWD 斷點
- Desktop: ≥ 1024px
- Tablet: 640–1023px
- Mobile: < 640px
- 使用 **ResizeObserver** 觀察容器寬度（container-based），非 window.innerWidth

## 頁面與功能

### 首頁
1. **Nav** — Desktop 顯示完整選單；Tablet/Mobile 改漢堡選單 + 側邊抽屜
2. **Hero** — 兩張 slide 輪播（6s 自動、hover 暫停），左文右圖（mobile 上下堆疊，圖在上）
3. **Promo** — 深綠 banner，倒數計時器（每秒更新），促銷碼顯示
4. **Featured** — 商品卡片 grid（tab 篩選 UI 已有，篩選邏輯待實作），hover 顯示第二張圖 + 屬性 badges
5. **Categories** — 5 欄圖文分類（mobile 2 欄）
6. **Scenarios** — 情境推薦（辦公室/小套房/新手），附 tag badges
7. **Reviews** — 輪播評價卡（7s 自動），含星星、引言、購買產品
8. **Guides** — 3 欄養護文章卡片
9. **Footer** — 品牌 + 關於/客服/社群 四欄

### 商品詳細頁
- URL 參數路由：`?product=p1`，支援瀏覽器上一頁/下一頁（popstate）
- 圖片 gallery（主圖 + 縮圖切換）
- 屬性卡（光照/澆水/寵物）
- 尺寸選擇 S/M/L、數量 +/-、加入購物車、立即購買
- 4 個 tab：養護指南 / 商品規格 / 配送與退換 / 評價
- 底部相關商品推薦

## 互動功能
- **願望清單**：localStorage 持久化，key = `oasis-conservative`
- **Toast 通知**：加入購物車 / 願望清單操作後頂部彈出，2.4s 自動消失
- **SafeImg**：圖片載入失敗自動 fallback 到 SVG 植物佔位圖

## 開發注意事項

- 修改 styles.css 時注意 specificity 順序：底部的 `border-radius: 0 !important` 必須保持在最後
- `.oasis button` 會 reset 所有按鈕的 background/padding/border，新增按鈕樣式需用 `.oasis .btn-*` 提升優先級
- 商品資料集中在 `data/data.js` 的 `window.OASIS_DATA`，新增商品只需在 `featured` 陣列加入物件
- 圖片來源為 Unsplash URL，若未來需替換為自有圖片，修改 `data/data.js` 中對應的 `img` / `img2` 欄位即可
- 新增元件時需在 `index.html` 中加入對應的 `<script type="text/babel">` 標籤，並注意依賴順序
- 目前 Featured tab 篩選（新手友善/空間主角/寵物友善）僅切換 UI 狀態，尚未實作實際篩選邏輯

## Figma 同步規則

將 app 畫面傳到 Figma 時，**必須**遵守以下原則：

1. **使用已定義的 design tokens**：色彩、字體、間距等必須使用 Figma 檔案中已建立的 variables / styles，不得使用 hard-coded 的值
2. **使用已定義的 components**：如果 Figma 中已存在對應的 component（如 Icons frame 中的 `icon-*` components、Button component set 等），必須以 instance 方式引用，不得重新繪製
3. **缺少定義時必須提問**：若畫面中用到的 token 或 component 在 Figma 中尚未定義，**不得自行建立**，應先向使用者提出以下資訊並等待決策：
   - 缺少哪些 tokens / components
   - 建議的命名與結構
   - 是否需要先建立再繼續
4. **RWD 響應式設計**：新增 Figma 頁面時，必須考慮響應式佈局：
   - 使用 Auto Layout 建構所有區塊，確保元素能隨寬度自適應（避免固定寬度的手動排版）
   - 每個頁面需涵蓋三個主要斷點的設計：**Desktop**（≥ 1024px）、**Tablet**（640–1023px）、**Mobile**（< 640px）
   - 斷點定義與程式碼中的 ResizeObserver container-based breakpoints 保持一致

### Figma 檔案位置

- 檔案：`figma.com/design/be9qx2a5lrlKSzC1VTHHtn/Live-Demo-|-PDBC-2026`
- Design System 頁面 node-id：`78-76`
- Icons frame：包含 12 個 icon components（`icon-search`, `icon-cart`, `icon-heart`, `icon-arrow`, `icon-arrow-left`, `icon-star`, `icon-sun`, `icon-drop`, `icon-pet`, `icon-menu`, `icon-play`, `icon-leaf`）
- Button component set：`85:38`

## 未來可能的方向
- 購物車側邊抽屜
- 商品列表頁（篩選 / 排序）
- 結帳流程
- 遷移至 Vite + React SPA 或 Next.js（如需 SSR/SEO）
- 接後端 API 取代靜態 data.js
