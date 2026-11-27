import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

/**
 * Moldura das telas internas: barra lateral + barra superior + conteúdo.
 * O texto do caminho (breadcrumb) vem do `data.crumb` de cada rota.
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Sidebar, Topbar],
  template: `
    <div class="shell">
      <app-sidebar />
      <div class="work">
        <app-topbar [crumb]="crumb()" />
        <main><router-outlet /></main>
      </div>
    </div>
  `,
  styles: `
    .shell { display: grid; grid-template-columns: 256px 1fr; min-height: 100vh; }
    .work { min-width: 0; display: flex; flex-direction: column; }
  `,
})
export class Shell {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly crumb = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let r = this.route.snapshot;
        let crumb = '';
        while (r) {
          if (r.data['crumb']) crumb = r.data['crumb'];
          r = r.firstChild!;
        }
        return crumb;
      }),
    ),
    { initialValue: '' },
  );
}
