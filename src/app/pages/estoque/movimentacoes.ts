import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** P4 — Movimentações de estoque. Movimentações nunca são editadas nem apagadas. */
@Component({
  selector: 'app-movimentacoes',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head">
    <div class="grow"><h1>Movimentações de estoque</h1><p>Toda entrada e saída, com a origem. Erros se corrigem com ajuste ou estorno.</p></div>
    <span class="btn"><app-icon name="download" />Exportar</span>
  </div>
  <div class="tabs">
    <a routerLink="/produtos">Catálogo</a><a class="on">Movimentações</a><a routerLink="/estoque/ajuste">Ajuste de estoque</a><a routerLink="/estoque/saida">Saída manual</a><a routerLink="/fornecedores">Fornecedores</a>
  </div>
  <div class="card">
    <div class="row">
      <span class="btn"><app-icon name="calendar" [size]="16" />01/11/2026 – 25/11/2026</span>
      <div class="input white search"><app-icon name="search" class="mut" /><input placeholder="Filtrar por produto" /></div>
      <span class="btn">Tipo: todos<app-icon name="chevron-down" [size]="16" /></span>
    </div>
    <table class="table">
      <thead><tr><th>Data</th><th>Produto</th><th>Tipo</th><th class="r">Qtd.</th><th class="r">Saldo após</th><th>Origem</th><th>Observação</th></tr></thead>
      <tbody>
        @for (m of movs; track $index) {
          <tr><td class="mut">{{ m[0] }}</td><td class="strong">{{ m[1] }}</td><td><span class="badge" [class]="'badge ' + m[7]">{{ m[2] }}</span></td>
          <td class="r strong" [class.grn]="m[3].startsWith('+')" [class.red]="m[3].startsWith('−')">{{ m[3] }}</td><td class="r">{{ m[4] }}</td><td class="grn">{{ m[5] }}</td><td class="mut">{{ m[6] }}</td></tr>
        }
      </tbody>
    </table>
    <div class="pager"><span>1–9 de 312 movimentações</span><div class="pages"><a class="on">1</a><a>2</a><a>3</a><a><app-icon name="chevron-right" [size]="16" /></a></div></div>
  </div>
</div>`,
})
export class Movimentacoes {
  readonly movs = [
    ['24/11 · 16:42', 'Ração bovina 25 kg', 'Saída por leitor (venda)', '−2', '3', 'Venda 16:42', '—', 'neu'],
    ['24/11 · 16:42', 'Semente de capim 1 kg', 'Saída por leitor (venda)', '−3', '2', 'Venda 16:42', '—', 'neu'],
    ['24/11 · 14:10', 'Ração gato adulto 10 kg', 'Estorno', '+1', '11', 'Venda 14:02', 'Cliente devolveu', 'blu'],
    ['23/11 · 18:05', 'Coleira antipulgas M', 'Ajuste', '−1', '0', 'João', 'Contagem', 'amb'],
    ['22/11 · 13:52', 'Ração bovina 25 kg', 'Entrada por nota', '+20', '6', 'NF-e 000.118', '—', ''],
    ['22/11 · 13:52', 'Farelo de soja 10 kg', 'Entrada por nota', '+12', '22', 'NF-e 000.118', '—', ''],
    ['20/11 · 18:00', 'Ração bovina 25 kg', 'Perda', '−1', '−', 'João', 'Saco rasgado', 'red'],
    ['19/11 · 09:30', 'Petisco bifinho 500 g', 'Saída manual', '−2', '6', 'João', 'Uso interno', 'neu'],
    ['03/02 · 10:00', 'Bebedouro plástico 5 litros', 'Saldo inicial', '+5', '5', 'Cadastro', '—', 'blu'],
  ];
}
