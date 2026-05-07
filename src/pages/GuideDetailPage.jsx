// Guide article detail page

const DC_DATA = window.OASIS_DATA;

function GuideDetailPage({ guide, onBack, onHome, onNavigate, cartCount, onCart, onOpenGuide }) {
  const { bp } = useViewport();
  const contentWidth = isM(bp) ? '100%' : isT(bp) ? '100%' : '720px';
  const related = DC_DATA.guides.filter((g) => g.id !== guide.id).slice(0, 3);

  return (
    <>
      <Nav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} activePage="guides" />

      {/* Breadcrumb */}
      <div style={{ padding: `${isM(bp) ? 16 : 20}px ${pad(bp)} 0`, fontSize: 12, color: 'var(--ink-60)' }}>
        <button onClick={onHome} style={{ color: 'var(--ink-60)' }}>首頁</button>
        <span style={{ margin: '0 8px', color: 'var(--ink-40)' }}>/</span>
        <button onClick={() => onNavigate('guides')} style={{ color: 'var(--ink-60)' }}>養護指南</button>
        <span style={{ margin: '0 8px', color: 'var(--ink-40)' }}>/</span>
        <span style={{ color: 'var(--forest-900)', fontWeight: 500 }}>{guide.title}</span>
      </div>

      {/* Hero image */}
      <div style={{
        margin: `${isM(bp) ? 16 : 24}px ${pad(bp)} 0`,
        aspectRatio: isM(bp) ? '16/10' : '21/9',
        background: 'var(--sage-200)',
        overflow: 'hidden'
      }}>
        <SafeImg src={guide.img} alt={guide.title} style={{
          width: '100%', height: '100%', objectFit: 'cover'
        }} />
      </div>

      {/* Article header + body */}
      <article style={{
        padding: `${isM(bp) ? 32 : 48}px ${pad(bp)}`,
        maxWidth: 1440,
        margin: '0 auto'
      }}>
        <div style={{ maxWidth: contentWidth, margin: isD(bp) ? '0 auto' : undefined }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: 'var(--forest-800)',
              background: 'var(--sage-100)',
              padding: '4px 10px'
            }}>{guide.cat}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-40)' }}>
              {guide.read} · {guide.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="serif" style={{
            fontSize: isM(bp) ? 28 : isT(bp) ? 36 : 40,
            fontWeight: 600,
            color: 'var(--forest-900)',
            lineHeight: 1.35,
            margin: '0 0 16px'
          }}>{guide.title}</h1>

          {/* Subtitle */}
          <p style={{
            fontSize: isM(bp) ? 15 : 17,
            lineHeight: 1.7,
            color: 'var(--ink-60)',
            margin: '0 0 40px',
            paddingBottom: 32,
            borderBottom: '1px solid var(--ink-08)'
          }}>{guide.sub}</p>

          {/* Body */}
          {guide.body && guide.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="serif" style={{
                  fontSize: isM(bp) ? 20 : 24,
                  fontWeight: 600,
                  color: 'var(--forest-900)',
                  margin: `${i === 0 ? 0 : 36}px 0 16px`,
                  lineHeight: 1.4
                }}>{block.text}</h2>
              );
            }
            if (block.type === 'tip') {
              return (
                <div key={i} style={{
                  background: 'var(--cream-50)',
                  borderLeft: '3px solid var(--forest-600)',
                  padding: isM(bp) ? '18px 18px' : '22px 26px',
                  margin: '24px 0'
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8
                  }}>
                    <Icon.leaf width={14} height={14} style={{ color: 'var(--forest-600)' }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--forest-800)' }}>{block.title}</span>
                  </div>
                  <p style={{
                    fontSize: 14, lineHeight: 1.8, color: 'var(--forest-900)', margin: 0
                  }}>{block.text}</p>
                </div>
              );
            }
            return (
              <p key={i} style={{
                fontSize: isM(bp) ? 15 : 16,
                lineHeight: 1.9,
                color: 'var(--ink)',
                margin: '0 0 20px'
              }}>{block.text}</p>
            );
          })}
        </div>
      </article>

      {/* Divider */}
      <div style={{
        height: 1, background: 'var(--ink-08)',
        margin: `0 ${pad(bp)}`
      }} />

      {/* Related articles */}
      <section style={{
        padding: `${isM(bp) ? 36 : 56}px ${pad(bp)} ${isM(bp) ? 48 : 80}px`
      }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>MORE ARTICLES</div>
        <h2 className="serif" style={{
          fontSize: isM(bp) ? 22 : 28,
          fontWeight: 600,
          color: 'var(--forest-900)',
          margin: '0 0 24px'
        }}>繼續閱讀</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isM(bp) ? '1fr' : isT(bp) ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isM(bp) ? 28 : 24
        }}>
          {related.map((g) => (
            <a key={g.id} href="#" onClick={(e) => { e.preventDefault(); onOpenGuide(g); }} style={{ display: 'block' }}>
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
                fontSize: 10, color: 'var(--forest-600)',
                letterSpacing: '.15em', marginBottom: 8
              }}>{g.cat.toUpperCase()} · {g.read.toUpperCase()}</div>
              <h3 className="serif" style={{
                fontSize: isM(bp) ? 17 : 19,
                fontWeight: 600, color: 'var(--forest-900)',
                marginBottom: 6, lineHeight: 1.4
              }}>{g.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-60)', lineHeight: 1.6 }}>{g.sub}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

window.GuideDetailPage = GuideDetailPage;
