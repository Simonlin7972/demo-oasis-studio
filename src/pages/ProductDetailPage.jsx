// Product detail page — gallery, attributes, size/qty, tabs, related products

const DC_DATA = window.OASIS_DATA;

function ProductDetailPage({ product, onBack, onAdd, onWish, wished }) {
  const { bp } = useViewport();
  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState('M');
  const [tab, setTab] = React.useState('care');
  const [imgIdx, setImgIdx] = React.useState(0);
  const gallery = [product.img, product.img2, product.img].filter(Boolean);
  const cols = notD(bp) ? '1fr' : '1.05fr 1fr';
  const sizes = [
    { id: 'S', label: 'S　小', sub: '15cm 盆' },
    { id: 'M', label: 'M　中', sub: '20cm 盆' },
    { id: 'L', label: 'L　大', sub: '25cm 盆' },
  ];

  return (
    <>
      <div style={{ padding: `${isM(bp) ? 16 : 20}px ${pad(bp)} 0`, fontSize: 12, color: 'var(--ink-60)' }}>
        <button onClick={onBack} style={{ color: 'var(--ink-60)' }}>首頁</button>
        <span style={{ margin: '0 8px', color: 'var(--ink-40)' }}>/</span>
        <span style={{ color: 'var(--ink-60)' }}>商品</span>
        <span style={{ margin: '0 8px', color: 'var(--ink-40)' }}>/</span>
        <span style={{ color: 'var(--forest-900)', fontWeight: 500 }}>{product.name}</span>
      </div>

      <section style={{
        padding: `${isM(bp) ? 24 : 36}px ${pad(bp)} ${isM(bp) ? 32 : 56}px`,
        display: 'grid', gridTemplateColumns: cols, gap: isM(bp) ? 24 : 56
      }}>
        {/* GALLERY */}
        <div>
          <div style={{
            position: 'relative', aspectRatio: '1', background: 'var(--sage-100)',
            borderRadius: 18, overflow: 'hidden', marginBottom: 12
          }}>
            <SafeImg src={gallery[imgIdx]} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: 'var(--cream-50)', color: 'var(--forest-800)',
              padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600
            }}>{product.tag}</div>
            <button onClick={() => onWish(product.id)} style={{
              position: 'absolute', top: 14, right: 14,
              width: 38, height: 38, borderRadius: '50%', background: 'var(--cream-50)',
              display: 'grid', placeItems: 'center',
              color: wished ? 'var(--accent)' : 'var(--ink-60)'
            }}>
              <Icon.heart filled={wished} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gallery.length}, 1fr)`, gap: 10 }}>
            {gallery.map((g, i) =>
              <button key={i} onClick={() => setImgIdx(i)} style={{
                aspectRatio: '1', background: 'var(--sage-100)', borderRadius: 10, overflow: 'hidden',
                border: imgIdx === i ? '2px solid var(--forest-800)' : '2px solid transparent'
              }}>
                <SafeImg src={g} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            )}
          </div>
        </div>

        {/* INFO */}
        <div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--forest-600)', letterSpacing: '.18em', marginBottom: 10 }}>
            {product.tag.toUpperCase()} · 室內植物
          </div>
          <h1 className="serif" style={{
            fontSize: isM(bp) ? 32 : 44, fontWeight: 600, color: 'var(--forest-900)',
            margin: '0 0 6px', lineHeight: 1.1
          }}>{product.name}</h1>
          <div className="mono" style={{ fontSize: 12, color: 'var(--ink-40)', fontStyle: 'italic', marginBottom: 18 }}>
            {product.latin}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
            <div style={{ display: 'flex', gap: 2, color: 'var(--forest-600)' }}>
              {Array(5).fill(0).map((_, i) => <Icon.star key={i} width={14} height={14} />)}
            </div>
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-60)' }}>4.9 · 184 評價</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22 }}>
            <span className="mono" style={{ fontSize: 32, fontWeight: 600, color: 'var(--forest-800)' }}>{NT(product.price)}</span>
            {product.original && <span className="mono" style={{ fontSize: 14, color: 'var(--ink-40)', textDecoration: 'line-through' }}>{NT(product.original)}</span>}
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.85, color: 'var(--ink-60)', marginBottom: 24 }}>
            來自園藝師親自挑選的健康株。葉片飽滿、根系穩定，適合放在客廳一角或工作桌邊。下單後 48 小時內保鮮配送，並附上手寫養護卡與一年植物保固。
          </p>

          {/* attributes */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isM(bp) ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 10, marginBottom: 28
          }}>
            {[
              { i: <Icon.sun />, l: '光照', v: product.light },
              { i: <Icon.drop />, l: '澆水', v: product.water },
              { i: <Icon.pet />, l: '寵物', v: product.pet ? '友善' : '需注意' },
            ].map((a, i) =>
              <div key={i} style={{
                background: 'var(--cream-50)', padding: '12px 14px', borderRadius: 10,
                display: 'flex', flexDirection: 'column', gap: 4
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--forest-600)' }}>
                  {a.i}
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '.1em' }}>{a.l.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)' }}>{a.v}</div>
              </div>
            )}
          </div>

          {/* size */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-900)' }}>選擇尺寸</span>
              <a href="#" className="mono" style={{ fontSize: 11, color: 'var(--forest-600)' }}>尺寸對照表 →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {sizes.map((s) =>
                <button key={s.id} onClick={() => setSize(s.id)} style={{
                  padding: '13px 10px', borderRadius: 10,
                  border: size === s.id ? '1.5px solid var(--forest-800)' : '1.5px solid var(--ink-15)',
                  background: size === s.id ? 'var(--forest-800)' : 'var(--paper)',
                  color: size === s.id ? 'var(--cream-50)' : 'var(--ink)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</span>
                  <span className="mono" style={{ fontSize: 10, opacity: .7 }}>{s.sub}</span>
                </button>
              )}
            </div>
          </div>

          {/* qty + add */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', border: '1px solid var(--ink-15)',
              borderRadius: 999, overflow: 'hidden'
            }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ width: 40, height: 48, fontSize: 18, color: 'var(--forest-800)' }}>−</button>
              <span className="mono" style={{ width: 32, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)}
                style={{ width: 40, height: 48, fontSize: 18, color: 'var(--forest-800)' }}>+</button>
            </div>
            <button onClick={() => onAdd(product, qty, size)} className="btn-primary" style={{
              flex: 1, justifyContent: 'center', padding: '14px 22px', height: 48
            }}>
              <Icon.cart /> 加入購物車
            </button>
          </div>
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>立即購買</button>

          {/* shipping notes */}
          <div style={{ marginTop: 24, padding: '16px 18px', background: 'var(--sage-100)', borderRadius: 12 }}>
            {[
              ['🌱', '48 小時保鮮配送，附手寫養護卡'],
              ['🛡', '一年植物保固，無條件換株'],
              ['📦', '滿 NT$ 1,200 免運'],
            ].map(([e, t], i) =>
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 13, color: 'var(--forest-900)',
                padding: '6px 0', borderTop: i === 0 ? 'none' : '1px solid var(--ink-08)'
              }}>
                <span style={{ fontSize: 14 }}>{e}</span>
                <span>{t}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TABS */}
      <section style={{ padding: `0 ${pad(bp)} ${isM(bp) ? 32 : 64}px` }}>
        <div style={{
          display: 'flex', gap: isM(bp) ? 18 : 32,
          borderBottom: '1px solid var(--ink-15)', marginBottom: 24,
          overflowX: 'auto'
        }}>
          {[
            { id: 'care', l: '養護指南' },
            { id: 'spec', l: '商品規格' },
            { id: 'ship', l: '配送與退換' },
            { id: 'review', l: '評價 (184)' },
          ].map((t) =>
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '14px 0', fontSize: 14, whiteSpace: 'nowrap',
              color: tab === t.id ? 'var(--forest-900)' : 'var(--ink-60)',
              fontWeight: tab === t.id ? 600 : 400,
              borderBottom: tab === t.id ? '2px solid var(--forest-800)' : '2px solid transparent',
              marginBottom: -1
            }}>{t.l}</button>
          )}
        </div>

        {tab === 'care' &&
          <div style={{ display: 'grid', gridTemplateColumns: notD(bp) ? '1fr' : '1fr 1fr 1fr', gap: 16 }}>
            {[
              ['光照', `${product.light}。避免直射陽光，葉片可能曬傷。`],
              ['澆水', `${product.water}。盆土表面 2cm 乾燥再澆透。冬季減量。`],
              ['濕度', '喜歡 60% 以上濕度。葉片定期噴霧或放置於濕度盤上。'],
            ].map(([h, t], i) =>
              <div key={i} style={{ padding: '20px 22px', background: 'var(--cream-50)', borderRadius: 12 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--forest-600)', letterSpacing: '.18em', marginBottom: 8 }}>0{i + 1}</div>
                <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>{h}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.7 }}>{t}</p>
              </div>
            )}
          </div>
        }
        {tab === 'spec' &&
          <div style={{ maxWidth: 600 }}>
            {[
              ['學名', product.latin],
              ['尺寸', `${size} 號盆（${size === 'S' ? '15' : size === 'M' ? '20' : '25'} cm）`],
              ['原產地', '中南美洲熱帶雨林'],
              ['理想溫度', '18 – 28°C'],
              ['毒性', product.pet ? '無毒，寵物友善' : '對貓狗有輕微毒性，請放置於不易接觸處'],
              ['包裝', '陶盆 + 排水底盤 + 養護卡'],
            ].map(([k, v], i) =>
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16,
                padding: '14px 0', borderBottom: '1px solid var(--ink-08)',
                fontSize: 13
              }}>
                <div className="mono" style={{ color: 'var(--ink-60)', letterSpacing: '.05em' }}>{k}</div>
                <div style={{ color: 'var(--forest-900)' }}>{v}</div>
              </div>
            )}
          </div>
        }
        {tab === 'ship' &&
          <div style={{ maxWidth: 640, fontSize: 14, lineHeight: 1.85, color: 'var(--ink)' }}>
            <p style={{ marginBottom: 16 }}>下單後我們會在 48 小時內以保鮮包裝配送。植物配送僅限台灣本島，外島請聯繫客服安排。</p>
            <p style={{ marginBottom: 16 }}>滿 NT$ 1,200 免運費，未滿則酌收 NT$ 150。冷藏配送另計 NT$ 100。</p>
            <p style={{ marginBottom: 16 }}>植物收到後 7 天內若有異常，請拍照聯繫客服，我們提供無條件換株。一年內因養護問題植物枯萎，可享 5 折換購。</p>
          </div>
        }
        {tab === 'review' &&
          <div style={{ display: 'grid', gridTemplateColumns: notD(bp) ? '1fr' : '1fr 1fr', gap: 16 }}>
            {DC_DATA.reviews.map((r) =>
              <div key={r.id} style={{ padding: '20px 22px', background: 'var(--cream-50)', borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)' }}>{r.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-60)', marginTop: 2 }}>{r.role}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 1, color: 'var(--forest-600)' }}>
                    {Array(r.rating).fill(0).map((_, i) => <Icon.star key={i} width={12} height={12} />)}
                  </div>
                </div>
                <p className="serif" style={{ fontSize: 14, color: 'var(--forest-900)', lineHeight: 1.7 }}>「{r.text}」</p>
              </div>
            )}
          </div>
        }
      </section>

      {/* RELATED */}
      <section style={{ padding: `0 ${pad(bp)} ${isM(bp) ? 48 : 80}px`, background: 'var(--paper)' }}>
        <h2 className="serif" style={{ fontSize: isM(bp) ? 22 : 28, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 20 }}>
          你可能也會喜歡
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isM(bp) ? '1fr 1fr' : isT(bp) ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gap: isM(bp) ? 12 : 16
        }}>
          {DC_DATA.featured.filter((p) => p.id !== product.id).slice(0, 4).map((p) =>
            <a key={p.id} href={`?product=${p.id}`} style={{ display: 'block' }}>
              <div style={{ aspectRatio: '1', background: 'var(--sage-100)', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
                <SafeImg src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)' }}>{p.name}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--forest-800)', marginTop: 2 }}>{NT(p.price)}</div>
            </a>
          )}
        </div>
      </section>
    </>
  );
}

window.ProductDetailPage = ProductDetailPage;
