import { Route, Routes } from '@angular/router';
import { Shell } from './layout/shell';

/**
 * Rotas do PAM Agro (TCC 1 — telas estáticas).
 * Cada modal ou estado é uma rota própria que reaproveita a tela base:
 * o `estado` vai em `data` e chega no input() do componente
 * (withComponentInputBinding, em app.config.ts).
 */
type Loader = Route['loadComponent'];
const r = (path: string, loadComponent: Loader, crumb: string, estado?: string): Route => ({
  path,
  loadComponent,
  data: { crumb, estado },
});

const inicio: Loader = () => import('./pages/inicio/inicio').then((m) => m.Inicio);
const notas: Loader = () => import('./pages/notas/notas').then((m) => m.Notas);
const detalhe: Loader = () => import('./pages/notas/detalhe').then((m) => m.NotaDetalhe);
const itens: Loader = () => import('./pages/notas/itens').then((m) => m.NotaItens);
const decisao: Loader = () => import('./pages/notas/decisao').then((m) => m.NotaDecisao);
const etiquetas: Loader = () => import('./pages/notas/etiquetas').then((m) => m.Etiquetas);
const manif: Loader = () => import('./pages/notas/manifestacao').then((m) => m.Manifestacao);

const venda: Loader = () => import('./pages/produtos/venda').then((m) => m.Venda);
const produtos: Loader = () => import('./pages/produtos/lista').then((m) => m.Produtos);
const produto: Loader = () => import('./pages/produtos/detalhe').then((m) => m.ProdutoDetalhe);
const form: Loader = () => import('./pages/produtos/form').then((m) => m.ProdutoForm);

const contas: Loader = () => import('./pages/financeiro/contas').then((m) => m.Contas);
const historico: Loader = () => import('./pages/historico/historico').then((m) => m.Historico);

const precos: Loader = () => import('./pages/config/precos').then((m) => m.CfgPrecos);

const NF = 'Notas fiscais';
const IT = 'Notas fiscais / Entenda os itens da nota';
const DE = 'Notas fiscais / Você decide';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/sistema/login').then((m) => m.Login) },
  { path: 'login/erro', loadComponent: () => import('./pages/sistema/login').then((m) => m.Login), data: { estado: 'erro' } },
  {
    path: '',
    component: Shell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      r('telas', () => import('./pages/sistema/telas').then((m) => m.Telas), 'Mapa de telas'),

      // ---------- Início ----------
      r('inicio', inicio, 'Visão geral da loja'),
      r('inicio/avisos', inicio, 'Visão geral da loja', 'avisos'),
      r('inicio/em-dia', inicio, 'Visão geral da loja', 'em-dia'),
      r('inicio/primeiro-acesso', () => import('./pages/inicio/primeiro-acesso').then((m) => m.PrimeiroAcesso), 'Primeiro acesso'),

      // ---------- Notas fiscais ----------
      r('notas', notas, NF),
      r('notas/ciencia', notas, NF, 'ciencia'),
      r('notas/baixando', notas, NF, 'baixando'),
      r('notas/vazio', notas, NF, 'vazio'),
      r('notas/importar', () => import('./pages/notas/importar').then((m) => m.Importar), 'Notas fiscais / Importar XML'),
      r('notas/manifestacoes', manif, 'Notas fiscais / Manifestações pendentes', 'lista'),
      r('notas/erro/detalhe', detalhe, 'Notas fiscais / Nota com erro', 'erro'),
      r('notas/:id/itens', itens, IT),
      r('notas/:id/itens/menu', itens, IT, 'menu'),
      r('notas/:id/itens/margem', itens, IT, 'margem'),
      r('notas/:id/itens/travar', itens, IT, 'travar'),
      r('notas/:id/itens/preco', itens, IT, 'preco'),
      r('notas/:id/itens/ocultos', itens, IT, 'ocultos'),
      r('notas/:id/itens/carregando', itens, IT, 'carregando'),
      r('notas/:id/decisao', decisao, DE),
      r('notas/:id/decisao/cadastrar', decisao, DE, 'cadastrar'),
      r('notas/:id/decisao/vincular', decisao, DE, 'vincular'),
      r('notas/:id/decisao/rejeitar', decisao, DE, 'rejeitar'),
      r('notas/:id/decisao/sair', decisao, DE, 'sair'),
      r('notas/:id/decisao/falha', decisao, DE, 'falha'),
      r('notas/:id/etiquetas', etiquetas, 'Notas fiscais / Atualizar etiquetas', 'sucesso'),
      r('notas/:id/etiquetas/pendentes', etiquetas, 'Notas fiscais / Atualizar etiquetas'),
      r('notas/:id/etiquetas/vazio', etiquetas, 'Notas fiscais / Atualizar etiquetas', 'vazio'),
      r('notas/:id/manifestacao', manif, 'Notas fiscais / Manifestação final', 'nota'),
      r('notas/:id/manifestacao/confirmar', manif, 'Notas fiscais / Manifestação final', 'confirmar'),
      r('notas/:id', detalhe, 'Notas fiscais / Detalhe da nota'),

      // ---------- Venda rápida, produtos e estoque ----------
      r('venda', venda, 'Venda rápida'),
      r('venda/confirmar', venda, 'Venda rápida', 'confirmar'),
      r('venda/registrada', venda, 'Venda rápida', 'registrada'),
      r('venda/nao-encontrado', venda, 'Venda rápida', 'nao-encontrado'),
      r('venda/vazio', venda, 'Venda rápida', 'vazio'),
      r('produtos', produtos, 'Produtos'),
      r('produtos/baixo-estoque', produtos, 'Produtos', 'baixo-estoque'),
      r('produtos/vazio', produtos, 'Produtos', 'vazio'),
      r('produtos/novo', form, 'Produtos / Novo produto'),
      r('produtos/:id/editar', form, 'Produtos / Editar produto', 'editar'),
      r('produtos/:id/estoque', produto, 'Produtos / Detalhe do produto', 'estoque'),
      r('produtos/:id/precos', produto, 'Produtos / Detalhe do produto', 'precos'),
      r('produtos/:id/fornecedores', produto, 'Produtos / Detalhe do produto', 'fornecedores'),
      r('produtos/:id', produto, 'Produtos / Detalhe do produto'),
      { path: 'estoque', pathMatch: 'full', redirectTo: 'estoque/movimentacoes' },
      r('estoque/movimentacoes', () => import('./pages/estoque/movimentacoes').then((m) => m.Movimentacoes), 'Produtos / Movimentações de estoque'),
      r('estoque/ajuste', () => import('./pages/estoque/ajuste').then((m) => m.Ajuste), 'Produtos / Ajuste de estoque'),
      r('estoque/saida', () => import('./pages/estoque/saida').then((m) => m.Saida), 'Produtos / Saída manual'),

      // ---------- Financeiro ----------
      { path: 'financeiro', pathMatch: 'full', redirectTo: 'financeiro/contas' },
      r('financeiro/contas', contas, 'Financeiro / Contas a pagar'),
      r('financeiro/contas/pagar', contas, 'Financeiro / Contas a pagar', 'pagar'),
      r('financeiro/fluxo', () => import('./pages/financeiro/fluxo').then((m) => m.Fluxo), 'Financeiro / Fluxo de caixa'),
      r('financeiro/lancamentos', () => import('./pages/financeiro/lancamentos').then((m) => m.Lancamentos), 'Financeiro / Lançamentos'),

      // ---------- Histórico e fornecedores ----------
      r('historico', historico, 'Histórico'),
      r('historico/detalhe', historico, 'Histórico', 'detalhe'),
      r('fornecedores', () => import('./pages/fornecedores/lista').then((m) => m.Fornecedores), 'Produtos / Fornecedores'),
      r('fornecedores/:id', () => import('./pages/fornecedores/detalhe').then((m) => m.FornecedorDetalhe), 'Produtos / Fornecedores / Detalhe'),

      // ---------- Configurações ----------
      { path: 'configuracoes', pathMatch: 'full', redirectTo: 'configuracoes/precos' },
      r('configuracoes/loja', () => import('./pages/config/loja').then((m) => m.CfgLoja), 'Configurações / Loja e conta'),
      r('configuracoes/precos', precos, 'Configurações / Preços'),
      r('configuracoes/precos/travados', precos, 'Configurações / Preços', 'travados'),
      r('configuracoes/precos/margens', precos, 'Configurações / Preços', 'margens'),
      r('configuracoes/categorias', () => import('./pages/config/categorias').then((m) => m.CfgCategorias), 'Configurações / Categorias'),
      r('configuracoes/estoque', () => import('./pages/config/estoque').then((m) => m.CfgEstoque), 'Configurações / Estoque e vendas'),
      r('configuracoes/restritas', () => import('./pages/config/restritas').then((m) => m.CfgRestritas), 'Configurações / Vendas restritas'),
      r('configuracoes/sefaz', () => import('./pages/config/sefaz').then((m) => m.CfgSefaz), 'Configurações / Conexão com a SEFAZ'),
      r('configuracoes/notificacoes', () => import('./pages/config/notificacoes').then((m) => m.CfgNotificacoes), 'Configurações / Notificações'),

      r('**', () => import('./pages/sistema/nao-encontrada').then((m) => m.NaoEncontrada), 'Página não encontrada'),
    ],
  },
];
