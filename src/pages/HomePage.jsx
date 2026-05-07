// Homepage — composes all homepage sections

function HomePage({ onOpen, wishlist, onWish, onAdd, onHome, onNavigate, cartCount, onCart }) {
  return (
    <>
      <Nav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} activePage="home" />
      <Hero />
      <div style={{ marginTop: -10 }} />
      <Promo />
      <Featured wishlist={wishlist} onWish={onWish} onAdd={onAdd} onOpen={onOpen} />
      <Categories />
      <Scenarios />
      <Reviews />
      <Guides />
      <Footer />
    </>
  );
}

window.HomePage = HomePage;
