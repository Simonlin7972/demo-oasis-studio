// Responsive navigation — desktop horizontal menu / mobile hamburger drawer

const DC_DATA = window.OASIS_DATA;

function Nav({ onHome, onNavigate, cartCount = 0, onCart, activePage = 'home' }) {
  const navPageMap = { '首頁': 'home', '養護指南': 'guides', '門市': 'stores', '關於我們': 'about' };
  const isActive = (label) => navPageMap[label] === activePage;
  const { bp } = useViewport();
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
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
                      else if (n === '養護指南' && onNavigate) { onNavigate('guides'); }
                      else if (n === '門市' && onNavigate) { onNavigate('stores'); }
                      else if (n === '關於我們' && onNavigate) { onNavigate('about'); }
                    }} style={{
                      display: 'block', padding: '12px 0', fontSize: 15,
                      color: isActive(n) ? 'var(--forest-900)' : 'var(--ink)',
                      fontWeight: isActive(n) ? 600 : 400,
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
            else if (n === '養護指南' && onNavigate) { onNavigate('guides'); }
            else if (n === '門市' && onNavigate) { onNavigate('stores'); }
            else if (n === '關於我們' && onNavigate) { onNavigate('about'); }
          }} className={`nav-link${isActive(n) ? ' active' : ''}${scrolled ? ' nav-scrolled' : ''}`} style={{
            paddingBottom: 4,
            fontWeight: isActive(n) ? 600 : 400,
            color: navText,
            opacity: isActive(n) ? 1 : 0.55,
            transition: 'color .3s, opacity .2s'
          }}
          onMouseEnter={(e) => { if (!isActive(n)) e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { if (!isActive(n)) e.currentTarget.style.opacity = '0.55'; }}>
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

window.Nav = Nav;
