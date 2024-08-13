import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ImagesService {
  private url: string = environment.apiUrl;

  getImages(nameImage: string): string {
    return `${this.url}/uploads/${nameImage}`;
  }
}
