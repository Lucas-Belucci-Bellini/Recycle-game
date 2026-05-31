# Blueprint — Visão de longo prazo

> Documento **único**, **aspiracional**: o "norte" do projeto.
> O jogo que vamos **realmente construir** é educacional e tem escopo
> proporcional — está em **[`local-de-trabalho/Projeto-Baluarte-World-Game/`](https://github.com/Lucas-Belucci-Bellini/LOCAL-DE-TRABALHO)**
> (outro repositório). Este blueprint expande, **não substitui**, o
> [GDD original](../README.md).

## Pitch
Começar **sem nada, catando lixo**, e subir até uma **civilização interplanetária**.
A regra de ouro: o **lixo de uma era é o insumo da próxima**. Economia circular
não é tema decorativo — é a engrenagem do jogo.

## Inspirações (e o que pegar de cada uma)
| Jogo | O que pegar |
|------|-------------|
| **Space Engineers** | Construção livre por blocos, física, naves, espaço |
| **Satisfactory** | Fábrica/esteiras, cadeias de produção, automação |
| **Ark** | Sobrevivência, progressão, ameaças, domesticação |
| **Cities: Skylines** | Cidade, NPCs, serviços, demanda urbana |
| **PowerWash / Tidying** | Satisfação de **limpar** o lixão e ver o terreno reaparecer |

## As 7 Eras
Cada era é jogável sozinha. A campanha sobe de uma para a outra.

### Era 0 — Catador
Sozinho, com as mãos. Sobrevivência básica (fome, abrigo). Lixo em todo lugar.
A pessoa cata, separa pelas 7 cores CONAMA, vende o reciclável. O setor sujo
fica limpo. O verde aparece.

### Era 1 — Oficina
Primeiras máquinas (prensa, moedor, composteira). Mais valor por lote
purificado. Caçambas. O jogador ainda faz tudo, mas a oficina multiplica.

### Era 2 — Fábrica
Esteiras automatizam a triagem. Separadores classificam por cor. Produção
começa: lixo reciclado vira **matéria-prima** que vira **produto**. A
**economia circular** ganha forma — vender produto manufaturado paga muito
mais que vender material bruto.

### Era 3 — Cidade
NPCs e gestão urbana entram. A cidade **produz** o seu lixo (insumo
infinito), mas também sofre com poluição/saturação. Contratos municipais,
políticas, taxas. Reputação verde abre contratos maiores. O jogo vira sim de
gestão sem perder a base de catador.

### Era 4 — Mundo
Mundo aberto procedural. Biomas, recursos virgens (minério, biomassa), fauna,
clima. **Tensão central**: minerar virgem (rápido, polui) vs. reciclar
(limpo, infinito). Construção livre por blocos (Space Engineers). Veículos.

### Era 5 — Órbita
Primeiro foguete: GRANDE marco. Estação espacial, gravidade zero, logística
orbital. **Lixo espacial** (debris) como recurso e ameaça. A reciclagem em
órbita ganha peso.

### Era 6 — Interplanetário (endgame)
Colônias em outros planetas. **Terraformar** = limpar e verdejar um planeta
morto — a economia circular em escala planetária, o tema do jogo no clímax.
Megaestruturas, rede de comércio interplanetário, endgame sandbox.

## Os 4 pilares de design

1. **Sobrevivência → Automação** (Ark → Satisfactory): faço com as mãos →
   construo a máquina → projeto a fábrica → desenho o planeta.
2. **Tudo é lixo de alguém** (PowerWash): o que está sujo fica limpo, e quem
   limpa ganha. O cinza vira verde.
3. **Liberdade de estratégia**: você escolhe se é só catador, só
   manufaturador, só urbanista, ou ciclo fechado (este último paga mais).
4. **Educar pela mecânica**: a regra ensina; o texto não. Reciclar paga mais
   que incinerar não porque está escrito, mas porque **rende mais crédito**
   na tela. (Hierarquia D-04 do [doc 03](../03-residuos-e-categorias.md).)

## Reality check (escopo)
O pacote completo é trabalho de **estúdio AAA por anos**. Para um projeto
educacional realista:

- **MVP**: **Era 0 → 1** apenas (catar + reciclar + 1ª máquina). É o que o
  protótipo web já valida em parte.
- **Versão "estudante 1"**: Era 0–2 (chegar até fábrica simples). Tem
  conteúdo educativo cheio sem precisar de Cities Skylines + Space
  Engineers + Ark juntos.
- **Eras 3–6**: ficam aqui como **norte aspiracional**. Se o projeto crescer
  além do educacional, dá pra retomar.

A versão **realmente construída** vive em
[`local-de-trabalho/Projeto-Baluarte-World-Game/`](https://github.com/Lucas-Belucci-Bellini/LOCAL-DE-TRABALHO),
com escopo proporcional a um jogo educacional.

## O que o protótipo 2D já valida (Era 0)
- 7 cores CONAMA (azul/vermelho/verde/amarelo/marrom/cinza/laranja).
- Triagem por cor + roteamento ao **destino** (reutilizar/reciclar/compostar/
  incinerar/aterro/logística reversa).
- Hierarquia do lixo (D-04): destinos verdes pagam mais; incinerar/aterro dão
  0 EcoPonto.
- Itens dúbios (papel engordurado, pilha, aerossol) que **enganam** e ensinam
  por contraste.
- Metas de setor com vitória "setor limpo".
- Loja com upgrades permanentes.

Tudo isso é **dados puros** (tabelas `ITEMS`, `BINS`, `DESTINOS`, `SETORES`,
`UPGRADES`) — pronto pra virar DataTables na Unreal. Os JSONs já estão
exportados em `local-de-trabalho/Projeto-Baluarte-World-Game/data/`.

## Stack final
**Unreal Engine** (C++ + Blueprints). Dados em DataTables/structs.
Ver [doc 10 — Técnico](../10-tecnico-e-arquitetura.md) para o D-03 completo
e o trade-off (executável nativo, não roda no navegador).

---
[↑ GDD original](../README.md)
