import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponent } from '../../../core/models/dynamic-page.model';
import { TextComponentComponent } from '../text-component/text-component.component';
import { ButtonComponentComponent } from '../button-component/button-component.component';
import { PrinciplesCardComponentComponent } from '../principles-card-component/principles-card-component.component';
import { InformationCardComponentComponent } from '../information-card-component/information-card-component.component';
import { ServiceCardComponentComponent } from '../service-card-component/service-card-component.component';
import { BannerComponentComponent } from '../banner-component/banner-component.component';

@Component({
  selector: 'app-dynamic-component-renderer',
  standalone: true,
  imports: [
    CommonModule,
    TextComponentComponent,
    ButtonComponentComponent,
    PrinciplesCardComponentComponent,
    InformationCardComponentComponent,
    ServiceCardComponentComponent,
    BannerComponentComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (component.type) {
      @case ('TEXT') { <app-text-component [data]="component.componenData" /> }
      @case ('TITLE') { <app-text-component [data]="component.componenData" [isTitle]="true" /> }
      @case ('BUTTON') { <app-button-component [data]="component.componenData" /> }
      @case ('PRINCIPLES_CARD') { <app-principles-card-component [data]="component.componenData" /> }
      @case ('INFORMATION_CARD') { <app-information-card-component [data]="component.componenData" /> }
      @case ('SERVICE_CARD') { <app-service-card-component [data]="component.componenData" /> }
      @case ('BANNER') { <app-banner-component [data]="component.componenData" /> }
    }
  `
})
export class DynamicComponentRendererComponent {
  @Input({ required: true }) component!: DynamicComponent;
}
