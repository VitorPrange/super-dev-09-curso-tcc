import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** P1 — Lista de produtos. `estado`: undefined | 'baixo-estoque' (filtro aplicado) | 'vazio'. */
@Component({
  selector: 'app-produtos',
  imports: [RouterLink, Icon],
  templateUrl: './lista.html',
})
export class Produtos {
  readonly estado = input<string>();
}
