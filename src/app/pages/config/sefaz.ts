import { Component } from '@angular/core';
import { Icon } from '../../shared/icon';
import { ConfigNav } from './config-nav';

/** C5 — Conexão com a SEFAZ (casca no TCC 1; funciona de verdade no TCC 2). Mostra também as variações do selo X5. */
@Component({
  selector: 'app-cfg-sefaz',
  imports: [Icon, ConfigNav],
  template: `
<div class="page">
  <div class="page-head"><div class="grow"><h1>Configurações</h1><p>Ajuste o PAM ao jeito da sua loja.</p></div></div>
  <div class="cfg">
    <app-config-nav />
    <div class="cfg-body">
      <div class="alert"><app-icon name="info" /><span>Tela demonstrativa: a conexão real com a SEFAZ chega no TCC 2. Aqui tudo usa dados de exemplo.</span></div>
      <div class="card p24">
        <div class="row sb"><h2>Situação da conexão</h2><span class="badge">XML conectado</span></div>
        <div class="grid-3 small">
          <div class="col g4"><span class="mut">CNPJ da loja</span><span>98.765.432/0001-10</span></div>
          <div class="col g4"><span class="mut">Última busca</span><span>Hoje, 08:00 · nenhum documento novo</span></div>
          <div class="col g4"><span class="mut">Próxima busca</span><span>Hoje, 09:00</span></div>
        </div>
        <div class="row"><span class="small mut">Ambiente</span><div class="chips"><span class="chip">Homologação</span><span class="chip on">Produção</span></div></div>
        <div class="alert warn"><app-icon name="alert" /><span>Em homologação as notas são de teste, sem valor fiscal.</span></div>
        <div class="setting"><div class="grow"><span class="strong">Frequência da busca</span><p>A SEFAZ limita a frequência das consultas: no mínimo 1 hora entre buscas. Documentos ficam disponíveis por até 90 dias.</p></div><span class="badge neu">De hora em hora</span></div>
        <div class="row"><span class="btn"><app-icon name="refresh" [size]="16" />Testar conexão</span><span class="btn ghost">Importar XML manualmente</span></div>
      </div>
      <div class="card p24">
        <h2>Certificado digital</h2>
        <div class="inner row"><app-icon name="shield" class="grn" [size]="26" /><div class="grow col g4"><span class="strong">PAM AGRO E PET LTDA</span><span class="small mut">Válido até 14/03/2027 · arquivo .pfx</span></div><span class="badge">Válido</span></div>
        <div class="row"><span class="btn"><app-icon name="upload" [size]="16" />Enviar certificado</span><div class="input" style="width:240px"><input type="password" placeholder="Senha do certificado" /></div></div>
        <p class="small mut">O arquivo e a senha seguem para o back-end por canal seguro e nunca ficam salvos no navegador.</p>
      </div>
      <div class="card p24">
        <h2>Ciência da nota</h2>
        <div class="option on"><span class="radio on"></span><div class="col g4"><span class="strong">Manual <span class="badge sm">Recomendado</span></span><span class="small mut">Você vê o resumo (fornecedor e valor) e decide se dá a ciência. Você controla o que registra e evita registrar uma nota que não reconhece. Custo: um clique a mais e a espera até os itens chegarem.</span></div></div>
        <div class="option"><span class="radio"></span><div class="col g4"><span class="strong">Automática</span><span class="small mut">O sistema registra a ciência assim que a nota chega e os itens chegam prontos. Implicações: (1) registra um evento que o fornecedor pode ver, inclusive em notas que você não reconhece; (2) a ciência não é manifestação final — toda nota com ciência exige a manifestação final no prazo; (3) o evento é assinado com o certificado da loja.</span></div></div>
        <div class="alert warn"><app-icon name="alert" /><span>Converse com seu contador antes de usar o modo automático.</span></div>
        <div class="setting"><div class="grow"><span class="strong">Lembrar da manifestação final quando faltarem</span></div><div class="input" style="width:110px"><input value="30" /><span class="suf">dias</span></div></div>
      </div>
      <div class="card">
        <h3>Variações do selo de conexão (X5)</h3>
        <div class="row wrap">
          <span class="badge">XML conectado</span>
          <span class="badge neu"><app-icon name="clock" [size]="13" />Próxima busca em 42 min</span>
          <span class="badge blu">Modo manual</span>
          <span class="badge red"><app-icon name="alert" [size]="13" />Certificado vencido ou inválido</span>
          <span class="badge amb"><app-icon name="refresh" [size]="13" />Sem conexão com a SEFAZ — tentando de novo</span>
        </div>
        <p class="small mut">O selo fica na barra superior; clicar nele abre esta tela.</p>
      </div>
    </div>
  </div>
</div>`,
})
export class CfgSefaz {}
