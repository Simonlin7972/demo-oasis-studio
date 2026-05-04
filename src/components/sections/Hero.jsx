// Hero carousel section

const DC_DATA = window.OASIS_DATA;

function Hero() {
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

window.Hero = Hero;
