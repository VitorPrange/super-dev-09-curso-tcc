import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** X2 — Primeiro acesso (estado vazio que ocupa o lugar do Início). */
@Component({
  selector: 'app-primeiro-acesso',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Boas-vindas ao PAM Agro, João.</h1><p>Três passos e sua loja está pronta para receber as notas.</p></div></div>
  <div class="split">
    <div class="card p24 g16">
      <div class="row sb"><h2>Comece por aqui</h2><span class="small mut">1 de 3 concluído</span></div>
      <div class="progress"><span style="width:33%"></span></div>
      <div class="option on">
        <span class="stepn done"><app-icon name="check" [size]="18" [stroke]="2.4" /></span>
        <div class="grow col g4"><h3>Defina sua margem</h3><p class="mut">Quanto o PAM acrescenta sobre o custo para sugerir o preço. Ex.: 30% → R$ 80,00 vira R$ 104,00.</p></div>
        <span class="badge">Feito</span>
      </div>
      <div class="option">
        <span class="stepn">2</span>
        <div class="grow col g4"><h3>Importe sua primeira nota</h3><p class="mut">Envie o arquivo XML de uma NF-e de entrada. O PAM separa os itens e compara com o catálogo.</p></div>
        <a class="btn primary sm" routerLink="/notas/importar">Importar XML</a>
      </div>
      <div class="option">
        <span class="stepn">3</span>
        <div class="grow col g4"><h3>Confira os produtos</h3><p class="mut">Revise os produtos cadastrados a partir da nota, as categorias e o estoque mínimo.</p></div>
        <a class="btn sm" routerLink="/produtos/vazio">Ver produtos</a>
      </div>
    </div>
    <div class="col g20">
      <div class="card p24">
        <h2>Como o PAM funciona</h2>
        @for (p of passos; track p[0]; let i = $index) {
          <div class="row top"><span class="badge sm" style="width:25px;justify-content:center">{{ i + 1 }}</span><div class="col g4"><span class="strong">{{ p[0] }}</span><span class="small mut">{{ p[1] }}</span></div></div>
        }
      </div>
      <div class="card tint"><div class="row g8"><app-icon name="info" class="grn" /><h3>Ainda sem dados</h3></div><p class="small mut">Os cartões de produtos, notas e estoque aparecem aqui assim que a primeira nota for importada.</p></div>
    </div>
  </div>
</div>`,
  styles: `.stepn { width: 40px; height: 40px; border-radius: 99px; background: var(--lg); color: var(--grn); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px; flex: none; } .stepn.done { background: var(--grn); color: #fff; }`,
})
export class PrimeiroAcesso {
  readonly passos = [
    ['A nota chega', 'Por XML ou pela SEFAZ.'],
    ['Você entende os itens', 'Novos, preços alterados e sem mudança.'],
    ['Você decide', 'Nada é aplicado sem confirmação.'],
    ['Atualiza as etiquetas', 'O sistema lista o que trocar na loja.'],
  ];
}
