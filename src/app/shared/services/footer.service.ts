import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FooterModel } from '../models/footer.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/reponse.model';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private apiUrl = `${environment.apiUrl}/portal-footer`;

  constructor(private http: HttpClient) {}

  getFooterData(): Observable<ResponseModel<FooterModel>> {
    return this.http.get<ResponseModel<FooterModel>>(`${this.apiUrl}`);
  }
}
