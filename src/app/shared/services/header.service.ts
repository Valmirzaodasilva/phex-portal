import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';
import { NavigationMenuModel } from '../models/navigation-menu.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private menuActiveSubject = new BehaviorSubject<string>('1');
  public menuActive$ = this.menuActiveSubject.asObservable();

  constructor() {}

  setMenuActive(idMenu: string): void {
    this.menuActiveSubject.next(idMenu);
  }

  getNavigationMenu(): Observable<Array<NavigationMenuModel>> {
    return of([
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
    ]);
  }
}
