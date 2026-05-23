# 10 — Plano Técnico e Arquitetura

## Stack atual
- **HTML5 + CSS + JavaScript puro**, arquivo único (`Jogo da Reciclagem.html`).
- Sem build, sem dependências (só fontes do Google).
- Vantagem enorme para escola: **abre em qualquer navegador, sem instalar nada**.

## Recomendação de evolução — D-03
Manter **Web puro** enquanto o escopo couber. Só migrar para engine
(Phaser/Godot/Unity) se a complexidade exigir. Caminho sugerido:

1. **Curto prazo**: separar o HTML único em `index.html` + `css/` + `js/`
   (módulos) para facilitar manutenção.
2. **Médio prazo**: se a UI crescer muito, avaliar **Phaser** (web, 2D, JS/TS).
3. **Longo prazo / mobile nativo**: avaliar **Godot 4** ou **Unity** (2D
   isométrico para baixar custo).

## Módulos de código (arquitetura MVP)
- **ItemSystem** — tipo, peso, risco, valor, estado de contaminação.
- **BinSystem** — capacidade, pureza, tipo aceito, saturação.
- **RobotSystem** — fila de tarefas + pathfinding.
- **EconomySystem** — recompensas, loja e upgrades.
- **MissionSystem** — objetivos e eventos.
- **EduSystem** — tooltips, cartas, quiz, métricas de aprendizagem.
- **SaveSystem** — persistência.

## Dados fora do código
- Resíduos, lixeiras, upgrades e preços em **JSON** (ou ScriptableObjects se Unity).
- **Tabela de balanceamento separada** do código (planilha → JSON) para ajuste rápido.

## IA de robô (MVP)
- **Fila de prioridades** de tarefas.
- **A\*** simples no mapa (pathfinding).
- Fallback quando a rota está bloqueada.
- Evoluir para os níveis de IA do [doc 05](05-robos-e-automacao.md).

## Save / Load
- **MVP**: `LocalStorage` (progresso, upgrades, estatísticas).
- Salvar: progresso de campanha, upgrades comprados, estatísticas educativas
  (taxa de acerto por categoria).
- **Futuro**: backend leve opcional para ranking e Modo Escola (relatório por turma).

## Telemetria e métricas de qualidade
- Erro por tipo de lixo.
- Tempo médio de triagem/decisão.
- Uso de automação por partida.
- Retenção por sessão; taxa de conclusão de fase.
- Ganho de aprendizado (pré/pós-teste).

---
[↑ Índice](README.md) · anterior: [« 09](09-ui-ux-e-acessibilidade.md) · próximo: [11 »](11-roadmap-e-mds.md)
