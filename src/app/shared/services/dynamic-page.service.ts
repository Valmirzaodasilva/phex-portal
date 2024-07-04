import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { DynamicPageModel } from '../models/dynamic-page-models/dynamic-page.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicPageService {
  constructor() {}

  getDynamicPageData(id: string): Observable<DynamicPageModel> {
    const returnData: DynamicPageModel = {
      title: 'Dynamic Page 1',
      subtitle: 'This is a dynamic page',
      components: [],
    };

    const returnDataTwo: DynamicPageModel = {
      title: 'Dynamic Page 2',
      subtitle: 'This is a dynamic page',
      components: [],
    };

    if (id === '1') {
      return of(returnData);
    } else if (id === '2') {
      return of(returnDataTwo);
    }

    return of(returnData);
  }
}
