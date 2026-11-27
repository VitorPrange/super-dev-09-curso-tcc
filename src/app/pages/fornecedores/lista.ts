import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** S1 — Fornecedores (criados automaticamente na primeira nota de cada emitente). */
@Component({
  selector: 'app-fornecedores',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Fornecedores</h1><p>Criados automaticamente na primeira nota de cada emitente. O apelido é editável.</p></div></div>
  <div class="tabs">
    <a routerLink="/produtos">Catálogo</a><a routerLink="/estoque/movimentacoes">Movimentações</a><a routerLink="/estoque/ajuste">Ajuste de estoque</a><a routerLink="/estoque/saida">Saída manual</a><a class="on">Fornecedores</a>
  </div>
  <div class="card">
    <div class="input white"><app-icon name="search" class="mut" /><input placeholder="Buscar por nome, apelido ou CNPJ" /></div>
    <table class="table">
      <thead><tr><th>Fornecedor</th><th>CNPJ</th><th class="r">Produtos vinculados</th><th>Última nota</th><th class="r">Contas em aberto</th></tr></thead>
      <tbody>
        @for (f of lista; track f[0]) {
          <tr><td><a routerLink="/fornecedores/agrovale"><div class="strong">{{ f[0] }}</div><div class="small mut">{{ f[1] }}</div></a></td><td class="mono small">{{ f[2] }}</td><td class="r">{{ f[3] }}</td><td>{{ f[4] }}</td><td class="r">{{ f[5] }}</td></tr>
        }
      </tbody>
    </table>
  </div>
</div>`,
})
export class Fornecedores {
  readonly lista = [
    ['AgroVale', 'AgroVale Distribuidora de Insumos Ltda.', '12.345.678/0001-90', '42', 'NF-e 000.123 · 24/11', 'R$ 3.720,00'],
    ['Rural Sul', 'Rural Sul Insumos Agrícolas S.A.', '23.456.789/0001-01', '18', 'NF-e 000.125 · 24/11', '—'],
    ['Pet Center', 'Pet Center Atacado Eireli', '34.567.890/0001-12', '35', 'NF-e 004.540 · 18/11', 'R$ 430,00'],
    ['Casa do Campo', 'Casa do Campo Comércio Ltda.', '45.678.901/0001-23', '12', 'NF-e 000.115 · 20/11', 'R$ 320,00'],
    ['Sementes Vale Verde', 'Sementes Vale Verde Ltda.', '56.789.012/0001-34', '9', 'NF-e 000.112 · 18/11', '—'],
  ];
}
