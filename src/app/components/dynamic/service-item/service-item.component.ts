import { Component, Input, OnInit } from '@angular/core';
import { DataComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';
import { FontawesomeIconsService } from 'src/app/shared/services/fontawesome-icons.service';

class DataServiceItemModel {
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
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent implements OnInit {
  @Input() data: DataComponentModel;

  dataDisplay: Array<DataServiceItemModel>;

  constructor(private fontawesomeIconsService: FontawesomeIconsService) {}

  ngOnInit(): void {
    this.dataDisplay = this.data as Array<DataServiceItemModel>;
  }
}
