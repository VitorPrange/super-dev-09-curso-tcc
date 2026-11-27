import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** N10 — Manifestação final. `estado`: 'lista' (pendentes) | 'nota' (registrar para uma nota) | 'confirmar'. */
@Component({
  selector: 'app-manifestacao',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  @if (estado() === 'lista') {
    <div class="page-head">
      <div class="grow"><h1>Manifestações pendentes</h1><p>Notas em que a ciência já foi dada. Registre a manifestação final antes do prazo.</p></div>
      <a class="btn" routerLink="/notas"><app-icon name="arrow-left" />Notas fiscais</a>
    </div>
    <div class="alert warn"><app-icon name="alert" /><span>Prazo usado como alerta: <span class="strong">90 dias após a autorização</span> (o menor valor encontrado; as fontes divergem — não verificado). Combine com o contador antes de usar de verdade.</span></div>
    <div class="card">
      <table class="table">
        <thead><tr><th>Nota</th><th>Fornecedor</th><th class="r">Valor</th><th>Ciência dada em</th><th>Prazo de alerta</th><th class="r"></th></tr></thead>
        <tbody>
          <tr><td class="strong">NF-e 000.109</td><td>Casa do Campo</td><td class="r">R$ 2.180,00</td><td>02/09/2026</td><td><span class="badge red">07/12/2026 · 12 dias</span></td><td class="r"><a class="btn sm primary" routerLink="/notas/000109/manifestacao">Manifestar</a></td></tr>
          <tr><td class="strong">NF-e 000.115</td><td>Casa do Campo</td><td class="r">R$ 640,00</td><td>20/11/2026</td><td><span class="badge">18/02/2027 · 85 dias</span></td><td class="r"><a class="btn sm" routerLink="/notas/000115/manifestacao">Manifestar</a></td></tr>
        </tbody>
      </table>
      <div class="row small mut g16"><span class="row g6"><span class="dot"></span>acima de 30 dias</span><span class="row g6"><span class="dot amb"></span>8 a 30 dias</span><span class="row g6"><span class="dot red"></span>até 7 dias</span></div>
    </div>
  } @else {
    <div class="page-head">
      <div class="grow"><h1>Manifestação final</h1><p>NF-e 000.109 · Casa do Campo · R$ 2.180,00 · prazo de alerta 07/12/2026 (12 dias)</p></div>
      <a class="btn" routerLink="/notas/manifestacoes"><app-icon name="arrow-left" />Pendentes</a>
    </div>
    <div class="split">
      <div class="card p24">
        <h2>O que aconteceu com esta operação?</h2>
        <div class="option on"><span class="radio on"></span><div class="col g4"><span class="strong">Confirmar operação</span><span class="small mut">A operação ocorreu e a mercadoria foi recebida.</span></div></div>
        <div class="option"><span class="radio"></span><div class="col g4"><span class="strong">Não reconheço esta operação</span><span class="small mut">Desconhecimento: a loja não fez este pedido.</span></div></div>
        <div class="option" style="flex-wrap:wrap"><span class="radio"></span><div class="col g4 grow"><span class="strong">Operação não realizada</span><span class="small mut">O pedido existiu, mas a operação não aconteceu (ex.: devolvida, cancelada).</span></div>
          <div class="field" style="width:100%"><label>Justificativa (obrigatória)</label><textarea class="input" placeholder="Explique o motivo"></textarea><span class="hint">Tamanho mínimo a confirmar na NT 2020.001 (não verificado).</span></div></div>
        <div class="alert"><app-icon name="info" /><span>Esta manifestação é registrada na SEFAZ e o fornecedor pode vê-la.</span></div>
        <div class="row end"><a class="btn" routerLink="/notas/manifestacoes">Cancelar</a><a class="btn primary" routerLink="/notas/000109/manifestacao/confirmar">Registrar manifestação</a></div>
      </div>
      <div class="card">
        <h3>Situação da nota</h3>
        <div class="timeline">
          <div><span class="tdot"></span><div><div>Autorizada</div><div class="small mut">08/09/2026</div></div></div>
          <div><span class="tdot"></span><div><div>Ciência dada</div><div class="small mut">09/09/2026 · manual</div></div></div>
          <div><span class="tdot off"></span><div><div class="amb">Manifestação final</div><div class="small mut">alerta em 07/12/2026</div></div></div>
        </div>
        <p class="small mut">Simulação no TCC 1. Antes de usar de verdade: combinar com o contador (D16).</p>
      </div>
    </div>
  }
</div>
@if (estado() === 'confirmar') {
  <div class="overlay"><div class="modal">
    <div class="modal-head"><div class="grow"><h2>Registrar "Confirmar operação"?</h2><p>NF-e 000.109 · Casa do Campo</p></div><a class="icon-btn" aria-label="Fechar" routerLink="/notas/000109/manifestacao"><app-icon name="x" /></a></div>
    <p>O evento é enviado à SEFAZ assinado com o certificado da loja, e o fornecedor pode vê-lo.</p>
    <div class="modal-foot"><a class="btn" routerLink="/notas/000109/manifestacao">Cancelar</a><a class="btn primary" routerLink="/notas/manifestacoes">Registrar</a></div>
  </div></div>
}`,
})
export class Manifestacao {
  readonly estado = input<string>();
}
