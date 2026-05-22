1) MDS 01 — Visão do Jogo (Pitch)
Nome provisório: “EcoPátio: Mestre da Triagem”
Gênero: Simulação + organização + automação casual
Loop principal:

Receber lixo misturado

Separar por tipo em lixeiras corretas

Compactar/armazenar em caçambas

Vender/reciclar para ganhar créditos

Comprar lixeiras melhores, caçambas maiores e robôs

Expandir o pátio e repetir com mais complexidade

Fantasia do jogador: transformar um lixão caótico em um centro de reciclagem eficiente e tecnológico.

2) MDS 02 — Core Gameplay (Mecânicas Base)
Arrastar e soltar itens para a lixeira correta.

Cada item tem:

material (papel, plástico, vidro, metal, orgânico, eletrônico, hospitalar etc.)

volume

risco (normal/perigoso)

valor de reciclagem

Errou a lixeira? perde pontos de qualidade e pode gerar multa ambiental.

Acertou sequência (combo de triagem): bônus de velocidade/ganho.

Caçambas funcionam como “buffers” de armazenamento.

Compactador reduz volume, mas custa energia/manutenção.

3) MDS 03 — Sistema de Lixeiras e Caçambas (Comparação/Upgrade)
Cada lixeira/caçamba deve ter atributos claros para o jogador comparar:

Capacidade (L)

Velocidade de descarte (itens/s)

Taxa de contaminação (%) (chance de estragar lote)

Durabilidade

Custo de manutenção

Filtro de odor/segurança (impacta satisfação da cidade)

Exemplo de tiers:

Tier 1: simples e barata

Tier 2: capacidade média + sensor básico

Tier 3: compactação embutida

Tier 4: triagem inteligente por IA

Tier 5: industrial/autônoma

4) MDS 04 — Robôs e Automação por Tarefas
Sistema de “designar tarefa e o robô executa”:

Tipos de robô
Coletor: pega lixo no pátio e leva para triagem

Triador: identifica material e separa automaticamente

Compactador móvel: comprime lotes em áreas críticas

Logístico: move carga entre lixeira e caçamba

Manutenção: evita quebra de máquinas

Comandos de tarefa
“Priorizar plástico”

“Esvaziar caçamba 3”

“Rota A-B-C”

“Ignorar orgânico por 2 min”

“Modo emergência (perigoso)”

Progressão de IA do robô
Nível 1: tarefa única

Nível 2: fila de tarefas

Nível 3: prioridades condicionais

Nível 4: auto-otimização

5) MDS 05 — Economia e Progressão
Moedas:

Créditos (principal)

EcoPontos (reputação/sustentabilidade)

Peças tecnológicas (upgrades avançados)

Fontes de ganho:

Venda de material reciclável

Contratos municipais

Missões de evento

Bônus de pureza do lote

Custos:

Compra de lixeiras/caçambas

Energia

Reparo

Salário/equipe (se tiver NPCs)

Meta de progressão:
sair de “lixão manual” para “central inteligente de reciclagem”.

6) MDS 06 — Conteúdo Educativo (Objetivo Pedagógico)
Cada ação ensina reciclagem real sem ficar “aula chata”.

Codificação por cores oficial de lixeiras (adaptável por país)

Cartas rápidas: “Vidro quebrado vai onde?”

Eventos de erro comum: papel engordurado, pilhas, eletrônicos, óleo

Miniquiz opcional com recompensa

“Modo Escola” com relatório para professor:

taxa de acerto por material

tempo de decisão

evolução do aluno

7) MDS 07 — Níveis, Missões e Dificuldade
Estrutura de campanha
Básico: papel/plástico/vidro/metal

Intermediário: orgânico + contaminação

Avançado: eletrônico e resíduos perigosos

Industrial: picos de volume + falhas de máquina

Cidade inteira: gestão multiárea e logística

Tipos de missão
Meta de pureza > 95%

Processar 2 toneladas em 8 min

Zero erro em resíduos perigosos

Operar com orçamento limitado

8) MDS 08 — UX/UI e Estilo Visual
Interface clara com ícones grandes por material

Feedback instantâneo:

verde = acerto

vermelho = erro

amarelo = risco de contaminação

Painel de comparação lado a lado para lixeiras/caçambas

Mapa do pátio com fluxo do lixo (heatmap)

Estilo visual:

cartoon técnico (acessível)

ou semi-realista educativo

9) MDS 09 — Tecnologia, Arquitetura e Roadmap
Plataforma sugerida
PC + Mobile (Unity ou Godot)

Back-end leve opcional para ranking/escola

Sistemas técnicos
Banco de dados de itens (JSON/Scriptable Objects)

Sistema de tarefas de robô (behavior tree/GOAP simples)

Balanceamento de economia por planilha

Telemetria:

erro por tipo de lixo

tempo médio de triagem

uso de automação

Roadmap de produção (resumido)
Pré-produção: 3–4 semanas

Protótipo jogável: 6–8 semanas

Vertical slice: 4 semanas

Conteúdo + polimento: 8–12 semanas

Beta educacional: 4 semanas

10) MDS 10 — Documento de Projeto (GDD) com 10 seções prontas
Você pode estruturar seu GDD assim:

Visão geral e objetivos

Público-alvo e plataformas

Core loop e mecânicas

Sistema de lixeiras/caçambas

Sistema de robôs e tarefas

Economia e progressão

Conteúdo educativo

Níveis e missões

UI/UX e direção de arte

Visão do jogo (resumo rápido)
Nome provisório: Eco Tycoon: Lixão Inteligente
Gênero: Simulação + Puzzle + Gestão (educativo)
Plataforma inicial: PC/Web
Loop principal:

Coletar lixo na área.

Separar corretamente por tipo (papel, plástico, vidro, metal, orgânico, eletrônico, hospitalar, etc.).

Armazenar em lixeiras/caçambas com capacidade limitada.

Comparar e comprar novas lixeiras/caçambas melhores (custo x capacidade x velocidade de triagem).

Desbloquear robôs que automatizam tarefas.

Expandir o lixão para central de reciclagem eficiente.

10 MDS de projeto
MDS 1 — Conceito e documentação base (Semana 1-2)
Objetivo: Definir o jogo com clareza.
Entregas:

GDD (Game Design Document) curto (10–15 páginas).

Lista de tipos de lixo e regras educativas reais.

Público-alvo (ex.: 10+ anos, escolas, casual).

Metas de aprendizagem (ex.: “identificar destino correto de resíduos”).
Critério de pronto: documento aprovado e escopo MVP fechado.

MDS 2 — Protótipo jogável de separação (Semana 3-4)
Objetivo: Ter o “coração” do gameplay funcionando.
Entregas:

Arrastar/soltar lixo na lixeira correta.

Feedback imediato (acerto/erro).

Pontuação simples e combo de acertos.

Tempo de rodada (ex.: 2 min).
Critério de pronto: protótipo já divertido em 5 minutos de teste.

MDS 3 — Sistema de lixeiras e caçambas comparáveis (Semana 5-6)
Objetivo: Implementar progressão por armazenamento.
Entregas:

Atributos por recipiente: capacidade, custo, durabilidade, velocidade de coleta.

Tela de comparação lado a lado (ex.: “Lixeira A vs Caçamba B”).

Compra e substituição de recipientes.

Saturação (lotou, para de receber lixo).
Critério de pronto: jogador percebe claramente vantagem de upgrades.

MDS 4 — Economia e progressão (Semana 7-8)
Objetivo: Criar motivação de longo prazo.
Entregas:

Moedas/créditos por reciclagem correta.

Penalidade por descarte errado.

Missões diárias/semanais (“Recicle 50 plásticos”).

Curva inicial de preços balanceada.
Critério de pronto: progressão sem “grind” excessivo nos primeiros níveis.

MDS 5 — Sistema de robôs assistentes (Semana 9-10)
Objetivo: Automação com estratégia.
Entregas:

Robô coletor (pega lixo do mapa).

Robô triador (classifica tipos específicos).

Robô transportador (leva para caçamba correta).

Designação de tarefas (“Robô 1 cuida de orgânicos”).
Critério de pronto: jogador consegue delegar e aumentar eficiência real.

MDS 6 — Upgrades de robôs + árvore de tecnologia (Semana 11-12)
Objetivo: Dar profundidade ao meta-jogo.
Entregas:

Upgrades: bateria, velocidade, precisão, capacidade.

Riscos/falhas (robô pode errar com baixa calibração).

Árvore de pesquisa (ex.: “Visão por IA”, “Braço hidráulico”).

Custo de manutenção.
Critério de pronto: diferentes “builds” de automação possíveis.

MDS 7 — Conteúdo educativo robusto (Semana 13-14)
Objetivo: Reforçar aprendizagem de verdade.
Entregas:

Cartas informativas de materiais (“Vidro: tempo de decomposição…”).

Eventos especiais (lixo hospitalar, eletrônico, óleo).

Quiz rápido entre fases.

Modo “Professor” com relatório de acertos por categoria.
Critério de pronto: aprendizado mensurável em teste curto.

MDS 8 — Mapas, dificuldade e eventos dinâmicos (Semana 15-16)
Objetivo: Variar desafio e rejogabilidade.
Entregas:

3 biomas/mapas (urbano, praia, industrial).

Clima/eventos (chuva aumenta lixo orgânico, festival gera plástico).

Modos: campanha, infinito, desafio cronometrado.

Balanceamento de dificuldade por nível.
Critério de pronto: 30–60 min de conteúdo sem repetição cansativa.

MDS 9 — UI/UX, arte, som e acessibilidade (Semana 17-18)
Objetivo: Polimento para uso real.
Entregas:

Ícones claros por tipo de lixo.

Cores acessíveis (modo daltônico).

Tutorial interativo de 3 minutos.

Efeitos sonoros e feedback visual de acerto/erro.

Localização PT-BR completa.
Critério de pronto: jogador novo entende o jogo sem explicação externa.

MDS 10 — QA, métricas, lançamento e pós-lançamento (Semana 19-20)
Objetivo: Publicar com qualidade.
Entregas:

Correção de bugs críticos.

Telemetria (taxa de acerto por tipo de lixo, tempo por fase).

Build candidata a lançamento.

Plano de updates (novas caçambas, novos robôs, eventos sazonais).
Critério de pronto: versão 1.0 estável e pronta para escolas/comunidade.

Mecânicas-chave que não podem faltar
Tipos de resíduos obrigatórios:
Papel, Plástico, Vidro, Metal, Orgânico, Eletrônico, Perigoso/Hospitalar.

Sistema de capacidade:
Lixeira enche -> caçamba -> compactador -> central.

Comparador de recipientes:
Exibir “capacidade por custo”, “eficiência por minuto”.

Robôs com papéis distintos:
Coleta, triagem, transporte, manutenção.

Erro com consequência educativa:
Misturar hospitalar com comum gera multa e queda de pontuação ecológica.

Sugestão de equipe mínima (indie)
1 Game Designer

1 Programador gameplay

1 Programador UI/sistemas

1 Artista 2D/3D

1 Sound/UI

1 QA (part-time)

1 Consultor de educação ambiental (freelancer)

MVP (versão mínima viável) em 8–10 semanas
Se quiser lançar rápido, foque em:

4 tipos de lixo (papel, plástico, vidro, orgânico)

3 níveis

3 recipientes (lixeira comum, seletiva, caçamba)

2 robôs

sistema de pontuação + loja de upgrades

tutorial e 1 modo infinito

Se você quiser, no próximo passo eu já monto:

GDD enxuto pronto (com tabelas de lixeiras/caçambas e robôs),

economia completa (preços, custos, recompensas),

e backlog de tarefas estilo Trello/Jira com prioridade (P0/P1/P2).
Plano técnico + cronograma + KPIs

1) 01_Visao_Geral.md
# Visão Geral do Projeto — EcoSort: Lixão Inteligente

## Elevator Pitch
Um jogo educativo de organização e gestão onde o jogador transforma um lixão caótico em um centro de triagem eficiente, separando resíduos corretamente, expandindo caçambas/lixeiras e automatizando processos com robôs.

## Objetivo Educacional
Ensinar:
- Separação correta de resíduos.
- Noções de reciclagem e reaproveitamento.
- Impacto ambiental de descarte incorreto.
- Eficiência logística e organização.

## Público-Alvo
- 10 a 25 anos (escolas, famílias, gamers casuais).
- Professores que querem gamificação de educação ambiental.

## Plataformas
- PC (Steam/itch.io) e Web (versão simplificada).
- Futuro: mobile.

## Diferencial
- Mistura de puzzle + gestão + automação.
- Feedback visual claro de “acerto/erro” da reciclagem.
- Progressão por upgrades e robôs com tarefas delegáveis.
2) 02_Core_Loop_e_Gameplay.md
# Core Loop e Gameplay

## Core Loop Principal
1. Chega uma onda de lixo misturado.
2. Jogador coleta e arrasta para a lixeira/caçamba correta.
3. Sistema valida separação (acerto, erro, contaminação).
4. Jogador ganha moedas, XP ecológico e reputação.
5. Compra novas lixeiras/caçambas e upgrades.
6. Contrata/melhora robôs para automatizar tarefas.
7. Aumenta volume e complexidade dos resíduos.

## Mecânicas Centrais
- Drag-and-drop de itens para recipientes.
- Classificação por tipo de resíduo.
- Capacidade limitada de lixeiras/caçambas.
- Penalidade por mistura incorreta.
- Multiplicador por sequência de acertos.

## Ritmo de Partida (10–15 min)
- Início: poucos tipos de lixo.
- Meio: surgem materiais compostos (tetrapak, eletrônicos).
- Fim: pico de volume + eventos (chuva, vazamento, urgência).

## Condições
- Vitória: meta de triagem + limite de contaminação respeitado.
- Derrota: contaminação acima do limite ou acúmulo crítico no chão.
3) 03_Sistema_de_Residuos_e_Lixeiras.md
# Sistema de Resíduos e Lixeiras

## Categorias de Resíduos
- Papel
- Plástico
- Vidro
- Metal
- Orgânico
- Eletrônico
- Hospitalar (fases avançadas)
- Entulho/construção (caçamba específica)

## Lixeiras/Caçambas por Tipo
- Azul: Papel
- Vermelha: Plástico
- Verde: Vidro
- Amarela: Metal
- Marrom: Orgânico
- Cinza: Rejeito não reciclável
- Branca: Hospitalar (nível avançado)
- Laranja: Perigoso/químico (nível avançado)
- Caçamba de entulho: construção pesada

## Regras de Contaminação
- Item errado em lixeira reduz pureza do lote.
- Pureza baixa diminui recompensa de reciclagem.
- Contaminação crítica bloqueia venda até “retriar”.

## Itens Especiais
- “Dúbio”: jogador precisa inspecionar (tooltip educativa).
- “Composto”: precisa pré-triagem (ex.: separar tampa/garrafa).
- “Urgente”: exige descarte rápido para bônus.
4) 04_Progressao_e_Economia.md
# Progressão e Economia

## Moedas e Recursos
- Créditos: moeda principal.
- EcoPontos: progresso educacional e desbloqueios.
- Reputação Verde: acesso a contratos maiores.

## Formas de Ganho
- Acerto de triagem.
- Bônus de velocidade.
- Bônus de pureza do lote.
- Missões educativas diárias.

## Gastos
- Comprar novas lixeiras/caçambas.
- Aumentar capacidade.
- Melhorar velocidade de coleta.
- Desbloquear esteiras e zonas de triagem.
- Comprar/upgrade de robôs.

## Curva de Progressão (exemplo)
- Nível 1–3: 4 tipos de lixo.
- Nível 4–7: 6 tipos + compostos.
- Nível 8+: perigosos, eletrônicos e logística avançada.

## Balanceamento Inicial
- Meta: jogador sempre “quase no limite”, mas com sensação de evolução constante.
5) 05_Robos_e_Automacao.md
# Robôs e Automação

## Papel dos Robôs
Automatizar tarefas repetitivas para aumentar eficiência e permitir foco estratégico.

## Tipos de Robô
1. Coletor: pega lixo do chão.
2. Triador: identifica categoria e envia para lixeira correta.
3. Compactador: aumenta capacidade útil da caçamba.
4. Fiscal: detecta contaminação e corrige.

## Sistema de Tarefas (Designar e Executar)
- Jogador abre painel de robôs.
- Seleciona robô.
- Atribui tarefa:
  - “Coletar setor A”
  - “Priorizar plástico”
  - “Corrigir contaminação da lixeira azul”
- Robô executa com IA simples por prioridade/fila.

## Upgrades dos Robôs
- Velocidade
- Precisão de triagem
- Capacidade por viagem
- Bateria/autonomia
- Módulo de visão (menos erro em itens dúbios)

## Limitações
- Bateria acaba.
- Manutenção periódica.
- Erro percentual sem upgrades.
6) 06_Design_de_Fases_e_Dificuldade.md
# Design de Fases e Dificuldade

## Estrutura de Campanha
- Mundo 1: Lixão improvisado
- Mundo 2: Centro de triagem básico
- Mundo 3: Ecoparque automatizado
- Mundo 4: Cidade sustentável (endgame)

## Tipos de Missão
- Meta de volume triado.
- Meta de pureza mínima.
- Sobrevivência por tempo.
- Contrato especial (evento escolar, mutirão, pós-festival).

## Escalada de Dificuldade
- Mais volume por minuto.
- Mais tipos de resíduos simultâneos.
- Mais itens “dúbios”.
- Eventos aleatórios (vento, chuva, pane elétrica).

## Boss de Fase (conceito)
“Mega Montanha de Lixo”
- Onda massiva com prazo curto.
- Requer usar robôs e caçambas extras estrategicamente.
7) 07_UX_UI_e_Feedback_Educativo.md
# UX/UI e Feedback Educativo

## Princípios de Interface
- Leitura rápida por cor + ícone.
- Erros claramente explicados.
- HUD simples: capacidade, pureza, tempo, metas.

## Feedback de Ação
- Acerto: som positivo + brilho verde.
- Erro: alerta amarelo/vermelho + dica do porquê.
- Combo: barra de eficiência com multiplicador.

## Camada Educacional
- Tooltip curto por item:
  - “Garrafa PET: plástico reciclável.”
  - “Espelho quebrado: não vai no vidro comum.”
- Miniquiz opcional entre fases para bônus.

## Acessibilidade
- Modo daltônico (ícones fortes).
- Texto escalável.
- Remapeamento de teclas.
- Opção sem limite de tempo (modo escola).
8) 08_Tecnico_Arquitetura_e_Dados.md
# Arquitetura Técnica e Dados

## Engine (sugestão)
- Unity (2D/3D leve) ou Godot 4.
- Começar 2D isométrico para reduzir custo inicial.

## Sistemas de Código
- ItemSystem: define tipo, peso, estado de contaminação.
- BinSystem: capacidade, pureza, tipo aceito.
- RobotSystem: fila de tarefas + pathfinding.
- EconomySystem: recompensas, loja e upgrades.
- MissionSystem: objetivos e eventos.

## Estrutura de Dados (exemplo)
- ScriptableObjects/JSON para resíduos, lixeiras, upgrades.
- Tabelas de balanceamento separadas do código.

## IA de Robô (MVP)
- Priority Queue de tarefas.
- A* simples no mapa.
- Fallback quando rota bloqueada.

## Save/Load
- Progresso de campanha.
- Upgrades comprados.
- Estatísticas educativas (taxa de acerto por categoria).
9) 09_Roadmap_Producao_6_Meses.md
# Roadmap de Produção (6 meses)

## Mês 1 — Pré-produção
- GDD resumido.
- Protótipo de drag-and-drop.
- 4 tipos de lixo e 4 lixeiras.

## Mês 2 — Vertical Slice
- 1 fase jogável completa.
- Economia básica.
- Feedback visual/sonoro inicial.

## Mês 3 — Automação
- Sistema de robôs (coletor + triador).
- Painel de tarefas.
- Primeiros upgrades.

## Mês 4 — Conteúdo
- 3 mundos.
- 20+ tipos de resíduos.
- Missões especiais e eventos.

## Mês 5 — Polimento
- UX, tutorial, acessibilidade.
- Balanceamento de progressão.
- Correção de bugs.

## Mês 6 — Lançamento Beta
- Build pública fechada.
- Telemetria e ajustes.
- Preparação para Steam/itch.io.
10) 10_Monetizacao_Impacto_e_Metricas.md
# Monetização, Impacto e Métricas

## Monetização (ética/educacional)
- Premium único (sem pay-to-win), OU
- Free + DLC de mundos cosméticos/temáticos.
- Parcerias com escolas/ONGs.

## KPIs de Produto
- Retenção D1/D7.
- Tempo médio por sessão.
- Taxa de conclusão de fase.
- Uso de robôs por partida.

## KPIs Educacionais
- Taxa de acerto por categoria de lixo.
- Redução de erros ao longo do tempo.
- Performance em miniquizzes.

## Impacto Social
- Material didático para professores.
- Eventos temáticos em datas ambientais.
- Relatório de aprendizagem por turma (versão escola).

## Próximos Passos
- Multiplayer cooperativo local.
- Modo sandbox infinito.
- Editor de fases para professores.
Se você quiser, no próximo passo eu posso te entregar também:

GDD completo (versão única consolidada)

Matriz completa de itens e lixeiras (com 100+ exemplos reais)

Documento de balanceamento inicial (custos, upgrades, tempo, dificuldade)

Backlog estilo Trello/Jira com épicos e user stories prontas.

