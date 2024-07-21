import { Component, OnInit, Input } from '@angular/core';
import { COMPONENT_TYPE_ENUM } from 'src/app/shared/enums/component-type-enum.enum';
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
    this.componentData = this.component.component_data;
  }

  get isComponentTitle(): boolean {
    return this.component.type === COMPONENT_TYPE_ENUM.TITLE;
  }

  get isComponentText(): boolean {
    return this.component.type === COMPONENT_TYPE_ENUM.TEXT;
  }

  get isComponentButton(): boolean {
    return this.component.type === COMPONENT_TYPE_ENUM.BUTTON;
  }

  get isComponentPrinciplesCard(): boolean {
    return this.component.type === COMPONENT_TYPE_ENUM.PINCIPLES_CARD;
  }

  get isComponentInformationCard(): boolean {
    return this.component.type === COMPONENT_TYPE_ENUM.INFORMATION_CARD;
  }

  get isComponentServiceCard(): boolean {
    return this.component.type === COMPONENT_TYPE_ENUM.SERVICE_CARD;
  }

  get isComponentBanner(): boolean {
    return this.component.type === COMPONENT_TYPE_ENUM.BANNER;
  }
}
