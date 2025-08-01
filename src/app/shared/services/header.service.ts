import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, Subject } from 'rxjs';
import { NavigationMenuModel, NavigationMenuSSWModel } from '../models/navigation-menu.model';
import { HttpClient } from '@angular/common/http'; // Import the 'HttpClient' module
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environments/environment';
import { ConfigPortalModel } from '../models/config-portal.model';
import { LoadingService } from './loading.service';
import { RequestOnloadService } from './request-onload.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private apiUrl = `${environment.apiUrl}/portal-menu-list`;
  private apiUrlSSW = `${environment.apiUrl}/portal-ssw-menu-list`;
  private contactPageUrl = `${environment.apiUrl}/config-portal`;

  private menuActiveSubject = new BehaviorSubject<string>('1');
  public menuActive$ = this.menuActiveSubject.asObservable();

  private menuListSubject = new Subject<NavigationMenuModel[]>();
  public menuList$ = this.menuListSubject.asObservable();

  private menuListSSWSubject = new Subject<NavigationMenuSSWModel[]>();
  public menuListSSW$ = this.menuListSSWSubject.asObservable();

  private configPortalSubject = new Subject<ConfigPortalModel>();
  public configPortal$ = this.configPortalSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private requestOnloadService: RequestOnloadService
  ) {
    this.loadingService.show();

    setTimeout(() => {
      forkJoin({
        menu: this.getNavigationMenu(),
        menuSSW: this.getNavigationMenuSSW(),
        config: this.getConfigPortal(),
      }).subscribe({
        next: (results) => {
          this.menuListSubject.next(results.menu.response);
          this.menuListSSWSubject.next(results.menuSSW.response);
          this.configPortalSubject.next(results.config.response);
        },
        error: (err) => {
          console.error('Erro ao carregar os dados:', err);
        },
        complete: () => {
          this.requestOnloadService.addRequestOnloadFinished();
        },
      });
    }, 3000);
  }

  setMenuActive(idMenu: string): void {
    this.menuActiveSubject.next(idMenu);
  }

  private getNavigationMenu(): Observable<ResponseModel<NavigationMenuModel[]>> {
    return this.http.get<ResponseModel<NavigationMenuModel[]>>(`${this.apiUrl}`);
  }

  private getNavigationMenuSSW(): Observable<ResponseModel<NavigationMenuSSWModel[]>> {
    return this.http.get<ResponseModel<NavigationMenuSSWModel[]>>(`${this.apiUrlSSW}`);
  }

  private getConfigPortal(): Observable<ResponseModel<ConfigPortalModel>> {
    return this.http.get<ResponseModel<ConfigPortalModel>>(`${this.contactPageUrl}`);
  }
}
