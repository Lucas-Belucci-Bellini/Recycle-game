/* global React, BINS, BinSVG, BottleSVG, PaperBallSVG, CanSVG, JarSVG, BananaSVG, BatterySVG, NewspaperSVG, CupSVG, CollectorBotSVG, DroneSVG, HazardStrip, ConveyorSVG */
// screen-sector.jsx — Tela 04: Setor sendo limpo

function ScreenSector() {
  return (
    <div data-screen-label="04 Setor (vista do pátio)" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Sky w/ smoke */}
      <div className="sky-bg" />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 70%, rgba(80,60,40,0.4) 0%, transparent 60%)' }} />

      {/* Distant hills */}
      <div style={{ position: 'absolute', bottom: 340, left: 0, right: 0, height: 200 }}>
        <svg viewBox="0 0 1920 200" width="1920" height="200" preserveAspectRatio="none">
          <path d="M 0 200 L 0 120 Q 200 60 400 100 Q 600 40 800 90 Q 1000 30 1200 80 Q 1400 50 1600 100 Q 1800 60 1920 90 L 1920 200 Z"
                fill="#6a4d2a" opacity="0.6" />
          <path d="M 0 200 L 0 150 Q 250 100 500 130 Q 750 80 1000 120 Q 1250 90 1500 130 Q 1750 100 1920 130 L 1920 200 Z"
                fill="#5a4426" opacity="0.5" />
        </svg>
      </div>

      {/* Smokestacks (in background) */}
      <div style={{ position: 'absolute', bottom: 420, right: 200 }}>
        <svg viewBox="0 0 200 200" width="160" height="160">
          <rect x="40" y="60" width="22" height="120" fill="#6d6a64" stroke="var(--ink)" strokeWidth="3" />
          <rect x="36" y="56" width="30" height="10" fill="#3a3835" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="50" cy="48" r="10" fill="#9a8a6e" opacity="0.7" />
          <circle cx="58" cy="36" r="12" fill="#9a8a6e" opacity="0.55" />
          <circle cx="48" cy="24" r="14" fill="#9a8a6e" opacity="0.4" />
          <rect x="80" y="80" width="22" height="100" fill="#6d6a64" stroke="var(--ink)" strokeWidth="3" />
          <rect x="76" y="76" width="30" height="10" fill="#3a3835" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="92" cy="68" r="8" fill="#9a8a6e" opacity="0.6" />
          <circle cx="100" cy="58" r="10" fill="#9a8a6e" opacity="0.45" />
        </svg>
      </div>

      {/* Ground */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 380, background: 'linear-gradient(180deg, #a08868 0%, #7a5d3a 60%, #5a4426 100%)', borderTop: '5px solid var(--ink)' }} />
      <div style={{ position: 'absolute', bottom: 376, left: 0, right: 0 }}><HazardStrip height={14} /></div>

      {/* TOP HUD */}
      <TopHud />

      {/* Center pile + items */}
      <div style={{ position: 'absolute', bottom: 260, left: 360 }}>
        <window.TrashMountainSVG width={1000} height={300} />
      </div>

      {/* Items in foreground (clickable concept) */}
      <FgItem x={780} y={680} bin="vermelho"><BottleSVG size={80} /></FgItem>
      <FgItem x={920} y={780} bin="azul"><PaperBallSVG size={80} /></FgItem>
      <FgItem x={1080} y={720} bin="amarelo"><CanSVG size={80} /></FgItem>
      <FgItem x={1250} y={760} bin="verde"><JarSVG size={80} /></FgItem>
      <FgItem x={620} y={760} bin="marrom"><BananaSVG size={75} /></FgItem>
      <FgItem x={1380} y={720} bin="azul"><NewspaperSVG size={80} /></FgItem>
      <FgItem x={500} y={820} bin="laranja"><BatterySVG size={70} /></FgItem>

      {/* Coletor bot in scene */}
      <div style={{ position: 'absolute', bottom: 250, left: 220 }}>
        <CollectorBotSVG size={170} />
      </div>
      {/* Drone overhead */}
      <div style={{ position: 'absolute', top: 200, right: 280 }} className="float">
        <DroneSVG size={130} />
        {/* scan beam */}
        <svg style={{ position: 'absolute', top: 90, left: 10 }} width="160" height="200" viewBox="0 0 160 200">
          <path d="M 50 0 L 110 0 L 160 200 L 0 200 Z" fill="var(--hazard)" opacity="0.18" />
        </svg>
      </div>

      {/* Conveyor strip running across */}
      <div style={{ position: 'absolute', bottom: 70, left: 80, right: 80 }}>
        <ConveyorSVG width={1760} height={48} dir="right" />
      </div>

      {/* Bin row */}
      <div style={{
        position: 'absolute', bottom: 130, left: 80, right: 80,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        {BINS.map((b, idx) => (
          <BinSlot key={b.id} bin={b} pct={[0.6, 0.4, 0.85, 0.55, 0.25, 0.1, 0.7][idx]} active={idx === 1} />
        ))}
      </div>

      {/* Bottom action bar */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 60,
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 18,
        fontFamily: 'JetBrains Mono', fontSize: 13, letterSpacing: '0.06em',
      }}>
        <span style={{ color: 'var(--hazard)' }}>● JOGANDO</span>
        <span>[Q] PAUSAR · [TAB] HUD · [SPACE] LARGAR</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button className="btn ghost" style={{ padding: '6px 16px', fontSize: 12 }} onClick={() => window.goTo('hud')}>📊 HUD COMPLETO</button>
          <button className="btn ghost" style={{ padding: '6px 16px', fontSize: 12 }} onClick={() => window.goTo('automation')}>🤖 AUTOMAÇÃO</button>
          <button className="btn red" style={{ padding: '6px 16px', fontSize: 12 }} onClick={() => window.goTo('result')}>FIM (debug) →</button>
        </span>
      </div>
    </div>
  );
}

function TopHud() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 86,
      background: 'rgba(28,22,14,0.96)', color: 'var(--paper)',
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16,
      borderBottom: '4px solid var(--hazard)',
    }}>
      <button onClick={() => window.goTo('map')} style={{
        background: 'var(--hazard)', color: 'var(--ink)', border: '3px solid var(--ink)', borderRadius: 10,
        fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, padding: '10px 14px', cursor: 'pointer', letterSpacing: '0.06em', boxShadow: '0 4px 0 var(--ink)',
      }}>‖ PAUSA</button>

      <div style={{ marginLeft: 8 }}>
        <div className="f-mono" style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.12em' }}>SETOR N-01 · PÁTIO NORTE</div>
        <div className="f-display" style={{ fontSize: 20, lineHeight: 1 }}>Onda 3 de 5 · 02:14</div>
      </div>

      {/* progress to next wave */}
      <div style={{ flex: 1, maxWidth: 320, marginLeft: 24 }}>
        <div className="f-mono" style={{ fontSize: 10, opacity: 0.7, marginBottom: 4 }}>PRÓXIMA ONDA</div>
        <div className="bar thin" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div className="fill" style={{ width: '64%' }} />
        </div>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* score */}
        <div style={{ textAlign: 'right' }}>
          <div className="f-mono" style={{ fontSize: 10, opacity: 0.7 }}>PONTOS</div>
          <div className="f-display outline-text" style={{ fontSize: 30, lineHeight: 1, WebkitTextStroke: '2px var(--ink)', textShadow: 'none', color: '#fff' }}>1 240</div>
        </div>
        <span className="chip streak sm" style={{ background: '#ffd2e8' }}>🔥 x6</span>
        <span className="chip sm" style={{ background: '#d2eaff' }}>❤️ ❤️ ❤️</span>
        <span className="chip sm" style={{ background: 'var(--hazard)', color: 'var(--ink)' }}>⏱ 02:14</span>
      </div>
    </div>
  );
}

function FgItem({ x, y, bin, children }) {
  const b = BINS.find(b => b.id === bin);
  return (
    <div style={{ position: 'absolute', left: x, top: y, cursor: 'grab' }}>
      <div style={{
        background: 'rgba(255,255,255,0.92)', border: '3px solid var(--ink)', borderRadius: 14,
        padding: 6, boxShadow: '0 5px 0 var(--ink)', position: 'relative',
      }}>
        {children}
        {/* hint dot of color */}
        <span style={{
          position: 'absolute', bottom: -8, right: -8, width: 22, height: 22,
          borderRadius: '50%', background: b.hex, border: '3px solid var(--ink)',
        }} />
      </div>
    </div>
  );
}

function BinSlot({ bin, pct, active }) {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      {active && (
        <div style={{
          position: 'absolute', top: -36, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--hazard)', color: 'var(--ink)', borderRadius: 8, padding: '4px 10px',
          fontFamily: 'Nunito', fontWeight: 900, fontSize: 13, letterSpacing: '0.06em',
          border: '3px solid var(--ink)', boxShadow: '0 3px 0 var(--ink)',
          whiteSpace: 'nowrap',
        }}>
          SOLTAR AQUI ▼
        </div>
      )}
      <div style={{ transform: active ? 'translateY(-6px)' : 'none', transition: 'transform .15s' }}>
        <BinSVG color={bin.hex} dark={bin.dark} size={130} lidOpen={active} />
      </div>
      {/* capacity bar */}
      <div style={{ marginTop: 4, width: 110 }}>
        <div className="bar thin" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="fill" style={{
            width: `${pct*100}%`,
            background: pct > 0.85 ? 'var(--signal)' : pct > 0.6 ? 'var(--amarelo)' : 'var(--verde)',
          }} />
        </div>
        <div className="f-mono" style={{ fontSize: 11, color: '#fff', marginTop: 2, textShadow: '0 2px 0 var(--ink)' }}>
          {Math.round(pct*100)}%
        </div>
      </div>
    </div>
  );
}

window.ScreenSector = ScreenSector;
