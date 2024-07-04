import { Component, Input, OnInit } from '@angular/core';
import { DataComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

class DataTextModel {
  text: string;
  sizeMobile: number; // 1-12
  sizeTablet: number; // 1-12
  sizeDesktop: number; // 1-12
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
