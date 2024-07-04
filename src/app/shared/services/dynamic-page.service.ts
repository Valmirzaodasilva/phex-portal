import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicPageModel } from '../models/dynamic-page-models/dynamic-page.model';
import { mockHome } from '../../shared/mocks/pages.mock';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicPageService {
  constructor() {}

  getDynamicPageData(id: string): Observable<DynamicPageModel> {
    // TODO: criar requisição para buscar a página dinâmica
    const returnData: DynamicPageModel = mockHome;
    return of(returnData);
  }
}
