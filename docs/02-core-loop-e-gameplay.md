# 02 — Core Loop e Gameplay

## Core loop principal
1. Chega uma **onda de lixo misturado** (esteira/pilha).
2. Jogador **coleta e arrasta/arremessa** cada item para a lixeira/caçamba correta.
3. Sistema **valida** a separação (acerto, erro, contaminação).
4. Jogador ganha **moedas, EcoPontos e reputação**.
5. **Compra** novas lixeiras/caçambas e upgrades.
6. **Contrata/melhora robôs** para automatizar tarefas.
7. Volume e complexidade dos resíduos **aumentam** → repete com mais desafio.

> Estado atual: passos 1–3 já existem no HTML (arremesso + acerto/erro/combo).
> O resto é o que este GDD detalha. Ver [doc 00](00-estado-atual-e-gaps.md).

## Loop de 60 segundos (micro)
- **0–15s**: chegada de resíduos.
- **15–35s**: identificação visual + coleta.
- **35–50s**: depósito correto e compactação.
- **50–60s**: feedback, pontuação e bônus de combo.

## Mecânicas centrais
- **Arrastar/arremessar** item e soltar no destino correto (já implementado).
- Cada item tem: **material**, **volume**, **risco** (normal/perigoso) e
  **valor de reciclagem** (ver [doc 03](03-residuos-e-categorias.md)).
- Lixeiras com **capacidade** e **taxa de processamento**; caçambas como **buffer**.
- **Penalidade** por descarte incorreto (perde qualidade do lote, pode gerar multa).
- **Combo**: sequência de acertos dá bônus de velocidade/ganho (já implementado).
- **Compactador** reduz volume, mas custa energia/manutenção.

## Ritmo de partida (10–15 min)
- **Início**: poucos tipos de lixo, itens grandes e fáceis.
- **Meio**: surgem materiais compostos (tetrapak, eletrônicos) e itens "dúbios".
- **Fim**: pico de volume + eventos (chuva, vazamento, lote hospitalar urgente).

## Condições de vitória/derrota
- **Vitória**: meta de triagem atingida com contaminação abaixo do limite.
- **Derrota**: contaminação acima do limite **ou** acúmulo crítico de lixo no chão.
- **Estrelas (1–3)**: por eficiência (já existe a base de `stars` no código).

## Meta-jogo
- Desbloqueio de **zonas** (pátio → triagem fina → compostagem).
- **Árvore de upgrades** (infraestrutura + operação + automação + educação).
- Coleção de **cartas educativas** sobre materiais.

---
[↑ Índice](README.md) · anterior: [« 01](01-visao-geral.md) · próximo: [03 »](03-residuos-e-categorias.md)
