# 綠洲所 Design Tokens

> 完整設計語彙定義 · 供 Figma Variables 匯入與前端開發對照
> 最後更新：2026-04-29

---

## Token 架構

採用三層架構，與 Figma Variables 的 Collection 對應：

```
Primitives (原始值)     → 純粹的數值，不帶語意
  ↓ alias
Semantics (語意層)      → 賦予用途意義，如 bg-primary, text-body
  ↓ alias
Components (元件層)     → 特定元件的 token，如 btn-primary-bg
```

本文件定義 **Primitives** 層的所有 token。Semantics 和 Components 層將在後續迭代中建立。

---

## 1. 色彩系統 Color

### 1.1 Forest（主色 — 品牌綠）

品牌核心色，從深到淺覆蓋背景、填充、文字等用途。

| Token | Hex | 目前用途 |
|-------|-----|---------|
| forest.900 | `#14271e` | 頁面文字、footer 背景 |
| forest.800 | `#1f3a2e` | 按鈕填充、nav logo 背景、價格文字、promo 背景 |
| forest.700 | `#2a4a3a` | 備用中間色 |
| forest.600 | `#3a6b4a` | 星星、屬性 icon、eyebrow 標籤 |
| forest.500 | `#5b8a5a` | 備用亮綠 |

### 1.2 Sage（輔助綠 — 自然色）

柔和的灰綠色，用於背景和裝飾性元素。

| Token | Hex | 目前用途 |
|-------|-----|---------|
| sage.300 | `#c9d5b5` | Promo 區小文字、footer 標籤 |
| sage.200 | `#dde3cd` | Hero 圖片佔位背景 |
| sage.100 | `#e9ede0` | 商品圖背景、配送說明背景、tab pill 容器 |

### 1.3 Cream（暖底色）

米白色系，作為淺色背景和反白文字。

| Token | Hex | 目前用途 |
|-------|-----|---------|
| cream.100 | `#ebe8df` | 備用暖底 |
| cream.50 | `#f4f6ee` | Hero 背景、情境推薦背景、按鈕反白文字 |

### 1.4 Paper（頁面底色）

| Token | Hex | 目前用途 |
|-------|-----|---------|
| paper | `#fafaf6` | 全站頁面背景 |

### 1.5 Accent（強調色）

| Token | Hex | 目前用途 |
|-------|-----|---------|
| accent.500 | `#d97757` | 已收藏愛心 |

### 1.6 Status（狀態色）

| Token | Hex | 目前用途 |
|-------|-----|---------|
| error.500 | `#b85450` | 錯誤狀態（目前未使用，預留） |

### 1.7 Ink（文字色 — 透明度階梯）

以 forest.900 為基色，透過透明度控制層級。

| Token | Hex / RGBA | 目前用途 |
|-------|------------|---------|
| ink.100 | `#14271e` (100%) | 主文字、標題 |
| ink.60 | `#14271e` @ 60% | 描述文字、副標 |
| ink.40 | `#14271e` @ 40% | 次要資訊、原價、學名 |
| ink.15 | `#14271e` @ 15% | 分隔線、未選中 border |
| ink.08 | `#14271e` @ 8% | Nav 底線、規格表分隔 |

### 1.8 White Alpha（白色透明度）

用於深色背景上的疊加元素。

| Token | Value | 目前用途 |
|-------|-------|---------|
| white.95 | `#ffffff` @ 95% | Hover 屬性 badge 背景 |
| white.10 | `#ffffff` @ 10% | Promo 折扣碼背景 |

---

## 2. 間距系統 Space

基於 4px 網格，使用遞增的 scale。

| Token | Value | 目前用途範例 |
|-------|-------|-------------|
| space.0 | 0px | 重置 |
| space.1 | 2px | 微間距（字母間距、marginTop 極小） |
| space.2 | 4px | Carousel dots 高度、pill padding-y、最小 gap |
| space.3 | 6px | Tag padding-y、配送項目 padding-y |
| space.4 | 8px | Section eyebrow marginBottom、tab pill gap |
| space.5 | 10px | 尺寸選擇 gap、縮圖 gap、屬性卡 gap |
| space.6 | 12px | 按鈕 gap、Mobile product card padding、商品 grid gap (M) |
| space.7 | 14px | Mobile nav padding-y、按鈕 padding-y |
| space.8 | 16px | Desktop product card padding、tab gap (D)、color grid gap |
| space.9 | 20px | Mobile side padding、section marginBottom |
| space.10 | 24px | Section marginBottom、Desktop product grid gap、drawer padding |
| space.11 | 28px | Hero mobile marginTop、carousel dots marginTop (M) |
| space.12 | 32px | Tablet side padding、Mobile section padding-y |
| space.13 | 36px | Desktop hero gap |
| space.14 | 40px | Desktop hero gap、footer grid gap |
| space.15 | 48px | Desktop section padding-y、hero carousel dots marginTop (D) |
| space.16 | 56px | Desktop side padding、footer padding-y、Desktop product section gap |
| space.17 | 64px | Hero padding-y (D) |
| space.18 | 72px | Featured section padding-top (D)、Reviews padding-y (D) |
| space.19 | 80px | Related products padding-bottom (D) |

---

## 3. 文字樣式 Typography

### 3.1 字型家族 Font Family

| Token | Value | 角色 |
|-------|-------|------|
| font.serif | `"Noto Serif TC", "Songti TC", "PingFang TC", serif` | 情感：標題、引言、商品名 |
| font.sans | `"Noto Sans TC", "PingFang TC", "Helvetica Neue", system-ui, sans-serif` | 資訊：內文、說明、按鈕 |
| font.mono | `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace` | 數據：價格、標籤、倒數、學名 |

### 3.2 字重 Font Weight

| Token | Value | 用途 |
|-------|-------|------|
| weight.regular | 400 | 內文、說明、nav 未選中 |
| weight.medium | 500 | 按鈕文字、描述 |
| weight.semibold | 600 | 標題、商品名、價格、nav 選中 |
| weight.bold | 700 | 備用（目前未使用） |

### 3.3 字級 Font Size

| Token | Value | 目前用途 |
|-------|-------|---------|
| size.9 | 9px | Nav 副標 "OASIS·STUDIO"、購物車 badge |
| size.10 | 10px | 商品學名、tag、屬性標籤、countdown label |
| size.11 | 11px | Eyebrow、Tab pill (M)、hero 圖片標籤 |
| size.12 | 12px | Breadcrumb、評分文字、promo countdown label (M)、促銷按鈕 |
| size.13 | 13px | Tab pill (D)、配送說明、養護卡內文、footer 連結 |
| size.14 | 14px | Nav link、內文、按鈕文字、tab 項目 |
| size.15 | 15px | Mobile drawer link、body text (D)、category name (D) |
| size.17 | 17px | Desktop 商品卡名稱、Mobile nav logo |
| size.18 | 18px | Desktop nav logo、Serif section title (care guide) |
| size.19 | 19px | Desktop guide 標題 |
| size.20 | 20px | Drawer logo |
| size.22 | 22px | Scenario 標題 (D)、Related products 標題 (M)、countdown (M) |
| size.24 | 24px | Section 標題 (M)、countdown separator |
| size.26 | 26px | Featured 標題 (M)、Promo 標題 (M) |
| size.28 | 28px | Countdown 數字 (D)、Related products 標題 (D) |
| size.32 | 32px | Section 標題 (D)、Hero 標題 (M)、PDP 價格、PDP 商品名 (M) |
| size.36 | 36px | Featured 標題 (D)、Promo 標題 (D) |
| size.40 | 40px | Hero 標題 (Tablet) |
| size.44 | 44px | PDP 商品名 (D) |
| size.48 | 48px | Hero 標題 (Desktop) |

### 3.4 行高 Line Height

| Token | Value | 用途 |
|-------|-------|------|
| leading.none | 1.0 | 倒數計時器、nav logo |
| leading.tight | 1.1 | Hero 標題、PDP 商品名 |
| leading.snug | 1.4 | Guide 標題 |
| leading.normal | 1.6 | Promo 副文字 |
| leading.relaxed | 1.7 | 養護卡內文、評價引言 |
| leading.loose | 1.75 | Reviews 引言 |
| leading.body | 1.8 | Hero 副文字 |
| leading.prose | 1.85 | 商品描述、配送文字 |

### 3.5 字距 Letter Spacing

| Token | Value | 用途 |
|-------|-------|------|
| tracking.normal | 0 | 預設 |
| tracking.mono | 0.02em | Mono 預設 |
| tracking.label | 0.05em | 商品 tag |
| tracking.timer | 0.1em | 倒數 label |
| tracking.eyebrow | 0.18em | Eyebrow、section label |

---

## 4. 圓角 Border Radius

目前全站強制 `border-radius: 0`（直角風格），但 token 系統仍保留完整 scale 供未來切換。

| Token | Value | 備註 |
|-------|-------|------|
| radius.none | 0px | **目前全站使用**（CSS !important 覆蓋） |
| radius.sm | 4px | Promo 折扣碼 pill |
| radius.md | 6px | Hover 屬性 badge |
| radius.lg | 10px | 尺寸選擇按鈕、縮圖 |
| radius.xl | 12px | 分類卡、guide 圖片、配送說明 |
| radius.2xl | 14px | 商品卡片、情境卡 |
| radius.3xl | 16px | Promo banner、Reviews 容器 |
| radius.4xl | 18px | Hero 圖片、PDP 主圖 |
| radius.full | 999px | Pill 按鈕、Nav logo 圓、數量選擇器 |

> **注意：** 目前 `styles.css` 底部使用 `.oasis * { border-radius: 0 !important }` 強制覆蓋所有圓角。上方 token 為原始設計值，留存作為風格切換基礎。

---

## 5. 陰影 Shadow

| Token | Value | 用途 |
|-------|-------|------|
| shadow.none | `none` | 預設 |
| shadow.card | `0 12px 24px rgba(20, 39, 30, 0.08)` | 商品卡片 hover |
| shadow.toast | `0 8px 24px rgba(20, 39, 30, 0.25)` | Toast 通知 |
| shadow.overlay | — | 側邊抽屜背景遮罩 `rgba(20, 39, 30, 0.5)` |

---

## 6. 邊框 Border

| Token | Value | 用途 |
|-------|-------|------|
| border.default | `1px solid var(--ink-08)` | Nav 底線、分類卡邊框 |
| border.divider | `1px solid var(--ink-15)` | Tab 底線、footer 分隔 |
| border.active | `1.5px solid var(--forest-800)` | Nav active link 底線 |
| border.selected | `2px solid var(--forest-800)` | 縮圖選中、尺寸選中 |
| border.unselected | `1.5px solid var(--ink-15)` | 尺寸未選中 |
| border.transparent | `2px solid transparent` | 縮圖未選 |

---

## 7. 網格與佈局 Grid & Layout

### 7.1 斷點 Breakpoints

| Token | Value | 方法 |
|-------|-------|------|
| breakpoint.mobile | < 640px | ResizeObserver (container) |
| breakpoint.tablet | 640 – 1023px | ResizeObserver (container) |
| breakpoint.desktop | ≥ 1024px | ResizeObserver (container) |

### 7.2 側邊 Padding

| Token | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| layout.padding | 56px | 32px | 20px |

### 7.3 Grid 欄位

| 區塊 | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| PDP 主區域 | `1.05fr 1fr` | `1fr` | `1fr` |
| Hero | `1.1fr 1fr` | `1fr` | `1fr` |
| 精選商品 | `repeat(3, 1fr)` | `1fr 1fr` | `1fr 1fr` |
| 分類 | `repeat(5, 1fr)` | `repeat(3, 1fr)` | `1fr 1fr` |
| 情境推薦 | `repeat(3, 1fr)` | `1fr` | `1fr` |
| 養護指南 | `repeat(3, 1fr)` | `repeat(3, 1fr)` | `1fr` |
| Reviews | `1fr 1.4fr` | `1fr` | `1fr` |
| 相關商品 | `repeat(4, 1fr)` | `repeat(3, 1fr)` | `1fr 1fr` |
| 屬性卡 | `repeat(3, 1fr)` | `repeat(3, 1fr)` | `1fr 1fr` |
| 評價 tab | `1fr 1fr` | `1fr` | `1fr` |

---

## 8. 動態效果 Motion

| Token | Value | 用途 |
|-------|-------|------|
| duration.fast | 150ms | 按鈕 hover 背景 |
| duration.normal | 200ms | 卡片 hover 上移、opacity 淡入 |
| duration.medium | 250ms | Toast slide-in、nav 底線展開 |
| duration.slow | 300ms | 側邊選單 slide-in/out、圖片交叉淡入 |
| duration.page | 450ms | 頁面轉場覆蓋動畫 |
| easing.default | `ease` | 通用 |
| easing.smooth | `cubic-bezier(.4, 0, .2, 1)` | 側邊選單、頁面轉場 |

---

## 9. 尺寸 Sizing

### 9.1 Icon 尺寸

| Token | Value | 用途 |
|-------|-------|------|
| icon.sm | 14px | Star、sun、drop、pet |
| icon.md | 18px | Nav icons (search, cart, heart, menu)、leaf |
| icon.lg | 20px | Mobile menu icon |

### 9.2 固定元素尺寸

| Token | Value | 用途 |
|-------|-------|------|
| avatar.sm | 14px | 購物車 badge |
| avatar.md | 28px | Mobile nav logo circle |
| avatar.lg | 32px | Desktop nav logo circle、商品卡購物車按鈕 |
| avatar.xl | 36px | Desktop nav icon buttons、Review arrow buttons |
| avatar.2xl | 38px | PDP 願望清單按鈕 |
| input.height | 48px | 數量選擇器、加入購物車按鈕 |

---

## 10. Z-index

| Token | Value | 用途 |
|-------|-------|------|
| z.base | 0 | 預設 |
| z.nav | 50 | Sticky nav |
| z.overlay | 100 | 側邊選單遮罩 |
| z.toast | 9999 | Toast 通知 |
| z.transition | 9998 | 頁面轉場覆蓋 |

---

## Figma 匯入對照

本文件的 Primitives token 對應以下 JSON 檔案，可直接匯入 Figma Variables：

| JSON 檔案 | Figma Collection | 內容 |
|-----------|-----------------|------|
| `tokens/primitives.json` | Primitives | 色彩、間距、圓角、字級、字重、行高、字距 |
| `tokens/semantics.json` | Semantics | （待建立）語意 alias |
| `tokens/components.json` | Components | （待建立）元件 alias |
