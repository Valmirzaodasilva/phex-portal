import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImagesService } from 'src/app/shared/services/images.service';

class DataBannerModel {
  title: string;
  subtitle: string;
  textColor: string;
  fontSize: number;
  images: Array<string>;
  // idDynamicDataComponent
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnChanges {
  @Input()
  data: Array<DataBannerModel>;

  dataDisplay: DataBannerModel;

  private FIRST_INDEX = 0;

  constructor(private imagesService: ImagesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.dataDisplay = changes['data'].currentValue[this.FIRST_INDEX];
    }
  }

  getImageUrl(image: string): string {
    return this.imagesService.getImages(image);
  }
}
