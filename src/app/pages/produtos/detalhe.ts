import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** P2 — Detalhe do produto. `estado` = aba aberta: undefined (Geral) | 'estoque' | 'precos' | 'fornecedores'. */
@Component({
  selector: 'app-produto-detalhe',
  imports: [RouterLink, Icon],
  templateUrl: './detalhe.html',
})
export class ProdutoDetalhe {
  readonly estado = input<string>();
}
