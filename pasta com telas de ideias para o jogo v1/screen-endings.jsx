/* global React, TrashMountainSVG, PracaIcon, HortaIcon, UsinaIcon, EcoparkIcon, Stars, HazardStrip, RecycleSymbol */
// screen-endings.jsx — Tela 15: Os Três Finais
//
// Fecha o arco da progressão. As escolhas do jogador (vender / construir /
// restaurar) somam num medidor invisível ao longo da campanha. No fim, esse
// medidor define qual dos três epílogos você assiste. Aqui mostramos os três
// lado a lado — o mesmo terreno, três futuros — com o Segunda Chance como
// o final canônico.

const { useState: useStateEnd } = React;

const ENDINGS = [
  {
    id: 'extrativista',
    tag: 'FINAL A · EXTRATIVISTA',
    title: 'O LIXÃO QUE VIROU CIDADE',
    color: '#c9442e',
    sky: 'linear-gradient(180deg, #6b4a3a 0%, #a8744a 45%, #d49a5a 100%)',
    verdict: 'Você ficou rico. O bairro, não.',
    body: 'Vendeu tudo bruto, rápido, sem processar. O capital encheu seu cofre — mas a montanha nunca parou de crescer. Hoje a vizinhança respira chorume e ninguém quer morar a 2 km do aterro.',
    metrics: [
      { l: 'Capital final',   v: '284 k cr', good: true },
      { l: 'Eco-score',       v: '12 pts',   good: false },
      { l: 'Terra devolvida', v: '0 ha',     good: false },
      { l: 'Bairro',          v: 'abandonado', good: false },
    ],
    scene: 'lixao',
    foot: 'Desbloqueado se você vender > 70% do lixo bruto.',
  },
  {
    id: 'equilibrado',
    tag: 'FINAL B · EQUILIBRADO',
    title: 'O BAIRRO QUE SE VIROU',
    color: '#3a5a7a',
    sky: 'linear-gradient(180deg, #88a8c8 0%, #b8d0e0 55%, #d8e8e0 100%)',
    verdict: 'Deu pra viver. Deu pra melhorar.',
    body: 'Reciclou o que valia, vendeu o resto e usou o material pra construir. A praça saiu, a horta saiu, a usininha saiu. Não é paraíso — mas é um lugar de gente, com obra que durou.',
    metrics: [
      { l: 'Capital final',   v: '96 k cr',  good: true },
      { l: 'Eco-score',       v: '184 pts',  good: true },
      { l: 'Terra devolvida', v: '14 ha',    good: true },
      { l: 'Bairro',          v: 'reformado', good: true },
    ],
    scene: 'praca',
    foot: 'Desbloqueado com mix equilibrado de vender + construir.',
  },
  {
    id: 'segunda-chance',
    tag: 'FINAL C · SEGUNDA CHANCE',
    title: 'A TERRA QUE VOLTOU',
    color: '#2f8f3f',
    sky: 'radial-gradient(ellipse at 50% 0%, #fff7d6 0%, #ffe2a8 28%, #a8d8ee 75%, #7ec0d8 100%)',
    verdict: 'Você devolveu mais do que tirou.',
    body: 'Cada tonelada virou solo, biogás, floresta. O aterro fechou e no lugar nasceu mata, lago e escola. Você abriu mão do lucro fácil — e ganhou um lugar onde as crianças brincam onde antes era veneno.',
    metrics: [
      { l: 'Capital final',   v: '38 k cr',  good: null },
      { l: 'Eco-score',       v: '920 pts',  good: true },
      { l: 'Terra devolvida', v: '100 ha',   good: true },
      { l: 'Bairro',          v: 'renascido', good: true },
    ],
    scene: 'floresta',
    foot: 'Final canônico. Único que conclui o Projeto Σ 001.',
    canon: true,
  },
];

function ScreenEndings() {
  const [selected, setSelected] = useStateEnd('segunda-chance');
  const sel = ENDINGS.find(e => e.id === selected) || ENDINGS[2];

  return (
    <div data-screen-label="15 Finais do Jogo" style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'var(--ink)',
    }}>
      {/* Big sky backdrop changes with selection */}
      <div style={{ position: 'absolute', inset: 0, background: sel.sky, transition: 'background 0.6s ease' }} />

      {/* subtle vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />

      {/* ===== Title bar ===== */}
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center', zIndex: 3 }}>
        <span className="kicker steel" style={{ fontSize: 15 }}>PROJETO Σ 001 · EPÍLOGO</span>
        <h1 className="f-display outline-text" style={{ fontSize: 86, margin: '10px 0 0', lineHeight: 0.95, fontWeight: 700 }}>
          AS ESCOLHAS DEFINEM
        </h1>
        <div className="f-serif" style={{ fontSize: 20, color: 'var(--ink)', marginTop: 6, opacity: 0.85 }}>
          O mesmo terreno. Três futuros. Qual deles você vai construir?
        </div>
      </div>

      {/* ===== The three ending cards ===== */}
      <div style={{
        position: 'absolute', top: 250, left: 56, right: 56, bottom: 256,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22, zIndex: 3,
      }}>
        {ENDINGS.map(e => (
          <EndingCard key={e.id} e={e} active={e.id === selected} onSelect={() => setSelected(e.id)} />
        ))}
      </div>

      {/* ===== Detail strip (selected ending narrative) ===== */}
      <div style={{
        position: 'absolute', left: 56, right: 56, bottom: 100, height: 132, zIndex: 3,
        background: 'var(--paper)', border: '5px solid var(--ink)', borderRadius: 18,
        boxShadow: '0 10px 0 var(--ink)', padding: '16px 26px',
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 26, alignItems: 'center',
      }}>
        <div style={{
          alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          paddingRight: 24, borderRight: '3px dashed rgba(0,0,0,0.15)',
        }}>
          <span className="f-mono" style={{ fontSize: 11, color: sel.color, letterSpacing: '0.1em', fontWeight: 800 }}>
            {sel.tag}
          </span>
          <span className="f-display" style={{ fontSize: 30, color: 'var(--ink)', lineHeight: 1, marginTop: 4, whiteSpace: 'nowrap' }}>
            {sel.title}
          </span>
        </div>
        <div>
          <div className="f-display" style={{ fontSize: 22, color: sel.color, lineHeight: 1.05 }}>
            "{sel.verdict}"
          </div>
          <div className="f-ui" style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.4, textWrap: 'pretty' }}>
            {sel.body}
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'center', maxWidth: 180 }}>
          {sel.canon
            ? <RecycleSymbol size={64} color={sel.color} />
            : <div style={{ fontSize: 52, opacity: 0.5, lineHeight: 1 }}>{sel.scene === 'lixao' ? '🏚️' : '🏘️'}</div>}
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.3 }}>
            {sel.foot}
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, zIndex: 4,
        background: '#efe5cc', borderTop: '4px solid var(--ink)',
        display: 'flex', alignItems: 'center', padding: '0 40px', gap: 16,
      }}>
        <button className="btn big paper" onClick={() => window.goTo('progression')}>← ÁRVORE DE PROGRESSÃO</button>
        <div className="f-ui" style={{ flex: 1, fontSize: 14, color: 'var(--ink-soft)', textAlign: 'center', lineHeight: 1.3 }}>
          Nenhum final é "game over". Cada safra encerrada abre um <b style={{ color: 'var(--ink)' }}>novo lixão</b> — e a chance de escolher diferente.
        </div>
        <button className="btn big hazard" onClick={() => window.goTo('menu')}>NOVA SAFRA ▸</button>
      </div>
    </div>
  );
}

/* ---- Ending card ---- */
function EndingCard({ e, active, onSelect }) {
  return (
    <button
      onClick={onSelect}
      style={{
        all: 'unset', cursor: 'pointer', position: 'relative',
        background: 'var(--paper)',
        border: `5px solid ${active ? e.color : 'var(--ink)'}`,
        borderRadius: 18, overflow: 'hidden',
        boxShadow: active ? `0 14px 0 ${e.color}` : '0 8px 0 var(--ink)',
        transform: active ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(.3,1.4,.4,1)',
        display: 'flex', flexDirection: 'column',
      }}>
      {/* canon ribbon */}
      {e.canon && (
        <div style={{
          position: 'absolute', top: 14, right: -42, transform: 'rotate(38deg)', zIndex: 5,
          background: e.color, color: '#fff', padding: '4px 50px',
          fontFamily: 'JetBrains Mono', fontWeight: 800, fontSize: 11, letterSpacing: '0.1em',
          border: '2px solid var(--ink)',
        }}>CANÔNICO</div>
      )}

      {/* Scene illustration */}
      <div style={{ height: 170, position: 'relative', overflow: 'hidden', background: e.sky, borderBottom: '4px solid var(--ink)' }}>
        <EndingScene scene={e.scene} color={e.color} />
      </div>

      {/* Card body */}
      <div style={{ padding: '14px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span className="f-mono" style={{ fontSize: 10, color: e.color, letterSpacing: '0.1em', fontWeight: 800 }}>
          {e.tag}
        </span>
        <span className="f-display" style={{ fontSize: 24, color: 'var(--ink)', lineHeight: 1, marginTop: 4 }}>
          {e.title}
        </span>

        {/* verdict line — fills the card, previews the epilogue */}
        <div className="f-serif" style={{ fontSize: 15, color: e.color, marginTop: 8, lineHeight: 1.25, fontStyle: 'italic' }}>
          "{e.verdict}"
        </div>

        {/* metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          {e.metrics.map((m, i) => (
            <div key={i} style={{
              background: 'var(--paper-deep)', border: '2px solid var(--ink)', borderRadius: 9, padding: '6px 10px',
            }}>
              <div className="f-mono" style={{ fontSize: 9.5, color: 'var(--ink-soft)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                {m.l.toUpperCase()}
              </div>
              <div className="f-display" style={{
                fontSize: 19, lineHeight: 1.05,
                color: m.good === true ? 'var(--verde-d, #2f8f3f)' : m.good === false ? '#c9442e' : 'var(--ink)',
              }}>{m.v}</div>
            </div>
          ))}
        </div>

        {/* select hint */}
        <div style={{
          marginTop: 'auto', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            width: 18, height: 18, borderRadius: '50%', border: '3px solid var(--ink)',
            background: active ? e.color : 'transparent', flexShrink: 0,
            display: 'grid', placeItems: 'center',
          }}>
            {active && <span style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>✓</span>}
          </span>
          <span className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.06em' }}>
            {active ? 'EXIBINDO ESTE FINAL' : 'CLIQUE PARA VER'}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ---- Scene illustrations per ending ---- */
function EndingScene({ scene, color }) {
  if (scene === 'lixao') {
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        {/* smoke */}
        <div style={{ position: 'absolute', bottom: 90, left: 60, width: 50, height: 50, borderRadius: '50%', background: 'rgba(60,50,40,0.4)' }} />
        <div style={{ position: 'absolute', bottom: 110, left: 90, width: 40, height: 40, borderRadius: '50%', background: 'rgba(60,50,40,0.3)' }} />
        <div style={{ transform: 'scale(0.62)', transformOrigin: 'bottom center', marginLeft: 6 }}>
          <TrashMountainSVG width={520} height={210} sectorColor="#6b5230" />
        </div>
      </div>
    );
  }
  if (scene === 'praca') {
    return (
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, background: 'linear-gradient(180deg,#9ac86a,#5a8a3a)', borderTop: '3px solid var(--ink)' }}>
        <div style={{ position: 'absolute', bottom: 30, left: 36, display: 'flex', gap: 18, alignItems: 'flex-end' }}>
          <PracaIcon size={66} />
          <HortaIcon size={58} />
          <UsinaIcon size={62} />
        </div>
      </div>
    );
  }
  // floresta — segunda chance
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 110, background: 'linear-gradient(180deg,#7ec850,#3a7a2a)', borderTop: '3px solid var(--ink)' }}>
      {/* sun rays */}
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, background: 'conic-gradient(from 200deg, transparent 0deg, rgba(255,220,120,0.4) 8deg, transparent 16deg, transparent 30deg, rgba(255,220,120,0.4) 38deg, transparent 46deg)', opacity: 0.7 }} />
      <div style={{ position: 'absolute', bottom: 24, left: 24, display: 'flex', gap: 14, alignItems: 'flex-end' }}>
        <EcoparkIcon size={70} />
        <Tree x={0} h={64} />
        <Tree x={0} h={50} />
        <Tree x={0} h={72} />
      </div>
      {/* flowers */}
      {[120, 170, 220].map(x => (
        <div key={x} style={{ position: 'absolute', bottom: 14, left: x }}>
          <svg width="22" height="22" viewBox="0 0 40 40">
            <rect x="18" y="20" width="4" height="18" fill="#3a7a2a" />
            <circle cx="20" cy="18" r="8" fill="#ffba2e" stroke="var(--ink)" strokeWidth="2" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function Tree({ h }) {
  return (
    <svg width={h * 0.7} height={h} viewBox="0 0 50 80" style={{ overflow: 'visible' }}>
      <rect x="21" y="48" width="8" height="30" fill="#6b4523" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="25" cy="36" r="22" fill="#4a9a3a" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="14" cy="28" r="11" fill="#6ab04a" />
      <circle cx="34" cy="24" r="10" fill="#6ab04a" />
    </svg>
  );
}

window.ScreenEndings = ScreenEndings;
