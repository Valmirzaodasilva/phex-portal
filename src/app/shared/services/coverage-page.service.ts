import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoveragePageService {
  private apiUrlSSW = `${environment.apiUrlSSW}`;

  constructor(private http: HttpClient) {}

  getAreas(uf: string): any { 
    const body = new URLSearchParams();
    body.set('sigla_emp', 'PHX');
    body.set('find', 'U');
    body.set('uf', uf);
    body.set('cidadeori', 'CUIABA / MT');
    body.set('cidadedes', '');
    body.set('type', 'uf');
    body.set('co', 'CUIABA / MT');
    body.set('ufe', uf);

    const url = `${this.apiUrlSSW}`;

    return this.http.post(url, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'text'
    });
  }

  getUfe(uf: string): string {
    let ufe = '';
    switch (uf) {
      case 'AC': return  ufe = '(AC) Acre';
      case 'AL': return  ufe = '(AL) Alagoas';
      case 'AM': return  ufe = '(AM) Amazonas';
      case 'AP': return  ufe = '(AP) Amapá';
      case 'BA': return  ufe = '(BA) Bahia';
      case 'CE': return  ufe = '(CE) Ceará';
      case 'DF': return  ufe = '(DF) Distrito Federal';
      case 'ES': return  ufe = '(ES) Espírito Santo';
      case 'GO': return  ufe = '(GO) Goiás';
      case 'MA': return  ufe = '(MA) Maranhão';
      case 'MT': return  ufe = '(MT) Mato Grosso';
      case 'MS': return  ufe = '(MS) Mato Grosso do Sul';
      case 'MG': return  ufe = '(MG) Minas Gerais';
      case 'PA': return  ufe = '(PA) Pará';
      case 'PB': return  ufe = '(PB) Paraíba';
      case 'PR': return  ufe = '(PR) Paraná';
      case 'PE': return  ufe = '(PE) Pernambuco';
      case 'PI': return  ufe = '(PI) Piauí';
      case 'RJ': return  ufe = '(RJ) Rio de Janeiro';
      case 'RN': return  ufe = '(RN) Rio Grande do Norte';
      case 'RS': return  ufe = '(RS) Rio Grande do Sul';
      case 'RO': return  ufe = '(RO) Rondônia';
      case 'RR': return  ufe = '(RR) Roraima';
      case 'SC': return  ufe = '(SC) Santa Catarina';
      case 'SP': return  ufe = '(SP) São Paulo';
      case 'SE': return  ufe = '(SE) Sergipe';
      case 'TO': return  ufe = '(TO) Tocantins';
      default: return  ufe = 'Estado não encontrado';
    }
    return ufe;
  }
}
