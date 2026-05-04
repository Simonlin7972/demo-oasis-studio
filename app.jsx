// 綠洲所 保守版 RWD — Desktop / Tablet / Mobile
// Each section reads useViewport() and adapts grid/typography accordingly.

const DC_DATA = window.OASIS_DATA;

// ── viewport hook (uses container width via ResizeObserver, not window,
//    so artboards inside the canvas can be sized independently) ──
const ViewportCtx = React.createContext({ bp: 'desktop', w: 1440 });
function useViewport() { return React.useContext(ViewportCtx); }

function ViewportProvider({ children }) {
  const ref = React.useRef(null);
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const cw = entries[0].contentRect.width;
      if (cw > 0) setW(cw);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const bp = w < 640 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  return (
    <div ref={ref} style={{ width: '100%' }}>
      <ViewportCtx.Provider value={{ bp, w }}>{children}</ViewportCtx.Provider>
    </div>
  );
}

// shorthand
const isM = (bp) => bp === 'mobile';
const isT = (bp) => bp === 'tablet';
const isD = (bp) => bp === 'desktop';
const notD = (bp) => bp !== 'desktop';

// pad helper
const pad = (bp) => isM(bp) ? '20px' : isT(bp) ? '32px' : '56px';

/* ===== NAV ===== */
function ConservativeNav({ onHome, onNavigate, cartCount = 0, onCart }) {
  const { bp } = useViewport();
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false); // controls CSS transition state
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMenu = () => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };
  const closeMenu = () => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      document.body.style.overflow = '';
    }, 300);
  };

  if (notD(bp)) {
    return (
      <>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `14px ${pad(bp)}`,
          background: scrolled ? 'var(--forest-800)' : 'var(--paper)',
          borderBottom: scrolled ? 'none' : '1px solid var(--ink-08)',
          position: 'sticky', top: 0, zIndex: 50,
          transition: 'background .3s, border-color .3s'
        }}>
          <button onClick={openMenu} style={{ color: scrolled ? 'var(--cream-50)' : 'var(--forest-900)', transition: 'color .3s' }}>
            <Icon.menu width={20} height={20} />
          </button>
          <button onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: scrolled ? 'var(--cream-50)' : 'var(--forest-800)',
              display: 'grid', placeItems: 'center',
              color: scrolled ? 'var(--forest-800)' : 'var(--cream-50)',
              transition: 'background .3s, color .3s'
            }}>
              <Icon.leaf width={15} height={15} />
            </div>
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, color: scrolled ? 'var(--cream-50)' : 'var(--forest-900)', transition: 'color .3s' }}>綠洲所</div>
          </button>
          <div style={{ display: 'flex', gap: 14, color: scrolled ? 'var(--cream-50)' : 'var(--ink)', transition: 'color .3s' }}>
            <button><Icon.search /></button>
            <button onClick={onCart} style={{ position: 'relative' }}>
              <Icon.cart />
              {cartCount > 0 && <span style={{
                position: 'absolute', top: -4, right: -6, fontSize: 9,
                background: scrolled ? 'var(--cream-50)' : 'var(--forest-800)',
                color: scrolled ? 'var(--forest-800)' : 'var(--cream-50)',
                borderRadius: 999, width: 14, height: 14, display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-mono)', transition: 'background .3s, color .3s'
              }}>{cartCount}</span>}
            </button>
          </div>
        </nav>
        {open &&
          <div onClick={closeMenu} style={{
            position: 'fixed', inset: 0,
            background: visible ? 'rgba(20,39,30,.5)' : 'rgba(20,39,30,0)',
            transition: 'background .3s ease',
            zIndex: 100
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              width: 280, height: '100%', background: 'var(--paper)', padding: '24px 24px',
              transform: visible ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform .3s cubic-bezier(.4, 0, .2, 1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--forest-900)' }}>綠洲所</div>
                <button onClick={closeMenu} style={{ fontSize: 20, color: 'var(--ink-60)' }}>✕</button>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {DC_DATA.nav.map((n, i) =>
                  <li key={i}>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      if (i === 0) { onHome(); }
                      else if (n === '關於我們' && onNavigate) { onNavigate('about'); }
                    }} style={{
                      display: 'block', padding: '12px 0', fontSize: 15,
                      color: i === 0 ? 'var(--forest-900)' : 'var(--ink)',
                      fontWeight: i === 0 ? 600 : 400,
                      borderBottom: '1px solid var(--ink-08)'
                    }}>{n}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        }
      </>
    );
  }

  const navBg = scrolled ? 'var(--forest-800)' : 'var(--paper)';
  const navText = scrolled ? 'var(--cream-50)' : 'var(--ink)';
  const navBrand = scrolled ? 'var(--cream-50)' : 'var(--forest-900)';
  const navBorder = scrolled ? 'var(--cream-50)' : 'var(--forest-800)';

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 56px', background: navBg,
      borderBottom: scrolled ? 'none' : '1px solid var(--ink-08)',
      position: 'sticky', top: 0, zIndex: 50,
      transition: 'background .3s, border-color .3s'
    }}>
      <button onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: scrolled ? 'var(--cream-50)' : 'var(--forest-800)',
          display: 'grid', placeItems: 'center',
          color: scrolled ? 'var(--forest-800)' : 'var(--cream-50)',
          transition: 'background .3s, color .3s'
        }}>
          <Icon.leaf width={18} height={18} />
        </div>
        <div className="serif" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1, color: navBrand, transition: 'color .3s' }}>綠洲所</div>
      </button>
      <div style={{ display: 'flex', gap: 36, fontSize: 14, color: navText, transition: 'color .3s' }}>
        {DC_DATA.nav.map((n, i) =>
          <a key={i} href="#" onClick={(e) => {
            e.preventDefault();
            if (i === 0) { onHome(); }
            else if (n === '關於我們' && onNavigate) { onNavigate('about'); }
          }} className={`nav-link${i === 0 ? ' active' : ''}${scrolled ? ' nav-scrolled' : ''}`} style={{
            paddingBottom: 4,
            fontWeight: i === 0 ? 600 : 400,
            color: navText,
            opacity: i === 0 ? 1 : 0.55,
            transition: 'color .3s, opacity .2s'
          }}
          onMouseEnter={(e) => { if (i !== 0) e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { if (i !== 0) e.currentTarget.style.opacity = '0.55'; }}>
            {n}</a>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: navText, transition: 'color .3s' }}>
        {[
          { icon: <Icon.search />, key: 'search' },
          { icon: <Icon.heart />, key: 'heart' },
        ].map((item) =>
          <button key={item.key} style={{
            width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center',
            transition: 'background .2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = scrolled ? 'rgba(255,255,255,.12)' : 'var(--ink-08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            {item.icon}
          </button>
        )}
        <button onClick={onCart} style={{
          position: 'relative', width: 36, height: 36, borderRadius: '50%',
          display: 'grid', placeItems: 'center', transition: 'background .2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = scrolled ? 'rgba(255,255,255,.12)' : 'var(--ink-08)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
          <Icon.cart />
          {cartCount > 0 && <span style={{
            position: 'absolute', top: -4, right: -6, fontSize: 9,
            background: scrolled ? 'var(--cream-50)' : 'var(--forest-800)',
            color: scrolled ? 'var(--forest-800)' : 'var(--cream-50)',
            borderRadius: 999, width: 14, height: 14, display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-mono)', transition: 'background .3s, color .3s'
          }}>{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

/* ===== HERO ===== */
function ConservativeHero() {
  const { bp } = useViewport();
  const car = useCarousel(DC_DATA.heroSlides.length);
  const slide = DC_DATA.heroSlides[car.i];
  const titleSize = isM(bp) ? 32 : isT(bp) ? 40 : 48;
  const cols = notD(bp) ? '1fr' : '1.1fr 1fr';
  const heroPad = isM(bp) ? '32px 20px 36px' : isT(bp) ? '48px 32px 48px' : '64px 56px 56px';

  return (
    <section style={{
      display: 'grid', gridTemplateColumns: cols, gap: isM(bp) ? 28 : 40,
      padding: heroPad, background: 'var(--cream-50)'
    }} onMouseEnter={car.pause} onMouseLeave={car.resume}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',
        order: notD(bp) ? 2 : 1 }}>
        <div className="eyebrow">{slide.eyebrow}</div>
        <h1 className="serif" style={{
          fontSize: titleSize, lineHeight: 1.1, fontWeight: 600, color: 'var(--forest-900)',
          margin: isM(bp) ? '14px 0 18px' : '20px 0 24px', whiteSpace: 'pre-line'
        }}>{slide.title}</h1>
        <p style={{ fontSize: isM(bp) ? 14 : 15, lineHeight: 1.8, color: 'var(--ink-60)',
          whiteSpace: 'pre-line', maxWidth: 460, marginBottom: isM(bp) ? 24 : 36 }}>
          {slide.sub}
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexDirection: isM(bp) ? 'column' : 'row', alignItems: isM(bp) ? 'stretch' : 'center' }}>
          <button className="btn-primary" style={{ justifyContent: 'center' }}>{slide.cta}<Icon.arrow /></button>
          <button className="btn-secondary" style={{ justifyContent: 'center' }}>{slide.ctaSub}</button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: isM(bp) ? 28 : 48 }}>
          {DC_DATA.heroSlides.map((_, i) =>
            <button key={i} onClick={() => car.set(i)} style={{
              width: i === car.i ? 28 : 8, height: 4, borderRadius: 2,
              background: i === car.i ? 'var(--forest-800)' : 'var(--ink-15)',
              transition: 'all .3s'
            }} />
          )}
        </div>
      </div>
      <div style={{
        position: 'relative', borderRadius: 18, overflow: 'hidden',
        minHeight: isM(bp) ? 280 : isT(bp) ? 380 : 480,
        background: 'var(--sage-200)', order: notD(bp) ? 1 : 2
      }}>
        <SafeImg src={slide.img} alt={slide.imgAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        <div style={{
          position: 'absolute', left: 16, bottom: 16,
          background: 'rgba(20,39,30,.85)', color: 'var(--cream-50)',
          padding: '8px 14px', borderRadius: 999, fontSize: 11,
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <span className="mono">{String(car.i + 1).padStart(2, '0')} / {String(DC_DATA.heroSlides.length).padStart(2, '0')}</span>
          <span style={{ opacity: .5 }}>·</span>
          <span>{slide.imgAlt}</span>
        </div>
      </div>
    </section>
  );
}

/* ===== PROMO ===== */
function ConservativePromo() {
  const { bp } = useViewport();
  const { days, hours, mins, secs } = useCountdown(DC_DATA.promo.endsAt);
  const Cell = ({ n, label }) =>
    <div style={{ textAlign: 'center', minWidth: isM(bp) ? 44 : 56 }}>
      <div className="mono" style={{ fontSize: isM(bp) ? 22 : 28, fontWeight: 600, color: 'var(--cream-50)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {String(n).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 9, color: 'rgba(244,246,238,.6)', marginTop: 6, letterSpacing: '.1em' }}>{label}</div>
    </div>;

  return (
    <section style={{
      margin: `0 ${pad(bp)}`, padding: isM(bp) ? '24px 22px' : isT(bp) ? '28px 32px' : '36px 48px',
      background: 'var(--forest-800)', borderRadius: 16,
      display: 'grid', gridTemplateColumns: notD(bp) ? '1fr' : '1fr auto',
      gap: notD(bp) ? 20 : 32, alignItems: 'center',
      color: 'var(--cream-50)'
    }}>
      <div style={{ textAlign: "center" }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--sage-300)', letterSpacing: '.18em', marginBottom: 8 }}>
          {DC_DATA.promo.label} · 倒數結束
        </div>
        <h2 className="serif" style={{ fontSize: isM(bp) ? 26 : 36, fontWeight: 600, marginBottom: 6, margin: "12px 0px 6px" }}>
          {DC_DATA.promo.title}
        </h2>
        <p style={{ fontSize: isM(bp) ? 12 : 13, color: 'rgba(244,246,238,.7)', lineHeight: 1.6, margin: "12px 0px" }}>
          {DC_DATA.promo.sub}　使用代碼 <span className="mono" style={{
            background: 'rgba(255,255,255,.1)', padding: '2px 8px', borderRadius: 4,
            color: 'var(--sage-300)'
          }}>{DC_DATA.promo.code}</span>
        </p>
      </div>
      <div style={{ display: 'flex', gap: isM(bp) ? 12 : 20, alignItems: 'center', flexWrap: 'wrap',
        justifyContent: notD(bp) ? 'flex-start' : 'flex-end' }}>
        <Cell n={days} label="DAYS" />
        <span style={{ color: 'rgba(244,246,238,.3)', fontSize: 24 }}>:</span>
        <Cell n={hours} label="HRS" />
        <span style={{ color: 'rgba(244,246,238,.3)', fontSize: 24 }}>:</span>
        <Cell n={mins} label="MIN" />
        <span style={{ color: 'rgba(244,246,238,.3)', fontSize: 24 }}>:</span>
        <Cell n={secs} label="SEC" />
        <button style={{
          marginLeft: notD(bp) ? 0 : 16, padding: '10px 18px', borderRadius: 999,
          background: 'var(--cream-50)', color: 'var(--forest-800)',
          fontSize: 12, fontWeight: 600
        }}>立即選購 →</button>
      </div>
    </section>
  );
}

/* ===== PRODUCT CARD ===== */
function ProductCard({ p, wished, onWish, onAdd, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const { bp } = useViewport();
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--paper)', borderRadius: 14, overflow: 'hidden',
        border: '1px solid var(--ink-08)', transition: 'all .2s',
        boxShadow: hover ? '0 12px 24px rgba(20,39,30,.08)' : 'none',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer'
      }}>
      <div onClick={() => onOpen(p)} style={{ position: 'relative', aspectRatio: '1', background: 'var(--sage-100)', overflow: 'hidden' }}>
        <SafeImg src={p.img} alt={p.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            opacity: hover && p.img2 ? 0 : 1, transition: 'opacity .3s' }} />
        {p.img2 &&
          <SafeImg src={p.img2} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover',
              position: 'absolute', inset: 0,
              opacity: hover ? 1 : 0, transition: 'opacity .3s' }} />
        }
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'var(--cream-50)', color: 'var(--forest-800)',
          padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600,
          letterSpacing: '.05em'
        }}>{p.tag}</div>
        <button onClick={(e) => { e.stopPropagation(); onWish(p.id); }} style={{
          position: 'absolute', top: 10, right: 10,
          width: 32, height: 32, borderRadius: '50%', background: 'var(--cream-50)',
          display: 'grid', placeItems: 'center',
          color: wished ? 'var(--accent)' : 'var(--ink-60)'
        }}>
          <Icon.heart filled={wished} />
        </button>
        {!isM(bp) &&
          <div style={{
            position: 'absolute', left: 12, right: 12, bottom: 12,
            display: 'flex', gap: 6, fontSize: 10, flexWrap: 'wrap',
            opacity: hover ? 1 : 0, transition: 'opacity .2s'
          }}>
            {[
              { i: <Icon.sun />, t: p.light },
              { i: <Icon.drop />, t: p.water },
              p.pet ? { i: <Icon.pet />, t: '寵物友善' } : null
            ].filter(Boolean).map((b, i) =>
              <div key={i} style={{
                background: 'rgba(255,255,255,.95)', padding: '5px 9px',
                borderRadius: 6, display: 'flex', alignItems: 'center', gap: 5,
                color: 'var(--forest-800)'
              }}>{b.i}<span>{b.t}</span></div>
            )}
          </div>
        }
      </div>
      <div onClick={() => onOpen(p)} style={{ padding: isM(bp) ? 12 : 16 }}>
        <div className="serif" style={{ fontSize: isM(bp) ? 15 : 17, fontWeight: 600, color: 'var(--forest-900)' }}>{p.name}</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-40)', marginBottom: 12, fontStyle: 'italic', marginTop: 2 }}>{p.latin}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="mono" style={{ fontSize: isM(bp) ? 14 : 16, fontWeight: 600, color: 'var(--forest-800)' }}>{NT(p.price)}</span>
            {p.original && <span className="mono" style={{
              fontSize: 10, color: 'var(--ink-40)', textDecoration: 'line-through', marginLeft: 6
            }}>{NT(p.original)}</span>}
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAdd(p); }} style={{
            background: 'var(--forest-800)', color: 'var(--cream-50)',
            width: 32, height: 32, borderRadius: '50%',
            display: 'grid', placeItems: 'center'
          }}>
            <Icon.cart width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== FEATURED ===== */
function ConservativeFeatured({ wishlist, onWish, onAdd, onOpen }) {
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

/* ===== CATEGORIES ===== */
function ConservativeCategories() {
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

/* ===== SCENARIOS ===== */
function ConservativeScenarios() {
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

/* ===== REVIEWS ===== */
function ConservativeReviews() {
  const { bp } = useViewport();
  const car = useCarousel(DC_DATA.reviews.length, 7000);
  const r = DC_DATA.reviews[car.i];
  return (
    <section style={{ padding: `${isM(bp) ? 48 : 72}px ${pad(bp)}`, background: 'var(--paper)' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div className="eyebrow">客戶評價 · TESTIMONIALS</div>
        <h2 className="serif" style={{ fontSize: isM(bp) ? 24 : 32, fontWeight: 600, color: 'var(--forest-900)', marginTop: 8 }}>
          來自城市裡的人
        </h2>
      </div>
      <div style={{
        maxWidth: 880, margin: '0 auto',
        background: 'var(--cream-50)', borderRadius: 16,
        display: 'grid', gridTemplateColumns: notD(bp) ? '1fr' : '1fr 1.4fr',
        overflow: 'hidden'
      }}>
        <div style={{ aspectRatio: notD(bp) ? '1.6' : '1', background: 'var(--sage-200)' }}>
          <SafeImg src={r.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{
          padding: isM(bp) ? '24px 22px' : '36px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', gap: 2, color: 'var(--forest-600)', marginBottom: 14 }}>
              {Array(r.rating).fill(0).map((_, i) => <Icon.star key={i} width={16} height={16} />)}
            </div>
            <p className="serif" style={{ fontSize: isM(bp) ? 15 : 18, lineHeight: 1.75, color: 'var(--forest-900)', fontWeight: 500 }}>
              「{r.text}」
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20, gap: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-900)' }}>{r.name}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-60)', marginTop: 4 }}>{r.role}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-40)', marginTop: 8 }}>購買：{r.product}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={car.prev} style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--ink-15)', display: 'grid', placeItems: 'center'
              }}><Icon.arrowL /></button>
              <button onClick={car.next} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--forest-800)', color: 'var(--cream-50)',
                display: 'grid', placeItems: 'center'
              }}><Icon.arrow /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== GUIDES ===== */
function ConservativeGuides() {
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
          <a key={g.id} href="#" style={{ display: 'block' }}>
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

/* ===== FOOTER ===== */
function ConservativeFooter() {
  const { bp } = useViewport();
  const cols = isM(bp) ? '1fr' : isT(bp) ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr';
  return (
    <footer style={{
      background: 'var(--forest-900)', color: 'var(--cream-50)',
      padding: `${isM(bp) ? 40 : 56}px ${pad(bp)} 28px`, marginTop: 32
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isM(bp) ? 28 : 40, marginBottom: 32 }}>
        <div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>綠洲所</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--sage-300)', letterSpacing: '.18em', marginBottom: 14 }}>
            OASIS · STUDIO
          </div>
          <p style={{ fontSize: 13, color: 'rgba(244,246,238,.6)', lineHeight: 1.7, maxWidth: 280 }}>
            打造屬於你的城市綠洲。<br />為都市生活注入一抹綠意。
          </p>
        </div>
        {[
          { t: '關於', items: ['品牌故事', '門市資訊', '加入我們', '永續理念'] },
          { t: '客服', items: ['配送說明', '退換貨政策', '養護保障', '常見問題'] },
          { t: '社群', items: ['Instagram', 'Facebook', 'LINE 官方', '訂閱電子報'] },
        ].map((c) =>
          <div key={c.t}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--sage-300)', letterSpacing: '.18em', marginBottom: 14 }}>
              {c.t.toUpperCase()}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {c.items.map((i) =>
                <li key={i}><a href="#" style={{ fontSize: 13, color: 'rgba(244,246,238,.7)' }}>{i}</a></li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div style={{
        borderTop: '1px solid rgba(244,246,238,.1)', paddingTop: 16,
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        fontSize: 11, color: 'rgba(244,246,238,.5)'
      }}>
        <div className="mono">© 2026 OASIS STUDIO · TAIPEI</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#">隱私政策</a>
          <a href="#">服務條款</a>
        </div>
      </div>
    </footer>
  );
}

/* ===== ABOUT PAGE ===== */
function AboutPage({ onHome, onNavigate, cartCount, onCart }) {
  const { bp } = useViewport();
  const brand = DC_DATA.brand;

  const Section = ({ children, bg, py }) => (
    <section style={{
      padding: `${py || (isM(bp) ? 48 : isT(bp) ? 64 : 80)}px ${pad(bp)}`,
      background: bg || 'var(--paper)'
    }}>{children}</section>
  );

  const values = [
    {
      num: '01',
      title: '源自自然的選品',
      desc: '每一盆植物都經園藝師親手挑選，確保根系健康、葉片飽滿。我們只上架自己願意帶回家的植物。',
      img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    },
    {
      num: '02',
      title: '為都市而生的養護',
      desc: '朝北窗也好、加班忘記澆水也好，我們挑選的每款植物都附上量身打造的養護指南，讓城市人也能輕鬆養活。',
      img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
    },
    {
      num: '03',
      title: '永續包裝與配送',
      desc: '全品項使用可回收包材，保麗龍歸零。48 小時保鮮配送，盆器破損或植物不健康，無條件換新。',
      img: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
    },
  ];

  const milestones = [
    { year: '2022', event: '綠洲所於台北成立，第一間工作室在大安區落腳' },
    { year: '2023', event: '累積服務超過 3,000 位城市植友，推出一年植物保固' },
    { year: '2024', event: '全面轉型永續包裝，保麗龍使用量歸零' },
    { year: '2025', event: '線上商城上線，服務擴及全台本島' },
    { year: '2026', event: '推出「城市綠洲計畫」，為租屋族打造植物訂閱制' },
  ];

  const team = [
    { name: '阿綠', role: '創辦人 · 園藝師', desc: '十年園藝經歷，相信每個空間都值得一盆好植物。', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
    { name: '小盆', role: '養護顧問', desc: '專攻室內植物照護，你的植物急診室就是她。', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
    { name: 'Wei', role: '選品 · 配送', desc: '每週跑產地，確保每盆植物從土壤到你手上都是最好狀態。', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  ];

  return (
    <>
      <ConservativeNav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} />

      {/* ── Hero ── */}
      <Section bg="var(--cream-50)" py={isM(bp) ? 56 : isT(bp) ? 72 : 96}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: notD(bp) ? '1fr' : '1fr 1fr',
          gap: isM(bp) ? 32 : 48,
          alignItems: 'center'
        }}>
          <div style={{ order: notD(bp) ? 2 : 1 }}>
            <div className="eyebrow">關於我們 · ABOUT</div>
            <h1 className="serif" style={{
              fontSize: isM(bp) ? 32 : isT(bp) ? 40 : 48,
              lineHeight: 1.15,
              fontWeight: 600,
              color: 'var(--forest-900)',
              margin: '16px 0 20px'
            }}>
              在城市裡{notD(bp) ? '' : '\n'}種一片綠洲
            </h1>
            <p style={{
              fontSize: isM(bp) ? 14 : 15,
              lineHeight: 1.85,
              color: 'var(--ink-60)',
              maxWidth: 480,
              marginBottom: 28
            }}>
              綠洲所成立於 2022 年，我們相信一盆植物可以改變一個空間的溫度。從選品、包裝到配送，每一個環節都為了讓城市裡的人，能更輕鬆地擁有一片屬於自己的綠。
            </p>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { n: '3,000+', l: '服務植友' },
                { n: '120+', l: '精選品種' },
                { n: '98%', l: '好評率' },
              ].map((s) =>
                <div key={s.l}>
                  <div className="mono" style={{ fontSize: isM(bp) ? 24 : 28, fontWeight: 600, color: 'var(--forest-800)' }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-60)', marginTop: 4 }}>{s.l}</div>
                </div>
              )}
            </div>
          </div>
          <div style={{
            order: notD(bp) ? 1 : 2,
            aspectRatio: notD(bp) ? '1.6' : '0.9',
            background: 'var(--sage-200)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <SafeImg
              src="https://images.unsplash.com/photo-1525498128493-380d1990a112?w=1200&q=80"
              alt="綠洲所工作室"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </Section>

      {/* ── Brand Statement ── */}
      <Section bg="var(--forest-800)">
        <div style={{
          maxWidth: 720,
          margin: '0 auto',
          textAlign: 'center',
          color: 'var(--cream-50)'
        }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--sage-300)', letterSpacing: '.18em', marginBottom: 16 }}>
            OUR MISSION
          </div>
          <h2 className="serif" style={{
            fontSize: isM(bp) ? 22 : isT(bp) ? 28 : 32,
            fontWeight: 600,
            lineHeight: 1.5,
            marginBottom: 20
          }}>
            「不是每個人都有後院，<br />但每個人都值得一片綠。」
          </h2>
          <p style={{
            fontSize: isM(bp) ? 13 : 14,
            lineHeight: 1.85,
            color: 'rgba(244,246,238,.7)',
            maxWidth: 560,
            margin: '0 auto'
          }}>
            台灣有超過 70% 的人口住在都市，大多數人的「窗外」是另一面牆。綠洲所想做的很簡單——讓植物走進每一個十坪小套房、每一張加班的辦公桌，讓綠色成為城市生活的日常。
          </p>
        </div>
      </Section>

      {/* ── Values ── */}
      <Section>
        <div style={{ marginBottom: isM(bp) ? 28 : 40 }}>
          <div className="eyebrow">我們的堅持 · VALUES</div>
          <h2 className="serif" style={{
            fontSize: isM(bp) ? 24 : 32,
            fontWeight: 600,
            color: 'var(--forest-900)',
            marginTop: 8
          }}>
            三件我們每天在做的事
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isM(bp) ? '1fr' : isT(bp) ? '1fr' : 'repeat(3, 1fr)',
          gap: isM(bp) ? 24 : 28
        }}>
          {values.map((v) =>
            <div key={v.num} style={{
              background: 'var(--cream-50)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: isT(bp) ? 'row' : 'column'
            }}>
              <div style={{
                aspectRatio: isT(bp) ? undefined : '1.3',
                width: isT(bp) ? '40%' : undefined,
                minHeight: isT(bp) ? 220 : undefined,
                background: 'var(--sage-200)',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <SafeImg src={v.img} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: isM(bp) ? '20px 18px' : '24px 22px' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--forest-600)', letterSpacing: '.18em', marginBottom: 10 }}>{v.num}</div>
                <h3 className="serif" style={{ fontSize: isM(bp) ? 18 : 20, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: 'var(--ink-60)' }}>{v.desc}</p>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ── Timeline ── */}
      <Section bg="var(--cream-50)">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isM(bp) ? '1fr' : '280px 1fr',
          gap: isM(bp) ? 24 : 48
        }}>
          <div>
            <div className="eyebrow">品牌歷程 · TIMELINE</div>
            <h2 className="serif" style={{
              fontSize: isM(bp) ? 24 : 32,
              fontWeight: 600,
              color: 'var(--forest-900)',
              marginTop: 8
            }}>
              一路走來
            </h2>
          </div>
          <div>
            {milestones.map((m, i) =>
              <div key={m.year} style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: 16,
                padding: '18px 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--ink-08)'
              }}>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest-800)' }}>{m.year}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink)' }}>{m.event}</div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* ── Team ── */}
      <Section>
        <div style={{ marginBottom: isM(bp) ? 28 : 40 }}>
          <div className="eyebrow">團隊 · TEAM</div>
          <h2 className="serif" style={{
            fontSize: isM(bp) ? 24 : 32,
            fontWeight: 600,
            color: 'var(--forest-900)',
            marginTop: 8
          }}>
            幕後的人
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isM(bp) ? '1fr' : isT(bp) ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
          gap: isM(bp) ? 20 : 28
        }}>
          {team.map((t) =>
            <div key={t.name} style={{ textAlign: 'center' }}>
              <div style={{
                width: isM(bp) ? 120 : 140,
                height: isM(bp) ? 120 : 140,
                margin: '0 auto 16px',
                background: 'var(--sage-200)',
                overflow: 'hidden',
                borderRadius: '50%'
              }}>
                <SafeImg src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 4 }}>{t.name}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--forest-600)', letterSpacing: '.08em', marginBottom: 10 }}>{t.role}</div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--ink-60)', maxWidth: 280, margin: '0 auto' }}>{t.desc}</p>
            </div>
          )}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section bg="var(--sage-100)" py={isM(bp) ? 48 : 64}>
        <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
          <h2 className="serif" style={{
            fontSize: isM(bp) ? 24 : 32,
            fontWeight: 600,
            color: 'var(--forest-900)',
            marginBottom: 12
          }}>
            開始你的城市綠洲
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--ink-60)', marginBottom: 28 }}>
            不確定從哪一盆開始？我們的養護顧問隨時在線，幫你找到最適合你空間與生活節奏的植物。
          </p>
          <div style={{
            display: 'flex', gap: 12,
            justifyContent: 'center',
            flexDirection: isM(bp) ? 'column' : 'row',
            alignItems: isM(bp) ? 'stretch' : 'center'
          }}>
            <button onClick={onHome} className="btn-primary" style={{ justifyContent: 'center' }}>
              逛逛商品 <Icon.arrow />
            </button>
            <button className="btn-secondary" style={{ justifyContent: 'center' }}>
              聯繫我們
            </button>
          </div>
        </div>
      </Section>

      <ConservativeFooter />
    </>
  );
}

/* ===== HOME ROOT ===== */
function ConservativeHome({ onOpen, wishlist, onWish, onAdd, onHome, onNavigate, cartCount, onCart }) {
  return (
    <>
      <ConservativeNav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} />
      <ConservativeHero />
      <div style={{ marginTop: -10 }} />
      <ConservativePromo />
      <ConservativeFeatured wishlist={wishlist} onWish={onWish} onAdd={onAdd} onOpen={onOpen} />
      <ConservativeCategories />
      <ConservativeScenarios />
      <ConservativeReviews />
      <ConservativeGuides />
      <ConservativeFooter />
    </>
  );
}

/* ===== PRODUCT DETAIL PAGE ===== */
function ProductDetail({ product, onBack, onAdd, onWish, wished }) {
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

/* ===== CART PAGE ===== */
function CartPage({ cart, onHome, onNavigate, showToast, cartCount, onCart }) {
  const { bp } = useViewport();
  const { items, updateQty, remove, totalItems, totalPrice } = cart;
  const [promo, setPromo] = React.useState('');

  const shipping = totalPrice >= 1200 ? 0 : 150;
  const discount = 0;
  const grandTotal = totalPrice + shipping - discount;

  if (items.length === 0) {
    return (
      <>
        <ConservativeNav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} />
        <section style={{
          padding: `${isM(bp) ? 48 : 80}px ${pad(bp)}`,
          textAlign: 'center', minHeight: '50vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon.cart width={48} height={48} style={{ color: 'var(--ink-15)', marginBottom: 24 }} />
          <h1 className="serif" style={{ fontSize: isM(bp) ? 24 : 32, fontWeight: 600, color: 'var(--forest-900)', marginBottom: 12 }}>
            購物車是空的
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-60)', marginBottom: 28 }}>
            還沒有加入任何商品，去逛逛吧！
          </p>
          <button onClick={onHome} className="btn-primary" style={{ justifyContent: 'center' }}>
            逛逛商品 <Icon.arrow />
          </button>
        </section>
        <ConservativeFooter />
      </>
    );
  }

  const CartItemRow = ({ item }) => {
    const subtotal = item.price * item.qty;
    if (isM(bp)) {
      return (
        <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 64, height: 64, background: 'var(--sage-100)', flexShrink: 0, overflow: 'hidden' }}>
              <SafeImg src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--forest-900)' }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-60)', marginTop: 4 }}>尺寸：{item.size}</div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--ink-60)', marginTop: 4 }}>{NT(item.price)}</div>
            </div>
            <button onClick={() => remove(item.id, item.size)} style={{ color: 'var(--ink-40)', flexShrink: 0 }}>
              <Icon.trash width={18} height={18} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--ink-15)' }}>
              <button onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                style={{ width: 36, height: 36, fontSize: 16, color: 'var(--forest-800)' }}>−</button>
              <span className="mono" style={{ width: 44, textAlign: 'center', fontSize: 14, fontWeight: 500, borderLeft: '1px solid var(--ink-15)', borderRight: '1px solid var(--ink-15)', lineHeight: '36px' }}>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                style={{ width: 36, height: 36, fontSize: 16, color: 'var(--forest-800)' }}>+</button>
            </div>
            <span className="mono" style={{ fontSize: 15, fontWeight: 500, color: 'var(--forest-900)' }}>{NT(subtotal)}</span>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 80, height: 80, background: 'var(--sage-100)', flexShrink: 0, overflow: 'hidden' }}>
          <SafeImg src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--forest-900)' }}>{item.name}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-60)', marginTop: 4 }}>尺寸：{item.size}</div>
          <div className="mono" style={{ fontSize: 13, color: 'var(--ink-60)', marginTop: 4 }}>{NT(item.price)}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--ink-15)', flexShrink: 0 }}>
          <button onClick={() => updateQty(item.id, item.size, item.qty - 1)}
            style={{ width: 36, height: 36, fontSize: 16, color: 'var(--forest-800)' }}>−</button>
          <span className="mono" style={{ width: 44, textAlign: 'center', fontSize: 14, fontWeight: 500, borderLeft: '1px solid var(--ink-15)', borderRight: '1px solid var(--ink-15)', lineHeight: '36px' }}>{item.qty}</span>
          <button onClick={() => updateQty(item.id, item.size, item.qty + 1)}
            style={{ width: 36, height: 36, fontSize: 16, color: 'var(--forest-800)' }}>+</button>
        </div>
        <span className="mono" style={{ fontSize: 15, fontWeight: 500, color: 'var(--forest-900)', minWidth: 90, textAlign: 'right' }}>{NT(subtotal)}</span>
        <button onClick={() => remove(item.id, item.size)} style={{ color: 'var(--ink-40)', flexShrink: 0 }}>
          <Icon.trash width={18} height={18} />
        </button>
      </div>
    );
  };

  const OrderSummary = () => (
    <div style={{
      background: 'var(--sage-100)', padding: isM(bp) ? '24px 20px' : '32px',
      display: 'flex', flexDirection: 'column', gap: isM(bp) ? 16 : 24,
    }}>
      <h2 className="serif" style={{ fontSize: isM(bp) ? 17 : 20, fontWeight: 600, color: 'var(--forest-900)' }}>訂單摘要</h2>

      <div style={{ display: 'flex', gap: 8 }}>
        <input value={promo} onChange={(e) => setPromo(e.target.value)}
          placeholder="輸入優惠碼"
          style={{
            flex: 1, padding: '10px 12px', border: '1px solid var(--ink-15)',
            background: 'transparent', fontSize: 14, color: 'var(--forest-900)',
            outline: 'none'
          }} />
        <button onClick={() => { if (promo) showToast('優惠碼功能尚未開放'); }}
          style={{
            padding: '10px 16px', background: 'var(--forest-800)', color: 'var(--cream-50)',
            fontSize: 14, fontWeight: 500
          }}>套用</button>
      </div>

      <div style={{ borderTop: '1px solid var(--ink-08)', paddingTop: isM(bp) ? 12 : 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span style={{ color: 'var(--forest-900)' }}>小計</span>
          <span className="mono" style={{ fontWeight: 500 }}>{NT(totalPrice)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span style={{ color: 'var(--forest-900)' }}>運費</span>
          <span className="mono" style={{ fontWeight: 500, color: shipping === 0 ? 'var(--forest-600)' : 'var(--forest-900)' }}>
            {shipping === 0 ? '免運' : NT(shipping)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
          <span style={{ color: 'var(--forest-900)' }}>折扣</span>
          <span className="mono" style={{ fontWeight: 500, color: 'var(--ink-60)' }}>-{NT(discount)}</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--ink-08)', paddingTop: isM(bp) ? 12 : 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--forest-900)' }}>總計</span>
          <span className="mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--forest-900)' }}>{NT(grandTotal)}</span>
        </div>
      </div>

      <button onClick={() => showToast('結帳功能尚未開放')}
        className="btn-primary" style={{ justifyContent: 'center', padding: '14px 24px' }}>
        前往結帳
      </button>

      <button onClick={onHome} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        fontSize: 14, color: 'var(--ink-60)', background: 'none', border: 'none', cursor: 'pointer'
      }}>
        繼續購物 <Icon.arrow />
      </button>
    </div>
  );

  return (
    <>
      <ConservativeNav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} />
      <div style={{
        padding: `${isM(bp) ? 24 : 48}px ${pad(bp)} ${isM(bp) ? 32 : 80}px`,
        display: isD(bp) ? 'flex' : 'block',
        gap: 64, alignItems: 'flex-start',
      }}>
        {/* Cart Items */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: isM(bp) ? 16 : 32 }}>
            <h1 className="serif" style={{ fontSize: isM(bp) ? 22 : 28, fontWeight: 600, color: 'var(--forest-900)' }}>
              {isM(bp) ? `購物車 (${totalItems})` : '購物車'}
            </h1>
            {!isM(bp) && <span style={{ fontSize: 14, color: 'var(--ink-60)' }}>({totalItems} 件商品)</span>}
          </div>

          {isD(bp) && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 24, padding: '12px 0',
              fontSize: 12, color: 'var(--ink-40)', fontWeight: 500
            }}>
              <span style={{ width: 80 }} />
              <span style={{ flex: 1 }}>商品</span>
              <span style={{ width: 116, flexShrink: 0 }}>數量</span>
              <span style={{ width: 90, textAlign: 'right', flexShrink: 0 }}>小計</span>
              <span style={{ width: 18 }} />
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--ink-08)' }}>
            {items.map((item, i) => (
              <React.Fragment key={`${item.id}-${item.size}`}>
                <CartItemRow item={item} />
                {i < items.length - 1 && <div style={{ borderTop: '1px solid var(--ink-08)' }} />}
              </React.Fragment>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--ink-08)' }} />
        </div>

        {/* Order Summary */}
        <div style={{
          width: isD(bp) ? 380 : '100%',
          flexShrink: 0,
          marginTop: isD(bp) ? 0 : 32,
        }}>
          <OrderSummary />
        </div>
      </div>
      <ConservativeFooter />
    </>
  );
}

/* ===== ROUTE HELPERS ===== */
function parseRoute(pathname) {
  const path = pathname || window.location.pathname;
  if (path === '/about') return { kind: 'about' };
  if (path === '/cart') return { kind: 'cart' };
  if (path === '/ds') return { kind: 'ds' };
  if (path === '/ds-button') return { kind: 'ds-button' };
  const productMatch = path.match(/^\/product\/(.+)$/);
  if (productMatch) {
    const p = DC_DATA.featured.find((x) => x.id === productMatch[1]);
    if (p) return { kind: 'product', product: p };
  }
  // Fallback: also check query params for backwards compatibility
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page === 'ds') return { kind: 'ds' };
  if (page === 'ds-button') return { kind: 'ds-button' };
  if (page === 'about') return { kind: 'about' };
  if (page === 'cart') return { kind: 'cart' };
  const pid = params.get('product');
  if (pid) {
    const p = DC_DATA.featured.find((x) => x.id === pid);
    if (p) return { kind: 'product', product: p };
  }
  return { kind: 'home' };
}

/* ===== APP ROOT ===== */
function OasisApp() {
  const [route, setRoute] = React.useState(() => parseRoute());
  const [wishlist, toggleWish] = useWishlist('oasis-conservative');
  const cart = useCart('oasis-cart');
  const [showToast, Toast] = useToast();
  const [transition, setTransition] = React.useState(null); // null | 'cover' | 'reveal'
  const pendingRoute = React.useRef(null);

  const navigateWithTransition = (newRoute, urlUpdater) => {
    if (transition) return;
    pendingRoute.current = { route: newRoute, urlUpdater };
    setTransition('cover');
  };

  // When cover animation ends, swap route + start reveal
  const handleTransitionEnd = () => {
    if (transition === 'cover' && pendingRoute.current) {
      const { route: newRoute, urlUpdater } = pendingRoute.current;
      pendingRoute.current = null;
      setRoute(newRoute);
      if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo(0, 0);
      if (urlUpdater) urlUpdater();
      // Small delay so the new page renders under the overlay before reveal
      requestAnimationFrame(() => requestAnimationFrame(() => setTransition('reveal')));
    } else if (transition === 'reveal') {
      setTransition(null);
    }
  };

  const onAdd = (p, qty = 1, size = 'M') => {
    cart.add(p, size, qty);
    showToast(`已加入購物車：${p.name}${qty > 1 ? ' × ' + qty : ''}`);
  };
  const onWish = (id) => {
    const wished = wishlist.has(id);
    toggleWish(id);
    showToast(wished ? '已從願望清單移除' : '已加入願望清單');
  };
  const onOpen = (p) => {
    navigateWithTransition({ kind: 'product', product: p }, () => {
      window.history.pushState({}, '', `/product/${p.id}`);
    });
  };
  const onHome = () => {
    navigateWithTransition({ kind: 'home' }, () => {
      window.history.pushState({}, '', '/');
    });
  };
  const goPage = (page) => {
    navigateWithTransition({ kind: page }, () => {
      window.history.pushState({}, '', `/${page}`);
    });
  };

  // Handle browser back/forward
  React.useEffect(() => {
    const handler = () => setRoute(parseRoute());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return (
    <ViewportProvider>
      <div className="oasis" style={{ background: 'var(--paper)', minHeight: '100vh', width: '100%' }}>
        {route.kind === 'home' ?
          <ConservativeHome onOpen={onOpen} wishlist={wishlist} onWish={onWish} onAdd={onAdd} onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} /> :
          route.kind === 'about' ?
          <AboutPage onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} /> :
          route.kind === 'cart' ?
          <CartPage cart={cart} onHome={onHome} onNavigate={goPage} showToast={showToast} cartCount={cart.totalItems} onCart={() => goPage('cart')} /> :
          route.kind === 'ds' ?
          <DesignSystemPage onHome={onHome} onNavigate={goPage} /> :
          route.kind === 'ds-button' ?
          <DSButtonPage onHome={onHome} onDS={() => goPage('ds')} /> :
          <>
            <ConservativeNav onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} />
            <ProductDetail product={route.product} onBack={onHome}
              onAdd={onAdd} onWish={onWish} wished={wishlist.has(route.product.id)} />
            <ConservativeFooter />
          </>
        }
        {Toast}
        {transition && (
          <div
            className={`oasis-transition-overlay ${transition === 'cover' ? 'phase-cover' : 'phase-reveal'}`}
            onAnimationEnd={handleTransitionEnd}
          />
        )}
      </div>
    </ViewportProvider>
  );
}

window.OasisApp = OasisApp;
