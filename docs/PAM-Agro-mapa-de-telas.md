# PAM Agro — Mapa de telas (TCC 1 · front-end)

**Versão 3** — atualizada com as suas decisões, incluindo: valor que termina em ,00 permanece no arredondamento; menu "Terminar em…" por item; regras automáticas de venda restrita. O documento faz três coisas: (1) descreve o que as 4 telas atuais do Figma já resolvem e aponta ajustes nelas; (2) especifica, uma a uma, as telas que faltam; (3) lista o que ainda está em aberto e o que não foi verificado.

---

## 0. Como ler este documento

**Marcas usadas**

- `[PRONTA]` — já existe no Figma. `[NOVA]` — precisa ser desenhada.
- `P1` — essencial para o TCC 1 (fluxo principal funciona de ponta a ponta com dados de exemplo e XML enviado à mão). `P2` — importante, entra se houver tempo. `P3` — opcional, só a "casca" visual, ou futuro.
- `[TCC 2]` — só funciona de verdade com o back-end; no TCC 1 vira casca com dados de exemplo.
- `D1, D2…` — decisões (seção 9). Fonte dos dados: **XML** (campo da NF-e), **USUÁRIO** (digitado), **CALCULADO** (o sistema deduz).

**Princípios que já aparecem nas suas telas (valem para todas as novas)**

1. Nada é aplicado sem confirmação explícita ("Nada aplicado", "A decisão é sua").
2. Cada decisão fica registrada com data, hora e usuário.
3. Linguagem simples, sem jargão fiscal na frente do usuário.
4. Somente desktop (as telas têm cerca de 1300 px de largura). Um único usuário.

**Decisões já fechadas (resumo)**

- Arredondamento é opcional (checkbox em Configurações); **valor que termina em ,00 permanece**; a regra está em 3.3.
- No menu ⋯ de cada item há **"Terminar em ,99 / ,90 / ,50 / ,00"**: mantém a parte inteira e troca só os centavos (N8).
- Venda restrita é identificada por **regras automáticas** (NCM, categoria, lista importada, palavras, fornecedor), com marca manual que vence (C8).
- Preço novo usa **só o valor unitário da nota** × (1 + %). Frete, desconto, ST e IPI não entram.
- Preço sugerido diferente do atual → sugere alteração; **menor que o atual → pede confirmação extra**.
- Item é "Novo" quando não é encontrado no banco (3.5).
- **Preços travados** e **margens individuais** são listas em Configurações; a ação por item fica num menu ⋯ ao passar o mouse na linha.
- Estoque diminui por **leitor de código de barras** (tela de venda rápida); o **financeiro** recebe entradas e saídas do estoque + lançamento manual.
- Entrada de estoque pela nota é opção em Configurações (3 modos, 3.6).
- Ciência da nota (manual ou automática) é opção em Configurações, com as implicações explicadas (2.3 e C5).

---

## 1. Mapa de navegação

As rotas são sugestões e não dependem de framework. A barra lateral passa a ter 7 itens (hoje tem 5).

```
Barra lateral
├── Início                          [PRONTA]  /inicio
├── Venda rápida (leitor)                     /venda
├── Produtos                                  /produtos
│   ├── Novo produto / Editar                 /produtos/novo, /produtos/:id/editar
│   ├── Detalhe do produto                    /produtos/:id   (abas: Geral · Estoque · Preços · Fornecedores)
│   ├── Movimentações de estoque              /estoque/movimentacoes
│   ├── Ajuste de estoque (contagem)          /estoque/ajuste
│   └── Saída manual (perda, uso)             /estoque/saida
├── Notificações (notas fiscais)    [PRONTA]  /notificacoes
│   ├── Importar XML                          /notificacoes/importar
│   ├── Etapa 2 · Entenda os itens  [PRONTA]  /notas/:id/itens
│   ├── Etapa 3 · Você decide       [PRONTA]  /notas/:id/decisao
│   ├── Etapa 4 · Atualizar etiquetas         /notas/:id/etiquetas
│   ├── Manifestação final                    /notas/:id/manifestacao
│   └── Detalhe da nota (leitura)             /notas/:id
├── Financeiro                                /financeiro/contas, /financeiro/fluxo, /financeiro/lancamentos
├── Histórico                                 /historico
└── Configurações                             /configuracoes/...
    ├── Loja e conta
    ├── Preços (abas: Margem e arredondamento · Preços travados · Margens individuais)
    ├── Categorias · Estoque e vendas · Vendas restritas
    ├── Conexão com a SEFAZ  [TCC 2]
    └── Notificações

Fora da barra: Fornecedores (P2, acessado por Produtos e Notas), Login, Primeiro acesso, Página não encontrada.
Componentes globais: sino do topo (dropdown), selo de conexão "XML conectado".
```

---

## 2. Fluxo principal e estados da nota

### 2.1 Fluxo de ponta a ponta

1. A nota chega (no TCC 2, pela SEFAZ; no TCC 1, por envio manual do XML).
2. **[NOVO — não existe nas telas]** Se veio da SEFAZ, primeiro chega só um *resumo*, sem itens. É preciso dar ciência (manual ou automática, conforme Configurações) para o XML completo ser liberado (N1).
3. Etapa 2 — Entenda os itens da nota.
4. Etapa 3 — Você decide: cadastrar ou vincular itens novos, atualizar ou manter preços, entrada no estoque (conforme o modo escolhido), contas a pagar.
5. Confirmar e aplicar.
6. Etapa 4 — Atualizar etiquetas.
7. Nota concluída.
8. **[NOVO]** Se foi dada a ciência, ainda falta a **manifestação final** dentro do prazo (2.3, N10).

### 2.2 Estados da nota

| # | Estado | O que significa | Botão / próximo passo | Já está no Figma? |
|---|---|---|---|---|
| 1 | Aguardando ciência | A SEFAZ avisou, mas só o resumo chegou (sem itens) | "Dar ciência e baixar itens" | Não |
| 2 | Baixando itens | Ciência enviada; XML completo ainda não liberado (D10) | Nenhum; mostra "verificando" | Não |
| 3 | Aguardando aprovação | XML completo disponível; ninguém abriu | "Analisar nota" | Sim |
| 4 | Aguardando aprovação (rascunho) | Usuário saiu por "Revisar depois", escolhas guardadas | "Continuar análise" | Parcial |
| 5 | Aplicada — etiquetas pendentes | Etapa 3 confirmada; falta a etapa 4 | "Atualizar etiquetas" | Não |
| 6 | Concluída | Tudo feito | "Ver histórico" | Sim |
| 7 | Rejeitada | Usuário usou "Rejeitar todas as propostas" | "Ver histórico" | Não |
| 8 | Com erro | XML ilegível, inválido ou chave já importada | "Ver detalhe" | Não |

- A **chave de acesso** (44 dígitos) identifica a nota de forma única. O mesmo documento nunca gera duas notas: resumo e XML completo são a mesma nota.
- Como D9 ficou sem preferência, adotei o padrão recomendado: manter o estado 5.

### 2.3 Manifestação do destinatário (atributo paralelo ao estado)

Notas vindas da SEFAZ têm também uma situação de manifestação, independente do estado de processamento.

| Situação | Significado |
|---|---|
| Sem manifestação | Nada foi registrado (nota enviada por XML, ou ciência ainda não dada) |
| Ciência dada — final pendente | A ciência foi registrada; falta a manifestação final dentro do prazo |
| Final registrada | Confirmada, Desconhecida ou Operação não realizada |

**O que foi verificado (Nota Técnica 2020.001 e resumos dela)**

- Os eventos e seus códigos: 210200 Confirmação da Operação · 210210 Ciência da Operação · 210220 Desconhecimento da Operação · 210240 Operação não Realizada.
- A **ciência não é uma manifestação final**: ela só registra que o destinatário sabe da nota; notas com ciência devem ter depois uma manifestação final.
- A ciência é descrita como evento **opcional**. Os outros três são conclusivos, valendo só o último registrado.
- O evento é enviado ao emitente e assinado com o certificado digital cujo CNPJ base é o do destinatário.
- **Prazo da manifestação final:** os resumos recentes da NT dizem 180 dias a partir da autorização da NF-e; um FAQ mais antigo fala em 180 dias a partir da ciência, e um site cita 90 dias. **As fontes divergem.** Até conferir o texto completo da NT 2020.001, a tela usa **90 dias a partir da autorização** como alerta conservador (o menor valor encontrado).
- Quais empresas são obrigadas a se manifestar **não foi verificado**: conversar com o contador (D16).

---

## 3. Regras de negócio que as telas assumem

**3.1 Qual margem vale para cada item.** Ordem de precedência:

1. **Preço travado** (lista em Configurações): nenhuma sugestão; só edição manual.
2. **Margem individual** do item (lista em Configurações): usa o Y% do item.
3. **Margem desta nota** (se o usuário editou o campo "30% ✎" na etapa 3): vale só para a nota; opção "Salvar como padrão".
4. **Margem global** (Configurações → Preços).

Fórmula: `preço sugerido = custo unitário × (1 + P/100)`, depois arredondamento (3.3), se estiver ligado. O nome técnico é *markup* (acréscimo sobre o custo); o rótulo "Margem sobre custo" com a fórmula visível ("Preço = custo × 1,30") já elimina a ambiguidade. Equivalência de consulta: 30% de acréscimo ≈ 23% de margem sobre o preço de venda.

**3.2 Custo unitário.** `custo unitário = valor unitário comercial do item no XML (vUnCom) ÷ fator de conversão`. O fator fica no vínculo do produto e **o padrão é 1**. Mais nada entra no custo: frete, seguro, desconto, ST e IPI ficam de fora (decisão sua; registrar no TCC como limitação). Mantive o fator porque, se a nota vier em caixa e você vender por unidade, sem ele o preço sairia por caixa; se isso nunca ocorre com seus fornecedores, deixe sempre em 1.

**3.3 Arredondamento (opcional — checkbox em Configurações → Preços).** Quando ligado, aplica-se ao preço sugerido:

| Centavos do preço calculado | Vira |
|---|---|
| 00 | **permanece ,00** (valor que termina em ,00 não muda) |
| 01 a 49 | ,50 |
| 50 a 89 | ,90 |
| 90 a 99 | ,99 |

Pseudocódigo, em centavos inteiros: `c = preço % 100; base = preço − c; se c = 0 → preço; senão se c < 50 → base + 50; senão se c < 90 → base + 90; senão → base + 99`.

Exemplos: 19,00 → **19,00** · 19,32 → 19,50 · 19,49 → 19,50 · 19,50 → 19,90 · 19,89 → 19,90 · 19,90 → 19,99 · 19,99 → 19,99 · 104,00 → **104,00** · 78,00 → **78,00**.

Observações:
- O arredondamento sobe sempre para o próximo "final" da tabela, **sem trocar o valor inteiro** (nunca passa de R$ 19,99 para R$ 20,00).
- Um valor que termina em ,50 continua indo para ,90 (regra original "50 ou acima"); se quiser outra coisa nesse caso, é só avisar.
- O arredondamento vale **só para o preço sugerido automático**. Um preço digitado à mão e as escolhas do menu "Terminar em…" (N8) não passam por ele.
- Como R$ 80,00 × 1,30 = R$ 104,00 termina em ,00, o exemplo do cartão "Margem sobre custo" **não muda** com a opção ligada. Para mostrar o efeito, use um segundo exemplo (ex.: R$ 75,00 × 1,30 = R$ 97,50 → arredondado R$ 97,90).
- Ao ligar a opção, preços atuais que não seguem a regra (por exemplo, R$ 78,30) serão propostos como alterados quando o item aparecer numa nota. É esperado; vale um aviso na própria opção.

**3.4 Classificação de cada item da nota.** O sistema compara o preço sugerido (já arredondado) com o preço atual, em centavos.
- **Novo:** o item não foi encontrado no banco (3.5).
- **Preço travado:** item da lista de travados; coluna "Sugerido" mostra "—" com ícone de cadeado.
- **Sem mudança:** sugerido igual ao atual.
- **Preço alterado ↑ (aumento):** sugerido maior que o atual.
- **Preço alterado ↓ (redução):** sugerido menor que o atual. **Exige confirmação extra** antes de entrar na seleção (Dec-11).

**3.5 Como o sistema encontra o item no banco.**
1. Vínculo salvo: fornecedor + código do produto no fornecedor (cProd).
2. Código de barras (cEAN), só quando existir e não vier vazio ou como "SEM GTIN".
3. Se nada casar: **Novo**, e o sistema sugere cadastrar. O usuário também pode **vincular a um produto existente** (resolve o caso de o fornecedor mudar código ou nome).
- O nome do produto **não** é usado para casar automaticamente (é frágil).

**3.6 Entrada de estoque pela nota — opção em Configurações → Estoque e vendas (D8).**

| Modo | O que acontece | Quando faz sentido | Cuidados |
|---|---|---|---|
| **Automática** | Ao confirmar a nota, a quantidade de cada item cadastrado ou vinculado entra no estoque. | Você só confirma a nota no sistema depois de conferir a mercadoria. | Se a mercadoria vier faltando ou errada, o estoque fica acima do real até um ajuste. Itens "Não cadastrar" não geram entrada. |
| **Por item** (recomendado) | A etapa 3 ganha o bloco "Entrada no estoque", com interruptor por item (ligado por padrão) e quantidade editável. | Você quer controlar item a item, por exemplo quando algo chegou incompleto. | Mais cliques por nota. |
| **Manual** | A nota não mexe no estoque; a entrada é feita depois, por Ajuste (P5). | Você prefere dar entrada só depois da contagem física. | Mais trabalho; o estoque pode ficar desatualizado por dias. |

Regras comuns: quantidade que entra = quantidade da nota (qCom) × fator de conversão; gera uma movimentação "Entrada por nota" ligada à nota; entrada não altera preço.

**3.7 Saída de estoque por leitor de código de barras.** Descrita em P7. Resumo: produtos lidos são destacados e somados; o usuário confirma; só então o estoque baixa, o financeiro registra a entrada e o histórico grava.

**3.8 Financeiro.**
- **Entradas:** vendas confirmadas na venda rápida (automático) + lançamentos manuais.
- **Saídas:** contas pagas (parcelas das notas e contas manuais) + lançamentos manuais.
- Nada é editado ou apagado depois de gravado: erros se corrigem com estorno ou novo lançamento.

**3.9 Avisos de "notas novas" e busca na SEFAZ.**
- O aviso "N notas novas desde seu último acesso" é calculado **no seu banco**: notas com recebimento posterior ao último acesso. Abrir o sistema não consulta a SEFAZ.
- A SEFAZ só é consultada por um agendador (no máximo de hora em hora) ou pelo botão "Buscar notas agora".
- Depois de uma resposta "nenhum documento novo", consultar de novo antes de 1 hora gera erro de consumo indevido (cStat 656). Por isso o botão fica **desabilitado com contagem regressiva**. `[TCC 2]` real; no TCC 1 é simulado.
- Documentos ficam disponíveis na SEFAZ por até 90 dias; o agendador não deve ficar parado mais que isso.

**3.10 Confirmação.** "Confirmar e aplicar" só habilita com o checkbox de autorização marcado e pelo menos 1 alteração selecionada. Aplicar é tudo ou nada. Ao aplicar, grava no Histórico: antes/depois, usuário, data e hora.

**3.11 Formatos.** Dinheiro `R$ 1.234,56` (sempre em centavos inteiros ou decimal, nunca ponto flutuante); datas `dd/mm/aaaa`; hora `hh:mm`.

---

## 4. As 4 telas atuais — o que mostram e o que ajustar

### 4.1 Início `[PRONTA]` — `/inicio`

**O que tem hoje:** selo "XML conectado", data e sino; saudação e "Ver notificações"; 4 cartões (Produtos cadastrados, Novas notas, Itens com preço sugerido, Itens com baixo estoque); cartão de destaque da última nota; cartão "Margem sobre custo"; cartão "Atenção ao estoque"; "Atividade recente"; rodapé "Busca de XML ativa".

**Ajustes recomendados**
- **I-1** Os 4 cartões ficam clicáveis: Produtos → `/produtos`; Novas notas → Notificações filtrada por pendentes; Itens com preço sugerido → soma das propostas de preço das notas pendentes (definir a tela de destino); Baixo estoque → `/produtos?filtro=baixo-estoque`.
- **I-2** O destaque mostra 1 nota, mas "Novas notas" diz 3: acrescentar "+ 2 outras notas aguardando — ver todas".
- **I-3** Estado sem nota pendente: "Tudo em dia — nenhuma nota aguardando".
- **I-4** Estado "Aguardando ciência" no destaque (nota sem itens): ver N1.
- **I-5** O selo "XML conectado" precisa das variações de X5.
- **I-6** "Baixo estoque" agora tem de onde vir: estoque mínimo por produto (C4, P3) e saídas pelo leitor (P7).
- **I-7** "Recebida automaticamente…" só vale para nota vinda da busca. Nota enviada à mão: "Importada por João em dd/mm às hh:mm".
- **I-8** Novo cartão "Manifestações pendentes" (aparece só quando existir): quantidade e o prazo mais próximo; leva a N10.
- **I-9** O cartão "Margem sobre custo" mostra o estado do arredondamento ("Arredondamento: ligado"). Como R$ 80,00 → R$ 104,00 já termina em ,00 e não muda, acrescentar um segundo exemplo que mostre o efeito (R$ 75,00 → R$ 97,50 → arredondado R$ 97,90). "Editar margem" leva a Configurações → Preços.
- **I-10** Atalho "Venda rápida" no topo (ação do dia a dia).

### 4.2 Notificações `[PRONTA]` — `/notificacoes`

**O que tem hoje:** cartões de resumo; barra "Busca automática ativa"; busca; chips Todas / Pendentes / Concluídas; filtro de datas; tabela (Recebimento · Nota e fornecedor · Estado · Próximo passo); paginação; "Buscar notas agora".

**Ajustes recomendados**
- **Notif-1** Acrescentar os estados novos (Aguardando ciência, Rejeitada, Com erro). Sugestão: trocar os 3 chips por um filtro "Estado" com todos.
- **Notif-2** "Buscar notas agora" desabilitado com contagem regressiva (3.9).
- **Notif-3** Botão "Importar XML" ao lado do anterior (no TCC 1 é a fonte real de dados).
- **Notif-4** Linha "Aguardando ciência" → botão "Dar ciência" (N1). Linha "Com erro" → "Ver detalhe" (N6).
- **Notif-5** Definir o período padrão do filtro de datas, o botão "Limpar filtros" e o estado vazio ("Nenhuma nota encontrada").
- **Notif-6** Destaque verde da primeira linha = nota ainda não aberta.
- **Notif-7** (nomenclatura) A tela lista notas fiscais, mas o item se chama "Notificações". Considerar renomear para "Notas fiscais" e deixar os avisos para o sino (X4).
- **Notif-8** Filtro/chip "Manifestação pendente" (leva a N10).

### 4.3 Entenda os itens da nota `[PRONTA]` — `/notas/:id/itens`

**O que tem hoje:** barra de 4 etapas; cabeçalho da nota com "Nada aplicado" e a margem em uso; tabela de 8 itens (Produto · Categoria · Custo unit. · Preço atual · Sugerido · Estado); "5 propostas para você revisar" e "Revisar alterações →"; aviso "Produtos de uso restrito não são exibidos nesta lista."

**Ajustes recomendados**
- **Itens-1** Falta a coluna **Qtd. na nota** (e a unidade). Colunas sugeridas: Produto · Categoria · Qtd. · Custo unit. · Preço atual · Sugerido · Estado · ⋯.
- **Itens-2** "Categoria" não vem do XML (nos campos do item que conferimos — cProd, cEAN, xProd, NCM, CFOP, unidades e valores — não há categoria). Vem do produto já cadastrado ou é escolhida no cadastro (N2). Para item novo, mostrar "—" até o cadastro.
- **Itens-3** "Produtos de uso restrito não são exibidos": o contador passa a mostrar "8 itens exibidos · N ocultos (venda restrita)", com o link **"Ver itens ocultos"** (N11), que mostra o motivo de cada marca automática e permite corrigir.
- **Itens-4** **Menu ⋯ em cada linha** (aparece ao passar o mouse e também quando a linha recebe foco do teclado). Nas imagens que você mandou, cada linha tem 1080 × 44 px e ocupa toda a largura da tabela: reserve cerca de 40 px à direita para o ⋯ (as outras colunas se acomodam). As ações (inclusive **Terminar em ,99 / ,90 / ,50 / ,00**) estão em N8.
- **Itens-5** Indicadores na linha: ícone de **cadeado** em "Preço travado" (coluna Sugerido mostra "—"); pequeno selo **"Margem individual 40%"** ao lado do valor sugerido; seta ↑ ou ↓ em "Preço alterado", com a redução em tom de atenção.
- **Itens-6** Estados de carregando, erro e XML sem itens.
- **Itens-7** Notas grandes: rolagem ou paginação.
- **Itens-8** Contadores: "propostas" = novos + preços alterados (travados e sem mudança ficam de fora); mostrar também "1 travado" quando houver.
- **Itens-9** (P2) Cartão com o valor total da nota e as parcelas/vencimentos, ligado ao Financeiro.

### 4.4 Você decide o que vai mudar `[PRONTA]` — `/notas/:id/decisao`

**O que tem hoje:** etapa 3 na barra; margem editável (30% ✎); bloco "Cadastrar os novos produtos?"; bloco "Atualizar estes preços?"; "3 itens seguem sem alteração de preço"; cartão "Sua seleção" (checkbox de autorização, "Confirmar e aplicar 5 alterações", "Revisar depois", "Rejeitar todas as propostas"); aviso "Depois de confirmar: atualize as etiquetas".

**Ajustes recomendados**
- **Dec-1** Terceira opção para itens novos: **"Vincular a produto existente"** (N2, aba Vincular).
- **Dec-2** "Cadastrar" abre o cadastro rápido (N2) para completar o que o XML não traz.
- **Dec-3** Bloco **"Entrada no estoque"** conforme o modo de Configurações (3.6): *Automática* → resumo só de leitura ("Entrarão no estoque: Ração bovina +20 un., …"); *Por item* → interruptor e quantidade editável por item; *Manual* → bloco oculto, com a nota "Entrada de estoque desativada nas configurações".
- **Dec-4** Bloco **"Contas a pagar"** com as parcelas da nota (quando existirem) e "Adicionar parcela" quando não houver (F1).
- **Dec-5** "Rejeitar todas" e "Revisar depois" com efeito e confirmação definidos (N7).
- **Dec-6** A margem editável aqui vale **só para esta nota** (3.1): dizer isso no texto e oferecer "Salvar como padrão". Ao mudar, recalcula os sugeridos na hora; margens individuais e preços travados continuam valendo por cima.
- **Dec-7** (**P1**) Campo para **editar o preço manualmente** em cada item. É a única forma de alterar o preço de um item travado, e vale para qualquer outro item também. Item editado à mão ganha o selo "Preço manual".
- **Dec-8** O contador "5 alterações selecionadas" atualiza a cada clique; com 0 alterações o botão Confirmar fica desabilitado. Acrescentar a linha "Reduções de preço: N" em "Sua seleção".
- **Dec-9** Após confirmar: aviso de sucesso e redirecionamento à etapa 4 (N3).
- **Dec-10** Falha ao aplicar: mensagem clara de que **nada foi aplicado** e botão "Tentar de novo".
- **Dec-11** **Confirmação de redução de preço.** Ao clicar em "Atualizar" num item cujo novo preço é **menor** que o atual (ou ao digitar à mão um preço menor), abre uma confirmação junto ao item: "Reduzir o preço de R$ 98,00 para R$ 90,00 (−R$ 8,00)?" com **Cancelar** e **Confirmar redução**. O item só entra na seleção depois de confirmado e fica com o selo "Redução confirmada".

---

## 5. Telas novas

Cada tela segue o molde: **Objetivo · Como se chega · Conteúdo · Ações · Estados · Regras**.

### 5.A Fluxo da nota

#### N1 — Nota aguardando ciência `[NOVA]` · P1 · estado 1

- **Objetivo:** tratar o caso em que a SEFAZ entregou só o resumo da nota, sem itens.
- **Como se chega:** linha em Notificações, destaque no Início, aviso no sino (X4).
- **Conteúdo da linha/cartão:** fornecedor, número da nota, valor total, data de emissão (dados do resumo), selo "Aguardando ciência" e o texto "Só recebemos o resumo. Para ver os itens, é preciso dar ciência."
- **Ação principal:** "Dar ciência e baixar itens" → modal de confirmação.
- **Modal:** título "Dar ciência desta nota?". Texto: "Isso registra na SEFAZ, e o fornecedor pode ver, que você tem conhecimento desta nota. Não confirma que a mercadoria chegou nem que você concorda com a operação. **Depois você ainda precisará registrar a manifestação final** (confirmar, não reconhecer ou informar operação não realizada) dentro do prazo." Botões: Cancelar · Dar ciência.
- **Depois de confirmar:** estado 2 ("Baixando itens", com indicador). Quando o XML completo chegar: aviso "Itens disponíveis" e a nota vira "Aguardando aprovação". A nota ganha a situação de manifestação "Ciência dada — final pendente" (2.3).
- **Modo automático (C5):** esta tela é pulada; a linha mostra "Ciência registrada automaticamente em dd/mm às hh:mm".
- **Estados:** erro ("Não foi possível dar ciência agora. Tente novamente mais tarde.") · demora acima do esperado (D10).
- **TCC 1:** simulado com botão e atraso fictício. Notas enviadas por XML (N5) não passam por aqui.

#### N2 — Cadastro rápido e vínculo de produto `[NOVA]` · P1

- **Objetivo:** completar o que o XML não traz sem sair da etapa 3.
- **Como se chega:** painel lateral aberto por "Cadastrar" ou "Vincular a existente" (Dec-1, Dec-2).
- **Aba "Cadastrar novo" — campos:**
  - Nome de exibição (USUÁRIO; vem preenchido com o nome do fornecedor, xProd, e é editável).
  - Categoria (USUÁRIO, obrigatória).
  - Unidade da nota (XML, uCom; só leitura) e Unidade de venda (USUÁRIO).
  - Fator de conversão (USUÁRIO; padrão 1; ajuda: "Quantas unidades de venda vêm em 1 unidade da nota?").
  - Custo unitário (CALCULADO; só leitura) e Preço sugerido (CALCULADO; editável).
  - Estoque mínimo (USUÁRIO; começa com o padrão de C4).
  - Código de barras (XML, cEAN, quando existir) — **só é preenchido automaticamente se o fator for 1**: o código da nota corresponde à unidade da nota (correspondência a confirmar no layout), e com fator diferente de 1 ele pode não ser o da unidade que você vende (e que o leitor vai ler). Nesse caso a tela pede o código da unidade. Sem código: botão "Gerar código interno" (P3).
  - NCM e código no fornecedor (XML; só leitura).
  - **Venda restrita:** interruptor **preenchido automaticamente** pelas regras de C8, com o motivo ao lado (ex.: "NCM da lista"); o usuário pode forçar "Restrito" ou "Não restrito".
- **Aba "Vincular a existente":** busca por nome ou código; resultados com nome, categoria, preço atual e estoque; campo do fator; aviso "As próximas notas deste fornecedor com este código serão reconhecidas automaticamente".
- **Ações:** "Salvar escolha" · "Cancelar". **Salvar não grava no catálogo:** a escolha entra na seleção da etapa 3 e só é aplicada em "Confirmar e aplicar".
- **Validações:** nome e categoria obrigatórios · fator maior que zero · aviso se já existir produto com nome parecido.

#### N3 — Etapa 4 · Atualizar etiquetas `[NOVA]` · P1 · `/notas/:id/etiquetas`

- **Objetivo:** guiar a troca de preços nas prateleiras depois de confirmar.
- **Como se chega:** redirecionamento após "Confirmar e aplicar" (Dec-9) ou botão na nota no estado 5.
- **Conteúdo:** título "Atualize as etiquetas na loja"; barra "2 de 5 etiquetas atualizadas"; tabela Produto · Preço antigo → novo · Qtd. de etiquetas (editável, padrão 1) · Caixa "Etiqueta atualizada". Entram produtos com preço alterado e produtos novos.
- **Ações:** "Imprimir etiquetas" (versão de impressão com nome, preço e unidade) · "Marcar todas como atualizadas" · "Concluir" (com pendentes: "Concluir mesmo assim?") · "Fazer depois" (nota fica no estado 5).
- **Estado vazio:** "Nenhum preço mudou nesta nota." com botão Concluir.
- **Nota técnica:** a impressão usa recursos do navegador; o método exato deve ser confirmado na documentação ao implementar (não verificado).

#### N4 — Detalhe da nota (somente leitura) `[NOVA]` · P1 · `/notas/:id`

- **Objetivo:** ver uma nota concluída ou rejeitada e o que foi decidido. É o destino dos botões "Ver histórico" das linhas concluídas.
- **Cabeçalho:** fornecedor, número, **chave de acesso** (44 dígitos, com copiar), recebida em, origem (SEFAZ ou envio manual), estado e situação de manifestação.
- **Abas:** Itens e decisões (item · decisão · antes → depois) · Estoque (entradas geradas) · Financeiro (parcelas geradas) · Linha do tempo (recebida → ciência → aberta → confirmada por quem e quando → etiquetas → manifestação final).
- **Ações:** "Baixar XML" (arquivo original). Opcional (P3): "Desfazer alterações de preço desta nota", só se nenhum dos mesmos produtos teve preço alterado depois.
- **Regra:** nada é editável aqui.

#### N5 — Importar XML manualmente `[NOVA]` · P1 · `/notificacoes/importar`

- **Objetivo:** ser a fonte real de dados no TCC 1 e a alternativa permanente se a SEFAZ falhar.
- **Conteúdo:** área de arrastar e soltar; "Escolher arquivos"; aceita vários `.xml`; lista com status por arquivo: Lendo · Pronto · Duplicada · Erro (motivo).
- **Validações:** XML bem formado (no navegador, XML malformado não lança exceção: o parser devolve um documento com um elemento de erro, que precisa ser verificado) · estrutura de NF-e · chave de 44 dígitos · chave já importada ("Duplicada — já importada em dd/mm") · destinatário diferente da loja (aviso; campo a confirmar).
- **Ação final:** "Importar N notas". Entram em Notificações como "Aguardando aprovação" (XML completo, **sem ciência e sem manifestação**).
- **TCC 2:** leitura e validação passam para o back-end.

#### N6 — Nota com erro `[NOVA]` · P2

- **Formato:** o detalhe da nota (N4) com um cartão de erro em destaque.
- **Mensagens:** "O arquivo não é um XML válido" · "Este arquivo não parece ser uma NF-e" · "Esta nota já foi importada em dd/mm" (com link) · "A nota não tem itens".
- **Ações:** "Enviar de novo" · "Descartar" (com confirmação).

#### N7 — Modais e avisos de confirmação `[NOVA]` · P1

- **Rejeitar todas as propostas:** "Rejeitar todas as propostas desta nota?" — "Nenhum cadastro, preço ou estoque será alterado. A nota ficará como Rejeitada no histórico." Botões: Cancelar · Rejeitar (vermelho).
- **Revisar depois:** sem modal; aviso "Rascunho salvo. A nota continua aguardando aprovação." e volta a Notificações.
- **Sair com escolhas não salvas:** "Você tem escolhas não salvas." Botões: Salvar rascunho e sair · Sair sem salvar · Continuar aqui.
- **Confirmar e aplicar:** sem modal extra (o checkbox é a autorização); o botão mostra "Aplicando…". Sucesso → Dec-9. Falha → Dec-10.

#### N8 — Menu ⋯ do item e suas janelas `[NOVA]` · P1

- **Onde:** última coluna da tabela de "Itens extraídos" (4.3, Itens-4). Aparece ao passar o mouse na linha e com foco do teclado.
- **Itens do menu** (os que não se aplicam ficam ocultos):
  - **Editar preço manualmente…**
  - **Terminar em…** (submenu com ,99 · ,90 · ,50 · ,00; só para itens com preço sugerido, não para travados) e **Restaurar sugestão** (aparece depois de uma alteração manual)
  - **Adicionar margem individual…** (ou **Editar margem individual…** e **Remover margem individual**, se o item já está na lista)
  - **Travar preço** (ou **Destravar preço**)
  - **Vincular a outro produto…** (P2) · **Ver detalhe do item** (P2) · **Ver produto** (se já existe)
- **Janela "Margem individual":**
  - Título "Margem individual — Ração bovina 25 kg".
  - Campo Y% e prévia ao vivo: "Custo R$ 80,00 × 1,40 = R$ 112,00 → arredondado R$ 112,50" (a parte do arredondamento só aparece se a opção estiver ligada).
  - Texto: "Esta margem será usada em todas as próximas notas para este produto. Você pode remover em Configurações → Preços → Margens individuais."
  - Botões: Cancelar · Salvar margem. Ao salvar: o item entra na lista de margens individuais, a linha é recalculada na hora e ganha o selo "Margem individual Y%".
- **Janela "Travar preço":** "Travar o preço de Ração bovina 25 kg em R$ 98,00? O sistema deixa de sugerir preço para este produto; você ainda pode editar manualmente na revisão. Para destravar: Configurações → Preços → Preços travados." Se o item tem margem individual: "A margem individual (40%) fica guardada, mas não é usada enquanto o preço estiver travado."
- **Janela "Editar preço manualmente":** campo de preço (R$), mostrando custo, preço atual e a variação; se o valor digitado for **menor** que o atual, aplica a confirmação de redução (Dec-11). O arredondamento **não** altera o valor digitado.
- **Submenu "Terminar em…":**
  - Opções: **,99 · ,90 · ,50 · ,00**. Ao lado de cada uma, o preço resultante (ex.: ",90 → R$ 104,90") para o usuário ver antes de clicar.
  - **Regra:** preço = **parte inteira do preço calculado** + os centavos escolhidos. O valor inteiro é mantido; o preço não sobe nem desce de real. Exemplo com preço calculado de R$ 104,37: ,99 → 104,99 · ,90 → 104,90 · ,50 → 104,50 · ,00 → 104,00. Com calculado de R$ 104,80 e ",50" → 104,50.
  - Vale **só para este item nesta revisão** (não vira regra nem entra em lista). O item ganha o selo "Final ,90 (manual)" e deixa de passar pelo arredondamento automático.
  - Se o resultado ficar abaixo do calculado (como 104,80 → 104,50), a linha mostra discretamente "R$ 0,30 abaixo do calculado", porque a margem efetiva fica menor que a definida.
  - Se o resultado ficar abaixo do **preço atual** do produto, vale a confirmação de redução (Dec-11).
  - "Restaurar sugestão" volta ao valor automático (com arredondamento, se estiver ligado).
- **Validações:** valor numérico maior que zero; percentual de margem maior ou igual a zero.

#### N10 — Manifestação final `[NOVA]` · P2 · `/notas/:id/manifestacao`

- **Objetivo:** registrar a manifestação final das notas em que a ciência já foi dada e não perder o prazo (2.3).
- **Como se chega:** cartão "Manifestações pendentes" do Início (I-8), chip em Notificações (Notif-8), botão na nota.
- **Lista "Manifestações pendentes":** tabela ordenada pelo prazo: nota · fornecedor · valor · ciência dada em · **prazo-alerta** e dias restantes (verde acima de 30 dias, amarelo de 8 a 30, vermelho até 7) · botão "Manifestar".
- **Tela da nota:** cabeçalho com os dados da nota e o prazo; escolha (uma opção):
  1. **Confirmar operação** — a operação ocorreu (evento 210200).
  2. **Não reconheço esta operação** (evento 210220, Desconhecimento).
  3. **Operação não realizada** (evento 210240), com campo de justificativa obrigatório (tamanho mínimo a confirmar na NT).
- **Aviso fixo:** "Esta manifestação é registrada na SEFAZ e o fornecedor pode vê-la."
- **Ações:** "Registrar manifestação" (com confirmação) · Cancelar.
- **Antes de usar de verdade:** combinar com o contador (D16).
- **TCC 1:** simulado.

#### N11 — Itens ocultos (venda restrita) `[NOVA]` · P2

- **Objetivo:** como as regras automáticas escondem itens da lista de revisão, o usuário precisa poder ver o que foi escondido e por quê.
- **Como se chega:** link "Ver itens ocultos" ao lado do contador "N ocultos" (Itens-3); painel lateral.
- **Tabela:** Item · Qtd. · Custo unit. · **Motivo da marca** ("NCM da lista", "Categoria restrita", "Lista importada", "Palavra 'x' na descrição", "Fornecedor marcado", "Marcado manualmente") · Ação.
- **Ações por item:** **"Não é restrito"** (grava a marca manual "Não restrito", que vence as regras; o item volta à lista e é recalculado) · "Manter oculto".
- **O que acontece com os itens ocultos** (cadastro, preço, estoque) é a decisão D14.

### 5.B Produtos e estoque

#### P1 — Lista de produtos `[NOVA]` · P1 · `/produtos`

- **Objetivo:** ver e achar todos os produtos; destino de "Conferir produtos" (baixo estoque).
- **Topo:** título, "Novo produto"; "Exportar lista" (P3).
- **Filtros:** busca (nome, código de barras, código do fornecedor), categoria, situação do estoque (Todos · Baixo estoque · Sem estoque · Normal), "Venda restrita", "Preço travado", "Margem individual"; ordenação.
- **Tabela:** Produto · Categoria · Estoque atual · Mínimo · Preço de venda · Último custo · Atualizado em · Situação (selos: amarelo "Baixo estoque", vermelho "Sem estoque", cadeado "Preço travado", "Venda restrita") · menu ⋯.
- **Menu ⋯:** Editar · Ajustar estoque · Ver movimentações · Desativar.
- **Regras:** linha clicável abre P2; desativado fica oculto, com filtro "Mostrar desativados"; paginação.
- **Estados:** vazio inicial ("Cadastre o primeiro produto ou importe uma nota") · sem resultados · carregando.

#### P2 — Detalhe do produto `[NOVA]` · P1 · `/produtos/:id`

- **Cabeçalho:** nome, categoria, selos, preço atual em destaque, botões "Editar" e "Ajustar estoque".
- **Aba Geral:** unidade de venda, código de barras, NCM, estoque mínimo, venda restrita, preço travado, margem individual (atalhos para as listas de Configurações), situação.
- **Aba Estoque:** saldo atual e mínimo; últimas 10 movimentações com "Ver todas" (P4).
- **Aba Preços:** histórico com data, custo, preço, margem aplicada (global, da nota ou individual), origem (nota ou manual) e quem alterou.
- **Aba Fornecedores:** vínculos (fornecedor · código no fornecedor · fator · último custo · última nota); "Adicionar vínculo" (P2).

#### P3 — Novo produto / Editar produto `[NOVA]` · P1

- **Campos:** Nome* · Categoria* · Unidade de venda* · Preço de venda* · Estoque inicial (só no cadastro; gera "Saldo inicial") · Estoque mínimo · **Código de barras** (o que o leitor vai ler; botão "Gerar código interno" para produto sem código — P3) · NCM · **Venda restrita** (marcada automaticamente pelas regras de C8, com o motivo; o usuário pode forçar Restrito ou Não restrito) · Preço travado · Margem individual (%) · Observações.
- **Regras:** mudar o preço grava no histórico com origem "manual"; o estoque atual **não** é editável aqui (usar Ajuste, P5); preço travado e margem individual aqui alimentam as mesmas listas de Configurações.
- **Validações:** código de barras duplicado → aviso com o produto que já o usa.

#### P4 — Movimentações de estoque `[NOVA]` · P1 · `/estoque/movimentacoes`

- **Tabela:** Data · Produto · Tipo (Entrada por nota · Saída por leitor (venda) · Saída manual · Ajuste · Perda · Saldo inicial · Estorno) · Quantidade (+/−) · Saldo após · Origem (link para nota, venda ou usuário) · Observação.
- **Filtros:** período, produto, tipo. Exportar (P3).
- **Regra:** movimentações **nunca são editadas ou apagadas**; erro se corrige com ajuste ou estorno.

#### P5 — Ajuste de estoque (contagem) `[NOVA]` · P2 · `/estoque/ajuste`

- **Fluxo:** escolher produtos (busca ou categoria) → tabela Produto · Saldo no sistema · Contagem (campo) · Diferença (calculada, em cores) · Motivo (Contagem, Perda, Avaria, Vencimento, Outro) → resumo → checkbox de autorização → "Confirmar ajuste".
- **Efeito:** gera movimentações "Ajuste" e registra no histórico. É também o caminho da entrada no modo *Manual* (3.6).
- **Estado:** sem diferenças ("Nada a ajustar").

#### P6 — Saída manual `[NOVA]` · P2 · `/estoque/saida`

- **Objetivo:** saídas que não são venda: perda, uso interno, devolução ao fornecedor (venda é pela P7).
- **Formulário:** várias linhas com Produto (busca) · Quantidade · Tipo · Data · Observação; "Registrar saída".
- **Regra:** saldo insuficiente bloqueia a linha, a menos que "Permitir saldo negativo" esteja ligado (C4).

#### P7 — Venda rápida com leitor de código de barras `[NOVA]` · P1 · `/venda`

- **Objetivo:** registrar a saída de produtos lendo os códigos de barras: os produtos lidos são destacados e os valores somados; o usuário confirma e, só então, o estoque baixa automaticamente.
- **Como funciona a leitura:** leitores USB em modo teclado (HID) digitam o código como se fosse um teclado, no campo que estiver com foco, e costumam ser configurados para terminar com Enter. Então a tela tem um **campo de leitura sempre em foco**, no topo, que processa o código ao receber Enter. Isso vem de guias de fabricantes e revendedores; o modelo da sua leitora define como configurar (D15 e seção 10).
- **Conteúdo:**
  - Campo de leitura ("Aponte o leitor para o código de barras") com foco automático, que volta ao campo depois de qualquer clique.
  - Busca por nome como alternativa ("Buscar produto pelo nome") para produto sem código ou leitor sem funcionar.
  - **Lista da venda:** Produto · Qtd. (editável, com + e −) · Preço unit. · Subtotal · remover. A linha **recém-lida é destacada** (cor por 1 a 2 segundos e rolagem até ela). Ler o mesmo código de novo soma 1 à quantidade.
  - **Rodapé fixo:** nº de itens, **Total da venda** em destaque, "Confirmar saída", "Limpar tudo".
  - Painel lateral (P2) "Últimas saídas de hoje", com "Estornar".
- **Confirmação:** janela "Confirmar saída de N itens — Total R$ X", com Forma de pagamento (Dinheiro, Pix, Cartão de débito, Cartão de crédito, Outro; ligada pela opção de C4) e Observação opcional. Botões: Cancelar · Confirmar saída.
- **O que acontece ao confirmar:** (1) baixa o estoque de cada item (movimentação "Saída por leitor (venda)"); (2) cria a **entrada no financeiro** (valor total, data e hora, forma de pagamento, origem "Venda"); (3) grava no histórico; (4) limpa a tela e mostra "Saída registrada — R$ 345,00".
- **Casos especiais:**
  - **Código não encontrado:** aviso "Código 789… não cadastrado" com "Cadastrar produto com este código" (abre P3 já preenchido) ou "Ignorar".
  - **Saldo insuficiente:** aviso na linha com o saldo atual; bloqueia a confirmação, a menos que "Permitir saldo negativo" esteja ligado.
  - **Produto de venda restrita:** selo e aviso na linha ("Produto de venda restrita"), com a ação exata a definir em D14.
  - **Preço:** usa o preço de venda atual; desconto é a decisão D15.
- **Estornar uma saída (P2):** gera movimentações inversas e um lançamento financeiro de estorno; nunca apaga o registro original.
- **Estados:** lista vazia ("Aguardando leitura") · erro ao confirmar (nada é gravado, botão "Tentar de novo").

### 5.C Financeiro

#### F1 — Contas a pagar `[NOVA]` · P2 · `/financeiro/contas`

- **Cartões:** A vencer (7 dias) · Vencem hoje · Atrasadas · Pagas no mês.
- **Filtros:** período de vencimento, situação, fornecedor, origem (Nota · Manual).
- **Tabela:** Vencimento · Fornecedor · Nota/Parcela (ex.: "NF 000.123 · 1/3") · Valor · Situação · "Registrar pagamento". Botão "Nova conta".
- **De onde vêm as parcelas:** do grupo de cobrança do XML (duplicatas: número, vencimento, valor — nDup, dVenc, vDup). Esse grupo é **opcional** e, segundo regras de validação citadas em fonte secundária, só é preenchido quando a forma de pagamento é duplicata mercantil. Notas pagas de outra forma (boleto, à vista) podem vir sem parcelas; a etapa 3 oferece "Adicionar parcela" (Dec-4).

#### F2 — Registrar pagamento (modal) `[NOVA]` · P2

- **Campos:** data (padrão hoje) · valor pago (padrão = valor da parcela) · forma (Dinheiro, Pix, Boleto, Transferência, Cartão, Outro) · observação.
- **Efeito:** parcela vira "Paga", gera **saída** no fluxo de caixa e entra no histórico. "Reabrir pagamento" com confirmação.

#### F3 — Fluxo de caixa `[NOVA]` · P2 · `/financeiro/fluxo`

- **Controles:** período (7 dias, 30 dias, mês, personalizado) · visão (Realizado · Previsto) · filtro de origem (Venda · Pagamento de conta · Manual).
- **Conteúdo:** cartões (Entradas, Saídas, Saldo do período, Saldo previsto); gráfico por dia ou semana (barras de entrada e saída, linha do saldo); tabela com data, descrição, categoria, origem, entrada, saída e saldo acumulado.
- **Origem dos números:** **entradas** = vendas confirmadas na venda rápida + lançamentos manuais; **saídas realizadas** = contas pagas + lançamentos manuais; **saídas previstas** = contas a pagar em aberto.
- **Estado:** sem lançamentos no período.

#### F4 — Lançamentos manuais `[NOVA]` · P2 · `/financeiro/lancamentos`

- **Lista + formulário:** Tipo (Receita/Despesa) · Data · Valor · Categoria financeira (editável: Vendas, Fornecedores, Energia, Salários, Outros…) · Descrição · Forma de pagamento.
- **Regra:** lançamentos automáticos (vendas, pagamentos de contas) aparecem bloqueados com o link para a origem; só os manuais são editáveis, e mesmo esses por estorno ou novo lançamento.

### 5.D Histórico e fornecedores

#### H1 — Histórico `[NOVA]` · P1 · `/historico`

- **Filtros:** período · tipo (Nota concluída, Nota rejeitada, Cadastro de produto, Alteração de preço, Margem individual, Preço travado, Entrada ou saída de estoque, Venda, Ajuste, Pagamento, Manifestação, Alteração de configuração) · busca.
- **Lista:** linha do tempo agrupada por dia, com ícone, descrição curta ("NF-e 000.118 concluída — 3 produtos cadastrados, 2 preços atualizados"), hora e "Ver detalhe" (notas levam a N4; os outros abrem um mini painel com antes/depois).
- **Regra:** o histórico é imutável. **Estados:** vazio · paginação.

#### S1 — Fornecedores `[NOVA]` · P2 · `/fornecedores`

Lista: Fornecedor · CNPJ · Produtos vinculados · Última nota. Criação automática na primeira nota de um emitente (nome e CNPJ do emitente; campos a confirmar no layout), com apelido editável.

#### S2 — Detalhe do fornecedor `[NOVA]` · P2 · `/fornecedores/:id`

Dados; abas Produtos vinculados (código → produto, fator, último custo; editar fator, remover vínculo) · Notas · Contas. P3: mesclar fornecedores duplicados.

### 5.E Configurações

#### C1 — Loja e conta `[NOVA]` · P2

Nome da loja, CNPJ, contato (para etiquetas), logomarca (P3); perfil do único usuário: nome, e-mail, trocar senha (`[TCC 2]`).

#### C2 — Preços `[NOVA]` · P1 · `/configuracoes/precos` (3 abas)

- **Aba "Margem e arredondamento"**
  - Margem global (%), com a fórmula e o exemplo ao vivo.
  - Checkbox **"Arredondar preços sugeridos"**, com a tabela de 3.3 explicada em palavras e uma **simulação**: digite um preço e veja o resultado.
  - Aviso junto da opção: "Ao ligar, preços atuais que não seguem esta regra (por exemplo, R$ 78,30) passarão a ser propostos como alterados quando o item aparecer numa nota. Valores que terminam em ,00 não mudam."
  - Salvar, com o aviso "Isso muda o preço sugerido nas próximas notas; os preços atuais não mudam."
- **Aba "Preços travados"**
  - Lista: Produto · Preço travado · Travado em · Ação "Destravar". Busca. Botão "Travar produto…" (escolhe o produto e confirma o preço atual).
  - Texto fixo: "Produtos travados não recebem sugestão de preço nas revisões de notas. O preço só muda por edição manual."
  - Estado vazio: "Nenhum produto com preço travado."
- **Aba "Margens individuais"**
  - Lista: Produto · Margem individual (%) · Preço atual · Definida em · Ações "Editar" e "Remover". Botão "Adicionar margem individual…" (escolhe produto e informa Y%).
  - Texto fixo: "Estes produtos usam a margem própria no lugar da global. Se o preço estiver travado, o cadeado vence."
  - Remover devolve o produto à margem global.

#### C3 — Categorias `[NOVA]` · P1 · `/configuracoes/categorias`

Lista (nome, nº de produtos), criar, renomear, desativar; categoria com produtos não é excluída (mover antes). Categorias vistas nas suas telas: Alimento, Sementes, Suplemento, Equipamento, Fertilizantes.

#### C4 — Estoque e vendas `[NOVA]` · P2 · `/configuracoes/estoque`

- **Entrada de estoque pela nota** (grupo de opções com o texto de cada uma, conforme a tabela de 3.6): Automática · Por item (recomendado) · Manual.
- **Permitir saldo negativo** (desligado por padrão; "Na venda rápida, produto sem saldo suficiente será bloqueado").
- **Estoque mínimo padrão** para produtos novos; regra de "baixo estoque" (saldo menor ou igual ao mínimo).
- **Pedir forma de pagamento ao confirmar a saída** (ligado por padrão).
- Som ao ler (P3).

#### C5 — Conexão com a SEFAZ `[NOVA]` · `[TCC 2]` · P3 (casca no TCC 1) · `/configuracoes/sefaz`

- **Conteúdo:**
  - Situação da conexão (X5) · CNPJ da loja · ambiente (Homologação · Produção), com aviso forte em homologação ("notas de teste, sem valor fiscal").
  - Certificado digital: titular, validade, situação; "Enviar certificado" + senha. O arquivo e a senha seguem para o back-end por canal seguro e **nunca** ficam salvos no navegador.
  - Frequência da busca (fixa, no mínimo 1 hora) com o texto "A SEFAZ limita a frequência das consultas"; última e próxima busca; "Testar conexão"; atalho "Importar XML manualmente".
- **Opção "Ciência da nota":**
  - **Manual (recomendado).** Você vê o resumo (fornecedor e valor) e decide se dá a ciência. *Vantagens:* você controla o que registra e evita registrar uma nota que não reconhece. *Custo:* um clique a mais e a espera até os itens chegarem.
  - **Automática.** O sistema registra a ciência assim que a nota chega. *Vantagem:* os itens chegam prontos, sem clique. *Implicações:* (1) registra na nota um evento que o fornecedor pode ver, **inclusive para notas que você não reconhece**; (2) a ciência **não é** manifestação final: toda nota com ciência exige depois a manifestação final (confirmar, não reconhecer ou operação não realizada) dentro do prazo, e o sistema passa a lembrar (N10); (3) o evento é assinado com o certificado da loja.
  - Aviso fixo: "Converse com seu contador antes de usar o modo automático."
  - Campo "Lembrar da manifestação final quando faltarem N dias" (padrão 30).
- **TCC 1:** tudo com dados de exemplo.

#### C6 — Preferências de notificação `[NOVA]` · P3

Quais avisos aparecem no sino; e-mail (`[TCC 2]`).

#### C8 — Vendas restritas `[NOVA]` · P2 · `/configuracoes/restritas`

- **Objetivo:** configurar as **regras automáticas** que marcam um produto como de venda restrita assim que ele entra no sistema, e definir o que o sistema faz com ele (D14).
- **Regras automáticas** (cada uma com interruptor ligar/desligar; o produto é marcado se **qualquer** regra ligada bater):

| # | Regra | Como funciona | Precisão | Cuidado |
|---|---|---|---|---|
| A1 | **NCM** | Lista de NCMs; item cujo NCM está na lista (o NCM vem no XML) é marcado | Alta, se a lista estiver certa | Um NCM pode misturar produtos restritos e livres; a lista precisa de manutenção |
| A2 | **Categoria** | Categorias marcadas como restritas; todo produto nelas é marcado | Alta, se as categorias forem bem organizadas | Produto na categoria errada vira restrito por engano |
| A3 | **Lista importada** | Arquivo (CSV) com códigos de barras ou códigos de produto | Alta, se houver lista confiável | A fonte e a atualização da lista precisam ser definidas |
| A4 | **Palavras na descrição** | Lista de palavras; item cuja descrição do fornecedor (xProd) contém alguma é marcado | Média | Falsos positivos e negativos |
| A5 | **Fornecedor** | Todo item de fornecedores marcados | Baixa | Marca itens que não são restritos |

- **Marca manual (sempre vence):** em cada produto (P2, P3) o usuário pode forçar "Restrito" ou "Não restrito"; essa escolha vence qualquer regra automática, nos dois sentidos.
- **Quando as regras rodam:**
  1. Ao importar uma nota, para cada item (já ao montar a lista de itens).
  2. Ao cadastrar um produto.
  3. Ao salvar uma regra nova ou alterada: o sistema mostra quantos produtos já cadastrados passariam a ser marcados e pergunta "Reaplicar aos produtos cadastrados?" antes de confirmar.
- **Transparência (obrigatória, porque a regra é automática e esconde itens):** cada produto marcado automaticamente mostra o **motivo**; a revisão da nota mostra "N itens ocultos (venda restrita)" com link para N11; produtos restritos têm selo na lista de produtos e na venda rápida.
- **Padrões iniciais sugeridos:** A1 e A2 ligadas assim que houver itens configurados; A3 ligada ao importar um arquivo; **A4 e A5 desligadas por padrão**, por serem as menos precisas (risco de esconder um item que não é restrito e nunca atualizar o preço dele).
- **O que o sistema faz com o item marcado (D14, em aberto):** no Figma ele não aparece na lista de itens extraídos; falta definir se é ignorado por completo ou se só fica fora das sugestões de preço (ainda entrando no estoque, por exemplo).
- **Atenção:** a regra de quem pode vender o quê, e com quais exigências, vem de legislação específica que **não foi verificada** aqui; se o objetivo for conformidade, confirmar na fonte oficial.

### 5.F Sistema

- **X1 — Login `[NOVA]` · P2.** Um único usuário. E-mail ou usuário, senha, "Entrar", mensagem de erro, logo e slogan. No TCC 1 é de mentira; autenticação real no TCC 2.
- **X2 — Primeiro acesso (estado vazio) `[NOVA]` · P2.** Sem produtos nem notas, ocupa o lugar do Início: checklist "1 Defina sua margem · 2 Importe sua primeira nota · 3 Confira os produtos".
- **X3 — Página não encontrada `[NOVA]` · P3.**
- **X4 — Sino do topo (dropdown) `[NOVA]` · P2.** Últimos avisos: nota recebida, nota aguardando ciência, manifestação com prazo próximo, estoque baixo, conta vencendo hoje, erro de busca. Marcar como lido; "Ver todas" leva a Notificações; contador de não lidos.
- **X5 — Selo de conexão `[NOVA]` · P1.** Variações: "XML conectado" (verde) · "Próxima busca em 42 min" (cinza) · "Modo manual" (azul) · "Certificado vencido ou inválido" (vermelho; leva a C5) · "Sem conexão com a SEFAZ — tentando de novo" (amarelo). O clique abre C5. No TCC 1 as variações são alternadas por um seletor de demonstração.

---

## 6. Dados que as telas exigem (modelo para o front)

Campos com a tag do XML foram conferidos na documentação do layout da NF-e. Campos sem tag (número, série, emitente, destinatário, datas) **ainda precisam ser confirmados no layout** antes de virarem código.

| Entidade | Campos principais | Origem |
|---|---|---|
| **Nota** | id · chave de acesso (44 dígitos, única) · número e série (a confirmar) · fornecedor · data de emissão e de recebimento (a confirmar) · origem (SEFAZ ou envio manual) · estado (2.2) · valor total · ciência (quando, manual ou automática) · situação de manifestação (2.3) · data de autorização (a confirmar) · decidida por / em | XML + CALCULADO |
| **ItemNota** | número do item (nItem) · código no fornecedor (cProd) · código de barras (cEAN) · descrição do fornecedor (xProd) · NCM · CFOP · unidade comercial (uCom) · quantidade (qCom) · valor unitário (vUnCom) · valor total (vProd) · unidade/quantidade/valor tributáveis (uTrib, qTrib, vUnTrib) · frete, seguro, desconto (vFrete, vSeg, vDesc; guardados, mas fora do cálculo) | XML |
| ↳ calculados | produto encontrado · fator de conversão · custo unitário · margem usada (individual, da nota ou global) · preço sugerido (com arredondamento, se ligado) · preço atual · estado do item (Novo, Preço alterado ↑/↓, Sem mudança, Preço travado) · decisão · redução confirmada (sim/não) · preço manual | CALCULADO + USUÁRIO |
| **Produto** | id · nome · categoria · unidade de venda · preço de venda · estoque atual · estoque mínimo · código de barras · NCM · venda restrita (sim/não) · origem da marca (automática ou manual) · motivo · ativo · criado em | USUÁRIO + XML |
| **PrecoTravado** | produto · preço travado · travado em · por quem | USUÁRIO |
| **RegraRestrita** | tipo (NCM, categoria, lista importada, palavra, fornecedor) · valor · ativa | USUÁRIO |
| **MargemIndividual** | produto · percentual · definida em | USUÁRIO |
| **Fornecedor** | id · nome · apelido · CNPJ (campo do emitente, a confirmar) | XML + USUÁRIO |
| **Vínculo** | fornecedor · código no fornecedor (cProd) · produto · fator de conversão | USUÁRIO |
| **Parcela** | nota · número (nDup) · vencimento (dVenc) · valor (vDup) · situação · pago em · forma | XML + USUÁRIO |
| **MovimentoEstoque** | id · produto · tipo (entrada por nota, saída por leitor, saída manual, ajuste, perda, saldo inicial, estorno) · quantidade · saldo após · origem (nota, venda ou usuário) · data · observação | CALCULADO |
| **Venda (saída por leitor)** | id · data e hora · itens (produto, quantidade, preço unitário, subtotal) · total · forma de pagamento · estornada (sim/não) | CALCULADO + USUÁRIO |
| **Lançamento** | id · tipo (receita/despesa) · categoria financeira · valor · data · descrição · origem (venda, parcela paga ou manual) | CALCULADO + USUÁRIO |
| **ManifestaçãoFinal** | nota · tipo (confirmação, desconhecimento, não realizada) · justificativa · registrada em | USUÁRIO |
| **RegistroHistórico** | id · tipo · nota (opcional) · antes/depois · usuário · data e hora | CALCULADO |
| **Configuração** | margem global · arredondamento (liga/desliga) · categorias · modo de entrada de estoque · saldo negativo · pedir forma de pagamento · estoque mínimo padrão · modo de ciência · dias de lembrete · regras de identificação de venda restrita · conexão com a SEFAZ | USUÁRIO |

Fatura (nFat, vOrig, vDesc, vLiq) e parcelas (nDup, dVenc, vDup) são opcionais no XML.

---

## 7. Notas para construir o TCC 1

- **Camada de dados única.** As telas conversam só com uma interface (serviços de notas, produtos, vendas, financeiro). No TCC 1 ela devolve dados de exemplo; no TCC 2 troca-se por chamadas ao back-end sem mexer nas telas.
- **Função de arredondamento isolada.** Escreva a regra de 3.3 como uma função pura, em centavos inteiros, com testes: 19,00 → 19,00 · 19,32 → 19,50 · 19,49 → 19,50 · 19,50 → 19,90 · 19,89 → 19,90 · 19,90 → 19,99 · 19,99 → 19,99 · 104,00 → 104,00.
- **Função "terminar em".** Outra função pura: recebe o preço calculado e o final escolhido (99, 90, 50 ou 00) e devolve parte inteira + final. Testes: 104,37 com ,99 → 104,99 · 104,37 com ,00 → 104,00 · 104,80 com ,50 → 104,50.
- **Função de venda restrita.** Recebe o item (NCM, categoria, descrição, fornecedor, código) e as regras ligadas; devolve restrito ou não, com o motivo. A marca manual vence. Testar cada regra isolada, combinações e a marca manual nos dois sentidos.
- **Função de decisão do preço.** Uma função única recebe produto, custo, margens e configurações e devolve: preço sugerido, margem usada e estado do item (precedência de 3.1 e classificação de 3.4). Testar: travado, margem individual, margem da nota, global, redução, sem mudança.
- **Leitura do XML no navegador.** O `DOMParser` lê XML com o tipo `application/xml`; XML malformado não lança exceção e o documento volta com um elemento de erro (`parsererror`), que deve ser verificado. As tags da NF-e ficam no namespace `http://www.portalfiscal.inf.br/nfe`, então a busca de elementos precisa considerá-lo (por exemplo, `getElementsByTagNameNS`). Conferido na MDN e em exemplos de XML.
- **Leitor de código de barras.** Em modo teclado (HID), o leitor digita o código no campo em foco e pode ser configurado para terminar com Enter. Para testar sem o aparelho, digite o código no campo e aperte Enter. Antes de depender dele, confirme o modo de operação do modelo que você vai usar.
- **XMLs de exemplo para testar** (cerca de 10): (1) nota simples com 1 item novo; (2) itens existentes com custo maior; (3) itens existentes com custo **menor** (testa a confirmação de redução); (4) nota com parcelas; (5) nota sem cobrança (à vista); (6) item sem código de barras ou com "SEM GTIN"; (7) unidade da nota diferente da de venda; (8) item com NCM de venda restrita; (9) mesma chave importada duas vezes; (10) arquivo que não é XML. Conferir se existem exemplos oficiais antes de inventar os seus.
- **Simulações que o mock deve ter:** atraso entre ciência e itens; bloqueio de 1 hora do botão "Buscar notas agora"; falha ao aplicar; certificado vencido; prazo de manifestação perto de vencer.
- **Todas as telas** precisam dos estados: carregando · vazio · erro · sucesso.
- **Rascunho de decisão por nota:** guardar as escolhas da etapa 3 (inclusive margem alterada e reduções confirmadas) para o "Revisar depois".
- **Acessibilidade mínima:** foco visível nos botões e no menu ⋯, contraste do verde sobre o bege, e selos que não dependam só de cor (os seus já têm texto).

---

## 8. Ordem sugerida para desenhar no Figma

1. **Ajustes de maior impacto nas 4 telas atuais:** estado "Aguardando ciência" (I-4, Notif-4), coluna de quantidade (Itens-1), menu ⋯ e selos (Itens-4, Itens-5), "Vincular a existente" (Dec-1), edição manual de preço (Dec-7), confirmação de redução (Dec-11), bloco de entrada no estoque (Dec-3), contagem regressiva da busca (Notif-2).
2. **Fluxo da nota:** N1, N2, N3, N4, N5, N7, N8.
3. **Venda rápida e produtos:** P7, P1, P2, P3, P4; histórico H1.
4. **Configurações essenciais e selo de conexão:** C2 (3 abas), C3, C4, X5.
5. **P2:** F1–F4, N10, N11, C8, P5, P6, S1, S2, C1, N6, X1, X2, X4.
6. **P3:** C5 (casca), C6, X3 e demais itens opcionais.

---

## 9. Decisões

### 9.1 Já fechadas

| # | Assunto | Resultado |
|---|---|---|
| D1 | Como o estoque diminui | Venda rápida por leitor (P7) + saída manual para perda e uso (P6) |
| D2 | Financeiro | Entra: entradas das vendas e saídas das contas pagas, mais lançamento manual |
| D3 | Identificação de venda restrita | Regras **automáticas** (NCM, categoria, lista importada, palavras, fornecedor) + marca manual que vence (C8) |
| D4 | Arredondamento | Opcional; **,00 permanece**; regra de 3.3; menu "Terminar em…" por item (N8) |
| D5 | Preço travado | Lista em Configurações; sem sugestão na revisão, só edição manual |
| D6 | Impostos, frete, desconto | Nada entra; só o valor unitário; registrar como limitação |
| D7 | Categoria dos itens novos | Escolhida à mão no cadastro (padrão recomendado, sem objeção sua) |
| D8 | Entrada de estoque pela nota | Opção em Configurações com 3 modos (3.6) |
| D9 | Etapa 4 muda o estado | Padrão recomendado: sim, estado 5 |
| D10 | Ciência da nota | Opção em Configurações: manual ou automática (C5) |
| D11 | Margem individual | Por item, via lista em Configurações e menu ⋯; vence a global (3.1) |
| D12 | Dispositivos | Somente desktop |
| D13 | Usuários | Um único usuário |

### 9.2 Ainda em aberto

- **D14 — O que fazer com o item restrito na nota.** Hoje ele some da lista. Opções: (a) ignorado por completo (sem cadastro, preço ou estoque); (b) fora das sugestões de preço, mas entrando no estoque; (c) aparece em uma lista separada. E, na venda rápida, qual alerta aparece ao ler um produto restrito.
- **D15 — Venda rápida.** Forma de pagamento obrigatória ao confirmar (proposta: sim, ligável em C4)? Haverá desconto na venda (proposta: não, por enquanto)?
- **D16 — Manifestação final.** Se a loja é obrigada, qual o prazo exato e quem registra (você ou o contador). Depende do texto completo da NT 2020.001 e do contador.

---

## 10. O que ainda não foi verificado

Trate como hipótese até conferir na documentação oficial:

1. **Prazo e contagem da manifestação final** (180 dias da autorização, 180 dias da ciência ou 90 dias: as fontes divergem). Conferir a NT 2020.001 completa.
2. **Quais empresas são obrigadas** a se manifestar (seção própria da NT 2020.001, não lida).
3. Se a manifestação final pode ser corrigida e quantas vezes; e o efeito da confirmação sobre o cancelamento da nota pelo fornecedor (trechos truncados e fóruns).
4. **Tempo entre dar ciência e o XML completo ficar disponível**, e como buscá-lo.
5. Campos exatos de número, série, emitente (nome e CNPJ), destinatário, datas e data de autorização no XML.
6. Se o código de barras da nota (cEAN) corresponde à unidade comercial (uCom), como o texto de N2 supõe.
7. O grupo de forma de pagamento (`pag`), que pode ajudar nas notas sem parcelas.
8. O que o resumo da nota traz exatamente (fonte secundária: chave, emitente, data, valor, situação).
9. Que o grupo de parcelas só é preenchido para duplicata mercantil (fórum citando regras de validação).
10. Que testar a Distribuição DF-e em homologação exige emitir notas de teste como emitente de CNPJ diferente (relato de fórum).
11. Se existem XMLs de exemplo oficiais para os testes.
12. Método de impressão de etiquetas no navegador e de geração de código de barras interno (N3, P3).
13. **Leitor de código de barras:** a informação de que leitores em modo teclado (HID) digitam no campo em foco e aceitam sufixo Enter vem de guias de revendedores, não de manuais do fabricante; a configuração depende do seu modelo.
14. **Regra legal de venda restrita** (quem pode vender o quê e com quais exigências).
15. Como a reforma tributária (IPI zerado a partir de 2027, IBS e CBS) aparece no XML. Não afeta o cálculo, já que impostos ficam fora, mas pode mudar campos que você lê.
