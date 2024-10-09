import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class XmlSanitizerService {
  parseXml(xmlStr: string) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, 'text/xml');
    const resultSet = xmlDoc.getElementsByTagName('r');
    const dataArray: any[] = [];

    for (let i = 0; i < resultSet.length; i++) {
      const cidade = decodeURIComponent(resultSet[i].getElementsByTagName('cidade')[0].textContent || '');
      const prazo = resultSet[i].getElementsByTagName('prazo')[0].textContent || '';
      const cif = this.decodeHtmlEntities(resultSet[i].getElementsByTagName('cif')[0].textContent || '');
      const fob = this.decodeHtmlEntities(resultSet[i].getElementsByTagName('fob')[0].textContent || '');
      const tda = this.decodeHtmlEntities(resultSet[i].getElementsByTagName('tda')[0].textContent || '');
      const diasemana = this.organizeHtmlString(
        this.decodeHtmlEntities(resultSet[i].getElementsByTagName('diasemana')[0].textContent || '')
      );
      const centra = this.processCentra(
        this.decodeHtmlEntities(resultSet[i].getElementsByTagName('centra')[0].textContent || '')
      );

      const seq = resultSet[i].getElementsByTagName('seq')[0].textContent || '';

      dataArray.push({ cidade, prazo, cif, fob, tda, diasemana, centra, seq });
    }

    return dataArray;
  }

  // Método para decodificar entidades HTML (como `&Atilde;`, `&amp;`, etc.)
  decodeHtmlEntities(str: string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  // Método para tratar o objeto "centra"
  processCentra(centra: string) {
    const decodedCentra = decodeURIComponent(centra);
    // Remover tags <u> do texto
    const withoutUTags = decodedCentra.replace(/<\/?u>/g, '');
    const regex = /<a[^>]*>(.*?)<\/a>/;
    const match = regex.exec(withoutUTags);

    if (match && match[1]) {
      return match[1];
    }

    return centra;
  }

  // PARA DIAS DE SEMANA
  organizeHtmlString(encodedString) {
    // Decodificar a string para obter o HTML
    const decodedString = decodeURIComponent(encodedString);

    // Expressão regular para capturar o valor e a cor de cada <label>
    const regex = /<label style="color:([^"]+)">([^<]+)<\/label>/g;
    let match;
    const result = [];

    // Usar a regex para extrair os dados de cada <label>
    while ((match = regex.exec(decodedString)) !== null) {
      const color = match[1]; // Captura a cor do estilo
      const text = match[2]; // Captura o texto dentro do <label>

      // Criar um objeto com os dados e adicionar ao array resultante
      result.push({ color, text });
    }

    return result;
  }
}
