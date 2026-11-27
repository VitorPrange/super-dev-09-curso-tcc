import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** F3 — Fluxo de caixa (gráfico desenhado só com CSS, valores fixos). */
@Component({
  selector: 'app-fluxo',
  imports: [RouterLink, Icon],
  templateUrl: './fluxo.html',
  styles: `
    .chart { display: flex; align-items: flex-end; gap: 14px; height: 220px; padding: 0 8px; border-bottom: 1px solid var(--ln); }
    .day { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
    .bars { display: flex; gap: 4px; align-items: flex-end; height: 100%; }
    .bar { width: 16px; border-radius: 4px 4px 0 0; }
    .in { background: var(--grn); } .out { background: #e3b6a8; } .prev { background: repeating-linear-gradient(45deg, #f1d9d1, #f1d9d1 4px, #fff 4px, #fff 8px); border: 1px dashed #e3b6a8; }
    .lbl { font-size: 11px; color: var(--mut); }
    .legend { display: flex; gap: 18px; font-size: 12px; color: var(--mut); }
    .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 6px; }
  `,
})
export class Fluxo {
  // [rótulo, altura entrada %, altura saída %, previsto?]
  readonly dias: [string, number, number, boolean][] = [
    ['18/11', 60, 70, false], ['19/11', 45, 10, false], ['20/11', 70, 25, false], ['21/11', 55, 0, false],
    ['22/11', 80, 40, false], ['23/11', 90, 15, false], ['24/11', 65, 30, false], ['25/11', 0, 85, true],
    ['26/11', 0, 0, true], ['27/11', 0, 0, true], ['28/11', 0, 30, true], ['29/11', 0, 0, true], ['30/11', 0, 18, true],
  ];
}
