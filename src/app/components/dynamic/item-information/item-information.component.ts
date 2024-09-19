import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faIcons, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconService } from 'src/app/shared/utils/icon-service';

class ItemInformationModel {
  icon: string;
  title: string;
  text: string;
  textColor: string;
  iconSize: number;
  screenSize: number;
  idDynamicComponent: number;
}

@Component({
  selector: 'app-item-information',
  templateUrl: './item-information.component.html',
  styleUrls: ['./item-information.component.scss'],
})
export class ItemInformationComponent implements OnChanges {
  @Input()
  data: Array<ItemInformationModel>;

  dataDisplay: Array<ItemInformationModel>;

  faIcons: Array<IconDefinition> = [];
  faIconDefault = faIcons;

  constructor(private iconService: IconService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.dataDisplay = changes['data'].currentValue;
      this.getIconLoadedUtils();
    }
  }

  getSizeIconAdjust(iconSize: number): number {
    return iconSize >= 1 && iconSize <= 5 ? 6 - iconSize : 0;
  }

  async getIconLoadedUtils(): Promise<void> {
    this.dataDisplay.forEach(async (item) => {
      const iconDefinition = await this.iconService.getFontAwesomeIcon(item.icon);
      this.faIcons.push(iconDefinition);
    });
  }
}
