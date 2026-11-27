# PAM Agro — Sprints do back-end (TCC 2)

O front do TCC 1 já está no repositório: todas as telas e variações em `src/app/pages`, com rotas em `app.routes.ts` e dados fixos no HTML.
O TCC 2 liga essas telas a uma API de verdade. Cada encontro termina com **uma tela do front consumindo a API**, para ter o que mostrar.

## Stack

- **Python + FastAPI** para a API, em `back-end/`; o front fica em `front-end/`, no mesmo repositório.
- **Supabase**:
  - **Postgres** como banco; tabelas criadas por migrações versionadas (`supabase/migrations`).
  - **Auth** para o login do usuário único; a API valida o token (JWT) que o Supabase emite.
  - **Storage** para guardar os XMLs importados e o certificado `.pfx` (bucket privado).
- **pytest** para as funções de preço, arredondamento e venda restrita.
- **Aplicar a nota precisa de transação** (tudo ou nada). O cliente `supabase-py` fala com a API REST do Supabase, que faz uma requisição por vez; por isso as operações com várias tabelas devem ir por **conexão direta ao Postgres** (SQLAlchemy ou psycopg) ou por uma **função SQL chamada via RPC**. Escolher uma das duas no encontro 1 e usar sempre a mesma.
- **Não verificado (conferir na documentação antes de usar):** versões; comandos exatos da CLI do Supabase; validação do JWT do Supabase no FastAPI; leitura do `.pfx` com a biblioteca `cryptography`; cliente SOAP para a SEFAZ (`zeep` ou `requests` com certificado); agendador (APScheduler).

## Convenções

- Dinheiro em **centavos inteiros** (`int`) ou `Decimal`; nunca `float`.
- Nada é apagado: erro se corrige com estorno ou novo lançamento. Histórico imutável.
- Rotas com prefixo `/api`; modelos de entrada e saída com Pydantic.
- Chave `service_role` do Supabase **só no back** (arquivo `.env`, fora do git). O front nunca acessa o banco direto, só a API.
- No front, trocar os dados fixos por um serviço por área (`NotasService`, `ProdutosService`…) que chama a API.

---

## Resumo

| Encontro | Data | Entrega |
|---|---|---|
| 1 | 20/01 | Projeto FastAPI + Supabase + modelo de dados |
| 2 | 22/01 | Login (Supabase Auth), configurações de preço, categorias |
| 3 | 25/01 | Produtos (CRUD, filtros, travados, margens individuais) |
| 4 | 27/01 | Importar XML da NF-e e lista de notas |
| 5 | 29/01 | Motor de preço e vendas restritas (etapa 2) |
| 6 | 01/02 | Você decide + aplicar a nota (etapa 3) |
| 7 | 03/02 | Etiquetas, detalhe da nota, histórico, início |
| 8 | 05/02 | Venda rápida e estoque |
| 9 | 10/02 | Financeiro e fornecedores |
| 10 | 12/02 | SEFAZ em homologação (ciência e manifestação) |
| 11 | 15/02 | Fechamento: testes, dados de exemplo, apresentação |

17/02 e 19/02 ficam como **reserva** (atrasos e ensaio final).

---

## Encontro 1 — 20/01 · Base do back-end

- Projeto Supabase criado; `.env` com URL, chaves e string de conexão do Postgres.
- `back-end/` com FastAPI, ambiente virtual e `requirements.txt`; rota `GET /api/health`.
- CORS liberado para `http://localhost:4200` (`CORSMiddleware`).
- Diagrama do banco (DER) a partir da seção 6 do mapa de telas.
- Primeira migração: configuração, categoria, produto, fornecedor, vínculo, preço travado, margem individual.
- Decidir como fazer transações (conexão direta ou função SQL via RPC).
- **Spike de risco:** abrir o `.pfx` da loja em Python e conferir senha e validade. Se falhar, já se sabe no começo.

## Encontro 2 — 22/01 · Login e configurações

- Usuário único criado no Supabase Auth (cadastro público desligado).
- Front faz login no Supabase Auth e envia o token para a API; a API valida o token em uma dependência do FastAPI (`Depends`). Tela X1 real, com "Usuário ou senha incorretos".
- Front: interceptor que coloca o token no cabeçalho e guarda de rota.
- `GET/PUT /api/config/precos`: margem global e arredondamento (C2, aba 1).
- CRUD de categorias, com bloqueio "Categoria com produtos não pode ser excluída" (C3).
- `GET/PUT /api/config/loja` (C1).

## Encontro 3 — 25/01 · Produtos

- `GET /api/produtos` com busca, filtros (categoria, estoque, restrita, travado, margem individual), ordenação e paginação (P1).
- `GET /api/produtos/{id}` com abas Geral, Estoque, Preços e Fornecedores (P2).
- `POST/PUT /api/produtos` com validação Pydantic e código de barras único no banco ("Código de barras já usado por…") (P3).
- Estoque inicial gera movimentação "Saldo inicial".
- Preços travados e margens individuais: listar, adicionar, remover (C2, abas 2 e 3).

## Encontro 4 — 27/01 · Importar XML

- `POST /api/notas/importar` com vários arquivos (`UploadFile`); XML original guardado no Storage.
- Ler o XML com namespace `http://www.portalfiscal.inf.br/nfe` (`xml.etree.ElementTree` ou `lxml`): cabeçalho, `det/prod` e `cobr/dup`.
- Confirmar no layout oficial os campos de número, série, emitente e datas (estão como "não verificado").
- Erros: não é XML, não é NF-e, chave já importada → nota "Com erro" com detalhe técnico (N5, N6).
- Cria ou reaproveita o fornecedor pelo CNPJ; grava nota, itens e parcelas.
- `GET /api/notas` com filtro por estado, período, busca e paginação (Notificações).
- Montar os ~10 XMLs de exemplo da seção 7 do mapa de telas.

## Encontro 5 — 29/01 · Motor de preço (etapa 2)

- Funções puras com testes pytest (casos da seção 7 do mapa de telas):
  - arredondamento (19,32 → 19,50 · 19,50 → 19,90 · 19,90 → 19,99 · 104,00 → 104,00);
  - "terminar em" (104,37 → 104,99 / 104,90 / 104,50 / 104,00);
  - decisão do preço (travado > margem individual > margem da nota > global; Novo, ↑, ↓, Sem mudança).
- Casamento do item: vínculo fornecedor + `cProd`, depois `cEAN` (ignorando vazio e "SEM GTIN").
- Regras de venda restrita (NCM, categoria, CSV, palavras, fornecedor) e marca manual que vence; CRUD das regras (C8).
- `GET /api/notas/{id}/analise` devolvendo os itens já classificados e os ocultos com motivo (etapa 2, N11).
- Ações do menu ⋯: preço manual, terminar em, restaurar, margem individual, travar (N8).

## Encontro 6 — 01/02 · Você decide e aplicar (etapa 3)

- Rascunho por nota: salvar e recuperar escolhas ("Salvar rascunho e sair").
- Cadastro rápido e vínculo a produto existente, com fator de conversão (N2).
- Confirmação de redução de preço registrada no rascunho.
- `POST /api/notas/{id}/aplicar` em **uma transação**: cadastra, atualiza preços, entrada de estoque (automática / por item / manual), parcelas em contas a pagar, histórico com antes e depois.
- `POST /api/notas/{id}/rejeitar` (N7).
- Teste de falha no meio: nada pode ficar gravado ("Nada foi aplicado").

## Encontro 7 — 03/02 · Etiquetas, detalhe, histórico, início

- Etiquetas: lista de preços alterados, marcar como atualizada, concluir → estado "Concluída" (N3).
- Detalhe da nota com abas e linha do tempo; `GET /api/notas/{id}/xml` baixa o XML do Storage (N4).
- `GET /api/historico` com filtros, agrupado por dia, com antes/depois (H1).
- `GET /api/inicio`: cartões, última nota, atenção ao estoque, atividade recente (Início, X2 primeiro acesso).
- Sino: avisos calculados no banco (notas novas desde o último acesso, estoque baixo, conta vencendo) (X4).

## Encontro 8 — 05/02 · Venda rápida e estoque

- `GET /api/produtos/codigo/{ean}` para o leitor; "Código não cadastrado" quando não achar (P7).
- `POST /api/vendas` (transação): baixa estoque, lança receita no financeiro, grava histórico. Respeitar "Permitir saldo negativo" e "Pedir forma de pagamento" (C4).
- Estorno de venda (movimentação "Estorno", sem apagar nada).
- Movimentações com filtros (P4), ajuste por contagem (P5), saída manual (P6).
- `GET/PUT /api/config/estoque` (C4).

## Encontro 9 — 10/02 · Financeiro e fornecedores

- Contas a pagar: cartões, filtros, "Nova conta" (F1).
- Registrar pagamento e reabrir; pagamento vira lançamento de despesa (F2).
- Lançamentos manuais; os automáticos ficam travados com link para a origem (F4).
- Fluxo de caixa: totais por período e por dia, realizado e previsto (pode ser uma view no Postgres) (F3).
- Fornecedores: lista e detalhe com produtos vinculados, notas e contas (S1, S2).

## Encontro 10 — 12/02 · SEFAZ (homologação)

- Envio do certificado para o Storage privado e configuração da conexão (C5); selo de conexão no topo (X5).
- Distribuição DF-e por NSU em homologação (`hom1.nfe.fazenda.gov.br`), com o certificado no TLS: guardar `ultNSU`, parar quando `ultNSU` = `maxNSU`.
- Agendador de no máximo 1 em 1 hora e bloqueio de 1 hora depois de cStat 137 (evita o 656). Botão "Buscar notas agora" com contagem.
- Evento 210210 (ciência) e manifestação final 210200 / 210220 / 210240 com justificativa (N1, N10).
- **Risco:** os eventos precisam de XML assinado com o certificado (biblioteca não escolhida, não verificado). Se a homologação travar, apresentar o fluxo com o import manual e registrar a SEFAZ como limitação.

## Encontro 11 — 15/02 · Fechamento

- Rodar o fluxo completo com os 10 XMLs de exemplo.
- Testes de integração das rotas principais com o `TestClient` do FastAPI (importar → analisar → aplicar → vender → pagar).
- Seed de demonstração para a banca (`supabase/seed.sql` ou script).
- README com como configurar o Supabase e subir back e front.
- Preferências de notificação (C6) se sobrar tempo.
- Ensaio da apresentação.

---

## Pendências que afetam o back

- **D14:** item restrito entra no estoque ou é ignorado? Define o que o "aplicar" faz com ele.
- **D15:** forma de pagamento obrigatória na venda? Desconto?
- **D16:** manifestação final obrigatória para a loja e prazo exato (falar com o contador).
