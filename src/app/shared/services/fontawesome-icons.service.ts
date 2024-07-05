import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fontawesomeIconsMocks } from '../mocks/fontawesome.mock';

@Injectable({
  providedIn: 'root',
})
export class FontawesomeIconsService {
  getFontawesomeIcons(): Observable<Array<string>> {
    // TODO: criar requisição para buscar a página dinâmica
    const returnData: Array<string> = fontawesomeIconsMocks.icons;
    return of(returnData);
  }
}
