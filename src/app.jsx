// 綠洲所 App Root — routing + global state + providers

const DC_DATA = window.OASIS_DATA;

/* ===== ROUTE HELPERS ===== */
function parseRoute(pathname) {
  const path = pathname || window.location.pathname;
  if (path === '/about') return { kind: 'about' };
  if (path === '/stores') return { kind: 'stores' };
  if (path === '/guides') return { kind: 'guides' };
  const guideMatch = path.match(/^\/guides\/(.+)$/);
  if (guideMatch) {
    const g = DC_DATA.guides.find((x) => x.id === guideMatch[1]);
    if (g) return { kind: 'guide-detail', guide: g };
  }
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
  if (page === 'stores') return { kind: 'stores' };
  if (page === 'guides') return { kind: 'guides' };
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
  const [transition, setTransition] = React.useState(null);
  const pendingRoute = React.useRef(null);

  const navigateWithTransition = (newRoute, urlUpdater) => {
    if (transition) return;
    pendingRoute.current = { route: newRoute, urlUpdater };
    setTransition('cover');
  };

  const handleTransitionEnd = () => {
    if (transition === 'cover' && pendingRoute.current) {
      const { route: newRoute, urlUpdater } = pendingRoute.current;
      pendingRoute.current = null;
      setRoute(newRoute);
      if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo(0, 0);
      if (urlUpdater) urlUpdater();
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
  const onOpenGuide = (g) => {
    navigateWithTransition({ kind: 'guide-detail', guide: g }, () => {
      window.history.pushState({}, '', `/guides/${g.id}`);
    });
  };

  React.useEffect(() => {
    const handler = () => setRoute(parseRoute());
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return (
    <ViewportProvider>
      <div className="oasis" style={{ background: 'var(--paper)', minHeight: '100vh', width: '100%' }}>
        {route.kind === 'home' ?
          <HomePage onOpen={onOpen} onOpenGuide={onOpenGuide} wishlist={wishlist} onWish={onWish} onAdd={onAdd} onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} /> :
          route.kind === 'about' ?
          <AboutPage onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} /> :
          route.kind === 'stores' ?
          <StoresPage onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} /> :
          route.kind === 'guides' ?
          <GuidesPage onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} onOpenGuide={onOpenGuide} /> :
          route.kind === 'guide-detail' ?
          <GuideDetailPage guide={route.guide} onBack={() => goPage('guides')} onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} onOpenGuide={onOpenGuide} /> :
          route.kind === 'cart' ?
          <CartPage cart={cart} onHome={onHome} onNavigate={goPage} showToast={showToast} cartCount={cart.totalItems} onCart={() => goPage('cart')} /> :
          route.kind === 'ds' ?
          <DesignSystemPage onHome={onHome} onNavigate={goPage} /> :
          route.kind === 'ds-button' ?
          <DSButtonPage onHome={onHome} onDS={() => goPage('ds')} /> :
          <>
            <Nav onHome={onHome} onNavigate={goPage} cartCount={cart.totalItems} onCart={() => goPage('cart')} activePage="product" />
            <ProductDetailPage product={route.product} onBack={onHome}
              onAdd={onAdd} onWish={onWish} wished={wishlist.has(route.product.id)} />
            <Footer />
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
