import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';

/**
 * P7 — Venda rápida com leitor de código de barras.
 * `estado`: undefined (itens lidos) | 'confirmar' (janela) | 'nao-encontrado' | 'vazio' | 'registrada'.
 * Leitores USB em modo teclado (HID) "digitam" o código no campo em foco e podem terminar com Enter
 * (fonte: guias de revendedores; o manual do seu modelo não foi verificado).
 */
@Component({
  selector: 'app-venda',
  imports: [RouterLink, Icon],
  templateUrl: './venda.html',
  styles: `
    .scan { height: 64px; border: 2px solid var(--grn); border-radius: 14px; background: #fff; display: flex; align-items: center; gap: 14px; padding: 0 18px; box-shadow: 0 0 0 4px rgba(40,118,83,.12); font-size: 16px; }
    .scan input { border: 0; outline: 0; flex: 1; font: inherit; }
    .qty { display: inline-flex; align-items: center; border: 1px solid var(--ln); border-radius: 8px; }
    .qty span { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; }
    .qty .n { width: 36px; border-left: 1px solid var(--ln); border-right: 1px solid var(--ln); font-weight: 600; }
    .foot { position: sticky; bottom: 0; background: var(--side); color: #fff; border-radius: 16px; padding: 18px 24px; display: flex; align-items: center; gap: 24px; }
    .total { font-size: 32px; line-height: 40px; font-weight: 600; white-space: nowrap; }
    .pay { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  `,
})
export class Venda {
  readonly estado = input<string>();
  readonly saidas = [
    ['16:42', 'R$ 345,00', 'Pix · 5 itens'],
    ['14:10', 'R$ 129,90', 'Dinheiro · 2 itens'],
    ['11:25', 'R$ 249,50', 'Cartão de débito · 4 itens'],
    ['09:03', 'R$ 88,00', 'Pix · 1 item'],
  ];
}
