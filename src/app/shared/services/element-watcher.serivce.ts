import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElementWatcherService {
  private intervalId: any;

  constructor() {}

  startWatching() {
    if (this.intervalId) return; // Evita múltiplas execuções

    this.intervalId = setInterval(() => {
      this.searchElements();
    }, 1000);
  }

  private searchElements() {
    // Busca no documento principal
    this.logElements(document, 'Página principal');

    // Busca dentro dos iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach((iframe, index) => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          this.logElements(iframeDoc, `Iframe ${index + 1}`);
        }
      } catch (error) {
        console.warn('Acesso ao iframe bloqueado por política de mesma origem:', error);
      }
    });
  }

  private logElements(doc: Document, context: string) {
    const elements = doc.querySelectorAll('.header-div1');
    elements.forEach((el, index) => {
      console.log(`[${context}] Elemento ${index + 1}:`, el);
    });
  }

  stopWatching() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
