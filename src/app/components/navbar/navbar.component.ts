import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import {
  NavigationAdditionalMenuPage,
  NavigationMenuModel,
  NavigationMenuSSWModel,
} from 'src/app/shared/models/navigation-menu.model';
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
  public menuContactPage: NavigationAdditionalMenuPage = {
    id: 878787,
    name: 'Contatos',
    url: 'contatos',
    idDynamicPage: 0,
  };

  // TODO: REMOVER QUANDO MENUS SSW FOREM DINÂMICOS
  public menusSSWStatic: Array<NavigationMenuSSWModel> = [];

  public menuCoveragePage: NavigationAdditionalMenuPage = {
    id: 888888,
    name: 'Abrangência',
    url: 'abrangencia',
    idDynamicPage: 0,
  };

  faIconExternalLink = faShare;

  public isDisplayContactPage = false;
  public isDisplayCoveragePage = false;

  private subscriptions = new Subscription();

  constructor(private router: Router, private headerService: HeaderService) {}

  ngOnInit(): void {
    // TODO: REMOVER QUANDO MENUS SSW FOREM DINÂMICOS
    this.menusSSWStatic = [
      {
        id: 25001,
        menuPortalName: 'Rastreamento',
        menuPortalUrl: 'https://ssw.inf.br/2/rastreamento_danfe',
      },
      {
        id: 25001,
        menuPortalName: 'Áreas atendidas',
        menuPortalUrl: 'https://ssw.inf.br/2/areas?sigla_emp=PHX',
      },
      {
        id: 25001,
        menuPortalName: 'Cotação',
        menuPortalUrl: 'https://ssw.inf.br/2/cotacao?sigla_emp=PHX',
      },
      {
        id: 25001,
        menuPortalName: 'Solicitar coleta',
        menuPortalUrl: 'https://ssw.inf.br/2/coleta?sigla_emp=PHX',
      },
      {
        id: 25001,
        menuPortalName: 'Solicitar coleta',
        menuPortalUrl: 'https://ssw.inf.br/2/tde?s=PHX',
      },
      {
        id: 25001,
        menuPortalName: 'Serviços',
        menuPortalUrl: 'https://ssw.inf.br/2/servicos?sigla_emp=PHX',
      },
    ];

    this.subscriptions.add(
      this.headerService.menuList$.subscribe((navigationMenu) => {
        this.menus = navigationMenu;
      })
    );

    // TODO: QUANDO REMOVER QUANDO MENUS SSW FOREM STATICOS
    // this.subscriptions.add(
    //   this.headerService.menuListSSW$.subscribe((navigationMenu) => {
    //     this.menusSSW = navigationMenu;
    //   })
    // );

    this.subscriptions.add(
      this.headerService.menuActive$.subscribe((menuActive) => {
        this.menuActive = menuActive;
      })
    );

    this.subscriptions.add(
      this.headerService.configPortal$.subscribe((configPortal) => {
        this.isDisplayContactPage = configPortal.displayContactsPage;
        this.isDisplayCoveragePage = configPortal.displayCoveragePage;
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
