import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationMenuModel, NavigationMenuSSWModel } from 'src/app/shared/models/navigation-menu.model';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public menus: Array<NavigationMenuModel> = [];
  public menusSSW: Array<NavigationMenuSSWModel> = [];
  public menuActive: string;

  private subscriptions = new Subscription();

  constructor(private router: Router, private headerService: HeaderService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.headerService.menuList$.subscribe((navigationMenu) => {
        this.menus = navigationMenu;
      })
    );

    this.subscriptions.add(
      this.headerService.menuListSSW$.subscribe((navigationMenu) => {
        this.menusSSW = navigationMenu;
      })
    );

    this.subscriptions.add(
      this.headerService.menuActive$.subscribe((menuActive) => {
        this.menuActive = menuActive;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeMenuActive(menu: NavigationMenuModel): void {
    this.headerService.setMenuActive(menu.id.toString());
    this.router.navigateByUrl(menu.url, { state: { menu } });
  }

  changeMenuSSWActive(menu: NavigationMenuSSWModel): void {
    this.headerService.setMenuActive(menu.id.toString());
    this.router.navigateByUrl(menu.menuPortalUrl, { state: { menu } });
  }
}
