/* global React, BinSVG, BINS, Sun, Cloud, HazardStrip, TrashMountainSVG, CollectorBotSVG, DroneSVG, ConveyorSVG, RecycleSymbol */
// screen-menu.jsx — Tela 01: Menu principal / Título

function ScreenMenu() {
  return (
    <div data-screen-label="01 Menu principal" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Sky */}
      <div className="sky-bg" />
      <Sun top={70} right={140} size={140} />
      <Cloud top={120} left={180} scale={1.3} />
      <Cloud top={70} right={420} scale={1.6} />
      <Cloud top={210} left={620} scale={1} />
      <Cloud top={180} right={180} scale={0.9} />

      {/* Bird */}
      <svg style={{ position: 'absolute', top: 260, left: 1300 }} width="40" height="20" viewBox="0 0 40 20">
        <path d="M 2 12 Q 10 2, 18 10 Q 26 2, 38 12" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Ground / pátio */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 280,
        background: 'linear-gradient(180deg, #b89564 0%, #8a6a3e 60%, #6a4d2a 100%)',
        borderTop: '6px solid var(--ink)',
      }}>
        {/* hazard tape */}
        <div style={{ position: 'absolute', top: -22, left: 0, right: 0 }}>
          <HazardStrip height={16} />
        </div>
        {/* ruler marks */}
        {Array.from({length: 24}).map((_,i)=>(
          <div key={i} style={{
            position: 'absolute', bottom: 0, left: 40 + i*80, width: 4, height: 14,
            background: 'rgba(0,0,0,0.25)', borderRadius: 2,
          }} />
        ))}
        {/* sign "SETOR 01" */}
        <div style={{
          position: 'absolute', bottom: 30, left: 100,
          transform: 'rotate(-4deg)',
          background: 'var(--paper)', border: '4px solid var(--ink)', borderRadius: 8,
          padding: '10px 20px', boxShadow: '0 8px 0 var(--ink)',
        }}>
          <div className="f-mono" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>PÁTIO ▸ N-01</div>
          <div className="f-display" style={{ fontSize: 26, color: 'var(--ink)' }}>CLEAR ZONE</div>
        </div>
      </div>

      {/* Trash mountain decor */}
      <div style={{ position: 'absolute', bottom: 110, left: -40 }}>
        <TrashMountainSVG width={1100} height={300} />
      </div>

      {/* Coletor robô */}
      <div style={{ position: 'absolute', bottom: 130, right: 220 }} className="float slow">
        <CollectorBotSVG size={160} color="#f0b315" />
      </div>
      <div style={{ position: 'absolute', bottom: 280, right: 320 }} className="float">
        <DroneSVG size={130} />
      </div>

      {/* Big bin in foreground */}
      <div style={{ position: 'absolute', bottom: 60, right: 60 }}>
        <BinSVG color={BINS[2].hex} dark={BINS[2].dark} size={180} lidOpen />
      </div>

      {/* Title block */}
      <div style={{ position: 'absolute', top: 110, left: 110, maxWidth: 880 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <span className="kicker hazard">JOGO EDUCATIVO</span>
          <span className="kicker steel">MISSÃO DO GOVERNO</span>
        </div>
        <h1 className="f-display outline-text" style={{
          fontSize: 156, lineHeight: 0.92, margin: 0,
          fontWeight: 700,
        }}>
          LIMPA<br/>LIXÃO!
        </h1>
        <div className="f-serif" style={{
          fontSize: 36, color: 'var(--ink)', marginTop: 14, lineHeight: 1.15,
          maxWidth: 680,
        }}>
          100.000 toneladas. Você, alguns robôs <br/> e uma terra para devolver.
        </div>

        {/* Tonelagem dial */}
        <div style={{
          marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 14,
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '10px 18px', borderRadius: 10,
          fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 16, letterSpacing: '0.06em',
        }}>
          <span style={{ color: 'var(--hazard)' }}>● REC</span>
          <span>SAFRA #001</span>
          <span style={{ opacity: 0.5 }}>│</span>
          <span>v 0.4 (beta escola)</span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ position: 'absolute', left: 110, top: 720, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button className="btn huge" onClick={() => window.goTo('map')}>
          ▶ JOGAR CAMPANHA
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn big paper" onClick={() => window.goTo('tutorial')}>📘 TUTORIAL</button>
          <button className="btn big steel" onClick={() => window.goTo('school')}>🎓 MODO ESCOLA</button>
          <button className="btn big ghost" onClick={() => window.goTo('shop')}>⚙ OFICINA</button>
        </div>
      </div>

      {/* Side card — perfil */}
      <div style={{
        position: 'absolute', top: 140, right: 60, width: 360,
        transform: 'rotate(2deg)',
      }}>
        <div className="paper-card" style={{ padding: 22 }}>
          <span className="tape tl" />
          <span className="tape tr" />
          <div className="f-mono" style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.12em' }}>
            CARTEIRA DO OPERADOR
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#ffe2a8', border: '4px solid var(--ink)', boxShadow: '0 4px 0 var(--ink)',
              display: 'grid', placeItems: 'center', fontSize: 34
            }}>👷</div>
            <div>
              <div className="f-display" style={{ fontSize: 24, lineHeight: 1 }}>Lucas B.</div>
              <div className="f-ui" style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Estagiário · Nv. 4</div>
            </div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Row label="Tons limpas" value="2.460 / 100k" />
            <Row label="Pureza média" value="87%" />
            <Row label="Estrelas" value="★★ 7 / 30" />
            <Row label="Robôs" value="4 ativos" />
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '2px dashed var(--paper-edge)', display:'flex', justifyContent:'space-between' }}>
            <span className="chip credit sm">💰 4 280 cr</span>
            <span className="chip eco sm">🌱 132 eco</span>
          </div>
        </div>
      </div>

      {/* Bottom strip footer */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 28,
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', gap: 20, padding: '0 20px',
        fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.08em',
      }}>
        <span>CONAMA 275</span>
        <span style={{ opacity: 0.5 }}>│</span>
        <span>EDUCAÇÃO AMBIENTAL · 6º AO 9º ANO</span>
        <span style={{ opacity: 0.5 }}>│</span>
        <span>EXP. POSITIVA NA NATUREZA</span>
        <span style={{ marginLeft: 'auto', color: 'var(--hazard)' }}>● PRESS [ESC] PARA SAIR</span>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span className="f-ui" style={{ fontSize: 13, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{label}</span>
      <span className="f-display" style={{ fontSize: 18, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  );
}

window.ScreenMenu = ScreenMenu;
