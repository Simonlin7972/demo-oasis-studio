# PRD: 綠洲所 Homepage

**Status:** Draft
**Owner:** —
**Last Updated:** 2026-04-28
**Target Release:** —
**Availability:** All users

---

## Problem

20-30 歲都市租屋族想為生活空間增添綠意，但不知道從何開始選擇植物、不確定自己的空間適合什麼、也擔心養不活。他們需要一個清楚、有設計感的電商首頁，能快速了解品牌調性、發現適合自己的植物、並感受到購買的信心。

## Target Persona

- 20-30 歲都市租屋族 / 小資族
- 第一次養植物或有基礎經驗
- 重視生活品質與美感，願意為設計感買單
- 空間有限（小套房、辦公桌）

---

## 現有功能規格

### 1. Navigation Bar

| 項目 | 規格 |
|------|------|
| Logo | Leaf icon + 「綠洲所」（Noto Serif TC, 18px, SemiBold） |
| 選單項目 | 首頁、商品、情境推薦、養護指南、門市、關於我們 |
| Active 狀態 | 底線 1.5px solid forest-800 + font-weight 600 |
| Hover 狀態 | 底線淡入 (transition 0.18s) |
| 右側功能 | 搜尋、願望清單（Desktop only）、購物車（含數量 badge） |
| RWD | Desktop: 完整水平選單 / Tablet+Mobile: 漢堡選單 + 側邊抽屜（slide-in 300ms） |
| Sticky | 是，`position: sticky; top: 0; z-index: 50` |

**側邊抽屜規格（Tablet/Mobile）：**
- 寬度 280px，從左側 slide-in
- 背景遮罩 `rgba(20,39,30,.5)` 同步淡入
- 開啟時鎖定背景滾動 (`overflow: hidden`)
- 關閉動畫 300ms，完成後移除 DOM

### 2. Hero Section

| 項目 | 規格 |
|------|------|
| 版面 | Desktop: 左文 (1.1fr) 右圖 (1fr) / Tablet+Mobile: 單欄，圖在上文在下 |
| 輪播 | 2 張 slides，自動切換 6 秒，hover 暫停 |
| 標題字級 | Desktop: 48px / Tablet: 40px / Mobile: 32px |
| 標題字體 | Noto Serif TC, SemiBold, line-height 1.1 |
| Eyebrow | JetBrains Mono, 11px, letter-spacing 0.18em, uppercase |
| 按鈕 | Primary (實心深綠) + Secondary (描邊) |
| 按鈕 RWD | Mobile: 上下堆疊排列（flex-direction: column），寬度撐滿 |
| Carousel dots | 寬窄條狀（active: 28px, inactive: 8px），高度 4px |
| 圖片標籤 | 左下角，深綠半透明背景 + backdrop-blur，顯示 "01 / 02 · 圖片名稱" |

**Slide 內容：**

| Slide | Eyebrow | 標題 | CTA |
|-------|---------|------|-----|
| 1 | 春季新品 — 04/28 上市 | 在城市裡 / 種一片自己的森林 | 逛逛新品 + 探索養護指南 |
| 2 | 本週主打 — 新手友善 | 從第一盆 / 開始的儀式感 | 查看耐陰選集 + 我是新手 |

### 3. Promo Banner

| 項目 | 規格 |
|------|------|
| 背景 | forest-800 (#1f3a2e) |
| 版面 | Desktop: 左文右倒數 / Tablet+Mobile: 單欄堆疊 |
| 倒數計時器 | DAYS : HRS : MIN : SEC，JetBrains Mono，每秒更新 |
| 數字字級 | Desktop: 28px / Mobile: 22px |
| 促銷碼 | 半透明背景 pill 顯示代碼（如 OASIS200） |
| CTA | 「立即選購 →」按鈕，cream 底色 + forest 文字 |

### 4. Featured Products (主打商品)

| 項目 | 規格 |
|------|------|
| Grid | Desktop: 3 欄 / Tablet: 2 欄 / Mobile: 2 欄 |
| 間距 | Desktop: 24px / Mobile: 12px |
| Tab 篩選 | 全部精選、新手友善、空間主角、寵物友善 |
| Tab 樣式 | Pill 型，sage-100 背景，active 為白底 + fontWeight 600 |
| Section header | Eyebrow "本週精選 · WEEKLY PICKS" + Serif 標題 "主打商品" |

**商品卡片規格：**

| 項目 | 規格 |
|------|------|
| 圖片 | 1:1 比例，`object-fit: cover` |
| Hover 效果 | 陰影 `0 12px 24px rgba(20,39,30,.08)` + 上移 2px + 顯示第二張圖（opacity 交叉淡入 0.3s） |
| Hover badges | 左下角顯示光照/澆水/寵物友善資訊（Mobile 不顯示） |
| Tag | 左上角 pill（cream 底 + forest 文字，10px） |
| 願望清單 | 右上角圓形按鈕，toggle 愛心圖示，accent 色 (#d97757) |
| 商品名 | Noto Serif TC, 17px (Mobile 15px), SemiBold |
| 學名 | JetBrains Mono, 10px, italic, ink-40 |
| 價格 | JetBrains Mono, 16px (Mobile 14px), SemiBold |
| 原價 | 刪除線，ink-40，10px |
| 加入購物車 | 右下角圓形深綠按鈕 32x32，cart icon |

### 5. Categories (商品分類)

| 項目 | 規格 |
|------|------|
| Grid | Desktop: 5 欄 / Tablet: 3 欄 / Mobile: 2 欄 |
| 卡片 | 圖片 (aspect-ratio 1.2) + 名稱/數量行 |
| 分類 | 室內植物 (42)、多肉植物 (28)、空氣鳳梨 (14)、陶盆器皿 (36)、養護工具 (22) |

### 6. Scenarios (情境推薦)

| 項目 | 規格 |
|------|------|
| 背景 | cream-50 (#f4f6ee) |
| Grid | Desktop: 3 欄 / Tablet: 1 欄（寬卡 aspect-ratio 2.4）/ Mobile: 1 欄 |
| Tag badges | Pill 型，sage-100 背景，11px |
| 情境 | 給辦公室、給小套房、給新手 |
| 右上連結 | 「查看全部 →」ghost button |

### 7. Reviews (客戶評價)

| 項目 | 規格 |
|------|------|
| 版面 | Desktop: 左圖右文 (1:1.4) / Tablet+Mobile: 單欄堆疊 |
| 容器 | 最大寬度 880px，置中 |
| 輪播 | 3 則評價，自動切換 7 秒 |
| 星星 | forest-600 填充星星 icon |
| 引言 | Noto Serif TC, 18px (Mobile 15px), font-weight 500 |
| 切換按鈕 | 左箭頭（outlined 圓形）+ 右箭頭（filled 深綠圓形） |

### 8. Guides (養護指南)

| 項目 | 規格 |
|------|------|
| Grid | 3 欄（所有斷點，Mobile 改 1 欄） |
| 圖片 | aspect-ratio 1.4 |
| 分類標籤 | JetBrains Mono, 10px, forest-600, "新手指南 · 5 分鐘" 格式 |
| 標題 | Noto Serif TC, 19px (Mobile 17px), SemiBold |

### 9. Footer

| 項目 | 規格 |
|------|------|
| 背景 | forest-900 (#14271e) |
| Grid | Desktop: 4 欄 (1.4fr 1fr 1fr 1fr) / Tablet: 2 欄 / Mobile: 1 欄 |
| 品牌區 | 「綠洲所」Serif 22px + "OASIS · STUDIO" Mono 10px + slogan |
| 連結分類 | 關於（4 項）、客服（4 項）、社群（4 項） |
| 底部 | 分隔線 + 版權 "© 2026 OASIS STUDIO · TAIPEI" + 隱私政策/服務條款 |

### 10. 共用互動

| 功能 | 規格 |
|------|------|
| Toast 通知 | 頂部置中彈出，深綠背景，2.4 秒自動消失，slide-in 動畫 |
| 願望清單 | localStorage 持久化，key `oasis-conservative` |
| SafeImg | 圖片載入失敗自動 fallback 到 SVG 植物佔位圖 |

---

## 未來功能開發

### Phase 1 — 基礎電商功能

#### 1.1 商品篩選邏輯
目前 Featured section 的 tab 篩選（新手友善/空間主角/寵物友善）僅切換 UI 狀態，尚未實作篩選邏輯。

- 根據商品的 `tag`、`pet`、`light` 等屬性實作篩選
- 加入篩選動畫（fade/slide transition）
- 記錄使用者偏好篩選，用於個人化推薦

#### 1.2 購物車側邊抽屜
- 從右側 slide-in 的購物車面板
- 顯示已加入商品清單、數量調整、小計
- 商品圖片縮圖 + 名稱 + 尺寸 + 單價
- 「前往結帳」CTA
- 空購物車狀態：植物插圖 + 「開始選購」連結

#### 1.3 搜尋功能
- 點擊搜尋 icon 展開搜尋列（overlay 或 inline）
- 即時搜尋建議（商品名稱、分類、標籤）
- 搜尋結果頁（grid 顯示 + 排序/篩選）
- 熱門搜尋關鍵字推薦

### Phase 2 — 內容與個人化

#### 2.1 情境推薦互動化
- 點進情境頁面顯示該情境的推薦商品清單
- 互動式問答：「你的空間有多大？」「光線如何？」→ 推薦結果
- 根據回答記錄偏好，個人化首頁推薦

#### 2.2 養護指南內容頁
- 點進養護文章的完整內容頁
- 圖文並茂的文章排版
- 相關商品推薦（文章內嵌）
- 文章分類頁（所有文章 grid + 分類篩選）

#### 2.3 促銷活動系統
- 後台可配置的促銷活動（倒數時間、折扣碼、門檻）
- 多活動輪播
- 促銷結束後自動隱藏或切換下一檔

### Phase 3 — 社群與信任

#### 3.1 UGC 照片牆
- 客戶上傳的植物照片 gallery
- Instagram 風格的瀑布流排版
- 照片標記購買的商品，可直接點選購買
- 按讚/收藏功能

#### 3.2 評價系統強化
- 更多評價載入（分頁或 infinite scroll）
- 按星等篩選
- 帶照片的評價
- 「最有幫助」排序

#### 3.3 LINE / 社群整合
- LINE 官方帳號綁定
- 訂單通知推播
- LINE 登入
- 社群分享按鈕（分享商品/養護文章）

### Phase 4 — 技術優化

#### 4.1 效能優化
- 圖片 lazy loading + WebP/AVIF 格式
- 首屏 LCP 優化（Hero 圖片 preload）
- 遷移至 Vite + React SPA 或 Next.js（SSR/SEO）
- 靜態資源 CDN

#### 4.2 SEO
- 商品結構化資料 (JSON-LD)
- 動態 meta tags
- Sitemap 自動產生
- Open Graph / Twitter Card

#### 4.3 Analytics
- 頁面瀏覽追蹤（GA4 / Mixpanel）
- 商品點擊熱區分析
- 加入購物車 / 願望清單事件追蹤
- A/B Testing 基礎建設（Hero 文案、CTA 按鈕）

---

## Open Questions

| 問題 | 假設 | 驗證方式 |
|------|------|----------|
| Hero 輪播 vs 靜態，哪個轉換率更高？ | 輪播能展示更多內容 | A/B test Hero 靜態 vs 輪播 |
| 使用者是否真的會使用 tab 篩選？ | 篩選能幫助決策 | 追蹤篩選 tab 點擊率 |
| 情境推薦 vs 商品分類，哪個更能引導購買？ | 情境推薦對新手更有效 | 追蹤兩區塊的 CTR 比較 |
| 促銷 banner 的最佳位置？ | Hero 下方效果最好 | 嘗試 Hero 內嵌 vs 獨立 banner |
