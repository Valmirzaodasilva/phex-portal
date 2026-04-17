import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchPageSSWData } from '../models/ssw.model';
import { ResponseModel } from '../models/response.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SswService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSearchPageData(id: number): Observable<SearchPageSSWData> {
    return this.http
      .get<ResponseModel<SearchPageSSWData[]>>(`${this.apiUrl}/portal-search-ssw-page-data/${id}`)
      .pipe(map(res => res.response?.[0]));
  }

  search(params: Record<string, string>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api-ssw-proxy`, params);
  }
}
