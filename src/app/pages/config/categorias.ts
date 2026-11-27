import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { ConfigNav } from './config-nav';

/** C3 — Categorias. Categoria com produtos não é excluída (mover antes). */
@Component({
  selector: 'app-cfg-categorias',
  imports: [Icon, ConfigNav],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Configurações</h1><p>Ajuste o PAM ao jeito da sua loja.</p></div></div>
  <div class="cfg">
    <app-config-nav />
    <div class="cfg-body">
      <div class="card p24">
        <div class="row sb"><h2>Categorias</h2><span class="btn sm primary"><app-icon name="plus" [size]="15" />Nova categoria</span></div>
        <div class="row"><div class="input focus grow"><input value="Jardinagem" /></div><span class="btn primary sm">Criar</span><span class="btn sm ghost">Cancelar</span></div>
        <table class="table">
          <thead><tr><th>Nome</th><th class="r">Produtos</th><th>Situação</th><th class="r"></th></tr></thead>
          <tbody>
            @for (c of cats; track c[0]) {
              <tr [class.muted]="c[2] === 'Desativada'"><td class="strong">{{ c[0] }}</td><td class="r">{{ c[1] }}</td>
                <td><span class="badge" [class.neu]="c[2] === 'Desativada'">{{ c[2] }}</span></td>
                <td class="r"><span class="small grn">Renomear</span> · <span class="small mut">{{ c[2] === 'Desativada' ? 'Reativar' : 'Desativar' }}</span></td></tr>
            }
          </tbody>
        </table>
        <div class="alert"><app-icon name="info" /><span>Uma categoria com produtos não pode ser excluída: mova os produtos antes ou apenas desative.</span></div>
      </div>
    </div>
  </div>
</div>`,
})
export class CfgCategorias {
  readonly cats = [['Alimento', '34', 'Ativa'], ['Sementes', '18', 'Ativa'], ['Suplemento', '12', 'Ativa'], ['Equipamento', '21', 'Ativa'], ['Fertilizantes', '9', 'Ativa'], ['Pet', '27', 'Ativa'], ['Medicamentos', '6', 'Ativa'], ['Ferramentas', '0', 'Desativada']];
}
