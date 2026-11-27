import { Component } from '@angular/core';
import { ConfigNav } from './config-nav';

/** C6 — Preferências de notificação. */
@Component({
  selector: 'app-cfg-notificacoes',
  imports: [ConfigNav],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Configurações</h1><p>Ajuste o PAM ao jeito da sua loja.</p></div></div>
  <div class="cfg">
    <app-config-nav />
    <div class="cfg-body">
      <div class="card p24">
        <h2>Avisos no sino</h2>
        <table class="table">
          <thead><tr><th>Aviso</th><th class="c">No sino</th><th class="c">Por e-mail (TCC 2)</th></tr></thead>
          <tbody>
            @for (a of avisos; track a[0]) {
              <tr><td>{{ a[0] }}</td><td class="c"><span class="toggle" [class.on]="a[1]"></span></td><td class="c"><span class="toggle" style="opacity:.45"></span></td></tr>
            }
          </tbody>
        </table>
      </div>
      <div class="save-bar"><span class="btn primary">Salvar</span></div>
    </div>
  </div>
</div>`,
})
export class CfgNotificacoes {
  readonly avisos: [string, boolean][] = [
    ['Nota recebida', true], ['Nota aguardando ciência', true], ['Manifestação com prazo próximo', true],
    ['Estoque baixo', true], ['Conta vencendo hoje', true], ['Erro na busca automática', false],
  ];
}
