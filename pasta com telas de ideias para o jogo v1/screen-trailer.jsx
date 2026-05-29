/* global React, Stage, Sprite, useTime, useSprite, interpolate, Easing */
// screen-trailer.jsx — Tela 13: Trailer animado (3 atos cinemáticos)

function ScreenTrailer() {
  return (
    <div data-screen-label="13 Trailer animado" style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0a14' }}>
      <Stage width={1920} height={1080} duration={26} background="#0a0a14" fitToParent autoPlay loop>
        <TrailerInner />
      </Stage>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 50,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6), transparent)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 16,
        color: '#fff', zIndex: 100, pointerEvents: 'none',
      }}>
        <button onClick={() => window.goTo('menu')} style={{
          background: 'transparent', color: '#fff', border: 'none',
          fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer',
          letterSpacing: '0.08em', pointerEvents: 'auto',
        }}>← SAIR</button>
        <span style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.3)' }} />
        <div className="f-mono" style={{ fontSize: 12, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.8)' }}>
          TRAILER · 0:26 · LOOP
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   TRAILER — main timeline composition
   ============================================================= */
function TrailerInner() {
  return (
    <>
      {/* === ATO I — Poente do Lixão (0-9s) === */}
      <Sprite start={0} end={9.2}>
        <ActOneTwilight />
      </Sprite>

      {/* === ATO II — Pátio Industrial (8.8-17s) === */}
      <Sprite start={8.8} end={17.2}>
        <ActTwoIndustrial />
      </Sprite>

      {/* === ATO III — Aurora Restaurada (16.8-23s) === */}
      <Sprite start={16.8} end={23.2}>
        <ActThreeRestored />
      </Sprite>

      {/* End logo card (22-26s) */}
      <Sprite start={22.6} end={26}>
        <EndCard />
      </Sprite>

      {/* HUD: act labels */}
      <ActLabels />

      {/* Letterbox bars (cinematic) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 70,
        background: '#000', zIndex: 60, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
        background: '#000', zIndex: 60, pointerEvents: 'none',
      }} />
    </>
  );
}

/* ===== Cross-fade helper ===== */
function fadeOpacity(localTime, duration) {
  const fadeIn = 0.7;
  const fadeOut = 0.7;
  if (localTime < fadeIn) return localTime / fadeIn;
  if (localTime > duration - fadeOut) return Math.max(0, (duration - localTime) / fadeOut);
  return 1;
}

/* =============================================================
   ATO I — Poente do Lixão
   Slow zoom in on the mountain. Worker appears small at base.
   ============================================================= */
function ActOneTwilight() {
  const { localTime, duration } = useSprite();
  // Act I doesn't fade in (it's the opening) — only fade OUT at end
  const fadeOut = 0.7;
  const opacity = localTime > duration - fadeOut ? Math.max(0, (duration - localTime) / fadeOut) : 1;
  // Camera zoom-in: scale 1.0 → 1.18 over the act
  const scale = interpolate([0, duration], [1.0, 1.18], Easing.easeOutQuad)(localTime);
  const tx = interpolate([0, duration], [0, -120], Easing.easeOutQuad)(localTime);
  const ty = interpolate([0, duration], [0, -60], Easing.easeOutQuad)(localTime);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity, transformOrigin: '40% 70%', transform: `scale(${scale}) translate(${tx}px, ${ty}px)` }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="t-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3b1d2a" />
            <stop offset="0.35" stopColor="#a8421b" />
            <stop offset="0.6" stopColor="#e87a1c" />
            <stop offset="0.85" stopColor="#f5b850" />
            <stop offset="1" stopColor="#e8a468" />
          </linearGradient>
          <linearGradient id="t-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a4426" />
            <stop offset="0.5" stopColor="#4a2d18" />
            <stop offset="1" stopColor="#2a180c" />
          </linearGradient>
          <linearGradient id="t-mountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a88a5e" />
            <stop offset="0.4" stopColor="#7a5d3a" />
            <stop offset="1" stopColor="#3a2818" />
          </linearGradient>
          <linearGradient id="t-haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(232,180,108,0)" />
            <stop offset="1" stopColor="rgba(232,180,108,0.7)" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1920" height="700" fill="url(#t-sky)" />

        {/* Animated sun glow — pulsing */}
        <circle cx="1440" cy="540"
          r={50 + Math.sin(localTime * 1.4) * 6}
          fill="#fff2b0" opacity="0.85" />
        <circle cx="1440" cy="540" r="180" fill="#ffd078" opacity="0.3" />

        {/* Birds flying across */}
        {[
          { y: 200, off: 0.0, color: '#1c160e' },
          { y: 240, off: 1.2 },
          { y: 180, off: 2.5 },
          { y: 220, off: 3.7 },
        ].map((b, i) => {
          const x = ((localTime + b.off) * 90) % 2200 - 100;
          const flap = Math.sin((localTime + b.off) * 6) * 4;
          return (
            <g key={i} transform={`translate(${x} ${b.y})`} opacity="0.65">
              <path d={`M -10 ${flap+2} Q 0 ${flap-4} 10 ${flap+2}`} fill="none" stroke="#1c160e" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          );
        })}

        {/* Distant smokestacks */}
        <g opacity="0.55">
          <g transform="translate(180 480)">
            <rect x="0" y="0" width="36" height="160" fill="#2a2a3a" />
            <rect x="-4" y="0" width="44" height="14" fill="#1c1c28" />
          </g>
          <g transform="translate(1500 470)">
            <rect x="0" y="0" width="40" height="170" fill="#2a2a3a" />
            <rect x="-4" y="0" width="48" height="14" fill="#1c1c28" />
          </g>
        </g>

        {/* Animated smoke from smokestacks */}
        <SmokeColumn x={196} y={470} t={localTime} />
        <SmokeColumn x={1518} y={460} t={localTime + 0.7} />
        <SmokeColumn x={700} y={370} t={localTime + 0.3} scale={1.3} />

        {/* Distant hills */}
        <path d="M 0 620 Q 240 580 480 610 Q 720 570 960 600 Q 1200 560 1440 610 Q 1680 580 1920 610 L 1920 720 L 0 720 Z" fill="#3a2818" opacity="0.65" />
        <rect x="0" y="500" width="1920" height="240" fill="url(#t-haze)" />

        {/* TRASH MOUNTAIN — fixed silhouette */}
        <g>
          <path d="M -100 720 L 200 520 L 420 580 L 700 380 L 980 480 L 1240 320 L 1500 460 L 1760 380 L 2020 520 L 2020 720 Z" fill="url(#t-mountain)" />
          {/* clutter on mountain */}
          <g opacity="0.9">
            <g transform="translate(280 540)"><rect x="-18" y="-28" width="36" height="48" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" /></g>
            <g transform="translate(820 410)"><path d="M -56 0 L -40 -22 L 38 -22 L 60 0 L 60 16 L -56 16 Z" fill="#3a2818" stroke="#1c160e" strokeWidth="2.5" /><circle cx="-30" cy="18" r="10" fill="#1c160e" /><circle cx="34" cy="18" r="10" fill="#1c160e" /></g>
            <g transform="translate(1080 420)"><rect x="-22" y="-44" width="44" height="60" fill="#a8a098" stroke="#1c160e" strokeWidth="2.5" /></g>
            <g transform="translate(1400 440)">
              <ellipse cx="0" cy="0" rx="32" ry="10" fill="#1c1208" stroke="#1c160e" strokeWidth="2" />
              <ellipse cx="0" cy="-14" rx="32" ry="10" fill="#1c1208" stroke="#1c160e" strokeWidth="2" />
              <ellipse cx="0" cy="-28" rx="32" ry="10" fill="#2a1c0e" stroke="#1c160e" strokeWidth="2" />
            </g>
          </g>
        </g>

        {/* Ground */}
        <path d="M 0 720 L 1920 720 L 1920 1080 L 0 1080 Z" fill="url(#t-ground)" />

        {/* Hazard tape */}
        <g transform="translate(0 740)">
          <defs>
            <pattern id="t-haz" width="60" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
              <rect width="60" height="20" fill="#f5c211" />
              <polygon points="0,0 30,0 0,20" fill="#1c160e" />
              <polygon points="30,0 60,0 30,20 0,20" fill="#1c160e" />
              <rect x="30" y="0" width="30" height="20" fill="#f5c211" />
            </pattern>
          </defs>
          <rect width="1920" height="18" fill="url(#t-haz)" opacity="0.85" />
        </g>

        {/* Worker walking in (entry animation) */}
        <CharacterAnim t={localTime} duration={duration} variant="twilight" />

        {/* Volumetric light */}
        <g opacity="0.18">
          <polygon points="1440,300 1920,200 1920,1080 800,1080" fill="#ffd078" />
        </g>

        {/* Vignette */}
        <radialGradient id="t-vig" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0.6" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>
        <rect x="0" y="0" width="1920" height="1080" fill="url(#t-vig)" />
      </svg>
    </div>
  );
}

/* =============================================================
   ATO II — Pátio Industrial
   Esteiras rolando, drones voando, guindaste levantando carga
   ============================================================= */
function ActTwoIndustrial() {
  const { localTime, duration } = useSprite();
  const opacity = fadeOpacity(localTime, duration);
  // pull back camera slightly
  const scale = interpolate([0, duration], [1.12, 1.0], Easing.easeOutQuad)(localTime);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity, transformOrigin: '50% 50%', transform: `scale(${scale})` }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="i-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a6a3a" />
            <stop offset="0.5" stopColor="#c2a460" />
            <stop offset="1" stopColor="#e2c884" />
          </linearGradient>
          <linearGradient id="i-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a4426" />
            <stop offset="1" stopColor="#2a180c" />
          </linearGradient>
          <linearGradient id="i-mountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a88a5e" />
            <stop offset="1" stopColor="#3a2818" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1920" height="700" fill="url(#i-sky)" />
        <circle cx="1500" cy="280" r="80" fill="#ffe680" opacity="0.5" />
        <circle cx="1500" cy="280" r="140" fill="#ffd078" opacity="0.2" />

        {/* Smokestacks puffing white smoke now (cleaner) */}
        <g opacity="0.55">
          <g transform="translate(180 480)"><rect x="0" y="0" width="36" height="160" fill="#2a2a3a" /></g>
          <g transform="translate(1500 470)"><rect x="0" y="0" width="40" height="170" fill="#2a2a3a" /></g>
        </g>
        <SmokeColumn x={196} y={470} t={localTime} color="#ddd" />
        <SmokeColumn x={1518} y={460} t={localTime + 0.5} color="#ddd" />

        <path d="M 0 620 Q 240 580 480 610 Q 720 570 960 600 Q 1200 560 1440 610 Q 1680 580 1920 610 L 1920 720 L 0 720 Z" fill="#3a2818" opacity="0.65" />

        {/* Mountain — slightly smaller (work in progress) */}
        <path d="M -100 720 L 200 600 L 420 620 L 700 480 L 980 540 L 1240 440 L 1500 520 L 1760 480 L 2020 580 L 2020 720 Z" fill="url(#i-mountain)" />
        {/* heavy clutter on mountain */}
        <g opacity="0.9">
          <g transform="translate(280 600)"><rect x="-18" y="-28" width="36" height="48" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" /></g>
          <g transform="translate(820 480)"><path d="M -56 0 L -40 -22 L 38 -22 L 60 0 L 60 16 L -56 16 Z" fill="#3a2818" stroke="#1c160e" strokeWidth="2.5" /></g>
          <g transform="translate(1080 500)"><rect x="-22" y="-44" width="44" height="60" fill="#a8a098" stroke="#1c160e" strokeWidth="2.5" /></g>
        </g>

        {/* Animated CRANE — arm sweeps left/right slowly */}
        <CraneAnim t={localTime} />

        {/* Conveyor belt with moving items */}
        <ConveyorAnim t={localTime} />

        {/* Classifier robot — eyes blinking + arm twitching */}
        <ClassifierAnim t={localTime} />

        {/* Drones flying across at different heights & speeds */}
        <DroneAnim t={localTime} offset={0.0}   y={300} speed={120} />
        <DroneAnim t={localTime} offset={1.5}   y={240} speed={150} scale={0.7} />
        <DroneAnim t={localTime} offset={3.2}   y={350} speed={100} scale={0.85} />

        {/* Ground */}
        <path d="M 0 720 L 1920 720 L 1920 1080 L 0 1080 Z" fill="url(#i-ground)" />

        {/* Hazard tape */}
        <g transform="translate(0 740)">
          <rect width="1920" height="18" fill="url(#t-haz)" opacity="0.85" />
        </g>

        {/* Truck rolling in from left */}
        <TruckAnim t={localTime} />

        {/* Vignette */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#t-vig)" />
      </svg>
    </div>
  );
}

/* =============================================================
   ATO III — Aurora Restaurada
   Hills greening, trees growing, sun rising
   ============================================================= */
function ActThreeRestored() {
  const { localTime, duration } = useSprite();
  const opacity = fadeOpacity(localTime, duration);

  // Sun rises through the act
  const sunY = interpolate([0, duration], [560, 320], Easing.easeOutQuad)(localTime);
  const sunR = interpolate([0, duration], [40, 100], Easing.easeOutQuad)(localTime);
  // sky shifts from dawn pink to clearer
  const skyProgress = interpolate([0, duration], [0, 1])(localTime);

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="r-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={`rgb(${14 + skyProgress*40}, ${42 + skyProgress*60}, ${58 + skyProgress*100})`} />
            <stop offset="0.3" stopColor="#5a89a8" />
            <stop offset="0.6" stopColor={`rgb(240, ${168 + skyProgress*30}, ${144 + skyProgress*40})`} />
            <stop offset="0.85" stopColor="#ffd078" />
            <stop offset="1" stopColor="#a8d8c8" />
          </linearGradient>
          <linearGradient id="r-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a8a3a" />
            <stop offset="0.6" stopColor="#2a6b22" />
            <stop offset="1" stopColor="#1c4a16" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1920" height="700" fill="url(#r-sky)" />

        {/* Rising sun */}
        <circle cx="1300" cy={sunY} r={sunR} fill="#ffe680" />
        <circle cx="1300" cy={sunY} r={sunR * 1.8} fill="#ffd078" opacity="0.3" />
        <circle cx="1300" cy={sunY} r={sunR * 3.2} fill="#ffd078" opacity="0.12" />

        {/* Birds */}
        {[
          { y: 220, off: 0.0 }, { y: 260, off: 1.2 }, { y: 200, off: 2.4 },
        ].map((b, i) => {
          const x = ((localTime + b.off) * 70) % 2200 - 100;
          const flap = Math.sin((localTime + b.off) * 5) * 4;
          return (
            <g key={i} transform={`translate(${x} ${b.y})`} opacity="0.75">
              <path d={`M -10 ${flap+4} Q 0 ${flap-4} 10 ${flap+4}`} fill="none" stroke="#1c160e" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          );
        })}

        {/* Green hills */}
        <path d="M -100 720 L 200 660 L 480 620 L 760 580 L 1080 600 L 1380 560 L 1680 580 L 2020 620 L 2020 720 Z" fill="url(#r-ground)" />

        {/* Trees growing in — each scales 0 → 1 staggered */}
        {[
          { x: 160, y: 640, off: 0.2 }, { x: 380, y: 600, off: 0.5 },
          { x: 620, y: 560, off: 0.9 }, { x: 880, y: 540, off: 1.3 },
          { x: 1180, y: 560, off: 1.7 }, { x: 1480, y: 540, off: 2.0 },
          { x: 1740, y: 560, off: 2.4 },
        ].map((tr, i) => {
          const localT = Math.max(0, localTime - tr.off);
          const s = Math.min(1, localT * 1.2);
          const grow = Easing.easeOutBack(Math.min(1, s));
          if (grow <= 0) return null;
          return (
            <g key={i} transform={`translate(${tr.x} ${tr.y}) scale(${grow})`}>
              <rect x="-6" y="0" width="12" height="40" fill="#6b4523" stroke="#1c160e" strokeWidth="2.5" />
              <ellipse cx="0" cy="-12" rx="30" ry="28" fill="#4a8a3a" stroke="#1c160e" strokeWidth="3" />
              <ellipse cx="-12" cy="-22" rx="14" ry="10" fill="#6ab04a" />
              <ellipse cx="10" cy="-18" rx="14" ry="10" fill="#6ab04a" />
            </g>
          );
        })}

        {/* Wind turbines — spinning */}
        <TurbineAnim x={1700} y={360} t={localTime} />
        <TurbineAnim x={1820} y={380} t={localTime + 1} scale={0.85} />

        {/* Lake */}
        <ellipse cx="900" cy="710" rx="180" ry="20" fill="#5fc8ff" opacity="0.55" />
        <ellipse cx="900" cy="708" rx="140" ry="14" fill="#7fd6ff" opacity="0.6" />

        {/* Ground */}
        <path d="M 0 720 L 1920 720 L 1920 1080 L 0 1080 Z" fill="url(#r-ground)" />

        {/* Flowers blooming */}
        {[[280, 880, 0.5], [620, 920, 0.8], [1080, 880, 1.1], [1380, 920, 1.4], [1620, 880, 1.7]].map(([x,y,off],i) => {
          const localT = Math.max(0, localTime - off);
          const s = Math.min(1, localT * 1.5);
          const bloom = Easing.easeOutBack(s);
          if (bloom <= 0) return null;
          return (
            <g key={i} transform={`translate(${x} ${y}) scale(${bloom})`}>
              <rect x="-2" y="0" width="4" height="22" fill="#4a8a3a" />
              <circle cx="0" cy="-2" r="6" fill="#ffba2e" stroke="#1c160e" strokeWidth="1.5" />
              <circle cx="0" cy="-2" r="2.5" fill="#e94e9b" stroke="#1c160e" strokeWidth="1" />
            </g>
          );
        })}

        {/* Recycling station bins in foreground */}
        <g transform="translate(1640 900)">
          <ellipse cx="0" cy="120" rx="90" ry="9" fill="rgba(0,0,0,0.4)" />
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

        {/* Worker — now in green vest, satisfied */}
        <CharacterAnim t={localTime} duration={duration} variant="restored" />

        {/* Volumetric morning rays */}
        <g opacity="0.2">
          <polygon points="1300,340 1700,260 1920,400 1920,1080 1100,1080" fill="#ffd078" />
        </g>

        <rect x="0" y="0" width="1920" height="1080" fill="url(#t-vig)" />
      </svg>
    </div>
  );
}

/* =============================================================
   END CARD — Logo & tagline
   ============================================================= */
function EndCard() {
  const { localTime, duration } = useSprite();
  const op = Math.min(1, localTime * 1.5);
  const titleScale = Easing.easeOutBack(Math.min(1, localTime * 0.7));
  const subOp = Math.max(0, Math.min(1, (localTime - 0.8) * 1.4));

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(28, 22, 14, 0.85)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: op, zIndex: 70,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="kicker hazard" style={{ fontSize: 16, opacity: subOp }}>
          JOGO EDUCATIVO · DISPONÍVEL EM 2026
        </div>
        <div className="f-display outline-text" style={{
          fontSize: 260, lineHeight: 0.85, margin: '20px 0',
          transform: `scale(${titleScale})`,
          color: '#fff', fontWeight: 700,
        }}>
          LIMPA<br/>LIXÃO!
        </div>
        <div className="f-serif" style={{
          fontSize: 36, color: '#fff', opacity: subOp,
          textShadow: '0 4px 0 #1c160e',
        }}>
          100.000 toneladas. Uma terra para devolver.
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   ACT LABELS — title cards overlaid (in/out per act)
   ============================================================= */
function ActLabels() {
  return (
    <>
      <ActLabel start={0.6} end={5.5} number="I" title="Poente do Lixão" sub="Você chega ao terreno. 100k toneladas." />
      <ActLabel start={9.2} end={14.0} number="II" title="O pátio acorda" sub="Esteiras, drones, robôs. Você comanda." />
      <ActLabel start={17.2} end={22.0} number="III" title="Aurora restaurada" sub="O governo reforma. A terra volta a viver." />
    </>
  );
}
function ActLabel({ start, end, number, title, sub }) {
  return (
    <Sprite start={start} end={end}>
      <ActLabelInner number={number} title={title} sub={sub} />
    </Sprite>
  );
}
function ActLabelInner({ number, title, sub }) {
  const { localTime, duration } = useSprite();
  const inT = Math.min(1, localTime * 1.4);
  const outT = Math.max(0, Math.min(1, (duration - localTime) * 1.4));
  const o = Math.min(inT, outT);
  const slide = (1 - Easing.easeOutQuart(inT)) * 60;
  return (
    <div style={{
      position: 'absolute', left: 80, bottom: 140, opacity: o,
      transform: `translateY(${slide}px)`,
      zIndex: 50, pointerEvents: 'none', maxWidth: 720,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span className="f-mono" style={{
          fontSize: 18, color: 'var(--hazard)',
          letterSpacing: '0.32em', fontWeight: 700,
        }}>ATO</span>
        <span className="f-display" style={{
          fontSize: 92, color: 'var(--hazard)',
          lineHeight: 0.9, fontWeight: 700,
          WebkitTextStroke: '4px #1c160e',
          textShadow: '0 6px 0 #1c160e',
        }}>{number}</span>
      </div>
      <h1 className="f-display" style={{
        fontSize: 72, color: '#fff', lineHeight: 0.98, margin: '4px 0 8px',
        textShadow: '0 4px 0 #1c160e, 0 8px 30px rgba(0,0,0,0.6)',
      }}>{title}</h1>
      <div className="f-serif" style={{
        fontSize: 26, color: 'rgba(255,255,255,0.92)',
        textShadow: '0 2px 8px rgba(0,0,0,0.6)',
      }}>{sub}</div>
    </div>
  );
}

/* =============================================================
   ANIMATED ELEMENT HELPERS
   ============================================================= */

function SmokeColumn({ x, y, t, scale = 1, color = '#5a4a3a' }) {
  // 4 puffs rising
  const puffs = [0, 0.6, 1.2, 1.8];
  return (
    <g opacity="0.5">
      {puffs.map((off, i) => {
        const phase = ((t + off) * 0.4) % 2.4;
        const o = Math.max(0, 1 - phase / 2.4);
        const rise = phase * 60;
        const r = (20 + phase * 15) * scale;
        return (
          <ellipse key={i} cx={x + Math.sin(phase * 3) * 8} cy={y - rise} rx={r} ry={r * 0.6} fill={color} opacity={o} />
        );
      })}
    </g>
  );
}

function CharacterAnim({ t, duration, variant = 'twilight' }) {
  // Walks in from off-screen left, then stands
  const walkIn = 2.5;
  const targetX = 460;
  const x = t < walkIn
    ? interpolate([0, walkIn], [-120, targetX], Easing.easeOutQuad)(t)
    : targetX;
  const walking = t < walkIn;
  const walkPhase = t * 8;
  const legL = walking ? Math.sin(walkPhase) * 14 : 0;
  const legR = walking ? -Math.sin(walkPhase) * 14 : 0;
  const armSwing = walking ? Math.sin(walkPhase) * 12 : 0;
  const bob = walking ? Math.abs(Math.sin(walkPhase)) * 4 : 0;
  const vestColor = variant === 'restored' ? '#7ec850' : '#f5c211';
  const armColor = variant === 'restored' ? '#5a8a3a' : '#c89d0c';

  return (
    <g transform={`translate(${x} ${880 - bob})`}>
      <ellipse cx="0" cy="92" rx="42" ry="6" fill="rgba(0,0,0,0.5)" />
      {/* legs */}
      <g transform={`translate(-8 ${20 + legL/2}) rotate(${legL} 0 0)`}>
        <rect x="-6" y="0" width="12" height="64" fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
        <rect x="-10" y="58" width="20" height="14" rx="2" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      </g>
      <g transform={`translate(8 ${20 + legR/2}) rotate(${legR} 0 0)`}>
        <rect x="-6" y="0" width="12" height="64" fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
        <rect x="-10" y="58" width="20" height="14" rx="2" fill="#1c160e" stroke="#1c160e" strokeWidth="3" />
      </g>
      {/* body */}
      <path d="M -28 -22 L -32 30 L 32 30 L 28 -22 L 18 -32 L -18 -32 Z" fill={vestColor} stroke="#1c160e" strokeWidth="3.5" />
      <rect x="-32" y="-4" width="64" height="6" fill="#cfd9e0" stroke="#1c160e" strokeWidth="1.5" />
      <rect x="-32" y="10" width="64" height="6" fill="#cfd9e0" stroke="#1c160e" strokeWidth="1.5" />
      {/* arms — swing while walking */}
      <g transform={`rotate(${armSwing} -33 -10)`}>
        <rect x="-40" y="-22" width="14" height="40" rx="6" fill={armColor} stroke="#1c160e" strokeWidth="3" />
      </g>
      <g transform={`rotate(${-armSwing} 33 -10)`}>
        <rect x="26" y="-22" width="14" height="46" rx="6" fill={armColor} stroke="#1c160e" strokeWidth="3" />
        {/* trash bag in hand */}
        <g transform="translate(38 20)">
          <path d="M -10 0 Q -10 -8 0 -8 Q 10 -8 10 0 L 14 22 Q 14 30 -14 30 L -14 22 Z" fill={variant === 'restored' ? '#5a8a3a' : '#1c160e'} stroke="#1c160e" strokeWidth="2.5" />
        </g>
      </g>
      {/* head */}
      <circle cx="0" cy="-46" r="22" fill="#d9a878" stroke="#1c160e" strokeWidth="3.5" />
      <circle cx="-6" cy="-48" r="2" fill="#1c160e" />
      <circle cx="8" cy="-48" r="2" fill="#1c160e" />
      {variant === 'restored' ? (
        <path d="M -6 -38 Q 0 -32 6 -38" fill="none" stroke="#1c160e" strokeWidth="2.5" strokeLinecap="round" />
      ) : (
        <path d="M -4 -38 Q 0 -36 4 -38" fill="none" stroke="#1c160e" strokeWidth="2" strokeLinecap="round" />
      )}
      <path d="M -26 -54 Q -26 -76 0 -76 Q 26 -76 26 -54 Z" fill={vestColor} stroke="#1c160e" strokeWidth="3.5" />
      <rect x="-26" y="-56" width="52" height="6" fill={armColor} stroke="#1c160e" strokeWidth="2.5" />
    </g>
  );
}

function CraneAnim({ t }) {
  const sweep = Math.sin(t * 0.6) * 30;
  const cableLen = 130 + Math.sin(t * 1.2) * 30;
  return (
    <g transform={`translate(${1240 + sweep} 240)`}>
      <rect x="-6" y="0" width="12" height="200" fill="#f0b315" stroke="#1c160e" strokeWidth="3" />
      <rect x="-50" y="0" width="100" height="18" fill="#f0b315" stroke="#1c160e" strokeWidth="3" />
      <rect x="40" y="-4" width="140" height="14" fill="#f0b315" stroke="#1c160e" strokeWidth="3" />
      <line x1="170" y1="14" x2="170" y2={14 + cableLen} stroke="#1c160e" strokeWidth="2.5" />
      <path d={`M 150 ${14 + cableLen} L 190 ${14 + cableLen} L 200 ${44 + cableLen} L 140 ${44 + cableLen} Z`} fill="#3a3835" stroke="#1c160e" strokeWidth="3" />
      <rect x="148" y={50 + cableLen} width="14" height="14" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
      <rect x="166" y={52 + cableLen} width="10" height="12" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
      <rect x="180" y={50 + cableLen} width="12" height="14" fill="#5a3a1a" stroke="#1c160e" strokeWidth="2" />
    </g>
  );
}

function ConveyorAnim({ t }) {
  // Moving stripes on the belt
  const offset = (t * 80) % 60;
  return (
    <g transform="translate(180 660)">
      <rect x="0" y="0" width="1600" height="22" fill="#1c160e" />
      {/* moving stripes */}
      {Array.from({length: 30}).map((_,i) => (
        <rect key={i} x={i * 60 - offset} y="6" width="20" height="10" fill="#3a3835" />
      ))}
      {/* legs */}
      {[100, 350, 600, 850, 1100, 1350, 1500].map(x => (
        <g key={x}>
          <rect x={x} y="22" width="14" height="50" fill="#3a3835" stroke="#1c160e" strokeWidth="2" />
          <rect x={x-4} y="22" width="22" height="6" fill="#1c160e" />
        </g>
      ))}
      {/* items moving down belt */}
      {[0, 1, 2, 3, 4].map(i => {
        const x = ((t * 80 + i * 320) % 1700) - 50;
        const colors = ['#c7e7ff', '#e84444', '#fffaea', '#bfe9c8', '#f5d04a'];
        return (
          <g key={i} transform={`translate(${x} -10)`}>
            <rect x="-12" y="-14" width="24" height="14" rx="3" fill={colors[i % 5]} stroke="#1c160e" strokeWidth="2" />
          </g>
        );
      })}
    </g>
  );
}

function ClassifierAnim({ t }) {
  const blink = Math.sin(t * 4) > 0.92 ? 0.1 : 1;
  const armSwing = Math.sin(t * 1.8) * 12;
  return (
    <g transform="translate(700 540)">
      <rect x="0" y="0" width="160" height="120" rx="14" fill="#3a8de0" stroke="#1c160e" strokeWidth="4" />
      <rect x="0" y="0" width="160" height="30" fill="#1c160e" />
      <rect x="20" y="40" width="120" height="40" fill="#1c160e" stroke="#1c160e" strokeWidth="2" />
      <rect x="28" y="48" width="104" height="24" fill="#7ec850" />
      <circle cx="56" cy="60" r="6" fill="#fff" transform={`scale(1 ${blink})`} style={{ transformOrigin: '56px 60px' }} />
      <circle cx="104" cy="60" r="6" fill="#fff" transform={`scale(1 ${blink})`} style={{ transformOrigin: '104px 60px' }} />
      <g transform={`rotate(${armSwing} 160 50)`}>
        <line x1="160" y1="50" x2="220" y2="80" stroke="#1c160e" strokeWidth="6" />
        <rect x="216" y="74" width="14" height="14" fill="#3a8de0" stroke="#1c160e" strokeWidth="3" />
      </g>
      <line x1="80" y1="0" x2="80" y2="-20" stroke="#1c160e" strokeWidth="4" />
      <circle cx="80" cy="-22" r="5" fill="#d23636" stroke="#1c160e" strokeWidth="2" />
    </g>
  );
}

function DroneAnim({ t, offset, y, speed, scale = 1 }) {
  const x = ((t + offset) * speed) % 2200 - 100;
  const bob = Math.sin(t * 3 + offset) * 10;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${scale})`}>
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
    </g>
  );
}

function TruckAnim({ t }) {
  const x = -200 + (t / 8.4) * 400;
  return (
    <g transform={`translate(${x} 600)`}>
      <rect x="0" y="0" width="100" height="60" fill="#d23636" stroke="#1c160e" strokeWidth="4" />
      <rect x="-44" y="20" width="44" height="40" fill="#7a3030" stroke="#1c160e" strokeWidth="4" />
      <rect x="-38" y="26" width="32" height="24" fill="#5fc8ff" stroke="#1c160e" strokeWidth="2.5" />
      <g transform={`rotate(${t * 360} -20 62)`}>
        <circle cx="-20" cy="62" r="14" fill="#1c160e" />
        <line x1="-20" y1="48" x2="-20" y2="76" stroke="#3a3835" strokeWidth="2" />
        <line x1="-34" y1="62" x2="-6" y2="62" stroke="#3a3835" strokeWidth="2" />
      </g>
      <g transform={`rotate(${t * 360} 40 62)`}>
        <circle cx="40" cy="62" r="14" fill="#1c160e" />
        <line x1="40" y1="48" x2="40" y2="76" stroke="#3a3835" strokeWidth="2" />
      </g>
      <g transform={`rotate(${t * 360} 80 62)`}>
        <circle cx="80" cy="62" r="14" fill="#1c160e" />
        <line x1="80" y1="48" x2="80" y2="76" stroke="#3a3835" strokeWidth="2" />
      </g>
    </g>
  );
}

function TurbineAnim({ x, y, t, scale = 1 }) {
  const rot = t * 90;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.85">
      <rect x="-3" y="0" width="6" height="240" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
      <circle cy="0" r="4" fill="#1c160e" />
      <g transform={`rotate(${rot})`}>
        <path d="M 0 0 L 60 -10 L 56 4 Z" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
        <path d="M 0 0 L -32 -50 L -38 -34 Z" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
        <path d="M 0 0 L -30 50 L -16 56 Z" fill="#fffaea" stroke="#1c160e" strokeWidth="2.5" />
      </g>
    </g>
  );
}

window.ScreenTrailer = ScreenTrailer;
