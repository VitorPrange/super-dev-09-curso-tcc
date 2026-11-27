import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/**
 * Notas fiscais (antiga "Notificações", versão 2).
 * `estado`: undefined | 'ciencia' (N1 — modal "Dar ciência") | 'baixando' (N1 — depois da ciência) | 'vazio'.
 */
@Component({
  selector: 'app-notas',
  imports: [RouterLink, Icon],
  templateUrl: './notas.html',
})
export class Notas {
  readonly estado = input<string>();
}
