import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** Início (versão 2). `estado`: undefined | 'avisos' (X4, sino aberto) | 'em-dia' (I-3, nenhuma nota pendente). */
@Component({
  selector: 'app-inicio',
  imports: [RouterLink, Icon],
  templateUrl: './inicio.html',
})
export class Inicio {
  readonly estado = input<string>();
}
