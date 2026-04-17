import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { DynamicPageData, DynamicComponent } from '../../../core/models';
import { DynamicTextComponent } from '../dynamic-text/dynamic-text.component';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';
import { DynamicPrinciplesCardComponent } from '../dynamic-principles-card/dynamic-principles-card.component';
import { DynamicInformationCardComponent } from '../dynamic-information-card/dynamic-information-card.component';
import { DynamicServiceCardComponent } from '../dynamic-service-card/dynamic-service-card.component';
import { DynamicBannerComponent } from '../dynamic-banner/dynamic-banner.component';

@Component({
  selector: 'app-dynamic-page-renderer',
  standalone: true,
  imports: [
    DynamicTextComponent,
    DynamicButtonComponent,
    DynamicPrinciplesCardComponent,
    DynamicInformationCardComponent,
    DynamicServiceCardComponent,
    DynamicBannerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      @for (comp of sortedComponents(); track comp.id) {
        @switch (comp.type) {
          @case ('TEXT') { <app-dynamic-text [component]="comp" /> }
          @case ('BUTTON') { <app-dynamic-button [component]="comp" /> }
          @case ('PRINCIPLES_CARD') { <app-dynamic-principles-card [component]="comp" /> }
          @case ('INFORMATION_CARD') { <app-dynamic-information-card [component]="comp" /> }
          @case ('SERVICE_CARD') { <app-dynamic-service-card [component]="comp" /> }
          @case ('BANNER') { <app-dynamic-banner [component]="comp" /> }
        }
      }
    </div>
  `,
})
export class DynamicPageRendererComponent {
  pageData = input.required<DynamicPageData>();

  sortedComponents = computed((): DynamicComponent[] =>
    [...(this.pageData().components ?? [])].sort((a, b) => a.order - b.order)
  );
}
