// Stores page — store locations listing

const DC_DATA = window.OASIS_DATA;

function StoresPage({ onHome, onNavigate, cartCount, onCart }) {
  const { bp } = useViewport();
  const stores = DC_DATA.stores;

  const gridCols = isM(bp) ? '1fr' : 'repeat(2, 1fr)';
  const gap = isM(bp) ? 20 : 32;

  return (
    <>
      <Nav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} activePage="stores" />

      {/* Page Header */}
      <section style={{
        background: 'var(--forest-800)',
        padding: `${isM(bp) ? 40 : isT(bp) ? 56 : 64}px ${pad(bp)}`,
        textAlign: 'center'
      }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 8, marginBottom: 16, fontSize: 13
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }}
            style={{ color: 'rgba(244,246,238,.6)' }}>首頁</a>
          <span style={{ color: 'rgba(244,246,238,.4)' }}>/</span>
          <span style={{ color: 'var(--cream-50)' }}>門市據點</span>
        </div>
        <h1 className="serif" style={{
          fontSize: isM(bp) ? 28 : isT(bp) ? 32 : 36,
          fontWeight: 600,
          lineHeight: 1.3,
          color: 'var(--cream-50)',
          margin: '0 0 12px'
        }}>門市據點</h1>
        <p style={{
          fontSize: isM(bp) ? 14 : 16,
          lineHeight: 1.5,
          color: 'rgba(244,246,238,.7)',
          margin: 0
        }}>走進實體空間，感受每一棵植物的生命力</p>
      </section>

      {/* Store Cards */}
      <section style={{
        padding: `${isM(bp) ? 40 : isT(bp) ? 56 : 64}px ${isM(bp) ? pad(bp) : isT(bp) ? pad(bp) : '120px'}`,
        paddingBottom: isM(bp) ? 48 : 80,
        background: 'var(--paper)'
      }}>
        {/* Section Header */}
        <div style={{ marginBottom: isM(bp) ? 28 : 48 }}>
          <div className="mono" style={{
            fontSize: 12, color: 'var(--forest-800)',
            letterSpacing: '.16em', marginBottom: 8
          }}>STORES</div>
          <h2 className="serif" style={{
            fontSize: isM(bp) ? 24 : 28,
            fontWeight: 600,
            color: 'var(--forest-900)',
            margin: '0 0 8px'
          }}>全台門市</h2>
          <p style={{
            fontSize: isM(bp) ? 14 : 15,
            lineHeight: 1.5,
            color: 'var(--ink-60)',
            margin: 0
          }}>歡迎到店選購，親自挑選最合眼緣的植物夥伴</p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: gap
        }}>
          {stores.map((store) => (
            <div key={store.id} style={{
              background: 'var(--cream-50)',
              border: '1px solid var(--ink-08)',
              overflow: 'hidden'
            }}>
              {/* Store Image */}
              <div style={{
                height: isM(bp) ? 180 : 200,
                background: 'var(--sage-200)',
                overflow: 'hidden'
              }}>
                <SafeImg
                  src={store.img}
                  alt={store.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Card Content */}
              <div style={{ padding: isM(bp) ? '20px 18px' : 24 }}>
                {/* Name + Tag */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: 12, marginBottom: 10
                }}>
                  <h3 className="serif" style={{
                    fontSize: isM(bp) ? 18 : 20,
                    fontWeight: 600,
                    color: 'var(--forest-900)',
                    margin: 0
                  }}>{store.name}</h3>
                  {store.tag && (
                    <span style={{
                      fontSize: 11, fontWeight: 500,
                      color: 'var(--forest-800)',
                      background: 'var(--sage-100)',
                      padding: '2px 8px',
                      lineHeight: '16px'
                    }}>{store.tag}</span>
                  )}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--ink-60)',
                  margin: '0 0 16px'
                }}>{store.desc}</p>

                {/* Separator */}
                <div style={{
                  height: 1,
                  background: 'var(--ink-08)',
                  marginBottom: 16
                }} />

                {/* Details */}
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: 6
                }}>
                  {[
                    { label: '地址', value: store.addr },
                    { label: '營業', value: store.hours },
                    { label: '電話', value: store.phone },
                  ].map((info) => (
                    <div key={info.label} style={{
                      display: 'flex', gap: 12, alignItems: 'baseline'
                    }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        color: 'var(--ink-40)',
                        width: 32, flexShrink: 0
                      }}>{info.label}</span>
                      <span style={{
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: 'var(--ink-60)'
                      }}>{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

window.StoresPage = StoresPage;
