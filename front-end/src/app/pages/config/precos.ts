import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { ConfigNav } from './config-nav';

/** C2 — Preços. `estado` = aba: undefined (Margem e arredondamento) | 'travados' | 'margens'. */
@Component({
  selector: 'app-cfg-precos',
  imports: [RouterLink, Icon, ConfigNav],
  templateUrl: './precos.html',
})
export class CfgPrecos {
  readonly estado = input<string>();
}
