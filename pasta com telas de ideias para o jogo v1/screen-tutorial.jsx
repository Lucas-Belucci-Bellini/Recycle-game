/* global React, BINS, BinSVG, BottleSVG, PaperBallSVG, CanSVG, JarSVG, BananaSVG, CollectorBotSVG, HazardStrip */
// screen-tutorial.jsx — Tela 03: Onboarding

const { useState: useState_tut } = React;

const STEPS = [
  {
    n: 1, kicker: 'COLETOR · CONAMA 275',
    title: 'O Brasil tem 7 cores oficiais.',
    body: 'Cada cor reciclável recebe um tipo de material. Você vai memorizar isso — começa devagar.',
    visual: 'bins',
  },
  {
    n: 2, kicker: 'TOQUE OU ARRASTE',
    title: 'Arraste o lixo para a lixeira certa.',
    body: 'Sem pressa. Acertou? +pontos. Errou? –pureza. A meta é separar com precisão, não com velocidade.',
    visual: 'drag',
  },
  {
    n: 3, kicker: 'CUIDADO',
    title: 'Contaminar custa caro.',
    body: 'Plástico na lixeira de papel estraga a fibra. Vidro quebrado na orgânica fere o catador. Erros pesam mais que acertos.',
    visual: 'oops',
  },
  {
    n: 4, kicker: 'AUTOMAÇÃO',
    title: 'Depois vêm os robôs.',
    body: 'Compre esteiras, drones e classificadores. O que era manual vira pátio automatizado — você fiscaliza.',
    visual: 'robot',
  },
];

function ScreenTutorial() {
  const [i, setI] = useState_tut(1);
  const step = STEPS.find(s => s.n === i);
  return (
    <div data-screen-label="03 Tutorial" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--paper)' }}>
      <div className="sky-bg" style={{ opacity: 0.4 }} />

      {/* Top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 14,
      }}>
        <button onClick={() => window.goTo('menu')} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em' }}>← PULAR</button>
        <div className="f-mono" style={{ fontSize: 13, letterSpacing: '0.12em' }}>
          TREINAMENTO · PASSO {i} DE {STEPS.length}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {STEPS.map(s => (
            <span key={s.n} style={{
              width: 60, height: 6, borderRadius: 3,
              background: s.n <= i ? 'var(--hazard)' : 'rgba(255,255,255,0.18)',
            }} />
          ))}
        </div>
      </div>

      {/* Mascot — robô coletor */}
      <div style={{ position: 'absolute', left: 80, top: 280 }}>
        <CollectorBotSVG size={300} color="#f0b315" />
        {/* speech bubble */}
        <div style={{
          position: 'absolute', left: 280, top: -20, width: 240,
          background: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 14, padding: '10px 14px',
          fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700,
        }}>
          Oi! Eu sou o COLETOR-01. Bora? <br/>
          <span style={{ color: 'var(--hazard)' }}>BLEEP-BLOOP.</span>
          <span style={{
            position: 'absolute', left: -10, top: 18, width: 0, height: 0,
            borderTop: '10px solid transparent', borderBottom: '10px solid transparent',
            borderRight: '14px solid var(--ink)',
          }} />
        </div>
      </div>

      {/* Step content area */}
      <div style={{ position: 'absolute', left: 480, top: 130, right: 80, bottom: 130 }}>
        <span className="kicker hazard">PASSO {String(i).padStart(2, '0')} · {step.kicker}</span>
        <h1 className="f-display" style={{ fontSize: 76, margin: '14px 0 6px', lineHeight: 1.02, maxWidth: 1000 }}>
          {step.title}
        </h1>
        <p className="f-serif" style={{ fontSize: 28, color: 'var(--ink-soft)', maxWidth: 880, lineHeight: 1.3, marginTop: 6 }}>
          {step.body}
        </p>

        {/* Visual block */}
        <div style={{
          marginTop: 30, background: 'var(--card)', border: '4px solid var(--ink)', borderRadius: 18,
          boxShadow: '0 8px 0 var(--ink)', padding: 30, minHeight: 380, position: 'relative',
        }}>
          {step.visual === 'bins' && <VisualBins />}
          {step.visual === 'drag' && <VisualDrag />}
          {step.visual === 'oops' && <VisualOops />}
          {step.visual === 'robot' && <VisualRobot />}
        </div>
      </div>

      {/* Footer nav */}
      <div style={{
        position: 'absolute', left: 480, right: 80, bottom: 30,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button className="btn paper" disabled={i === 1} onClick={() => setI(Math.max(1, i-1))}
                style={{ opacity: i === 1 ? 0.4 : 1 }}>
          ← ANTERIOR
        </button>
        <div className="f-mono" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
          [SPACE] avançar · [ESC] pular
        </div>
        {i < STEPS.length ? (
          <button className="btn big" onClick={() => setI(i+1)}>PRÓXIMO →</button>
        ) : (
          <button className="btn big" onClick={() => window.goTo('sector')}>COMEÇAR! ▶</button>
        )}
      </div>
    </div>
  );
}

function VisualBins() {
  return (
    <div>
      <div className="f-mono" style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 10, letterSpacing: '0.1em' }}>
        ┌─ RESOLUÇÃO CONAMA Nº 275 ─
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-around', padding: '10px 0' }}>
        {BINS.map(b => (
          <div key={b.id} style={{ textAlign: 'center' }}>
            <BinSVG color={b.hex} dark={b.dark} size={80} />
            <div className="f-display" style={{ fontSize: 16, marginTop: 4, color: 'var(--ink)' }}>{b.name}</div>
            <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>{b.pt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualDrag() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '10px 40px' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 140, height: 140, background: 'var(--paper-deep)', border: '4px solid var(--ink)', borderRadius: 14, display: 'grid', placeItems: 'center', boxShadow: '0 6px 0 var(--ink)' }}>
          <BottleSVG size={100} />
        </div>
        <div className="f-ui" style={{ fontSize: 14, marginTop: 8, color: 'var(--ink-soft)' }}>garrafa PET</div>
      </div>
      {/* arrow with dashes */}
      <svg width="300" height="80" viewBox="0 0 300 80">
        <path d="M 10 40 Q 150 -20, 280 40" fill="none" stroke="var(--ink)" strokeWidth="4" strokeDasharray="10 8" />
        <polygon points="270,32 290,40 270,48" fill="var(--ink)" />
        <g transform="translate(150 0)">
          <rect x="-44" y="-2" width="88" height="22" rx="6" fill="var(--hazard)" stroke="var(--ink)" strokeWidth="2.5" />
          <text x="0" y="14" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="13" fill="var(--ink)">ARRASTE!</text>
        </g>
      </svg>
      <div style={{ textAlign: 'center' }}>
        <BinSVG color={BINS[1].hex} dark={BINS[1].dark} size={120} lidOpen />
        <div className="f-display" style={{ fontSize: 16, marginTop: 4, color: 'var(--ink)' }}>VERMELHA · Plástico</div>
      </div>
    </div>
  );
}

function VisualOops() {
  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative' }}>
          <BinSVG color={BINS[0].hex} dark={BINS[0].dark} size={140} lidOpen />
          <div style={{
            position: 'absolute', top: 60, left: 30, transform: 'rotate(-12deg)',
          }}>
            <BottleSVG size={70} />
          </div>
          <div style={{
            position: 'absolute', top: -10, right: -20,
            background: 'var(--signal)', color: '#fff', borderRadius: '50%',
            width: 70, height: 70, display: 'grid', placeItems: 'center',
            border: '4px solid var(--ink)', boxShadow: '0 4px 0 var(--ink)',
            fontFamily: 'Nunito', fontWeight: 900, fontSize: 28,
            transform: 'rotate(8deg)',
          }}>!</div>
        </div>
      </div>
      <div style={{ maxWidth: 480 }}>
        <div className="f-display" style={{ fontSize: 38, lineHeight: 1, color: 'var(--signal)' }}>
          –40 pureza
        </div>
        <div className="f-serif" style={{ fontSize: 20, color: 'var(--ink)', marginTop: 8 }}>
          Plástico contamina a fibra de papel. A lixeira inteira pode ir parar no rejeito.
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <span className="kicker red">3 ERROS = ALERTA</span>
        </div>
      </div>
    </div>
  );
}

function VisualRobot() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
      <CollectorBotSVG size={200} />
      <div style={{ flex: 1 }}>
        <div className="f-display" style={{ fontSize: 30, color: 'var(--ink)' }}>Você começa sozinho.</div>
        <div className="f-serif" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 4 }}>
          Depois vão entrar os robôs. Esteiras, classificadores, drones de inspeção.
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="chip sm" style={{ background: '#ffe2a8' }}>👁️ Drone scanner</span>
          <span className="chip sm" style={{ background: '#d2eaff' }}>🤖 Classificador</span>
          <span className="chip sm" style={{ background: '#d6f5d6' }}>📦 Esteira</span>
          <span className="chip sm" style={{ background: '#ffd2e8' }}>🔧 Compactador</span>
        </div>
      </div>
    </div>
  );
}

window.ScreenTutorial = ScreenTutorial;
