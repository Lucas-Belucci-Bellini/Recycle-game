/* global React, ReactDOM, BINS, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect */
// app.jsx — router + screen picker + tweaks shell

const { useState, useEffect } = React;

const SCREENS = [
  { id: 'menu',       num: '01', label: 'Menu',        Component: () => window.ScreenMenu        && <window.ScreenMenu /> },
  { id: 'map',        num: '02', label: 'Campanha',    Component: () => window.ScreenMap         && <window.ScreenMap /> },
  { id: 'tutorial',   num: '03', label: 'Tutorial',    Component: () => window.ScreenTutorial    && <window.ScreenTutorial /> },
  { id: 'sector',     num: '04', label: 'Pátio',       Component: () => window.ScreenSector      && <window.ScreenSector /> },
  { id: 'hud',        num: '05', label: 'HUD',         Component: () => window.ScreenHUD         && <window.ScreenHUD /> },
  { id: 'automation', num: '06', label: 'Automação',   Component: () => window.ScreenAutomation  && <window.ScreenAutomation /> },
  { id: 'shop',       num: '07', label: 'Loja',        Component: () => window.ScreenShop        && <window.ScreenShop /> },
  { id: 'quiz',       num: '08', label: 'Quiz',        Component: () => window.ScreenQuiz        && <window.ScreenQuiz /> },
  { id: 'result',     num: '09', label: 'Fim de fase', Component: () => window.ScreenResult      && <window.ScreenResult /> },
  { id: 'school',     num: '10', label: 'Escola',      Component: () => window.ScreenSchool      && <window.ScreenSchool /> },
  { id: 'demo3d',     num: '11', label: '★ 3D JOGÁVEL', Component: () => window.Screen3D         && <window.Screen3D /> },
  { id: 'keyart',     num: '12', label: '★ KEY ART',    Component: () => window.ScreenKeyArt     && <window.ScreenKeyArt /> },
  { id: 'trailer',    num: '13', label: '★ TRAILER',    Component: () => window.ScreenTrailer    && <window.ScreenTrailer /> },
  { id: 'progression',num: '14', label: '★ SEGUNDA CHANCE', Component: () => window.ScreenProgression && <window.ScreenProgression /> },
  { id: 'endings',    num: '15', label: '★ FINAIS',     Component: () => window.ScreenEndings     && <window.ScreenEndings /> },
];

/* ------------------------------------------------------------------
   App — top-level router + responsive scaling for the 1920x1080 stage
   ------------------------------------------------------------------ */
function App() {
  // Tweaks (paleta + opções globais)
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "visual": "padrao",
    "language": "pt"
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Route via URL hash so user can deep-link a screen
  const [route, setRoute] = useState(() => {
    const h = (location.hash || '').replace('#', '');
    return SCREENS.find(s => s.id === h)?.id || 'menu';
  });
  useEffect(() => {
    const onHash = () => {
      const h = (location.hash || '').replace('#', '');
      setRoute(SCREENS.find(s => s.id === h)?.id || 'menu');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // navigation helper exposed globally so screens can call goTo('sector')
  useEffect(() => {
    window.goTo = (id) => { location.hash = id; };
  }, []);

  // Scale 1920x1080 stage to fit viewport
  useEffect(() => {
    const stage = document.getElementById('root');
    const host = document.getElementById('stage-host');
    if (!stage || !host) return;
    const fit = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      const s = Math.min(w / 1920, h / 1080);
      stage.style.transform = `scale(${s})`;
    };
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    fit();
    window.addEventListener('resize', fit);
    return () => { ro.disconnect(); window.removeEventListener('resize', fit); };
  }, []);

  // Apply visual tweak via [data-visual] on stage
  useEffect(() => {
    document.getElementById('root')?.setAttribute('data-visual', t.visual || 'padrao');
  }, [t.visual]);

  const current = SCREENS.find(s => s.id === route) || SCREENS[0];
  const ScreenComp = current.Component;
  return (
    <>
      <ScreenComp />
      <Tweaks t={t} setTweak={setTweak} />
    </>
  );
}

function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks de design" defaultOpen={false}>
      <TweakSection label="Direção visual">
        <TweakRadio
          tweak="visual" value={t.visual} onChange={setTweak}
          options={[
            { value: 'padrao',    label: 'Pátio Vivo' },
            { value: 'blueprint', label: 'Blueprint' },
            { value: 'restaurado',label: 'Restaurado' },
          ]}
        />
        <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7, lineHeight: 1.45 }}>
          <b>Pátio Vivo</b> — cartoon terroso + sinalização industrial.<br/>
          <b>Blueprint</b> — leitura técnica, modo planejamento.<br/>
          <b>Restaurado</b> — clima pós-reforma, otimismo verde.
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

/* ------------------------------------------------------------------
   ScreenPicker — bottom strip to jump between screens
   ------------------------------------------------------------------ */
function ScreenPicker() {
  const [route, setRoute] = useState(() => (location.hash || '#menu').replace('#', ''));
  useEffect(() => {
    const onHash = () => setRoute((location.hash || '#menu').replace('#', ''));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return (
    <div className="screen-picker" data-no-print>
      {SCREENS.map(s => (
        <button
          key={s.id}
          className={"tab " + (route === s.id ? 'active' : '')}
          onClick={() => { location.hash = s.id; }}>
          <span className="num">{s.num}</span> {s.label}
        </button>
      ))}
    </div>
  );
}

// boot
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
ReactDOM.createRoot(document.getElementById('picker-host')).render(<ScreenPicker />);
