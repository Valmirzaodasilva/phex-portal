import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactPageModel } from '../models/contact-page.model';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactPageService {
  private apiUrl = `${environment.apiUrl}/contact-page`;

  constructor(private http: HttpClient) {}

  getContactPageData(id: string): Observable<ResponseModel<ContactPageModel>> {
    return this.http.get<ResponseModel<ContactPageModel>>(`${this.apiUrl}`);
  }
}
