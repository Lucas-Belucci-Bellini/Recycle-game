/* global React, CollectorBotSVG, DroneSVG, BinSVG, BINS */
// screen-shop.jsx — Tela 07: Loja / árvore de upgrades

const { useState: useState_shop } = React;

const CATS = [
  { id: 'robos',    label: 'Robôs',     icon: '🤖' },
  { id: 'esteiras', label: 'Esteiras',  icon: '═' },
  { id: 'drones',   label: 'Drones',    icon: '🛸' },
  { id: 'bins',     label: 'Lixeiras',  icon: '🗑' },
  { id: 'cosme',    label: 'Visuais',   icon: '🎨' },
];

const ITEMS = [
  { id: 'col1', cat: 'robos', name: 'Coletor MK-I', desc: 'Robô básico de coleta. Carrega 12 itens.', price: 800, eco: 0,
    tier: 1, owned: true, unlocked: true, x: 80, y: 80, prereq: [] },
  { id: 'col2', cat: 'robos', name: 'Coletor MK-II', desc: '+25 % velocidade, +carga.', price: 1800, eco: 0,
    tier: 2, owned: false, unlocked: true, x: 80, y: 280, prereq: ['col1'] },
  { id: 'col3', cat: 'robos', name: 'Coletor MK-III', desc: 'IA prioriza contaminados primeiro.', price: 4500, eco: 30,
    tier: 3, owned: false, unlocked: false, x: 80, y: 480, prereq: ['col2'] },

  { id: 'cls1', cat: 'robos', name: 'Classificador Óptico', desc: 'Separa 4 cores. 91% precisão.', price: 2200, eco: 0,
    tier: 1, owned: true, unlocked: true, x: 340, y: 80, prereq: [] },
  { id: 'cls2', cat: 'robos', name: 'Classificador IA',     desc: 'Aprende com os erros do jogador.', price: 5800, eco: 40,
    tier: 2, owned: false, unlocked: true, x: 340, y: 280, prereq: ['cls1'] },

  { id: 'cmp1', cat: 'robos', name: 'Compactador',          desc: 'Reduz volume 4× antes do caminhão.', price: 3200, eco: 0,
    tier: 1, owned: false, unlocked: true, x: 340, y: 480, prereq: ['cls1'] },

  { id: 'drn1', cat: 'robos', name: 'Drone Scanner',        desc: 'Pré-classifica enquanto sobrevoa.', price: 1500, eco: 0,
    tier: 1, owned: true, unlocked: true, x: 600, y: 80, prereq: [] },
  { id: 'drn2', cat: 'robos', name: 'Drone de E-lixo',      desc: 'Detecta perigosos a 20m.', price: 3400, eco: 15,
    tier: 2, owned: false, unlocked: true, x: 600, y: 280, prereq: ['drn1'] },

  { id: 'fis1', cat: 'robos', name: 'Fiscal',               desc: 'Multa contaminação. + reputação.', price: 4000, eco: 25,
    tier: 1, owned: false, unlocked: false, x: 600, y: 480, prereq: ['drn2'] },
];

function ScreenShop() {
  const [cat, setCat] = useState_shop('robos');
  const [sel, setSel] = useState_shop('cls2');
  const selected = ITEMS.find(i => i.id === sel);

  return (
    <div data-screen-label="07 Loja / Upgrades" style={{ width: '100%', height: '100%', position: 'relative', background: '#fdf3da' }}>
      {/* Top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 70,
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 20,
      }}>
        <button onClick={() => window.goTo('automation')} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em' }}>← VOLTAR</button>
        <span style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.2)' }} />
        <div className="f-mono" style={{ fontSize: 13, letterSpacing: '0.12em' }}>OFICINA · CATÁLOGO</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <span className="chip credit sm">💰 4 280 cr</span>
          <span className="chip eco sm">🌱 132 eco</span>
          <span className="chip sm" style={{ background: 'var(--hazard)', color: 'var(--ink)' }}>⚡ Nv 4</span>
        </div>
      </div>

      {/* Title */}
      <div style={{ position: 'absolute', top: 90, left: 50 }}>
        <span className="kicker hazard">PESQUISA & DESENVOLVIMENTO</span>
        <h1 className="f-display" style={{ fontSize: 56, margin: '8px 0 4px', lineHeight: 1 }}>
          Árvore de Upgrades
        </h1>
        <div className="f-serif" style={{ fontSize: 20, color: 'var(--ink-soft)' }}>
          Cada nó depende do anterior. Cuide do orçamento.
        </div>
      </div>

      {/* Tab strip */}
      <div style={{
        position: 'absolute', top: 220, left: 50, right: 470,
        display: 'flex', gap: 10,
      }}>
        {CATS.map(c => (
          <button key={c.id}
            onClick={() => setCat(c.id)}
            style={{
              background: cat === c.id ? 'var(--ink)' : 'transparent',
              color:  cat === c.id ? 'var(--hazard)' : 'var(--ink)',
              border: '3px solid var(--ink)',
              borderRadius: 12, padding: '10px 18px',
              fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer',
              letterSpacing: '0.06em',
              boxShadow: cat === c.id ? 'inset 0 4px 0 rgba(0,0,0,0.3)' : '0 4px 0 var(--ink)',
            }}>
            <span style={{ marginRight: 6 }}>{c.icon}</span>{c.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tree area */}
      <div style={{
        position: 'absolute', top: 290, left: 50, right: 470, bottom: 50,
        background: 'var(--paper)', border: '4px solid var(--ink)', borderRadius: 18,
        boxShadow: '0 8px 0 var(--ink)', overflow: 'auto', padding: 20,
      }}>
        <TreeSVG items={ITEMS.filter(i => i.cat === 'robos')} sel={sel} setSel={setSel} />
      </div>

      {/* Side detail */}
      <SidePanel item={selected} />
    </div>
  );
}

function TreeSVG({ items, sel, setSel }) {
  return (
    <svg viewBox="0 0 900 720" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* grid dots */}
      <defs>
        <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="rgba(28,22,14,0.12)" />
        </pattern>
      </defs>
      <rect width="900" height="720" fill="url(#dots)" />

      {/* connections */}
      {items.flatMap(item => item.prereq.map(pid => {
        const p = items.find(i => i.id === pid);
        if (!p) return null;
        const unlocked = item.unlocked && p.owned;
        return (
          <g key={item.id + pid}>
            <path d={`M ${p.x + 90} ${p.y + 60} L ${item.x + 90} ${item.y}`}
                  stroke={unlocked ? 'var(--verde)' : 'var(--paper-edge)'} strokeWidth="6"
                  strokeLinecap="round" strokeDasharray={unlocked ? '0' : '10 6'} />
          </g>
        );
      }))}

      {/* nodes */}
      {items.map(item => <TreeNode key={item.id} item={item} selected={sel === item.id} onClick={() => setSel(item.id)} />)}
    </svg>
  );
}

function TreeNode({ item, selected, onClick }) {
  const W = 180, H = 140;
  return (
    <g transform={`translate(${item.x} ${item.y})`} style={{ cursor: 'pointer' }} onClick={onClick}>
      {selected && (
        <rect x="-8" y="-8" width={W + 16} height={H + 16} rx="16" fill="none" stroke="var(--hazard)" strokeWidth="4" strokeDasharray="8 6" className="pulse" />
      )}
      <rect width={W} height={H} rx="12"
            fill={item.owned ? 'var(--card-soft)' : item.unlocked ? 'var(--card)' : 'var(--paper-edge)'}
            stroke="var(--ink)" strokeWidth="3.5" />
      {/* status badge */}
      <g transform={`translate(${W - 14} 14)`}>
        {item.owned ? (
          <>
            <circle r="14" fill="var(--verde)" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M -6 0 L -2 4 L 7 -5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : !item.unlocked ? (
          <>
            <circle r="14" fill="var(--cinza-d)" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="0" y="5" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="14" fill="#fff">🔒</text>
          </>
        ) : null}
      </g>

      {/* icon */}
      <g transform={`translate(${W/2} 56)`}>
        <rect x="-26" y="-26" width="52" height="52" rx="10" fill="#ffe2a8" stroke="var(--ink)" strokeWidth="2.5" />
        <text x="0" y="8" textAnchor="middle" fontSize="32">{item.cat === 'robos' && item.id.startsWith('drn') ? '🛸' : item.cat === 'robos' && item.id.startsWith('cmp') ? '⚙' : '🤖'}</text>
      </g>
      <text x={W/2} y={102} textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="16" fill="var(--ink)">{item.name}</text>
      <text x={W/2} y={124} textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="11" fill="var(--ink-soft)">
        {item.owned ? 'COMPRADO' : item.unlocked ? `💰 ${item.price.toLocaleString()} cr` : 'BLOQUEADO'}
      </text>

      {/* tier dots */}
      <g transform="translate(14 14)">
        {Array.from({length: item.tier}).map((_,i)=>(
          <circle key={i} cx={i*10} cy="0" r="3.5" fill="var(--hazard)" stroke="var(--ink)" strokeWidth="1.5" />
        ))}
      </g>
    </g>
  );
}

function SidePanel({ item }) {
  if (!item) return null;
  return (
    <div style={{
      position: 'absolute', top: 90, right: 50, bottom: 50, width: 400,
      background: 'var(--card)', border: '4px solid var(--ink)', borderRadius: 18,
      boxShadow: '0 8px 0 var(--ink)', padding: 26,
      display: 'flex', flexDirection: 'column', gap: 16,
      overflow: 'auto',
    }}>
      <span className="kicker hazard">DETALHE · TIER {item.tier}</span>
      <div>
        <div className="f-display" style={{ fontSize: 30, lineHeight: 1, color: 'var(--ink)' }}>
          {item.name}
        </div>
        <div className="f-serif" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.3 }}>
          {item.desc}
        </div>
      </div>

      {/* Big preview */}
      <div style={{
        background: '#ffe2a8', border: '3px solid var(--ink)', borderRadius: 14,
        padding: 20, display: 'grid', placeItems: 'center', height: 220, position: 'relative',
      }}>
        <CollectorBotSVG size={180} color={item.id.startsWith('cls') ? '#3a8de0' : item.id.startsWith('cmp') ? '#d23636' : item.id.startsWith('drn') ? '#9c5fd0' : '#f0b315'} />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'var(--ink)', color: 'var(--hazard)',
          padding: '4px 10px', borderRadius: 6,
          fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.1em',
        }}>MODELO {item.id.toUpperCase()}</div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <StatBox icon="⚡" l="Velocidade" v="2.4 it/s" />
        <StatBox icon="🎯" l="Precisão" v="97%" />
        <StatBox icon="🔋" l="Consumo" v="0.9 MW" />
        <StatBox icon="📦" l="Carga" v="24 items" />
      </div>

      {/* Educational note */}
      <div style={{
        background: 'var(--paper-deep)', border: '3px dashed var(--ink)', borderRadius: 10,
        padding: 12,
      }}>
        <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.1em', marginBottom: 4 }}>
          📘 VOCÊ SABIA?
        </div>
        <div className="f-ui" style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>
          Centrais reais de triagem usam sensores ópticos NIR para identificar plásticos PET, PEAD e PP em milissegundos.
        </div>
      </div>

      {/* CTA */}
      <button className="btn huge" style={{
        marginTop: 'auto',
        background: item.owned ? 'var(--cinza-d)' : !item.unlocked ? 'var(--paper-edge)' : 'var(--verde)',
        color: item.owned ? '#fff' : !item.unlocked ? 'var(--ink-mid)' : '#fff',
        cursor: item.owned || !item.unlocked ? 'not-allowed' : 'pointer',
      }}>
        {item.owned ? '✓ INSTALADO' : !item.unlocked ? '🔒 BLOQUEADO' : `💰 ${item.price.toLocaleString()} cr · COMPRAR`}
      </button>
    </div>
  );
}

function StatBox({ icon, l, v }) {
  return (
    <div style={{
      background: 'var(--paper-deep)', border: '2.5px solid var(--ink)', borderRadius: 10,
      padding: 10, display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <span className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.08em' }}>
        {icon} {l.toUpperCase()}
      </span>
      <span className="f-display" style={{ fontSize: 24, color: 'var(--ink)', lineHeight: 1 }}>{v}</span>
    </div>
  );
}

window.ScreenShop = ScreenShop;
