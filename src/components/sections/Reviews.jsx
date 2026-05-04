// Customer review carousel section

const DC_DATA = window.OASIS_DATA;

function Reviews() {
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

window.Reviews = Reviews;
