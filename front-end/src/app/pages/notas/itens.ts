import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { Steps } from '../../shared/steps';

/**
 * Etapa 2 — Entenda os itens da nota (versão 2).
 * `estado`: undefined | 'menu' (N8 aberto) | 'margem' | 'travar' | 'preco' (janelas do N8) | 'ocultos' (N11) | 'carregando'.
 */
@Component({
  selector: 'app-nota-itens',
  imports: [RouterLink, Icon, Steps],
  templateUrl: './itens.html',
  styles: `.menu-pop { right: 8px; top: 40px; width: 300px; text-align: left; } .sub { padding-left: 34px; } .sub .item { padding: 6px 10px; }`,
})
export class NotaItens {
  readonly estado = input<string>();
}
