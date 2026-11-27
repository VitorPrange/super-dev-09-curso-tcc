import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** F1 — Contas a pagar. `estado`: undefined | 'pagar' (F2 — registrar pagamento, modal). */
@Component({
  selector: 'app-contas',
  imports: [RouterLink, Icon],
  templateUrl: './contas.html',
})
export class Contas {
  readonly estado = input<string>();
}
