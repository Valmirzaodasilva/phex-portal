import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicPageModel } from '../models/dynamic-page-models/dynamic-page.model';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DynamicPageService {
  private apiUrl = `${environment.apiUrl}/portal-dynamic-page-data`;

  constructor(private http: HttpClient) {}

  getDynamicPageData(id: string): Observable<ResponseModel<DynamicPageModel[]>> {
    return this.http.get<ResponseModel<DynamicPageModel[]>>(`${this.apiUrl}/${id}`);
  }
}
