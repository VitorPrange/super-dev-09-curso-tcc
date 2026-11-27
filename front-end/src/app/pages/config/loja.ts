import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { ConfigNav } from './config-nav';

/** C1 — Loja e conta. */
@Component({
  selector: 'app-cfg-loja',
  imports: [Icon, ConfigNav],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Configurações</h1><p>Ajuste o PAM ao jeito da sua loja.</p></div></div>
  <div class="cfg">
    <app-config-nav />
    <div class="cfg-body">
      <div class="card p24">
        <h2>Dados da loja</h2>
        <p class="small mut">Aparecem nas etiquetas impressas.</p>
        <div class="field"><label>Nome da loja</label><div class="input"><input value="PAM Agro & Pet" /></div></div>
        <div class="grid-2">
          <div class="field"><label>CNPJ</label><div class="input ro">98.765.432/0001-10</div><span class="hint">Vem do certificado digital.</span></div>
          <div class="field"><label>Telefone / WhatsApp</label><div class="input"><input value="(47) 99999-0000" /></div></div>
        </div>
        <div class="field"><label>Endereço</label><div class="input"><input value="Rua Itajaí, 1200 — Centro, Gaspar/SC" /></div></div>
        <div class="row"><span class="logo"><app-icon name="sprout" [size]="28" /></span><div class="col g4 grow"><span class="strong">Logomarca</span><span class="small mut">PNG ou SVG, até 1 MB (opcional)</span></div><span class="btn sm">Enviar imagem</span></div>
      </div>
      <div class="card p24">
        <h2>Sua conta</h2>
        <div class="grid-2">
          <div class="field"><label>Nome</label><div class="input"><input value="João Almeida" /></div></div>
          <div class="field"><label>E-mail</label><div class="input"><input value="joao@pamagro.com.br" /></div></div>
        </div>
        <div class="row sb inner"><div class="col g4"><span class="strong">Senha</span><span class="small mut">Trocar a senha chega no TCC 2, com o back-end.</span></div><span class="btn sm disabled">Trocar senha</span></div>
      </div>
      <div class="save-bar"><span class="btn">Descartar</span><span class="btn primary">Salvar alterações</span></div>
    </div>
  </div>
</div>`,
  styles: `.logo { width: 56px; height: 56px; border-radius: var(--r-card); background: var(--accent-soft); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; }`,
})
export class CfgLoja {}
