// 綠洲所 Design System — Button Documentation
// Modeled after Adobe Spectrum's component documentation structure.

function DSButtonPage({ onHome, onDS }) {
  const { bp } = useViewport();
  const m = bp === 'mobile';
  const px = m ? '20px' : bp === 'tablet' ? '32px' : '56px';
  const maxW = 960;

  const Section = ({ title, children, id }) => (
    <section id={id} style={{ padding: `${m ? 36 : 48}px ${px}`, borderBottom: '1px solid var(--ink-08)' }}>
      <div style={{ maxWidth: maxW, margin: '0 auto' }}>
        <h2 className="serif" style={{ fontSize: m ? 22 : 28, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 24 }}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );

  const SubSection = ({ title, children }) => (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 14 }}>{title}</h3>
      {children}
    </div>
  );

  const Desc = ({ children }) => (
    <p style={{ fontSize: 14, color: 'var(--ink-60)', lineHeight: 1.75, marginBottom: 16, maxWidth: 640 }}>{children}</p>
  );

  const Demo = ({ children, bg }) => (
    <div style={{
      padding: m ? '24px 20px' : '32px 36px', background: bg || 'var(--cream-50)',
      border: '1px solid var(--ink-08)', marginBottom: 12
    }}>
      {children}
    </div>
  );

  const Spec = ({ label, value }) => (
    <div style={{
      display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12,
      padding: '10px 0', borderBottom: '1px solid var(--ink-08)', fontSize: 13
    }}>
      <div className="mono" style={{ color: 'var(--ink-60)', letterSpacing: '.05em' }}>{label}</div>
      <div style={{ color: 'var(--forest-900)' }}>{value}</div>
    </div>
  );

  const DoRow = ({ doText, dontText }) => (
    <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
      <div>
        <div style={{
          padding: '20px 24px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)', marginBottom: 8
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {doText.demo}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--forest-600)', fontSize: 14, fontWeight: 700 }}>DO</span>
          <span style={{ fontSize: 13, color: 'var(--ink-60)' }}>{doText.desc}</span>
        </div>
      </div>
      <div>
        <div style={{
          padding: '20px 24px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)', marginBottom: 8
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {dontText.demo}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--error)', fontSize: 14, fontWeight: 700 }}>DON'T</span>
          <span style={{ fontSize: 13, color: 'var(--ink-60)' }}>{dontText.desc}</span>
        </div>
      </div>
    </div>
  );

  // Table of contents
  const toc = [
    { id: 'anatomy', label: '結構 Anatomy' },
    { id: 'options', label: '選項 Options' },
    { id: 'behaviors', label: '行為 Behaviors' },
    { id: 'usage', label: '使用指南 Usage' },
    { id: 'content', label: '文案規範 Content' },
    { id: 'specs', label: '設計規格 Specs' },
    { id: 'accessibility', label: '無障礙 Accessibility' },
  ];

  return (
    <>
      {/* Header */}
      <div style={{
        padding: `${m ? 14 : 18}px ${px}`,
        borderBottom: '1px solid var(--ink-08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50, background: 'var(--paper)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--forest-800)',
              display: 'grid', placeItems: 'center', color: 'var(--cream-50)'
            }}>
              <Icon.leaf width={18} height={18} />
            </div>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button onClick={onDS} style={{ fontSize: 14, color: 'var(--ink-60)' }}>Design System</button>
            <span style={{ color: 'var(--ink-40)', fontSize: 12 }}>/</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)' }}>Button</span>
          </div>
        </div>
        <button onClick={onDS} className="btn-ghost" style={{ fontSize: 12, padding: '8px 0' }}>
          <Icon.arrowL /> 返回 DS
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: `${m ? 48 : 64}px ${px} ${m ? 32 : 40}px` }}>
        <div style={{ maxWidth: maxW, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>COMPONENT · 元件</div>
          <h1 className="serif" style={{ fontSize: m ? 36 : 48, fontWeight: 600, color: 'var(--forest-900)', lineHeight: 1.1 }}>
            Button 按鈕
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.8, marginTop: 16, maxWidth: 600 }}>
            按鈕用於觸發動作或事件，例如提交表單、開啟對話框、取消操作，或執行刪除等。按鈕的文案應清楚描述使用者按下後會發生的行為。
          </p>

          {/* TOC */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
            {toc.map((t) => (
              <a key={t.id} href={`#${t.id}`} style={{
                fontSize: 12, padding: '6px 14px', background: 'var(--sage-100)',
                color: 'var(--forest-800)', fontWeight: 500
              }}>{t.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ANATOMY ═══ */}
      <Section title="結構 Anatomy" id="anatomy">
        <Desc>
          按鈕由容器（container）、文字標籤（label）與可選圖示（icon）組成。所有按鈕共用一致的高度與間距規範，確保在不同情境下保持對齊。
        </Desc>
        <Demo>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
              <button className="btn-primary" style={{ position: 'relative' }}>
                立即選購 <Icon.arrow />
              </button>
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                {['Container', 'Label', 'Icon'].map((part, i) => (
                  <div key={part} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: i === 0 ? 'var(--forest-800)' : i === 1 ? 'var(--forest-600)' : 'var(--accent)'
                    }} />
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-60)' }}>{part}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Demo>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: 12 }}>
          {[
            { label: 'Container', desc: '按鈕的外框與背景。依變體（variant）不同呈現填色或描邊樣式。' },
            { label: 'Label', desc: '按鈕文字。使用簡短的動詞或動詞短語，描述按下後的結果。' },
            { label: 'Icon（選填）', desc: '放置在文字右側，用於強化按鈕語意。常用箭頭表示導向。' },
          ].map((item) => (
            <div key={item.label} style={{ padding: '16px 18px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ OPTIONS ═══ */}
      <Section title="選項 Options" id="options">

        <SubSection title="變體 Variants">
          <Desc>綠洲所共有三種按鈕變體，根據操作的重要性與視覺層級選用。</Desc>
          <Demo>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary">Primary</button>
              <button className="btn-secondary">Secondary</button>
              <button className="btn-ghost">Ghost <Icon.arrow /></button>
            </div>
          </Demo>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: 12, marginTop: 4 }}>
            {[
              { v: 'Primary', cls: 'btn-primary', use: '頁面主要行動（CTA）。每個畫面中應只有一個 Primary 按鈕。', eg: '加入購物車、立即選購' },
              { v: 'Secondary', cls: 'btn-secondary', use: '次要行動，與 Primary 搭配使用，或作為獨立的替代選項。', eg: '立即購買、瀏覽更多' },
              { v: 'Ghost', cls: 'btn-ghost', use: '最低層級的操作，通常用於導航類連結、查看更多。', eg: '查看全部、所有文章' },
            ].map((item) => (
              <div key={item.v} style={{ padding: '16px 18px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--forest-600)', letterSpacing: '.15em', marginBottom: 6 }}>{item.cls}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>{item.v}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.7, marginBottom: 8 }}>{item.use}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>範例：{item.eg}</div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="含圖示 With Icon">
          <Desc>圖示放置於文字右側，用於加強行為語意（如箭頭表示導向）。不建議單獨使用圖示按鈕作為主要操作。</Desc>
          <Demo>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary">立即選購 <Icon.arrow /></button>
              <button className="btn-secondary">瀏覽更多 <Icon.arrow /></button>
              <button className="btn-ghost">查看全部 <Icon.arrow /></button>
            </div>
          </Demo>
        </SubSection>

        <SubSection title="Icon Button 圖示按鈕">
          <Desc>圓形圖示按鈕用於輔助操作，如收藏、導覽切換、加入購物車等。提供兩種尺寸（36px / 32px）與填色或描邊兩種風格。</Desc>
          <Demo>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--ink-15)', display: 'grid', placeItems: 'center'
              }}><Icon.arrowL /></button>
              <button style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--forest-800)', color: 'var(--cream-50)',
                display: 'grid', placeItems: 'center'
              }}><Icon.arrow /></button>
              <button style={{
                width: 32, height: 32, borderRadius: '50%', background: 'var(--cream-50)',
                display: 'grid', placeItems: 'center', color: 'var(--ink-60)',
                border: '1px solid var(--ink-08)'
              }}>
                <Icon.heart filled={false} />
              </button>
              <button style={{
                width: 32, height: 32, borderRadius: '50%', background: 'var(--cream-50)',
                display: 'grid', placeItems: 'center', color: 'var(--accent)',
                border: '1px solid var(--ink-08)'
              }}>
                <Icon.heart filled={true} />
              </button>
              <button style={{
                background: 'var(--forest-800)', color: 'var(--cream-50)',
                width: 32, height: 32, borderRadius: '50%',
                display: 'grid', placeItems: 'center'
              }}>
                <Icon.cart width={14} height={14} />
              </button>
            </div>
          </Demo>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 12 }}>
            {[
              { size: '36 × 36', use: '導覽箭頭（輪播、返回），較高視覺重量', styles: '填色 or 描邊' },
              { size: '32 × 32', use: '收藏、加入購物車，浮於圖片上方', styles: '白色底 + ink-08 邊框' },
            ].map((s) => (
              <div key={s.size} style={{ padding: '14px 16px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)' }}>
                <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--forest-900)' }}>{s.size}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.6, marginTop: 4 }}>{s.use}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 4 }}>{s.styles}</div>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="Pill Button 膠囊按鈕">
          <Desc>用於促銷橫幅或特殊情境的 CTA，具有完全圓角。在深色背景上使用淺色版本，淺色背景上使用深色版本。</Desc>
          <Demo bg="var(--forest-800)">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '10px 18px', borderRadius: 999,
                background: 'var(--cream-50)', color: 'var(--forest-800)',
                fontSize: 12, fontWeight: 600
              }}>立即選購 →</button>
            </div>
          </Demo>
          <Demo>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '10px 18px', borderRadius: 999,
                background: 'var(--forest-800)', color: 'var(--cream-50)',
                fontSize: 12, fontWeight: 600
              }}>立即選購 →</button>
            </div>
          </Demo>
        </SubSection>

        <SubSection title="狀態 States">
          <Desc>按鈕支援以下互動狀態。所有狀態變化都帶有 0.15s 過渡動畫。</Desc>
          <Demo>
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
              {[
                { label: 'Default', style: {} },
                { label: 'Hover', style: { background: 'var(--forest-900)' } },
                { label: 'Active', style: { transform: 'scale(.98)' } },
                { label: 'Disabled', style: { opacity: 0.4, pointerEvents: 'none' } },
              ].map((s) => (
                <div key={s.label}>
                  <button className="btn-primary" style={{ ...s.style, width: '100%', justifyContent: 'center' }}>按鈕</button>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-60)', marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Demo>
          <Demo>
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
              {[
                { label: 'Default', style: {} },
                { label: 'Hover', style: { background: 'var(--forest-800)', color: 'var(--cream-50)' } },
                { label: 'Active', style: { transform: 'scale(.98)' } },
                { label: 'Disabled', style: { opacity: 0.4, pointerEvents: 'none' } },
              ].map((s) => (
                <div key={s.label}>
                  <button className="btn-secondary" style={{ ...s.style, width: '100%', justifyContent: 'center' }}>按鈕</button>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-60)', marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Demo>
        </SubSection>
      </Section>

      {/* ═══ BEHAVIORS ═══ */}
      <Section title="行為 Behaviors" id="behaviors">
        <SubSection title="Hover 互動">
          <Desc>
            Primary 按鈕 hover 時背景色從 forest-800 加深為 forest-900。Secondary 按鈕 hover 時填色反轉（背景變為 forest-800，文字變為 cream-50）。Ghost 按鈕 hover 時底線顯示。
          </Desc>
        </SubSection>

        <SubSection title="Active 回饋">
          <Desc>
            所有文字按鈕按下時會有 scale(0.98) 的微縮效果，提供觸覺回饋。Icon button 不帶此效果。
          </Desc>
        </SubSection>

        <SubSection title="過渡動畫">
          <Desc>
            所有狀態變化使用 transition: 0.15s，包含 background、color、border-color 與 transform。保持輕快但不突兀的視覺回饋。
          </Desc>
        </SubSection>

        <SubSection title="按鈕組合">
          <Desc>
            當 Primary 與 Secondary 並排時，使用 12px 間距（gap）。Primary 在左，Secondary 在右。在窄螢幕（mobile）下按鈕會改為 100% 寬度垂直堆疊。
          </Desc>
          <Demo>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button className="btn-primary">加入購物車</button>
              <button className="btn-secondary">立即購買</button>
            </div>
          </Demo>
        </SubSection>
      </Section>

      {/* ═══ USAGE ═══ */}
      <Section title="使用指南 Usage Guidelines" id="usage">
        <DoRow
          doText={{
            demo: <><button className="btn-primary">加入購物車 <Icon.cart width={14} height={14} /></button></>,
            desc: '每個畫面只放一個 Primary CTA'
          }}
          dontText={{
            demo: <><button className="btn-primary">加入購物車</button><button className="btn-primary">立即購買</button></>,
            desc: '避免多個 Primary 按鈕競爭注意力'
          }}
        />

        <DoRow
          doText={{
            demo: <><button className="btn-primary">立即選購</button><button className="btn-secondary">瀏覽更多</button></>,
            desc: '用 Secondary 搭配 Primary，建立清楚的層級'
          }}
          dontText={{
            demo: <><button className="btn-ghost">立即選購 <Icon.arrow /></button><button className="btn-ghost">瀏覽更多 <Icon.arrow /></button></>,
            desc: '避免重要操作使用 Ghost 按鈕'
          }}
        />

        <DoRow
          doText={{
            demo: <><button className="btn-primary">確認訂單 <Icon.arrow /></button></>,
            desc: '使用動詞明確表達行為'
          }}
          dontText={{
            demo: <><button className="btn-primary">好的</button></>,
            desc: '避免模糊的文字標籤'
          }}
        />

        <SubSection title="層級搭配建議">
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 12 }}>
            {[
              { scene: 'Hero / 首屏', combo: 'Primary + Secondary', eg: '立即選購 + 瀏覽更多' },
              { scene: '卡片操作', combo: 'Icon Button (cart)', eg: '加入購物車圓形按鈕' },
              { scene: '列表導航', combo: 'Ghost + Arrow', eg: '查看全部 →' },
              { scene: '促銷橫幅', combo: 'Pill Button', eg: '深色背景上的淺色膠囊按鈕' },
              { scene: '商品詳情', combo: 'Primary (full-width) + Secondary', eg: '加入購物車 + 立即購買' },
              { scene: '輪播控制', combo: 'Icon Button pair', eg: '← → 導覽箭頭' },
            ].map((r) => (
              <div key={r.scene} style={{
                display: 'grid', gridTemplateColumns: '100px 1fr', gap: 12,
                padding: '12px 0', borderBottom: '1px solid var(--ink-08)', fontSize: 13
              }}>
                <div style={{ fontWeight: 600, color: 'var(--forest-900)' }}>{r.scene}</div>
                <div>
                  <div style={{ color: 'var(--ink)' }}>{r.combo}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 2 }}>{r.eg}</div>
                </div>
              </div>
            ))}
          </div>
        </SubSection>
      </Section>

      {/* ═══ CONTENT ═══ */}
      <Section title="文案規範 Content Standards" id="content">
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 16 }}>
          {[
            { rule: '使用動詞開頭', good: '立即選購', bad: '選購頁面', desc: '按鈕文案應以行為動詞為主，清楚描述按下後的結果。' },
            { rule: '簡潔明確', good: '加入購物車', bad: '將此商品加入到我的購物車中', desc: '控制在 2–5 個字以內，避免冗長。' },
            { rule: '語氣一致', good: '查看全部', bad: 'VIEW ALL', desc: '使用中文語境，避免中英混雜。英文僅限系統命名。' },
            { rule: '避免重複', good: '確認訂單 / 繼續購物', bad: '確認 / 確認', desc: '同一畫面中的按鈕文案應有所區別，讓使用者能快速辨識。' },
          ].map((item) => (
            <div key={item.rule} style={{ padding: '18px 20px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 8 }}>{item.rule}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.7, marginBottom: 10 }}>{item.desc}</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
                <span style={{ color: 'var(--forest-600)' }}>✓ {item.good}</span>
                <span style={{ color: 'var(--error)' }}>✗ {item.bad}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SPECS ═══ */}
      <Section title="設計規格 Specs" id="specs">
        <SubSection title="Primary / Secondary 按鈕">
          <div style={{ maxWidth: 540 }}>
            <Spec label="Font Size" value="14px" />
            <Spec label="Font Weight" value="500 (Medium)" />
            <Spec label="Padding" value="Primary: 14px 26px / Secondary: 13px 25px" />
            <Spec label="Border" value="Secondary: 1px solid forest-800" />
            <Spec label="Border Radius" value="0（強制 sharp corners）" />
            <Spec label="Gap (icon)" value="8px" />
            <Spec label="Transition" value="background .15s, color .15s, transform .15s" />
            <Spec label="Active Scale" value="scale(0.98)" />
          </div>
        </SubSection>

        <SubSection title="Ghost 按鈕">
          <div style={{ maxWidth: 540 }}>
            <Spec label="Font Size" value="14px" />
            <Spec label="Font Weight" value="500 (Medium)" />
            <Spec label="Padding" value="14px 22px" />
            <Spec label="Border" value="bottom 1px, transparent → forest-800 on hover" />
            <Spec label="Background" value="none" />
          </div>
        </SubSection>

        <SubSection title="Icon Button">
          <div style={{ maxWidth: 540 }}>
            <Spec label="Size (Large)" value="36 × 36px" />
            <Spec label="Size (Small)" value="32 × 32px" />
            <Spec label="Shape" value="Circle (border-radius: 50%)" />
            <Spec label="Icon Size" value="14–18px" />
          </div>
        </SubSection>

        <SubSection title="Pill Button">
          <div style={{ maxWidth: 540 }}>
            <Spec label="Font Size" value="12px" />
            <Spec label="Font Weight" value="600 (Bold)" />
            <Spec label="Padding" value="10px 18px" />
            <Spec label="Border Radius" value="999px（例外：不受 sharp corners 覆蓋）" />
          </div>
        </SubSection>

        <SubSection title="色彩對照">
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 12 }}>
            {[
              { variant: 'Primary', bg: 'var(--forest-800)', text: 'var(--cream-50)', hoverBg: 'var(--forest-900)' },
              { variant: 'Secondary', bg: 'transparent', text: 'var(--forest-800)', hoverBg: 'var(--forest-800) / text → cream-50' },
              { variant: 'Ghost', bg: 'none', text: 'var(--forest-800)', hoverBg: 'border-bottom → forest-800' },
              { variant: 'Pill (light)', bg: 'var(--cream-50)', text: 'var(--forest-800)', hoverBg: '—' },
            ].map((c) => (
              <div key={c.variant} style={{ padding: '14px 16px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>{c.variant}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-60)', lineHeight: 1.8 }}>
                  bg: {c.bg}<br />
                  text: {c.text}<br />
                  hover: {c.hoverBg}
                </div>
              </div>
            ))}
          </div>
        </SubSection>
      </Section>

      {/* ═══ A11Y ═══ */}
      <Section title="無障礙 Accessibility" id="accessibility">
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 16 }}>
          {[
            { title: '鍵盤操作', desc: 'Enter 與 Space 鍵可觸發按鈕。Focus 狀態應有明確的視覺指示器（outline）。' },
            { title: '語意標籤', desc: '一律使用 <button> 標籤。若為連結行為（導向新頁面），使用 <a> 搭配 btn-ghost 樣式。' },
            { title: 'Icon Button 標注', desc: '純圖示按鈕必須提供 aria-label 屬性，描述按鈕功能（如 "加入收藏"、"上一頁"）。' },
            { title: '色彩對比', desc: 'Primary 按鈕（forest-800 + cream-50）對比度 > 7:1，符合 WCAG AA 標準。' },
          ].map((item) => (
            <div key={item.title} style={{ padding: '18px 20px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 14 }}>鍵盤對照表</h3>
          <div style={{ maxWidth: 400 }}>
            <Spec label="Enter" value="觸發按鈕動作" />
            <Spec label="Space" value="觸發按鈕動作" />
            <Spec label="Tab" value="移動焦點至下一個可互動元素" />
            <Spec label="Shift + Tab" value="移動焦點至上一個可互動元素" />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div style={{
        padding: `32px ${px}`, textAlign: 'center'
      }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', letterSpacing: '.05em' }}>
          OASIS STUDIO · DESIGN SYSTEM · BUTTON · {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}

window.DSButtonPage = DSButtonPage;
