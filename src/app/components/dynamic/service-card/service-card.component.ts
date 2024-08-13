import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImagesService } from 'src/app/shared/services/images.service';

class ServiceItemModel {
  icon: string;
  title: string;
  text: string;
  textColor: string;
  nameButton: string;
  url: string;
  iconSize: number;
  images: Array<string>;
}

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnChanges {
  @Input() data: ServiceItemModel;

  dataDisplay: Array<ServiceItemModel>;

  constructor(private imagesService: ImagesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.dataDisplay = changes['data'].currentValue;
    }
  }

  getImageUrl(image: Array<string>): string {
    let firstImage = image[0];
    return this.imagesService.getImages(firstImage);
  }
}
