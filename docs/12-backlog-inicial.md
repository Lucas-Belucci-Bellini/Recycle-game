# 12 — Backlog Inicial (Épicos e User Stories)

Backlog acionável para **começar já**, a partir do HTML atual. Prioridades:
**P0** = MVP/imediato · **P1** = importante · **P2** = depois.

## Épico A — Fundação técnica
- **P0** Refatorar `Jogo da Reciclagem.html` em `index.html` + `js/` + `css/`.
- **P0** Criar `SaveSystem` com LocalStorage (score, progresso, estatísticas).
- **P1** Mover dados (itens, lixeiras, preços) para arquivos JSON.
- **P1** Estrutura de telemetria local (erro por categoria, tempo de decisão).

## Épico B — Economia e loja
- **P0** Como jogador, ganho **créditos** ao acertar a triagem.
- **P0** Como jogador, **perco** créditos/pontos ao errar.
- **P0** Como jogador, abro uma **loja** e compro upgrades.
- **P1** Como jogador, recebo **missões diárias** ("recicle 50 plásticos").

## Épico C — Lixeiras, caçambas e capacidade
- **P0** Como jogador, vejo a **capacidade** de cada lixeira encher.
- **P0** Como jogador, **comparo** 2–3 recipientes lado a lado antes de comprar.
- **P1** Como jogador, compro **caçambas** como buffer e as esvazio.
- **P2** Como jogador, uso **compactador** para reduzir volume.

## Épico D — Conteúdo educativo
- **P0** Como aluno, vejo um **tooltip** explicando por que o item vai naquela lixeira.
- **P1** Como aluno, jogo um **miniquiz** entre fases e ganho recompensa.
- **P1** Como aluno, coleciono **cartas** sobre materiais.
- **P2** Como professor, vejo um **relatório de acertos por categoria** (Modo Escola).

## Épico E — Mais resíduos
- **P1** Adicionar categorias: rejeito, eletrônico, perigoso/hospitalar.
- **P1** Adicionar itens **dúbios** (exigem inspeção).
- **P2** Itens **compostos** com pré-triagem (tetrapak, garrafa+tampa).

## Épico F — Robôs e automação
- **P1** Como jogador, compro um **robô coletor**.
- **P1** Como jogador, **designo uma tarefa** a um robô ("priorizar plástico").
- **P2** Como jogador, dou **upgrade** nos robôs (velocidade, precisão, bateria).
- **P2** Árvore de tecnologia/pesquisa.

## Épico G — Progressão, modos e fases
- **P0** Como jogador, avanço por **fases** com metas (não só rodada única).
- **P1** Como jogador, jogo no **modo infinito** e no **sandbox sem tempo**.
- **P2** **Boss** "Mega Montanha de Lixo" ao fim de cada capítulo.
- **P2** **Coop local** para 2 jogadores.

## Épico H — UX, acessibilidade e polimento
- **P0** **Tutorial** interativo de ~3 min.
- **P0** **Modo daltônico** (ícone + texto além da cor).
- **P1** Fonte ajustável e opção **sem limite de tempo**.
- **P1** Sons e feedback refinados (manter o "feel" atual de confete/combo).

## Primeiro sprint sugerido (P0 do MVP)
1. Refatorar HTML em módulos (Épico A).
2. SaveSystem com LocalStorage (Épico A).
3. Créditos + loja + 1 upgrade real (Épico B).
4. Capacidade de lixeira + comparação (Épico C).
5. Tooltip educativo por item (Épico D).
6. Fases com metas + tela de fim (Épico G).

> Sugestão: subir este backlog como **issues do GitHub** (uma por user story),
> agrupadas por épico via labels. Posso gerar as issues se você quiser.

---
[↑ Índice](README.md) · anterior: [« 11](11-roadmap-e-mds.md)
