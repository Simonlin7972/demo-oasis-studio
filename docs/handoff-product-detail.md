# Product Detail Page — Frontend Handoff

> 給前端工程師的開發交接文件
> 最後更新：2026-04-28

---

## 頁面總覽

商品詳細頁 (PDP) 提供單一商品的完整資訊，包含圖片瀏覽、屬性、尺寸選擇、購買操作、養護/規格/配送/評價四個 tab、以及相關商品推薦。

**進入方式：** 首頁商品卡片點擊 → `?product={id}` → pushState（不重新載入）
**直連支援：** 使用者可直接用 `?product=p1` 訪問，頁面初始化時解析參數

---

## 頁面結構 (DOM 順序)

```
<Nav />                        ← 共用元件，sticky
<Breadcrumb />                 ← 首頁 / 商品 / {name}
<ProductSection>               ← 主要兩欄區
  <Gallery />                  ← 左：主圖 + 縮圖列
  <ProductInfo />              ← 右：所有商品資訊與購買操作
</ProductSection>
<TabsSection />                ← 四個 tab 切換
<RelatedProducts />            ← 你可能也會喜歡
<Footer />                     ← 共用元件
```

---

## 1. Breadcrumb

```
首頁  /  商品  /  龜背芋
```

| Token | 樣式 | 行為 |
|-------|------|------|
| 首頁 | 12px, ink-60 | 可點擊 → 返回首頁 (`onBack`) |
| / | ink-40, margin 0 8px | 裝飾 |
| 商品 | 12px, ink-60 | 靜態文字 |
| {name} | 12px, forest-900, fontWeight 500 | 靜態文字 |

**Padding：** Desktop `20px 56px 0` / Mobile `16px 20px 0`

---

## 2. Product Section — 兩欄佈局

| 斷點 | 佈局 | 欄位比例 | 間距 |
|------|------|----------|------|
| Desktop (≥1024) | 兩欄並排 | `1.05fr 1fr` | 56px |
| Tablet (640–1023) | 單欄堆疊 | `1fr` | 24px |
| Mobile (<640) | 單欄堆疊 | `1fr` | 24px |

**Padding：** Desktop `36px 56px 56px` / Mobile `24px 20px 32px`

---

## 3. Gallery（左欄）

### 3.1 主圖

| 屬性 | 值 |
|------|-----|
| Aspect ratio | `1:1` (正方形) |
| 背景色 | `--sage-100` (#e9ede0) |
| 圖片填充 | `object-fit: cover` |
| 圖片元件 | `<SafeImg>` — 載入失敗自動顯示 SVG 佔位圖 |

### 3.2 主圖上的浮動元素

| 元素 | 位置 | 樣式 |
|------|------|------|
| 商品標籤 | `top: 16, left: 16` | cream-50 背景, forest-800 文字, 11px, fontWeight 600, pill 型 |
| 願望清單按鈕 | `top: 14, right: 14` | 38×38 圓形, cream-50 背景 |

**願望清單狀態：**

| 狀態 | 圖示 | 顏色 |
|------|------|------|
| 未收藏 | 空心愛心 (stroke only) | `--ink-60` |
| 已收藏 | 實心愛心 (filled) | `--accent` (#d97757) |

**行為：** 點擊 toggle，觸發 toast「已加入願望清單」/「已從願望清單移除」，localStorage 持久化

### 3.3 縮圖列

| 屬性 | 值 |
|------|-----|
| 排列 | 等分 grid，數量 = gallery 長度 (目前 3 張) |
| 間距 | 10px |
| Aspect ratio | 1:1 |
| 圖片填充 | `object-fit: cover` |

**縮圖狀態：**

| 狀態 | Border |
|------|--------|
| 選中 | `2px solid var(--forest-800)` |
| 未選 | `2px solid transparent` |

**行為：** 點擊縮圖 → 切換主圖 `imgIdx`

---

## 4. Product Info（右欄）

由上到下排列的區塊：

### 4.1 商品標頭

| 元素 | 字體 | 字級 | 顏色 | 備註 |
|------|------|------|------|------|
| Tag + 分類 | JetBrains Mono | 11px | forest-600 | `{tag.toUpperCase()} · 室內植物`, letter-spacing 0.18em |
| 商品名 | Noto Serif TC | D: 44px / M: 32px | forest-900 | fontWeight 600, lineHeight 1.1 |
| 學名 | JetBrains Mono | 12px | ink-40 | italic |
| 評分 | — | — | forest-600 | 5 顆實心星星 14×14 |
| 評分文字 | JetBrains Mono | 12px | ink-60 | "4.9 · 184 評價" |

### 4.2 價格

| 元素 | 字體 | 字級 | 顏色 | 備註 |
|------|------|------|------|------|
| 售價 | JetBrains Mono | 32px | forest-800 | fontWeight 600, 格式 `NT$ 880` |
| 原價 | JetBrains Mono | 14px | ink-40 | `text-decoration: line-through`，僅有折扣時顯示 |

**排列：** `display: flex; align-items: baseline; gap: 12px`

### 4.3 商品描述

| 屬性 | 值 |
|------|-----|
| 字級 | 14px |
| 行高 | 1.85 |
| 顏色 | ink-60 |
| 內容 | 固定文案（目前未從資料帶入） |

### 4.4 屬性卡片

| 斷點 | Grid |
|------|------|
| Desktop / Tablet | `repeat(3, 1fr)` |
| Mobile | `1fr 1fr` (2 欄，第三張自動換行) |

每張卡片：

| 屬性 | 值 |
|------|-----|
| 背景 | cream-50 |
| Padding | 12px 14px |
| 上方 | Icon (14×14) + 標籤 (Mono 10px, forest-600) |
| 下方 | 數值 (13px, SemiBold, forest-900) |

三個屬性：

| 屬性 | Icon | 標籤 | 值來源 |
|------|------|------|--------|
| 光照 | `Icon.sun` | 光照 | `product.light` |
| 澆水 | `Icon.drop` | 澆水 | `product.water` |
| 寵物 | `Icon.pet` | 寵物 | `product.pet ? '友善' : '需注意'` |

### 4.5 尺寸選擇

**標題列：** 左「選擇尺寸」(13px, 600) / 右「尺寸對照表 →」(Mono 11px, forest-600 連結)

**選項 Grid：** `repeat(3, 1fr)`, gap 8px

| 選項 | Label | Sub |
|------|-------|-----|
| S | S　小 | 15cm 盆 |
| M | M　中 | 20cm 盆 (預設) |
| L | L　大 | 25cm 盆 |

**按鈕佈局：** `flex, justify-content: space-between, align-items: center`
- 左：label (13px, fontWeight 500)
- 右：sub (Mono 10px, opacity 0.7)

**狀態：**

| 狀態 | 背景 | 文字 | Border |
|------|------|------|--------|
| 選中 | forest-800 | cream-50 | 1.5px solid forest-800 |
| 未選 | paper | ink | 1.5px solid ink-15 |

### 4.6 數量 + 購買按鈕

**數量選擇器：**

| 屬性 | 值 |
|------|-----|
| 高度 | 48px |
| −/+ 按鈕 | 40px 寬, 18px 字級, forest-800 |
| 數字 | Mono 15px, fontWeight 600, 寬 32px, 置中 |
| 最小值 | 1 (點 − 不低於 1) |
| 最大值 | 無限制 |

**行動按鈕：**

| 按鈕 | Class | 佈局 | 高度 | 行為 |
|------|-------|------|------|------|
| 加入購物車 | `btn-primary` | flex: 1, 置中, 含 cart icon | 48px | 觸發 toast "已加入購物車：{name} × {qty}" |
| 立即購買 | `btn-secondary` | width 100%, 置中 | auto | 目前無功能（待串接結帳） |

### 4.7 配送說明

| 屬性 | 值 |
|------|-----|
| 背景 | sage-100 |
| Padding | 16px 18px |

三項內容，每項 `flex, align-items: center, gap: 10px`：

| Emoji | 說明 |
|-------|------|
| 🌱 | 48 小時保鮮配送，附手寫養護卡 |
| 🛡 | 一年植物保固，無條件換株 |
| 📦 | 滿 NT$ 1,200 免運 |

項目間分隔：`1px solid var(--ink-08)`（第一項無上分隔）

---

## 5. Tabs 區塊

**Padding：** `0 {pad} {Desktop: 64px / Mobile: 32px}`

### 5.1 Tab 列

| 屬性 | 值 |
|------|-----|
| 排列 | `display: flex`, gap Desktop 32px / Mobile 18px |
| 底線 | `1px solid var(--ink-15)` |
| 可捲動 | `overflowX: auto`（Mobile 時可橫向滑動） |

四個 Tab：

| ID | 文字 | 預設 |
|----|------|------|
| `care` | 養護指南 | ✓ (預設選中) |
| `spec` | 商品規格 | |
| `ship` | 配送與退換 | |
| `review` | 評價 (184) | |

**Tab 狀態：**

| 狀態 | 文字顏色 | fontWeight | 底線 |
|------|----------|------------|------|
| Active | forest-900 | 600 | `2px solid forest-800` |
| Inactive | ink-60 | 400 | `2px solid transparent` |

`marginBottom: -1` 讓 active 底線蓋住容器底線

### 5.2 Tab: 養護指南

| 斷點 | Grid |
|------|------|
| Desktop | `1fr 1fr 1fr` |
| Tablet / Mobile | `1fr` |

三張卡片，每張：

| 屬性 | 值 |
|------|-----|
| 背景 | cream-50 |
| Padding | 20px 22px |
| 編號 | Mono 11px, forest-600, "01" / "02" / "03" |
| 標題 | Serif 18px, SemiBold (光照/澆水/濕度) |
| 說明 | 13px, ink-60, lineHeight 1.7 |

說明文字會動態帶入 `product.light` / `product.water`

### 5.3 Tab: 商品規格

Key-value 表格，最大寬度 600px

| 屬性 | 值 |
|------|-----|
| Label 欄寬 | 120px |
| 間距 | gap 16px |
| 分隔 | `1px solid var(--ink-08)` |
| Label 字體 | Mono, ink-60, letter-spacing 0.05em |
| Value 字體 | 13px, forest-900 |

**動態值：**
- 尺寸會根據目前選擇的 S/M/L 動態更新
- 毒性說明根據 `product.pet` 切換

### 5.4 Tab: 配送與退換

純文字段落，最大寬度 640px，14px，lineHeight 1.85，ink 色

### 5.5 Tab: 評價

| 斷點 | Grid |
|------|------|
| Desktop | `1fr 1fr` |
| Tablet / Mobile | `1fr` |

每張評價卡：

| 屬性 | 值 |
|------|-----|
| 背景 | cream-50 |
| Padding | 20px 22px |
| 上方左 | 姓名 (14px, 600) + 地點 (Mono 10px, ink-60) |
| 上方右 | 星星 (12×12, forest-600) |
| 引言 | Serif 14px, forest-900, lineHeight 1.7, 「」包裹 |

---

## 6. Related Products (相關推薦)

**標題：** 「你可能也會喜歡」Serif Desktop 28px / Mobile 22px, SemiBold

| 斷點 | Grid | Gap |
|------|------|-----|
| Desktop | `repeat(4, 1fr)` | 16px |
| Tablet | `repeat(3, 1fr)` | 16px |
| Mobile | `1fr 1fr` | 12px |

**資料邏輯：** 從 `featured` 排除當前商品，取前 4 項

每張卡（簡化版）：

| 元素 | 樣式 |
|------|------|
| 圖片 | 1:1, sage-100 背景, border-radius 12 |
| 名稱 | Serif 14px, SemiBold, forest-900 |
| 價格 | Mono 12px, forest-800 |

**行為：** 點擊 → `<a href="?product={id}">`，全頁面跳轉

---

## 7. RWD 斷點彙整

| 元素 | Desktop (≥1024) | Tablet (640–1023) | Mobile (<640) |
|------|-----------------|-------------------|---------------|
| 主區域佈局 | 兩欄 1.05fr + 1fr | 單欄 | 單欄 |
| 主區域間距 | 56px | 24px | 24px |
| 側邊 padding | 56px | 32px | 20px |
| 商品名字級 | 44px | 44px | 32px |
| 屬性卡 grid | 3 欄 | 3 欄 | 2 欄 |
| 養護指南 grid | 3 欄 | 1 欄 | 1 欄 |
| 評價 grid | 2 欄 | 1 欄 | 1 欄 |
| 推薦商品 grid | 4 欄 | 3 欄 | 2 欄 |
| Tab 間距 | 32px | 18px | 18px |
| Tab 溢出 | — | 橫向捲動 | 橫向捲動 |
| 底部 padding | 64px | 64px | 32px |

---

## 8. 互動行為總覽

| 互動 | 觸發 | 效果 | 持久化 |
|------|------|------|--------|
| 切換縮圖 | 點擊縮圖 | 主圖切換 (即時) | 否 |
| 切換尺寸 | 點擊 S/M/L | 尺寸高亮 + 規格 tab 尺寸更新 | 否 (預設 M) |
| 調整數量 | 點擊 −/+ | 數量 ±1，最小 1 | 否 (預設 1) |
| 願望清單 | 點擊愛心 | toggle 填充/空心 + toast | localStorage |
| 加入購物車 | 點擊按鈕 | toast "已加入購物車：{name} × {qty}" | 否 |
| 立即購買 | 點擊按鈕 | (目前無功能) | — |
| 切換 Tab | 點擊 tab | 切換內容區塊 (即時，無動畫) | 否 (預設 care) |
| 返回首頁 | 點麵包屑「首頁」 | pushState 移除 ?product，scrollTo(0,0) | URL |
| 瀏覽器返回 | popstate 事件 | 解析 URL 切換路由 | URL |

---

## 9. 狀態管理

| State | 型別 | 初始值 | 用途 |
|-------|------|--------|------|
| `qty` | number | 1 | 購買數量 |
| `size` | 'S' \| 'M' \| 'L' | 'M' | 選擇的尺寸 |
| `tab` | string | 'care' | 當前 tab |
| `imgIdx` | number | 0 | 當前主圖 index |
| `wishlist` | Set<string> | localStorage 讀取 | 全域願望清單（App 層級） |

所有 state 在離開頁面後重置（回來會是預設值），除了 wishlist 持久化在 localStorage。

---

## 10. Design Tokens 速查

### 顏色

| Token | Hex | 用途 |
|-------|-----|------|
| `--forest-900` | #14271e | 商品名、標題、深色文字 |
| `--forest-800` | #1f3a2e | 按鈕填充、價格、選中狀態 |
| `--forest-600` | #3a6b4a | 星星、屬性 icon、tag 標籤 |
| `--cream-50` | #f4f6ee | 按鈕文字（on dark）、浮動元素背景 |
| `--sage-100` | #e9ede0 | 圖片佔位背景、配送說明背景 |
| `--ink-60` | rgba(20,39,30,0.6) | 副文字、描述文字 |
| `--ink-40` | rgba(20,39,30,0.4) | 原價刪除線、學名 |
| `--ink-15` | rgba(20,39,30,0.15) | Tab 底線、未選尺寸 border |
| `--ink-08` | rgba(20,39,30,0.08) | 分隔線 |
| `--accent` | #d97757 | 已收藏愛心 |
| `--paper` | #fafaf6 | 頁面背景 |

### 字體

| Class | Font Family | 用途 |
|-------|-------------|------|
| `.serif` | Noto Serif TC | 商品名、Tab 標題、引言 |
| (default) | Noto Sans TC | 內文、說明、按鈕 |
| `.mono` | JetBrains Mono | 價格、學名、標籤、編號 |

### 按鈕

| Class | 背景 | 文字 | Border | Hover |
|-------|------|------|--------|-------|
| `.btn-primary` | forest-800 | cream-50 | 無 | forest-900 |
| `.btn-secondary` | transparent | forest-800 | 1px solid forest-800 | 填滿 forest-800 + 反白 |

---

## 11. 圖片處理

| 場景 | 處理 |
|------|------|
| 正常載入 | `<SafeImg>` 元件，`loading="lazy"` |
| 載入失敗 | 自動切換到 SVG 植物佔位圖 (inline data URI) |
| 尺寸 | Unsplash URL 參數控制 `?w=800&q=80` |

目前 gallery 來源：`[product.img, product.img2, product.img]`（3 張，第 3 張重複主圖）

---

## 12. 已知限制 & 注意事項

1. **CSS border-radius 全域覆蓋**：`styles.css` 最底部有 `.oasis * { border-radius: 0 !important }`，所有內聯 borderRadius 都會被覆蓋為 0。如果未來需要圓角元素，需在該規則前加例外。

2. **按鈕 specificity**：`.oasis button` 會 reset 所有按鈕的 background/padding/border。新增按鈕樣式必須用 `.oasis .btn-*` 提升優先級。

3. **評分/評價數量**：目前寫死為 "4.9 · 184 評價"，未從資料帶入。

4. **商品描述**：目前是固定文案，未從 product data 帶入。

5. **「立即購買」按鈕**：目前無功能，待串接結帳流程。

6. **「尺寸對照表」連結**：目前 `href="#"`，無實際頁面。

7. **相關商品**：使用 `<a href>` 而非 SPA 導航，會造成全頁面重新載入。未來應改為 `onClick` + `onOpen`。
