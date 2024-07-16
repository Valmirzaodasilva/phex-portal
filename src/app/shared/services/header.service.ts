import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { NavigationMenuModel } from '../models/navigation-menu.model';
import { HttpClient } from '@angular/common/http'; // Import the 'HttpClient' module
import { ResponseModel } from '../models/reponse.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private apiUrl = `http://localhost:4201/api/menu-portal-list`;

  private menuActiveSubject = new BehaviorSubject<string>('1');
  public menuActive$ = this.menuActiveSubject.asObservable();

  private menuListSubject = new Subject<NavigationMenuModel[]>();
  public menuList$ = this.menuListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getNavigationMenu().subscribe((data) => {
      console.log('data 123901283', data)
      this.menuListSubject.next(data.response);
    });
  }

  setMenuActive(idMenu: string): void {
    this.menuActiveSubject.next(idMenu);
  }

  //   private getNavigationMenu(): Observable<
  //   ResponseModel<NavigationMenuModel[]>
  // > {
  //   return this.http.get<ResponseModel<NavigationMenuModel[]>>(
  //     `${this.apiUrl}`
  //   );
  // }
  // }

  getNavigationMenu(): Observable<ResponseModel<NavigationMenuModel[]>> {
    return of({
      message: 'Menu list fetched successfully',
      response: [
        {
          id: '1',
          name: 'Sobre a Phex',
          url: '/home',
        },
        {
          id: '2',
          name: 'Serviços',
          url: '/services',
        },
        {
          id: '3',
          name: 'Abrangência',
          url: '/coverage',
        },
        {
          id: '4',
          name: 'Contact',
          url: '/contact',
        },
      ],
    });
  }
}
