/* global React, BINS, BinSVG, ConveyorSVG, CollectorBotSVG, DroneSVG, RecycleSymbol, HazardStrip, PracaIcon, HortaIcon, UsinaIcon, EcoparkIcon, Stars */
// screen-progression.jsx — Tela 14: Árvore de Progressão "Projeto Segunda Chance"
//
// Sistema central de progressão. Filosofia: a fábrica NÃO existe pra você ficar
// rico — ela existe pra te dar mais opções de escolha sobre o que fazer com
// o lixo. Cada tier desbloqueia um novo dilema. No fim, o "Projeto Segunda
// Chance" é o equivalente do Space Elevator: não exporta nada pra fora,
// devolve a terra pra quem mora nela.

const { useState: useStateProg, useEffect: useEffectProg } = React;

/* =========================================================
   Dados de tiers — a árvore tecnológica
   ========================================================= */
const TIERS = [
  {
    n: 0, title: 'CATADOR', sub: 'Mão na massa',
    status: 'done',
    desc: 'Você no lixão, com luva e gancho. 1 tonelada por hora, no braço.',
    nodes: [
      { name: 'Gancho longo',     ic: '🪝', done: true },
      { name: 'Carrinho de mão',  ic: '🛒', done: true },
      { name: 'Luva grossa',      ic: '🧤', done: true },
    ],
    unlocks: 'Triagem manual em 3 categorias',
    cost: '— (start)',
  },
  {
    n: 1, title: 'TRIAGEM MECÂNICA', sub: 'Esteira da gente',
    status: 'done',
    desc: 'Esteira de bicicleta-reaproveitada, ímã pendurado, peneiras de obra. Já dá 6 t/h.',
    nodes: [
      { name: 'Esteira artesanal', ic: '🔧', done: true },
      { name: 'Ímã p/ metais',      ic: '🧲', done: true },
      { name: 'Peneira 3 níveis',  ic: '⚙️',  done: true },
    ],
    unlocks: 'Robô coletor T1 + fardo de plástico',
    cost: '420 cr · 18 eco',
  },
  {
    n: 2, title: 'RECICLAGEM LIMPA', sub: 'Material vira matéria',
    status: 'now',
    desc: 'Lavagem, picotamento e prensa. Plástico, papel e vidro saem prontos pra vender ou usar.',
    nodes: [
      { name: 'Prensa de fardo',   ic: '📦', done: true },
      { name: 'Triturador PET',    ic: '🔄', done: true },
      { name: 'Lavadora',           ic: '💧', done: false, progress: 0.62 },
      { name: 'Forno de vidro',    ic: '🔥', done: false, progress: 0.18 },
    ],
    unlocks: 'Refundição de metais + plástico-tijolo',
    cost: '1 240 cr · 48 eco',
  },
  {
    n: 3, title: 'TRANSFORMAÇÃO', sub: 'Lixo vira coisa nova',
    status: 'locked',
    desc: 'Fundição de alumínio, extrusão de polímero, papel reciclado. Você cria materiais — não revende.',
    nodes: [
      { name: 'Forno indução',     ic: '🌡️', done: false },
      { name: 'Extrusora',          ic: '🪛', done: false },
      { name: 'Polpa de papel',    ic: '📄', done: false },
      { name: 'Tijolo eco',        ic: '🧱', done: false },
    ],
    unlocks: 'Construção: praça, horta, usina',
    cost: '4 800 cr · 180 eco',
  },
  {
    n: 4, title: 'BIO-FÁBRICA', sub: 'O solo respira',
    status: 'locked',
    desc: 'Compostagem industrial, biogás, bioplástico. A montanha de lixo vira terra preta.',
    nodes: [
      { name: 'Composteira ind.',  ic: '🌱', done: false },
      { name: 'Biodigestor',        ic: '⛽', done: false },
      { name: 'Bioplástico',        ic: '🧪', done: false },
      { name: 'Drenagem chorume',  ic: '🚰', done: false },
    ],
    unlocks: 'Restauração de bioma + ecoparque',
    cost: '14 200 cr · 720 eco',
  },
  {
    n: 5, title: 'PROJETO SEGUNDA CHANCE', sub: 'A entrega final',
    status: 'goal',
    desc: 'Não exporta nada pra fora. Devolve a terra pra quem mora nela: floresta urbana, água potável, escola na área onde antes era aterro.',
    nodes: [
      { name: 'Floresta urbana',   ic: '🌳', done: false },
      { name: 'Lago restaurado',   ic: '🏞️', done: false },
      { name: 'Centro educativo', ic: '🏫', done: false },
      { name: 'Cooperativa',       ic: '🤝', done: false },
    ],
    unlocks: '→ Fim do jogo · safra 002 (novo lixão)',
    cost: '— · 100 000 t processadas',
  },
];

/* =========================================================
   Os 3 caminhos / finais
   ========================================================= */
const PATHS = [
  {
    id: 'lucro',
    title: 'CAMINHO DO LUCRO',
    tag: 'EXTRATIVISTA',
    color: '#f0b315',
    icon: '💰',
    short: 'Vender lixo bruto sem processar. Dinheiro rápido, biome devastado.',
    pros: ['Capital 3× mais rápido', 'Tier 2 em 1h de jogo', 'Sem dependência de eco'],
    cons: ['Bioma colapsa no Ato III', 'Final ruim: lixão expande', 'Não desbloqueia T5'],
    fill: 0.18,
  },
  {
    id: 'construtor',
    title: 'CAMINHO DO CONSTRUTOR',
    tag: 'EQUILIBRADO',
    color: '#3a5a7a',
    icon: '🔧',
    short: 'Reciclar e usar os materiais pra construir coisas no entorno do lixão.',
    pros: ['Praça, horta, usina liberadas', 'Capital médio constante', 'Robôs ganham XP'],
    cons: ['Reciclagem custa eco', 'Progressão mais lenta', 'Final neutro'],
    fill: 0.46,
  },
  {
    id: 'restaurador',
    title: 'CAMINHO DO RESTAURADOR',
    tag: 'SEGUNDA CHANCE',
    color: '#2f8f3f',
    icon: '🌱',
    short: 'Devolver tudo pra terra. Bioma reverte, lixão fecha, cidade muda.',
    pros: ['Único caminho até o T5', 'Final canônico do jogo', 'Eco 5× mais rápido'],
    cons: ['Capital escasso (T2 demora)', 'Decisões mais difíceis', 'Algumas missões trancam'],
    fill: 0.36,
  },
];

/* =========================================================
   Componente principal
   ========================================================= */
function ScreenProgression() {
  // simulação leve do estado atual
  const stats = {
    tons: '8 460',
    capital: '12 340',
    eco: '184',
    humanity: 9, // 0–100 (%)
  };

  return (
    <div data-screen-label="14 Progressao / Segunda Chance" style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: 'var(--paper)',
    }}>
      {/* ===== Header strip ===== */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 96,
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', padding: '0 40px', gap: 24,
        borderBottom: '6px solid #b8830a',
      }}>
        <span className="kicker hazard" style={{ fontSize: 13, flexShrink: 0 }}>PROJETO Σ 001</span>
        <div style={{ flexShrink: 0 }}>
          <div className="f-display" style={{ fontSize: 30, lineHeight: 1, whiteSpace: 'nowrap' }}>SEGUNDA CHANCE</div>
          <div className="f-mono" style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            Árvore de progressão · Sistema de escolha
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, flexWrap: 'nowrap' }}>
          <Metric label="TONS PROCESS." value={stats.tons} of="/ 100k t" color="#f0b315" />
          <Metric label="CAPITAL" value={stats.capital} of="cr" color="#5fc8ff" />
          <Metric label="ECO-SCORE" value={stats.eco} of="pts" color="#7ec850" />
          <Metric label="HUMANIDADE" value={stats.humanity + '%'} of="restaurada" color="#e84444" />
        </div>
      </div>

      {/* ===== HAZARD STRIP under header ===== */}
      <div style={{ position: 'absolute', top: 96, left: 0, right: 0 }}>
        <HazardStrip height={10} />
      </div>

      {/* ===== Main two-column layout ===== */}
      <div style={{
        position: 'absolute', top: 116, left: 0, right: 0, bottom: 90,
        display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 0,
      }}>
        {/* --- Left: Tech tree --- */}
        <div style={{ padding: '16px 22px 16px 30px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
            <span className="kicker steel" style={{ whiteSpace: "nowrap" }}>ÁRVORE TECNOLÓGICA</span>
            <span className="f-mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>6 TIERS · 100 K TONELADAS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
            {/* spine connecting tiers */}
            <div style={{
              position: 'absolute', top: 30, bottom: 30, left: 46, width: 5,
              background: 'repeating-linear-gradient(180deg, var(--ink) 0 12px, transparent 12px 20px)',
              opacity: 0.3,
            }} />
            {TIERS.map(tier => <TierRow key={tier.n} tier={tier} />)}
          </div>
        </div>

        {/* --- Right: filosofia + economic loop + paths --- */}
        <div style={{
          padding: '16px 30px 16px 22px',
          background: 'linear-gradient(180deg, #f0e6cf 0%, #e6d4a3 100%)',
          borderLeft: '6px solid var(--ink)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {/* Filosofia card — agora inline no topo, sem overlay */}
          <div style={{
            background: 'var(--paper)', border: '4px solid var(--ink)', borderRadius: 14,
            boxShadow: '0 4px 0 var(--ink)', padding: '14px 18px',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center',
          }}>
            <div>
              <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-soft)', letterSpacing: '0.12em' }}>
                DOC. INTERNO · DIRETRIZ DO JOGO
              </div>
              <div className="f-display" style={{ fontSize: 22, lineHeight: 1.05, marginTop: 4, color: 'var(--ink)' }}>
                "Não existe lixo. Existe material no lugar errado."
              </div>
              <div className="f-serif" style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.35 }}>
                A fábrica não cresce pra te enriquecer — cresce pra te dar mais
                <b style={{ color: 'var(--ink)' }}> opções de escolha</b>.
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <RecycleSymbol size={64} color="#2f8f3f" />
            </div>
          </div>

          {/* Loop */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
              <span className="kicker steel" style={{ whiteSpace: "nowrap" }}>LOOP DE ECONOMIA</span>
              <span className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>O QUE FAZER COM 1 t</span>
            </div>
            <EconomyLoop />
          </div>

          {/* Caminhos / finais */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
              <span className="kicker" style={{ whiteSpace: "nowrap" }}>CAMINHOS POSSÍVEIS</span>
              <span className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>3 FINAIS · ESCOLHAS DEFINEM</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {PATHS.map(p => <PathCard key={p.id} p={p} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 90,
        background: '#efe5cc', borderTop: '4px solid var(--ink)',
        display: 'flex', alignItems: 'center', padding: '0 30px', gap: 14,
      }}>
        <button className="btn big paper" onClick={() => window.goTo('map')}>← VOLTAR AO MAPA</button>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.1em' }}>
            PRÓXIMO MARCO · TIER 3 — TRANSFORMAÇÃO
          </div>
          <div style={{ height: 14, background: 'var(--ink)', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, width: '46%',
              background: 'linear-gradient(90deg, #f0b315, #2f8f3f)',
            }} />
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0 6px, transparent 6px 14px)',
            }} />
          </div>
          <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
            46% — faltam 2 600 t recicladas e 92 eco-pts.
          </div>
        </div>
        <button className="btn big hazard" onClick={() => window.goTo('automation')}>AUTOMATIZAR ▸</button>
        <button className="btn big" onClick={() => window.goTo('shop')}>⚙ OFICINA</button>
      </div>
    </div>
  );
}

/* =========================================================
   Sub-components
   ========================================================= */
function Metric({ label, value, of, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.15)',
      borderRadius: 10, padding: '6px 12px', minWidth: 140,
      whiteSpace: 'nowrap',
    }}>
      <div className="f-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, whiteSpace: 'nowrap' }}>
        <span className="f-display" style={{ fontSize: 22, color, whiteSpace: 'nowrap' }}>{value}</span>
        <span className="f-mono" style={{ fontSize: 10, opacity: 0.6, whiteSpace: 'nowrap' }}>{of}</span>
      </div>
    </div>
  );
}

function TierRow({ tier }) {
  const isDone   = tier.status === 'done';
  const isNow    = tier.status === 'now';
  const isLocked = tier.status === 'locked';
  const isGoal   = tier.status === 'goal';

  const statusColor = isDone ? '#2f8f3f'
                    : isNow  ? '#f0b315'
                    : isGoal ? '#e84444'
                    : '#9a9389';

  const statusLabel = isDone ? '✓ COMPLETO'
                    : isNow  ? '◐ EM ANDAMENTO'
                    : isGoal ? '★ META FINAL'
                    : '⛌ BLOQUEADO';

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '88px 1fr',
      gap: 12, alignItems: 'stretch',
      opacity: isLocked ? 0.55 : 1,
      position: 'relative',
    }}>
      {/* Tier badge */}
      <div style={{
        display: 'grid', placeItems: 'center',
        background: isGoal ? 'var(--ink)' : (isNow ? '#fff7d1' : 'var(--paper)'),
        border: `4px solid ${isGoal ? '#e84444' : 'var(--ink)'}`,
        borderRadius: 12,
        boxShadow: isNow ? '0 5px 0 var(--ink)' : '0 3px 0 var(--ink)',
        position: 'relative', zIndex: 2,
        padding: '6px 0',
      }}>
        <div className="f-mono" style={{
          fontSize: 9, letterSpacing: '0.12em',
          color: isGoal ? 'var(--paper)' : 'var(--ink-soft)',
        }}>TIER</div>
        <div className="f-display" style={{
          fontSize: 42, lineHeight: 0.9,
          color: isGoal ? 'var(--paper)' : 'var(--ink)',
        }}>{tier.n}</div>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: statusColor, border: '2px solid var(--ink)',
          marginTop: 2,
        }} />
      </div>

      {/* Tier body */}
      <div style={{
        background: isGoal ? '#fff' : (isNow ? '#fff7d1' : 'var(--paper)'),
        border: `4px solid ${isGoal ? '#e84444' : 'var(--ink)'}`,
        borderRadius: 12,
        boxShadow: '0 3px 0 var(--ink)',
        padding: '8px 12px',
        position: 'relative',
        minWidth: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'nowrap' }}>
          <span className="f-display" style={{ fontSize: 17, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{tier.title}</span>
          <span className="f-serif" style={{ fontSize: 13, color: 'var(--ink-soft)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>· {tier.sub}</span>
          <span className="f-mono" style={{
            fontSize: 10,
            color: statusColor, letterSpacing: '0.08em', fontWeight: 700, whiteSpace: 'nowrap',
          }}>{statusLabel}</span>
        </div>

        <div className="f-ui" style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 2, lineHeight: 1.3 }}>
          {tier.desc}
        </div>

        {/* nodes */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 6 }}>
          {tier.nodes.map((node, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '3px 8px', borderRadius: 7,
              background: node.done ? '#2f8f3f' : (node.progress != null ? '#fff' : 'rgba(0,0,0,0.05)'),
              color: node.done ? '#fff' : 'var(--ink)',
              border: `2px solid ${node.done ? '#1f6428' : 'var(--ink)'}`,
              fontFamily: 'Nunito', fontWeight: 800, fontSize: 11,
              position: 'relative', overflow: 'hidden',
            }}>
              {node.progress != null && !node.done && (
                <div style={{
                  position: 'absolute', top: 0, bottom: 0, left: 0,
                  width: (node.progress * 100) + '%',
                  background: 'rgba(240, 179, 21, 0.4)',
                }} />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{node.ic}</span>
              <span style={{ position: 'relative', zIndex: 1 }}>{node.name}</span>
              {node.progress != null && !node.done && (
                <span style={{ position: 'relative', zIndex: 1, opacity: 0.7, fontSize: 9 }}>
                  {Math.round(node.progress * 100)}%
                </span>
              )}
              {node.done && <span style={{ position: 'relative', zIndex: 1 }}>✓</span>}
            </div>
          ))}
        </div>

        {/* footer: unlocks + cost */}
        <div style={{
          marginTop: 6, paddingTop: 5, borderTop: '2px dashed rgba(0,0,0,0.15)',
          display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap',
        }}>
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>
            <b style={{ color: 'var(--ink)' }}>DESBLOQUEIA →</b> {tier.unlocks}
          </div>
          <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink-soft)' }}>
            <b style={{ color: 'var(--ink)' }}>CUSTO:</b> {tier.cost}
          </div>
        </div>
      </div>
    </div>
  );
}

/* The economic loop graphic — 1 tonelada percorrendo o sistema */
function EconomyLoop() {
  return (
    <div style={{
      background: 'var(--paper)', border: '4px solid var(--ink)', borderRadius: 14,
      padding: 14, boxShadow: '0 4px 0 var(--ink)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top row: input → triagem → reciclagem */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <LoopNode ic="🗑️" label="LIXO" sub="1 tonelada" tone="dark" />
        <LoopArrow />
        <LoopNode ic="🤚" label="TRIAGEM" sub="separa em 7" tone="steel" />
        <LoopArrow />
        <LoopNode ic="♻️" label="RECICLAR" sub="lava + corta" tone="green" />
      </div>

      {/* Divider with hazard tape vibe */}
      <div style={{ height: 8, marginTop: 12, marginBottom: 12 }}>
        <HazardStrip height={8} />
      </div>

      <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', textAlign: 'center', letterSpacing: '0.1em', marginBottom: 10 }}>
        ↓ AGORA A ESCOLHA ↓
      </div>

      {/* Three outputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <LoopOut
          ic="💰" label="VENDER"
          tone="#f0b315"
          gain="+ 18 cr"
          loss="− 0 eco"
          desc="Saída rápida. Capital instantâneo."
        />
        <LoopOut
          ic="🔧" label="CONSTRUIR"
          tone="#3a5a7a"
          gain="+ XP robô"
          loss="− 6 cr"
          desc="Vira material pra obra na região."
        />
        <LoopOut
          ic="🌱" label="RESTAURAR"
          tone="#2f8f3f"
          gain="+ 4 eco"
          loss="− 12 cr"
          desc="Devolve pra terra. Bioma reverte."
        />
      </div>
    </div>
  );
}

function LoopNode({ ic, label, sub, tone }) {
  const bg = tone === 'dark' ? 'var(--ink)' : tone === 'steel' ? '#3a5a7a' : '#2f8f3f';
  const fg = '#fff';
  return (
    <div style={{
      flex: 1, padding: '10px 6px', borderRadius: 10,
      background: bg, color: fg, border: '3px solid var(--ink)',
      textAlign: 'center', position: 'relative',
      boxShadow: '0 3px 0 var(--ink)',
    }}>
      <div style={{ fontSize: 26, lineHeight: 1 }}>{ic}</div>
      <div className="f-display" style={{ fontSize: 14, marginTop: 2 }}>{label}</div>
      <div className="f-mono" style={{ fontSize: 10, opacity: 0.85 }}>{sub}</div>
    </div>
  );
}

function LoopArrow() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" style={{ flexShrink: 0 }}>
      <path d="M 1 11 L 14 11" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 10 5 L 16 11 L 10 17" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoopOut({ ic, label, tone, gain, loss, desc }) {
  return (
    <div style={{
      padding: '10px 8px', borderRadius: 10,
      background: '#fff', border: `3px solid ${tone}`,
      boxShadow: `0 3px 0 var(--ink)`,
      borderBottom: '4px solid var(--ink)',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 22 }}>{ic}</span>
        <span className="f-display" style={{ fontSize: 15, color: tone }}>{label}</span>
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        <span style={{
          background: tone, color: '#fff', padding: '2px 6px', borderRadius: 4,
          fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 10,
        }}>{gain}</span>
        <span style={{
          background: 'rgba(0,0,0,0.08)', color: 'var(--ink-soft)', padding: '2px 6px', borderRadius: 4,
          fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 10,
        }}>{loss}</span>
      </div>
      <div className="f-ui" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.3 }}>
        {desc}
      </div>
    </div>
  );
}

function PathCard({ p }) {
  return (
    <div style={{
      background: '#fff', border: '4px solid var(--ink)', borderRadius: 12,
      boxShadow: '0 4px 0 var(--ink)',
      borderTop: `8px solid ${p.color}`,
      padding: '10px 12px 12px', position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 22 }}>{p.icon}</span>
        <span className="f-mono" style={{ fontSize: 9, color: p.color, letterSpacing: '0.1em', fontWeight: 800 }}>
          {p.tag}
        </span>
      </div>
      <div className="f-display" style={{ fontSize: 15, color: 'var(--ink)', marginTop: 4, lineHeight: 1.05 }}>
        {p.title}
      </div>
      <div className="f-ui" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.32 }}>
        {p.short}
      </div>

      {/* Pros */}
      <div style={{ marginTop: 8 }}>
        {p.pros.map((s, i) => (
          <div key={'p'+i} className="f-mono" style={{ fontSize: 10, color: '#2f8f3f', lineHeight: 1.4 }}>
            + {s}
          </div>
        ))}
        {p.cons.map((s, i) => (
          <div key={'c'+i} className="f-mono" style={{ fontSize: 10, color: '#962222', lineHeight: 1.4 }}>
            − {s}
          </div>
        ))}
      </div>

      {/* Fill bar — quanto do caminho está percorrido */}
      <div style={{ marginTop: 8 }}>
        <div className="f-mono" style={{ fontSize: 9, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>
          PERCURSO ATUAL
        </div>
        <div style={{
          height: 8, background: 'rgba(0,0,0,0.08)', borderRadius: 4,
          overflow: 'hidden', marginTop: 3, border: '2px solid var(--ink)',
        }}>
          <div style={{
            height: '100%', width: (p.fill * 100) + '%', background: p.color,
          }} />
        </div>
        <div className="f-mono" style={{ fontSize: 10, color: 'var(--ink)', fontWeight: 700, marginTop: 2 }}>
          {Math.round(p.fill * 100)}%
        </div>
      </div>
    </div>
  );
}

window.ScreenProgression = ScreenProgression;
