# PAM Agro — front-end (TCC 1)

Telas estáticas do PAM Agro em Angular 22. "Estático" = dados fixos no HTML; botões e links só navegam.
Modais e estados são rotas próprias que reaproveitam a mesma tela.

## Como rodar

```bash
npm install      # instala também as fontes Barlow, Barlow Condensed e Saira Stencil One (@fontsource)
npm start        # ng serve → http://localhost:4200
```

Abra **http://localhost:4200/telas** para ver o **Mapa de telas**: um link para cada tela e variação
(também há um atalho no rodapé da barra lateral). O login fica em `/login`.

Outros comandos: `npm run build` (gera `dist/`) e `npm test` (Vitest).

## Estrutura

```
src/
  styles.scss            tokens da direção "Saca & Nota" (cores, fontes, raios) e classes globais
  app/
    app.routes.ts        todas as rotas; cada estado/modal passa `data: { estado }`
    app.config.ts        provideRouter(..., withComponentInputBinding())
    layout/              shell (moldura), sidebar (7 itens), topbar (caminho, selo X5, sino)
    shared/              icon (ícones SVG), steps (barra das 4 etapas da nota)
    pages/
      sistema/           X1 login, X3 404, mapa de telas
      inicio/            Início (+ X4 sino, I-3 em dia), X2 primeiro acesso
      notas/             lista, N1, N5, N6/N4, etapa 2 (+N8, N11), etapa 3 (+N2, N7), N3, N10
      produtos/          P7 venda rápida, P1 lista, P2 detalhe, P3 formulário
      estoque/           P4 movimentações, P5 ajuste, P6 saída manual
      financeiro/        F1 contas (+F2), F3 fluxo de caixa, F4 lançamentos
      historico/         H1
      fornecedores/      S1, S2
      config/            C1, C2 (3 abas), C3, C4, C5 (+ variações X5), C6, C8
```

## Como as variações funcionam (sem lógica)

`withComponentInputBinding()` liga os dados de uma rota aos `input()` do componente.
Exemplo: a rota `notas/:id/itens/margem` tem `data: { estado: 'margem' }`, e o template da etapa 2 faz
`@switch (estado()) { @case ('margem') { ...janela... } }`. Fechar a janela é só um `routerLink` de volta.

Referência: https://angular.dev/api/router/withComponentInputBinding

## Pendências conhecidas

- Decisões em aberto mostradas nas telas: D14 (item restrito), D15 (pagamento/desconto na venda), D16 (manifestação).
- Prazo da manifestação final: 90 dias após a autorização usado como alerta (não verificado; as fontes divergem).
- Acessibilidade: falta uma auditoria AXE completa (muitos controles são `span` estáticos e os campos usam texto de rótulo sem `for`/`id`).
