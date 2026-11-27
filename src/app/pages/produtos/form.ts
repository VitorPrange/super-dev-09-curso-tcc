import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** P3 — Novo produto / Editar produto. `estado`: undefined (novo) | 'editar'. */
@Component({
  selector: 'app-produto-form',
  imports: [RouterLink, Icon],
  templateUrl: './form.html',
})
export class ProdutoForm {
  readonly estado = input<string>();
}
