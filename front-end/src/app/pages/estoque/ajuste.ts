import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** P5 — Ajuste de estoque (contagem). Também é a entrada de estoque no modo "Manual". */
@Component({
  selector: 'app-ajuste',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head">
    <div class="grow"><h1>Ajuste de estoque</h1><p>Conte os produtos na prateleira e registre a diferença.</p></div>
  </div>
  <div class="tabs">
    <a routerLink="/produtos">Catálogo</a><a routerLink="/estoque/movimentacoes">Movimentações</a><a class="on">Ajuste de estoque</a><a routerLink="/estoque/saida">Saída manual</a><a routerLink="/fornecedores">Fornecedores</a>
  </div>
  <div class="split">
    <div class="card">
      <div class="row">
        <div class="input white search"><app-icon name="search" class="mut" /><input placeholder="Adicionar produto pelo nome ou código" /></div>
        <span class="btn">Adicionar categoria inteira<app-icon name="chevron-down" [size]="16" /></span>
      </div>
      <table class="table">
        <thead><tr><th>Produto</th><th class="r">No sistema</th><th>Contagem</th><th class="r">Diferença</th><th>Motivo</th><th class="menu-cell"></th></tr></thead>
        <tbody>
          <tr><td class="strong">Ração bovina 25 kg</td><td class="r">3</td><td><div class="input" style="width:90px;height:36px"><input value="2" /></div></td><td class="r red strong">−1</td><td><div class="input" style="width:150px;height:36px"><input value="Avaria" /><app-icon name="chevron-down" [size]="14" /></div></td><td class="menu-cell"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
          <tr><td class="strong">Milho triturado 25 kg</td><td class="r">4</td><td><div class="input" style="width:90px;height:36px"><input value="4" /></div></td><td class="r mut">0</td><td class="mut">—</td><td class="menu-cell"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
          <tr><td class="strong">Farelo de soja 10 kg</td><td class="r">22</td><td><div class="input focus" style="width:90px;height:36px"><input value="24" /></div></td><td class="r acc strong">+2</td><td><div class="input" style="width:150px;height:36px"><input value="Contagem" /><app-icon name="chevron-down" [size]="14" /></div></td><td class="menu-cell"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
          <tr><td class="strong">Areia sanitária 4 kg</td><td class="r">10</td><td><div class="input" style="width:90px;height:36px"><input value="7" /></div></td><td class="r red strong">−3</td><td><div class="input" style="width:150px;height:36px"><input value="Vencimento" /><app-icon name="chevron-down" [size]="14" /></div></td><td class="menu-cell"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="card">
      <h2>Resumo</h2>
      <div class="kv"><span>Produtos contados</span><span>4</span></div>
      <div class="kv"><span>Com diferença</span><span>3</span></div>
      <div class="kv"><span>Entradas</span><span class="acc">+2</span></div>
      <div class="kv"><span>Saídas</span><span class="red">−4</span></div>
      <div class="divider"></div>
      <div class="inner row top"><span class="box on"><app-icon name="check" [size]="14" [stroke]="3" /></span><span class="small">Conferi a contagem e autorizo o ajuste.</span></div>
      <a class="btn primary block" routerLink="/estoque/movimentacoes">Confirmar ajuste</a>
      <p class="small mut">Gera movimentações do tipo "Ajuste" e registra no histórico. Sem diferenças, aparece "Nada a ajustar".</p>
    </div>
  </div>
</div>`,
})
export class Ajuste {}
