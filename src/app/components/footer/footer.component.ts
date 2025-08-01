import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FooterModel } from 'src/app/shared/models/footer.model';
import { FooterService } from 'src/app/shared/services/footer.service';
import { IconService } from 'src/app/shared/utils/icon-service';
import { faX, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RequestOnloadService } from 'src/app/shared/services/request-onload.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
  dataFooterDisplay: FooterModel;
  faIconNone = faX;
  contact_icons: Array<IconDefinition> = [];
  social_icons: Array<IconDefinition> = [];

  private subscriptions = new Subscription();

  constructor(
    private iconService: IconService,
    private requestOnloadService: RequestOnloadService,
    private footerService: FooterService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.footerService.getFooterData().subscribe((data) => {
        this.dataFooterDisplay = data.response;
        this.getIconLoadedUtils();
        this.requestOnloadService.addRequestOnloadFinished();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getIconLoadedUtils(): void {
    this.dataFooterDisplay.contactInformation.forEach(async (element) => {
      this.contact_icons.push(
        await this.iconService.getFontAwesomeIcon(element.icon)
      );
    });

    this.dataFooterDisplay.social_media.forEach(async (element) => {
      this.social_icons.push(
        await this.iconService.getBrandFontAwesomeIcon(element.icon)
      );
    });
  }
}
