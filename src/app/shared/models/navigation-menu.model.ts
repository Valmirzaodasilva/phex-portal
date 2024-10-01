export class NavigationMenuModel {
  id: number;
  name: string;
  url: string;
  idDynamicPage: number;
}

export class NavigationMenuSSWModel {
  id: number;
  menuPortalName: string;
  menuPortalUrl: string;
}

export class NavigationAdditionalMenuPage {
  id: number;
  name: string;
  url: string;
  idDynamicPage: number = 0;
}
