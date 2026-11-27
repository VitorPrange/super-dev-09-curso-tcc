import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../shared/icon';

/** Menu lateral das Configurações (usado em todas as telas C1–C8). */
@Component({
  selector: 'app-config-nav',
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <nav class="cnav">
      <a routerLink="/configuracoes/loja" routerLinkActive="on"><app-icon name="store" />Loja e conta</a>
      <a routerLink="/configuracoes/precos" routerLinkActive="on"><app-icon name="tag" />Preços</a>
      <a routerLink="/configuracoes/categorias" routerLinkActive="on"><app-icon name="folder" />Categorias</a>
      <a routerLink="/configuracoes/estoque" routerLinkActive="on"><app-icon name="package" />Estoque e vendas</a>
      <a routerLink="/configuracoes/restritas" routerLinkActive="on"><app-icon name="shield" />Vendas restritas</a>
      <a routerLink="/configuracoes/sefaz" routerLinkActive="on"><app-icon name="wifi" />Conexão com a SEFAZ</a>
      <a routerLink="/configuracoes/notificacoes" routerLinkActive="on"><app-icon name="bell" />Notificações</a>
    </nav>
  `,
  styles: `
    .cnav { background: #fff; border: 1px solid var(--ln); border-radius: 16px; padding: 8px; display: flex; flex-direction: column; gap: 2px; position: sticky; top: 96px; }
    a { display: flex; gap: 10px; align-items: center; padding: 10px 12px; border-radius: 10px; color: var(--mut); }
    a:hover { background: var(--inp); }
    a.on { background: var(--lg); color: var(--grn); font-weight: 600; }
  `,
})
export class ConfigNav {}
