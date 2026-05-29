/* global React */
// screen-keyart.jsx — Tela 12: Concept Art / Key Art (vista do pátio em escala)

const { useState: useState_ka } = React;

const SCENES = [
  { id: 'twilight', label: 'Poente do Lixão',  sub: 'Primeira semana · você sozinho',          },
  { id: 'midday',   label: 'Pátio Industrial', sub: 'Capítulo 3 · esteiras e drones ativos',   },
  { id: 'restored', label: 'Aurora Restaurada',sub: 'Final · o terreno virou parque',         },
];

function ScreenKeyArt() {
  const [scene, setScene] = useState_ka('twilight');
  return (
    <div data-screen-label="12 Key art" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0a0a14' }}>
      {/* Big cinematic illustration */}
      <KeyArt scene={scene} />

      {/* Top bar (minimal — over the art) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 56,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55), transparent)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 18,
        color: '#fff', zIndex: 5,
      }}>
        <button onClick={() => window.goTo('menu')} style={{ background: 'transparent', color: '#fff', border: 'none', fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em' }}>← SAIR</button>
        <span style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.3)' }} />
        <div className="f-mono" style={{ fontSize: 12, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.8)' }}>
          KEY ART · ARTE CONCEITUAL · 1920 × 1080
        </div>
      </div>

      {/* Caption block bottom-left */}
      <div style={{
        position: 'absolute', left: 60, bottom: 60, maxWidth: 540, zIndex: 5,
        color: '#fff',
      }}>
        <div style={{
          display: 'inline-block', background: 'rgba(28,22,14,0.85)', backdropFilter: 'blur(4px)',
          border: '3px solid var(--hazard)',
          padding: '6px 14px', borderRadius: 6,
          fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.18em',
          color: 'var(--hazard)', fontWeight: 700,
        }}>
          CAPÍTULO {scene === 'twilight' ? '01' : scene === 'midday' ? '03' : '08'}
        </div>
        <h1 className="f-display" style={{
          fontSize: 76, lineHeight: 0.95, margin: '14px 0 8px',
          color: '#fff',
          textShadow: '0 4px 0 #1c160e, 0 8px 30px rgba(0,0,0,0.6)',
        }}>
          {SCENES.find(s => s.id === scene).label}
        </h1>
        <div className="f-serif" style={{ fontSize: 24, color: 'rgba(255,255,255,0.92)', textShadow: '0 2px 8px rgba(0,0,0,0.6)', lineHeight: 1.25 }}>
          {SCENES.find(s => s.id === scene).sub}
        </div>
      </div>

      {/* Scene switcher bottom-right */}
      <div style={{
        position: 'absolute', right: 60, bottom: 60, zIndex: 5,
        display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end',
      }}>
        <div className="f-mono" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: '0.18em' }}>
          ── TIMELINE ──
        </div>
        {SCENES.map((s, i) => (
          <button key={s.id} onClick={() => setScene(s.id)} style={{
            background: scene === s.id ? 'var(--hazard)' : 'rgba(28,22,14,0.75)',
            color: scene === s.id ? 'var(--ink)' : '#fff',
            border: '3px solid var(--ink)', borderRadius: 10,
            padding: '10px 16px',
            fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer',
            letterSpacing: '0.06em',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: scene === s.id ? '0 5px 0 var(--ink)' : '0 3px 0 rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, opacity: 0.7 }}>{['I','II','III'][i]}</span>
            {s.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Stamp top-right */}
      <div style={{
        position: 'absolute', top: 80, right: 60, zIndex: 5,
        width: 140, height: 140, borderRadius: '50%',
        border: '4px solid var(--hazard)',
        background: 'rgba(28,22,14,0.5)',
        color: 'var(--hazard)', display: 'grid', placeItems: 'center',
        transform: 'rotate(-12deg)',
        fontFamily: 'Nunito', fontWeight: 900, fontSize: 14,
        textAlign: 'center', letterSpacing: '0.08em', lineHeight: 1.15,
        backdropFilter: 'blur(2px)',
      }}>
        CONCEPT<br/>v 0.4 · DRAFT<br/><span style={{ fontSize: 11, opacity: 0.7 }}>{scene === 'twilight' ? 'ATO I' : scene === 'midday' ? 'ATO II' : 'ATO III'}</span>
      </div>
    </div>
  );
}

/* ============================================================
   KEY ART — single big SVG composition (1920x1080)
   ============================================================ */
function KeyArt({ scene }) {
  return (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        {/* SKY GRADIENTS — twilight (orange/red) */}
        <linearGradient id="sky-twilight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b1d2a" />
          <stop offset="0.35" stopColor="#a8421b" />
          <stop offset="0.6" stopColor="#e87a1c" />
          <stop offset="0.85" stopColor="#f5b850" />
          <stop offset="1" stopColor="#e8a468" />
        </linearGradient>
        <radialGradient id="sun-twilight" cx="0.75" cy="0.65" r="0.4">
          <stop offset="0" stopColor="#fff2b0" stopOpacity="1" />
          <stop offset="0.3" stopColor="#ffd078" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffd078" stopOpacity="0" />
        </radialGradient>

        {/* SKY — midday industrial (smoggy yellow-brown) */}
        <linearGradient id="sky-midday" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a6a3a" />
          <stop offset="0.5" stopColor="#c2a460" />
          <stop offset="1" stopColor="#e2c884" />
        </linearGradient>

        {/* SKY — restored dawn (clean teal-pink) */}
        <linearGradient id="sky-restored" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e2a3a" />
          <stop offset="0.3" stopColor="#5a89a8" />
          <stop offset="0.6" stopColor="#f0a890" />
          <stop offset="0.85" stopColor="#ffd078" />
          <stop offset="1" stopColor="#a8d8c8" />
        </linearGradient>

        {/* Ground gradient */}
        <linearGradient id="ground-dirty" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a4426" />
          <stop offset="0.5" stopColor="#4a2d18" />
          <stop offset="1" stopColor="#2a180c" />
        </linearGradient>
        <linearGradient id="ground-restored" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a8a3a" />
          <stop offset="0.6" stopColor="#2a6b22" />
          <stop offset="1" stopColor="#1c4a16" />
        </linearGradient>

        {/* Trash mountain gradient */}
        <linearGradient id="mountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a88a5e" />
          <stop offset="0.4" stopColor="#7a5d3a" />
          <stop offset="1" stopColor="#3a2818" />
        </linearGradient>
        <linearGradient id="mountain-shadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(0,0,0,0.5)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </linearGradient>

        {/* atmospheric haze */}
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(232,180,108,0)" />
          <stop offset="1" stopColor="rgba(232,180,108,0.7)" />
        </linearGradient>
        <linearGradient id="haze-restored" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(168,216,200,0)" />
          <stop offset="1" stopColor="rgba(168,216,200,0.55)" />
        </linearGradient>

        {/* Noise filters removed — feTurbulence at 1920x1080 hangs the renderer */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* hazard band pattern */}
        <pattern id="hazard-band" width="60" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
          <rect width="60" height="20" fill="#f5c211" />
          <polygon points="0,0 30,0 0,20" fill="#1c160e" />
          <polygon points="30,0 60,0 30,20 0,20" fill="#1c160e" />
          <rect x="30" y="0" width="30" height="20" fill="#f5c211" />
        </pattern>
      </defs>

      {/* ============== SKY ============== */}
      <rect x="0" y="0" width="1920" height="700"
            fill={scene === 'twilight' ? 'url(#sky-twilight)' : scene === 'midday' ? 'url(#sky-midday)' : 'url(#sky-restored)'} />

      {/* Sun glow */}
      {scene === 'twilight' && <rect x="0" y="0" width="1920" height="800" fill="url(#sun-twilight)" />}
      {scene === 'midday' && <circle cx="1500" cy="280" r="100" fill="#ffe680" opacity="0.4" filter="url(#glow)" />}
      {scene === 'restored' && (
        <>
          <circle cx="1400" cy="340" r="80" fill="#ffe680" opacity="0.7" />
          <circle cx="1400" cy="340" r="140" fill="#ffd078" opacity="0.3" filter="url(#glow)" />
        </>
      )}

      {/* Birds / particles */}
      {scene === 'restored' && [
        [400, 280], [620, 240], [900, 200], [1180, 280], [380, 360],
      ].map(([x,y],i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.75">
          <path d="M -10 4 Q 0 -4 10 4 Q 0 0 -10 4 Z" fill="#1c160e" stroke="#1c160e" strokeWidth="2" />
        </g>
      ))}
      {scene === 'twilight' && [
        [500, 200], [820, 180], [1100, 220], [1340, 160], [1600, 220],
      ].map(([x,y],i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.6">
          <path d="M -8 3 Q 0 -3 8 3" fill="none" stroke="#1c160e" strokeWidth="2.5" />
        </g>
      ))}

      {/* ============== Distant smokestacks (atmospheric perspective) ============== */}
      {scene !== 'restored' && (
        <g opacity="0.55">
          {/* Smokestacks */}
          <g transform="translate(180 480)">
            <rect x="0" y="0" width="36" height="160" fill="#2a2a3a" />
            <rect x="-4" y="0" width="44" height="14" fill="#1c1c28" />
            <ellipse cx="18" cy="-10" rx="18" ry="14" fill="#7a6a5a" opacity="0.5" />
            <ellipse cx="22" cy="-40" rx="26" ry="20" fill="#7a6a5a" opacity="0.4" />
            <ellipse cx="14" cy="-80" rx="32" ry="22" fill="#7a6a5a" opacity="0.3" />
          </g>
          <g transform="translate(280 500)">
            <rect x="0" y="0" width="28" height="140" fill="#2a2a3a" />
            <rect x="-3" y="0" width="34" height="12" fill="#1c1c28" />
            <ellipse cx="14" cy="-12" rx="14" ry="10" fill="#7a6a5a" opacity="0.45" />
            <ellipse cx="18" cy="-40" rx="20" ry="14" fill="#7a6a5a" opacity="0.35" />
          </g>
          <g transform="translate(1500 470)">
            <rect x="0" y="0" width="40" height="170" fill="#2a2a3a" />
            <rect x="-4" y="0" width="48" height="14" fill="#1c1c28" />
            <ellipse cx="20" cy="-10" rx="20" ry="16" fill="#7a6a5a" opacity="0.45" />
            <ellipse cx="24" cy="-45" rx="28" ry="22" fill="#7a6a5a" opacity="0.35" />
            <ellipse cx="20" cy="-90" rx="36" ry="24" fill="#7a6a5a" opacity="0.25" />
          </g>
          <g transform="translate(1600 510)">
            <rect x="0" y="0" width="22" height="130" fill="#2a2a3a" />
          </g>
          <g transform="translate(1680 530)">
            <rect x="0" y="0" width="30" height="120" fill="#2a2a3a" />
          </g>
        </g>
      )}

      {/* Distant hills */}
      <path d={scene === 'restored'
        ? "M 0 620 Q 240 540 480 580 Q 720 520 960 570 Q 1200 510 1440 580 Q 1680 540 1920 590 L 1920 720 L 0 720 Z"
        : "M 0 620 Q 240 580 480 610 Q 720 570 960 600 Q 1200 560 1440 610 Q 1680 580 1920 610 L 1920 720 L 0 720 Z"}
            fill={scene === 'restored' ? '#3a6a4a' : '#3a2818'} opacity="0.65" />

      {/* ============== HAZE LAYER ============== */}
      <rect x="0" y="500" width="1920" height="240" fill={scene === 'restored' ? 'url(#haze-restored)' : 'url(#haze)'} />

      {/* ============== BIG TRASH MOUNTAIN (main subject) ============== */}
      {scene !== 'restored' && <TrashMountain scene={scene} />}
      {scene === 'restored' && <RestoredPark />}

      {/* ============== GROUND ============== */}
      <path d="M 0 720 L 1920 720 L 1920 1080 L 0 1080 Z"
            fill={scene === 'restored' ? 'url(#ground-restored)' : 'url(#ground-dirty)'} />

      {/* Ground texture detail — puddles / cracks */}
      {scene !== 'restored' && (
        <g opacity="0.55">
          <ellipse cx="380" cy="820" rx="120" ry="20" fill="#1c1208" />
          <ellipse cx="380" cy="820" rx="80" ry="12" fill="#3a2818" />
          <ellipse cx="1480" cy="900" rx="160" ry="24" fill="#1c1208" />
          <ellipse cx="1480" cy="900" rx="110" ry="14" fill="#3a2818" />
          <path d="M 800 850 L 820 870 L 870 860 L 900 880" stroke="#1c1208" strokeWidth="3" fill="none" opacity="0.5" />
          <path d="M 1200 820 L 1220 850 L 1280 840" stroke="#1c1208" strokeWidth="3" fill="none" opacity="0.5" />
        </g>
      )}

      {/* hazard tape banner along ground edge */}
      {scene !== 'restored' && (
        <g transform="translate(0 740)">
          <rect width="1920" height="18" fill="url(#hazard-band)" opacity="0.85" />
        </g>
      )}

      {/* ============== ROBOTS & MACHINERY (midground) ============== */}
      {scene === 'midday' && <MachineryLayer />}
      {scene === 'twilight' && <LoneRobot />}
      {scene === 'restored' && <RestoredObjects />}

      {/* ============== FOREGROUND CHARACTER ============== */}
      <Character scene={scene} />

      {/* ============== FOREGROUND TRASH DEBRIS ============== */}
      {scene !== 'restored' && <ForegroundDebris />}

      {/* ============== HUGE INDUSTRIAL BIN/CRATE in foreground ============== */}
      {scene === 'midday' && <ForegroundBin />}
      {scene === 'restored' && <ForegroundRestored />}

      {/* Volumetric light rays from sun */}
      {scene === 'twilight' && (
        <g opacity="0.18" style={{ mixBlendMode: 'screen' }}>
          <polygon points="1500,300 1920,200 1920,1080 800,1080" fill="#ffd078" />
        </g>
      )}
      {scene === 'restored' && (
        <g opacity="0.22" style={{ mixBlendMode: 'screen' }}>
          <polygon points="1400,340 1700,260 1920,400 1920,1080 1100,1080" fill="#ffd078" />
        </g>
      )}

      {/* Vignette */}
      <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.7">
        <stop offset="0.6" stopColor="rgba(0,0,0,0)" />
        <stop offset="1" stopColor="rgba(0,0,0,0.55)" />
      </radialGradient>
      <rect x="0" y="0" width="1920" height="1080" fill="url(#vignette)" />

      {/* Grain via fixed CSS noise pattern instead of expensive feTurbulence */}
    </svg>
  );
}

/* ===== TRASH MOUNTAIN ===== */
function TrashMountain({ scene }) {
  return (
    <g>
      {/* Background mountain (huge) */}
      <path d="M -100 720 L 200 520 L 420 580 L 700 380 L 980 480 L 1240 320 L 1500 460 L 1760 380 L 2020 520 L 2020 720 Z"
            fill="url(#mountain)" />
      {/* shadow side */}
      <path d="M 700 380 L 980 480 L 1240 320 L 1500 460 L 1760 380 L 2020 520 L 2020 720 L 1000 720 Z"
            fill="url(#mountain-shadow)" opacity="0.4" />

      {/* Trash detritus on mountain — silhouettes */}
      <g opacity="0.9">
        {/* drum */}
        <g transform="translate(280 540)">
          <rect x="-18" y="-28" width="36" height="48" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
          <ellipse cx="0" cy="-28" rx="18" ry="5" fill="#4a2d18" />
          <rect x="-18" y="-6" width="36" height="3" fill="#3a2818" />
        </g>
        {/* car frame */}
        <g transform="translate(820 410)">
          <path d="M -56 0 L -40 -22 L 38 -22 L 60 0 L 60 16 L -56 16 Z" fill="#3a2818" stroke="#1c160e" strokeWidth="2.5" />
          <circle cx="-30" cy="18" r="10" fill="#1c160e" />
          <circle cx="34" cy="18" r="10" fill="#1c160e" />
        </g>
        {/* fridge */}
        <g transform="translate(1080 420)">
          <rect x="-22" y="-44" width="44" height="60" fill="#a8a098" stroke="#1c160e" strokeWidth="2.5" />
          <line x1="-22" y1="-14" x2="22" y2="-14" stroke="#1c160e" strokeWidth="2" />
          <circle cx="14" cy="-30" r="2" fill="#1c160e" />
        </g>
        {/* tire stack */}
        <g transform="translate(1400 440)">
          <ellipse cx="0" cy="0" rx="32" ry="10" fill="#1c1208" stroke="#1c160e" strokeWidth="2" />
          <ellipse cx="0" cy="-14" rx="32" ry="10" fill="#1c1208" stroke="#1c160e" strokeWidth="2" />
          <ellipse cx="0" cy="-28" rx="32" ry="10" fill="#2a1c0e" stroke="#1c160e" strokeWidth="2" />
        </g>
        {/* tv */}
        <g transform="translate(560 560)">
          <rect x="-22" y="-22" width="44" height="34" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
          <rect x="-16" y="-16" width="32" height="22" fill="#1c160e" />
        </g>
        {/* boxes */}
        <g transform="translate(450 600)">
          <rect x="-22" y="-16" width="44" height="22" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
        </g>
        <g transform="translate(180 620)">
          <rect x="-28" y="-20" width="56" height="30" fill="#7a5d3a" stroke="#1c160e" strokeWidth="2.5" />
          <line x1="0" y1="-20" x2="0" y2="10" stroke="#1c160e" strokeWidth="1.5" opacity="0.5" />
        </g>
        <g transform="translate(1240 380)">
          <rect x="-22" y="-16" width="44" height="22" fill="#7a5d3a" stroke="#1c160e" strokeWidth="2" />
        </g>
        {/* shopping cart */}
        <g transform="translate(1600 460)">
          <rect x="-18" y="-22" width="36" height="22" fill="none" stroke="#1c160e" strokeWidth="2" />
          <line x1="-18" y1="-12" x2="18" y2="-12" stroke="#1c160e" strokeWidth="1.5" />
          <line x1="-10" y1="-22" x2="-10" y2="0" stroke="#1c160e" strokeWidth="1.5" />
          <line x1="0" y1="-22" x2="0" y2="0" stroke="#1c160e" strokeWidth="1.5" />
          <line x1="10" y1="-22" x2="10" y2="0" stroke="#1c160e" strokeWidth="1.5" />
          <circle cx="-14" cy="4" r="4" fill="#1c160e" />
          <circle cx="14" cy="4" r="4" fill="#1c160e" />
        </g>
        {/* pile silhouettes — bottles, cans */}
        {[[80, 660], [340, 660], [600, 680], [900, 620], [1180, 640], [1500, 670], [1800, 660]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="6" fill="#1c1208" opacity="0.7" />
            <rect x="-8" y="-12" width="4" height="10" fill="#3a2818" />
            <rect x="2" y="-8" width="6" height="6" fill="#3a2818" />
          </g>
        ))}
      </g>

      {/* flies cloud */}
      {scene === 'twilight' && (
        <g opacity="0.4">
          {Array.from({length: 40}).map((_,i) => {
            const x = 700 + Math.sin(i*0.7)*200 + i*8;
            const y = 380 + Math.cos(i*0.9)*120;
            return <circle key={i} cx={x} cy={y} r="1.5" fill="#1c160e" />;
          })}
        </g>
      )}

      {/* Smoke from far stack of mountain (smouldering) */}
      <g opacity="0.5">
        <ellipse cx="700" cy="370" rx="40" ry="20" fill="#5a4a3a" />
        <ellipse cx="720" cy="340" rx="50" ry="26" fill="#5a4a3a" opacity="0.8" />
        <ellipse cx="700" cy="300" rx="60" ry="30" fill="#5a4a3a" opacity="0.6" />
        <ellipse cx="680" cy="260" rx="70" ry="32" fill="#5a4a3a" opacity="0.4" />
      </g>
    </g>
  );
}

/* ===== MACHINERY LAYER (Capítulo 3) ===== */
function MachineryLayer() {
  return (
    <g>
      {/* Conveyor belt running along the foot of the mountain */}
      <g transform="translate(180 660)">
        {/* belt */}
        <rect x="0" y="0" width="1600" height="22" fill="#1c160e" />
        <rect x="0" y="0" width="1600" height="22" fill="url(#hazard-band)" opacity="0.18" />
        {/* legs */}
        {[100, 350, 600, 850, 1100, 1350, 1500].map(x => (
          <g key={x}>
            <rect x={x} y="22" width="14" height="50" fill="#3a3835" stroke="#1c160e" strokeWidth="2" />
            <rect x={x-4} y="22" width="22" height="6" fill="#1c160e" />
          </g>
        ))}
      </g>
      {/* Big classifier robot on conveyor */}
      <g transform="translate(700 540)">
        <rect x="0" y="0" width="160" height="120" rx="14" fill="#3a8de0" stroke="#1c160e" strokeWidth="4" />
        <rect x="0" y="0" width="160" height="30" fill="#1c160e" />
        <rect x="20" y="40" width="120" height="40" fill="#1c160e" stroke="#1c160e" strokeWidth="2" />
        <rect x="28" y="48" width="104" height="24" fill="#7ec850" />
        <circle cx="56" cy="60" r="6" fill="#fff" />
        <circle cx="104" cy="60" r="6" fill="#fff" />
        {/* arm grabbing trash */}
        <line x1="160" y1="50" x2="220" y2="80" stroke="#1c160e" strokeWidth="6" />
        <rect x="216" y="74" width="14" height="14" fill="#3a8de0" stroke="#1c160e" strokeWidth="3" />
        {/* antenna */}
        <line x1="80" y1="0" x2="80" y2="-20" stroke="#1c160e" strokeWidth="4" />
        <circle cx="80" cy="-22" r="5" fill="#d23636" stroke="#1c160e" strokeWidth="2" />
      </g>

      {/* Crane lifting on the mountain */}
      <g transform="translate(1240 240)">
        <rect x="-6" y="0" width="12" height="200" fill="#f0b315" stroke="#1c160e" strokeWidth="3" />
        <rect x="-50" y="0" width="100" height="18" fill="#f0b315" stroke="#1c160e" strokeWidth="3" />
        {/* arm */}
        <rect x="40" y="-4" width="140" height="14" fill="#f0b315" stroke="#1c160e" strokeWidth="3" />
        {/* cable */}
        <line x1="170" y1="14" x2="170" y2="130" stroke="#1c160e" strokeWidth="2.5" />
        {/* magnet */}
        <path d="M 150 130 L 190 130 L 200 160 L 140 160 Z" fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
        {/* attracted bits */}
        <rect x="148" y="166" width="14" height="14" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
        <rect x="166" y="168" width="10" height="12" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
        <rect x="180" y="166" width="12" height="14" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
      </g>

      {/* Drones overhead */}
      <g transform="translate(420 280)">
        <DroneIllo />
      </g>
      <g transform="translate(1100 220)" style={{ opacity: 0.85 }}>
        <DroneIllo scale={0.7} />
      </g>
      <g transform="translate(1500 320)" style={{ opacity: 0.7 }}>
        <DroneIllo scale={0.6} />
      </g>

      {/* Caminhão / dump truck on left */}
      <g transform="translate(80 600)">
        <rect x="0" y="0" width="100" height="60" fill="#d23636" stroke="#1c160e" strokeWidth="4" />
        <rect x="-44" y="20" width="44" height="40" fill="#7a3030" stroke="#1c160e" strokeWidth="4" />
        <rect x="-38" y="26" width="32" height="24" fill="#5fc8ff" stroke="#1c160e" strokeWidth="2.5" />
        <circle cx="-20" cy="62" r="14" fill="#1c160e" />
        <circle cx="40" cy="62" r="14" fill="#1c160e" />
        <circle cx="80" cy="62" r="14" fill="#1c160e" />
        <circle cx="-20" cy="62" r="6" fill="#3a3835" />
        <circle cx="40" cy="62" r="6" fill="#3a3835" />
        <circle cx="80" cy="62" r="6" fill="#3a3835" />
      </g>
    </g>
  );
}

function DroneIllo({ scale = 1 }) {
  return (
    <g transform={`scale(${scale})`}>
      <ellipse cx="0" cy="50" rx="40" ry="6" fill="rgba(0,0,0,0.3)" />
      <line x1="0" y1="0" x2="-44" y2="-16" stroke="#1c160e" strokeWidth="5" />
      <line x1="0" y1="0" x2="44" y2="-16" stroke="#1c160e" strokeWidth="5" />
      <line x1="0" y1="0" x2="-44" y2="16" stroke="#1c160e" strokeWidth="5" />
      <line x1="0" y1="0" x2="44" y2="16" stroke="#1c160e" strokeWidth="5" />
      <ellipse cx="-44" cy="-16" rx="24" ry="3" fill="#9aa0a6" opacity="0.7" />
      <ellipse cx="44" cy="-16" rx="24" ry="3" fill="#9aa0a6" opacity="0.7" />
      <ellipse cx="-44" cy="16" rx="24" ry="3" fill="#9aa0a6" opacity="0.7" />
      <ellipse cx="44" cy="16" rx="24" ry="3" fill="#9aa0a6" opacity="0.7" />
      <rect x="-22" y="-10" width="44" height="22" rx="6" fill="#3a5a7a" stroke="#1c160e" strokeWidth="3" />
      <circle cx="0" cy="14" r="6" fill="#1c160e" />
      <circle cx="0" cy="14" r="3" fill="#d23636" />
      {/* searchlight beam down */}
      <path d="M -8 18 L 8 18 L 30 60 L -30 60 Z" fill="#ffe680" opacity="0.25" />
    </g>
  );
}

/* ===== Twilight: lone robot on the side ===== */
function LoneRobot() {
  return (
    <g transform="translate(1400 690)">
      <ellipse cx="0" cy="58" rx="56" ry="6" fill="rgba(0,0,0,0.45)" />
      <rect x="-50" y="22" width="100" height="36" rx="8" fill="#1c160e" />
      <circle cx="-30" cy="55" r="6" fill="#3a3835" stroke="#1c160e" strokeWidth="2" />
      <circle cx="0" cy="55" r="6" fill="#3a3835" stroke="#1c160e" strokeWidth="2" />
      <circle cx="30" cy="55" r="6" fill="#3a3835" stroke="#1c160e" strokeWidth="2" />
      <rect x="-42" y="-30" width="84" height="56" rx="10" fill="#f0b315" stroke="#1c160e" strokeWidth="4" />
      <rect x="-42" y="-30" width="84" height="14" rx="10" fill="#1c160e" />
      <rect x="-30" y="-10" width="60" height="24" rx="5" fill="#1c160e" stroke="#1c160e" strokeWidth="2" />
      <rect x="-26" y="-6" width="52" height="16" fill="#d23636" />
      <circle cx="-12" cy="2" r="3" fill="#fff" />
      <circle cx="12" cy="2" r="3" fill="#fff" />
      <line x1="0" y1="-30" x2="0" y2="-46" stroke="#1c160e" strokeWidth="4" />
      <circle cx="0" cy="-48" r="5" fill="#d23636" stroke="#1c160e" strokeWidth="2" />
    </g>
  );
}

/* ===== FOREGROUND CHARACTER (the worker — small for scale) ===== */
function Character({ scene }) {
  // Scaled small to convey size of the mountain
  return (
    <g transform="translate(360 880)">
      {/* shadow */}
      <ellipse cx="0" cy="92" rx="42" ry="6" fill="rgba(0,0,0,0.5)" />
      {/* legs */}
      <rect x="-14" y="20" width="12" height="64" fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
      <rect x="2" y="20" width="12" height="64" fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
      <rect x="-18" y="78" width="20" height="14" rx="2" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      <rect x="-2" y="78" width="20" height="14" rx="2" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      {/* hi-vis vest body */}
      <path d="M -28 -22 L -32 30 L 32 30 L 28 -22 L 18 -32 L -18 -32 Z"
            fill={scene === 'restored' ? '#7ec850' : '#f5c211'}
            stroke="#1c160e" strokeWidth="3.5" />
      {/* vest reflective stripes */}
      <rect x="-32" y="-4" width="64" height="6" fill="#cfd9e0" stroke="#1c160e" strokeWidth="1.5" />
      <rect x="-32" y="10" width="64" height="6" fill="#cfd9e0" stroke="#1c160e" strokeWidth="1.5" />
      {/* arms */}
      <rect x="-40" y="-22" width="14" height="40" rx="6" fill={scene === 'restored' ? '#5a8a3a' : '#c89d0c'} stroke="#1c160e" strokeWidth="3" />
      <rect x="26" y="-22" width="14" height="46" rx="6" fill={scene === 'restored' ? '#5a8a3a' : '#c89d0c'} stroke="#1c160e" strokeWidth="3" />
      {/* hand carrying a trash bag */}
      <g transform="translate(38 20)">
        <path d="M -10 0 Q -10 -8 0 -8 Q 10 -8 10 0 L 14 22 Q 14 30 -14 30 L -14 22 Z"
              fill={scene === 'restored' ? '#5a8a3a' : '#1c160e'}
              stroke="#1c160e" strokeWidth="2.5" />
        <line x1="-2" y1="-8" x2="-2" y2="-14" stroke="#1c160e" strokeWidth="2" />
        <line x1="2" y1="-8" x2="2" y2="-14" stroke="#1c160e" strokeWidth="2" />
      </g>
      {/* head */}
      <circle cx="0" cy="-46" r="22" fill="#d9a878" stroke="#1c160e" strokeWidth="3.5" />
      {/* eye + face */}
      <circle cx="-6" cy="-48" r="2" fill="#1c160e" />
      <circle cx="8" cy="-48" r="2" fill="#1c160e" />
      <path d="M -4 -40 Q 0 -36 4 -40" fill="none" stroke="#1c160e" strokeWidth="2" strokeLinecap="round" />
      {/* hard hat */}
      <path d="M -26 -54 Q -26 -76 0 -76 Q 26 -76 26 -54 Z"
            fill={scene === 'restored' ? '#7ec850' : '#f5c211'}
            stroke="#1c160e" strokeWidth="3.5" />
      <rect x="-26" y="-56" width="52" height="6" fill={scene === 'restored' ? '#5a8a3a' : '#c89d0c'} stroke="#1c160e" strokeWidth="2.5" />
      {/* hat lamp */}
      <rect x="-5" y="-78" width="10" height="6" fill="#3a3835" stroke="#1c160e" strokeWidth="2" />
      <circle cx="0" cy="-72" r="2" fill="#ffe680" />
    </g>
  );
}

/* ===== Foreground debris ===== */
function ForegroundDebris() {
  return (
    <g>
      {/* tire foreground */}
      <g transform="translate(120 980)">
        <ellipse cx="0" cy="2" rx="44" ry="6" fill="rgba(0,0,0,0.5)" />
        <circle r="42" fill="#1c1208" stroke="#1c160e" strokeWidth="4" />
        <circle r="18" fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
      </g>
      {/* spilled drum */}
      <g transform="translate(900 980) rotate(-12)">
        <rect x="-30" y="-22" width="60" height="44" fill="#5a3a1a" stroke="#1c160e" strokeWidth="3" />
        <ellipse cx="-30" cy="0" rx="6" ry="22" fill="#3a2818" stroke="#1c160e" strokeWidth="3" />
        {/* slime puddle */}
        <ellipse cx="-60" cy="24" rx="30" ry="6" fill="#3a4a1a" opacity="0.7" />
        <ellipse cx="-50" cy="22" rx="22" ry="4" fill="#5a6a2a" opacity="0.8" />
      </g>
      {/* scattered bottles */}
      <g transform="translate(700 1020)">
        <rect x="-6" y="-16" width="12" height="22" rx="3" fill="#c7e7ff" stroke="#1c160e" strokeWidth="2" opacity="0.85" />
        <rect x="-3" y="-22" width="6" height="6" fill="#3b8de0" stroke="#1c160e" strokeWidth="2" />
      </g>
      <g transform="translate(740 1030) rotate(50)">
        <rect x="-6" y="-14" width="12" height="20" rx="3" fill="#f0d878" stroke="#1c160e" strokeWidth="2" />
      </g>
      <g transform="translate(1250 1010)">
        <rect x="-10" y="-12" width="20" height="22" fill="#e84444" stroke="#1c160e" strokeWidth="2.5" />
      </g>
      <g transform="translate(1320 1030) rotate(20)">
        <rect x="-14" y="-9" width="28" height="14" fill="#7a5d3a" stroke="#1c160e" strokeWidth="2.5" />
      </g>
      <g transform="translate(580 1010)">
        <path d="M -16 0 Q -16 -12 0 -12 Q 16 -12 16 0 L 14 8 L -14 8 Z" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
      </g>
      {/* foreground paper scraps */}
      {[[300, 990], [480, 1040], [820, 1050], [1050, 1000], [1150, 1050], [1700, 990], [1820, 1030]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="16" height="20" fill="#fffaea" stroke="#1c160e" strokeWidth="1.5"
              transform={`rotate(${(i*23) % 90} ${x+8} ${y+10})`} opacity="0.85" />
      ))}
    </g>
  );
}

function ForegroundBin() {
  return (
    <g transform="translate(1600 900)">
      {/* shadow */}
      <ellipse cx="0" cy="120" rx="100" ry="10" fill="rgba(0,0,0,0.5)" />
      {/* a giant industrial container */}
      <rect x="-100" y="-80" width="200" height="200" fill="#2b6cb0" stroke="#1c160e" strokeWidth="6" />
      <rect x="-100" y="-80" width="200" height="200" fill="url(#hazard-band)" opacity="0.06" />
      <rect x="-110" y="-92" width="220" height="20" fill="#1f4e85" stroke="#1c160e" strokeWidth="6" />
      <rect x="-90" y="-30" width="180" height="60" fill="#fffaea" stroke="#1c160e" strokeWidth="4" />
      <text x="0" y="10" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="44" fill="#2b6cb0">PAPEL</text>
      {/* recycle symbol */}
      <g transform="translate(0 70) scale(1)">
        <circle r="22" fill="none" stroke="#fffaea" strokeWidth="4" />
        <path d="M -10 -2 L -4 -11 L 2 -11" fill="none" stroke="#fffaea" strokeWidth="4" strokeLinecap="round" />
        <path d="M 1 -10 L 11 -6 L 13 0" fill="none" stroke="#fffaea" strokeWidth="4" strokeLinecap="round" />
        <path d="M 10 4 L 4 13 L -2 13" fill="none" stroke="#fffaea" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* fill bar */}
      <rect x="-100" y="60" width="200" height="14" fill="#1f4e85" stroke="#1c160e" strokeWidth="3" />
      <rect x="-100" y="60" width="170" height="14" fill="#7ec850" stroke="#1c160e" strokeWidth="3" />
    </g>
  );
}

/* ===== Restored variants ===== */
function RestoredPark() {
  return (
    <g>
      {/* gentle green hills where mountain was */}
      <path d="M -100 720 L 200 660 L 480 620 L 760 580 L 1080 600 L 1380 560 L 1680 580 L 2020 620 L 2020 720 Z"
            fill="url(#ground-restored)" />
      {/* trees on hills */}
      {[[160, 640], [380, 600], [620, 560], [880, 540], [1180, 560], [1480, 540], [1740, 560]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${1.2 - (i%3)*0.15})`}>
          <rect x="-6" y="0" width="12" height="40" fill="#6b4523" stroke="#1c160e" strokeWidth="2.5" />
          <ellipse cx="0" cy="-12" rx="30" ry="28" fill="#4a8a3a" stroke="#1c160e" strokeWidth="3" />
          <ellipse cx="-12" cy="-22" rx="14" ry="10" fill="#6ab04a" />
          <ellipse cx="10" cy="-18" rx="14" ry="10" fill="#6ab04a" />
        </g>
      ))}
      {/* solar panels in distance */}
      <g transform="translate(80 660)" opacity="0.85">
        <rect x="0" y="0" width="80" height="24" fill="#3a5a7a" stroke="#1c160e" strokeWidth="3" />
        <line x1="20" y1="0" x2="20" y2="24" stroke="#1c160e" strokeWidth="1.5" />
        <line x1="40" y1="0" x2="40" y2="24" stroke="#1c160e" strokeWidth="1.5" />
        <line x1="60" y1="0" x2="60" y2="24" stroke="#1c160e" strokeWidth="1.5" />
        <rect x="38" y="24" width="4" height="20" fill="#3a3835" />
      </g>
      <g transform="translate(190 660)" opacity="0.85">
        <rect x="0" y="0" width="80" height="24" fill="#3a5a7a" stroke="#1c160e" strokeWidth="3" />
        <rect x="38" y="24" width="4" height="20" fill="#3a3835" />
      </g>
      {/* wind turbines */}
      <g transform="translate(1700 360)" opacity="0.85">
        <rect x="-3" y="0" width="6" height="240" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
        <circle cy="0" r="4" fill="#1c160e" />
        <path d="M 0 0 L 60 -10 L 56 4 Z" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
        <path d="M 0 0 L -32 -50 L -38 -34 Z" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
        <path d="M 0 0 L -30 50 L -16 56 Z" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
      </g>
      <g transform="translate(1820 380)" opacity="0.75">
        <rect x="-2" y="0" width="4" height="200" fill="#fffaea" stroke="#1c160e" strokeWidth="2" />
        <circle cy="0" r="3" fill="#1c160e" />
        <path d="M 0 0 L 44 -8 Z" stroke="#1c160e" strokeWidth="3" />
        <path d="M 0 0 L -22 -38 Z" stroke="#1c160e" strokeWidth="3" />
        <path d="M 0 0 L -22 38 Z" stroke="#1c160e" strokeWidth="3" />
      </g>
      {/* small lake */}
      <ellipse cx="900" cy="710" rx="180" ry="20" fill="#5fc8ff" opacity="0.55" />
      <ellipse cx="900" cy="708" rx="140" ry="14" fill="#7fd6ff" opacity="0.6" />
    </g>
  );
}

function RestoredObjects() {
  return (
    <g>
      {/* far flowers */}
      {[[280, 880], [620, 920], [1080, 880], [1380, 920], [1620, 880]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x} ${y})`} opacity="0.85">
          <rect x="-2" y="0" width="4" height="22" fill="#4a8a3a" />
          <circle cx="0" cy="-2" r="6" fill="#ffba2e" stroke="#1c160e" strokeWidth="1.5" />
          <circle cx="0" cy="-2" r="2.5" fill="#e94e9b" stroke="#1c160e" strokeWidth="1" />
        </g>
      ))}
      {/* benches */}
      <g transform="translate(1080 880)">
        <rect x="-40" y="0" width="80" height="6" fill="#8a6a3e" stroke="#1c160e" strokeWidth="2.5" />
        <rect x="-36" y="6" width="4" height="14" fill="#8a6a3e" stroke="#1c160e" strokeWidth="2" />
        <rect x="32" y="6" width="4" height="14" fill="#8a6a3e" stroke="#1c160e" strokeWidth="2" />
      </g>
      {/* drone scanning, happy */}
      <g transform="translate(680 380)" opacity="0.9">
        <DroneIllo scale={0.85} />
      </g>
    </g>
  );
}

function ForegroundRestored() {
  return (
    <g>
      {/* fancy proper bins as foreground anchor */}
      <g transform="translate(1640 900)">
        <ellipse cx="0" cy="120" rx="90" ry="9" fill="rgba(0,0,0,0.4)" />
        {/* 3 bins in a row, recycling station */}
        <g transform="translate(-100 0)">
          <rect x="-30" y="-60" width="60" height="160" rx="6" fill="#2b6cb0" stroke="#1c160e" strokeWidth="4" />
          <rect x="-34" y="-72" width="68" height="18" rx="4" fill="#1f4e85" stroke="#1c160e" strokeWidth="4" />
          <circle cx="0" cy="20" r="14" fill="#fffaea" stroke="#1c160e" strokeWidth="3" />
        </g>
        <g transform="translate(0 0)">
          <rect x="-30" y="-60" width="60" height="160" rx="6" fill="#d23636" stroke="#1c160e" strokeWidth="4" />
          <rect x="-34" y="-72" width="68" height="18" rx="4" fill="#962222" stroke="#1c160e" strokeWidth="4" />
          <circle cx="0" cy="20" r="14" fill="#fffaea" stroke="#1c160e" strokeWidth="3" />
        </g>
        <g transform="translate(100 0)">
          <rect x="-30" y="-60" width="60" height="160" rx="6" fill="#2f8f3f" stroke="#1c160e" strokeWidth="4" />
          <rect x="-34" y="-72" width="68" height="18" rx="4" fill="#1f6428" stroke="#1c160e" strokeWidth="4" />
          <circle cx="0" cy="20" r="14" fill="#fffaea" stroke="#1c160e" strokeWidth="3" />
        </g>
      </g>
      {/* foreground flowers + grass */}
      <g>
        {[[100, 1010], [250, 990], [420, 1020], [580, 1000], [720, 1030], [900, 990], [1080, 1020], [1240, 1000]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d={`M -8 30 Q -4 0 -2 30 M 0 30 Q 2 0 4 30 M 6 30 Q 10 0 12 30`}
                  stroke="#4a8a3a" strokeWidth="2" fill="none" />
            {i % 2 === 0 && (
              <>
                <rect x="-1" y="14" width="2" height="16" fill="#4a8a3a" />
                <circle cx="0" cy="12" r="5" fill={['#ffba2e','#e94e9b','#9c5fd0','#5fc8ff'][i%4]} stroke="#1c160e" strokeWidth="1.5" />
              </>
            )}
          </g>
        ))}
      </g>
    </g>
  );
}

window.ScreenKeyArt = ScreenKeyArt;
// Export scene components for reuse in the trailer
window.KA_TrashMountain = TrashMountain;
window.KA_MachineryLayer = MachineryLayer;
window.KA_LoneRobot = LoneRobot;
window.KA_Character = Character;
window.KA_ForegroundDebris = ForegroundDebris;
window.KA_ForegroundBin = ForegroundBin;
window.KA_RestoredPark = RestoredPark;
window.KA_RestoredObjects = RestoredObjects;
window.KA_ForegroundRestored = ForegroundRestored;
window.KA_DroneIllo = DroneIllo;
