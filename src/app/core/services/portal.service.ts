import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, DynamicPageData, MenuPortal } from '../models';

@Injectable({ providedIn: 'root' })
export class PortalService {
  private readonly apiUrl = environment.apiUrl;

  private _menus = signal<MenuPortal[]>([]);
  readonly menus = this._menus.asReadonly();

  private _activeMenuId = signal<number | null>(null);
  readonly activeMenuId = this._activeMenuId.asReadonly();

  constructor(private http: HttpClient) {}

  loadMenus(): Observable<ApiResponse<MenuPortal[]>> {
    return this.http.get<ApiResponse<MenuPortal[]>>(`${this.apiUrl}/portal-menu-list`).pipe(
      tap(res => this._menus.set(res.response ?? []))
    );
  }

  getDynamicPageData(id: number): Observable<ApiResponse<DynamicPageData[]>> {
    return this.http.get<ApiResponse<DynamicPageData[]>>(`${this.apiUrl}/portal-dynamic-page-data/${id}`);
  }

  setActiveMenu(id: number): void {
    this._activeMenuId.set(id);
  }
}
