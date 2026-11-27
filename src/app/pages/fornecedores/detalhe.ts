import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** S2 — Detalhe do fornecedor. */
@Component({
  selector: 'app-fornecedor-detalhe',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head">
    <div class="grow"><h1>AgroVale</h1><p>AgroVale Distribuidora de Insumos Ltda. · CNPJ 12.345.678/0001-90</p></div>
    <a class="btn" routerLink="/fornecedores"><app-icon name="arrow-left" />Fornecedores</a>
    <span class="btn"><app-icon name="edit" [size]="16" />Editar apelido</span>
  </div>
  <div class="grid-3">
    <div class="card metric"><span class="small mut">Produtos vinculados</span><span class="num">42</span></div>
    <div class="card metric"><span class="small mut">Notas recebidas</span><span class="num">27</span><span class="small mut">desde fevereiro de 2026</span></div>
    <div class="card metric"><span class="small mut">Contas em aberto</span><span class="num">R$ 3.720,00</span><span class="small mut">próxima em 24/12</span></div>
  </div>
  <div class="card">
    <div class="tabs"><a class="on">Produtos vinculados</a><a>Notas</a><a>Contas</a></div>
    <table class="table">
      <thead><tr><th>Código no fornecedor</th><th>Produto no PAM</th><th class="r">Fator</th><th class="r">Último custo</th><th class="r"></th></tr></thead>
      <tbody>
        <tr><td class="mono">RB-25</td><td><a class="strong" routerLink="/produtos/racao-bovina">Ração bovina 25 kg</a></td><td class="r">1</td><td class="r">R$ 80,00</td><td class="r"><span class="small grn">Editar fator</span> · <span class="small red">Remover vínculo</span></td></tr>
        <tr><td class="mono">SC-01</td><td><a class="strong" routerLink="/produtos/racao-bovina">Semente de capim 1 kg</a></td><td class="r">1</td><td class="r">R$ 20,00</td><td class="r"><span class="small grn">Editar fator</span> · <span class="small red">Remover vínculo</span></td></tr>
        <tr><td class="mono">BB-05</td><td><a class="strong" routerLink="/produtos/racao-bovina">Bebedouro plástico 5 litros</a></td><td class="r">1</td><td class="r">R$ 50,00</td><td class="r"><span class="small grn">Editar fator</span> · <span class="small red">Remover vínculo</span></td></tr>
        <tr><td class="mono">MT-CX12</td><td><a class="strong" routerLink="/produtos/racao-bovina">Milho de pipoca 500 g</a></td><td class="r">12</td><td class="r">R$ 3,10</td><td class="r"><span class="small grn">Editar fator</span> · <span class="small red">Remover vínculo</span></td></tr>
      </tbody>
    </table>
    <p class="small mut">Fator 12: a nota vem em caixa com 12 e você vende por unidade. Mesclar fornecedores duplicados: futuro (P3).</p>
  </div>
</div>`,
})
export class FornecedorDetalhe {}
