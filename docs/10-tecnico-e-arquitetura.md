# 10 — Plano Técnico e Arquitetura

## Stack atual (protótipo de mecânica, 2D)
- **HTML5 + CSS + JavaScript puro**, arquivo único (`Jogo da Reciclagem.html`).
- Sem build, sem dependências (só fontes do Google).
- Vantagem enorme para escola: **abre em qualquer navegador, sem instalar nada**.
- É um **protótipo** para validar a diversão/conteúdo de forma barata — a
  produção final será 3D (ver D-03 abaixo).

## Decisão D-03 (decidida): jogo final em 3D na Unity, com protótipo web 2D
O jogo **final será 3D, feito na Unity**. O build web atual
(`Jogo da Reciclagem.html`) é um **protótipo de mecânica em 2D**: serve para
validar gameplay e conteúdo educativo antes de investir em arte/3D.

- **Agora (protótipo 2D web)**: iterar mecânica, categorias, destinos,
  hierarquia (D-04), economia e conteúdo educativo. Roda no navegador, sem
  instalar — ótimo para testar em sala. **Design e dados são independentes de
  engine.**
- **Depois (produção 3D, Unity)**: portar as regras/dados já validados;
  resíduos, lixeiras, upgrades e balanceamento como dados (JSON /
  ScriptableObjects). A camada visual 2D (SVG/CSS) é descartável; **a lógica e
  o balanceamento, não**.
- Sempre que possível, **exportar para web (WebGL)** para não perder a vantagem
  de "abrir no navegador" nas escolas.

> Substitui a sugestão antiga de "engine 2D isométrico". A migração para a Unity
> acontece quando a mecânica estiver validada no protótipo. Implicação prática:
> manter a lógica do protótipo **dirigida por dados** (tabelas de itens/lixeiras/
> destinos separadas do código de render) para facilitar o port.

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
