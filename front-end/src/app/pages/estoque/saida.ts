import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** P6 — Saída manual: perda, uso interno, devolução ao fornecedor (venda é pela P7). */
@Component({
  selector: 'app-saida',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head">
    <div class="grow"><h1>Saída manual</h1><p>Para saídas que não são venda: perda, uso interno, devolução ao fornecedor.</p></div>
    <a class="btn" routerLink="/venda"><app-icon name="scan" [size]="16" />Ir para a venda rápida</a>
  </div>
  <div class="tabs">
    <a routerLink="/produtos">Catálogo</a><a routerLink="/estoque/movimentacoes">Movimentações</a><a routerLink="/estoque/ajuste">Ajuste de estoque</a><a class="on">Saída manual</a><a routerLink="/fornecedores">Fornecedores</a>
  </div>
  <div class="card">
    <table class="table">
      <thead><tr><th>Produto</th><th>Quantidade</th><th>Tipo</th><th>Data</th><th>Observação</th><th class="menu-cell"></th></tr></thead>
      <tbody>
        <tr><td><div class="input" style="height:36px"><input value="Petisco bifinho 500 g" /></div></td><td><div class="input" style="width:90px;height:36px"><input value="2" /></div></td><td><div class="input" style="width:170px;height:36px"><input value="Uso interno" /><app-icon name="chevron-down" [size]="14" /></div></td><td><div class="input" style="width:130px;height:36px"><input value="25/11/2026" /></div></td><td><div class="input" style="height:36px"><input value="Amostra para cliente" /></div></td><td class="menu-cell"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
        <tr class="hl"><td><div class="input" style="height:36px"><input value="Coleira antipulgas M" /></div><div class="small red mt8">Saldo insuficiente: 0 em estoque</div></td><td><div class="input err" style="width:90px;height:36px"><input value="1" /></div></td><td><div class="input" style="width:170px;height:36px"><input value="Devolução ao fornecedor" /><app-icon name="chevron-down" [size]="14" /></div></td><td><div class="input" style="width:130px;height:36px"><input value="25/11/2026" /></div></td><td><div class="input" style="height:36px"><input placeholder="Opcional" /></div></td><td class="menu-cell"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
      </tbody>
    </table>
    <span class="btn sm" style="align-self:flex-start"><app-icon name="plus" [size]="15" />Adicionar linha</span>
    <div class="row sb">
      <span class="small mut">Saldo insuficiente bloqueia a linha, a menos que "Permitir saldo negativo" esteja ligado em Configurações → Estoque e vendas.</span>
      <a class="btn primary" routerLink="/estoque/movimentacoes">Registrar saída</a>
    </div>
  </div>
</div>`,
})
export class Saida {}
