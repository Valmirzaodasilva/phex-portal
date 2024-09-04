import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environments/environment';
import { SearchSSWPageModel } from '../models/search-ssw-page-models/search-ssw-page-model';

@Injectable({
  providedIn: 'root',
})
export class SearchSSWPageService {
  private apiUrl = `${environment.apiUrl}/portal-search-ssw-page-data`;

  constructor(private http: HttpClient) {}

  getSearchSSWPageData(id: string): Observable<ResponseModel<SearchSSWPageModel[]>> {
    return this.http.get<ResponseModel<SearchSSWPageModel[]>>(`${this.apiUrl}/${id}`);
  }
}
