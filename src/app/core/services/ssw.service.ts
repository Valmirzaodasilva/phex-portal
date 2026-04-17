import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, MenuPortal, SearchPageSSWData } from '../models';

@Injectable({ providedIn: 'root' })
export class SswService {
  private readonly apiUrl = environment.apiUrl;

  private _sswMenus = signal<MenuPortal[]>([]);
  readonly sswMenus = this._sswMenus.asReadonly();

  constructor(private http: HttpClient) {}

  loadSswMenus(): Observable<ApiResponse<MenuPortal[]>> {
    return this.http.get<ApiResponse<MenuPortal[]>>(`${this.apiUrl}/portal-ssw-menu-list`).pipe(
      tap(res => this._sswMenus.set(res.response ?? []))
    );
  }

  getSearchPageData(id: number): Observable<ApiResponse<SearchPageSSWData[]>> {
    return this.http.get<ApiResponse<SearchPageSSWData[]>>(`${this.apiUrl}/portal-search-ssw-page-data/${id}`);
  }

  searchSSW(endpoint: string, data: Record<string, unknown>): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/api-ssw-proxy`, { endpoint, data });
  }
}
