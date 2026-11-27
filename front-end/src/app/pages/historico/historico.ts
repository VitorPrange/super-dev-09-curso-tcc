import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** H1 — Histórico (imutável). `estado`: undefined | 'detalhe' (mini painel antes/depois). */
@Component({
  selector: 'app-historico',
  imports: [RouterLink, Icon],
  templateUrl: './historico.html',
  styles: `.ev { display: flex; gap: 14px; align-items: center; padding: 12px 0; border-top: 1px solid var(--line); } .ev .ic { width: 36px; height: 36px; border-radius: var(--r); background: var(--accent-soft); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; flex: none; } .ev .ic.amb { background: var(--warn-soft); color: var(--warn); } .ev .ic.blu { background: var(--info-soft); color: var(--info); } .ev .ic.neu { background: var(--neutral-soft); color: var(--muted); }`,
})
export class Historico {
  readonly estado = input<string>();
}
