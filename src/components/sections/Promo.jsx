// Countdown promo banner section

const DC_DATA = window.OASIS_DATA;

function Promo() {
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

window.Promo = Promo;
