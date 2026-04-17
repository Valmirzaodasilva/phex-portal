import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DynamicPageData } from '../models/dynamic-page.model';
import { ResponseModel } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class DynamicPageService {
  private apiUrl = `${environment.apiUrl}/portal-dynamic-page-data`;

  constructor(private http: HttpClient) {}

  getDynamicPageData(id: number): Observable<DynamicPageData> {
    return this.http.get<ResponseModel<DynamicPageData[]>>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.response?.[0])
    );
  }
}
