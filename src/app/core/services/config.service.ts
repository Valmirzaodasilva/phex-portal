import { Injectable, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { PortalApiService } from './portal-api.service';
import { MenuModel, MenuSSWModel } from '../models/menu.model';
import { ConfigPortalModel } from '../models/config-portal.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly api = inject(PortalApiService);

  readonly menuList = signal<MenuModel[]>([]);
  readonly sswMenuList = signal<MenuSSWModel[]>([]);
  readonly config = signal<ConfigPortalModel>({});
  readonly loaded = signal(false);

  load(): Promise<void> {
    return new Promise((resolve) => {
      forkJoin({
        menu: this.api.getMenuList(),
        sswMenu: this.api.getSSWMenuList(),
        config: this.api.getConfigPortal(),
      }).subscribe({
        next: ({ menu, sswMenu, config }) => {
          this.menuList.set(menu.response ?? []);
          this.sswMenuList.set(sswMenu.response ?? []);
          this.config.set(config.response ?? {});
          this.loaded.set(true);
          resolve();
        },
        error: (err) => {
          console.error('Error loading portal config:', err);
          this.loaded.set(true);
          resolve();
        },
      });
    });
  }
}
