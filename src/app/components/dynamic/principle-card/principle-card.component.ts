import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faIcons, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconService } from 'src/app/shared/utils/icon-service';

class DynamicPrincipleModel {
  icon: string;
  title: string;
  text: string;
  textColor: string;
  iconSize: number;
  screenSize: number;
  idDynamicComponent: number;
}

@Component({
  selector: 'app-principle-card',
  templateUrl: './principle-card.component.html',
  styleUrls: ['./principle-card.component.scss'],
})
export class PrincipleCardComponent implements OnChanges {
  @Input()
  data: Array<DynamicPrincipleModel>;

  dataDisplay: Array<DynamicPrincipleModel>;

  faIcons: Array<IconDefinition> = [];
  faIconDefault = faIcons;

  constructor(private iconService: IconService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.dataDisplay = changes['data'].currentValue;
      this.getIconLoadedUtils();
    }
  }

  async getIconLoadedUtils(): Promise<void> {
    this.dataDisplay.forEach(async (item) => {
      const iconDefinition = await this.iconService.getFontAwesomeIcon(item.icon);
      this.faIcons.push(iconDefinition);
    });
  }
}
