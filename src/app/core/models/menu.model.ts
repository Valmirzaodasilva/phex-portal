export interface MenuModel {
  id: number;
  name: string;
  url: string;
  idDynamicPage?: number;
  idSearchPageSSW?: number;
}

export interface MenuSSWModel {
  id: number;
  menuPortalName: string;
  menuPortalUrl: string;
  idSearchPageSSW?: number;
}
