/* global React, Stars, PracaIcon, HazardStrip */
// screen-result.jsx — Tela 09: Fim de fase

const { useEffect: useEffect_res, useState: useState_res } = React;

function ScreenResult() {
  const [shown, setShown] = useState_res(false);
  useEffect_res(() => { const t = setTimeout(() => setShown(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div data-screen-label="09 Fim de fase" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Sky pos-restauração */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 0%, #fff7d6 0%, #ffe2a8 30%, #97c8ee 80%, #6ab0d8 100%)
        `,
      }} />
      {/* sun rays */}
      <div style={{
        position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
        width: 1200, height: 1200,
        background: 'conic-gradient(from 200deg, transparent 0deg, rgba(255,220,120,0.35) 8deg, transparent 16deg, transparent 30deg, rgba(255,220,120,0.35) 38deg, transparent 46deg, transparent 60deg, rgba(255,220,120,0.35) 68deg, transparent 76deg, transparent 90deg, rgba(255,220,120,0.35) 98deg, transparent 106deg, transparent 360deg)',
        opacity: 0.6,
      }} />

      {/* Ground — grama nova */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 280,
        background: 'linear-gradient(180deg, #7ec850 0%, #4a8a3a 60%, #2f6b22 100%)',
        borderTop: '6px solid var(--ink)',
      }}>
        <div style={{ position: 'absolute', top: -22, left: 0, right: 0 }}>
          <HazardStrip height={16} />
        </div>
        {/* flowers */}
        {[180,360,520,1340,1500,1700].map(x => (
          <div key={x} style={{ position: 'absolute', bottom: 30, left: x }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <rect x="18" y="20" width="4" height="18" fill="#4a8a3a" />
              <circle cx="20" cy="18" r="9" fill="#ffba2e" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="20" cy="18" r="4" fill="#e94e9b" stroke="var(--ink)" strokeWidth="1.5" />
            </svg>
          </div>
        ))}
      </div>

      {/* The "rebuild" — praça */}
      <div style={{ position: 'absolute', bottom: 200, right: 200, transform: shown ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)', opacity: shown ? 1 : 0, transition: 'all 1s cubic-bezier(.3,1.4,.4,1)' }}>
        <svg viewBox="0 0 400 320" width="400" height="320">
          {/* praça base */}
          <rect x="40" y="240" width="320" height="60" rx="6" fill="#c9a878" stroke="var(--ink)" strokeWidth="4" />
          <rect x="40" y="240" width="320" height="14" fill="#8a6a3e" />
          {/* bench */}
          <g transform="translate(100 220)">
            <rect x="-40" y="0" width="80" height="6" fill="#8a6a3e" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x="-36" y="6" width="6" height="20" fill="#8a6a3e" stroke="var(--ink)" strokeWidth="2.5" />
            <rect x="30" y="6" width="6" height="20" fill="#8a6a3e" stroke="var(--ink)" strokeWidth="2.5" />
          </g>
          {/* big tree */}
          <g transform="translate(280 60)">
            <rect x="-10" y="100" width="20" height="80" fill="#6b4523" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="0" cy="80" r="60" fill="#4a8a3a" stroke="var(--ink)" strokeWidth="4" />
            <circle cx="-30" cy="60" r="22" fill="#6ab04a" />
            <circle cx="20" cy="50" r="20" fill="#6ab04a" />
            <circle cx="0" cy="40" r="20" fill="#6ab04a" />
          </g>
          {/* small tree */}
          <g transform="translate(180 140)">
            <rect x="-6" y="60" width="12" height="50" fill="#6b4523" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="0" cy="50" r="36" fill="#4a8a3a" stroke="var(--ink)" strokeWidth="3" />
          </g>
          {/* bin (good citizens use it!) */}
          <g transform="translate(70 196) scale(0.4)">
            <rect x="-30" y="0" width="60" height="80" rx="6" fill="#2f8f3f" stroke="var(--ink)" strokeWidth="5" />
            <rect x="-34" y="-8" width="68" height="12" rx="3" fill="#1f6428" stroke="var(--ink)" strokeWidth="5" />
            <circle cx="0" cy="40" r="14" fill="#fff" stroke="var(--ink)" strokeWidth="3" />
          </g>
        </svg>
      </div>

      {/* Confetti */}
      {shown && Array.from({length: 30}).map((_,i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + (i * 5.3) % 90}%`,
          top: -20,
          width: 12, height: 18,
          background: ['#ffba2e','#d23636','#3a8de0','#2f8f3f','#e94e9b','#9c5fd0'][i%6],
          border: '2px solid var(--ink)',
          transform: `rotate(${i * 23}deg)`,
          animation: `confettiFall ${3 + (i%4)*0.5}s ${i*0.07}s linear forwards`,
        }} />
      ))}
      <style>{`@keyframes confettiFall { to { transform: translateY(1200px) rotate(720deg); } }`}</style>

      {/* HEADER */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center' }}>
        <span className="kicker hazard" style={{ fontSize: 16 }}>SETOR N-01 · PÁTIO NORTE · LIMPO!</span>
        <h1 className="f-display outline-text" style={{ fontSize: 132, margin: '14px 0 0', lineHeight: 1, fontWeight: 700 }}>
          SETOR LIMPO!
        </h1>
      </div>

      {/* RESULT CARD */}
      <div style={{
        position: 'absolute', top: 300, left: 80, width: 720,
        background: 'var(--card)', border: '5px solid var(--ink)', borderRadius: 22,
        boxShadow: '0 14px 0 var(--ink)', padding: 36,
        transform: shown ? 'translateY(0) rotate(-1deg)' : 'translateY(60px) rotate(-1deg)',
        opacity: shown ? 1 : 0, transition: 'all .8s cubic-bezier(.3,1.4,.4,1) 0.2s',
      }}>
        <span className="tape" />
        <div className="f-mono" style={{ fontSize: 13, color: 'var(--ink-soft)', letterSpacing: '0.12em' }}>RELATÓRIO DO TURNO</div>
        <h2 className="f-display" style={{ fontSize: 44, margin: '4px 0 14px', lineHeight: 1 }}>Você entregou: 12 000 t</h2>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <Stars count={2} total={3} size={72} />
          <div style={{ flex: 1 }}>
            <div className="f-display" style={{ fontSize: 28, color: 'var(--ink)' }}>2 de 3 estrelas</div>
            <div className="f-ui" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
              ↑ Pureza ≥ 90 % desbloqueia a 3ª estrela
            </div>
          </div>
        </div>

        {/* Stats rows */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <StatBig icon="📊" l="Pureza" v="87%" sub="meta: 85%" good />
          <StatBig icon="🎯" l="Acertos" v="412 / 473" sub="streak máx. ×14" />
          <StatBig icon="⏱" l="Tempo" v="08:42" sub="par: 09:00" good />
          <StatBig icon="🚛" l="Caminhões" v="8 cheios" sub="zero rejeito" good />
        </div>
      </div>

      {/* REWARD CARD */}
      <div style={{
        position: 'absolute', top: 300, left: 820, width: 460,
        background: 'var(--ink)', color: 'var(--paper)',
        border: '5px solid var(--ink)', borderRadius: 22,
        boxShadow: '0 14px 0 rgba(0,0,0,0.4)', padding: 30,
        transform: shown ? 'translateY(0) rotate(1.5deg)' : 'translateY(60px) rotate(1.5deg)',
        opacity: shown ? 1 : 0, transition: 'all .8s cubic-bezier(.3,1.4,.4,1) 0.4s',
      }}>
        <div className="f-mono" style={{ fontSize: 12, color: 'var(--hazard)', letterSpacing: '0.12em' }}>
          GOVERNO INVESTE NO TERRENO
        </div>
        <h3 className="f-display" style={{ fontSize: 32, margin: '6px 0 12px', lineHeight: 1.05 }}>
          Praça do Bairro<br/><span style={{ color: 'var(--hazard)' }}>foi construída</span>
        </h3>
        <div style={{
          background: '#fffaea', borderRadius: 14, padding: 16, color: 'var(--ink)',
          display: 'flex', alignItems: 'center', gap: 14, border: '3px solid var(--paper-edge)',
        }}>
          <PracaIcon size={80} />
          <div>
            <div className="f-display" style={{ fontSize: 20 }}>+ 1 prédio público</div>
            <div className="f-ui" style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
              Visível para sempre no mapa
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 16, paddingTop: 14, borderTop: '2px dashed rgba(255,255,255,0.2)',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          <RewardChip icon="💰" v="+ 800" l="créditos" />
          <RewardChip icon="🌱" v="+ 25"  l="eco-pts" />
          <RewardChip icon="⚡" v="+ 150" l="XP (Nv 5)" />
          <RewardChip icon="🤖" v="MK-II" l="desbloqueado" />
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 16,
      }}>
        <button className="btn big paper" onClick={() => window.goTo('result')}>↻ REPETIR</button>
        <button className="btn huge" onClick={() => window.goTo('map')}>PRÓXIMO SETOR →</button>
        <button className="btn big steel" onClick={() => window.goTo('shop')}>🛠 OFICINA</button>
      </div>
    </div>
  );
}

function StatBig({ icon, l, v, sub, good }) {
  return (
    <div style={{
      background: 'var(--paper-deep)', border: '3px solid var(--ink)', borderRadius: 12,
      padding: 12,
    }}>
      <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>
        {icon} {l.toUpperCase()}
      </div>
      <div className="f-display" style={{ fontSize: 28, color: good ? 'var(--verde-d)' : 'var(--ink)', lineHeight: 1.1 }}>{v}</div>
      <div className="f-ui" style={{ fontSize: 11, color: 'var(--ink-mid)' }}>{sub}</div>
    </div>
  );
}

function RewardChip({ icon, v, l }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 8,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    }}>
      <span className="f-mono" style={{ fontSize: 11, color: 'var(--hazard)', letterSpacing: '0.08em' }}>{icon} {l.toUpperCase()}</span>
      <span className="f-display" style={{ fontSize: 22, color: 'var(--paper)', lineHeight: 1.1 }}>{v}</span>
    </div>
  );
}

window.ScreenResult = ScreenResult;
