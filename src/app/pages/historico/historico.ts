import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** H1 — Histórico (imutável). `estado`: undefined | 'detalhe' (mini painel antes/depois). */
@Component({
  selector: 'app-historico',
  imports: [RouterLink, Icon],
  templateUrl: './historico.html',
  styles: `.ev { display: flex; gap: 14px; align-items: center; padding: 12px 0; border-top: 1px solid var(--ln); } .ev .ic { width: 36px; height: 36px; border-radius: 10px; background: var(--lg); color: var(--grn); display: inline-flex; align-items: center; justify-content: center; flex: none; } .ev .ic.amb { background: var(--lamb); color: var(--amb); } .ev .ic.blu { background: var(--lblu); color: var(--blu); } .ev .ic.neu { background: var(--neu); color: var(--mut); }`,
})
export class Historico {
  readonly estado = input<string>();
}
