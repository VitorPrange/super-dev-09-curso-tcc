import { Component } from '@angular/core';
import { ConfigNav } from './config-nav';

/** C4 — Estoque e vendas (modo de entrada pela nota, saldo negativo, mínimo padrão, forma de pagamento). */
@Component({
  selector: 'app-cfg-estoque',
  imports: [ConfigNav],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Configurações</h1><p>Ajuste o PAM ao jeito da sua loja.</p></div></div>
  <div class="cfg">
    <app-config-nav />
    <div class="cfg-body">
      <div class="card p24">
        <h2>Entrada de estoque pela nota</h2>
        <p class="small mut">O que acontece com as quantidades quando você confirma uma nota.</p>
        <div class="option"><span class="radio"></span><div class="col g4"><span class="strong">Automática</span><span class="small mut">Ao confirmar a nota, a quantidade de cada item cadastrado ou vinculado entra no estoque. Bom se você só confirma depois de conferir a mercadoria. Se algo vier faltando, o estoque fica acima do real até um ajuste.</span></div></div>
        <div class="option on"><span class="radio on"></span><div class="col g4"><span class="strong">Por item <span class="badge sm">Recomendado</span></span><span class="small mut">A revisão da nota ganha o bloco "Entrada no estoque", com interruptor e quantidade editável por item. Mais cliques, mais controle (ex.: algo chegou incompleto).</span></div></div>
        <div class="option"><span class="radio"></span><div class="col g4"><span class="strong">Manual</span><span class="small mut">A nota não mexe no estoque; a entrada é feita depois, pelo Ajuste de estoque. O estoque pode ficar desatualizado por dias.</span></div></div>
        <p class="small mut">Em todos os modos: quantidade que entra = quantidade da nota × fator de conversão. A entrada não altera preço.</p>
      </div>
      <div class="card p24">
        <h2>Vendas e saldo</h2>
        <div class="setting"><div class="grow"><span class="strong">Permitir saldo negativo</span><p>Desligado: na venda rápida, produto sem saldo suficiente é bloqueado.</p></div><span class="toggle"></span></div>
        <div class="setting"><div class="grow"><span class="strong">Pedir forma de pagamento ao confirmar a saída</span><p>Dinheiro, Pix, débito, crédito ou outro. (Decisão em aberto: D15)</p></div><span class="toggle on"></span></div>
        <div class="setting"><div class="grow"><span class="strong">Estoque mínimo padrão para produtos novos</span><p>"Baixo estoque" = saldo menor ou igual ao mínimo.</p></div><div class="input" style="width:110px"><input value="5" /><span class="suf">un.</span></div></div>
        <div class="setting"><div class="grow"><span class="strong">Som ao ler um código</span><p>Bipe de confirmação na venda rápida (opcional).</p></div><span class="toggle"></span></div>
      </div>
      <div class="save-bar"><span class="btn">Descartar</span><span class="btn primary">Salvar alterações</span></div>
    </div>
  </div>
</div>`,
})
export class CfgEstoque {}
