// Featured products grid section

const DC_DATA = window.OASIS_DATA;

function Featured({ wishlist, onWish, onAdd, onOpen }) {
  const { bp } = useViewport();
  const [tab, setTab] = React.useState('all');
  const tabs = [
    { id: 'all', label: '全部精選' },
    { id: 'new', label: '新手友善' },
    { id: 'big', label: '空間主角' },
    { id: 'pet', label: '寵物友善' },
  ];
  const cols = isM(bp) ? '1fr 1fr' : isT(bp) ? '1fr 1fr' : 'repeat(3, 1fr)';
  return (
    <section style={{ padding: isM(bp) ? '48px 20px 32px' : isT(bp) ? '56px 32px 40px' : '72px 56px 48px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: notD(bp) ? 'flex-start' : 'flex-end',
        flexDirection: isM(bp) ? 'column' : 'row',
        gap: isM(bp) ? 16 : 24, marginBottom: 32
      }}>
        <div>
          <div className="eyebrow">本週精選 · WEEKLY PICKS</div>
          <h2 className="serif" style={{ fontSize: isM(bp) ? 26 : 36, fontWeight: 600, color: 'var(--forest-900)', marginTop: 8 }}>
            主打商品
          </h2>
        </div>
        <div style={{
          display: 'flex', gap: 4, padding: 4, background: 'var(--sage-100)',
          borderRadius: 999, overflowX: 'auto', maxWidth: '100%'
        }}>
          {tabs.map((t) =>
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: isM(bp) ? '7px 12px' : '8px 16px', borderRadius: 999,
              fontSize: isM(bp) ? 12 : 13, whiteSpace: 'nowrap',
              background: tab === t.id ? 'var(--paper)' : 'transparent',
              color: tab === t.id ? 'var(--forest-900)' : 'var(--ink-60)',
              fontWeight: tab === t.id ? 600 : 400,
              transition: 'all .2s'
            }}>{t.label}</button>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isM(bp) ? 12 : 24 }}>
        {DC_DATA.featured.map((p) =>
          <ProductCard key={p.id} p={p} wished={wishlist.has(p.id)}
            onWish={onWish} onAdd={onAdd} onOpen={onOpen} />
        )}
      </div>
    </section>
  );
}

window.Featured = Featured;
