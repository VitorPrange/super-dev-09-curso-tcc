import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { Steps } from '../../shared/steps';

/** N3 — Etapa 4 · Atualizar etiquetas. `estado`: undefined | 'sucesso' (Dec-9, logo após aplicar) | 'vazio'. */
@Component({
  selector: 'app-etiquetas',
  imports: [RouterLink, Icon, Steps],
  template: `
<div class="page">
  <div class="page-head">
    <div class="grow"><h1>Atualize as etiquetas na loja</h1><p>Troque os preços nas prateleiras para combinar com o sistema.</p></div>
    <span class="btn"><app-icon name="printer" />Imprimir etiquetas</span>
  </div>
  <app-steps [atual]="4" />

  @if (estado() === 'sucesso') {
    <div class="alert ok"><app-icon name="check-circle" /><span><span class="strong">7 alterações aplicadas.</span> Catálogo, estoque e contas atualizados. Tudo foi registrado no histórico.</span></div>
  }

  @if (estado() === 'vazio') {
    <div class="card p24"><div class="empty"><span class="ico"><app-icon name="tag" [size]="32" /></span><h3 style="color:var(--ink)">Nenhum preço mudou nesta nota.</h3><p>Não há etiquetas para trocar.</p><a class="btn primary" routerLink="/notas">Concluir</a></div></div>
  } @else {
  <div class="card">
    <div class="row sb"><h2>NF-e 000.123 • AgroVale Distribuidora</h2><span class="small mut">2 de 5 etiquetas atualizadas</span></div>
    <div class="progress"><span style="width:40%"></span></div>
    <table class="table">
      <thead><tr><th>Produto</th><th>Preço antigo → novo</th><th>Unidade</th><th>Qtd. de etiquetas</th><th class="c">Etiqueta atualizada</th></tr></thead>
      <tbody>
        <tr class="tint"><td class="strong">Ração bovina 25 kg</td><td><span class="strike">R$ 98,00</span> → <span class="strong grn">R$ 104,00</span></td><td>saco</td><td><div class="input" style="width:90px;height:36px"><input value="2" /></div></td><td class="c"><span class="box on"><app-icon name="check" [size]="14" [stroke]="3" /></span></td></tr>
        <tr class="tint"><td class="strong">Semente de capim 1 kg</td><td><span class="strike">R$ 25,00</span> → <span class="strong grn">R$ 28,00</span></td><td>un.</td><td><div class="input" style="width:90px;height:36px"><input value="1" /></div></td><td class="c"><span class="box on"><app-icon name="check" [size]="14" [stroke]="3" /></span></td></tr>
        <tr><td class="strong">Fertilizante NPK 5 kg</td><td><span class="strike">R$ 99,90</span> → <span class="strong red">R$ 97,90</span></td><td>un.</td><td><div class="input" style="width:90px;height:36px"><input value="1" /></div></td><td class="c"><span class="box"></span></td></tr>
        <tr><td class="strong">Suplemento mineral 5 kg <span class="badge sm">Novo</span></td><td>— → <span class="strong grn">R$ 52,00</span></td><td>un.</td><td><div class="input" style="width:90px;height:36px"><input value="1" /></div></td><td class="c"><span class="box"></span></td></tr>
        <tr><td class="strong">Sal mineral 10 kg <span class="badge sm">Novo</span></td><td>— → <span class="strong grn">R$ 39,00</span></td><td>un.</td><td><div class="input" style="width:90px;height:36px"><input value="1" /></div></td><td class="c"><span class="box"></span></td></tr>
      </tbody>
    </table>
    <div class="row sb">
      <span class="btn ghost">Marcar todas como atualizadas</span>
      <div class="row"><a class="btn" routerLink="/notas">Fazer depois</a><a class="btn primary" routerLink="/notas/000123">Concluir</a></div>
    </div>
    <p class="small mut">Se concluir com etiquetas pendentes, o sistema pergunta "Concluir mesmo assim?". "Fazer depois" deixa a nota como "Etiquetas pendentes".</p>
  </div>

  <div class="card">
    <div class="row sb"><h3>Prévia da impressão</h3><span class="small mut">Nome, preço e unidade</span></div>
    <div class="row wrap g16">
      @for (e of prev; track e[0]) {
        <div class="label-tag"><span class="small">{{ e[0] }}</span><span class="price">{{ e[1] }}</span><span class="small mut">{{ e[2] }}</span></div>
      }
    </div>
  </div>
  }
</div>`,
  styles: `.label-tag { width: 190px; border: 1px dashed #b9c3bb; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 2px; background: #fff; } .price { font-size: 26px; line-height: 34px; font-weight: 600; }`,
})
export class Etiquetas {
  readonly estado = input<string>();
  readonly prev = [['Ração bovina 25 kg', 'R$ 104,00', 'por saco'], ['Semente de capim 1 kg', 'R$ 28,00', 'por unidade'], ['Fertilizante NPK 5 kg', 'R$ 97,90', 'por unidade'], ['Suplemento mineral 5 kg', 'R$ 52,00', 'por unidade']];
}
