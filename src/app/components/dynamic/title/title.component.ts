import { Component, Input, OnInit } from '@angular/core';
import { DataComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataTitleModel {
  title?: string;
  text?: string;
}

/**
 * @DOCUMENTATION
 * Requisitos: title, text
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
