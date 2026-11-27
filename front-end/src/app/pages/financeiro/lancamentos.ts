import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** F4 — Lançamentos manuais. Automáticos aparecem bloqueados, com link para a origem. */
@Component({
  selector: 'app-lancamentos',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Financeiro</h1><p>Contas a pagar, fluxo de caixa e lançamentos da loja.</p></div></div>
  <div class="tabs"><a routerLink="/financeiro/contas">Contas a pagar</a><a routerLink="/financeiro/fluxo">Fluxo de caixa</a><a class="on">Lançamentos</a></div>
  <div class="split">
    <div class="card">
      <div class="row">
        <div class="input white search"><app-icon name="search" class="mut" /><input placeholder="Buscar lançamento" /></div>
        <span class="btn">Tipo: todos<app-icon name="chevron-down" [size]="16" /></span>
      </div>
      <table class="table">
        <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Forma</th><th class="r">Valor</th><th></th></tr></thead>
        <tbody>
          <tr><td>23/11</td><td>Embalagens e sacolas</td><td>Outros</td><td>Dinheiro</td><td class="r red">− R$ 86,00</td><td><span class="small acc">Estornar</span></td></tr>
          <tr><td>20/11</td><td>Salário — ajudante</td><td>Salários</td><td>Transferência</td><td class="r red">− R$ 1.650,00</td><td><span class="small acc">Estornar</span></td></tr>
          <tr><td>15/11</td><td>Venda no fiado recebida — Sr. Antônio</td><td>Vendas</td><td>Pix</td><td class="r acc">+ R$ 210,00</td><td><span class="small acc">Estornar</span></td></tr>
          <tr class="muted"><td>24/11</td><td><app-icon name="lock" [size]="13" /> Venda rápida 16:42</td><td>Vendas</td><td>Pix</td><td class="r">+ R$ 345,00</td><td><a class="small acc" routerLink="/venda">Ver venda</a></td></tr>
          <tr class="muted"><td>22/11</td><td><app-icon name="lock" [size]="13" /> Pagamento NF 000.110</td><td>Fornecedores</td><td>Pix</td><td class="r">− R$ 980,00</td><td><a class="small acc" routerLink="/financeiro/contas">Ver conta</a></td></tr>
        </tbody>
      </table>
      <p class="small mut">Nada é editado ou apagado depois de gravado: erros se corrigem com estorno ou novo lançamento.</p>
    </div>
    <div class="card p24">
      <h2>Novo lançamento</h2>
      <div class="chips"><span class="chip">Receita</span><span class="chip on">Despesa</span></div>
      <div class="field"><label>Descrição</label><div class="input"><input value="Conta de água" /></div></div>
      <div class="grid-2">
        <div class="field"><label>Data</label><div class="input"><input value="25/11/2026" /></div></div>
        <div class="field"><label>Valor</label><div class="input"><span class="suf">R$</span><input value="94,30" /></div></div>
      </div>
      <div class="field"><label>Categoria financeira</label><div class="input"><input value="Energia e água" /><app-icon name="chevron-down" [size]="16" /></div><span class="hint">Editável: Vendas, Fornecedores, Energia, Salários, Outros…</span></div>
      <div class="field"><label>Forma de pagamento</label><div class="input"><input value="Boleto" /><app-icon name="chevron-down" [size]="16" /></div></div>
      <span class="btn primary block">Salvar lançamento</span>
    </div>
  </div>
</div>`,
})
export class Lancamentos {}
