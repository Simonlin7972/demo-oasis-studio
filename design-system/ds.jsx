// 綠洲所 Design System — /ds
// All design tokens, typography, components reference page.

function DesignSystemPage({ onHome, onNavigate }) {
  const { bp } = useViewport();
  const m = bp === 'mobile';
  const px = m ? '20px' : bp === 'tablet' ? '32px' : '56px';

  // Section wrapper
  const Section = ({ title, sub, children, bg }) => (
    <section style={{ padding: `${m ? 40 : 56}px ${px}`, background: bg || 'transparent' }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--forest-600)', letterSpacing: '.18em', marginBottom: 6 }}>
        {sub}
      </div>
      <h2 className="serif" style={{ fontSize: m ? 24 : 32, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 28 }}>
        {title}
      </h2>
      {children}
    </section>
  );

  // Color swatch
  const Swatch = ({ name, value, dark }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{
        width: '100%', aspectRatio: '1.2', background: value,
        border: '1px solid var(--ink-08)', marginBottom: 8
      }} />
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)' }}>{name}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-60)', marginTop: 2 }}>{value}</div>
    </div>
  );

  const colors = {
    'Forest (主色)': [
      { name: 'forest-900', value: '#14271e' },
      { name: 'forest-800', value: '#1f3a2e' },
      { name: 'forest-700', value: '#2a4a3a' },
      { name: 'forest-600', value: '#3a6b4a' },
      { name: 'forest-500', value: '#5b8a5a' },
    ],
    'Sage (輔助)': [
      { name: 'sage-300', value: '#c9d5b5' },
      { name: 'sage-200', value: '#dde3cd' },
      { name: 'sage-100', value: '#e9ede0' },
    ],
    'Cream (背景)': [
      { name: 'cream-100', value: '#ebe8df' },
      { name: 'cream-50', value: '#f4f6ee' },
      { name: 'paper', value: '#fafaf6' },
    ],
    'Ink (文字)': [
      { name: 'ink', value: '#14271e' },
      { name: 'ink-60', value: 'rgba(20,39,30,0.6)' },
      { name: 'ink-40', value: 'rgba(20,39,30,0.4)' },
      { name: 'ink-15', value: 'rgba(20,39,30,0.15)' },
      { name: 'ink-08', value: 'rgba(20,39,30,0.08)' },
    ],
    '強調 / 狀態': [
      { name: 'accent', value: '#d97757' },
      { name: 'error', value: '#b85450' },
    ],
  };

  const [toastFn, Toast] = useToast();
  const [wished, setWished] = React.useState(false);

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
          <div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--forest-900)', lineHeight: 1 }}>Design System</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-60)', letterSpacing: '.18em', marginTop: 2 }}>OASIS · STUDIO</div>
          </div>
        </div>
        <button onClick={onHome} className="btn-ghost" style={{ fontSize: 12, padding: '8px 0' }}>
          <Icon.arrowL /> 返回首頁
        </button>
      </div>

      {/* Intro */}
      <div style={{ padding: `${m ? 48 : 72}px ${px} ${m ? 32 : 48}px`, background: 'var(--cream-50)' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>DESIGN SYSTEM · 設計系統</div>
        <h1 className="serif" style={{ fontSize: m ? 36 : 52, fontWeight: 600, color: 'var(--forest-900)', lineHeight: 1.1, maxWidth: 680 }}>
          綠洲所的<br />視覺語言
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-60)', lineHeight: 1.8, marginTop: 18, maxWidth: 540 }}>
          此頁面記錄了目前應用中所有的 design tokens 與核心 UI 元件，作為品牌一致性與開發效率的參考依據。
        </p>
      </div>

      {/* ─── COLORS ─── */}
      <Section title="色彩系統" sub="COLORS">
        {Object.entries(colors).map(([group, swatches]) => (
          <div key={group} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 14 }}>{group}</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: m ? 'repeat(3, 1fr)' : `repeat(${Math.min(swatches.length, 5)}, 1fr)`,
              gap: m ? 10 : 16
            }}>
              {swatches.map((s) => <Swatch key={s.name} {...s} />)}
            </div>
          </div>
        ))}
      </Section>

      {/* ─── TYPOGRAPHY ─── */}
      <Section title="文字排版" sub="TYPOGRAPHY" bg="var(--cream-50)">
        {/* Font families */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 16 }}>字型家族</div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: 16 }}>
            {[
              { cls: 'serif', name: 'Serif — 標題', family: 'Noto Serif TC', sample: '城市裡的一座綠洲' },
              { cls: '', name: 'Sans — 本文', family: 'Noto Sans TC', sample: '為都市生活注入一抹綠意' },
              { cls: 'mono', name: 'Mono — 標籤', family: 'JetBrains Mono', sample: 'NT$ 1,280 · SKU-001' },
            ].map((f) => (
              <div key={f.name} style={{ padding: '20px 22px', background: 'var(--paper)', border: '1px solid var(--ink-08)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--forest-600)', letterSpacing: '.15em', marginBottom: 10 }}>
                  {f.family.toUpperCase()}
                </div>
                <div className={f.cls} style={{ fontSize: 24, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6, lineHeight: 1.3 }}>
                  {f.sample}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-60)' }}>{f.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Type scale */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 16 }}>標題尺寸</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { size: 48, label: 'Hero 標題', tag: '48px' },
              { size: 36, label: '段落標題 H2', tag: '36px' },
              { size: 32, label: '次標題', tag: '32px' },
              { size: 22, label: '卡片標題', tag: '22px' },
              { size: 17, label: '商品名稱', tag: '17px' },
              { size: 15, label: '本文', tag: '15px' },
              { size: 13, label: '小字 / 說明', tag: '13px' },
              { size: 11, label: 'Eyebrow / 標籤', tag: '11px' },
            ].map((t) => (
              <div key={t.size} style={{
                display: 'flex', alignItems: 'baseline', gap: 16,
                padding: '14px 0', borderBottom: '1px solid var(--ink-08)'
              }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', minWidth: 48, textAlign: 'right' }}>{t.tag}</div>
                <div className="serif" style={{ fontSize: t.size, fontWeight: 600, color: 'var(--forest-900)', lineHeight: 1.2 }}>
                  綠洲所
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-60)' }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Eyebrow style */}
        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 14 }}>Eyebrow 樣式</div>
          <div style={{ padding: '20px 22px', background: 'var(--paper)', border: '1px solid var(--ink-08)' }}>
            <div className="eyebrow">本週精選 · WEEKLY PICKS</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 10 }}>
              className="eyebrow" — mono 11px · 0.18em tracking · uppercase · ink-60
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SPACING ─── */}
      <Section title="間距系統" sub="SPACING">
        <div style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.7, marginBottom: 24, maxWidth: 540 }}>
          間距使用固定值，依據螢幕大小切換。頁面 padding 分為三階段：mobile 20px、tablet 32px、desktop 56px。
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: 16 }}>
          {[
            { label: 'Mobile', value: '20px', bp: '< 640px' },
            { label: 'Tablet', value: '32px', bp: '640 – 1024px' },
            { label: 'Desktop', value: '56px', bp: '≥ 1024px' },
          ].map((s) => (
            <div key={s.label} style={{ padding: '18px 20px', background: 'var(--cream-50)', border: '1px solid var(--ink-08)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--forest-600)', letterSpacing: '.15em', marginBottom: 8 }}>
                {s.bp}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--forest-900)' }}>{s.label}</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--ink-60)', marginTop: 4 }}>padding: {s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 14 }}>常用間距值</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {[4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 72].map((v) => (
              <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 32, height: v, background: 'var(--forest-600)', opacity: 0.6 }} />
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-60)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── ICONS ─── */}
      <Section title="圖示" sub="ICONS" bg="var(--cream-50)">
        <div style={{
          display: 'grid',
          gridTemplateColumns: m ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
          gap: 12
        }}>
          {[
            { name: 'search', render: Icon.search },
            { name: 'cart', render: Icon.cart },
            { name: 'heart', render: (p) => Icon.heart({ filled: false, ...p }) },
            { name: 'heart filled', render: (p) => Icon.heart({ filled: true, ...p }) },
            { name: 'arrow →', render: Icon.arrow },
            { name: 'arrow ←', render: Icon.arrowL },
            { name: 'star', render: Icon.star },
            { name: 'sun', render: Icon.sun },
            { name: 'drop', render: Icon.drop },
            { name: 'pet', render: Icon.pet },
            { name: 'menu', render: Icon.menu },
            { name: 'leaf', render: Icon.leaf },
          ].map((ic) => (
            <div key={ic.name} style={{
              padding: '20px 12px', background: 'var(--paper)', border: '1px solid var(--ink-08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10
            }}>
              <div style={{ color: 'var(--forest-800)' }}>{ic.render({ width: 24, height: 24 })}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-60)' }}>{ic.name}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── BUTTONS ─── */}
      <Section title="按鈕" sub="BUTTONS">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8, marginTop: -16 }}>
          <button onClick={() => onNavigate && onNavigate('ds-button')} style={{
            fontSize: 13, color: 'var(--forest-600)', display: 'inline-flex', alignItems: 'center', gap: 4
          }}>查看文件 <Icon.arrow /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Primary */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Primary</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary">立即選購 <Icon.arrow /></button>
              <button className="btn-primary" style={{ opacity: 0.5, pointerEvents: 'none' }}>Disabled</button>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 10 }}>
              className="btn-primary" — forest-800 bg · cream-50 text · 14px 500 · 14px 26px padding
            </div>
          </div>

          {/* Secondary */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Secondary（Outlined）</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-secondary">瀏覽更多</button>
              <button className="btn-secondary">立即購買</button>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 10 }}>
              className="btn-secondary" — forest-800 border · transparent bg · hover 反轉
            </div>
          </div>

          {/* Ghost */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Ghost</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-ghost">查看全部 <Icon.arrow /></button>
              <button className="btn-ghost">所有文章 <Icon.arrow /></button>
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 10 }}>
              className="btn-ghost" — 無背景 · hover 底線顯示
            </div>
          </div>

          {/* Icon buttons */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Icon Buttons</div>
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
          </div>

          {/* Pill / CTA */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Pill Button</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={{
                padding: '10px 18px', borderRadius: 999,
                background: 'var(--cream-50)', color: 'var(--forest-800)',
                fontSize: 12, fontWeight: 600, border: '1px solid var(--ink-08)'
              }}>立即選購 →</button>
              <button style={{
                padding: '10px 18px', borderRadius: 999,
                background: 'var(--forest-800)', color: 'var(--cream-50)',
                fontSize: 12, fontWeight: 600
              }}>立即選購 →</button>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── TAGS & BADGES ─── */}
      <Section title="標籤與徽章" sub="TAGS & BADGES" bg="var(--cream-50)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>產品標籤</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['新手首選', '療癒系', '稀有品種', '寵物友善', '限量'].map((t) => (
                <span key={t} style={{
                  background: 'var(--cream-50)', color: 'var(--forest-800)',
                  padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600,
                  letterSpacing: '.05em', border: '1px solid var(--ink-08)'
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>情境標籤</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['天堂鳥', '龜背芋', '散尾葵', '耐陰', '淨化空氣'].map((t) => (
                <span key={t} style={{
                  fontSize: 11, padding: '4px 10px', borderRadius: 999,
                  background: 'var(--sage-100)', color: 'var(--forest-800)'
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>購物車 Badge</div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Icon.cart />
                <span style={{
                  position: 'absolute', top: -4, right: -6, fontSize: 9,
                  background: 'var(--forest-800)', color: 'var(--cream-50)',
                  borderRadius: 999, width: 14, height: 14, display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--font-mono)'
                }}>2</span>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>
                14×14 · forest-800 bg · mono 9px
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>屬性 Chips</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { i: <Icon.sun />, t: '明亮散射光' },
                { i: <Icon.drop />, t: '每週一次' },
                { i: <Icon.pet />, t: '寵物友善' },
              ].map((b, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,.95)', padding: '5px 9px',
                  borderRadius: 6, display: 'flex', alignItems: 'center', gap: 5,
                  color: 'var(--forest-800)', fontSize: 10,
                  border: '1px solid var(--ink-08)'
                }}>{b.i}<span>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── CARDS ─── */}
      <Section title="卡片" sub="CARDS">
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 32 }}>
          {/* Product card example */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Product Card</div>
            <div style={{
              background: 'var(--paper)', borderRadius: 14, overflow: 'hidden',
              border: '1px solid var(--ink-08)', maxWidth: 320
            }}>
              <div style={{
                aspectRatio: '1', background: 'linear-gradient(135deg, var(--sage-200), var(--sage-300))',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  background: 'var(--cream-50)', color: 'var(--forest-800)',
                  padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600
                }}>新手首選</div>
                <button style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 32, height: 32, borderRadius: '50%', background: 'var(--cream-50)',
                  display: 'grid', placeItems: 'center', color: 'var(--ink-60)'
                }}>
                  <Icon.heart filled={false} />
                </button>
              </div>
              <div style={{ padding: 16 }}>
                <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: 'var(--forest-900)' }}>龜背芋</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-40)', fontStyle: 'italic', marginTop: 2, marginBottom: 12 }}>
                  Monstera deliciosa
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--forest-800)' }}>NT$ 1,280</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-40)', textDecoration: 'line-through', marginLeft: 6 }}>NT$ 1,580</span>
                  </div>
                  <button style={{
                    background: 'var(--forest-800)', color: 'var(--cream-50)',
                    width: 32, height: 32, borderRadius: '50%',
                    display: 'grid', placeItems: 'center'
                  }}>
                    <Icon.cart width={14} height={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Info card */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Info Card</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: '20px 22px', background: 'var(--cream-50)', borderRadius: 12 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--forest-600)', letterSpacing: '.18em', marginBottom: 8 }}>01</div>
                <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>光照</div>
                <p style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.7 }}>明亮散射光。避免直射陽光，葉片可能曬傷。</p>
              </div>
              <div style={{
                background: 'var(--cream-50)', padding: '12px 14px', borderRadius: 10,
                display: 'flex', flexDirection: 'column', gap: 4
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest-600)' }}>
                  <Icon.sun />
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '.1em' }}>光照</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)' }}>明亮散射光</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category card */}
        <div style={{ marginTop: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Category Card</div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12, maxWidth: 800 }}>
            {['觀葉植物', '多肉植物', '空氣鳳梨', '盆器配件'].map((name, i) => (
              <div key={name} style={{
                background: 'var(--paper)', borderRadius: 12, overflow: 'hidden',
                border: '1px solid var(--ink-08)'
              }}>
                <div style={{
                  aspectRatio: '1.2',
                  background: `linear-gradient(135deg, var(--sage-${i % 2 === 0 ? '200' : '100'}), var(--sage-300))`
                }} />
                <div style={{
                  padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span className="serif" style={{ fontSize: 15, fontWeight: 600, color: 'var(--forest-900)' }}>{name}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>{12 + i * 6}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FORM CONTROLS ─── */}
      <Section title="表單元件" sub="FORM CONTROLS" bg="var(--cream-50)">
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 32, maxWidth: 800 }}>
          {/* Size selector */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>尺寸選擇器</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { id: 'S', label: 'S　小', sub: '15cm 盆', active: false },
                { id: 'M', label: 'M　中', sub: '20cm 盆', active: true },
                { id: 'L', label: 'L　大', sub: '25cm 盆', active: false },
              ].map((s) => (
                <button key={s.id} style={{
                  padding: '13px 10px', borderRadius: 10,
                  border: s.active ? '1.5px solid var(--forest-800)' : '1.5px solid var(--ink-15)',
                  background: s.active ? 'var(--forest-800)' : 'var(--paper)',
                  color: s.active ? 'var(--cream-50)' : 'var(--ink)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</span>
                  <span className="mono" style={{ fontSize: 10, opacity: .7 }}>{s.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Qty control */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>數量控制</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', border: '1px solid var(--ink-15)',
              borderRadius: 999, overflow: 'hidden'
            }}>
              <button style={{ width: 40, height: 48, fontSize: 18, color: 'var(--forest-800)' }}>−</button>
              <span className="mono" style={{ width: 32, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>1</span>
              <button style={{ width: 40, height: 48, fontSize: 18, color: 'var(--forest-800)' }}>+</button>
            </div>
          </div>

          {/* Tab filter */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Tab / 分類篩選</div>
            <div style={{
              display: 'inline-flex', gap: 4, padding: 4, background: 'var(--sage-100)', borderRadius: 999
            }}>
              {['全部精選', '新手友善', '空間主角', '寵物友善'].map((t, i) => (
                <button key={t} style={{
                  padding: '8px 16px', borderRadius: 999,
                  fontSize: 13, whiteSpace: 'nowrap',
                  background: i === 0 ? 'var(--paper)' : 'transparent',
                  color: i === 0 ? 'var(--forest-900)' : 'var(--ink-60)',
                  fontWeight: i === 0 ? 600 : 400
                }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Tab underline */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Underline Tabs</div>
            <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid var(--ink-15)' }}>
              {['養護指南', '商品規格', '配送與退換', '評價 (184)'].map((t, i) => (
                <button key={t} style={{
                  padding: '14px 0', fontSize: 14, whiteSpace: 'nowrap',
                  color: i === 0 ? 'var(--forest-900)' : 'var(--ink-60)',
                  fontWeight: i === 0 ? 600 : 400,
                  borderBottom: i === 0 ? '2px solid var(--forest-800)' : '2px solid transparent',
                  marginBottom: -1
                }}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── TOAST ─── */}
      <Section title="Toast 通知" sub="TOAST">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-primary" onClick={() => toastFn('已加入購物車：龜背芋')}>
            觸發 Toast
          </button>
          <button className="btn-secondary" onClick={() => toastFn('已加入願望清單')}>
            願望清單 Toast
          </button>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 12 }}>
          forest-800 bg · cream-50 text · 13px 500 · 頂部居中 · 2.4s 自動消失
        </div>
      </Section>

      {/* ─── SURFACES ─── */}
      <Section title="表面與陰影" sub="SURFACES & SHADOWS" bg="var(--cream-50)">
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: 16 }}>
          <div style={{
            padding: 24, background: 'var(--paper)',
            border: '1px solid var(--ink-08)'
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>Default Card</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>
              border: 1px solid ink-08<br />
              border-radius: 0 (sharp)
            </div>
          </div>
          <div style={{
            padding: 24, background: 'var(--paper)',
            border: '1px solid var(--ink-08)',
            boxShadow: '0 12px 24px rgba(20,39,30,.08)',
            transform: 'translateY(-2px)'
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>Hover State</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>
              box-shadow: 0 12px 24px<br />
              rgba(20,39,30,.08)<br />
              translateY(-2px)
            </div>
          </div>
          <div style={{
            padding: 24,
            background: 'var(--forest-800)', color: 'var(--cream-50)',
            boxShadow: '0 8px 24px rgba(20,39,30,.25)'
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Toast / Overlay</div>
            <div className="mono" style={{ fontSize: 11, opacity: 0.6 }}>
              box-shadow: 0 8px 24px<br />
              rgba(20,39,30,.25)<br />
              forest-800 bg
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Sharp Corners 規則</div>
          <div style={{ padding: '16px 20px', background: 'var(--paper)', border: '1px solid var(--ink-08)' }}>
            <div className="mono" style={{ fontSize: 12, color: 'var(--ink-60)', lineHeight: 1.8 }}>
              所有元素強制 border-radius: 0 !important<br />
              套用於 .oasis 及所有子元素（含 ::before / ::after）<br />
              此規則位於 styles.css 最底部，覆蓋所有元件原始圓角設定
            </div>
          </div>
        </div>
      </Section>

      {/* ─── PROMO BANNER ─── */}
      <Section title="促銷橫幅" sub="PROMO BANNER">
        <div style={{
          padding: m ? '24px 22px' : '36px 48px',
          background: 'var(--forest-800)', borderRadius: 16,
          color: 'var(--cream-50)', textAlign: 'center'
        }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--sage-300)', letterSpacing: '.18em', marginBottom: 8 }}>
            LIMITED · 限時優惠
          </div>
          <h3 className="serif" style={{ fontSize: m ? 26 : 36, fontWeight: 600, margin: '12px 0 6px' }}>
            新品上架 全館 85 折
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(244,246,238,.7)', lineHeight: 1.6, margin: '12px 0 20px' }}>
            使用代碼 <span className="mono" style={{
              background: 'rgba(255,255,255,.1)', padding: '2px 8px', borderRadius: 4,
              color: 'var(--sage-300)'
            }}>GREEN15</span>
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { n: '03', label: 'DAYS' },
              { n: '14', label: 'HRS' },
              { n: '27', label: 'MIN' },
              { n: '45', label: 'SEC' },
            ].map((c, i) => (
              <React.Fragment key={c.label}>
                {i > 0 && <span style={{ color: 'rgba(244,246,238,.3)', fontSize: 24, alignSelf: 'center' }}>:</span>}
                <div style={{ textAlign: 'center', minWidth: 56 }}>
                  <div className="mono" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {c.n}
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(244,246,238,.6)', marginTop: 6, letterSpacing: '.1em' }}>{c.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── RATING ─── */}
      <Section title="評分" sub="RATINGS" bg="var(--cream-50)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 2, color: 'var(--forest-600)' }}>
              {Array(5).fill(0).map((_, i) => <Icon.star key={i} width={16} height={16} />)}
            </div>
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-60)' }}>4.9 · 184 評價</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 2, color: 'var(--forest-600)' }}>
              {Array(4).fill(0).map((_, i) => <Icon.star key={i} width={14} height={14} />)}
            </div>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-60)' }}>4.0</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>
            star icon · forest-600 · 排列間距 2px
          </div>
        </div>
      </Section>

      {/* ─── NAVIGATION ─── */}
      <Section title="導覽列" sub="NAVIGATION">
        <div style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.7, marginBottom: 20, maxWidth: 540 }}>
          導覽列根據螢幕寬度切換：桌面為水平連結列，手機與平板改為漢堡選單。sticky 置頂，z-index: 50。
        </div>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Breadcrumb</div>
          <div style={{ fontSize: 12, color: 'var(--ink-60)' }}>
            <span>首頁</span>
            <span style={{ margin: '0 8px', color: 'var(--ink-40)' }}>/</span>
            <span>商品</span>
            <span style={{ margin: '0 8px', color: 'var(--ink-40)' }}>/</span>
            <span style={{ color: 'var(--forest-900)', fontWeight: 500 }}>龜背芋</span>
          </div>
        </div>
        {/* Nav link style */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>Nav Links</div>
          <div style={{ display: 'flex', gap: 36, fontSize: 14 }}>
            {['所有植物', '新手入門', '空間提案', '養護指南', '關於我們'].map((n, i) => (
              <span key={n} style={{
                paddingBottom: 4,
                borderBottom: i === 0 ? '1.5px solid var(--forest-800)' : '1.5px solid transparent',
                fontWeight: i === 0 ? 600 : 400,
                color: 'var(--ink)'
              }}>{n}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer note */}
      <div style={{
        padding: `32px ${px}`, borderTop: '1px solid var(--ink-08)',
        textAlign: 'center'
      }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-40)', letterSpacing: '.05em' }}>
          OASIS STUDIO · DESIGN SYSTEM · {new Date().getFullYear()}
        </div>
      </div>

      {Toast}
    </>
  );
}

window.DesignSystemPage = DesignSystemPage;
