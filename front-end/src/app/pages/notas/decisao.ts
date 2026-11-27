import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { Steps } from '../../shared/steps';

/**
 * Etapa 3 — Você decide o que vai mudar (versão 2).
 * `estado`: undefined | 'cadastrar' / 'vincular' (N2) | 'rejeitar' / 'sair' (N7) | 'falha' (Dec-10).
 */
@Component({
  selector: 'app-nota-decisao',
  imports: [RouterLink, Icon, Steps],
  templateUrl: './decisao.html',
  styles: `
    .dec { border: 1px solid var(--line); border-radius: var(--r-card); padding: 12px 14px; display: flex; flex-wrap: wrap; gap: 10px 14px; align-items: center; }
    .dec > .grow { flex: 1 1 280px; }
    .seg { display: inline-flex; border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; }
    .seg span, .seg a { padding: 8px 12px; font-size: 13px; border-right: 1px solid var(--line); background: var(--surface); color: var(--muted); white-space: nowrap; }
    .seg > :last-child { border-right: 0; }
    .seg .on { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
    .price-in { width: 110px; height: 36px; }
    .confirm { background: var(--warn-soft); border: 1px solid var(--warn-line); border-radius: var(--r); padding: 12px 14px; display: flex; gap: 12px; align-items: center; }
  `,
})
export class NotaDecisao {
  readonly estado = input<string>();
}
