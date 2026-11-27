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
    .scan { height: 64px; border: 2px solid var(--accent); border-radius: var(--r-card); background: var(--surface); display: flex; align-items: center; gap: 14px; padding: 0 18px; box-shadow: 0 0 0 4px var(--accent-ring); font-size: 17px; }
    .scan input { border: 0; outline: 0; flex: 1; font: inherit; }
    .qty { display: inline-flex; align-items: center; border: 1px solid var(--line); border-radius: var(--r); }
    .qty span { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; }
    .qty .n { width: 36px; border-left: 1px solid var(--line); border-right: 1px solid var(--line); font-weight: 600; }
    .foot { position: sticky; bottom: 0; background: var(--stamp); color: var(--surface); border-radius: var(--r-card); padding: 20px 24px; display: flex; align-items: center; gap: 24px; border-top: 2px dashed var(--stamp-text); }
    .foot .soft { color: var(--stamp-text); }
    .foot .corn { color: var(--corn); }
    .total { font-family: var(--font-display); font-size: 46px; line-height: 46px; font-weight: 700; white-space: nowrap; color: var(--corn); }
    .on-dark { background: transparent; color: var(--surface); border-color: rgba(255, 255, 255, .35); }
    .on-dark:hover { background: rgba(255, 255, 255, .08); border-color: var(--surface); }
    .corn-btn { background: var(--corn); color: var(--stamp); border-color: var(--corn); }
    .corn-btn:hover { background: var(--surface); border-color: var(--surface); }
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
