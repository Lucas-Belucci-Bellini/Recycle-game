# Jogo da Reciclagem

Jogo educativo que cruza *tidying satisfatório* (estilo Librarian: Tidy Up the
Arcane Library) com *automação* (estilo jogos de fábrica em primeira pessoa): o governo quer reformar um
lixão de 100 mil toneladas, mas você precisa limpá-lo antes - separando cada
resíduo para o destino certo, do trabalho manual até drones e robôs, e aprendendo
reciclagem de verdade na prática.

O protótipo jogável está em **`Jogo da Reciclagem.html`** (HTML único, abre
direto no navegador, sem instalação).

## Plano mestre

O novo documento central é **[`GAME_DESIGN.md`](GAME_DESIGN.md)**. Ele define a visão do jogo 3D original, com sistemas de personagem, resíduos, construção, automação, energia, máquinas e progressão.

## Documentação / Plano do jogo

O plano completo do jogo (GDD + roadmap + backlog), consolidado a partir das
ideias das branches `planos` e `codex/elaborate-educational-game-plan`, está em
**[`docs/`](docs/README.md)**.

Comece pelo índice: [`docs/README.md`](docs/README.md), depois leia
[`docs/00-estado-atual-e-gaps.md`](docs/00-estado-atual-e-gaps.md) para entender
de onde o projeto parte hoje.

Documentos novos para a versão 3D:

- [`docs/13-referencia-limpa-e-limites.md`](docs/13-referencia-limpa-e-limites.md): como estudar referências sem copiar arquivos proprietários.
- [`docs/14-sistemas-3d-industriais.md`](docs/14-sistemas-3d-industriais.md): especificação dos sistemas, do movimento do personagem até energia nuclear.
- [`docs/15-backlog-unity-3d.md`](docs/15-backlog-unity-3d.md): backlog prático para implementar em Unity 3D.

## Regra importante de assets

Este repositório deve conter somente código, documentação e assets próprios ou licenciados. Arquivos de jogos comerciais, pacotes extraídos, executáveis, `.pak`, `.ucas`, `.utoc`, zips completos e materiais sem licença não devem ser versionados.

## Como rodar

Abra o arquivo `Jogo da Reciclagem.html` em qualquer navegador moderno.
