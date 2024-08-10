import { Component, Input, OnInit } from '@angular/core';
import { DataComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataServiceCardModel {
  title?: string;
  text?: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
  sizeIcon?: string;
  sizeMobile?: string;
  sizeTablet?: string;
  sizeDesktop?: string;
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
export class ServiceCardComponent implements OnInit {
  @Input() data: DataComponentModel;

  dataDisplay: Array<DataServiceCardModel>;

  ngOnInit(): void {
    this.dataDisplay = this.data as Array<DataServiceCardModel>;
  }
}
