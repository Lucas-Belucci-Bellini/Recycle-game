# 11 — Roadmap e MDS (Módulos de Desenvolvimento)

Cronograma "para seguir", partindo do estado atual ([doc 00](00-estado-atual-e-gaps.md)).
Cada MDS tem **objetivo**, **entregas** e **critério de pronto (DoD)**.

> Como o core loop (MDS 2) **já existe** no HTML, o trabalho real começa
> reforçando a base e seguindo para economia/persistência.

## MDS 1 — Conceito e documentação base ✅ (este `docs/`)
- **Objetivo**: definir o jogo com clareza.
- **Entregas**: GDD (docs 01–10), tipos de lixo, público-alvo, metas de aprendizagem.
- **DoD**: escopo do MVP fechado e aprovado (ver D-02 no [índice](README.md)).

## MDS 2 — Protótipo jogável de separação ✅ (em grande parte feito)
- **Objetivo**: ter o coração do gameplay funcionando.
- **Entregas**: arrastar/arremessar, feedback acerto/erro, pontuação, combo, rodada.
- **DoD**: divertido em 5 min de teste. **Status: já no HTML atual.**
- **Falta**: refatorar o HTML único em módulos ([doc 10](10-tecnico-e-arquitetura.md)).

## MDS 3 — Persistência + lixeiras/caçambas comparáveis
- **Objetivo**: progressão por armazenamento e salvar progresso.
- **Entregas**: LocalStorage; atributos por recipiente (capacidade, custo,
  durabilidade, velocidade); tela de comparação lado a lado; compra/substituição; saturação.
- **DoD**: jogador percebe vantagem clara dos upgrades e o progresso é salvo.

## MDS 4 — Economia e progressão
- **Objetivo**: motivação de longo prazo.
- **Entregas**: créditos por acerto; penalidade por erro; missões diárias/semanais;
  curva inicial de preços balanceada; loja.
- **DoD**: progressão sem grind excessivo nos primeiros níveis.

## MDS 5 — Conteúdo educativo + Modo Escola (base)
- **Objetivo**: reforçar aprendizagem de verdade.
- **Entregas**: tooltips do "porquê", cartas informativas, miniquiz entre fases,
  primeiro relatório de acertos por categoria.
- **DoD**: aprendizado mensurável em teste curto.

## MDS 6 — Mais categorias e itens
- **Objetivo**: profundidade de conteúdo.
- **Entregas**: rejeito, eletrônico, perigoso/hospitalar; itens dúbios e compostos;
  regras de contaminação que mudam categoria.
- **DoD**: pelo menos 8 categorias e 20+ itens jogáveis.

## MDS 7 — Esteiras, drones e robôs (automação)
- **Objetivo**: tirar o jogador do 100% manual (pilar *Satisfactory*).
- **Entregas**: 1ª esteira + separador automático; robô coletor/triador;
  drone batedor; painel de designar tarefa; IA por fila/prioridade (nível 1–2).
- **DoD**: jogador monta uma mini-linha e vê a eficiência subir sozinha.

## MDS 8 — Upgrades de robôs + árvore de tecnologia
- **Objetivo**: profundidade de meta-jogo.
- **Entregas**: upgrades (bateria, velocidade, precisão, capacidade); falhas/risco;
  árvore de pesquisa (visão por IA, braço hidráulico); manutenção.
- **DoD**: diferentes "builds" de automação possíveis.

## MDS 9 — Mapas, dificuldade e eventos dinâmicos
- **Objetivo**: variar desafio e rejogabilidade.
- **Entregas**: 3+ setores do lixão (variação visual); clima/eventos (chorume,
  picos); modos (campanha, infinito, cronometrado); boss "Mega Montanha de Lixo".
- **DoD**: 30–60 min de conteúdo sem repetição cansativa.

## MDS 10 — Polimento, QA, métricas e lançamento
- **Objetivo**: publicar com qualidade.
- **Entregas**: UX/tutorial/acessibilidade; localização PT-BR completa; telemetria;
  correção de bugs; build candidata; Modo Escola completo (relatório por turma);
  plano de updates.
- **DoD**: versão 1.0 estável e pronta para escolas/comunidade.

---

## MVP (8–10 semanas) — D-02
Para lançar rápido, foque em:
- 4 categorias (papel, plástico, vidro, orgânico) — **já no jogo**.
- 1 setor com 3 fases (limpar → governo reforma a área).
- 3 destinos jogáveis (reciclar, compostar, aterro).
- 3 recipientes (lixeira comum, seletiva, caçamba) + 1 esteira/separador.
- 1 robô coletor.
- Pontuação + loja de upgrades + persistência.
- Tutorial + 1 modo infinito.

## Cronograma resumido (referência)
| Fase | Duração |
|------|---------|
| Pré-produção | 3–4 semanas |
| Protótipo jogável | 6–8 semanas (✅ base feita) |
| Vertical slice | 4 semanas |
| Conteúdo + polimento | 8–12 semanas |
| Beta educacional | 4 semanas |

## Equipe mínima sugerida (indie)
1 game designer · 1 prog. gameplay · 1 prog. UI/sistemas · 1 artista 2D/3D ·
1 som/UI · 1 QA (part-time) · 1 consultor de educação ambiental (freelancer).

---
[↑ Índice](README.md) · anterior: [« 10](10-tecnico-e-arquitetura.md) · próximo: [12 »](12-backlog-inicial.md)
