/* global React, BINS, BinSVG, RecycleSymbol, Stars */
// screen-quiz.jsx — Tela 08: Carta educativa / quiz

const { useState: useState_quiz } = React;

const Q = {
  num: 7, total: 12,
  kicker: 'CARTA DO CATADOR',
  title: 'Latinha amassada e suja de refrigerante: qual lixeira?',
  body: 'O alumínio é reciclável centenas de vezes, mas resíduo orgânico contamina o fardo. Pense antes de soltar.',
  options: [
    { id: 'azul', bin: 'azul', label: 'AZUL · Papel', correct: false },
    { id: 'amarelo', bin: 'amarelo', label: 'AMARELA · Metal', correct: true, note: 'A latinha pode estar suja — uma pequena enxaguada em casa preserva o fardo.' },
    { id: 'vermelho', bin: 'vermelho', label: 'VERMELHA · Plástico', correct: false },
    { id: 'cinza', bin: 'cinza', label: 'CINZA · Rejeito', correct: false },
  ],
  reward: { credits: 80, eco: 4, xp: 25 },
};

function ScreenQuiz() {
  const [pick, setPick] = useState_quiz(null);
  const answered = pick !== null;
  const opt = answered ? Q.options.find(o => o.id === pick) : null;
  const correct = opt?.correct;

  return (
    <div data-screen-label="08 Carta educativa" style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* gradient bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(255, 224, 153, 0.7) 0%, transparent 60%),
          linear-gradient(180deg, var(--paper) 0%, var(--paper-deep) 100%)
        `,
      }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent 0 30px, rgba(28,22,14,0.025) 30px 31px)',
      }} />

      {/* Top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 18,
      }}>
        <button onClick={() => window.goTo('sector')} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em' }}>← VOLTAR</button>
        <span style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.2)' }} />
        <div className="f-mono" style={{ fontSize: 13, letterSpacing: '0.12em' }}>
          BÔNUS PEDAGÓGICO · CARTA {Q.num} DE {Q.total}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {Array.from({length: Q.total}).map((_,i)=>(
            <span key={i} style={{
              width: 18, height: 8, borderRadius: 2,
              background: i < Q.num-1 ? 'var(--verde)' : i === Q.num-1 ? 'var(--hazard)' : 'rgba(255,255,255,0.15)',
            }} />
          ))}
        </div>
      </div>

      {/* CARD */}
      <div style={{
        position: 'absolute', top: 96, left: '50%', transform: 'translateX(-50%)',
        width: 1200, height: 920,
        background: 'var(--card)', border: '5px solid var(--ink)', borderRadius: 28,
        boxShadow: '0 14px 0 var(--ink), 0 30px 80px rgba(0,0,0,0.3)',
        padding: '36px 50px', position: 'absolute',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Tape */}
        <span className="tape" style={{ width: 140, height: 30, top: -16 }} />

        {/* Stamp */}
        <div style={{
          position: 'absolute', top: 30, right: 40,
          width: 130, height: 130, borderRadius: '50%',
          border: '4px solid var(--signal)',
          color: 'var(--signal)', fontFamily: 'Nunito', fontWeight: 900,
          display: 'grid', placeItems: 'center',
          transform: 'rotate(-14deg)', opacity: 0.85,
          fontSize: 14, letterSpacing: '0.1em', textAlign: 'center', lineHeight: 1.1,
          background: 'rgba(255,255,255,0.6)',
        }}>
          CARTA<br/>EDUCATIVA<br/>#{String(Q.num).padStart(2,'0')}
        </div>

        {/* Header */}
        <div>
          <span className="kicker hazard">{Q.kicker}</span>
          <h1 className="f-display" style={{ fontSize: 60, lineHeight: 1.02, margin: '14px 0 8px', maxWidth: 980 }}>
            {Q.title}
          </h1>
          <p className="f-serif" style={{ fontSize: 26, color: 'var(--ink-soft)', maxWidth: 920, lineHeight: 1.3, margin: 0 }}>
            {Q.body}
          </p>
        </div>

        {/* Big item */}
        <div style={{ position: 'absolute', top: 40, left: 40, opacity: 0.16, pointerEvents: 'none', transform: 'rotate(-8deg)' }}>
          <RecycleSymbol size={300} color="var(--ink)" />
        </div>

        {/* Options grid */}
        <div style={{
          marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
          flex: 1, alignContent: 'start',
        }}>
          {Q.options.map((o, i) => {
            const b = BINS.find(x => x.id === o.bin);
            const isPicked = pick === o.id;
            let state = 'default';
            if (answered) {
              if (o.correct) state = 'right';
              else if (isPicked) state = 'wrong';
              else state = 'fade';
            }
            return (
              <button key={o.id}
                onClick={() => !answered && setPick(o.id)}
                disabled={answered}
                style={{
                  display: 'flex', alignItems: 'center', gap: 18,
                  padding: 16, borderRadius: 16,
                  background: state === 'right' ? '#d6f5d6' : state === 'wrong' ? '#fdd' : 'var(--paper-deep)',
                  border: '4px solid var(--ink)',
                  boxShadow: state === 'default' ? '0 6px 0 var(--ink)' : '0 3px 0 var(--ink)',
                  cursor: answered ? 'default' : 'pointer',
                  opacity: state === 'fade' ? 0.55 : 1,
                  textAlign: 'left',
                  transform: state === 'default' ? 'none' : 'translateY(3px)',
                  transition: 'all .2s',
                  fontFamily: 'inherit',
                  color: 'inherit',
                }}>
                {/* letter chip */}
                <div style={{
                  width: 50, height: 50, borderRadius: 10,
                  background: 'var(--ink)', color: 'var(--paper)',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'Fredoka', fontWeight: 700, fontSize: 28,
                  flexShrink: 0,
                }}>{['A','B','C','D'][i]}</div>
                {/* bin */}
                <BinSVG color={b.hex} dark={b.dark} size={70} />
                {/* label */}
                <div style={{ flex: 1 }}>
                  <div className="f-display" style={{ fontSize: 24, color: 'var(--ink)', lineHeight: 1.1 }}>
                    {o.label}
                  </div>
                  {answered && state === 'right' && (
                    <div className="f-ui" style={{ fontSize: 14, color: 'var(--verde-d)', marginTop: 4 }}>
                      ✓ CORRETO! {o.note}
                    </div>
                  )}
                  {answered && state === 'wrong' && (
                    <div className="f-ui" style={{ fontSize: 14, color: 'var(--vermelho-d)', marginTop: 4 }}>
                      ✗ Quase! Veja a explicação ao lado.
                    </div>
                  )}
                </div>
                {/* indicator */}
                {state === 'right' && <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--verde)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 24, border: '3px solid var(--ink)' }}>✓</div>}
                {state === 'wrong' && <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--signal)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 24, border: '3px solid var(--ink)' }}>✗</div>}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 24, paddingTop: 18, borderTop: '3px dashed var(--paper-edge)',
          display: 'flex', alignItems: 'center', gap: 20,
        }}>
          <div style={{ flex: 1 }}>
            <div className="f-mono" style={{ fontSize: 12, color: 'var(--ink-soft)', letterSpacing: '0.12em' }}>
              ACERTANDO VOCÊ GANHA
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <span className="chip credit">💰 +{Q.reward.credits} cr</span>
              <span className="chip eco">🌱 +{Q.reward.eco} eco</span>
              <span className="chip sm" style={{ background: '#ffe2a8' }}>⚡ +{Q.reward.xp} XP</span>
            </div>
          </div>
          {!answered ? (
            <div className="f-serif" style={{ fontSize: 18, color: 'var(--ink-soft)' }}>
              Escolha uma das 4 lixeiras acima.
            </div>
          ) : (
            <button className="btn big" onClick={() => window.goTo('sector')}>
              {correct ? 'CONTINUAR' : 'TENTAR DE NOVO →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

window.ScreenQuiz = ScreenQuiz;
