import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, ConfigPortal, FooterData } from '../models';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly apiUrl = environment.apiUrl;

  private _config = signal<ConfigPortal>({});
  readonly config = this._config.asReadonly();

  private _footer = signal<FooterData | null>(null);
  readonly footer = this._footer.asReadonly();

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<ApiResponse<ConfigPortal>> {
    return this.http.get<ApiResponse<ConfigPortal>>(`${this.apiUrl}/config-portal`).pipe(
      tap(res => this._config.set(res.response ?? {}))
    );
  }

  loadFooter(): Observable<ApiResponse<FooterData>> {
    return this.http.get<ApiResponse<FooterData>>(`${this.apiUrl}/portal-footer`).pipe(
      tap(res => this._footer.set(res.response ?? null))
    );
  }
}
