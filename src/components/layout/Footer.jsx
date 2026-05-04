// Site footer

function Footer() {
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

window.Footer = Footer;
