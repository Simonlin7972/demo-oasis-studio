// Scenario/use-case cards section

const DC_DATA = window.OASIS_DATA;

function Scenarios() {
  const { bp } = useViewport();
  const cols = isM(bp) ? '1fr' : isT(bp) ? '1fr' : 'repeat(3, 1fr)';
  return (
    <section style={{ padding: `${isM(bp) ? 32 : 48}px ${pad(bp)}`, background: 'var(--cream-50)' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12
      }}>
        <div>
          <div className="eyebrow">情境推薦 · FOR YOUR SPACE</div>
          <h2 className="serif" style={{ fontSize: isM(bp) ? 24 : 32, fontWeight: 600, color: 'var(--forest-900)', marginTop: 8 }}>
            為不同的你
          </h2>
        </div>
        <a href="#" className="btn-ghost" style={{ padding: '10px 0', fontSize: 13 }}>查看全部 <Icon.arrow /></a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isM(bp) ? 14 : 20 }}>
        {DC_DATA.scenarios.map((s) =>
          <a key={s.id} href="#" style={{
            background: 'var(--paper)', borderRadius: 14, overflow: 'hidden',
            display: 'block', transition: 'transform .2s'
          }}>
            <div style={{ aspectRatio: isT(bp) ? '2.4' : '1.5', background: 'var(--sage-200)' }}>
              <SafeImg src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '18px 20px' }}>
              <h3 className="serif" style={{ fontSize: isM(bp) ? 18 : 22, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-60)', marginBottom: 12 }}>{s.sub}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {s.tags.map((t) =>
                  <span key={t} style={{
                    fontSize: 11, padding: '4px 10px', borderRadius: 999,
                    background: 'var(--sage-100)', color: 'var(--forest-800)'
                  }}>{t}</span>
                )}
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}

window.Scenarios = Scenarios;
