import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FooterModel } from 'src/app/shared/models/footer.model';
import { FooterService } from 'src/app/shared/services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private subscriptions = new Subscription();

  dataFooterDisplay: FooterModel;

  constructor(private footerService: FooterService) {
    this.subscriptions.add(
      this.footerService.getFooterData().subscribe((data) => {
        this.dataFooterDisplay = data;
      })
    );
  }
}
