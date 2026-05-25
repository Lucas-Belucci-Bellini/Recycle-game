# 14 - Sistemas 3D Industriais

Especificacao original para transformar o Recycle Game em um jogo 3D de limpeza, reciclagem e automacao.

## 1. Personagem

### Objetivo

O jogador deve se sentir no patio, pegando lixo com as maos no inicio e depois comandando uma operacao industrial.

### Movimento base

- Andar, correr e pular.
- Agachar para passar sob estruturas ou pegar itens pequenos.
- Subir rampas, escadas e plataformas.
- Deslizar levemente em terreno molhado ou contaminado, se fizer sentido para risco ambiental.
- Stamina opcional para corrida e carregamento pesado.

### Camera

Opcoes recomendadas:

- Primeira pessoa para imersao e precisao de construcao.
- Terceira pessoa curta para leitura do corpo e ferramentas.
- Alternancia opcional no futuro.

Regras de camera:

- Mira central discreta.
- Highlight no objeto interativo sob a mira.
- Distancia de interacao curta para itens manuais.
- Raycast de construcao separado do raycast de coleta.

### Interacao

Acoes principais:

- Pegar item.
- Soltar item.
- Arremessar item.
- Usar ferramenta.
- Abrir painel de maquina.
- Construir.
- Demolir.
- Escanear residuo.

Estados do item na mao:

- Leve: permite correr e pular.
- Medio: reduz velocidade.
- Pesado: exige carrinho, empilhadeira ou robo.
- Perigoso: exige EPI ou ferramenta especifica.

### Ferramentas iniciais

- Pegador: aumenta alcance de coleta e evita contato com item perigoso leve.
- Scanner: mostra categoria, valor, risco e rota recomendada.
- Saco: agrupa itens pequenos da mesma categoria.
- Carrinho: transporta volume medio.
- Lavadora portatil: reduz contaminacao simples.

## 2. Residuos

### Atributos de cada residuo

- `id`
- `nome`
- `categoria`
- `subtipo`
- `massaKg`
- `volumeLitros`
- `valorBase`
- `risco`
- `contaminacao`
- `rotaCorreta`
- `rotasAceitaveis`
- `penalidadeErro`
- `tempoDeProcessamento`

### Categorias principais

- Papel e papelao.
- Plastico.
- Vidro.
- Metal.
- Organico.
- Rejeito comum.
- Perigoso/quimico.
- Eletronico.
- Hospitalar.
- Entulho.
- Oleo e liquidos.
- Radioativo, apenas em fase avancada e com regras especiais.

### Estados de contaminacao

- Limpo: pode ir direto para venda ou processamento.
- Sujo: precisa lavar, separar ou descontaminar.
- Misturado: precisa triagem manual ou maquina separadora.
- Perigoso: exige equipamento, armazenamento e descarte controlado.

## 3. Mundo e setores

### Estrutura do mapa

O lixao e dividido em setores. Cada setor tem:

- toneladas restantes;
- categorias predominantes;
- risco ambiental;
- nivel de acesso;
- contratos disponiveis;
- espacos para construir;
- manchas de contaminacao;
- obstaculos e rotas.

### Limpeza visual

Cada setor deve mudar visualmente:

- pilhas diminuem;
- solo clareia;
- cheiro/fumaca reduz;
- vegetacao volta em areas recuperadas;
- agua contaminada fica tratada;
- moradores ou fiscais aparecem quando o setor melhora.

## 4. Construcao

### Regras de colocacao

- Grade opcional para estruturas industriais.
- Snap em fundacao, esteira, tubo, tomada e maquina.
- Holograma verde/vermelho para permitido/bloqueado.
- Rotacao em passos de 15 ou 45 graus.
- Verificacao de colisao, terreno, energia e custo.

### Tipos de construcao

- Fundacao.
- Piso reforcado.
- Rampa e escada.
- Lixeira.
- Caçamba.
- Esteira.
- Divisor.
- Filtro.
- Maquina.
- Poste de energia.
- Bateria.
- Gerador.
- Deposito.
- Estacao de robo.
- Zona de coleta.

### Demolicao e upgrade

- Demolir devolve parte dos materiais.
- Upgrade preserva conexoes quando possivel.
- Maquinas cheias precisam esvaziar antes de mover.

## 5. Logistica

### Esteiras

A esteira transporta unidades discretas de item ou caixas.

Atributos:

- velocidade em m/s;
- capacidade por metro;
- direcao;
- tipo aceito;
- consumo de energia, se motorizada;
- estado: ligada, travada, sem energia, sobrecarregada.

Pecas:

- segmento reto;
- curva;
- subida/descida;
- divisor;
- combinador;
- filtro por categoria;
- balanca;
- buffer.

### Caixas, sacos e fardos

Itens pequenos podem ser agrupados para reduzir custo de simulacao.

- Saco: material leve e misturado.
- Caixa: itens separados de pequeno/medio volume.
- Fardo: material compactado, como papel, plastico e metal.
- Container: lote grande para venda ou transporte.

### Veiculos e robos

- Carrinho manual.
- Empilhadeira.
- Caminhao interno.
- Robo coletor.
- Drone de inspecao.
- Robo separador de esteira.

## 6. Maquinas

### Contrato de maquina

Toda maquina deve expor:

- entradas;
- saidas;
- receita ativa;
- energia necessaria;
- tempo de ciclo;
- eficiencia;
- estado de manutencao;
- risco;
- residuos secundarios.

### Maquinas basicas

- Mesa de triagem: separa material misturado manualmente.
- Lavadora: remove sujeira de plastico, vidro e metal.
- Triturador: reduz volume e prepara materia-prima.
- Prensa: cria fardos de papel, plastico ou metal.
- Separador magnetico: puxa metais ferrosos.
- Separador optico: identifica cor/material em esteira.
- Composteira: transforma organico em composto.
- Biodigestor: transforma organico em biogas e biofertilizante.
- Incinerador filtrado: trata rejeito com custo ambiental e cinzas.
- Laboratorio: analisa amostras perigosas.
- Descontaminador: trata quimicos e hospitalares.

### Receitas exemplo

- 10 kg papel limpo -> 1 fardo de papel.
- 8 kg plastico limpo -> 1 saco de pellets reciclados.
- 12 kg metal misto -> 8 kg metal separado + 1 kg rejeito.
- 20 kg organico -> 8 kg composto + 2 unidades de biogas.
- 5 kg eletronico -> metais raros + plastico tecnico + rejeito perigoso.

## 7. Energia

### Modelo simples

- Cada gerador fornece MW.
- Cada maquina consome MW.
- Rede tem estabilidade de 0 a 100%.
- Se consumo ultrapassa geracao, maquinas desligam por prioridade.
- Baterias seguram picos.

### Fontes

- Gerador a diesel, barato e poluente.
- Biogas, usa organico e reforca tema do jogo.
- Solar, baixa manutencao e depende do clima.
- Eolica, variavel.
- Biomassa, usa rejeitos organicos e madeira recuperada.
- Incinerador com recuperacao energetica, util mas com custo ambiental.
- Nuclear experimental, fim de jogo e alto risco.

### Poluicao energetica

Energia nao e so numero. Cada fonte pode afetar:

- qualidade do ar;
- calor local;
- reputacao;
- licencas ambientais;
- residuos gerados;
- custo de manutencao.

## 8. Usina nuclear original

A nuclear deve ser um sistema avancado, raro e responsavel, nao um premio sem consequencia.

### Desbloqueio

Requisitos sugeridos:

- setor industrial restaurado;
- laboratorio avancado;
- licenca governamental;
- reputacao ambiental alta;
- cadeia de residuos perigosos dominada;
- equipe tecnica contratada.

### Componentes

- Reator.
- Sistema de resfriamento.
- Turbina.
- Gerador.
- Sala de controle.
- Piscina de resfriamento de combustivel.
- Deposito blindado de rejeito radioativo.
- Sensores de radiacao.
- Plano de emergencia.

### Recursos

- Combustivel nuclear ficticio e original.
- Agua tratada para resfriamento.
- Peças de alta precisao.
- Barras de controle.
- Containers blindados.

### Riscos

- Superaquecimento.
- Falha de resfriamento.
- Vazamento controlavel.
- Contaminacao de area.
- Multa e bloqueio de setor.
- Evacuacao de trabalhadores/robos.

### Residuos radioativos

Regras:

- Nunca vender como material comum.
- Nunca misturar com lixo normal.
- Precisa container blindado.
- Precisa deposito licenciado.
- Gera custo continuo.
- Pode abrir missoes de pesquisa para reduzir volume ou risco.

### Por que isso combina com jogo de lixo

A usina nuclear nao entra para copiar outro jogo. Ela entra porque cria a pergunta central do projeto: como lidar com residuos que nao somem? O desafio e manter energia alta enquanto assume responsabilidade por rejeitos de longo prazo.

## 9. Economia

### Moedas

- Dinheiro: compra maquinas e paga operacao.
- EcoPontos: recompensa descarte correto e recuperacao ambiental.
- Reputacao: libera contratos e licencas.
- Pesquisa: libera tecnologias.

### Fontes de ganho

- Venda de material reciclado.
- Contratos de limpeza.
- Bonus por pureza do lote.
- Bonus por recuperar setor.
- Relatorios escolares ou governamentais no modo campanha.

### Custos

- Energia.
- Manutencao.
- Multas.
- Tratamento de rejeito.
- Compra de terreno.
- Salario/equipe, se houver simulacao de gestao.

## 10. Educacao integrada

O jogo deve ensinar sem quebrar o ritmo.

Ferramentas:

- Scanner explica por que um item vai para certa rota.
- Relatorio mostra erros por categoria.
- Maquinas mostram eficiencia e contaminacao.
- Quiz aparece como contrato opcional, nao como interrupcao constante.
- Modo escola exporta resumo simples para professor.

## 11. UI esperada

### HUD

- dinheiro;
- EcoPontos;
- energia produzida/consumida;
- contaminacao do setor;
- toneladas restantes;
- ferramenta equipada.

### Painel de maquina

- nome;
- receita;
- entrada;
- saida;
- energia;
- status;
- gargalo;
- botao ligar/desligar;
- botao upgrade;
- aviso de risco.

### Mapa

- setores;
- nivel de limpeza;
- contaminacao;
- contratos;
- rotas logisticas principais;
- areas bloqueadas.

## 12. Modelo tecnico sugerido em Unity

Componentes:

- `PlayerController`
- `InteractionRaycaster`
- `CarryableItem`
- `WasteData`
- `WasteInstance`
- `MachineData`
- `MachineController`
- `RecipeData`
- `ConveyorSegment`
- `PowerNode`
- `PowerGrid`
- `BuildableData`
- `BuildSystem`
- `SectorState`
- `SaveGameService`

Dados em `ScriptableObject`:

- residuos;
- categorias;
- maquinas;
- receitas;
- tecnologias;
- missoes;
- construcoes.

## 13. MVP 3D recomendado

Para nao explodir escopo, o primeiro MVP 3D deve conter:

- um setor pequeno;
- controle de personagem;
- coleta e arremesso;
- 12 residuos;
- 7 categorias;
- lixeiras e caçambas;
- uma esteira;
- uma prensa;
- energia simples;
- save local;
- relatorio de acertos.

Depois disso entram robos, maquinas avancadas, energia complexa e usina nuclear.

---
[Indice](README.md) | anterior: [13 - Referencia limpa](13-referencia-limpa-e-limites.md) | proximo: [15 - Backlog Unity 3D](15-backlog-unity-3d.md)
