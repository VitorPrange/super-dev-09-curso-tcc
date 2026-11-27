import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** X1 — Login. `estado` vem da rota: undefined (normal) ou 'erro'. */
@Component({
  selector: 'app-login',
  imports: [RouterLink, Icon],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly estado = input<string>();
}
