import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { ConfigNav } from './config-nav';

/** C8 — Vendas restritas: regras automáticas (liga/desliga) + marca manual que sempre vence. */
@Component({
  selector: 'app-cfg-restritas',
  imports: [Icon, ConfigNav],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Configurações</h1><p>Ajuste o PAM ao jeito da sua loja.</p></div></div>
  <div class="cfg">
    <app-config-nav />
    <div class="cfg-body">
      <div class="card p24">
        <h2>Regras automáticas de venda restrita</h2>
        <p class="small mut">Um produto é marcado como restrito se qualquer regra ligada bater. As regras rodam ao importar uma nota, ao cadastrar um produto e ao salvar uma regra.</p>

        <div class="option on" style="flex-direction:column">
          <div class="row" style="width:100%"><span class="toggle on"></span><div class="grow"><span class="strong">NCM</span> <span class="badge sm">Precisão alta</span></div><span class="small mut">3 NCMs</span></div>
          <div class="chips"><span class="chip">3808.93.24 ✕</span><span class="chip">3808.91.99 ✕</span><span class="chip">3004.90.99 ✕</span><span class="chip" style="border-style:dashed">+ adicionar NCM</span></div>
          <span class="small mut">Cuidado: um NCM pode misturar produtos restritos e livres.</span>
        </div>
        <div class="option on" style="flex-direction:column">
          <div class="row" style="width:100%"><span class="toggle on"></span><div class="grow"><span class="strong">Categoria</span> <span class="badge sm">Precisão alta</span></div><span class="small mut">1 categoria</span></div>
          <div class="chips"><span class="chip on">Medicamentos</span><span class="chip">Defensivos</span><span class="chip">Pet</span></div>
        </div>
        <div class="option" style="flex-direction:column">
          <div class="row" style="width:100%"><span class="toggle"></span><div class="grow"><span class="strong">Lista importada (CSV)</span> <span class="badge sm">Precisão alta</span></div><span class="btn sm"><app-icon name="upload" [size]="15" />Importar arquivo</span></div>
          <span class="small mut">Códigos de barras ou códigos de produto. A fonte e a atualização da lista precisam ser definidas.</span>
        </div>
        <div class="option" style="flex-direction:column">
          <div class="row" style="width:100%"><span class="toggle"></span><div class="grow"><span class="strong">Palavras na descrição</span> <span class="badge amb sm">Precisão média</span></div><span class="small mut">Desligada por padrão</span></div>
          <span class="small mut">Falsos positivos podem esconder um item que não é restrito.</span>
        </div>
        <div class="option" style="flex-direction:column">
          <div class="row" style="width:100%"><span class="toggle"></span><div class="grow"><span class="strong">Fornecedor</span> <span class="badge red sm">Precisão baixa</span></div><span class="small mut">Desligada por padrão</span></div>
          <span class="small mut">Marca todos os itens de fornecedores escolhidos, mesmo os que não são restritos.</span>
        </div>
      </div>

      <div class="card warn">
        <div class="row top"><app-icon name="alert" class="amb" /><div class="col g4 grow">
          <span class="strong">Reaplicar aos produtos cadastrados?</span>
          <span class="small">Com a regra nova, 4 produtos já cadastrados passariam a ser marcados como restritos.</span>
        </div><span class="btn sm">Só para os próximos</span><span class="btn sm primary">Reaplicar</span></div>
      </div>

      <div class="card">
        <h3>Transparência</h3>
        <p class="small mut">Todo produto marcado automaticamente mostra o motivo. Na revisão da nota aparece "N itens ocultos (venda restrita)", e os produtos restritos têm selo na lista de produtos e na venda rápida. A marca manual ("Restrito" ou "Não restrito") sempre vence as regras.</p>
        <div class="alert warn"><app-icon name="alert" /><span>Em aberto (D14): o que o sistema faz com o item restrito da nota. A regra legal de quem pode vender o quê não foi verificada.</span></div>
      </div>
      <div class="save-bar"><span class="btn">Descartar</span><span class="btn primary">Salvar regras</span></div>
    </div>
  </div>
</div>`,
})
export class CfgRestritas {}
