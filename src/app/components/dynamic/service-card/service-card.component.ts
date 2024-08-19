import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faIcons, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ALIGN_ENUM } from 'src/app/shared/enums/align-enum.enum';
import { ImagesService } from 'src/app/shared/services/images.service';
import { IconService } from 'src/app/shared/utils/icon-service';

class ServiceItemModel {
  icon: string;
  title: string;
  text: string;
  textColor: string;
  nameButton: string;
  url: string;
  iconSize: number;
  alignment: ALIGN_ENUM;
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

  faIcons: Array<IconDefinition> = [faIcons];
  faIconDefault = faIcons;

  ALIGN_ENUM = ALIGN_ENUM;

  constructor(private imagesService: ImagesService, private iconService: IconService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.dataDisplay = changes['data'].currentValue;
      this.getIconLoadedUtils();
    }
  }

  getImageUrl(image: Array<string>): string {
    let firstImage = image[0];
    return this.imagesService.getImages(firstImage);
  }

  private async getIconLoadedUtils(): Promise<void> {
    this.dataDisplay.forEach(async (item) => {
      const iconDefinition = await this.iconService.getFontAwesomeIcon(item.icon);
      this.faIcons.push(iconDefinition);
    });
  }
}
