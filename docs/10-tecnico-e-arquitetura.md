# 10 — Plano Técnico e Arquitetura

## Stack atual (protótipo de mecânica, 2D)
- **HTML5 + CSS + JavaScript puro**, arquivo único (`Jogo da Reciclagem.html`).
- Sem build, sem dependências (só fontes do Google).
- Vantagem enorme para escola: **abre em qualquer navegador, sem instalar nada**.
- É um **protótipo** para validar a diversão/conteúdo de forma barata — a
  produção final será 3D (ver D-03 abaixo).

## Decisão D-03 (decidida): jogo final em 3D na Unreal Engine, com protótipo web 2D
O jogo **final será 3D, feito na Unreal Engine**. O build web atual
(`Jogo da Reciclagem.html`) é um **protótipo de mecânica em 2D**: serve para
validar gameplay e conteúdo educativo antes de investir em arte/3D.

- **Agora (protótipo 2D web)**: iterar mecânica, categorias, destinos,
  hierarquia (D-04), economia e conteúdo educativo. Roda no navegador, sem
  instalar — ótimo para testar em sala. **Design e dados são independentes de
  engine.**
- **Depois (produção 3D, Unreal Engine)**: portar as regras/dados já
  validados; resíduos, lixeiras, upgrades e balanceamento como dados
  (**DataTables + structs C++** — equivalente Unreal do ScriptableObject).
  Linguagens: **C++** + **Blueprints** (visual scripting). A camada visual 2D
  (SVG/CSS) é descartável; **a lógica e o balanceamento, não**.
- Inspirações coerentes com Unreal: **Satisfactory**, **Captain of Industry**,
  parcialmente **Cities: Skylines** — todas as referências de "fábrica + cidade
  + gestão de recursos" do projeto rodam confortavelmente em Unreal.

> **Trade-off conhecido — abandona "abrir no navegador, sem instalar".**
> A versão final em Unreal **não dá pra rodar no navegador** de forma viável
> (export WebGL/HTML5 no Unreal é fraco e quase não é usado). Builds são
> **executáveis nativos** (Windows/Linux/Mac), como Satisfactory ou Factorio.
> Em troca: visual AAA de fábrica (Nanite, Lumen) e o "feel" Satisfactory de
> graça. Para escola, será preciso **instalar o jogo** ou prover **builds
> Windows** prontos.

> **IP / direitos autorais.** A engine Unreal é livre/gratuita para uso
> (royalty só após US$ 1 M de receita do jogo). Mas os **arquivos / código
> compilado do Satisfactory** seguem sendo IP da **Coffee Stain Studios** e
> **não podem ser usados como base** do nosso jogo — nem com cópia legítima
> em mãos. A inspiração é apenas de gênero e mecânica. Existe um **Mod Kit
> oficial** da Coffee Stain para fazer **mods do Satisfactory**, mas mod ≠
> jogo próprio (e exige o jogador ter o Satisfactory instalado).

> Substitui a decisão anterior por Unity (e a sugestão original de "2D
> isométrico"). A migração para a Unreal acontece quando a mecânica estiver
> validada no protótipo. Implicação prática: manter a lógica do protótipo
> **dirigida por dados** (tabelas separadas do código de render) para o
> port direto em DataTables/structs Unreal.

## Módulos de código (arquitetura MVP)
- **ItemSystem** — tipo, peso, risco, valor, estado de contaminação.
- **BinSystem** — capacidade, pureza, tipo aceito, saturação.
- **RobotSystem** — fila de tarefas + pathfinding.
- **EconomySystem** — recompensas, loja e upgrades.
- **MissionSystem** — objetivos e eventos.
- **EduSystem** — tooltips, cartas, quiz, métricas de aprendizagem.
- **SaveSystem** — persistência.

## Dados fora do código
- Resíduos, lixeiras, upgrades e preços em **JSON** (na Unreal: importáveis como **DataTables** com structs C++).
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
