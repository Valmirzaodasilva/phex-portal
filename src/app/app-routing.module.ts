import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoadingService } from './shared/services/loading.service';
import { HeaderService } from './shared/services/header.service';
import { Subscription } from 'rxjs';
import { DynamicPage } from './pages/dynamic/dynamic.page';

const routes: Routes = [{ path: '', component: HomePage }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  private subscriptions = new Subscription();

  constructor(
    private loadingService: LoadingService,
    private headerSerivce: HeaderService
  ) {
    this.subscriptions.add(
      this.headerSerivce.getNavigationMenu().subscribe((menus) => {
        menus.forEach((menu) => {
          routes.unshift({
            path: menu.url.substring(1),
            component: DynamicPage,
            data: { menu },
          });
        });
      })
    );
  }
}
