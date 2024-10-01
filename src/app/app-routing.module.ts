import { NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoadingService } from './shared/services/loading.service';
import { HeaderService } from './shared/services/header.service';
import { Subscription } from 'rxjs';
import { DynamicPage } from './pages/dynamic/dynamic.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { SearchSSWPage } from './pages/search-ssw/search-ssw.page';
import { ContactPage } from './pages/contact/contact.page';
import { CoveragePage } from './pages/coverage/coverage.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicPage,
    data: { menu: { id: '1', name: 'Início', url: 'inicio' } },
  },
  {
    path: 'contatos',
    component: ContactPage,
    data: { menu: { id: 878787, name: 'Contatos', url: 'contatos' } },
  },
  {
    path: 'abrangencia',
    component: CoveragePage,
    data: { menu: { id: 888888, name: 'Abrangência', url: 'abrangencia' } },
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

  constructor(private loadingService: LoadingService, private router: Router, private headerService: HeaderService) {
    this.subscriptions.add(
      this.headerService.menuList$.subscribe((menus) => {
        menus.forEach((menu) => {
          routes.unshift({
            path: menu.url,
            component: DynamicPage,
            data: { menu },
          });
        });
        this.headerService.menuListSSW$.subscribe((sswMenus) => {
          sswMenus.forEach((sswMenu) => {
            routes.unshift({
              path: sswMenu.menuPortalUrl,
              component: SearchSSWPage,
              data: { menu: sswMenu },
            });
          });
          this.router.resetConfig(routes);
          this.router.navigateByUrl(this.router.url);
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
