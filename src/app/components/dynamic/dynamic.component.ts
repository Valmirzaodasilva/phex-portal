import { Component, OnInit, Input } from '@angular/core';
import { ComponentTypeEnum } from 'src/app/shared/enums/component-type-enum.enum';
import { DynamicComponentModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
})
export class DynamicComponent implements OnInit {
  @Input() component: DynamicComponentModel;

  componentData = [];

  ngOnInit(): void {
    this.componentData = this.component.data;
  }

  get isComponentTitle(): boolean {
    return this.component.type === ComponentTypeEnum.TITLE;
  }

  get isComponentText(): boolean {
    return this.component.type === ComponentTypeEnum.TEXT;
  }

  get isComponentHero(): boolean {
    return this.component.type === ComponentTypeEnum.HERO;
  }

  get isComponentImage(): boolean {
    return this.component.type === ComponentTypeEnum.IMAGE;
  }

  get isComponentButton(): boolean {
    return this.component.type === ComponentTypeEnum.BUTTON;
  }
}
