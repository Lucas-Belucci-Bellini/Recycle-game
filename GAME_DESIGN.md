# Game Design - Recycle Game

Documento mestre para transformar o prototipo atual em um jogo 3D original de limpeza, reciclagem e automacao industrial.

Este plano usa referencias de genero apenas como observacao de mecanicas gerais. Ele nao depende de arquivos, assets, mapas, codigo, dados internos, nomes proprietarios ou engenharia reversa de qualquer jogo comercial.

## Visao

O jogador assume uma operacao de recuperacao ambiental em um lixao gigante que precisa virar um complexo limpo, produtivo e seguro. No inicio, tudo e manual: caminhar, pegar residuos, separar, carregar e vender material. Com o tempo, o patio vira uma fabrica de reciclagem: esteiras, trituradores, separadores, compactadores, robos, energia, pesquisa, contratos publicos e tratamento de rejeitos perigosos.

## Fantasia do jogador

- Entrar em uma area abandonada e ver o ambiente ficando mais limpo por causa das proprias decisoes.
- Resolver gargalos de producao como um engenheiro de processos.
- Aprender descarte correto por tentativa, feedback e consequencia.
- Construir uma cadeia industrial que transforma lixo em materia-prima, energia e dinheiro.
- Lidar com residuos dificeis sem ensinar que tudo pode ser queimado ou descartado de qualquer jeito.

## Pilares

1. Limpeza visivel: cada acao deve reduzir pilhas, manchas, riscos e bagunca no mapa.
2. Automacao progressiva: o jogador comeca com maos e ferramentas, depois desbloqueia maquinas e rotas.
3. Educacao jogavel: o jogo ensina pelo sistema, nao por aula travada.
4. Consequencia ambiental: decisoes ruins geram contaminacao, multas, perda de reputacao e risco operacional.
5. Design original: todos os nomes, modelos, numeros, mapas, sons, interfaces e dados devem ser proprios.

## Loop principal

1. Explorar o setor.
2. Identificar residuos e riscos.
3. Coletar ou direcionar material.
4. Separar por categoria.
5. Processar em maquinas.
6. Vender, reutilizar, armazenar ou tratar rejeitos.
7. Ganhar dinheiro, EcoPontos e reputacao.
8. Pesquisar tecnologias.
9. Expandir para novo setor com mais complexidade.

## Escala de progressao

### Fase 1 - Manual

- Movimento em primeira pessoa ou terceira pessoa proxima.
- Pegar, soltar, arremessar e carregar itens.
- Ferramentas simples: pegador, saco, carrinho, pa, scanner de residuo.
- Lixeiras coloridas e caçambas.
- Feedback imediato de acerto, erro, contaminacao e lucro.

### Fase 2 - Oficina de reciclagem

- Bancadas e maquinas pequenas.
- Triturador, lavadora, compactadora, prensa e separador magnetico.
- Energia simples, com tomadas, disjuntores e consumo por maquina.
- Loja de upgrades.
- Contratos de coleta e entrega.

### Fase 3 - Patio automatizado

- Esteiras, divisores, filtros, elevadores e buffers.
- Robos coletores e drones de inspecao.
- Rede de energia, baterias e geradores.
- Controle de gargalos por itens/minuto.
- Missoes de limpeza por setor.

### Fase 4 - Complexo ambiental

- Tratamento de quimicos, eletronicos, hospitalares e rejeitos.
- Incinerador com filtro e custo ambiental.
- Usina de biogas para organicos.
- Energia solar, eolica, biomassa e nuclear experimental.
- Auditoria ambiental, certificados e fiscalizacao.

## Sistemas principais

- Personagem: locomocao, camera, interacao, inventario rapido e ferramentas.
- Mundo: setores, pilhas de lixo, terreno contaminado, areas bloqueadas e limpeza persistente.
- Residuos: categorias, subtipos, massa, volume, risco, valor e rota correta.
- Construcao: grade, holograma, custo, rotacao, snap, demolicao e upgrade.
- Maquinas: entrada, processamento, saida, energia, eficiencia, manutencao e risco.
- Logistica: esteiras, caixas, caçambas, buffers, veiculos e robos.
- Energia: geracao, consumo, estabilidade, baterias, sobrecarga e apagao.
- Pesquisa: tecnologias liberadas por dinheiro, EcoPontos, amostras e missoes.
- Educacao: dicas contextuais, relatorios, quiz curto, modo escola e estatisticas.

## Regras de originalidade

Pode usar como referencia:

- Sensacao geral de jogos de automacao, fabrica, construcao e limpeza.
- Conceitos comuns: esteira, maquina, energia, inventario, grid, pesquisa.
- Observacao externa de como um jogador se sente usando esses sistemas.

Nao pode entrar no projeto:

- Arquivos `.pak`, `.ucas`, `.utoc`, executaveis, DLLs, modelos, texturas, mapas ou sons de jogos comerciais.
- Codigo extraido, scripts internos, nomes proprietarios de itens, descricoes copiadas ou layouts de UI replicados.
- Dados obtidos por engenharia reversa de arquivos de terceiros.

## Documentos de apoio

- `docs/13-referencia-limpa-e-limites.md`: como estudar referencias sem copiar arquivos.
- `docs/14-sistemas-3d-industriais.md`: especificacao dos sistemas, do personagem a usina nuclear.
- `docs/15-backlog-unity-3d.md`: roadmap pratico para implementar em Unity 3D.

## Proximo objetivo recomendado

Criar um prototipo Unity 3D com:

- personagem andando e interagindo;
- 12 residuos basicos;
- 7 lixeiras oficiais;
- uma bancada de triagem;
- uma esteira simples;
- uma maquina processadora;
- save local;
- um setor pequeno que fica visualmente mais limpo.
