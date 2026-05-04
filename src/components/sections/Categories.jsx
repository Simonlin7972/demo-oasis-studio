// Category card grid section

const DC_DATA = window.OASIS_DATA;

function Categories() {
  const { bp } = useViewport();
  const cols = isM(bp) ? '1fr 1fr' : isT(bp) ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)';
  return (
    <section style={{ padding: `${isM(bp) ? 32 : 48}px ${pad(bp)}` }}>
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow">商品分類 · CATEGORIES</div>
        <h2 className="serif" style={{ fontSize: isM(bp) ? 24 : 32, fontWeight: 600, color: 'var(--forest-900)', marginTop: 8 }}>
          找到你的那一盆
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isM(bp) ? 10 : 16 }}>
        {DC_DATA.categories.map((c) =>
          <a key={c.id} href="#" style={{
            background: 'var(--paper)', borderRadius: 12, overflow: 'hidden',
            border: '1px solid var(--ink-08)', transition: 'all .2s'
          }}>
            <div style={{ aspectRatio: '1.2', background: 'var(--sage-200)' }}>
              <SafeImg src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: isM(bp) ? '10px 12px' : '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="serif" style={{ fontSize: isM(bp) ? 13 : 15, fontWeight: 600, color: 'var(--forest-900)' }}>{c.name}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>{c.count}</span>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}

window.Categories = Categories;
