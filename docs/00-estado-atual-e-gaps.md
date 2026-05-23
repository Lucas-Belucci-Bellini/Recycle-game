# 00 — Estado Atual e Lacunas

Ponto de partida real do projeto. Tudo nos docs 01–12 deve ser lido como
"o que construir **a partir** daqui", não do zero.

## O que já existe hoje

Arquivo único: **`Jogo da Reciclagem.html`** (~1.130 linhas, HTML + CSS + JS,
sem build, sem dependências além de fontes do Google).

### Já implementado

- **5 lixeiras** com o código de cores oficial brasileiro (CONAMA 275):
  - Azul → Papel
  - Vermelho → Plástico
  - Verde → Vidro
  - Amarelo → Metal
  - Marrom → Orgânico
- **7 itens** com destino correto definido: bola de papel, garrafa PET,
  pote de vidro, lata de alumínio, casca de banana, jornal, copo plástico.
- **Mecânica de arremesso/arrastar** (pointer events: `pointerDown/Move/Up`,
  `handleDrop`, `binAt`, destaque da lixeira sob o item).
- **Pontuação** (`score`, `showPoints`), **combo** (mensagens estilo "swish")
  e **vidas** (`hearts`), **estrelas** (`stars`).
- **Feedback visual**: confete no acerto (`confettiBurst`), `showFeedback`,
  cores de acerto/erro.
- **Fim de jogo e reset** (`gameOver`, `resetGame`), fila embaralhada
  (`shuffleQueue`, `nextItem`).
- **Arte SVG** própria por item e estilo cartoon (fontes Fredoka/Nunito).

### Mapeamento com o GDD

| Sistema do GDD | Estado |
|----------------|--------|
| Core loop de triagem (doc 02) | **Parcial** — arremesso/acerto/erro/combo prontos |
| Categorias de resíduos (doc 03) | **Parcial** — 5 categorias, 7 itens |
| Lixeiras (doc 04) | **Parcial** — 5 lixeiras fixas, sem atributos/compra |
| UI/UX e feedback (doc 09) | **Parcial** — HUD, feedback e acessibilidade básica |
| Robôs (doc 05) | Não iniciado |
| Caçambas e capacidade (doc 04) | Não iniciado |
| Economia/loja/upgrades (doc 06) | Não iniciado |
| Missões/mapas/modos (doc 07) | Não iniciado |
| Conteúdo educativo / Modo Escola (doc 08) | Não iniciado |
| Save/Load e telemetria (doc 10) | Não iniciado |

## Lacunas prioritárias (o que falta para virar "o jogo planejado")

1. **Persistência**: nenhum progresso é salvo (sem LocalStorage).
2. **Economia**: não há moeda, loja, nem upgrades.
3. **Capacidade**: lixeiras não enchem nem precisam de caçamba/esvaziamento.
4. **Conteúdo educativo explícito**: falta tooltip do "porquê", quiz e cartas.
5. **Robôs/automação**: inexistentes.
6. **Progressão**: sem níveis/fases/missões; é uma rodada única.
7. **Mais categorias e itens**: faltam eletrônico, perigoso/hospitalar, rejeito.
8. **Modo Escola**: sem relatório de acertos por categoria para o professor.

## Pontos fortes a preservar

- Já usa o **código de cores oficial** — base pedagógica correta.
- **Sem dependências de build** → fácil de publicar e rodar em qualquer escola.
- Feedback "gostoso" (confete, combo) → boa retenção, manter o "feel".

## Recomendação de sequência

Seguir o roadmap do [doc 11](11-roadmap-e-mds.md). A ordem sugerida que respeita
o que já existe: **persistência + economia → capacidade/caçambas → conteúdo
educativo/quiz → mais categorias → robôs → missões/modos → Modo Escola**.

---
[↑ Índice](README.md) · próximo: [01 — Visão geral »](01-visao-geral.md)
