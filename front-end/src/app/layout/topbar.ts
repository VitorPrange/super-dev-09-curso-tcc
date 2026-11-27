import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/icon';

/** Barra superior: caminho da página, atalho de venda, selo de conexão (X5), data e sino (X4). */
@Component({
  selector: 'app-topbar',
  imports: [RouterLink, Icon],
  template: `
    <header class="top">
      <div class="crumb">{{ crumb() }}</div>
      <div class="row g16">
        <a class="btn sm" routerLink="/venda"><app-icon name="scan" [size]="16" />Venda rápida</a>
        <a class="badge" routerLink="/configuracoes/sefaz" title="Conexão com a SEFAZ">XML conectado</a>
        <span class="mut small">25 de novembro de 2026</span>
        <a class="bell" routerLink="/inicio/avisos" title="Avisos">
          <app-icon name="bell" [size]="22" [stroke]="1.6" />
          <span class="count">3</span>
        </a>
      </div>
    </header>
  `,
  styles: `
    .top { height: 72px; background: var(--surface); border-bottom: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; position: sticky; top: 0; z-index: 20; }
    .crumb { color: var(--muted); font-size: 14px; font-weight: 600; }
    .bell { position: relative; color: var(--muted); display: inline-flex; }
    .count { position: absolute; top: -6px; right: -8px; background: var(--danger); color: var(--surface); font-size: 11px; font-weight: 600; line-height: 16px; min-width: 16px; text-align: center; border-radius: 3px; padding: 0 4px; }
  `,
})
export class Topbar {
  readonly crumb = input('');
}
