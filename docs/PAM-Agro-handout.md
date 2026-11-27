# PAM Agro — Handout para continuar em outro chat

> Cole este arquivo no início do novo chat. Se puder, anexe também **PAM-Agro-mapa-de-telas.md** (v3, especificação completa de cada tela) e **PAM-Agro-sprints-detalhado.md** (o que vai em cada tela por sprint). Este handout resume os dois e traz as decisões tomadas.

---

## 1. Quem sou e como quero trabalhar

- **Vitor Hugo Prange**, estudante de programação (Gaspar, SC). Conheço Python, Java, TypeScript/Angular e SQL.
- **Toda API, função ou comando** deve ser conferido na documentação oficial, não de memória. Explique como e por que é usado. Nada de chute e nada ambíguo; o que não foi verificado deve ser dito como "não verificado".
- Aprendo melhor com **exemplos resolvidos**.
- **Respostas diretas e sem "encher linguiça".** Quando eu pedir um plano, posso querer duas versões: uma enxuta e uma detalhada.
- **"Só front" significa SÓ front:** telas estáticas em Angular, sem nada funcional.

---

## 2. O projeto

- **Nome:** PAM Agro — slogan "Seu estoque, mais simples."
- **O que é:** sistema interno, desktop, de controle de estoque e fluxo de caixa. O foco é a **análise automática de NF-e recebidas por XML**, da forma mais amigável possível.
- **Para quem:** minha mãe (usuária única), dona de uma loja de produtos agropecuários e pet. Hoje ela cadastra itens e ajusta preços à mão, a caneta em cima do valor impresso na nota.
- **Público não alvo:** clientes (o sistema é interno).
- **TCC dividido em dois:**
  - **TCC 1 = front-end**, em **Angular (obrigatório)**, só telas estáticas, sem funcionalidade.
  - **TCC 2 = back-end.**
- **Apresentação de progresso toda sexta-feira. Prazo do front: 18/12/2026.**
- A loja já tem **certificado digital** (arquivo, provavelmente .pfx).
- Figma com 4 telas prontas: Início, Notificações, Entenda os itens da nota, Você decide o que vai mudar. O arquivo fica na conta do Prange e não é acessível pelo conector; as telas foram passadas em PDF ou print.

### Brief que eu escrevi (base da ficha/apresentação)
- **Funcionalidades:** análise automática das notas por XML; identificação de produtos novos e de alterações de preço; cadastro automático de itens novos com aprovação; alteração automática de todos ou alguns preços, com aprovação e escolha; histórico das modificações com monitoramento e reversão de erros; paginação e filtros.
- **Fluxo principal:** nova nota detectada na SEFAZ → o usuário é notificado ao abrir o sistema → revisa a nota e as alterações propostas → aprova ou modifica → salva → o banco é alterado → o histórico é atualizado.

---

## 3. Regras de negócio decididas

1. **Preço sugerido** = valor unitário da nota (`vUnCom`) ÷ fator de conversão (padrão 1) × (1 + margem%).
   - **Nada mais entra no custo:** frete, desconto, seguro, ST e IPI ficam de fora. Isso é limitação assumida.
   - O nome técnico é *markup*; na tela, mostrar sempre a fórmula ("Preço = custo × 1,30").
2. **Quando o preço muda:**
   - Igual ao atual → nada acontece.
   - Diferente → sugere alteração.
   - **Menor que o atual → pede confirmação extra** antes de alterar.
3. **Precedência da margem:** preço travado (sem sugestão) > margem individual do produto > margem alterada só para aquela nota > margem global.
4. **Preços travados:** lista em Configurações. Na revisão da nota, o item não recebe sugestão; só pode ser editado à mão.
5. **Margens individuais:** lista em Configurações. O produto usa o Y% próprio no lugar do X% global. Adicionar pelo menu ⋯ do item ("Adicionar margem individual").
6. **Arredondamento (checkbox em Configurações, opcional):**

   | Centavos | Vira |
   |---|---|
   | ,00 | permanece |
   | ,01 a ,49 | ,50 |
   | ,50 a ,89 | ,90 |
   | ,90 a ,99 | ,99 |

   Em centavos inteiros: `c = p % 100; base = p − c; c == 0 → p; c < 50 → base+50; c < 90 → base+90; senão base+99`.
   Exemplos: 19,00→19,00 · 19,32→19,50 · 19,50→19,90 · 19,90→19,99 · 104,00→104,00.
   - Vale só para o preço sugerido automático; não mexe no preço digitado à mão.
7. **Menu ⋯ de cada item** (aparece ao passar o mouse na linha de "Itens extraídos"):
   - Editar preço manualmente.
   - **Terminar em ,99 / ,90 / ,50 / ,00:** mantém a parte inteira do preço calculado e troca só os centavos (104,37 → 104,99 / 104,90 / 104,50 / 104,00).
   - Restaurar sugestão.
   - Adicionar margem individual.
   - Travar ou destravar preço.
   - Vincular a outro produto.
   - Ver produto.
8. **Item "Novo":** o item da nota é comparado com o banco, primeiro pelo vínculo fornecedor + código do fornecedor (`cProd`) e depois pelo código de barras (`cEAN`, se não for vazio nem "SEM GTIN"). Se não for encontrado, é marcado como Novo e o sistema sugere cadastrar. Opção extra: vincular a produto existente.
9. **Nada é aplicado sem confirmação.** Aplicar é tudo ou nada. Tudo vai para o histórico (com antes e depois), que é imutável.
10. **Estoque:**
    - **Entrada pela nota:** opção em Configurações com 3 modos (Automática · Por item, o recomendado · Manual).
    - **Saída:** pela **Venda rápida com leitor de código de barras**. Os produtos lidos são destacados e os valores somados; depois da confirmação o estoque baixa automaticamente e entra no financeiro. Há também saída manual (perda, uso interno) e ajuste por contagem.
11. **Financeiro:** entradas e saídas vêm do estoque (vendas confirmadas, contas pagas), mais lançamento manual. As contas a pagar saem das parcelas da nota (`cobr/dup`).
12. **Venda restrita:** identificação **automática** por regras com liga/desliga:
    - NCM, categoria, lista importada (CSV), palavras na descrição e fornecedor.
    - Palavras e fornecedor ficam desligadas por padrão.
    - A **marca manual sempre vence**.
    - Os itens restritos somem da revisão; a tela "Itens ocultos" mostra o motivo e permite corrigir.
13. **Ciência da nota:** opção em Configurações, manual (recomendada) ou automática, com as implicações explicadas na tela.
14. Somente **desktop**, **1 usuário**.

### Ainda em aberto
- **D14:** o que fazer com o item restrito da nota (ignorar por completo, ou só tirar das sugestões de preço e deixar entrar no estoque).
- **D15:** forma de pagamento obrigatória na venda rápida? Haverá desconto?
- **D16:** manifestação final (se a loja é obrigada, prazo exato, quem registra). Depende do contador.
- O caso ,50 → ,90 no arredondamento foi mantido pela regra "50 ou acima"; confirmar se é isso mesmo.

---

## 4. Fatos técnicos verificados (com fonte)

**NF-e e SEFAZ**
- **Distribuição DF-e** (Nota Técnica 2014.002):
  - Serviço `NFeDistribuicaoDFe`; exige certificado digital PJ ou PF.
  - Funciona por **NSU** (número sequencial): sempre consultar a partir do `ultNSU`; quando `ultNSU` = `maxNSU`, não há mais nada.
  - Documentos ficam disponíveis por **até 90 dias**.
  - cStat 137 = nenhum documento; 138 = documento localizado; **656 = consumo indevido**. Consultar de novo em menos de 1 h depois de um 137 bloqueia por 1 h.
  - Consulta por chave: limite de 20 por hora.
- **Homologação** (ambiente de testes, sem validade jurídica): `https://hom1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx`. A URL antiga `hom.` foi desligada em 23/05/2022.
- **Primeiro chega só o resumo** da nota. O XML completo só é liberado depois da **Ciência da Operação**.
- **Eventos de manifestação:** 210200 Confirmação · 210210 Ciência · 210220 Desconhecimento · 210240 Operação não realizada (exige justificativa). A **ciência não é manifestação final**: depois dela é obrigatório registrar uma manifestação final dentro de um prazo.
- **Itens no XML:** `det/prod` → `cProd`, `cEAN`, `xProd`, `NCM`, `CFOP`, `uCom`, `qCom`, `vUnCom`, `vProd`, `uTrib`, `qTrib`, `vUnTrib`, `vFrete`, `vSeg`, `vDesc`. Namespace `http://www.portalfiscal.inf.br/nfe`. `cEAN` pode vir vazio ou "SEM GTIN".
- **Parcelas:** `cobr/fat` (`nFat`, `vOrig`, `vDesc`, `vLiq`) e `cobr/dup` (`nDup`, `dVenc`, `vDup`). O grupo é **opcional**; segundo fórum, só é preenchido quando a forma de pagamento é duplicata mercantil (tPag 14).
- **IPI:** alíquota zerada a partir de 01/01/2027, exceto Zona Franca de Manaus (EC 132/2023, LC 214/2025).
- **ST:** o ICMS é recolhido antecipadamente pelo fabricante ("substituto") e vem somado na nota. A loja é a "substituída".

**Front (navegador)**
- `DOMParser().parseFromString(xml, "application/xml")`: XML malformado **não lança exceção**; o documento volta com um elemento `<parsererror>`, que deve ser verificado. Para tags com namespace, usar `getElementsByTagNameNS` (MDN).

**Angular (angular.dev)**
- `ng new pam-agro --routing`: o routing **não** vem ativado por padrão; `standalone` é `true` por padrão.
- `ng generate component <nome>` (alias `ng g c`): gera um componente standalone por padrão (`.ts`, `.html`, `.css` e arquivo de teste). `--skip-tests` não gera o teste.

**Leitor de código de barras**
- Em modo teclado (HID), o leitor digita o código no campo em foco e pode terminar com Enter. Fonte: guias de revendedores, não o manual do modelo.

---

## 5. Ainda NÃO verificado

1. Prazo da manifestação final: as fontes divergem (90 ou 180 dias; contado da autorização ou da ciência).
2. Quais empresas são obrigadas a se manifestar.
3. Quanto tempo leva entre dar ciência e o XML completo ficar disponível.
4. Campos exatos de número, série, emitente, destinatário e datas no XML.
5. Se `cEAN` corresponde à unidade comercial (`uCom`).
6. O grupo `pag` (forma de pagamento) da NF-e.
7. O conteúdo exato do resumo da nota.
8. Se testar em homologação exige emitir notas com outro CNPJ (relato de fórum).
9. Método de impressão de etiquetas no navegador.
10. Regra legal de venda restrita.
11. Como IBS e CBS aparecem no XML.

---

## 6. Telas (códigos do mapa de telas)

| Grupo | Telas |
|---|---|
| Base | Layout (barra lateral, topo, selo de conexão X5, sino X4), Login X1, Primeiro acesso X2, Página não encontrada X3 |
| Notas | Início, Notificações, Importar XML N5, Aguardando ciência N1, Nota com erro N6, Entenda os itens (etapa 2), Menu ⋯ N8, Itens ocultos N11, Você decide (etapa 3), Cadastro rápido/vínculo N2, Modais N7, Etiquetas (etapa 4) N3, Detalhe da nota N4, Manifestação final N10 |
| Produtos e estoque | Lista P1, Detalhe P2, Novo/editar P3, Movimentações P4, Ajuste P5, Saída manual P6, **Venda rápida (leitor) P7** |
| Financeiro | Contas a pagar F1, Registrar pagamento F2, Fluxo de caixa F3, Lançamentos F4 |
| Outros | Histórico H1, Fornecedores S1/S2 |
| Configurações | Loja C1, **Preços C2** (margem + arredondamento · preços travados · margens individuais), Categorias C3, Estoque e vendas C4, SEFAZ C5, Notificações C6, **Vendas restritas C8** |

**Estados da nota:** Aguardando ciência · Baixando itens · Aguardando aprovação · Rascunho · Aplicada (etiquetas pendentes) · Concluída · Rejeitada · Com erro.

**Ajustes pedidos nas 4 telas do Figma:**
- Coluna Qtd. nos itens.
- Menu ⋯ e selos (cadeado, margem individual, ↑/↓).
- "Vincular a existente".
- Edição manual de preço e confirmação de redução.
- Blocos "Entrada no estoque" e "Contas a pagar" na etapa 3.
- Estados novos e botão "Importar XML" em Notificações.
- Botão "Buscar notas agora" desabilitado, com contagem regressiva.
- Rodapé "N ocultos — Ver itens ocultos".

---

## 7. Sprints do front (Angular, só telas estáticas)

Estático = dados fixos no HTML. Botões e links só navegam. Modais e estados são variações estáticas.

- **Sexta 13/11:** plano + 4 telas do Figma.
- **Sprint 0 (14–20/11, leve):** projeto Angular + layout base · Login · Início · Notificações.
- **Sprint 1 (21–27/11):** Importar XML · Aguardando ciência · Nota com erro · Entenda os itens · Menu ⋯ e janelas · Itens ocultos · Você decide · Cadastro rápido/vínculo.
- **Sprint 2 (28/11–04/12):** Modais · Etiquetas · Detalhe da nota · Manifestação final · Histórico · Lista de produtos · Detalhe do produto · Novo/editar produto.
- **Sprint 3 (05–11/12):** Venda rápida · Movimentações · Ajuste · Saída manual · Contas a pagar · Registrar pagamento · Fluxo de caixa · Lançamentos.
- **Sprint 4 (12–18/12):** Config. Preços (3 abas) · Categorias · Estoque e vendas · Vendas restritas · Loja e conta · Primeiro acesso. **Se sobrar tempo:** Fornecedores, SEFAZ, Preferências de notificação, Página não encontrada.

---

## 8. Outros entregáveis já feitos

- **Mapa de telas v3** (`PAM-Agro-mapa-de-telas.md`): cerca de 30 telas com objetivo, conteúdo, ações, estados e regras; modelo de dados para o front; decisões; itens não verificados.
- **Sprints:** resumido e detalhado (`PAM-Agro-sprints-resumido.md`, `PAM-Agro-sprints-detalhado.md`).
- **Ficha de projeto** (atividade de aula: nome, objetivo, escopo, prazos e marcos, orçamento, critérios de qualidade) feita como doc. O orçamento de desembolso estimado foi de R$ 484: leitor de código de barras ~R$ 300 (modelos USB de ~R$ 155 a R$ 640), domínio .com.br R$ 40/ano no Registro.br, impressão R$ 100, reserva de 10%.
