import { Component, Input, OnInit } from '@angular/core';
import { DataComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataTextModel {
  text: string;
  textColor: string;
  screenSize: number;
}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() data: DataComponentModel;

  dataDisplay: Array<DataTextModel>;

  ngOnInit(): void {
    this.dataDisplay = this.data as Array<DataTextModel>;
  }
}
