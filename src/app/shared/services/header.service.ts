import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { NavigationMenuModel, NavigationMenuSSWModel } from '../models/navigation-menu.model';
import { HttpClient } from '@angular/common/http'; // Import the 'HttpClient' module
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private apiUrl = `${environment.apiUrl}/portal-menu-list`;
  private apiUrlSSW = `${environment.apiUrl}/portal-ssw-menu-list`;

  private menuActiveSubject = new BehaviorSubject<string>('1');
  public menuActive$ = this.menuActiveSubject.asObservable();

  private menuListSubject = new Subject<NavigationMenuModel[]>();
  public menuList$ = this.menuListSubject.asObservable();

  private menuListSSWSubject = new Subject<NavigationMenuSSWModel[]>();
  public menuListSSW$ = this.menuListSSWSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getNavigationMenu().subscribe((data) => {
      this.menuListSubject.next(data.response);
    });

    this.getNavigationMenuSSW().subscribe((data) => {
      this.menuListSSWSubject.next(data.response);
    });
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
}
