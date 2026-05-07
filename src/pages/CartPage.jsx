// Shopping cart page

const DC_DATA = window.OASIS_DATA;

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
        <Nav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} activePage="cart" />
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
        <Footer />
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
      <Nav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} activePage="cart" />
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
      <Footer />
    </>
  );
}

window.CartPage = CartPage;
