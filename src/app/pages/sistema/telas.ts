import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

interface Tela { cod: string; nome: string; rota: string }
interface Grupo { titulo: string; telas: Tela[] }

/** Mapa de telas: atalho para todas as telas e variações (útil na apresentação de sexta). */
@Component({
  selector: 'app-telas',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head">
    <div class="grow"><h1>Mapa de telas</h1><p>Todas as telas e variações do TCC 1. Tudo é estático: os botões só navegam.</p></div>
    <span class="badge">{{ total }} telas e estados</span>
  </div>
  <div class="grid-2">
    @for (g of grupos; track g.titulo) {
      <div class="card">
        <h2>{{ g.titulo }}</h2>
        @for (t of g.telas; track t.rota) {
          <a class="row sb link" [routerLink]="t.rota">
            <span class="row g8"><span class="badge neu sm cod">{{ t.cod }}</span>{{ t.nome }}</span>
            <span class="row g6 small mut">{{ t.rota }}<app-icon name="chevron-right" [size]="14" /></span>
          </a>
        }
      </div>
    }
  </div>
</div>`,
  styles: `.link { padding: 8px 10px; border-radius: 8px; margin: 0 -10px; } .link:hover { background: var(--inp); } .cod { min-width: 44px; justify-content: center; }`,
})
export class Telas {
  readonly grupos: Grupo[] = [
    { titulo: 'Sistema', telas: [
      { cod: 'X1', nome: 'Login', rota: '/login' },
      { cod: 'X1', nome: 'Login — erro', rota: '/login/erro' },
      { cod: 'X2', nome: 'Primeiro acesso', rota: '/inicio/primeiro-acesso' },
      { cod: 'X3', nome: 'Página não encontrada', rota: '/pagina-que-nao-existe' },
      { cod: 'X4', nome: 'Sino aberto (avisos)', rota: '/inicio/avisos' },
      { cod: 'X5', nome: 'Variações do selo de conexão', rota: '/configuracoes/sefaz' },
    ] },
    { titulo: 'Início', telas: [
      { cod: '—', nome: 'Início', rota: '/inicio' },
      { cod: 'I-3', nome: 'Início — tudo em dia', rota: '/inicio/em-dia' },
    ] },
    { titulo: 'Notas fiscais', telas: [
      { cod: '—', nome: 'Lista de notas', rota: '/notas' },
      { cod: 'N1', nome: 'Dar ciência (modal)', rota: '/notas/ciencia' },
      { cod: 'N1', nome: 'Baixando itens', rota: '/notas/baixando' },
      { cod: '—', nome: 'Lista vazia', rota: '/notas/vazio' },
      { cod: 'N5', nome: 'Importar XML', rota: '/notas/importar' },
      { cod: 'N6', nome: 'Nota com erro', rota: '/notas/erro/detalhe' },
      { cod: 'E2', nome: 'Entenda os itens', rota: '/notas/000123/itens' },
      { cod: 'E2', nome: 'Entenda os itens — carregando', rota: '/notas/000123/itens/carregando' },
      { cod: 'N8', nome: 'Menu ⋯ do item', rota: '/notas/000123/itens/menu' },
      { cod: 'N8', nome: 'Margem individual', rota: '/notas/000123/itens/margem' },
      { cod: 'N8', nome: 'Travar preço', rota: '/notas/000123/itens/travar' },
      { cod: 'N8', nome: 'Editar preço + redução', rota: '/notas/000123/itens/preco' },
      { cod: 'N11', nome: 'Itens ocultos', rota: '/notas/000123/itens/ocultos' },
      { cod: 'E3', nome: 'Você decide', rota: '/notas/000123/decisao' },
      { cod: 'N2', nome: 'Cadastro rápido', rota: '/notas/000123/decisao/cadastrar' },
      { cod: 'N2', nome: 'Vincular a existente', rota: '/notas/000123/decisao/vincular' },
      { cod: 'N7', nome: 'Rejeitar todas', rota: '/notas/000123/decisao/rejeitar' },
      { cod: 'N7', nome: 'Sair com escolhas não salvas', rota: '/notas/000123/decisao/sair' },
      { cod: 'Dec-10', nome: 'Falha ao aplicar', rota: '/notas/000123/decisao/falha' },
      { cod: 'N3', nome: 'Etiquetas (após aplicar)', rota: '/notas/000123/etiquetas' },
      { cod: 'N3', nome: 'Etiquetas pendentes', rota: '/notas/000118/etiquetas/pendentes' },
      { cod: 'N3', nome: 'Etiquetas — nenhum preço mudou', rota: '/notas/000123/etiquetas/vazio' },
      { cod: 'N4', nome: 'Detalhe da nota', rota: '/notas/000115' },
      { cod: 'N10', nome: 'Manifestações pendentes', rota: '/notas/manifestacoes' },
      { cod: 'N10', nome: 'Manifestação final', rota: '/notas/000109/manifestacao' },
      { cod: 'N10', nome: 'Confirmar manifestação', rota: '/notas/000109/manifestacao/confirmar' },
    ] },
    { titulo: 'Venda rápida, produtos e estoque', telas: [
      { cod: 'P7', nome: 'Venda rápida', rota: '/venda' },
      { cod: 'P7', nome: 'Confirmar saída', rota: '/venda/confirmar' },
      { cod: 'P7', nome: 'Saída registrada', rota: '/venda/registrada' },
      { cod: 'P7', nome: 'Código não encontrado', rota: '/venda/nao-encontrado' },
      { cod: 'P7', nome: 'Aguardando leitura', rota: '/venda/vazio' },
      { cod: 'P1', nome: 'Lista de produtos', rota: '/produtos' },
      { cod: 'P1', nome: 'Filtro baixo estoque', rota: '/produtos/baixo-estoque' },
      { cod: 'P1', nome: 'Catálogo vazio', rota: '/produtos/vazio' },
      { cod: 'P2', nome: 'Detalhe — Geral', rota: '/produtos/racao-bovina' },
      { cod: 'P2', nome: 'Detalhe — Estoque', rota: '/produtos/racao-bovina/estoque' },
      { cod: 'P2', nome: 'Detalhe — Preços', rota: '/produtos/racao-bovina/precos' },
      { cod: 'P2', nome: 'Detalhe — Fornecedores', rota: '/produtos/racao-bovina/fornecedores' },
      { cod: 'P3', nome: 'Novo produto', rota: '/produtos/novo' },
      { cod: 'P3', nome: 'Editar produto', rota: '/produtos/racao-bovina/editar' },
      { cod: 'P4', nome: 'Movimentações', rota: '/estoque/movimentacoes' },
      { cod: 'P5', nome: 'Ajuste de estoque', rota: '/estoque/ajuste' },
      { cod: 'P6', nome: 'Saída manual', rota: '/estoque/saida' },
    ] },
    { titulo: 'Financeiro, histórico e fornecedores', telas: [
      { cod: 'F1', nome: 'Contas a pagar', rota: '/financeiro/contas' },
      { cod: 'F2', nome: 'Registrar pagamento', rota: '/financeiro/contas/pagar' },
      { cod: 'F3', nome: 'Fluxo de caixa', rota: '/financeiro/fluxo' },
      { cod: 'F4', nome: 'Lançamentos', rota: '/financeiro/lancamentos' },
      { cod: 'H1', nome: 'Histórico', rota: '/historico' },
      { cod: 'H1', nome: 'Detalhe do registro', rota: '/historico/detalhe' },
      { cod: 'S1', nome: 'Fornecedores', rota: '/fornecedores' },
      { cod: 'S2', nome: 'Detalhe do fornecedor', rota: '/fornecedores/agrovale' },
    ] },
    { titulo: 'Configurações', telas: [
      { cod: 'C1', nome: 'Loja e conta', rota: '/configuracoes/loja' },
      { cod: 'C2', nome: 'Preços — margem e arredondamento', rota: '/configuracoes/precos' },
      { cod: 'C2', nome: 'Preços travados', rota: '/configuracoes/precos/travados' },
      { cod: 'C2', nome: 'Margens individuais', rota: '/configuracoes/precos/margens' },
      { cod: 'C3', nome: 'Categorias', rota: '/configuracoes/categorias' },
      { cod: 'C4', nome: 'Estoque e vendas', rota: '/configuracoes/estoque' },
      { cod: 'C5', nome: 'Conexão com a SEFAZ', rota: '/configuracoes/sefaz' },
      { cod: 'C6', nome: 'Notificações', rota: '/configuracoes/notificacoes' },
      { cod: 'C8', nome: 'Vendas restritas', rota: '/configuracoes/restritas' },
    ] },
  ];
  readonly total = this.grupos.reduce((s, g) => s + g.telas.length, 0);
}
