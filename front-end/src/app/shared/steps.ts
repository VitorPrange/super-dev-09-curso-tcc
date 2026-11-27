import { Component, input } from '@angular/core';
import { Icon } from './icon';

/** Barra das 4 etapas da revisão de nota. `atual` = etapa em andamento (1 a 4). */
@Component({
  selector: 'app-steps',
  imports: [Icon],
  template: `
    <div class="steps">
      @for (s of etapas; track s; let i = $index) {
        <div class="step" [class.done]="i + 1 < atual()" [class.now]="i + 1 === atual()">
          <span class="mark">
            @if (i + 1 < atual()) { <app-icon name="check" [size]="14" [stroke]="2.4" /> } @else { {{ i + 1 }} }
          </span>
          {{ s }}
        </div>
      }
    </div>
  `,
})
export class Steps {
  readonly atual = input(1);
  readonly etapas = ['Nota recebida', 'Entender os itens', 'Revisar e confirmar', 'Atualizar etiquetas'];
}
