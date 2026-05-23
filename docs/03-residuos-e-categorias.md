# 03 — Resíduos, Categorias e Destinos

## As 7 cores (núcleo do jogo)
O jogo gira em torno de **7 cores principais** (padrão CONAMA 275). A "raiva" de
vê-las misturadas é o gatilho de aprendizagem (ver [doc 08](08-conteudo-educativo-e-modo-escola.md)).

| # | Cor | Categoria | No jogo hoje |
|---|-----|-----------|--------------|
| 1 | Azul | Papel/papelão | ✅ |
| 2 | Vermelho | Plástico | ✅ |
| 3 | Verde | Vidro | ✅ |
| 4 | Amarelo | Metal | ✅ |
| 5 | Marrom | Orgânico | ✅ |
| 6 | Cinza | Rejeito (não reciclável) | planejado |
| 7 | Laranja | Perigoso/químico | planejado |

**Avançadas (desbloqueio posterior):** Preto → Eletrônico (e-lixo);
Branco → Hospitalar/saúde; Caçamba → Entulho/construção.

## Os destinos (para onde o lixo vai)
Cada item, depois de separado, segue para **um destino** — e é aqui que entram
"reutilizar / descartar / cremar" da visão:

- **Reutilizar** — objeto volta a ser usado como é (vidro inteiro, peças, móveis).
- **Reciclar** — vira matéria-prima nova (papel, plástico, metal, vidro moído).
- **Compostar** — orgânico vira adubo.
- **Incinerar (recuperar energia)** — o "cremar": queima controlada com geração
  de energia, para o que **não dá** para reciclar/reutilizar.
- **Aterro seguro** — último recurso, para rejeito; isolado para **não contaminar o solo**.
- **Logística reversa** — perigosos/eletrônicos voltam ao fabricante.

## Hierarquia do lixo (REGRA EDUCATIVA CENTRAL — D-04)
A ordem do "mais certo" para o "menos certo" — e o jogo deve **recompensar nessa ordem**:

> **Reduzir > Reutilizar > Reciclar/Compostar > Incinerar (energia) > Aterro**

- Reutilizar/reciclar → **mais** créditos e EcoPontos.
- Incinerar → **pouco** EcoPonto (só energia; não é "verde").
- Aterro → quase nada (e ocupa terreno que você quer despoluir).

⚠️ **Cuidado pedagógico:** "cremar/incinerar" é divertido como mecânica, mas
**não pode ser o caminho premiado**. Se queimar tudo render mais, o jogo ensina
o errado. Incineração é penúltimo recurso — só para o que não tem outra saída.
*(Confirme em D-04 se concorda com esse balanço.)*

## Atributos de cada item (modelo de dados)
- `material` (categoria/cor correta)
- `destino` (reutilizar / reciclar / compostar / incinerar / aterro)
- `volume`, `risco` (normal/perigoso), `valor` (créditos), `dubio` (exige inspeção)

## Itens por categoria (exemplos)
- **Papel** (azul): jornal ✅, papelão, caderno, bola de papel ✅.
- **Plástico** (vermelho): garrafa PET ✅, copo ✅, tampa, embalagem.
- **Vidro** (verde): pote ✅, garrafa (inteiro→reuso, quebrado→rota especial).
- **Metal** (amarelo): lata de alumínio ✅, arame.
- **Orgânico** (marrom): casca de banana ✅, resto de comida → **compostagem**.
- **Rejeito** (cinza): fralda, esponja, papel sujo → **aterro/incineração**.
- **Perigoso** (laranja): pilha, bateria, solvente → **logística reversa**.
- **Eletrônico** (preto): celular, cabo, teclado → **logística reversa**.

## Regras de contaminação (a fonte da frustração)
- Destino/lixeira errado **reduz a pureza do lote** → menos recompensa.
- **Contaminação crítica** bloqueia o processamento até "retriar".
- Item muda de categoria ao contaminar: papel engordurado → **rejeito**.
- Misturar **perigoso/hospitalar** com comum → **multa** + risco de contaminar o solo.

## Itens especiais
- **Dúbio**: inspeção antes de decidir (tooltip ensina o destino).
- **Composto**: pré-triagem (separar tampa/garrafa, tetrapak).
- **Urgente/perigoso**: descarte rápido e correto para bônus.

---
[↑ Índice](README.md) · anterior: [« 02](02-core-loop-e-gameplay.md) · próximo: [04 »](04-lixeiras-e-cacambas.md)
