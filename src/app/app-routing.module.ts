import { NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoadingService } from './shared/services/loading.service';
import { HeaderService } from './shared/services/header.service';
import { Subscription } from 'rxjs';
import { DynamicPage } from './pages/dynamic/dynamic.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: { menu: { id: '1', name: 'Início', url: '/inicio' } },
  },
  {
    path: '**',
    component: NotFoundPage,
    data: { menu: { id: '1', name: 'Início', url: '/inicio' } },
  },
  { path: 'teste', component: DynamicPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private headerSerivce: HeaderService
  ) {
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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
