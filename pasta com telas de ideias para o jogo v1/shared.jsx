/* global React */
// shared.jsx — SVG art + reusable UI atoms for all screens

const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
   CONAMA 275 bin data
   ========================================================= */
const BINS = [
  { id: 'azul',     name: 'Papel',      pt: 'AZUL',     hex: '#2b6cb0', dark: '#1f4e85' },
  { id: 'vermelho', name: 'Plástico',   pt: 'VERMELHA', hex: '#d23636', dark: '#962222' },
  { id: 'verde',    name: 'Vidro',      pt: 'VERDE',    hex: '#2f8f3f', dark: '#1f6428' },
  { id: 'amarelo',  name: 'Metal',      pt: 'AMARELA',  hex: '#f0b315', dark: '#b8830a' },
  { id: 'marrom',   name: 'Orgânico',   pt: 'MARROM',   hex: '#6a4326', dark: '#4a2d18' },
  { id: 'laranja',  name: 'Perigoso',   pt: 'LARANJA',  hex: '#e07a1f', dark: '#a85510' },
  { id: 'cinza',    name: 'Rejeito',    pt: 'CINZA',    hex: '#6d6a64', dark: '#3a3835' },
];

/* =========================================================
   SVG bin (icônico, com tampa + símbolo de reciclagem)
   ========================================================= */
function BinSVG({ color, dark, size = 110, lidOpen = false }) {
  return (
    <svg viewBox="0 0 160 200" width={size} height={size * 1.25} style={{ overflow: 'visible' }}>
      <ellipse cx="80" cy="195" rx="60" ry="6" fill="rgba(0,0,0,0.22)" />
      <path d="M 30 50 L 38 190 Q 38 195 44 195 L 116 195 Q 122 195 122 190 L 130 50 Z"
            fill={color} stroke="#1c160e" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 105 50 L 122 50 L 116 195 Q 122 195 122 190 L 130 50 Z" fill={dark} opacity="0.55" />
      <path d="M 55 60 L 60 188" stroke={dark} strokeWidth="2.5" opacity="0.45" fill="none" />
      <path d="M 80 60 L 80 188" stroke={dark} strokeWidth="2.5" opacity="0.45" fill="none" />
      <path d="M 105 60 L 100 188" stroke={dark} strokeWidth="2.5" opacity="0.45" fill="none" />
      <circle cx="80" cy="115" r="22" fill="#fff" stroke="#1c160e" strokeWidth="3" />
      <g transform="translate(80 115)" stroke={dark} strokeWidth="2.5" fill={color} strokeLinejoin="round">
        <path d="M -10 -2 L -4 -11 L 2 -11 L -1 -16 L -12 -16 L -16 -8 Z" />
        <path d="M 1 -10 L 11 -6 L 13 0 L 18 -3 L 16 -13 L 7 -16 Z" />
        <path d="M 10 4 L 4 13 L -2 13 L 1 18 L 12 18 L 16 10 Z" />
      </g>
      <rect x="22" y="42" width="116" height="16" rx="4" fill={dark} stroke="#1c160e" strokeWidth="4" />
      <g style={{ transformOrigin: '90% 100%', transform: lidOpen ? 'rotate(-26deg) translate(-4px, -2px)' : 'none', transition: 'transform .3s cubic-bezier(.5,1.6,.3,1)' }}>
        <rect x="18" y="28" width="124" height="18" rx="6" fill={color} stroke="#1c160e" strokeWidth="4" />
        <rect x="68" y="20" width="24" height="10" rx="4" fill={dark} stroke="#1c160e" strokeWidth="3" />
      </g>
    </svg>
  );
}

/* =========================================================
   Lixo / itens
   ========================================================= */
function BottleSVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <rect x="48" y="6" width="24" height="14" rx="3" fill="#3b8de0" stroke="#1c160e" strokeWidth="3" />
      <path d="M 52 20 L 52 32 Q 42 38 42 52 L 42 100 Q 42 112 54 112 L 66 112 Q 78 112 78 100 L 78 52 Q 78 38 68 32 L 68 20 Z"
            fill="#c7e7ff" stroke="#1c160e" strokeWidth="3" strokeLinejoin="round" />
      <rect x="48" y="26" width="24" height="4" fill="#a3d4f5" stroke="#1c160e" strokeWidth="2" />
      <rect x="44" y="62" width="32" height="24" fill="#fff" stroke="#1c160e" strokeWidth="2.5" />
      <line x1="48" y1="70" x2="72" y2="70" stroke="#6b5c46" strokeWidth="2" />
      <line x1="48" y1="76" x2="68" y2="76" stroke="#6b5c46" strokeWidth="2" />
      <path d="M 48 40 Q 46 70, 50 100" fill="none" stroke="#fff" strokeWidth="3" opacity="0.8" />
    </svg>
  );
}
function PaperBallSVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <defs>
        <radialGradient id="pg2" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f4ecd6" />
          <stop offset="100%" stopColor="#d9c99a" />
        </radialGradient>
      </defs>
      <path d="M 60 8 C 80 6, 100 20, 108 38 C 116 56, 112 80, 96 96 C 80 112, 52 116, 32 104 C 12 92, 6 70, 12 50 C 18 30, 38 10, 60 8 Z"
            fill="url(#pg2)" stroke="#1c160e" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 30 40 L 50 32 L 64 48 L 56 62 L 38 60 Z" fill="none" stroke="#4a3a28" strokeWidth="2" opacity="0.5" />
      <path d="M 70 28 L 90 36 L 96 56 L 80 64 L 68 50 Z" fill="none" stroke="#4a3a28" strokeWidth="2" opacity="0.5" />
      <ellipse cx="42" cy="32" rx="10" ry="6" fill="#fff" opacity="0.7" />
    </svg>
  );
}
function CanSVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <ellipse cx="60" cy="20" rx="22" ry="6" fill="#d9d9d9" stroke="#1c160e" strokeWidth="3" />
      <ellipse cx="60" cy="19" rx="18" ry="4" fill="#8e8e8e" stroke="#1c160e" strokeWidth="2" />
      <ellipse cx="60" cy="18" rx="7" ry="3" fill="none" stroke="#1c160e" strokeWidth="2" />
      <path d="M 38 22 L 38 100 Q 38 108 60 108 Q 82 108 82 100 L 82 22" fill="#e84444" stroke="#1c160e" strokeWidth="3" />
      <ellipse cx="60" cy="22" rx="22" ry="5" fill="#e84444" stroke="#1c160e" strokeWidth="3" />
      <rect x="42" y="32" width="4" height="60" rx="2" fill="#fff" opacity="0.6" />
      <rect x="38" y="48" width="44" height="32" fill="#fff" stroke="#1c160e" strokeWidth="2.5" />
      <text x="60" y="70" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="14" fill="#e84444">COLA</text>
    </svg>
  );
}
function JarSVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <rect x="34" y="14" width="52" height="14" rx="3" fill="#9c6b3c" stroke="#1c160e" strokeWidth="3" />
      <rect x="34" y="18" width="52" height="3" fill="#6b4523" />
      <path d="M 32 28 L 32 36 Q 28 40 28 50 L 28 102 Q 28 112 38 112 L 82 112 Q 92 112 92 102 L 92 50 Q 92 40 88 36 L 88 28 Z"
            fill="#bfe9c8" stroke="#1c160e" strokeWidth="3" opacity="0.92" />
      <path d="M 38 44 Q 34 70, 40 100" fill="none" stroke="#fff" strokeWidth="4" opacity="0.7" />
      <rect x="40" y="62" width="40" height="20" fill="#fff8e7" stroke="#1c160e" strokeWidth="2" />
      <text x="60" y="76" textAnchor="middle" fontFamily="Nunito" fontWeight="800" fontSize="10" fill="#1c160e">JAM</text>
    </svg>
  );
}
function BananaSVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <path d="M 60 14 C 86 22, 102 50, 96 84 C 92 100, 78 108, 66 102 C 76 94, 80 78, 74 64 C 68 50, 64 38, 60 14 Z" fill="#f0c419" stroke="#1c160e" strokeWidth="3" />
      <path d="M 60 14 C 34 22, 18 50, 24 84 C 28 100, 42 108, 54 102 C 44 94, 40 78, 46 64 C 52 50, 56 38, 60 14 Z" fill="#f5d04a" stroke="#1c160e" strokeWidth="3" />
      <path d="M 54 102 Q 60 96, 66 102 L 64 110 Q 60 113, 56 110 Z" fill="#8a6a1b" stroke="#1c160e" strokeWidth="2.5" />
      <rect x="55" y="6" width="10" height="14" rx="3" fill="#6b4d12" stroke="#1c160e" strokeWidth="2.5" />
      <circle cx="44" cy="60" r="2.5" fill="#8a6a1b" opacity="0.6" />
      <circle cx="78" cy="70" r="2" fill="#8a6a1b" opacity="0.6" />
    </svg>
  );
}
function EwasteSVG({ size = 80 }) {
  // motherboard chip
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <rect x="14" y="22" width="92" height="78" rx="4" fill="#2a6b3c" stroke="#1c160e" strokeWidth="3" />
      <rect x="14" y="22" width="92" height="78" rx="4" fill="url(#grid-pcb)" />
      <defs>
        <pattern id="grid-pcb" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#4a8a3a" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="30" y="36" width="28" height="20" fill="#1c160e" stroke="#1c160e" strokeWidth="2" />
      <circle cx="34" cy="40" r="1.5" fill="#ffba2e" />
      <circle cx="40" cy="40" r="1.5" fill="#ffba2e" />
      <circle cx="46" cy="40" r="1.5" fill="#ffba2e" />
      <rect x="64" y="34" width="32" height="10" fill="#d9d9d9" stroke="#1c160e" strokeWidth="2" />
      <rect x="64" y="48" width="32" height="10" fill="#d9d9d9" stroke="#1c160e" strokeWidth="2" />
      <rect x="22" y="70" width="80" height="20" fill="#c9a878" stroke="#1c160e" strokeWidth="2.5" />
      <rect x="28" y="74" width="6" height="12" fill="#1c160e" />
      <rect x="40" y="74" width="6" height="12" fill="#1c160e" />
      <rect x="52" y="74" width="6" height="12" fill="#1c160e" />
      <rect x="64" y="74" width="6" height="12" fill="#1c160e" />
    </svg>
  );
}
function BatterySVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <rect x="34" y="20" width="52" height="84" rx="6" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      <rect x="46" y="12" width="28" height="12" rx="3" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      <rect x="38" y="30" width="44" height="40" fill="#f5c211" stroke="#1c160e" strokeWidth="2.5" />
      <text x="60" y="58" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="22" fill="#1c160e">⚡</text>
      <text x="60" y="92" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="10" fill="#fff">9V</text>
    </svg>
  );
}
function NewspaperSVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <rect x="22" y="20" width="76" height="84" rx="3" fill="#e8e2cc" stroke="#1c160e" strokeWidth="3" transform="rotate(-4 60 62)" />
      <g transform="rotate(3 60 66)">
        <rect x="20" y="24" width="76" height="84" rx="3" fill="#fffaea" stroke="#1c160e" strokeWidth="3" />
        <rect x="26" y="32" width="64" height="10" fill="#1c160e" />
        <text x="58" y="40" textAnchor="middle" fontFamily="Nunito" fontWeight="900" fontSize="8" fill="#fffaea">JORNAL DE HOJE</text>
        <rect x="26" y="56" width="28" height="22" fill="#cfd9e0" stroke="#4a3a28" strokeWidth="1.5" />
        <line x1="58" y1="58" x2="90" y2="58" stroke="#4a3a28" strokeWidth="1.5" />
        <line x1="58" y1="64" x2="90" y2="64" stroke="#4a3a28" strokeWidth="1.5" />
        <line x1="58" y1="70" x2="86" y2="70" stroke="#4a3a28" strokeWidth="1.5" />
        <line x1="26" y1="86" x2="90" y2="86" stroke="#4a3a28" strokeWidth="1.5" />
        <line x1="26" y1="92" x2="84" y2="92" stroke="#4a3a28" strokeWidth="1.5" />
        <line x1="26" y1="98" x2="90" y2="98" stroke="#4a3a28" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
function CupSVG({ size = 80 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <path d="M 30 24 L 90 24 L 82 108 Q 82 112 78 112 L 42 112 Q 38 112 38 108 Z"
            fill="#fff" stroke="#1c160e" strokeWidth="3" />
      <ellipse cx="60" cy="24" rx="30" ry="6" fill="#fdfdfd" stroke="#1c160e" strokeWidth="3" />
      <ellipse cx="60" cy="23" rx="26" ry="4" fill="#e0e0e0" />
      <line x1="44" y1="34" x2="42" y2="108" stroke="#ccc" strokeWidth="2" />
      <line x1="60" y1="34" x2="60" y2="108" stroke="#ccc" strokeWidth="2" />
      <line x1="76" y1="34" x2="78" y2="108" stroke="#ccc" strokeWidth="2" />
    </svg>
  );
}

/* =========================================================
   Robôs & drones — cartoon SVG
   ========================================================= */
function CollectorBotSVG({ size = 120, color = '#f0b315' }) {
  return (
    <svg viewBox="0 0 160 160" width={size} height={size}>
      {/* shadow */}
      <ellipse cx="80" cy="148" rx="46" ry="6" fill="rgba(0,0,0,0.25)" />
      {/* treads */}
      <rect x="20" y="108" width="120" height="30" rx="14" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      <circle cx="38" cy="123" r="9" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
      <circle cx="80" cy="123" r="9" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
      <circle cx="122" cy="123" r="9" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
      {/* body */}
      <rect x="28" y="46" width="104" height="68" rx="14" fill={color} stroke="#1c160e" strokeWidth="4" />
      <rect x="28" y="46" width="104" height="18" rx="14" fill="#1c160e" />
      {/* eye / visor */}
      <rect x="44" y="68" width="72" height="32" rx="8" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      <rect x="50" y="74" width="60" height="20" rx="4" fill="#7ec850" />
      <circle cx="64" cy="84" r="4" fill="#fff" />
      <circle cx="96" cy="84" r="4" fill="#fff" />
      {/* antenna */}
      <line x1="80" y1="46" x2="80" y2="28" stroke="#1c160e" strokeWidth="4" strokeLinecap="round" />
      <circle cx="80" cy="24" r="6" fill="#d23636" stroke="#1c160e" strokeWidth="3" />
      {/* claw arms */}
      <rect x="14" y="62" width="20" height="10" rx="3" fill={color} stroke="#1c160e" strokeWidth="3" />
      <rect x="126" y="62" width="20" height="10" rx="3" fill={color} stroke="#1c160e" strokeWidth="3" />
      <circle cx="14" cy="67" r="6" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
      <circle cx="146" cy="67" r="6" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
      {/* led */}
      <circle cx="38" cy="55" r="3" fill="#7ec850" />
    </svg>
  );
}
function DroneSVG({ size = 100 }) {
  return (
    <svg viewBox="0 0 160 120" width={size} height={size * 0.75}>
      <ellipse cx="80" cy="108" rx="34" ry="5" fill="rgba(0,0,0,0.22)" />
      {/* rotors */}
      <ellipse cx="22" cy="36" rx="22" ry="5" fill="rgba(40,40,40,0.55)" />
      <ellipse cx="138" cy="36" rx="22" ry="5" fill="rgba(40,40,40,0.55)" />
      {/* arms */}
      <rect x="14" y="46" width="36" height="8" rx="3" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
      <rect x="110" y="46" width="36" height="8" rx="3" fill="#3a3835" stroke="#1c160e" strokeWidth="2.5" />
      {/* body */}
      <rect x="44" y="40" width="72" height="40" rx="10" fill="#3a5a7a" stroke="#1c160e" strokeWidth="3.5" />
      <rect x="52" y="48" width="56" height="20" rx="4" fill="#1c160e" />
      <rect x="56" y="52" width="48" height="12" rx="3" fill="#5fc8ff" />
      {/* camera */}
      <circle cx="80" cy="84" r="9" fill="#1c160e" stroke="#1c160e" strokeWidth="2" />
      <circle cx="80" cy="84" r="5" fill="#d23636" />
      <circle cx="78" cy="82" r="1.5" fill="#fff" />
      {/* hub motors */}
      <circle cx="22" cy="40" r="6" fill="#1c160e" />
      <circle cx="138" cy="40" r="6" fill="#1c160e" />
      <line x1="22" y1="40" x2="22" y2="32" stroke="#1c160e" strokeWidth="2" />
      <line x1="138" y1="40" x2="138" y2="32" stroke="#1c160e" strokeWidth="2" />
    </svg>
  );
}

/* Conveyor belt strip */
function ConveyorSVG({ width = 600, height = 60, dir = 'right' }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <rect x="0" y="0" width={width} height={height} rx={height/2} fill="#3a3835" stroke="#1c160e" strokeWidth="4" />
      <rect x="6" y="6" width={width-12} height={height-12} rx={(height-12)/2} fill="#1c160e" />
      {Array.from({length: Math.floor(width / 30)}).map((_, i) => (
        <line key={i} x1={12 + i*30} y1={10} x2={12 + i*30} y2={height-10} stroke="#3a3835" strokeWidth="3" />
      ))}
      {/* arrow */}
      <g transform={`translate(${width/2 - 12}, ${height/2 - 10})`}>
        <path d={dir === 'right' ? "M 0 0 L 16 10 L 0 20 Z" : "M 24 0 L 8 10 L 24 20 Z"} fill="#f0b315" stroke="#1c160e" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* =========================================================
   Mountain of trash (decorative)
   ========================================================= */
function TrashMountainSVG({ width = 900, height = 380, sectorColor = '#8a6a3e' }) {
  return (
    <svg viewBox="0 0 900 380" width={width} height={height} style={{ overflow: 'visible' }}>
      {/* mountain */}
      <path d="M 0 360 L 110 240 L 200 290 L 290 180 L 380 250 L 460 140 L 560 230 L 660 170 L 770 260 L 870 220 L 900 360 Z"
            fill={sectorColor} stroke="#1c160e" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 0 360 L 110 240 L 200 290 L 290 180 L 380 250 L 460 140 L 560 230 L 660 170 L 770 260 L 870 220 L 900 360"
            fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
      {/* trash items poking out */}
      <g transform="translate(80 220)"><BoxIcon /></g>
      <g transform="translate(220 248)"><BottleIcon /></g>
      <g transform="translate(330 152)"><CanIcon /></g>
      <g transform="translate(440 116)"><PaperIcon /></g>
      <g transform="translate(550 198)"><JarIcon /></g>
      <g transform="translate(670 148)"><BoxIcon /></g>
      <g transform="translate(790 232)"><CanIcon /></g>
      <g transform="translate(150 300)"><BottleIcon /></g>
      <g transform="translate(380 310)"><CanIcon /></g>
      <g transform="translate(560 310)"><BoxIcon /></g>
      <g transform="translate(720 320)"><JarIcon /></g>
      {/* flies */}
      <text x="240" y="180" fontSize="22" fill="#1c160e" opacity="0.5">~</text>
      <text x="490" y="100" fontSize="22" fill="#1c160e" opacity="0.5">~</text>
      <text x="720" y="130" fontSize="22" fill="#1c160e" opacity="0.5">~</text>
    </svg>
  );
}
function BoxIcon() {
  return (<g>
    <rect x="0" y="0" width="36" height="28" fill="#c9a878" stroke="#1c160e" strokeWidth="2.5" />
    <line x1="18" y1="0" x2="18" y2="28" stroke="#1c160e" strokeWidth="2" opacity="0.5" />
    <rect x="6" y="4" width="24" height="6" fill="none" stroke="#1c160e" strokeWidth="1.5" opacity="0.5" />
  </g>);
}
function BottleIcon() {
  return (<g>
    <rect x="10" y="0" width="10" height="6" fill="#3b8de0" stroke="#1c160e" strokeWidth="2" />
    <rect x="6" y="6" width="18" height="22" rx="3" fill="#c7e7ff" stroke="#1c160e" strokeWidth="2" />
  </g>);
}
function CanIcon() {
  return (<g>
    <rect x="2" y="0" width="20" height="26" rx="3" fill="#e84444" stroke="#1c160e" strokeWidth="2" />
    <rect x="2" y="10" width="20" height="8" fill="#fff" stroke="#1c160e" strokeWidth="1.5" />
  </g>);
}
function PaperIcon() {
  return (<g>
    <rect x="0" y="0" width="22" height="28" fill="#fffaea" stroke="#1c160e" strokeWidth="2" />
    <line x1="3" y1="6" x2="19" y2="6" stroke="#4a3a28" strokeWidth="1.5" />
    <line x1="3" y1="12" x2="19" y2="12" stroke="#4a3a28" strokeWidth="1.5" />
    <line x1="3" y1="18" x2="14" y2="18" stroke="#4a3a28" strokeWidth="1.5" />
  </g>);
}
function JarIcon() {
  return (<g>
    <rect x="4" y="0" width="16" height="5" fill="#9c6b3c" stroke="#1c160e" strokeWidth="2" />
    <rect x="2" y="5" width="20" height="22" rx="2" fill="#bfe9c8" stroke="#1c160e" strokeWidth="2" opacity="0.92" />
  </g>);
}

/* =========================================================
   Score popup, confetti — borrowed from prototype
   ========================================================= */
function Pop({ text, color = '#ff8a00' }) {
  return (
    <div style={{
      fontFamily: 'Nunito', fontWeight: 900, fontSize: 42, color,
      WebkitTextStroke: '3px #1c160e', textShadow: '0 4px 0 #1c160e',
    }}>{text}</div>
  );
}

/* Stars */
function Stars({ count = 3, total = 3, size = 36 }) {
  return (
    <div style={{ display: 'inline-flex', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <Star key={i} on={i < count} size={size} />
      ))}
    </div>
  );
}
function Star({ on, size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M 20 3 L 25 15 L 38 16 L 28 25 L 31 38 L 20 31 L 9 38 L 12 25 L 2 16 L 15 15 Z"
            fill={on ? '#ffba2e' : '#e6d4a3'} stroke="#1c160e" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/* Cloud helper */
function Cloud({ top, left, right, scale = 1 }) {
  return (
    <div className="cloud" style={{
      top, left, right,
      width: 120 * scale, height: 28 * scale,
    }}>
      <span style={{ position: 'absolute', width: 50*scale, height: 50*scale, background: '#fff', borderRadius: '50%', top: -22*scale, left: 18*scale }} />
      <span style={{ position: 'absolute', width: 36*scale, height: 36*scale, background: '#fff', borderRadius: '50%', top: -14*scale, left: 60*scale }} />
    </div>
  );
}

/* Hazard tape strip */
function HazardStrip({ height = 14 }) {
  return <div className="hazard-strip" style={{ height }} />;
}

/* Sun */
function Sun({ top = 70, right = 80, size = 100 }) {
  return (
    <div style={{
      position: 'absolute', top, right, width: size, height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, #ffe680, #ffba2e)',
      border: '4px solid var(--ink)',
      boxShadow: '0 0 0 10px rgba(255, 200, 60, 0.25), 0 0 0 22px rgba(255, 200, 60, 0.12)',
    }} />
  );
}

/* Government rebuilds — icons used on map / end screen */
function PracaIcon({ size = 80 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* tree */}
      <rect x="46" y="46" width="8" height="30" fill="#6b4523" stroke="#1c160e" strokeWidth="2.5" />
      <circle cx="50" cy="40" r="22" fill="#4a8a3a" stroke="#1c160e" strokeWidth="3" />
      <circle cx="40" cy="34" r="10" fill="#6ab04a" />
      <circle cx="60" cy="38" r="9" fill="#6ab04a" />
      {/* bench */}
      <rect x="18" y="78" width="64" height="4" fill="#8a6a3e" stroke="#1c160e" strokeWidth="2" />
      <rect x="22" y="82" width="4" height="10" fill="#8a6a3e" stroke="#1c160e" strokeWidth="2" />
      <rect x="74" y="82" width="4" height="10" fill="#8a6a3e" stroke="#1c160e" strokeWidth="2" />
    </svg>
  );
}
function HortaIcon({ size = 80 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="10" y="50" width="80" height="38" fill="#8a6a3e" stroke="#1c160e" strokeWidth="3" />
      <rect x="10" y="50" width="80" height="38" fill="url(#soil)" opacity="0.5" />
      <defs>
        <pattern id="soil" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#5a4426" />
        </pattern>
      </defs>
      {/* plants */}
      <g transform="translate(22 36)">
        <rect x="-1" y="14" width="2" height="14" fill="#4a8a3a" />
        <ellipse cx="-6" cy="14" rx="6" ry="3" fill="#6ab04a" stroke="#1c160e" strokeWidth="1.5" />
        <ellipse cx="6" cy="10" rx="6" ry="3" fill="#6ab04a" stroke="#1c160e" strokeWidth="1.5" />
      </g>
      <g transform="translate(50 30)">
        <rect x="-1" y="20" width="2" height="14" fill="#4a8a3a" />
        <circle cx="0" cy="18" r="9" fill="#d23636" stroke="#1c160e" strokeWidth="2" />
        <ellipse cx="-7" cy="10" rx="4" ry="2" fill="#6ab04a" />
      </g>
      <g transform="translate(78 38)">
        <rect x="-1" y="12" width="2" height="14" fill="#4a8a3a" />
        <ellipse cx="-5" cy="12" rx="5" ry="3" fill="#6ab04a" stroke="#1c160e" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
function UsinaIcon({ size = 80 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <rect x="14" y="50" width="72" height="38" fill="#6d6a64" stroke="#1c160e" strokeWidth="3" />
      <rect x="14" y="50" width="72" height="8" fill="#3a3835" />
      <rect x="22" y="62" width="10" height="10" fill="#5fc8ff" stroke="#1c160e" strokeWidth="2" />
      <rect x="38" y="62" width="10" height="10" fill="#5fc8ff" stroke="#1c160e" strokeWidth="2" />
      <rect x="54" y="62" width="10" height="10" fill="#5fc8ff" stroke="#1c160e" strokeWidth="2" />
      <rect x="68" y="62" width="14" height="26" fill="#1c160e" />
      {/* chimney */}
      <rect x="62" y="20" width="14" height="34" fill="#6d6a64" stroke="#1c160e" strokeWidth="3" />
      <rect x="60" y="18" width="18" height="6" fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
      {/* smoke (clean — white) */}
      <circle cx="69" cy="14" r="6" fill="#fff" stroke="#1c160e" strokeWidth="2" opacity="0.85" />
      <circle cx="76" cy="8" r="5" fill="#fff" stroke="#1c160e" strokeWidth="2" opacity="0.7" />
      {/* recycle */}
      <circle cx="36" cy="32" r="9" fill="#fff" stroke="#1c160e" strokeWidth="2" />
      <text x="36" y="36" textAnchor="middle" fontSize="11">♻</text>
    </svg>
  );
}
function EcoparkIcon({ size = 80 }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* big tree */}
      <rect x="44" y="56" width="12" height="34" fill="#6b4523" stroke="#1c160e" strokeWidth="2.5" />
      <ellipse cx="50" cy="44" rx="26" ry="20" fill="#4a8a3a" stroke="#1c160e" strokeWidth="3" />
      <ellipse cx="38" cy="36" rx="10" ry="8" fill="#6ab04a" />
      <ellipse cx="62" cy="40" rx="10" ry="8" fill="#6ab04a" />
      <ellipse cx="50" cy="28" rx="10" ry="8" fill="#6ab04a" />
      {/* flowers */}
      <circle cx="16" cy="82" r="4" fill="#e94e9b" stroke="#1c160e" strokeWidth="1.5" />
      <circle cx="84" cy="84" r="4" fill="#ffba2e" stroke="#1c160e" strokeWidth="1.5" />
      <circle cx="22" cy="92" r="3" fill="#6ab04a" />
      <circle cx="78" cy="93" r="3" fill="#6ab04a" />
    </svg>
  );
}

/* Recycle symbol — for school mode etc. */
function RecycleSymbol({ size = 60, color = '#2f8f3f' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <g stroke="#1c160e" strokeWidth="3" strokeLinejoin="round" fill={color}>
        <path d="M 30 60 L 50 30 L 70 60 L 60 60 L 50 44 L 40 60 Z" transform="rotate(0 50 50)" />
        <path d="M 30 60 L 50 30 L 70 60 L 60 60 L 50 44 L 40 60 Z" transform="rotate(120 50 50)" />
        <path d="M 30 60 L 50 30 L 70 60 L 60 60 L 50 44 L 40 60 Z" transform="rotate(240 50 50)" />
      </g>
    </svg>
  );
}

/* Game card frame (for educational quiz) */
function CardFrame({ children, style = {}, className = '' }) {
  return (
    <div className={"paper-card " + className} style={{ borderRadius: 22, ...style }}>
      {children}
    </div>
  );
}

/* Render hazard tape under headers */
function SectionHeader({ kicker, title, sub, kickerVariant = '' }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <span className={"kicker " + kickerVariant}>{kicker}</span>
      <h2 className="f-display" style={{ fontSize: 40, margin: '8px 0 4px', lineHeight: 1.05, color: 'var(--ink)' }}>{title}</h2>
      {sub && <div className="f-ui" style={{ fontSize: 16, color: 'var(--ink-soft)', fontWeight: 700 }}>{sub}</div>}
    </div>
  );
}

/* Export to window */
Object.assign(window, {
  BINS,
  BinSVG, BottleSVG, PaperBallSVG, CanSVG, JarSVG, BananaSVG, EwasteSVG, BatterySVG, NewspaperSVG, CupSVG,
  CollectorBotSVG, DroneSVG, ConveyorSVG, TrashMountainSVG,
  BoxIcon, BottleIcon, CanIcon, PaperIcon, JarIcon,
  Pop, Stars, Star, Cloud, HazardStrip, Sun,
  PracaIcon, HortaIcon, UsinaIcon, EcoparkIcon, RecycleSymbol,
  CardFrame, SectionHeader,
});
