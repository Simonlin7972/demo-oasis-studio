// Care guide / blog cards section

const DC_DATA = window.OASIS_DATA;

function Guides({ onOpenGuide }) {
  const { bp } = useViewport();
  const cols = isM(bp) ? '1fr' : isT(bp) ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)';
  return (
    <section style={{ padding: `${isM(bp) ? 32 : 48}px ${pad(bp)}` }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 24, gap: 12, flexWrap: 'wrap'
      }}>
        <div>
          <div className="eyebrow">養護指南 · CARE JOURNAL</div>
          <h2 className="serif" style={{ fontSize: isM(bp) ? 24 : 32, fontWeight: 600, color: 'var(--forest-900)', marginTop: 8 }}>
            慢慢學，慢慢長
          </h2>
        </div>
        <a href="#" className="btn-ghost" style={{ padding: '10px 0', fontSize: 13 }}>所有文章 <Icon.arrow /></a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isM(bp) ? 18 : 24 }}>
        {DC_DATA.guides.map((g) =>
          <a key={g.id} href="#" onClick={(e) => { e.preventDefault(); if (onOpenGuide) onOpenGuide(g); }} style={{ display: 'block' }}>
            <div style={{ aspectRatio: '1.4', background: 'var(--sage-200)', borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
              <SafeImg src={g.img} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--forest-600)', letterSpacing: '.15em', marginBottom: 8 }}>
              {g.cat.toUpperCase()} · {g.read.toUpperCase()}
            </div>
            <h3 className="serif" style={{ fontSize: isM(bp) ? 17 : 19, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6, lineHeight: 1.4 }}>{g.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.6 }}>{g.sub}</p>
          </a>
        )}
      </div>
    </section>
  );
}

window.Guides = Guides;
