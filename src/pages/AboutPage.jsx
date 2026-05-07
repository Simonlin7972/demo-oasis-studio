// About page

const DC_DATA = window.OASIS_DATA;

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
      <Nav onHome={onHome} onNavigate={onNavigate} cartCount={cartCount} onCart={onCart} activePage="about" />

      {/* Hero */}
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

      {/* Brand Statement */}
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

      {/* Values */}
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

      {/* Timeline */}
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

      {/* Team */}
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

      {/* CTA */}
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

      <Footer />
    </>
  );
}

window.AboutPage = AboutPage;
