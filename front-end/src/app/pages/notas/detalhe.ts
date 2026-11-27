import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** N4 — Detalhe da nota (somente leitura). `estado`: undefined (concluída) | 'erro' (N6 — nota com erro). */
@Component({
  selector: 'app-nota-detalhe',
  imports: [RouterLink, Icon],
  templateUrl: './detalhe.html',
})
export class NotaDetalhe {
  readonly estado = input<string>();
}
