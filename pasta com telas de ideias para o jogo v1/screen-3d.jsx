/* global React, THREE */
// screen-3d.jsx — Tela 11: Demo 3D jogável (Three.js)
// Personagem anda no pátio (WASD), [E] pega/solta lixo, encaixar na lixeira certa = +pontos.

const { useEffect: useEffect_3d, useRef: useRef_3d, useState: useState_3d } = React;

const BIN_COLORS_3D = {
  azul:     { hex: 0x2b6cb0, name: 'Papel'    },
  vermelho: { hex: 0xd23636, name: 'Plástico' },
  verde:    { hex: 0x2f8f3f, name: 'Vidro'    },
  amarelo:  { hex: 0xf0b315, name: 'Metal'    },
  marrom:   { hex: 0x6a4326, name: 'Orgânico' },
};

const TRASH_TEMPLATES = [
  { kind: 'bottle',    bin: 'vermelho', color: 0xc7e7ff },
  { kind: 'paper',     bin: 'azul',     color: 0xfffaea },
  { kind: 'can',       bin: 'amarelo',  color: 0xe84444 },
  { kind: 'jar',       bin: 'verde',    color: 0xbfe9c8 },
  { kind: 'banana',    bin: 'marrom',   color: 0xf5d04a },
  { kind: 'newspaper', bin: 'azul',     color: 0xe8e2cc },
  { kind: 'can',       bin: 'amarelo',  color: 0x3aa648 },
  { kind: 'bottle',    bin: 'vermelho', color: 0xfff36b },
  { kind: 'jar',       bin: 'verde',    color: 0xd6c2a8 },
  { kind: 'banana',    bin: 'marrom',   color: 0xf0c419 },
];

function Screen3D() {
  const hostRef = useRef_3d(null);
  const [hud, setHud] = useState_3d({
    score: 0, errors: 0, picked: null, near: null, status: 'idle',
    timeLeft: 90, remaining: TRASH_TEMPLATES.length, message: null,
  });
  const [loaded, setLoaded] = useState_3d(typeof window.THREE !== 'undefined');

  // Load three.js once
  useEffect_3d(() => {
    if (loaded) return;
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/three@0.158.0/build/three.min.js';
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, [loaded]);

  // Init scene
  useEffect_3d(() => {
    if (!loaded || !hostRef.current) return;
    const host = hostRef.current;
    const game = startGame(host, setHud);
    return () => game.dispose();
  }, [loaded]);

  return (
    <div data-screen-label="11 Demo 3D jogável" style={{ width: '100%', height: '100%', position: 'relative', background: '#1c160e' }}>
      {/* Loading */}
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', fontFamily: 'JetBrains Mono' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="f-display" style={{ fontSize: 36, color: 'var(--hazard)' }}>Carregando 3D…</div>
            <div className="f-mono" style={{ fontSize: 14, opacity: 0.7, marginTop: 8 }}>three.js · ~600 KB</div>
          </div>
        </div>
      )}

      {/* 3D host */}
      <div ref={hostRef} style={{ position: 'absolute', inset: 0 }} />

      {/* HUD overlay */}
      {loaded && <HUD3D hud={hud} />}

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        background: 'rgba(28,22,14,0.88)', color: 'var(--paper)',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 18,
        borderBottom: '3px solid var(--hazard)', zIndex: 10,
      }}>
        <button onClick={() => window.goTo('menu')} style={{ background: 'transparent', color: 'var(--paper)', border: 'none', fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em' }}>← SAIR</button>
        <span style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.2)' }} />
        <div className="f-mono" style={{ fontSize: 13, letterSpacing: '0.12em' }}>DEMO 3D · PROVA DE CONCEITO</div>
        <span className="kicker hazard" style={{ marginLeft: 6, fontSize: 11 }}>EXPERIMENTAL</span>
      </div>
    </div>
  );
}

function HUD3D({ hud }) {
  return (
    <>
      {/* Top-right: timer + score */}
      <div style={{
        position: 'absolute', top: 84, right: 26, display: 'flex', flexDirection: 'column', gap: 10,
        zIndex: 5, alignItems: 'flex-end',
      }}>
        <div style={{
          background: 'rgba(28,22,14,0.92)', color: 'var(--paper)',
          border: '3px solid var(--ink)', borderRadius: 12,
          padding: '12px 18px', boxShadow: '0 5px 0 rgba(0,0,0,0.4)',
          fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.1em',
        }}>
          <div style={{ fontSize: 11, color: 'var(--hazard)' }}>PONTOS</div>
          <div className="f-display" style={{ fontSize: 36, color: '#fff', lineHeight: 1 }}>{hud.score}</div>
        </div>
        <div style={{
          background: 'rgba(28,22,14,0.92)', color: 'var(--paper)',
          border: '3px solid var(--ink)', borderRadius: 12,
          padding: '8px 14px', display: 'flex', gap: 12,
          fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.06em',
        }}>
          <span>⏱ {String(Math.floor(hud.timeLeft/60)).padStart(2,'0')}:{String(hud.timeLeft%60).padStart(2,'0')}</span>
          <span style={{ color: 'var(--signal)' }}>✗ {hud.errors}</span>
          <span style={{ color: 'var(--hazard)' }}>📦 {hud.remaining}</span>
        </div>
      </div>

      {/* Bottom: controls hint */}
      <div style={{
        position: 'absolute', bottom: 26, left: 26,
        background: 'rgba(28,22,14,0.92)', color: 'var(--paper)',
        border: '3px solid var(--ink)', borderRadius: 12,
        padding: '12px 18px', boxShadow: '0 5px 0 rgba(0,0,0,0.4)',
        fontFamily: 'JetBrains Mono', fontSize: 13, letterSpacing: '0.06em',
        zIndex: 5,
        display: 'flex', gap: 14, alignItems: 'center',
      }}>
        <Key label="W A S D" />
        <span style={{ opacity: 0.7 }}>andar</span>
        <span style={{ opacity: 0.3 }}>·</span>
        <Key label="E" /> <span style={{ opacity: 0.7 }}>{hud.picked ? 'soltar' : 'pegar'}</span>
        <span style={{ opacity: 0.3 }}>·</span>
        <Key label="MOUSE" /> <span style={{ opacity: 0.7 }}>câmera</span>
      </div>

      {/* Carrying hint */}
      {hud.picked && (
        <div style={{
          position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--hazard)', color: 'var(--ink)',
          border: '3px solid var(--ink)', borderRadius: 12,
          padding: '10px 18px', boxShadow: '0 5px 0 var(--ink)',
          fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, letterSpacing: '0.06em',
          zIndex: 5,
          whiteSpace: 'nowrap',
        }}>
          CARREGANDO: {hud.picked.toUpperCase()} → leva pra lixeira <span style={{ color: 'var(--signal)' }}>certa</span>
        </div>
      )}

      {/* Near a bin */}
      {!hud.picked && hud.near && (
        <div style={{
          position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--ink)', color: 'var(--paper)',
          border: '3px solid var(--paper)', borderRadius: 12,
          padding: '10px 18px',
          fontFamily: 'JetBrains Mono', fontSize: 14, letterSpacing: '0.06em',
          zIndex: 5,
        }}>
          [E] PEGAR · <span style={{ color: 'var(--hazard)' }}>{hud.near.toUpperCase()}</span>
        </div>
      )}

      {/* Flash message */}
      {hud.message && (
        <div style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
          background: hud.message.type === 'ok' ? 'var(--verde)' : 'var(--signal)',
          color: '#fff', border: '4px solid var(--ink)', borderRadius: 18,
          padding: '20px 36px', boxShadow: '0 10px 0 var(--ink)',
          fontFamily: 'Fredoka', fontWeight: 700, fontSize: 48, letterSpacing: '0.02em',
          zIndex: 6, pointerEvents: 'none',
          animation: 'msgPop 1s forwards',
          WebkitTextStroke: '3px var(--ink)',
        }}>
          {hud.message.text}
          <style>{`@keyframes msgPop { 0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0; } 20% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; } 80% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0; } }`}</style>
        </div>
      )}

      {/* End screen */}
      {hud.status === 'done' && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(28,22,14,0.85)',
          display: 'grid', placeItems: 'center', zIndex: 8,
        }}>
          <div style={{
            background: 'var(--card)', border: '5px solid var(--ink)', borderRadius: 22,
            padding: '36px 48px', boxShadow: '0 14px 0 rgba(0,0,0,0.4)',
            textAlign: 'center', maxWidth: 540,
          }}>
            <span className="kicker hazard">FIM DA DEMO</span>
            <h2 className="f-display" style={{ fontSize: 56, margin: '12px 0 6px', lineHeight: 1 }}>
              {hud.remaining === 0 ? 'Pátio limpo!' : 'Tempo esgotado'}
            </h2>
            <div className="f-serif" style={{ fontSize: 22, color: 'var(--ink-soft)', marginBottom: 18 }}>
              {hud.score} pontos · {hud.errors} erros
            </div>
            <button className="btn huge" onClick={() => location.reload()}>↻ JOGAR DE NOVO</button>
          </div>
        </div>
      )}
    </>
  );
}

function Key({ label }) {
  return (
    <span style={{
      background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.4)',
      borderRadius: 6, padding: '4px 8px', fontFamily: 'JetBrains Mono', fontWeight: 700,
      fontSize: 12, letterSpacing: '0.08em',
    }}>{label}</span>
  );
}

/* ====================================================================
   THE GAME — Three.js scene
   ==================================================================== */
function startGame(host, setHud) {
  const T = window.THREE;
  const W = host.clientWidth, H = host.clientHeight;

  const scene = new T.Scene();
  scene.background = new T.Color(0xffd178);
  scene.fog = new T.Fog(0xffd178, 40, 110);

  const camera = new T.PerspectiveCamera(55, W/H, 0.1, 200);
  camera.position.set(0, 16, 22);
  camera.lookAt(0, 0, 0);

  const renderer = new T.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  // Lights — warm sun + ambient
  scene.add(new T.AmbientLight(0xffeacc, 0.6));
  const sun = new T.DirectionalLight(0xffe680, 1.1);
  sun.position.set(20, 30, 14);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 1024;
  sun.shadow.mapSize.height = 1024;
  const d = 40;
  sun.shadow.camera.left = -d;
  sun.shadow.camera.right = d;
  sun.shadow.camera.top = d;
  sun.shadow.camera.bottom = -d;
  scene.add(sun);
  // Hemisphere — sky/ground
  scene.add(new T.HemisphereLight(0xffe2a8, 0x6a4426, 0.4));

  // Ground — dirty
  const groundGeom = new T.PlaneGeometry(120, 120);
  const groundMat = new T.MeshLambertMaterial({ color: 0x8a6a3e });
  const ground = new T.Mesh(groundGeom, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Darker dirt patch around center
  const patchGeom = new T.CircleGeometry(20, 32);
  const patch = new T.Mesh(patchGeom, new T.MeshLambertMaterial({ color: 0x6a4d2a }));
  patch.rotation.x = -Math.PI / 2;
  patch.position.y = 0.01;
  patch.receiveShadow = true;
  scene.add(patch);

  // Hazard tape fence around play area (a circle of orange/black pillars)
  const fenceR = 22;
  for (let i = 0; i < 36; i++) {
    const a = (i/36) * Math.PI*2;
    const isYellow = i % 2 === 0;
    const post = new T.Mesh(
      new T.BoxGeometry(0.4, 1.6, 0.4),
      new T.MeshLambertMaterial({ color: isYellow ? 0xf5c211 : 0x1c160e }),
    );
    post.position.set(Math.cos(a)*fenceR, 0.8, Math.sin(a)*fenceR);
    post.castShadow = true;
    scene.add(post);
  }

  // Distant skyline (cubes as smokestacks)
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI*2;
    const r = 50 + (i%3)*4;
    const stack = new T.Mesh(
      new T.BoxGeometry(2 + (i%3), 8 + (i%4)*2, 2 + (i%3)),
      new T.MeshLambertMaterial({ color: 0x6d6a64 }),
    );
    stack.position.set(Math.cos(a)*r, 4, Math.sin(a)*r);
    scene.add(stack);
  }

  // Trash piles (low-poly mounds)
  for (let i = 0; i < 6; i++) {
    const ang = (i / 6) * Math.PI*2 + 0.3;
    const r = 7 + i*0.4;
    const pileGeom = new T.ConeGeometry(2.4, 1.6, 6);
    const pile = new T.Mesh(pileGeom, new T.MeshLambertMaterial({ color: 0x8a6a3e }));
    pile.position.set(Math.cos(ang)*r, 0.8, Math.sin(ang)*r);
    pile.castShadow = true;
    pile.receiveShadow = true;
    pile.rotation.y = Math.random()*Math.PI;
    scene.add(pile);
  }

  // ---- BINS — row at one side of the arena ----
  const bins = [];
  const binPositions = [
    { id: 'azul',     x: -8,  z: -16 },
    { id: 'vermelho', x: -4,  z: -16 },
    { id: 'verde',    x:  0,  z: -16 },
    { id: 'amarelo',  x:  4,  z: -16 },
    { id: 'marrom',   x:  8,  z: -16 },
  ];
  binPositions.forEach(b => {
    const group = new T.Group();
    const color = BIN_COLORS_3D[b.id].hex;
    const body = new T.Mesh(
      new T.CylinderGeometry(1.0, 1.2, 2.6, 8),
      new T.MeshLambertMaterial({ color }),
    );
    body.position.y = 1.3;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    // lid (a wider disc)
    const lid = new T.Mesh(
      new T.CylinderGeometry(1.15, 1.15, 0.2, 8),
      new T.MeshLambertMaterial({ color: color & 0xbababa }),
    );
    lid.position.y = 2.7;
    lid.castShadow = true;
    group.add(lid);
    // label band
    const band = new T.Mesh(
      new T.CylinderGeometry(1.05, 1.05, 0.6, 8),
      new T.MeshLambertMaterial({ color: 0xfffaea }),
    );
    band.position.y = 1.6;
    group.add(band);
    // outline (a black outer cylinder slightly bigger) — to mimic cartoon ink stroke
    const outline = new T.Mesh(
      new T.CylinderGeometry(1.05, 1.25, 2.7, 8),
      new T.MeshBasicMaterial({ color: 0x1c160e, side: T.BackSide }),
    );
    outline.position.y = 1.3;
    outline.scale.set(1.05, 1.02, 1.05);
    group.add(outline);
    // Label as floating sprite
    const lbl = makeLabel(BIN_COLORS_3D[b.id].name.toUpperCase());
    lbl.position.set(0, 4.0, 0);
    group.add(lbl);

    group.position.set(b.x, 0, b.z);
    group.userData = { bin: b.id };
    scene.add(group);
    bins.push(group);
  });

  // ---- TRASH ITEMS — scattered ----
  const items = [];
  TRASH_TEMPLATES.forEach((tpl, i) => {
    const mesh = makeTrash(T, tpl.kind, tpl.color);
    const ang = Math.random() * Math.PI*2;
    const r = 5 + Math.random()*12;
    mesh.position.set(Math.cos(ang)*r, 0.4, Math.sin(ang)*r);
    mesh.userData = { bin: tpl.bin, kind: tpl.kind, id: i };
    mesh.castShadow = true;
    scene.add(mesh);
    items.push(mesh);
  });

  // ---- PLAYER — capsule with head ----
  const player = new T.Group();
  // body
  const body = new T.Mesh(
    new T.CapsuleGeometry(0.45, 1.0, 4, 8),
    new T.MeshLambertMaterial({ color: 0x3a8de0 }),
  );
  body.position.y = 0.95;
  body.castShadow = true;
  player.add(body);
  // head
  const head = new T.Mesh(
    new T.SphereGeometry(0.42, 12, 12),
    new T.MeshLambertMaterial({ color: 0xffd9a8 }),
  );
  head.position.y = 1.95;
  head.castShadow = true;
  player.add(head);
  // hard hat
  const hat = new T.Mesh(
    new T.CylinderGeometry(0.48, 0.46, 0.28, 12),
    new T.MeshLambertMaterial({ color: 0xf5c211 }),
  );
  hat.position.y = 2.25;
  hat.castShadow = true;
  player.add(hat);
  // hat brim
  const brim = new T.Mesh(
    new T.CylinderGeometry(0.6, 0.6, 0.06, 16),
    new T.MeshLambertMaterial({ color: 0xf5c211 }),
  );
  brim.position.y = 2.13;
  player.add(brim);
  // legs
  const legL = new T.Mesh(
    new T.CylinderGeometry(0.16, 0.16, 0.5, 8),
    new T.MeshLambertMaterial({ color: 0x3a3835 }),
  );
  legL.position.set(-0.2, 0.3, 0);
  legL.castShadow = true;
  player.add(legL);
  const legR = legL.clone();
  legR.position.x = 0.2;
  player.add(legR);
  // arms
  const armL = new T.Mesh(
    new T.CapsuleGeometry(0.14, 0.4, 4, 6),
    new T.MeshLambertMaterial({ color: 0x3a8de0 }),
  );
  armL.position.set(-0.55, 1.25, 0);
  armL.castShadow = true;
  player.add(armL);
  const armR = armL.clone();
  armR.position.x = 0.55;
  player.add(armR);
  // indicator dot above (selected target highlight)
  const ind = new T.Mesh(
    new T.RingGeometry(0.6, 0.7, 24),
    new T.MeshBasicMaterial({ color: 0xf5c211, side: T.DoubleSide, transparent: true, opacity: 0 }),
  );
  ind.rotation.x = -Math.PI/2;
  ind.position.y = 0.02;
  player.add(ind);

  scene.add(player);
  player.userData.legs = [legL, legR];
  player.userData.arms = [armL, armR];

  // ---- INPUT ----
  const keys = {};
  const onKey = (e, down) => {
    keys[e.key.toLowerCase()] = down;
    // E for pick/drop — only fire once per press
    if (down && e.key.toLowerCase() === 'e' && !state._eHeld) {
      state._eHeld = true;
      handlePickDrop();
    }
    if (!down && e.key.toLowerCase() === 'e') state._eHeld = false;
  };
  const kd = e => onKey(e, true);
  const ku = e => onKey(e, false);
  window.addEventListener('keydown', kd);
  window.addEventListener('keyup', ku);

  // Mouse — orbit camera around player (drag)
  let mouseDown = false, mx = 0, my = 0;
  let camAngle = 0, camHeight = 16;
  const md = e => { mouseDown = true; mx = e.clientX; my = e.clientY; };
  const mm = e => {
    if (!mouseDown) return;
    camAngle -= (e.clientX - mx) * 0.005;
    camHeight = Math.max(8, Math.min(24, camHeight - (e.clientY - my) * 0.05));
    mx = e.clientX; my = e.clientY;
  };
  const mu = () => { mouseDown = false; };
  renderer.domElement.addEventListener('mousedown', md);
  window.addEventListener('mousemove', mm);
  window.addEventListener('mouseup', mu);

  // ---- STATE ----
  const state = {
    score: 0, errors: 0, picked: null, near: null, remaining: items.length,
    timeLeft: 90, status: 'idle', message: null, lastTick: performance.now(),
    walkPhase: 0,
    _eHeld: false,
  };

  function handlePickDrop() {
    if (state.status === 'done') return;
    if (state.picked) {
      // Drop / deposit
      const targetBin = findNearestBin();
      if (targetBin) {
        // Check correctness
        if (targetBin.userData.bin === state.picked.userData.bin) {
          // success
          state.score += 100;
          // remove item from scene
          scene.remove(state.picked);
          state.remaining = items.filter(it => it.parent).length;
          flash('ok', '+100 ✓');
        } else {
          state.errors += 1;
          state.score = Math.max(0, state.score - 30);
          // put it back on the ground beside player
          state.picked.position.copy(player.position);
          state.picked.position.x += 1.4;
          state.picked.position.y = 0.4;
          scene.add(state.picked);
          flash('err', '✗ −30');
        }
        state.picked = null;
        if (state.remaining === 0) { state.status = 'done'; }
        pushHud();
        return;
      }
      // Else drop on the ground in front of player
      const f = forwardVec();
      const drop = state.picked;
      drop.position.copy(player.position).add(f.multiplyScalar(1.2));
      drop.position.y = 0.4;
      scene.add(drop);
      state.picked = null;
      pushHud();
    } else {
      // Try pick
      const target = findNearestItem();
      if (target) {
        scene.remove(target);
        state.picked = target;
        pushHud();
      }
    }
  }

  function flash(type, text) {
    state.message = { type, text };
    pushHud();
    setTimeout(() => { state.message = null; pushHud(); }, 950);
  }

  function findNearestItem() {
    let best = null, bestD = 2.0;
    for (const it of items) {
      if (!it.parent) continue;
      const d = it.position.distanceTo(player.position);
      if (d < bestD) { bestD = d; best = it; }
    }
    return best;
  }
  function findNearestBin() {
    let best = null, bestD = 2.5;
    for (const b of bins) {
      const d = b.position.distanceTo(player.position);
      if (d < bestD) { bestD = d; best = b; }
    }
    return best;
  }
  function forwardVec() {
    const v = new T.Vector3(0, 0, -1);
    v.applyEuler(new T.Euler(0, player.rotation.y, 0));
    return v;
  }
  function pushHud() {
    setHud({
      score: state.score,
      errors: state.errors,
      picked: state.picked ? state.picked.userData.kind : null,
      near: !state.picked && findNearestItem() ? findNearestItem().userData.kind : null,
      remaining: state.remaining,
      timeLeft: Math.max(0, Math.ceil(state.timeLeft)),
      status: state.status,
      message: state.message,
    });
  }

  // Resize
  const onResize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  // Main loop
  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const now = performance.now();
    const dt = Math.min(0.05, (now - state.lastTick) / 1000);
    state.lastTick = now;

    // Timer
    if (state.status === 'idle') {
      state.timeLeft -= dt;
      if (state.timeLeft <= 0) {
        state.timeLeft = 0;
        state.status = 'done';
        pushHud();
      }
    }

    // Movement
    const speed = 6;
    let vx = 0, vz = 0;
    if (keys['w'] || keys['arrowup'])    vz -= 1;
    if (keys['s'] || keys['arrowdown'])  vz += 1;
    if (keys['a'] || keys['arrowleft'])  vx -= 1;
    if (keys['d'] || keys['arrowright']) vx += 1;
    const moving = vx !== 0 || vz !== 0;

    if (moving) {
      // Rotate by camera angle so W = away from camera
      const cosA = Math.cos(-camAngle);
      const sinA = Math.sin(-camAngle);
      const rx = vx * cosA - vz * sinA;
      const rz = vx * sinA + vz * cosA;
      const len = Math.hypot(rx, rz);
      const nx = rx / len, nz = rz / len;
      player.position.x += nx * speed * dt;
      player.position.z += nz * speed * dt;
      // Face direction
      player.rotation.y = Math.atan2(nx, nz) + Math.PI;
      // Walk animation
      state.walkPhase += dt * 10;
      const swing = Math.sin(state.walkPhase) * 0.4;
      player.userData.legs[0].rotation.x = swing;
      player.userData.legs[1].rotation.x = -swing;
      player.userData.arms[0].rotation.x = -swing*0.6;
      player.userData.arms[1].rotation.x = swing*0.6;
      // bob
      player.position.y = Math.abs(Math.sin(state.walkPhase*0.5)) * 0.05;
    } else {
      // idle reset
      player.userData.legs[0].rotation.x *= 0.8;
      player.userData.legs[1].rotation.x *= 0.8;
      player.userData.arms[0].rotation.x *= 0.8;
      player.userData.arms[1].rotation.x *= 0.8;
      player.position.y = 0;
    }

    // Clamp position to arena
    const dist = Math.hypot(player.position.x, player.position.z);
    if (dist > fenceR - 1) {
      player.position.x *= (fenceR - 1) / dist;
      player.position.z *= (fenceR - 1) / dist;
    }

    // Camera orbit
    const camR = 18;
    camera.position.x = player.position.x + Math.sin(camAngle) * camR;
    camera.position.z = player.position.z + Math.cos(camAngle) * camR;
    camera.position.y = camHeight;
    camera.lookAt(player.position.x, 1.5, player.position.z);

    // Carry item — float above head
    if (state.picked) {
      state.picked.position.copy(player.position);
      state.picked.position.y = 2.6 + Math.sin(now*0.005) * 0.05;
      // spin slowly
      state.picked.rotation.y = now * 0.002;
      // add to scene so it renders
      if (!state.picked.parent) scene.add(state.picked);
    }

    // Indicator ring under player
    const targetBin = findNearestBin();
    const targetItem = !state.picked ? findNearestItem() : null;
    const showInd = targetBin || targetItem;
    ind.material.opacity = showInd ? 0.8 : 0;
    if (targetBin) ind.material.color.setHex(targetBin.userData.bin === state.picked?.userData.bin ? 0x7ec850 : 0xd23636);
    else if (targetItem) ind.material.color.setHex(0xf5c211);

    // Push HUD occasionally
    if (Math.floor(now / 200) !== state._lastHudTick) {
      state._lastHudTick = Math.floor(now / 200);
      pushHud();
    }

    renderer.render(scene, camera);
  };
  pushHud();
  tick();

  return {
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', mu);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}

/* ---- Trash mesh factory ---- */
function makeTrash(T, kind, color) {
  if (kind === 'bottle') {
    const g = new T.Group();
    const body = new T.Mesh(new T.CylinderGeometry(0.22, 0.22, 0.7, 10), new T.MeshLambertMaterial({ color }));
    body.position.y = 0;
    g.add(body);
    const neck = new T.Mesh(new T.CylinderGeometry(0.1, 0.18, 0.2, 8), new T.MeshLambertMaterial({ color }));
    neck.position.y = 0.45;
    g.add(neck);
    const cap = new T.Mesh(new T.CylinderGeometry(0.12, 0.12, 0.1, 8), new T.MeshLambertMaterial({ color: 0x2b6cb0 }));
    cap.position.y = 0.6;
    g.add(cap);
    return g;
  }
  if (kind === 'paper') {
    const g = new T.Mesh(new T.IcosahedronGeometry(0.36, 0), new T.MeshLambertMaterial({ color, flatShading: true }));
    return g;
  }
  if (kind === 'can') {
    const g = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 0.55, 12), new T.MeshLambertMaterial({ color }));
    return g;
  }
  if (kind === 'jar') {
    const g = new T.Group();
    const body = new T.Mesh(new T.CylinderGeometry(0.3, 0.28, 0.6, 12), new T.MeshLambertMaterial({ color, transparent: true, opacity: 0.7 }));
    g.add(body);
    const lid = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.12, 12), new T.MeshLambertMaterial({ color: 0x9c6b3c }));
    lid.position.y = 0.36;
    g.add(lid);
    return g;
  }
  if (kind === 'banana') {
    // a torus piece
    const g = new T.Mesh(new T.TorusGeometry(0.3, 0.08, 6, 10, Math.PI), new T.MeshLambertMaterial({ color }));
    g.rotation.z = Math.PI/4;
    return g;
  }
  if (kind === 'newspaper') {
    return new T.Mesh(new T.BoxGeometry(0.5, 0.06, 0.7), new T.MeshLambertMaterial({ color }));
  }
  return new T.Mesh(new T.BoxGeometry(0.4, 0.4, 0.4), new T.MeshLambertMaterial({ color }));
}

/* ---- Floating text label via canvas texture ---- */
function makeLabel(text) {
  const T = window.THREE;
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1c160e';
  // rounded rect
  ctx.beginPath();
  const r = 16;
  ctx.moveTo(r, 0);
  ctx.arcTo(256, 0, 256, 64, r);
  ctx.arcTo(256, 64, 0, 64, r);
  ctx.arcTo(0, 64, 0, 0, r);
  ctx.arcTo(0, 0, 256, 0, r);
  ctx.fill();
  ctx.fillStyle = '#f5c211';
  ctx.font = '900 32px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 36);
  const tex = new T.CanvasTexture(canvas);
  tex.minFilter = T.LinearFilter;
  const sprite = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true }));
  sprite.scale.set(2.4, 0.6, 1);
  return sprite;
}

window.Screen3D = Screen3D;
