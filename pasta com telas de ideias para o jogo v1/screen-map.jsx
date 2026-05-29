/* global React, BINS, BinSVG, PracaIcon, HortaIcon, UsinaIcon, EcoparkIcon, HazardStrip */
// screen-map.jsx — Tela 02: Mapa de Campanha

const { useState: useState_map } = React;

const SECTORS = [
  {
    id: 1, codigo: 'N-01', nome: 'Pátio Norte', tons: '12k', tonsCleared: 84,
    tema: 'Lixo doméstico básico', reformaIcon: 'praca', reforma: 'Praça do Bairro',
    bins: ['azul','vermelho','verde','amarelo'], status: 'em_andamento', estrelas: 2, dif: 1,
    x: 320, y: 540, color: '#a8c8a0',
  },
  {
    id: 2, codigo: 'L-02', nome: 'Pátio Leste', tons: '23k', tonsCleared: 0,
    tema: 'Urbano + orgânico', reformaIcon: 'horta', reforma: 'Horta Comunitária',
    bins: ['azul','vermelho','verde','amarelo','marrom'], status: 'bloqueado', estrelas: 0, dif: 2,
    x: 760, y: 420, color: '#c8b478',
  },
  {
    id: 3, codigo: 'S-03', nome: 'Pátio Sul', tons: '31k', tonsCleared: 0,
    tema: 'Perigosos + e-lixo', reformaIcon: 'usina', reforma: 'Usina de Reciclagem',
    bins: ['azul','vermelho','verde','amarelo','marrom','laranja'], status: 'bloqueado', estrelas: 0, dif: 3,
    x: 1180, y: 580, color: '#c89876',
  },
  {
    id: 4, codigo: 'O-04', nome: 'Pátio Oeste', tons: '34k', tonsCleared: 0,
    tema: 'Industrial + rejeito', reformaIcon: 'ecopark', reforma: 'Eco-Parque',
    bins: ['todas'], status: 'bloqueado', estrelas: 0, dif: 4,
    x: 1560, y: 380, color: '#a08868',
  },
];

function ScreenMap() {
  const [sel, setSel] = useState_map(SECTORS[0]);

  return (
    <div data-screen-label="02 Mapa de campanha" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--paper-deep)' }}>
      {/* "Paper map" background — kraft tint + grid */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 30% 40%, rgba(255,250,234,0.7) 0%, transparent 60%),
          repeating-linear-gradient(0deg, transparent 0 60px, rgba(28,22,14,0.04) 60px 61px),
          repeating-linear-gradient(90deg, transparent 0 60px, rgba(28,22,14,0.04) 60px 61px),
          linear-gradient(180deg, #f4e5bf 0%, #e6d4a3 100%)
        `,
      }} />

      {/* Top bar */}
      <TopBar />

      {/* Map area */}
      <div style={{ position: 'absolute', top: 100, left: 60, right: 440, bottom: 60 }}>
        {/* Title */}
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 5 }}>
          <span className="kicker hazard">LIXÃO ABANDONADO Z-7</span>
          <div className="f-display" style={{ fontSize: 64, lineHeight: 1, marginTop: 8, color: 'var(--ink)' }}>
            Mapa do Pátio
          </div>
          <div className="f-serif" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 4 }}>
            4 setores · 100.000 t · escala 1:5000
          </div>
        </div>

        {/* Compass */}
        <div style={{
          position: 'absolute', top: 28, right: 28, width: 90, height: 90,
          borderRadius: '50%', border: '4px solid var(--ink)',
          background: 'var(--paper)', display: 'grid', placeItems: 'center',
          boxShadow: '0 6px 0 var(--ink)',
        }}>
          <svg viewBox="0 0 80 80" width="78" height="78">
            <polygon points="40,8 48,40 40,52 32,40" fill="var(--signal)" stroke="var(--ink)" strokeWidth="2.5" />
            <polygon points="40,72 48,40 40,28 32,40" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="40" y="22" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="11" fill="var(--ink)">N</text>
          </svg>
        </div>

        {/* SVG with paths between sectors */}
        <svg viewBox="0 0 1380 920" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {/* Lixão outline */}
          <path d="M 100 260 Q 80 180, 240 140 Q 480 80, 720 130 Q 1020 80, 1240 200 Q 1380 320, 1320 560 Q 1280 800, 1000 820 Q 700 880, 460 820 Q 200 800, 120 600 Z"
                fill="rgba(138,106,62,0.5)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" strokeDasharray="0" />
          {/* path between sectors */}
          <path d="M 320 540 Q 540 420, 760 420 Q 980 540, 1180 580 Q 1380 480, 1560 380"
                stroke="var(--ink)" strokeWidth="5" strokeDasharray="10 10" fill="none" />
          {/* trash piles around */}
          {[
            [220, 320], [500, 200], [900, 280], [1320, 340], [580, 720], [1080, 740], [240, 700], [1380, 660],
          ].map(([x,y],i)=> (
            <g key={i} transform={`translate(${x} ${y})`}>
              <ellipse cx="0" cy="14" rx="36" ry="6" fill="rgba(0,0,0,0.15)" />
              <path d={`M -36 14 Q -20 -10 0 -16 Q 22 -8 36 14 Z`} fill="#8a6a3e" stroke="var(--ink)" strokeWidth="2.5" />
            </g>
          ))}
          {/* Sectors */}
          {SECTORS.map(s => (
            <SectorPin key={s.id} sector={s} selected={sel.id === s.id} onClick={() => setSel(s)} />
          ))}
        </svg>

        {/* Legend */}
        <div style={{
          position: 'absolute', left: 16, bottom: 16,
          background: 'rgba(28,22,14,0.92)', color: 'var(--paper)',
          padding: '12px 16px', borderRadius: 10,
          fontFamily: 'JetBrains Mono', fontSize: 12,
          letterSpacing: '0.04em',
          display: 'flex', gap: 18, alignItems: 'center',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="dot-led" /> em andamento
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="dot-led amb" /> disponível
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="dot-led red" /> bloqueado
          </span>
        </div>
      </div>

      {/* Side panel — selected sector */}
      <SectorPanel sector={sel} />
    </div>
  );
}

function TopBar() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 70,
      background: 'var(--ink)', color: 'var(--paper)',
      display: 'flex', alignItems: 'center', padding: '0 28px', gap: 20,
      borderBottom: '4px solid var(--hazard-d, var(--hazard))',
      zIndex: 10,
    }}>
      <button onClick={() => window.goTo('menu')} style={{
        background: 'transparent', color: 'var(--paper)', border: 'none',
        fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.08em',
      }}>← VOLTAR</button>
      <span style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.2)' }} />
      <div className="f-mono" style={{ fontSize: 13, opacity: 0.85, letterSpacing: '0.12em' }}>
        SAFRA #001 ▸ CAMPANHA
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
        <span className="chip credit sm">💰 4 280 cr</span>
        <span className="chip eco sm">🌱 132 eco</span>
        <span className="chip sm" style={{ background: '#ffe2a8' }}>⭐ 7</span>
        <span className="chip sm" style={{ background: 'var(--hazard)', color: 'var(--ink)' }}>⚡ Nv 4</span>
      </div>
    </div>
  );
}

function SectorPin({ sector, selected, onClick }) {
  const isLocked = sector.status === 'bloqueado';
  const color = sector.status === 'em_andamento' ? '#7ec850' : isLocked ? '#9a8a6e' : '#f0b315';
  return (
    <g transform={`translate(${sector.x} ${sector.y})`} style={{ cursor: 'pointer' }} onClick={onClick}>
      {/* pulse ring on selected */}
      {selected && (
        <circle r="62" fill="none" stroke="var(--hazard)" strokeWidth="5" strokeDasharray="6 8" className="pulse" />
      )}
      {/* big pin */}
      <circle r="48" fill={color} stroke="var(--ink)" strokeWidth="5" />
      <circle r="38" fill={sector.color} stroke="var(--ink)" strokeWidth="3" opacity="0.7" />
      {/* number */}
      <text x="0" y="6" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="38" fill="var(--ink)">
        {sector.id}
      </text>
      {/* lock or stars */}
      {isLocked ? (
        <g transform="translate(34 -36)">
          <circle r="14" fill="var(--ink)" />
          <text x="0" y="5" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="14" fill="var(--hazard)">🔒</text>
        </g>
      ) : (
        <g transform="translate(-30 36)">
          {[0,1,2].map(i => (
            <g key={i} transform={`translate(${i*22} 0)`}>
              <path d="M 0 -7 L 2 -2 L 7 -2 L 3 2 L 5 8 L 0 4 L -5 8 L -3 2 L -7 -2 L -2 -2 Z"
                    fill={i < sector.estrelas ? '#ffba2e' : 'rgba(255,255,255,0.7)'}
                    stroke="var(--ink)" strokeWidth="1.8" />
            </g>
          ))}
        </g>
      )}
      {/* label */}
      <g transform="translate(0 -68)">
        <rect x="-58" y="-18" width="116" height="22" rx="4" fill="var(--ink)" />
        <text x="0" y="-2" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="13" fill="var(--hazard)">
          {sector.codigo} · {sector.tons}
        </text>
      </g>
    </g>
  );
}

function SectorPanel({ sector }) {
  const isLocked = sector.status === 'bloqueado';
  const ReformaIcon = {
    praca: PracaIcon, horta: HortaIcon, usina: UsinaIcon, ecopark: EcoparkIcon,
  }[sector.reformaIcon] || PracaIcon;
  return (
    <div style={{
      position: 'absolute', top: 100, right: 60, width: 360, bottom: 60,
      background: 'var(--card)', border: '4px solid var(--ink)', borderRadius: 18,
      boxShadow: '0 8px 0 var(--ink)',
      padding: 26,
      display: 'flex', flexDirection: 'column', gap: 18,
      overflow: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="kicker steel">SETOR {sector.codigo}</span>
        <span className="f-mono" style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
          DIF · {'▮'.repeat(sector.dif)}{'▯'.repeat(4-sector.dif)}
        </span>
      </div>
      <div>
        <div className="f-display" style={{ fontSize: 38, lineHeight: 1, color: 'var(--ink)' }}>
          {sector.nome}
        </div>
        <div className="f-serif" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 4 }}>
          {sector.tema}
        </div>
      </div>

      {/* tonelagem ring */}
      <div style={{
        background: 'var(--paper-deep)', border: '3px solid var(--ink)', borderRadius: 12,
        padding: 14, display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <svg viewBox="0 0 80 80" width="74" height="74">
          <circle cx="40" cy="40" r="32" stroke="var(--paper-edge)" strokeWidth="8" fill="none" />
          <circle cx="40" cy="40" r="32" stroke="var(--verde)" strokeWidth="8" fill="none"
                  strokeDasharray={`${201 * sector.tonsCleared/100} 201`}
                  strokeLinecap="round" transform="rotate(-90 40 40)" />
          <text x="40" y="46" textAnchor="middle" fontFamily="Fredoka" fontWeight="700" fontSize="20" fill="var(--ink)">
            {sector.tonsCleared}%
          </text>
        </svg>
        <div>
          <div className="f-ui" style={{ fontSize: 12, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tonelagem</div>
          <div className="f-display" style={{ fontSize: 28, color: 'var(--ink)' }}>{sector.tons} t</div>
          <div className="f-mono" style={{ fontSize: 12, color: 'var(--ink-mid)' }}>
            limpas: {Math.round(parseFloat(sector.tons) * sector.tonsCleared/100*1000)/1000} kt
          </div>
        </div>
      </div>

      {/* bins required */}
      <div>
        <div className="f-ui" style={{ fontSize: 13, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Lixeiras nesta fase
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(sector.bins[0] === 'todas' ? BINS.map(b => b.id) : sector.bins).map(id => {
            const b = BINS.find(x => x.id === id);
            return b && (
              <div key={id} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--paper-deep)', border: '2.5px solid var(--ink)', borderRadius: 8,
                padding: '4px 8px',
              }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: b.hex, border: '2px solid var(--ink)' }} />
                <span className="f-ui" style={{ fontSize: 12, color: 'var(--ink)' }}>{b.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reforma reward */}
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)', borderRadius: 12, padding: 16,
        position: 'relative',
      }}>
        <div className="f-mono" style={{ fontSize: 11, color: 'var(--hazard)', letterSpacing: '0.12em' }}>
          RECOMPENSA DO GOVERNO
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
          <div style={{
            width: 70, height: 70, background: 'var(--paper)', borderRadius: 10,
            display: 'grid', placeItems: 'center', border: '3px solid var(--paper-edge)',
          }}>
            <ReformaIcon size={56} />
          </div>
          <div>
            <div className="f-display" style={{ fontSize: 22, lineHeight: 1.1 }}>{sector.reforma}</div>
            <div className="f-ui" style={{ fontSize: 12, color: 'var(--hazard)', marginTop: 2 }}>
              + 800 cr · + 25 eco
            </div>
          </div>
        </div>
      </div>

      {/* Action */}
      <button
        className={"btn huge " + (isLocked ? 'paper' : '')}
        disabled={isLocked}
        onClick={() => !isLocked && window.goTo('sector')}
        style={{
          marginTop: 'auto',
          opacity: isLocked ? 0.6 : 1, cursor: isLocked ? 'not-allowed' : 'pointer',
          background: isLocked ? 'var(--paper-edge)' : sector.status === 'em_andamento' ? 'var(--verde)' : 'var(--hazard)',
          color: isLocked ? 'var(--ink-mid)' : sector.status === 'em_andamento' ? '#fff' : 'var(--ink)',
        }}>
        {isLocked ? '🔒 BLOQUEADO' : sector.status === 'em_andamento' ? '▶ CONTINUAR' : '▶ INICIAR SETOR'}
      </button>
    </div>
  );
}

window.ScreenMap = ScreenMap;
