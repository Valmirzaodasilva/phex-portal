import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MenuModel, MenuSSWModel } from '../models/menu.model';
import { DynamicPageModel } from '../models/dynamic-page.model';
import { FooterModel } from '../models/footer.model';
import { SearchSSWPageModel } from '../models/search-page-ssw.model';
import { ConfigPortalModel } from '../models/config-portal.model';

export interface ApiResponse<T> {
  success: boolean;
  response: T;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class PortalApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getMenuList(): Observable<ApiResponse<MenuModel[]>> {
    return this.http.get<ApiResponse<MenuModel[]>>(`${this.base}/portal-menu-list`);
  }

  getSSWMenuList(): Observable<ApiResponse<MenuSSWModel[]>> {
    return this.http.get<ApiResponse<MenuSSWModel[]>>(`${this.base}/portal-ssw-menu-list`);
  }

  getConfigPortal(): Observable<ApiResponse<ConfigPortalModel>> {
    return this.http.get<ApiResponse<ConfigPortalModel>>(`${this.base}/config-portal`);
  }

  getDynamicPage(id: number | string): Observable<ApiResponse<DynamicPageModel[]>> {
    return this.http.get<ApiResponse<DynamicPageModel[]>>(`${this.base}/portal-dynamic-page-data/${id}`);
  }

  getFooter(): Observable<ApiResponse<FooterModel>> {
    return this.http.get<ApiResponse<FooterModel>>(`${this.base}/portal-footer`);
  }

  getSSWPageData(id: number | string): Observable<ApiResponse<SearchSSWPageModel[]>> {
    return this.http.get<ApiResponse<SearchSSWPageModel[]>>(`${this.base}/portal-search-ssw-page-data/${id}`);
  }
}
