# 15 - Backlog Unity 3D

Backlog pratico para transformar o plano em um prototipo 3D jogavel.

## Fase 0 - Preparacao do projeto

Objetivo: criar uma base Unity limpa, versionavel e sem arquivos proprietarios.

Tarefas:

- Criar projeto Unity 3D URP.
- Configurar `.gitignore` de Unity.
- Criar cenas: `Boot`, `MainMenu`, `PrototypeSector`.
- Criar pastas: `Scripts`, `Art`, `Prefabs`, `ScriptableObjects`, `Scenes`, `UI`, `Audio`.
- Adicionar placeholder visual simples para chao, lixeiras, itens e maquinas.
- Definir escala: 1 unidade Unity = 1 metro.

Pronto quando:

- O projeto abre em outra maquina.
- A cena carrega sem erros.
- Nada de jogo comercial foi importado.

## Fase 1 - Personagem e interacao

Objetivo: andar pelo patio e interagir com residuos.

Tarefas:

- Implementar `PlayerController`.
- Implementar camera e mira central.
- Implementar `InteractionRaycaster`.
- Implementar highlight de objeto interativo.
- Implementar `CarryableItem`.
- Pegar, carregar, soltar e arremessar item.
- Peso influencia velocidade.
- Criar 12 prefabs simples de residuos.

Pronto quando:

- O jogador consegue limpar manualmente uma pequena area.
- Itens leves e pesados se comportam diferente.

## Fase 2 - Categorias e lixeiras

Objetivo: trazer a mecanica do HTML para o 3D.

Tarefas:

- Criar `WasteCategoryData`.
- Criar `WasteData`.
- Criar lixeiras por cor.
- Detectar descarte correto/incorreto.
- Mostrar feedback visual e sonoro.
- Aplicar pontuacao, EcoPontos e penalidade.
- Criar relatorio simples por categoria.

Categorias MVP:

- Papel.
- Plastico.
- Vidro.
- Metal.
- Organico.
- Rejeito.
- Perigoso.

Pronto quando:

- O jogador entende por feedback onde cada item deve ir.
- O jogo registra erros e acertos.

## Fase 3 - Setor e limpeza persistente

Objetivo: fazer o mapa mudar conforme o jogador limpa.

Tarefas:

- Criar `SectorState`.
- Contar toneladas/itens restantes.
- Trocar visuais de sujeira por niveis.
- Salvar progresso em JSON local.
- Recarregar progresso ao abrir o jogo.
- Criar meta de limpeza do setor.

Pronto quando:

- O setor fica visualmente mais limpo.
- Fechar e abrir o jogo mantem progresso.

## Fase 4 - Construcao basica

Objetivo: construir lixeiras, caçambas e uma maquina simples.

Tarefas:

- Criar `BuildSystem` com holograma.
- Implementar grid/snap.
- Rotacionar objeto antes de colocar.
- Bloquear colocacao invalida.
- Gastar dinheiro/material ao construir.
- Demolir e devolver parte do custo.

Construcoes MVP:

- Lixeira.
- Caçamba.
- Bancada de triagem.
- Prensa.
- Poste de energia.

Pronto quando:

- O jogador consegue reorganizar o patio.
- Construcoes nao atravessam objetos.

## Fase 5 - Maquinas e receitas

Objetivo: transformar residuos em produtos vendaveis.

Tarefas:

- Criar `RecipeData`.
- Criar `MachineData`.
- Criar `MachineController`.
- Entrada, processamento e saida.
- Tempo de ciclo.
- Consumo de energia.
- Interface de maquina.
- Receitas basicas de papel, plastico, metal e organico.

Pronto quando:

- Uma maquina recebe item, processa e gera saida.
- O jogador consegue vender produto reciclado.

## Fase 6 - Esteiras

Objetivo: iniciar automacao.

Tarefas:

- Criar `ConveyorSegment`.
- Mover itens por pontos/slots.
- Conectar esteira a maquina.
- Criar divisor e combinador simples.
- Criar filtro por categoria.
- Mostrar gargalo quando item trava.

Pronto quando:

- Itens saem de uma caçamba, passam por esteira e entram em maquina.

## Fase 7 - Energia

Objetivo: fazer a fabrica depender de rede eletrica.

Tarefas:

- Criar `PowerNode`.
- Criar `PowerGrid`.
- Gerador fornece energia.
- Maquinas consomem energia.
- Bateria armazena energia.
- Sobrecarga desliga maquinas.
- HUD mostra producao/consumo.

Pronto quando:

- Uma maquina para quando falta energia.
- Expandir producao exige expandir energia.

## Fase 8 - Economia e pesquisa

Objetivo: dar progressao de longo prazo.

Tarefas:

- Dinheiro por venda.
- EcoPontos por descarte correto.
- Reputacao por contratos.
- Loja de upgrades.
- Arvore de pesquisa.
- Desbloqueio de maquinas e setores.

Pronto quando:

- O jogador tem motivo para continuar alem da primeira limpeza.

## Fase 9 - Residuos avancados

Objetivo: aumentar complexidade sem perder clareza.

Tarefas:

- Eletronico.
- Oleo.
- Quimico.
- Hospitalar.
- Entulho.
- Sistema de EPI.
- Descontaminacao.
- Multas por descarte errado.

Pronto quando:

- Nem todo lixo pode ir para uma lixeira comum.

## Fase 10 - Robos e drones

Objetivo: automatizar coleta e inspecao.

Tarefas:

- Robo coletor com zona de trabalho.
- Estacao de recarga.
- Drone scanner.
- Prioridades de tarefa.
- Manutencao.
- Interface de ordens simples.

Pronto quando:

- O jogador pode delegar coleta repetitiva.

## Fase 11 - Energia avancada e nuclear

Objetivo: fim de jogo industrial com risco ambiental.

Tarefas:

- Biogas.
- Solar/eolica.
- Incinerador com recuperacao energetica.
- Reator nuclear ficticio.
- Sistema de resfriamento.
- Residuos radioativos.
- Sensores e emergencia.
- Licenca e fiscalizacao.

Pronto quando:

- A energia nuclear e poderosa, mas exige cadeia responsavel de residuos.

## Fase 12 - Modo escola

Objetivo: transformar o jogo em ferramenta educativa.

Tarefas:

- Perfil de turma.
- Sessao curta de aula.
- Relatorio por categoria.
- Exportacao CSV ou JSON.
- Quiz configuravel.
- Modo sem penalidade severa.

Pronto quando:

- Um professor consegue usar o jogo para mostrar descarte correto.

## Ordem recomendada dos primeiros commits Unity

1. `Initialize Unity project structure`
2. `Add player movement prototype`
3. `Add carry and throw interaction`
4. `Add waste category data`
5. `Add sorting bins and scoring`
6. `Add sector cleanup state`
7. `Add local save system`
8. `Add basic build system`
9. `Add first recycling machine`
10. `Add first conveyor prototype`

## Definicao de pronto geral

Cada sistema novo deve ter:

- cena de teste;
- dados editaveis;
- prefab ou componente reutilizavel;
- feedback visual minimo;
- salvamento quando afetar progresso;
- nenhuma dependencia de arquivo proprietario.

---
[Indice](README.md) | anterior: [14 - Sistemas 3D industriais](14-sistemas-3d-industriais.md)
