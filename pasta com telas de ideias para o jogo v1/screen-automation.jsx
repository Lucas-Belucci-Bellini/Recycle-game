/* global React, BINS, BinSVG, CollectorBotSVG, DroneSVG, ConveyorSVG */
// screen-automation.jsx — Tela 06: Painel de automação (vista isométrica do pátio + nós)

function ScreenAutomation() {
  return (
    <div data-screen-label="06 Painel de automação" className="bp-grid" style={{ width: '100%', height: '100%', position: 'relative', color: '#d6ecff' }}>
      {/* Top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 70,
        background: 'rgba(8,22,38,0.95)', borderBottom: '3px solid var(--hazard)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 18,
        color: '#d6ecff',
      }}>
        <button onClick={() => window.goTo('sector')} style={{ background: 'transparent', color: '#d6ecff', border: 'none', fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em' }}>← VOLTAR</button>
        <span style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.2)' }} />
        <div className="f-mono" style={{ fontSize: 13, letterSpacing: '0.12em', opacity: 0.8 }}>
          PLANTA · PÁTIO NORTE · LINHA-A
        </div>
        <span style={{ marginLeft: 16, fontFamily: 'JetBrains Mono', fontSize: 12, color: 'var(--hazard)' }}>● 14 NÓS · 2 OFFLINE</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <span className="chip credit sm">💰 4 280 cr</span>
          <span className="chip sm" style={{ background: 'var(--hazard)', color: 'var(--ink)' }}>⚡ 6 / 12 MW</span>
          <button className="btn hazard" style={{ padding: '8px 14px', fontSize: 12 }} onClick={() => window.goTo('shop')}>+ COMPRAR NÓ</button>
        </div>
      </div>

      {/* Layout: planta + sidebar */}
      <div style={{ position: 'absolute', top: 90, left: 30, right: 380, bottom: 30 }}>
        <PlantaSVG />
      </div>

      <Sidebar />

      {/* Blueprint stamp */}
      <div style={{
        position: 'absolute', bottom: 30, left: 50,
        border: '3px solid rgba(214,236,255,0.4)', padding: '8px 14px',
        fontFamily: 'JetBrains Mono', fontSize: 11, color: 'rgba(214,236,255,0.7)',
        letterSpacing: '0.18em', transform: 'rotate(-2deg)',
      }}>
        BLUEPRINT v 0.4 · DRAFT · REV 12
      </div>
    </div>
  );
}

function PlantaSVG() {
  return (
    <svg viewBox="0 0 1480 950" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      {/* boundary */}
      <rect x="20" y="20" width="1440" height="910" rx="14" fill="rgba(8,22,38,0.45)" stroke="rgba(214,236,255,0.3)" strokeWidth="2" strokeDasharray="6 6" />

      {/* Title */}
      <text x="44" y="68" fontFamily="Fredoka" fontWeight="700" fontSize="44" fill="#d6ecff">Linha de Triagem A</text>
      <text x="44" y="96" fontFamily="JetBrains Mono" fontWeight="700" fontSize="14" fill="rgba(214,236,255,0.6)" letterSpacing="2">
        ENTRADA → TRIAGEM → LIXEIRAS → PRENSA → CAMINHÃO
      </text>

      {/* Pipeline arrows */}
      <defs>
        <marker id="ar" markerWidth="14" markerHeight="14" refX="6" refY="7" orient="auto">
          <polygon points="0,0 14,7 0,14" fill="#f5c211" />
        </marker>
      </defs>

      {/* Main conveyor backbone */}
      <line x1="80" y1="420" x2="1400" y2="420" stroke="#5fc8ff" strokeWidth="6" strokeDasharray="14 6" opacity="0.5" />

      {/* Nodes */}
      <Node x={120} y={420} kind="entrada" label="Recepção" sub="manual" online />
      <Node x={300} y={420} kind="esteira" label="Esteira-01" sub="1.2 m/s" online tier={2} />
      <Node x={500} y={300} kind="classifier" label="Classificador-02" sub="ML óptico" online tier={1} />
      <Node x={500} y={540} kind="drone" label="Drone scanner" sub="ronda 30s" online tier={1} />
      <Node x={720} y={420} kind="esteira" label="Esteira-02" sub="0.8 m/s" online tier={1} />
      <Node x={920} y={300} kind="bin" label="Azul" color="var(--azul)" online />
      <Node x={920} y={420} kind="bin" label="Vermelha" color="var(--vermelho)" online />
      <Node x={920} y={540} kind="bin" label="Verde" color="var(--verde)" online />
      <Node x={920} y={660} kind="bin" label="Amarela" color="var(--amarelo)" online />
      <Node x={1140} y={420} kind="prensa" label="Compactador" sub="OFFLINE" online={false} tier={1} />
      <Node x={1340} y={420} kind="caminhao" label="Caminhão" sub="aguardando" online tier={1} />

      {/* Slots vazios */}
      <Node x={300} y={760} kind="empty" label="+ slot livre" />
      <Node x={1140} y={760} kind="empty" label="+ slot livre" />

      {/* Connections */}
      <Wire d="M 168 420 L 252 420" />
      <Wire d="M 348 420 L 452 420" />
      <Wire d="M 500 348 L 500 420 L 540 420" branch />
      <Wire d="M 500 492 L 500 420 L 540 420" branch />
      <Wire d="M 770 420 L 872 420" />
      <Wire d="M 770 420 Q 850 360 872 300" branch />
      <Wire d="M 770 420 Q 850 480 872 540" branch />
      <Wire d="M 770 420 Q 850 600 872 660" branch />
      <Wire d="M 970 420 L 1092 420" />
      <Wire d="M 1188 420 L 1292 420" />
    </svg>
  );
}

function Wire({ d, branch = false }) {
  return (
    <g>
      <path d={d} fill="none" stroke="#0a1f33" strokeWidth="14" strokeLinecap="round" />
      <path d={d} fill="none" stroke={branch ? '#7ec850' : '#f5c211'} strokeWidth="6" strokeLinecap="round" markerEnd="url(#ar)" />
    </g>
  );
}

function Node({ x, y, kind, label, sub, color, online = true, tier = 0 }) {
  const W = kind === 'empty' ? 100 : 96;
  const H = 60;
  if (kind === 'empty') {
    return (
      <g transform={`translate(${x - W/2} ${y - H/2})`} style={{ cursor: 'pointer' }}>
        <rect width={W} height={H} rx="10" fill="none" stroke="#f5c211" strokeWidth="3" strokeDasharray="6 4" opacity="0.7" />
        <text x={W/2} y={36} textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="13" fill="#f5c211" letterSpacing="1">
          + ADICIONAR
        </text>
      </g>
    );
  }
  const fill = kind === 'bin' ? color : '#14304a';
  const stroke = online ? '#7ec850' : '#d23636';
  return (
    <g transform={`translate(${x - W/2} ${y - H/2})`}>
      <rect width={W} height={H} rx="10" fill={fill} stroke={stroke} strokeWidth="3" />
      {/* led */}
      <circle cx="10" cy="10" r="4" fill={online ? '#7ec850' : '#d23636'} />
      {/* tier dots */}
      {tier > 0 && Array.from({length: tier}).map((_,i)=>(
        <circle key={i} cx={W - 10 - i*8} cy="10" r="3" fill="#f5c211" />
      ))}
      {/* icon */}
      <text x="14" y={H/2 + 12} fontSize="22" fill="#fff">
        {{
          entrada: '📥', esteira: '═', classifier: '🤖', drone: '🛸',
          prensa: '⚙', caminhao: '🚛', bin: '',
        }[kind] || ''}
      </text>
      <text x="44" y="34" fontFamily="Fredoka" fontWeight="700" fontSize="17" fill="#fff">{label}</text>
      {sub && <text x="44" y="50" fontFamily="JetBrains Mono" fontSize="11" fill="rgba(255,255,255,0.65)">{sub}</text>}
    </g>
  );
}

function Sidebar() {
  return (
    <div style={{
      position: 'absolute', top: 90, right: 30, bottom: 30, width: 330,
      background: 'rgba(8,22,38,0.85)', border: '3px solid rgba(214,236,255,0.3)',
      borderRadius: 14, padding: 22, color: '#d6ecff',
      display: 'flex', flexDirection: 'column', gap: 16,
      overflow: 'auto',
    }}>
      <div>
        <div className="f-mono" style={{ fontSize: 11, color: 'var(--hazard)', letterSpacing: '0.12em' }}>
          NÓ SELECIONADO
        </div>
        <div className="f-display" style={{ fontSize: 26, marginTop: 6, lineHeight: 1 }}>
          Classificador-02
        </div>
        <div className="f-mono" style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>
          CLS-02 · ML óptico · tier 1
        </div>
      </div>

      {/* stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Stat label="Precisão" value="91%" bar={0.91} good />
        <Stat label="Velocidade" value="2.4 it/s" bar={0.6} />
        <Stat label="Bateria" value="46%" bar={0.46} warn />
        <Stat label="Consumo" value="1.2 MW" bar={0.3} />
      </div>

      {/* Upgrade tier */}
      <div style={{
        background: 'rgba(245,194,17,0.1)', border: '2.5px dashed var(--hazard)',
        borderRadius: 10, padding: 14,
      }}>
        <div className="f-mono" style={{ fontSize: 11, color: 'var(--hazard)', letterSpacing: '0.1em' }}>UPGRADE DISPONÍVEL</div>
        <div className="f-display" style={{ fontSize: 18, marginTop: 4 }}>Tier 2 · IA reforçada</div>
        <div className="f-ui" style={{ fontSize: 13, opacity: 0.8, marginTop: 4, lineHeight: 1.4 }}>
          Precisão → 97% · reconhece e-lixo · –20% energia
        </div>
        <button className="btn hazard" style={{ marginTop: 10, width: '100%', padding: '10px 14px', fontSize: 14 }}
                onClick={() => window.goTo('shop')}>
          💰 1 200 cr · INSTALAR
        </button>
      </div>

      {/* Wires legend */}
      <div style={{ marginTop: 'auto', borderTop: '2px dashed rgba(255,255,255,0.2)', paddingTop: 12 }}>
        <div className="f-mono" style={{ fontSize: 11, opacity: 0.65, marginBottom: 6, letterSpacing: '0.1em' }}>LEGENDA</div>
        <Legend color="#f5c211" label="fluxo de material" />
        <Legend color="#7ec850" label="ramo de classificação" />
        <Legend color="#5fc8ff" label="esteira principal" dash />
      </div>
    </div>
  );
}

function Stat({ label, value, bar, good, warn }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="f-ui" style={{ fontSize: 12, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        <span className="f-mono" style={{ fontSize: 13, color: good ? 'var(--verde)' : warn ? 'var(--amarelo)' : '#fff' }}>{value}</span>
      </div>
      <div style={{
        height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden',
      }}>
        <div style={{
          width: `${bar*100}%`, height: '100%',
          background: good ? 'var(--verde)' : warn ? 'var(--amarelo)' : '#5fc8ff',
        }} />
      </div>
    </div>
  );
}

function Legend({ color, label, dash }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'JetBrains Mono', opacity: 0.85, marginBottom: 3 }}>
      <span style={{
        width: 24, height: 4, background: dash ? `repeating-linear-gradient(90deg, ${color} 0 4px, transparent 4px 8px)` : color,
      }} />
      {label}
    </div>
  );
}

window.ScreenAutomation = ScreenAutomation;
