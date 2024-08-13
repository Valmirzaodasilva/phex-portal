import { Component, Input } from '@angular/core';
import { DataComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataServiceCardModel {
  icon: string;
  title: string;
  text: string;
  textColor: string;
  nameButton: string;
  iconSize: number;
  screenSize: number;
  images: string[];
}

/**
 * @DOCUMENTATION
 * Requisitos: title, text, icon, buttonText, buttonLink, sizeIcon, sizeMobile, sizeTablet, sizeDesktop
 * Obs: atualize o ComponentTypeEnum
 */

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent {
  @Input() data: DataComponentModel;
}
