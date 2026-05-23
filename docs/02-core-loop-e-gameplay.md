# 02 — Core Loop e Gameplay

## A sensação central
Olhar uma montanha de lixo misturado e, peça por peça (depois esteira por
esteira), transformá-la em **terreno limpo**. O caos incomoda; resolver o caos
satisfaz. É o loop de *Librarian/Leaf it Alone/PowerWash* aplicado a um lixão,
com a escalada de automação de *Satisfactory*.

## Loop emocional (o "porquê vicia")
1. **Frustração**: pilha enorme, 7 cores misturadas, nada no lugar.
2. **Ação**: separar, rotear, limpar.
3. **Alívio/satisfação**: a área esvazia, o solo aparece, o governo reforma.
4. **Ambição**: "se eu tivesse um robô pra isso..." → automação → setor maior.

> É aqui que mora a lição (doc 08): a frustração do lixo misturado ensina, na
> pele, por que separar **na fonte** evita esse caos.

## Macro loop (a campanha)
1. Receber um **setor do lixão** entupido de resíduos.
2. **Escavar/coletar** o lixo da pilha.
3. **Identificar e separar** por tipo (as 7 cores — ver [doc 03](03-residuos-e-categorias.md)).
4. **Rotear para o destino certo**: reutilização, reciclagem, incineração
   (recuperação de energia) ou aterro seguro.
5. Ganhar **créditos, EcoPontos e reputação** (mais por reutilizar/reciclar; menos por incinerar/aterrar).
6. **Reinvestir** em estruturas e **automação** (esteiras, separadores, drones, robôs).
7. **Setor limpo → governo reforma a área** → desbloqueia o próximo setor maior.

## Micro loop (sessão de ~60s, fase manual)
- **0–15s**: chega/expõe-se uma leva de resíduos.
- **15–35s**: identificação visual + coleta (arrastar/arremessar — já existe).
- **35–50s**: roteamento para o destino correto + compactação.
- **50–60s**: feedback, pontuação e bônus de combo.

## Mecânicas centrais
- **Manual primeiro** (estado atual): arrastar/arremessar item ao destino correto.
- **Automação depois** (Satisfactory): esteiras levam o lixo, separadores
  classificam, drones coletam, robôs operam — reduzindo o trabalho manual.
- Cada item tem **material, volume, risco e valor** (ver [doc 03](03-residuos-e-categorias.md)).
- **Penalidade** por destino errado (contamina lote, multa, atrasa a limpeza).
- **Combo** por sequência de acertos → bônus (já implementado).
- **Capacidade**: lixeiras/caçambas enchem e precisam ser escoadas (ver [doc 04](04-lixeiras-e-cacambas.md)).

## Ritmo (do manual ao industrial)
- **Início**: poucos tipos, tudo na mão, pilhas pequenas.
- **Meio**: materiais compostos e "dúbios"; primeiras esteiras e drones.
- **Fim**: picos de volume, resíduos perigosos/e-lixo, linha quase autônoma.

## Condições de progresso
- **Avança** quando o setor atinge a meta de limpeza com contaminação do solo
  abaixo do limite → o governo reforma a área.
- **Trava/regride** se a contaminação do solo passa do limite ou o lixo
  transborda (acúmulo crítico).
- **Estrelas (1–3)** por eficiência: % reciclado/reutilizado vs. incinerado/aterrado,
  tempo e pureza dos lotes (base de `stars` já existe no código).

## Meta-jogo
- Desbloqueio de **setores** e de **estações de destino** (reciclagem, compostagem, incinerador).
- **Árvore de automação** (esteiras → separadores → drones → robôs → IA).
- Coleção de **cartas educativas** sobre materiais e destinos.

---
[↑ Índice](README.md) · anterior: [« 01](01-visao-geral.md) · próximo: [03 »](03-residuos-e-categorias.md)
