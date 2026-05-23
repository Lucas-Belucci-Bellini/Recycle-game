# 03 — Resíduos e Categorias

## Código de cores (CONAMA 275 — Brasil)
O jogo **já usa** este padrão. Manter como base pedagógica.

| Cor | Categoria | No jogo hoje |
|-----|-----------|--------------|
| Azul | Papel/papelão | ✅ |
| Vermelho | Plástico | ✅ |
| Verde | Vidro | ✅ |
| Amarelo | Metal | ✅ |
| Marrom | Orgânico | ✅ |
| Cinza | Rejeito (não reciclável) | planejado |
| Laranja | Perigoso/químico | planejado (fase avançada) |
| Branco | Hospitalar/saúde | planejado (fase avançada) |
| Preto | Eletrônico (e-lixo) | planejado |
| Caçamba | Entulho/construção | planejado |

## Categorias base (MVP)
Papel, Plástico, Vidro, Metal, Orgânico. **Já no jogo.**

## Categorias avançadas (pós-MVP)
Rejeito, Eletrônico, Perigoso, Hospitalar, Entulho.

## Itens por categoria (exemplos)
- **Papel**: jornal ✅, caixa de papelão, caderno, bola de papel ✅.
- **Plástico**: garrafa PET ✅, copo plástico ✅, tampa, embalagem.
- **Vidro**: pote de vidro ✅, garrafa, frasco (cuidado: quebrado tem rota especial).
- **Metal**: lata de alumínio ✅, arame, tampinha metálica.
- **Orgânico**: casca de banana ✅, resto de comida, borra de café.
- **Rejeito**: papel higiênico usado, fralda, esponja.
- **Perigoso**: pilha, bateria, solvente, lâmpada fluorescente.
- **Eletrônico**: celular antigo, cabo, teclado, carregador.

## Atributos de cada item (modelo de dados)
- `material` (categoria correta)
- `volume` (ocupa espaço na lixeira/caçamba)
- `risco` (normal / perigoso)
- `valor` (créditos ao reciclar corretamente)
- `dubio` (bool — exige inspeção/tooltip antes de decidir)

## Regras de contaminação (educativas)
- Item errado na lixeira **reduz a pureza do lote** → menos recompensa.
- **Contaminação crítica** bloqueia a venda até "retriar".
- Item pode **mudar de categoria** ao ser contaminado:
  papel engordurado → **rejeito**; vidro quebrado → rota especial.
- Misturar **hospitalar/perigoso** com comum gera **multa** e queda de
  pontuação ecológica (gancho educativo forte).

## Itens especiais (variedade e ensino)
- **Dúbio**: jogador inspeciona antes (tooltip explica o destino).
- **Composto**: precisa pré-triagem (separar tampa da garrafa, tetrapak).
- **Urgente**: descarte rápido para bônus.

## Modo avançado (rótulos reais)
- Subtipos de plástico (PET, PEAD), metais (alumínio, aço).
- Destino final: reciclagem, compostagem, aterro, **logística reversa**.

---
[↑ Índice](README.md) · anterior: [« 02](02-core-loop-e-gameplay.md) · próximo: [04 »](04-lixeiras-e-cacambas.md)
