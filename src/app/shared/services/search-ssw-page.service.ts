import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/reponse.model';
import { environment } from 'src/environments/environment';
import { InputSearchModel, SearchSSWPageModel } from '../models/search-ssw-page-models/search-ssw-page-model';

@Injectable({
  providedIn: 'root',
})
export class SearchSSWPageService {
  private apiUrl = `${environment.apiUrl}/portal-search-ssw-page-data`;

  constructor(private http: HttpClient) {}

  getSearchSSWPageData(id: string): Observable<ResponseModel<SearchSSWPageModel[]>> {
    return this.http.get<ResponseModel<SearchSSWPageModel[]>>(`${this.apiUrl}/${id}`);
  }


  searchSSW(endpoint: string, requestData: InputSearchModel): Observable<any> { 
    // curl
    // -X GET
    // -H 'Authorization: c5c8fef6610893b3d52d6442d73b7814a6e35ee54624e44bf5712b88bdcdff9e'
    // -H 'Content-Type: application/json'
    // 'https://ssw.inf.br/api/consultaGenerica/consultaClientes?idCliente=73938678000131'
    
    return this.http.post<any>(`${endpoint}`, requestData);
  }

}
