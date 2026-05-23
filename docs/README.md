# Documentação do Jogo da Reciclagem

Este `docs/` consolida e organiza as ideias das branches `planos` e
`codex/elaborate-educational-game-plan` num plano único **para seguir**,
ancorado no que o jogo já faz hoje (`Jogo da Reciclagem.html`).

A ideia é simples: ler na ordem, do 00 ao 12, e ter em mãos um Game Design
Document (GDD) completo + roadmap de produção + backlog inicial.

## Como usar

1. Comece pelo **[00 — Estado atual e lacunas](00-estado-atual-e-gaps.md)** para
   saber de onde estamos partindo.
2. Leia **01 a 10** como GDD (o "o quê" e o "porquê" de cada sistema).
3. Use **11 (Roadmap/MDS)** e **12 (Backlog)** como o "como" e o "quando".

## Índice

| # | Documento | O que cobre |
|---|-----------|-------------|
| 00 | [Estado atual e lacunas](00-estado-atual-e-gaps.md) | O que o HTML já faz e o que falta |
| 01 | [Visão geral](01-visao-geral.md) | Pitch, objetivos, público, plataformas |
| 02 | [Core loop e gameplay](02-core-loop-e-gameplay.md) | Loop principal e mecânicas-base |
| 03 | [Resíduos e categorias](03-residuos-e-categorias.md) | Tipos de lixo, itens e regras de triagem |
| 04 | [Lixeiras e caçambas](04-lixeiras-e-cacambas.md) | Atributos, tiers e tela de comparação |
| 05 | [Robôs e automação](05-robos-e-automacao.md) | Tipos de robô, tarefas e níveis de IA |
| 06 | [Economia e progressão](06-economia-e-progressao.md) | Moedas, fontes de ganho, custos, upgrades |
| 07 | [Missões, mapas e modos](07-missoes-mapas-e-modos.md) | Campanha, tipos de missão, modos, boss |
| 08 | [Conteúdo educativo e Modo Escola](08-conteudo-educativo-e-modo-escola.md) | Pedagogia, quizzes, relatório do professor |
| 09 | [UI/UX e acessibilidade](09-ui-ux-e-acessibilidade.md) | Interface, feedback, acessibilidade |
| 10 | [Técnico e arquitetura](10-tecnico-e-arquitetura.md) | Stack, módulos, dados, save/load |
| 11 | [Roadmap e MDS](11-roadmap-e-mds.md) | Cronograma por fases, MVP, equipe |
| 12 | [Backlog inicial](12-backlog-inicial.md) | Épicos e user stories P0/P1/P2 |

## Decisões em aberto

Pontos que dependem de você decidir (estão marcados como `D-0x` ao longo dos docs):

- **D-01 — Nome do jogo.** Hoje o título de trabalho é **"Jogo da Reciclagem"**.
  Candidatos de marca surgidos nas branches: *EcoPátio: Mestre da Triagem*,
  *Eco Tycoon: Lixão Inteligente*, *EcoSort* e *Lixão Arcano: Operação Recicla+*.
  Recomendação: manter **Jogo da Reciclagem** como título e adotar **EcoPátio**
  como marca/subtítulo. Decisão sua.
- **D-02 — Escopo do MVP.** Ver [11 — Roadmap](11-roadmap-e-mds.md). Sugestão:
  4 categorias, 1 modo, loja simples e 1 robô.
- **D-03 — Plataforma alvo.** O jogo já roda como Web (HTML único). Ver
  [10 — Técnico](10-tecnico-e-arquitetura.md) antes de cogitar Unity/Godot.

## Origem do conteúdo

- `planos` → ideias brutas, cronograma semana-a-semana, MVP, equipe, monetização.
- `codex/elaborate-educational-game-plan` → estrutura limpa de GDD em 10 partes.
- Este `docs/` = a fusão dos dois, revisada e alinhada ao código atual.
