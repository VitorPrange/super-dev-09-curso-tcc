import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** N5 — Importar XML manualmente (fonte real de dados no TCC 1). */
@Component({
  selector: 'app-importar',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="page-head">
    <div class="grow"><h1>Importar XML</h1><p>Envie os arquivos XML das notas de entrada. Eles entram como "Aguardando aprovação".</p></div>
    <a class="btn" routerLink="/notas"><app-icon name="arrow-left" />Notas fiscais</a>
  </div>

  <div class="split">
    <div class="col g20">
      <div class="card p24">
        <div class="drop">
          <span class="ico"><app-icon name="upload" [size]="30" /></span>
          <h3>Arraste os arquivos .xml para cá</h3>
          <p class="mut">ou</p>
          <span class="btn primary"><app-icon name="files" />Escolher arquivos</span>
          <p class="small mut">Aceita vários arquivos de uma vez · somente .xml de NF-e</p>
        </div>
      </div>

      <div class="card">
        <div class="row sb"><h2>5 arquivos selecionados</h2><span class="small mut">3 prontos · 1 duplicado · 1 com erro</span></div>
        <table class="table">
          <thead><tr><th>Arquivo</th><th>Nota</th><th>Situação</th><th class="r"></th></tr></thead>
          <tbody>
            <tr><td><div class="row g8"><app-icon name="file" class="grn" />35261100...0123.xml</div></td><td>NF-e 000.126 · AgroVale · 6 itens</td><td><span class="badge">Pronto</span></td><td class="r"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
            <tr><td><div class="row g8"><app-icon name="file" class="grn" />nfe-petcenter-1127.xml</div></td><td>NF-e 004.551 · Pet Center · 12 itens</td><td><span class="badge">Pronto</span></td><td class="r"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
            <tr><td><div class="row g8"><app-icon name="file" class="grn" />ruralsul-novembro.xml</div></td><td>NF-e 000.127 · Rural Sul · 3 itens</td><td><span class="badge blu"><app-icon name="refresh" [size]="14" />Lendo…</span></td><td class="r"></td></tr>
            <tr class="hl"><td><div class="row g8"><app-icon name="file" class="amb" />35261100...0118.xml</div></td><td>NF-e 000.118 · AgroVale</td><td><span class="badge amb">Duplicada — já importada em 22/11</span></td><td class="r"><a class="small grn" routerLink="/notas/000118">Ver nota</a></td></tr>
            <tr><td><div class="row g8"><app-icon name="file" class="red" />planilha-precos.xml</div></td><td class="mut">—</td><td><span class="badge red">Erro: não parece ser uma NF-e</span></td><td class="r"><span class="icon-btn"><app-icon name="x" [size]="16" /></span></td></tr>
          </tbody>
        </table>
        <div class="alert warn"><app-icon name="alert" /><span>NF-e 004.551: o destinatário (CNPJ 12.345.678/0001-90) é diferente da loja. Confira se a nota é mesmo sua antes de importar.</span></div>
        <div class="row sb">
          <span class="small mut">Duplicadas e arquivos com erro não serão importados.</span>
          <div class="row"><span class="btn">Limpar lista</span><a class="btn primary" routerLink="/notas">Importar 3 notas</a></div>
        </div>
      </div>
    </div>

    <div class="col g20">
      <div class="card">
        <h3>O que é verificado</h3>
        @for (v of verificacoes; track v) { <div class="row top small"><app-icon name="check" class="grn" [size]="16" /><span>{{ v }}</span></div> }
      </div>
      <div class="card info">
        <div class="row g8 strong"><app-icon name="info" />Notas importadas à mão</div>
        <p class="small">Entram com o XML completo: não passam pela ciência nem pela manifestação na SEFAZ.</p>
      </div>
    </div>
  </div>
</div>`,
  styles: `.drop { border: 2px dashed #c9dccb; border-radius: 14px; background: var(--tint); padding: 40px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; } .drop .ico { width: 64px; height: 64px; border-radius: 20px; background: var(--lg); color: var(--grn); display: flex; align-items: center; justify-content: center; }`,
})
export class Importar {
  readonly verificacoes = [
    'O arquivo é um XML bem formado',
    'A estrutura é de uma NF-e',
    'A chave de acesso tem 44 dígitos',
    'A chave ainda não foi importada',
    'O destinatário é a loja (aviso)',
  ];
}
