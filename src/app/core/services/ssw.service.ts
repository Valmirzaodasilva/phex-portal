import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SswService {
  private readonly http = inject(HttpClient);
  private readonly proxyUrl = `${environment.apiUrl}/api-ssw-proxy`;

  search(formData: Record<string, unknown>): Observable<string> {
    return this.http.post(this.proxyUrl, formData, { responseType: 'text' });
  }
}
