/* global React, BINS, BinSVG, HazardStrip */
// screen-hud.jsx — Tela 05: HUD expandido (tab/inventário)

function ScreenHUD() {
  return (
    <div data-screen-label="05 HUD expandido" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--paper-deep)' }}>
      {/* Bg */}
      <div style={{ position: 'absolute', inset: 0,
        background: `
          repeating-linear-gradient(0deg, transparent 0 60px, rgba(28,22,14,0.04) 60px 61px),
          repeating-linear-gradient(90deg, transparent 0 60px, rgba(28,22,14,0.04) 60px 61px),
          var(--paper-deep)
        `,
      }} />

      <Header />

      {/* MAIN 4-PANEL LAYOUT */}
      <div style={{
        position: 'absolute', top: 100, left: 50, right: 50, bottom: 50,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 20,
      }}>
        <BinsPanel />
        <PurityPanel />
        <GoalsPanel />
        <RoboticsPanel />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 76,
      background: 'var(--ink)', color: 'var(--paper)',
      display: 'flex', alignItems: 'center', padding: '0 28px', gap: 20,
      borderBottom: '4px solid var(--hazard)',
    }}>
      <button onClick={() => window.goTo('sector')} style={{
        background: 'transparent', color: 'var(--paper)', border: 'none',
        fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em',
      }}>← VOLTAR AO PÁTIO</button>

      <span style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.2)' }} />
      <div className="f-mono" style={{ fontSize: 13, letterSpacing: '0.12em' }}>SETOR N-01 ▸ HUD COMPLETO</div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        {['Bins','Pureza','Metas','Robôs'].map((t,i)=>(
          <span key={t} className="f-ui" style={{
            background: i === 0 ? 'var(--hazard)' : 'rgba(255,255,255,0.06)',
            color: i === 0 ? 'var(--ink)' : 'rgba(255,255,255,0.65)',
            padding: '6px 14px', borderRadius: 8, fontSize: 13,
            letterSpacing: '0.06em',
          }}>{t}</span>
        ))}
        <span className="chip sm" style={{ background: 'var(--hazard)', color: 'var(--ink)' }}>⏱ 02:14</span>
      </div>
    </div>
  );
}

function Panel({ kicker, title, children, accent = 'var(--paper)', dark = false }) {
  return (
    <div style={{
      background: dark ? 'var(--ink)' : 'var(--card)',
      color: dark ? 'var(--paper)' : 'var(--ink)',
      border: '4px solid var(--ink)', borderRadius: 16,
      boxShadow: '0 8px 0 var(--ink)',
      padding: 22, display: 'flex', flexDirection: 'column', minHeight: 0,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{
          background: accent, color: 'var(--ink)',
          fontFamily: 'Nunito', fontWeight: 900, fontSize: 12, letterSpacing: '0.18em',
          padding: '4px 10px', borderRadius: 4, textTransform: 'uppercase',
          border: '2.5px solid var(--ink)',
        }}>{kicker}</span>
        <span className="f-mono" style={{ fontSize: 11, opacity: 0.6 }}>● LIVE</span>
      </div>
      <h2 className="f-display" style={{ fontSize: 30, margin: 0, lineHeight: 1.05 }}>{title}</h2>
      <div style={{ marginTop: 14, flex: 1, minHeight: 0, overflow: 'auto' }}>{children}</div>
    </div>
  );
}

/* ====== BINS PANEL — capacities + materials ====== */
function BinsPanel() {
  const data = [
    { bin: BINS[0], pct: 0.62, items: 124, contam: 2 },
    { bin: BINS[1], pct: 0.38, items: 86, contam: 0 },
    { bin: BINS[2], pct: 0.88, items: 56, contam: 4 },
    { bin: BINS[3], pct: 0.54, items: 71, contam: 1 },
    { bin: BINS[4], pct: 0.20, items: 38, contam: 0 },
  ];
  return (
    <Panel kicker="ATIVO · 5 LIXEIRAS" title="Capacidade & contaminação" accent="var(--hazard)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.map(({ bin, pct, items, contam }) => (
          <div key={bin.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52 }}>
              <BinSVG color={bin.hex} dark={bin.dark} size={52} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span className="f-display" style={{ fontSize: 16, color: 'var(--ink)' }}>{bin.name}</span>
                <span className="f-mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                  {items} itens · {contam > 0 ? <span style={{ color: 'var(--signal)' }}>{contam} contam.</span> : <span style={{ color: 'var(--verde)' }}>limpa</span>}
                </span>
              </div>
              <div className="bar thin">
                <div className="fill" style={{
                  width: `${pct*100}%`,
                  background: pct > 0.85 ? 'var(--signal)' : pct > 0.6 ? 'var(--amarelo)' : 'var(--verde)',
                }} />
              </div>
            </div>
            <button style={{
              background: pct > 0.85 ? 'var(--signal)' : 'var(--paper-deep)',
              color: pct > 0.85 ? '#fff' : 'var(--ink)',
              border: '2.5px solid var(--ink)', borderRadius: 8,
              fontFamily: 'Nunito', fontWeight: 900, fontSize: 11, padding: '6px 10px',
              boxShadow: '0 3px 0 var(--ink)', cursor: 'pointer', letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}>{pct > 0.85 ? 'CHAMAR' : 'COLETAR'}</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ====== PURITY PANEL ====== */
function PurityPanel() {
  return (
    <Panel kicker="PUREZA GERAL" title="Qualidade da separação" accent="#d6f5d6" dark>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <svg viewBox="0 0 120 120" width="140" height="140">
          <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.12)" strokeWidth="12" fill="none" />
          <circle cx="60" cy="60" r="50" stroke="var(--verde)" strokeWidth="12" fill="none"
                  strokeDasharray={`${314*0.87} 314`} strokeLinecap="round" transform="rotate(-90 60 60)" />
          <text x="60" y="60" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="34" fill="var(--paper)">87%</text>
          <text x="60" y="80" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="11" fill="var(--hazard)">PUREZA</text>
        </svg>
        <div style={{ flex: 1 }}>
          <Stat l="ACERTOS" v="412" c="var(--verde)" />
          <Stat l="ERROS" v="61" c="var(--signal)" />
          <Stat l="STREAK ATUAL" v="× 6" c="var(--hazard)" />
          <Stat l="MELHOR STREAK" v="× 14" c="var(--paper-edge)" />
        </div>
      </div>

      {/* Sparkline-ish purity trend */}
      <div style={{ marginTop: 16 }}>
        <div className="f-mono" style={{ fontSize: 11, color: 'var(--hazard)', marginBottom: 6, letterSpacing: '0.1em' }}>
          ULTIMOS 60s ────────────
        </div>
        <svg viewBox="0 0 400 60" width="100%" height="60" style={{ display: 'block' }}>
          <path d="M 0 40 L 30 35 L 60 38 L 90 28 L 120 32 L 150 20 L 180 25 L 210 18 L 240 22 L 270 14 L 300 18 L 330 10 L 360 14 L 400 8"
                fill="none" stroke="var(--verde)" strokeWidth="3" strokeLinejoin="round" />
          <line x1="0" y1="48" x2="400" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
    </Panel>
  );
}

/* ====== GOALS PANEL ====== */
function GoalsPanel() {
  const goals = [
    { l: 'Tonelagem do setor', cur: '8.4k / 12k t', pct: 0.7, c: 'fill-blue' },
    { l: 'Acertar 500 papéis', cur: '342 / 500', pct: 0.68, c: 'fill-blue' },
    { l: 'Pureza ≥ 85%', cur: '87%', pct: 0.87, c: 'fill-green', done: false },
    { l: 'Zerar contaminação vidro', cur: '4 restantes', pct: 0.36, c: 'fill-red' },
  ];
  return (
    <Panel kicker="META DA FASE" title="Você está no caminho" accent="var(--hazard)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {goals.map((g, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <span className="f-ui" style={{ fontSize: 14, color: 'var(--ink)' }}>
                {g.done ? <span style={{ color: 'var(--verde)' }}>✓ </span> : ''}{g.l}
              </span>
              <span className="f-mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{g.cur}</span>
            </div>
            <div className={"bar " + g.c}>
              <div className="fill" style={{ width: `${Math.min(g.pct*100, 100)}%` }} />
            </div>
          </div>
        ))}
        <div style={{
          marginTop: 6, padding: 12,
          background: 'var(--paper-deep)', border: '3px dashed var(--ink)', borderRadius: 10,
        }}>
          <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.1em' }}>★ BÔNUS</div>
          <div className="f-display" style={{ fontSize: 18, color: 'var(--ink)', marginTop: 2 }}>
            Sem erros nas próximas 30 jogadas → +200 cr
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ====== ROBOTICS PANEL ====== */
function RoboticsPanel() {
  const bots = [
    { n: 'COL-01', kind: 'Coletor',  s: 'ativo', battery: 0.82, color: '#f0b315' },
    { n: 'CLS-02', kind: 'Classificador', s: 'ativo', battery: 0.46, color: '#3a8de0' },
    { n: 'DRN-01', kind: 'Drone scanner', s: 'ativo', battery: 0.68, color: '#9c5fd0' },
    { n: 'CMP-01', kind: 'Compactador', s: 'manutenção', battery: 0.0, color: '#d23636' },
  ];
  return (
    <Panel kicker="FROTA" title="4 robôs no pátio" accent="#d2eaff" dark>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {bots.map(b => (
          <div key={b.n} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 10,
            border: '2px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8, background: b.color,
              border: '3px solid var(--paper)', display: 'grid', placeItems: 'center',
              fontSize: 24,
            }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="f-display" style={{ fontSize: 17 }}>{b.kind}</span>
                <span className="f-mono" style={{ fontSize: 11, opacity: 0.7 }}>{b.n}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span className={"dot-led " + (b.s === 'ativo' ? '' : 'red')} />
                <span className="f-ui" style={{ fontSize: 12, opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {b.s}
                </span>
                <span style={{ flex: 1, marginLeft: 8 }}>
                  <div className="bar thin" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="fill" style={{
                      width: `${b.battery*100}%`,
                      background: b.battery > 0.5 ? 'var(--verde)' : b.battery > 0.2 ? 'var(--amarelo)' : 'var(--signal)',
                    }} />
                  </div>
                </span>
                <span className="f-mono" style={{ fontSize: 11, opacity: 0.7 }}>{Math.round(b.battery*100)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn hazard" style={{ marginTop: 14, width: '100%' }}
              onClick={() => window.goTo('automation')}>
        🛠 PAINEL DE AUTOMAÇÃO
      </button>
    </Panel>
  );
}

function Stat({ l, v, c }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 0', borderBottom: '1.5px dashed rgba(255,255,255,0.12)' }}>
      <span className="f-mono" style={{ fontSize: 11, letterSpacing: '0.1em', opacity: 0.8 }}>{l}</span>
      <span className="f-display" style={{ fontSize: 22, color: c }}>{v}</span>
    </div>
  );
}

window.ScreenHUD = ScreenHUD;
