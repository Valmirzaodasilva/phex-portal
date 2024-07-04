import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FooterModel } from '../models/footer.model';
import { mockDefault } from '../mocks/footer.mock';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor() {}

  getFooterData(): Observable<FooterModel> {
    // TODO: criar requisição para buscar a página dinâmica
    const returnData: FooterModel = mockDefault;
    return of(returnData);
  }
}
