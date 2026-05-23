# 05 — Robôs e Automação

## Conceito
Robôs assistentes recebem **tarefas designadas** pelo jogador para aumentar a
produtividade e reduzir erros. Automação é **recompensa de progressão**, não
substituto da habilidade manual.

## Tipos de robô
1. **Coletor** — pega lixo no pátio e leva para a triagem.
2. **Triador/Classificador** — identifica a categoria (IA básica) e separa.
3. **Transportador/Logístico** — move lotes entre lixeira e caçamba.
4. **Compactador móvel** — comprime lotes em áreas críticas.
5. **Fiscal/Mantenedor** — detecta contaminação, corrige e reduz downtime.

## Sistema de tarefas (designar e executar)
Jogador abre o painel de robôs, seleciona um robô e atribui uma tarefa.
Exemplos de comandos:
- "Priorizar plástico"
- "Esvaziar caçamba 3"
- "Coletar setor A" / "Rota A→B→C"
- "Corrigir contaminação da lixeira azul"
- "Ignorar orgânico por 2 min"
- "Modo emergência (perigoso)"
- "Robô Beta: focar plástico no Setor B por 3 min"

O robô executa com **IA simples por prioridade/fila** (ver MVP no [doc 10](10-tecnico-e-arquitetura.md)).

## Níveis de IA do robô (progressão)
- **Nível 1**: tarefa única.
- **Nível 2**: fila de tarefas.
- **Nível 3**: prioridades condicionais ("se caçamba >80%, esvaziar").
- **Nível 4**: auto-otimização.

## Upgrades de robô
- Velocidade
- Precisão de triagem
- Bateria/autonomia
- Capacidade de carga por viagem
- Módulos especiais (visão por IA → menos erro em itens dúbios; detector de perigoso)

## Limitações e balanceamento
- Bateria acaba; precisa recarregar.
- Manutenção periódica e custo de energia.
- Sem upgrades, o robô tem **erro percentual**.
- **Dependência excessiva** de robôs reduz o bônus de habilidade manual
  (mantém o jogador engajado).

---
[↑ Índice](README.md) · anterior: [« 04](04-lixeiras-e-cacambas.md) · próximo: [06 »](06-economia-e-progressao.md)
