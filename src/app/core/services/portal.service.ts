import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MenuPortal, MenuPortalSSW } from '../models/menu.model';
import { FooterData } from '../models/footer.model';
import { ConfigPortal } from '../models/config-portal.model';
import { ResponseModel } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class PortalService {
  private apiUrl = environment.apiUrl;

  readonly menuList = signal<MenuPortal[]>([]);
  readonly sswMenuList = signal<MenuPortalSSW[]>([]);
  readonly footerData = signal<FooterData | null>(null);
  readonly configPortal = signal<ConfigPortal | null>(null);
  readonly initialized = signal(false);

  constructor(private http: HttpClient) {}

  async initialize(): Promise<void> {
    try {
      const results = await firstValueFrom(
        forkJoin({
          menu: this.http.get<ResponseModel<MenuPortal[]>>(`${this.apiUrl}/portal-menu-list`),
          sswMenu: this.http.get<ResponseModel<MenuPortalSSW[]>>(`${this.apiUrl}/portal-ssw-menu-list`),
          footer: this.http.get<ResponseModel<FooterData>>(`${this.apiUrl}/portal-footer`),
          config: this.http.get<ResponseModel<ConfigPortal>>(`${this.apiUrl}/config-portal`)
        })
      );

      this.menuList.set(results.menu.response ?? []);
      this.sswMenuList.set(results.sswMenu.response ?? []);
      this.footerData.set(results.footer.response ?? null);
      this.configPortal.set(results.config.response ?? null);
    } catch (error) {
      console.error('Failed to initialize portal:', error);
      this.menuList.set([]);
      this.sswMenuList.set([]);
    } finally {
      this.initialized.set(true);
    }
  }

  getMenuList() { return this.menuList; }
  getSSWMenuList() { return this.sswMenuList; }
  getFooterData() { return this.footerData; }
  getConfigPortal() { return this.configPortal; }
}
