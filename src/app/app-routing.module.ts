import { NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoadingService } from './shared/services/loading.service';
import { HeaderService } from './shared/services/header.service';
import { Subscription } from 'rxjs';
import { DynamicPage } from './pages/dynamic/dynamic.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicPage,
    data: { menu: { id: '1', name: 'Início', url: 'inicio' } },
  },
  {
    path: '**',
    component: NotFoundPage,
    data: {
      menu: {
        id: '0',
        name: 'NotFound',
        url: 'not-found',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(private loadingService: LoadingService, private router: Router, private headerSerivce: HeaderService) {
    this.subscriptions.add(
      this.headerSerivce.menuList$.subscribe((menus) => {
        menus.forEach((menu) => {
          routes.unshift({
            path: menu.url,
            component: DynamicPage,
            data: { menu },
          });
        });
        this.router.resetConfig(routes);
        this.router.navigateByUrl(this.router.url);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
