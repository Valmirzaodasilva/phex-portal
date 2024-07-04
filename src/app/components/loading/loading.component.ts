import { Component } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
