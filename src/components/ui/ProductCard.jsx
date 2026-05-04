// Reusable product card — image gallery on hover, tag, price, wishlist, care badges

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

window.ProductCard = ProductCard;
