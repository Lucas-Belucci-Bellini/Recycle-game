# 09 — UI/UX e Acessibilidade

## Princípios de interface
- Leitura rápida por **cor + ícone + texto** (redundância para inclusão).
- **Feedback instantâneo** de acerto/erro (já existe a base no jogo).
- Interface limpa para reduzir sobrecarga cognitiva.
- Ícones grandes por material.

## Feedback de ação
| Situação | Feedback |
|----------|----------|
| Acerto | Som positivo + brilho verde + confete (✅ já implementado) |
| Erro | Alerta vermelho + **dica do porquê** |
| Risco de contaminação | Aviso amarelo |
| Combo | Barra de eficiência com multiplicador (✅ base existe) |

## Componentes-chave de HUD
- Capacidade das lixeiras/caçambas.
- Pureza do lote atual.
- Tempo e metas da fase.
- Painel de tarefas dos robôs.
- Comparador de estruturas (ver [doc 04](04-lixeiras-e-cacambas.md)).
- Glossário rápido de resíduos.
- Mapa do pátio com fluxo do lixo (heatmap) — avançado.

## Estilo visual
- **Cartoon técnico**, acessível e amigável (alinhado ao estilo atual: Fredoka/Nunito + SVG).
- Alternativa futura: semi-realista educativo.

## Onboarding
- **Tutorial interativo de ~3 min** em fases, com prática assistida.
- Dicas contextuais que **desaparecem** conforme o jogador domina.
- Jogador novo deve entender o jogo **sem explicação externa**.

## Acessibilidade
- **Modo daltônico** (paleta adaptada + ícones fortes, não só cor).
- **Tamanho de fonte ajustável**.
- **Narração** do feedback essencial.
- Suporte a **teclado, mouse e toque**; remapeamento de teclas.
- **Opção sem limite de tempo** (essencial para o Modo Escola — ver [doc 08](08-conteudo-educativo-e-modo-escola.md)).
- **Localização PT-BR** completa (base atual já é PT-BR).

---
[↑ Índice](README.md) · anterior: [« 08](08-conteudo-educativo-e-modo-escola.md) · próximo: [10 »](10-tecnico-e-arquitetura.md)
