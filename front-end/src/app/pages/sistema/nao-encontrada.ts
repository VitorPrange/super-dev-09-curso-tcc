import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/** X3 — Página não encontrada. */
@Component({
  selector: 'app-nao-encontrada',
  imports: [RouterLink, Icon],
  template: `
<div class="page">
  <div class="empty" style="padding-top:120px">
    <span class="ico" style="width:88px;height:88px;border-radius: var(--r-card)"><app-icon name="compass" [size]="40" [stroke]="1.6" /></span>
    <span class="strong acc">404</span>
    <h1 style="color:var(--ink)">Página não encontrada</h1>
    <p>O endereço pode ter mudado ou a página não existe mais.</p>
    <div class="row mt8"><a class="btn primary" routerLink="/inicio">Voltar ao início</a><a class="btn" routerLink="/notas">Ver notas fiscais</a></div>
  </div>
</div>`,
})
export class NaoEncontrada {}
