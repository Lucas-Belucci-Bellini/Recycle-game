# 04 — Lixeiras e Caçambas (Comparação e Upgrade)

## Objetivo
Transformar "qual lixeira comprar" numa **decisão estratégica** entre custo,
capacidade e eficiência. Hoje as 5 lixeiras são fixas; este sistema adiciona
capacidade, compra, substituição e comparação.

## Atributos de cada recipiente
- **Capacidade** (kg ou nº de itens)
- **Velocidade de descarte/processamento** (itens/s)
- **Taxa de contaminação tolerada** (%) — quanto suporta antes de estragar o lote
- **Durabilidade**
- **Custo de compra**
- **Custo de manutenção**
- **Filtro de odor/segurança** (impacta satisfação da cidade)
- **Pegada ambiental**

## Lixeira × Caçamba
- **Lixeira**: recebe e separa por tipo; capacidade menor.
- **Caçamba**: buffer de armazenamento volumoso; recebe lotes já triados.
- **Fluxo**: lixeira enche → caçamba → compactador → central.
- Quando o recipiente **satura**, para de receber → pressão para esvaziar/comprar.

## Estações de destino
Depois de separado, o lixo vai de uma lixeira/caçamba para uma **estação** que o
processa (ver destinos no [doc 03](03-residuos-e-categorias.md)):
- **Reciclagem** — transforma em matéria-prima (mais retorno).
- **Reuso** — recondiciona itens inteiros.
- **Compostagem** — orgânico vira adubo.
- **Incinerador (recuperação de energia)** — só para o que não recicla.
- **Aterro seguro** — rejeito, isolado para não contaminar o solo.

Cada estação tem **capacidade/turno** e **velocidade de processamento**; gargalo
na estação trava a esteira (fator de planejamento estilo *Satisfactory*).

## Tiers de estrutura
| Tier | Lixeira | Caçamba |
|------|---------|---------|
| 1 | Simples por cor (atual) | Básica, capacidade pequena |
| 2 | Capacidade média + sensor básico | Média com compactação |
| 3 | Compactação embutida | Inteligente com sensores |
| 4 | Triagem inteligente por IA | Módulo industrial semi-automatizado |
| 5 | Industrial/autônoma | Central autônoma |

## Tela de comparação (UX)
- Tabela **lado a lado** (até 3 opções).
- Destaque de **"melhor custo-benefício"** por cenário.
- **Simulação de 1 turno** com previsão de throughput.
- Exemplo de decisão exibida ao jogador:
  > "Caçamba A guarda mais lixo bruto; Caçamba B processa mais rápido e reduz erros."

## Exemplo de balanceamento inicial
| Recipiente | Capacidade | Velocidade | Contaminação tolerada | Custo |
|------------|-----------|-----------|----------------------|-------|
| Lixeira comum (T1) | 20 | 1×/s | 5% | grátis (inicial) |
| Lixeira seletiva (T2) | 40 | 1,5×/s | 10% | 150 créditos |
| Caçamba básica (T1) | 120 | — | — | 300 créditos |
| Caçamba compactadora (T2) | 250 | — | — | 800 créditos |

> Números são ponto de partida; ajustar na planilha de balanceamento ([doc 10](10-tecnico-e-arquitetura.md)).

---
[↑ Índice](README.md) · anterior: [« 03](03-residuos-e-categorias.md) · próximo: [05 »](05-robos-e-automacao.md)
