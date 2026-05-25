# 13 - Referencia Limpa e Limites

Este documento existe para proteger o projeto. A meta e aprender com jogos de automacao e construcao sem copiar arquivos, assets, dados internos ou codigo proprietario.

## Objetivo

Criar um jogo original de lixo, reciclagem e automacao industrial. Referencias externas podem ajudar a entender conforto de controle, ritmo de progressao e tipos de sistema, mas a implementacao, os dados, os modelos, os nomes e a arte precisam ser nossos.

## O que pode ser estudado

Pode observar jogando, vendo videos, lendo wikis publicas ou analisando mecanicas em nivel conceitual:

- Como o jogador se move e interage com objetos.
- Como um jogo apresenta construcao, energia, inventario e producao.
- Qual e a sensacao de desbloquear uma tecnologia nova.
- Como gargalos de producao aparecem para o jogador.
- Quais problemas de usabilidade surgem em jogos 3D de fabrica.
- Como feedback visual e sonoro ajuda a entender acerto, erro, perigo e progresso.

O resultado desse estudo deve virar frases proprias, por exemplo:

- `O jogador precisa ver a direcao da esteira antes de construir.`
- `Maquinas precisam mostrar entrada, saida, consumo e status sem abrir muitos menus.`
- `O primeiro setor deve ensinar separacao manual antes da automacao.`

## O que nao entra no repositorio

Nunca colocar no repo:

- arquivos de jogos comerciais;
- arquivos `.pak`, `.ucas`, `.utoc`, `.sig`, `.exe`, `.dll` e zips completos de instalacao;
- modelos 3D, texturas, sons, videos, mapas, blueprints ou scripts extraidos;
- nomes de assets, tabelas internas, dados numericos extraidos por engenharia reversa;
- capturas usadas como textura, UI copiada pixel a pixel ou descricoes copiadas.

## Metodo clean-room

1. Jogar ou assistir uma referencia e anotar apenas o comportamento percebido.
2. Reescrever a ideia em linguagem generica.
3. Adaptar para o tema do Recycle Game.
4. Criar nomes, numeros, dados e arte proprios.
5. Implementar do zero.
6. Registrar no GDD de onde veio a inspiracao conceitual, sem trazer arquivos.

Exemplo:

- Observacao: jogos de fabrica usam esteiras para mover itens automaticamente.
- Adaptacao original: no Recycle Game, as esteiras transportam sacos, caixas e fardos de residuos separados.
- Implementacao propria: criar componente `ConveyorSegment`, velocidade em m/s, direcao por spline/grid e slots de item.

## Bibliotecas e recursos permitidos

Podem ser usados se a licenca permitir:

- assets gratuitos ou pagos com licenca comercial clara;
- modelos criados pelo proprio time;
- sons e texturas CC0 ou comprados;
- pacotes Unity Asset Store com permissao de uso;
- codigo open source compativel, mantendo creditos e licencas.

## Checklist antes de subir arquivos

Antes de qualquer commit:

- O arquivo foi criado por nos ou tem licenca compativel?
- O arquivo veio de um jogo comercial? Se sim, nao subir.
- O arquivo e grande demais para GitHub normal? Se sim, usar Git LFS ou armazenamento externo autorizado.
- O nome do arquivo revela origem proprietaria? Se sim, revisar.
- O arquivo esta coberto pelo `.gitignore` se for referencia local proibida?

## Caminho pratico para este projeto

- Manter o prototipo 2D atual como demonstracao de mecanica.
- Construir um prototipo 3D em Unity com assets placeholder.
- Substituir placeholders por assets originais aos poucos.
- Usar documentos `docs/14` e `docs/15` como guia de implementacao.

---
[Indice](README.md) | anterior: [12 - Backlog inicial](12-backlog-inicial.md) | proximo: [14 - Sistemas 3D industriais](14-sistemas-3d-industriais.md)
