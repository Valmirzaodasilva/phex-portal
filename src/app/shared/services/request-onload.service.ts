import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class RequestOnloadService {
  private readonly TOTAL_REQUEST_ONLOAD = 2; // FOOTER/HEADER
  private countTotalRequestOnload = 0;

  constructor(private loadingService: LoadingService) {}

  private verifyOnloadFinished(): void {
    if (this.countTotalRequestOnload >= this.TOTAL_REQUEST_ONLOAD) {
      this.loadingService.hide();
    }
  }

  public addRequestOnloadFinished(): void {
    this.countTotalRequestOnload++;
    this.verifyOnloadFinished();
  }
}
