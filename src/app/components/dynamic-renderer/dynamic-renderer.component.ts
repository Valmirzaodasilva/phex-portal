import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DynamicComponentModel } from '../../core/models/dynamic-component.model';
import { ComponentTypeEnum } from '../../core/models/enums';
import { TextComponentComponent } from '../text-component/text-component.component';
import { ButtonComponentComponent } from '../button-component/button-component.component';
import { PrinciplesCardComponent } from '../principles-card/principles-card.component';
import { InformationCardComponent } from '../information-card/information-card.component';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-dynamic-renderer',
  standalone: true,
  imports: [
    TextComponentComponent,
    ButtonComponentComponent,
    PrinciplesCardComponent,
    InformationCardComponent,
    ServiceCardComponent,
    BannerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (component.type) {
      @case (ComponentTypeEnum.TEXT) {
        @for (item of component.componenData; track item.id ?? $index) {
          <app-text-component [data]="item" />
        }
      }
      @case (ComponentTypeEnum.TITLE) {
        @for (item of component.componenData; track item.id ?? $index) {
          <div class="w-full py-6 px-4 text-center">
            <h2 class="font-bold text-3xl md:text-4xl" style="color: #2d4b7b;">{{ item.title }}</h2>
            @if (item.subtitle) {
              <p class="mt-2 text-lg text-gray-600">{{ item.subtitle }}</p>
            }
          </div>
        }
      }
      @case (ComponentTypeEnum.BUTTON) {
        @for (item of component.componenData; track item.id ?? $index) {
          <app-button-component [data]="item" />
        }
      }
      @case (ComponentTypeEnum.PRINCIPLES_CARD) {
        <app-principles-card [dataComponents]="component.componenData" />
      }
      @case (ComponentTypeEnum.INFORMATION_CARD) {
        <app-information-card [dataComponents]="component.componenData" />
      }
      @case (ComponentTypeEnum.SERVICE_CARD) {
        <app-service-card [dataComponents]="component.componenData" />
      }
      @case (ComponentTypeEnum.BANNER) {
        @for (item of component.componenData; track item.id ?? $index) {
          <app-banner [data]="item" />
        }
      }
    }
  `,
})
export class DynamicRendererComponent {
  @Input({ required: true }) component!: DynamicComponentModel;
  readonly ComponentTypeEnum = ComponentTypeEnum;
}
