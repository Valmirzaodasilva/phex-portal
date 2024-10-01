import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoveragePageService {
  private apiUrl = `${environment.apiUrl}/coverage-page`;

  constructor(private http: HttpClient) {}

  // TODO: Add return type
  getContactPageData(): Observable<ResponseModel<any>> {
    return this.http.get<ResponseModel<any>>(`${this.apiUrl}-list`);
  }
}
