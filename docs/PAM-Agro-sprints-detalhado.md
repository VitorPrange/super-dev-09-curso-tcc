# PAM Agro — Sprints do front (detalhado)

Angular. Só telas, nada funcional. Apresentação toda sexta.

## Convenções

- **Estático:** dados fixos escritos no HTML. Botões e links só levam de uma tela para outra. Modais, menus abertos e estados (vazio, erro, desabilitado) são feitos como variações estáticas da tela.
- **Criar o projeto:** `ng new pam-agro --routing`. A opção `--routing` precisa ser passada (ou aceita no prompt), porque não tem padrão ativado; a documentação diz que ela configura os arquivos de navegação entre telas. Componentes já saem standalone por padrão.
- **Criar cada tela:** `ng generate component <nome>` (alias `ng g c <nome>`). O componente sai standalone por padrão e cria a classe (`.ts`), o template (`.html`), o estilo (`.css`) e o arquivo de teste. Para não gerar o teste, use `--skip-tests`.
- **Figma:** desenhar as telas novas da sprint seguinte antes de ela começar.
- Os códigos entre parênteses (N5, P7, C2…) são os do mapa de telas.

**Sexta 13/11:** apresentar o plano e as 4 telas já prontas no Figma (Início, Notificações, Entenda os itens, Você decide).

---

## Sprint 0 — 14/11 a 20/11 (leve) · apresenta 20/11

### 1. Projeto e layout base
- **Componentes:** `layout`, `barra-lateral`, `topo`.
- **Estilos globais tirados do Figma:** verde escuro da barra lateral, verde dos botões, fundo bege, cartões brancos com borda arredondada, fonte, selos (verde, amarelo, cinza, vermelho), botões (principal, secundário, vermelho), tabela.
- **Barra lateral:**
  - Logo PAM Agro e o slogan "Seu estoque, mais simples."
  - Título "Gestão da loja" e os itens Início, Venda rápida, Produtos, Notificações, Financeiro, Histórico, Configurações.
  - Item ativo destacado e bolinha de aviso em Notificações.
  - Caixa "Busca de XML ativa".
  - Rodapé com "Administrador" e o nome do usuário.
- **Topo:**
  - Caminho da página (ex.: "Notas fiscais / Notificações").
  - Selo de conexão nas 5 variações: "XML conectado" (verde), "Próxima busca em 42 min" (cinza), "Modo manual" (azul), "Certificado vencido ou inválido" (vermelho), "Sem conexão com a SEFAZ" (amarelo).
  - Data e sino com contador.
  - Variação com o menu do sino aberto: avisos de nota recebida, nota aguardando ciência, manifestação com prazo próximo, estoque baixo e conta vencendo hoje; "Marcar como lido" e "Ver todas".

### 2. Login (X1)
- Logo, slogan, campo de e-mail ou usuário, campo de senha e botão "Entrar".
- Variação com a mensagem "Usuário ou senha incorretos".

### 3. Início (Figma pronto)
- **O que já existe no Figma:**
  - Saudação e botão "Ver notificações".
  - Cartões: Produtos cadastrados, Novas notas, Itens com preço sugerido, Itens com baixo estoque.
  - Destaque da última nota (NF-e, fornecedor, data, itens/novos/preços, botão "Analisar nota").
  - Cartão "Margem sobre custo" (campo %, fórmula, exemplo, "Editar margem").
  - Cartão "Atenção ao estoque".
  - "Atividade recente".
- **Acréscimos:**
  - Linha "+ 2 outras notas aguardando — ver todas" no destaque.
  - Cartão "Manifestações pendentes".
  - "Arredondamento: ligado" no cartão de margem, com um segundo exemplo (R$ 75,00 → R$ 97,50 → R$ 97,90).
  - Botão de atalho "Venda rápida".
- **Variações:** "Tudo em dia — nenhuma nota aguardando" e destaque com nota "Aguardando ciência".

### 4. Notificações (Figma pronto)
- **O que já existe no Figma:** cartões de resumo, barra "Busca automática ativa" com última verificação, busca, filtros, período, ordenação, tabela (Recebimento · Nota e fornecedor · Estado · Próximo passo), paginação e botão "Buscar notas agora".
- **Acréscimos:**
  - Botão "Importar XML".
  - Filtro "Estado" com todos os estados.
  - Chip "Manifestação pendente".
  - Uma linha de cada estado: Aguardando ciência ("Dar ciência"), Baixando itens, Aguardando aprovação ("Analisar nota"), Rascunho ("Continuar análise"), Etiquetas pendentes ("Atualizar etiquetas"), Concluída ("Ver histórico"), Rejeitada, Com erro ("Ver detalhe").
- **Variações:** botão "Buscar notas agora" desabilitado com "disponível em 42 min" e lista vazia "Nenhuma nota encontrada".

---

## Sprint 1 — 21/11 a 27/11 · apresenta 27/11

### 5. Importar XML (N5)
- Título, área tracejada "Arraste os arquivos XML aqui" e botão "Escolher arquivos".
- Lista de arquivos com nome e status: "Lendo", "Pronto", "Duplicada — já importada em 03/10", "Erro — o arquivo não é um XML válido".
- Botão "Importar 3 notas" e botão "Cancelar".

### 6. Nota aguardando ciência (N1)
- Cartão com fornecedor, número, valor total, data de emissão, selo "Aguardando ciência", o texto "Só recebemos o resumo. Para ver os itens, é preciso dar ciência." e o botão "Dar ciência e baixar itens".
- **Variação com o modal aberto:**
  - Título "Dar ciência desta nota?".
  - Texto explicando que o fornecedor vê o registro, que não confirma a operação e que depois será preciso fazer a manifestação final.
  - Botões "Cancelar" e "Dar ciência".
- **Variação "Baixando itens":** selo e indicador de carregamento.

### 7. Nota com erro (N6)
- Cabeçalho da nota e cartão de erro em destaque com a mensagem (ex.: "Este arquivo não parece ser uma NF-e").
- Link "Ver detalhe técnico" (texto recolhido).
- Botões "Enviar de novo" e "Descartar".

### 8. Entenda os itens — etapa 2 (Figma pronto)
- **O que já existe no Figma:** barra das 4 etapas, cabeçalho da nota com "Nada aplicado" e margem, contadores, busca, filtros, tabela e "Revisar alterações →".
- **Acréscimos na tabela:**
  - Colunas Produto · Categoria · **Qtd.** · Custo unit. · Preço atual · Sugerido · Estado · **⋯**.
  - Selos: "Novo", "Preço alterado ↑", "Preço alterado ↓" (tom de atenção), "Sem mudança", "Preço travado" (cadeado; Sugerido mostra "—").
  - Selo pequeno "Margem individual 40%" ao lado do preço sugerido.
  - Categoria "—" nos itens novos.
- **Acréscimo no rodapé:** "8 itens exibidos · 1 oculto (venda restrita) — Ver itens ocultos".
- Reservar cerca de 40 px à direita da linha para o ⋯.

### 9. Menu ⋯ do item e janelas (N8)
- **Variação com o menu aberto em uma linha:** Editar preço manualmente… · Terminar em… · Restaurar sugestão · Adicionar margem individual… · Travar preço · Vincular a outro produto… · Ver produto.
- **Submenu "Terminar em…" aberto:** ,99 · ,90 · ,50 · ,00, cada um com o preço resultante ao lado (ex.: ",90 → R$ 104,90").
- **Janela "Margem individual":** nome do produto, campo %, prévia "Custo R$ 80,00 × 1,40 = R$ 112,00", texto explicativo, botões "Cancelar" e "Salvar margem".
- **Janela "Travar preço":** texto de confirmação com o preço atual e botões "Cancelar" e "Travar".
- **Janela "Editar preço manualmente":** custo, preço atual, campo de preço, variação em R$, botões "Cancelar" e "Aplicar".
- **Linha depois da edição:** selos "Final ,90 (manual)" e "R$ 0,30 abaixo do calculado".

### 10. Itens ocultos (N11)
- Painel lateral com título "Itens ocultos — venda restrita".
- Tabela: Item · Qtd. · Custo unit. · Motivo ("NCM da lista", "Categoria restrita", "Palavra 'x' na descrição"…).
- Botões por linha "Não é restrito" e "Manter oculto".

### 11. Você decide — etapa 3 (Figma pronto)
- **O que já existe no Figma:** barra de etapas, cabeçalho com margem editável, blocos "Cadastrar os novos produtos?" e "Atualizar estes preços?", cartão "Sua seleção", aviso de etiquetas.
- **Acréscimos:**
  - Terceira opção "Vincular a existente" nos itens novos.
  - Campo de preço manual em cada item de preço.
  - Texto "Margem só desta nota" e link "Salvar como padrão".
  - **Variação de confirmação de redução:** "Reduzir o preço de R$ 98,00 para R$ 90,00 (−R$ 8,00)?" com "Cancelar" e "Confirmar redução", e o selo "Redução confirmada".
  - **Bloco "Entrada no estoque" em 3 variações:** resumo só de leitura (automática), lista com interruptor e quantidade por item (por item), aviso "Entrada de estoque desativada nas configurações" (manual).
  - **Bloco "Contas a pagar":** parcelas (Nº · Vencimento · Valor) e a variação sem parcelas, com "Adicionar parcela".
  - Linha "Reduções de preço: 1" em "Sua seleção".
  - Botão "Confirmar" desabilitado quando há 0 alterações (variação).

### 12. Cadastro rápido / vínculo de produto (N2)
- Painel lateral com duas abas.
- **Aba "Cadastrar novo":**
  - Nome de exibição (já preenchido), categoria.
  - Unidade da nota (só leitura), unidade de venda, fator de conversão (com ajuda).
  - Custo unitário (só leitura), preço sugerido, estoque mínimo.
  - Código de barras, NCM e código no fornecedor (só leitura).
  - Interruptor "Venda restrita" com o motivo.
  - Botões "Salvar escolha" e "Cancelar".
- **Aba "Vincular a existente":** busca, lista de resultados (nome, categoria, preço, estoque), campo de fator, aviso "As próximas notas deste fornecedor serão reconhecidas automaticamente".
- **Variação com erros nos campos:** "Informe o nome", "Escolha a categoria".

---

## Sprint 2 — 28/11 a 04/12 · apresenta 04/12

### 13. Modais de confirmação (N7)
- "Rejeitar todas as propostas desta nota?" com texto e botões "Cancelar" e "Rejeitar" (vermelho).
- "Você tem escolhas não salvas." com "Salvar rascunho e sair", "Sair sem salvar" e "Continuar aqui".
- Aviso (toast) "Rascunho salvo. A nota continua aguardando aprovação."
- Botão "Aplicando…" e aviso de falha "Nada foi aplicado" com "Tentar de novo".

### 14. Atualizar etiquetas — etapa 4 (N3)
- Barra de etapas na etapa 4, título "Atualize as etiquetas na loja" e barra "2 de 5 etiquetas atualizadas".
- Tabela: Produto · Preço antigo → novo · Qtd. de etiquetas · caixa "Etiqueta atualizada".
- Botões "Imprimir etiquetas", "Marcar todas como atualizadas", "Concluir" e "Fazer depois".
- **Variações:** vazia ("Nenhum preço mudou nesta nota") e prévia da folha de etiquetas (nome, preço, unidade).

### 15. Detalhe da nota (N4)
- **Cabeçalho:** fornecedor, número, chave de acesso de 44 dígitos com botão copiar, recebida em, origem (SEFAZ ou envio manual), estado e situação de manifestação.
- **Abas:**
  - Itens e decisões (item · decisão · antes → depois).
  - Estoque (entradas geradas).
  - Financeiro (parcelas).
  - Linha do tempo (recebida → ciência → aberta → confirmada → etiquetas → manifestação).
- Botão "Baixar XML".

### 16. Manifestação final (N10)
- **Lista "Manifestações pendentes":** Nota · Fornecedor · Valor · Ciência em · Prazo e dias restantes (selo verde, amarelo ou vermelho) · "Manifestar".
- **Tela da nota:**
  - Cabeçalho com o prazo.
  - Três opções: "Confirmar operação", "Não reconheço esta operação" e "Operação não realizada" (com campo de justificativa).
  - Aviso "O fornecedor pode ver este registro".
  - Botões "Registrar manifestação" e "Cancelar".

### 17. Histórico (H1)
- Filtros: período, tipo, busca.
- Linha do tempo agrupada por dia: ícone, descrição curta (ex.: "NF-e 000.118 concluída — 3 produtos cadastrados, 2 preços atualizados"), hora, "Ver detalhe".
- **Variação com o mini painel de antes/depois aberto.**
- Variação vazia e paginação.

### 18. Lista de produtos (P1)
- Título e botão "Novo produto".
- **Filtros:** busca, categoria, situação do estoque, venda restrita, preço travado, margem individual, ordenação.
- **Tabela:** Produto · Categoria · Estoque · Mínimo · Preço · Último custo · Atualizado em · Situação.
- **Selos:** Baixo estoque, Sem estoque, cadeado, Venda restrita.
- Menu ⋯ aberto (Editar · Ajustar estoque · Ver movimentações · Desativar).
- Paginação.
- **Variações:** vazia ("Cadastre o primeiro produto ou importe uma nota") e sem resultados.

### 19. Detalhe do produto (P2)
- **Cabeçalho:** nome, categoria, selos, preço em destaque, botões "Editar" e "Ajustar estoque".
- **Abas:**
  - Geral (unidade, código de barras, NCM, mínimo, venda restrita, preço travado, margem individual).
  - Estoque (saldo e últimas movimentações).
  - Preços (data, custo, preço, margem usada, origem, quem alterou).
  - Fornecedores (fornecedor, código, fator, último custo, última nota).

### 20. Novo / editar produto (P3)
- **Campos:** nome, categoria, unidade de venda, preço de venda, estoque inicial (só no novo), estoque mínimo, código de barras (com "Gerar código interno"), NCM, venda restrita (com o motivo), preço travado, margem individual (%), observações.
- Botões "Salvar" e "Cancelar".
- **Variações:** com erros nos campos e com o aviso "Código de barras já usado por…".

---

## Sprint 3 — 05/12 a 11/12 · apresenta 11/12

### 21. Venda rápida (P7)
- Campo de leitura grande no topo ("Aponte o leitor para o código de barras") e campo "Buscar produto pelo nome".
- **Lista:** Produto · Qtd. (com − e +) · Preço unit. · Subtotal · remover. Uma linha com o destaque de "recém-lida".
- **Rodapé fixo:** nº de itens, **Total** em destaque, botões "Confirmar saída" e "Limpar tudo".
- **Variações:**
  - Lista vazia ("Aguardando leitura").
  - Aviso "Código 789… não cadastrado" com "Cadastrar produto" e "Ignorar".
  - Linha com "Saldo insuficiente".
  - Linha com selo "Venda restrita".
  - Modal "Confirmar saída de 4 itens — Total R$ 345,00" com forma de pagamento e observação.
  - Aviso "Saída registrada — R$ 345,00".
  - Painel lateral "Últimas saídas de hoje" com "Estornar".

### 22. Movimentações de estoque (P4)
- Filtros: período, produto, tipo.
- **Tabela:** Data · Produto · Tipo (Entrada por nota, Saída por leitor, Saída manual, Ajuste, Perda, Saldo inicial, Estorno) · Quantidade (+/− em cores) · Saldo após · Origem (link) · Observação.

### 23. Ajuste de estoque (P5)
- Busca de produtos ou escolha por categoria.
- **Tabela:** Produto · Saldo no sistema · Contagem (campo) · Diferença (em cores) · Motivo.
- Resumo, checkbox de autorização e botão "Confirmar ajuste".
- Variação "Nada a ajustar".

### 24. Saída manual (P6)
- Linhas com Produto · Quantidade · Tipo (Uso interno, Perda, Devolução ao fornecedor) · Data · Observação, e botão "+ Adicionar linha".
- Botão "Registrar saída".
- Variação com uma linha bloqueada por saldo insuficiente.

### 25. Contas a pagar (F1)
- Cartões: A vencer (7 dias) · Vencem hoje · Atrasadas · Pagas no mês.
- Filtros: período, situação, fornecedor, origem.
- **Tabela:** Vencimento · Fornecedor · Nota/Parcela ("NF 000.123 · 1/3") · Valor · Situação (selos) · "Registrar pagamento".
- Botão "Nova conta" (formulário em modal).
- Variação vazia.

### 26. Registrar pagamento (F2)
- Modal com data do pagamento, valor pago, forma (Dinheiro, Pix, Boleto, Transferência, Cartão, Outro), observação, botões "Cancelar" e "Registrar".
- Variação da linha paga com "Reabrir pagamento".

### 27. Fluxo de caixa (F3)
- Período (7 dias, 30 dias, mês, personalizado), alternância Realizado/Previsto e filtro de origem.
- Cartões: Entradas, Saídas, Saldo do período, Saldo previsto.
- Gráfico de barras (entradas e saídas por dia) com linha do saldo. Pode ser uma imagem ou SVG estático.
- **Tabela:** Data · Descrição · Categoria · Origem · Entrada · Saída · Saldo acumulado.
- Variação sem lançamentos.

### 28. Lançamentos (F4)
- **Lista:** Data · Tipo · Categoria · Descrição · Forma · Valor.
- Formulário: Tipo (Receita/Despesa), data, valor, categoria, descrição, forma de pagamento.
- Linhas automáticas (vendas, pagamentos) com cadeado e link para a origem.

---

## Sprint 4 — 12/12 a 18/12 · apresenta 18/12

### 29. Configurações → Preços (C2), em 3 abas
- **Aba "Margem e arredondamento":**
  - Campo da margem global com fórmula e exemplo.
  - Checkbox "Arredondar preços sugeridos" com a tabela da regra (,00 permanece · ,01–,49 → ,50 · ,50–,89 → ,90 · ,90–,99 → ,99) e uma caixa de simulação com exemplo.
  - Aviso sobre propostas de alteração e botão "Salvar".
- **Aba "Preços travados":** Produto · Preço travado · Travado em · "Destravar"; busca; botão "Travar produto…"; variação vazia.
- **Aba "Margens individuais":** Produto · Margem (%) · Preço atual · Definida em · "Editar" e "Remover"; botão "Adicionar margem individual…".

### 30. Configurações → Categorias (C3)
- Lista (nome, nº de produtos) com "Renomear" e "Desativar", botão "Nova categoria".
- Variação do aviso "Categoria com produtos não pode ser excluída".

### 31. Configurações → Estoque e vendas (C4)
- Opções de entrada de estoque pela nota (Automática · Por item (recomendado) · Manual), cada uma com seu texto explicativo.
- Interruptor "Permitir saldo negativo".
- Estoque mínimo padrão.
- Interruptor "Pedir forma de pagamento ao confirmar a saída".

### 32. Configurações → Vendas restritas (C8)
- 5 regras com interruptor: NCM (lista de códigos), Categoria (lista marcável), Lista importada (botão "Importar CSV"), Palavras na descrição (lista), Fornecedor (lista). Palavras e Fornecedor aparecem desligadas.
- Texto "A marca manual no produto sempre vence".
- Modal "Esta regra marcaria 12 produtos já cadastrados. Reaplicar?".

### 33. Configurações → Loja e conta (C1)
- Nome da loja, CNPJ, contato, logomarca.
- Perfil: nome, e-mail, botão "Trocar senha".

### 34. Primeiro acesso (X2)
- No lugar do Início: checklist "1 Defina sua margem · 2 Importe sua primeira nota · 3 Confira os produtos", com barra de progresso.

### Se sobrar tempo
- **Fornecedores (S1/S2):** lista (Fornecedor · CNPJ · Produtos vinculados · Última nota) e detalhe com abas Produtos vinculados, Notas e Contas.
- **Conexão com a SEFAZ (C5):**
  - Situação, CNPJ, ambiente (Homologação/Produção).
  - Certificado (titular, validade, "Enviar certificado").
  - Frequência da busca, última e próxima busca, "Testar conexão".
  - Opção de ciência Manual/Automática com as implicações de cada uma.
  - Lembrete da manifestação final.
- **Preferências de notificação (C6):** interruptores por tipo de aviso.
- **Página não encontrada (X3):** mensagem e botão "Voltar ao início".
