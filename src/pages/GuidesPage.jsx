// Care guides listing page

const DC_DATA = window.OASIS_DATA;

function GuidesPage({ onHome, onNavigate, cartCount, onCart, onOpenGuide }) {
  const { bp } = useViewport();
  const guides = DC_DATA.guides;
  const categories = ['全部', '新手指南', '養護技巧', '空間靈感'];
  const [activeFilter, setActiveFilter] = React.useState('全部');

  const filtered = activeFilter === '全部'
    ? guides
    : guides.filter((g) => g.cat === activeFilter);

  const gridCols = isM(bp) ? '1fr' : isT(bp) ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  const gridGap = isM(bp) ? 28 : isT(bp) ? 20 : 24;

  return (
    <>
      <Nav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} activePage="guides" />

      {/* Hero */}
      <section style={{
        background: 'var(--cream-50)',
        padding: `${isM(bp) ? 48 : isT(bp) ? 64 : 80}px ${pad(bp)}`
      }}>
        <div className="eyebrow" style={{ marginBottom: isM(bp) ? 10 : 16 }}>
          養護指南 · CARE JOURNAL
        </div>
        <h1 className="serif" style={{
          fontSize: isM(bp) ? 28 : isT(bp) ? 36 : 42,
          fontWeight: 600,
          color: 'var(--forest-900)',
          margin: '0 0 16px',
          lineHeight: 1.3
        }}>慢慢學，慢慢長</h1>
        <p style={{
          fontSize: isM(bp) ? 14 : 16,
          lineHeight: 1.7,
          color: 'var(--ink-60)',
          margin: '0 0 24px',
          maxWidth: 560
        }}>從新手入門到進階養護，在這裡找到與植物一起生活的靈感和知識。</p>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: isM(bp) ? 8 : 12, flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                padding: `${isM(bp) ? '7px 12px' : '8px 16px'}`,
                fontSize: isM(bp) ? 12 : 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--cream-50)' : 'var(--forest-800)',
                background: isActive ? 'var(--forest-800)' : 'transparent',
                border: isActive ? '1px solid var(--forest-800)' : '1px solid var(--ink-15)',
                cursor: 'pointer',
                transition: 'all .2s'
              }}>{cat}</button>
            );
          })}
        </div>
      </section>

      {/* Content grid */}
      <section style={{
        padding: `${isM(bp) ? 24 : isT(bp) ? 32 : 48}px ${pad(bp)}`,
        paddingBottom: isM(bp) ? 48 : 80
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: gridGap
        }}>
          {filtered.map((g) => (
            <a key={g.id} href="#" onClick={(e) => { e.preventDefault(); if (onOpenGuide) onOpenGuide(g); }} style={{ display: 'block' }}>
              <div style={{
                aspectRatio: '1.1',
                background: 'var(--sage-200)',
                overflow: 'hidden',
                marginBottom: 14
              }}>
                <SafeImg src={g.img} alt={g.title} style={{
                  width: '100%', height: '100%', objectFit: 'cover'
                }} />
              </div>
              <div className="mono" style={{
                fontSize: 10,
                color: 'var(--forest-600)',
                letterSpacing: '.15em',
                marginBottom: 8
              }}>
                {g.cat.toUpperCase()} · {g.read.toUpperCase()}
              </div>
              <h3 className="serif" style={{
                fontSize: isM(bp) ? 17 : 19,
                fontWeight: 600,
                color: 'var(--forest-900)',
                marginBottom: 6,
                lineHeight: 1.4
              }}>{g.title}</h3>
              <p style={{
                fontSize: 13,
                color: 'var(--ink-60)',
                lineHeight: 1.6
              }}>{g.sub}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

window.GuidesPage = GuidesPage;
