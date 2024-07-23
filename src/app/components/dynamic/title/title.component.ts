import { Component, Input, OnInit } from '@angular/core';
import { ALIGN_ENUM } from 'src/app/shared/enums/align-enum.enum';
import { DataComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataTitleModel {
  text: string;
  text_color?: string;
  alignment?: ALIGN_ENUM;
  size_mobile?: number;
  size_tablet?: number;
  size_desktop?: number;
  dynamic_component_id?: number;
}

/**
 * @DOCUMENTATION
 * Requisitos: text
 * Obs: atualize o ComponentTypeEnum
 */

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  @Input() data: DataComponentModel;

  dataDisplay: DataTitleModel;

  ngOnInit(): void {
    this.dataDisplay = this.data[0];
  }
}
