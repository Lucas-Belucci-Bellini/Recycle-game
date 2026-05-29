/* global React, BINS, RecycleSymbol, BinSVG */
// screen-school.jsx — Tela 10: Modo Escola / Relatório do professor

function ScreenSchool() {
  return (
    <div data-screen-label="10 Modo Escola" style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--paper-deep)' }}>
      {/* Background — quadro com grade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          repeating-linear-gradient(0deg, transparent 0 80px, rgba(28,22,14,0.03) 80px 81px),
          var(--paper-deep)
        `,
      }} />

      {/* Top — modo escola */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 80,
        background: 'var(--steel-d, #1f3a5a)', color: '#fff',
        display: 'flex', alignItems: 'center', padding: '0 28px', gap: 20,
        borderBottom: '4px solid var(--hazard)',
      }}>
        <button onClick={() => window.goTo('menu')} style={{ background: 'transparent', color: '#fff', border: 'none', fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, cursor: 'pointer', letterSpacing: '0.08em' }}>← SAIR</button>
        <span style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <RecycleSymbol size={42} color="var(--hazard)" />
          <div>
            <div className="f-mono" style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.14em' }}>PAINEL DA EDUCADORA</div>
            <div className="f-display" style={{ fontSize: 22, lineHeight: 1 }}>Modo Escola</div>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="chip sm" style={{ background: 'var(--hazard)', color: 'var(--ink)' }}>👩‍🏫 Profa. Carla</span>
          <span className="chip sm" style={{ background: '#fff', color: 'var(--ink)' }}>🏫 EMEF Cecília Meireles</span>
          <button className="btn ghost" style={{ padding: '8px 14px', fontSize: 12 }}>📤 EXPORTAR PDF</button>
        </div>
      </div>

      {/* Title row */}
      <div style={{ position: 'absolute', top: 100, left: 50, right: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <span className="kicker steel">TURMA 7º B · 28 ALUNOS · OUTUBRO</span>
          <h1 className="f-display" style={{ fontSize: 56, margin: '8px 0 0', lineHeight: 1 }}>Relatório de aprendizagem</h1>
          <div className="f-serif" style={{ fontSize: 22, color: 'var(--ink-soft)', marginTop: 4 }}>
            12 sessões · 4h 28min jogadas · CONAMA 275
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Visão','Por aluno','Por matéria','Erros comuns'].map((t,i)=>(
            <span key={t} className="f-ui" style={{
              background: i === 0 ? 'var(--ink)' : 'var(--card)',
              color: i === 0 ? 'var(--hazard)' : 'var(--ink)',
              padding: '10px 18px', borderRadius: 10, fontSize: 14,
              border: '3px solid var(--ink)',
              boxShadow: i === 0 ? 'inset 0 4px 0 rgba(0,0,0,0.2)' : '0 4px 0 var(--ink)',
              letterSpacing: '0.06em',
            }}>{t.toUpperCase()}</span>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div style={{
        position: 'absolute', top: 240, left: 50, right: 50, bottom: 50,
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr 1fr',
        gridTemplateRows: 'auto 1fr',
        gap: 20,
      }}>
        {/* KPIs strip */}
        <KPI title="Pureza média da turma" big="89%" sub="+ 12 pts desde set." accent="var(--verde)" />
        <KPI title="Acertos totais" big="3 482" sub="↑ 18% vs. mês anterior" accent="var(--azul)" />
        <KPI title="Estrelas conquistadas" big="68 / 84" sub="2 setores 100% limpos" accent="var(--hazard)" />

        {/* Class chart */}
        <Card kicker="DESEMPENHO DA TURMA" title="Distribuição de pureza" style={{ gridColumn: '1 / 3' }}>
          <ClassChart />
        </Card>

        {/* Top mistakes */}
        <Card kicker="ERROS RECORRENTES" title="Onde escorregam">
          <Mistakes />
        </Card>
      </div>
    </div>
  );
}

function KPI({ title, big, sub, accent }) {
  return (
    <div style={{
      background: 'var(--card)', border: '4px solid var(--ink)', borderRadius: 16,
      boxShadow: '0 8px 0 var(--ink)', padding: 20,
      borderLeft: `12px solid ${accent}`,
    }}>
      <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {title}
      </div>
      <div className="f-display" style={{ fontSize: 56, color: 'var(--ink)', lineHeight: 1, marginTop: 4 }}>
        {big}
      </div>
      <div className="f-ui" style={{ fontSize: 14, color: 'var(--verde-d)', marginTop: 4 }}>↑ {sub}</div>
    </div>
  );
}

function Card({ kicker, title, children, style }) {
  return (
    <div style={{
      background: 'var(--card)', border: '4px solid var(--ink)', borderRadius: 16,
      boxShadow: '0 8px 0 var(--ink)', padding: 22, minHeight: 0,
      display: 'flex', flexDirection: 'column',
      ...style,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span className="kicker hazard">{kicker}</span>
        <span className="f-mono" style={{ fontSize: 11, opacity: 0.6 }}>● ATUALIZADO 2 MIN ATRÁS</span>
      </div>
      <h2 className="f-display" style={{ fontSize: 26, margin: 0, lineHeight: 1.05 }}>{title}</h2>
      <div style={{ marginTop: 14, flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}

function ClassChart() {
  // Histogram-style chart of student purity distribution
  const buckets = [
    { range: '<60', n: 1, color: 'var(--signal)' },
    { range: '60-69', n: 2, color: '#e07a1f' },
    { range: '70-79', n: 4, color: '#f0b315' },
    { range: '80-84', n: 6, color: '#a8c850' },
    { range: '85-89', n: 8, color: 'var(--verde)' },
    { range: '90-94', n: 5, color: '#2f6b22' },
    { range: '95-100', n: 2, color: '#1f6428' },
  ];
  const max = Math.max(...buckets.map(b => b.n));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'flex-end', gap: 12, paddingBottom: 10,
        borderBottom: '3px solid var(--ink)',
      }}>
        {buckets.map(b => (
          <div key={b.range} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <div className="f-display" style={{ fontSize: 18 }}>{b.n}</div>
            <div style={{
              width: '100%', height: `${(b.n/max)*82}%`,
              background: b.color, border: '3px solid var(--ink)', borderRadius: '6px 6px 0 0',
              boxShadow: '0 4px 0 var(--ink)',
              minHeight: 12,
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        {buckets.map(b => (
          <div key={b.range} style={{ flex: 1, textAlign: 'center' }}>
            <span className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{b.range}%</span>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 12, paddingTop: 12, borderTop: '2px dashed var(--paper-edge)',
      }}>
        <div>
          <span className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.1em' }}>MELHOR ALUNO</span>
          <div className="f-display" style={{ fontSize: 20 }}>Maria L. · 97%</div>
        </div>
        <div>
          <span className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.1em' }}>PRECISA DE APOIO</span>
          <div className="f-display" style={{ fontSize: 20, color: 'var(--signal)' }}>3 alunos · &lt; 70%</div>
        </div>
      </div>
    </div>
  );
}

function Mistakes() {
  const errs = [
    { from: 'vermelho', to: 'azul', count: 64, note: 'Tetra Pak' },
    { from: 'azul', to: 'amarelo', count: 41, note: 'Latas com label' },
    { from: 'marrom', to: 'cinza', count: 38, note: 'Restos orgânicos descartados como rejeito' },
    { from: 'laranja', to: 'cinza', count: 22, note: 'Pilhas → ponto de coleta especial' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {errs.map((e,i) => {
        const f = BINS.find(b => b.id === e.from);
        const t = BINS.find(b => b.id === e.to);
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'var(--paper-deep)', border: '3px solid var(--ink)', borderRadius: 10,
            padding: '10px 12px',
          }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: f.hex, border: '2.5px solid var(--ink)' }} />
            <span style={{ fontSize: 18, color: 'var(--ink-soft)' }}>→</span>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: t.hex, border: '2.5px solid var(--ink)' }} />
            <div style={{ flex: 1, marginLeft: 6 }}>
              <div className="f-display" style={{ fontSize: 16, lineHeight: 1.1 }}>{e.note}</div>
              <div className="f-mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
                {f.name} → {t.name}
              </div>
            </div>
            <div className="f-display" style={{ fontSize: 24, color: 'var(--signal)' }}>{e.count}</div>
          </div>
        );
      })}
      <div style={{
        marginTop: 4, padding: 12,
        background: 'var(--ink)', color: 'var(--paper)', borderRadius: 10,
      }}>
        <div className="f-mono" style={{ fontSize: 11, color: 'var(--hazard)', letterSpacing: '0.1em' }}>
          💡 SUGESTÃO DE AULA
        </div>
        <div className="f-ui" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.35 }}>
          Levar embalagens reais à classe e discutir os 4 erros campeões.
        </div>
      </div>
    </div>
  );
}

window.ScreenSchool = ScreenSchool;
