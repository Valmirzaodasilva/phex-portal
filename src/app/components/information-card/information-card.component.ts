import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataComponentModel } from '../../core/models/dynamic-component.model';

@Component({
  selector: 'app-information-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full py-8 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        @for (item of dataComponents; track item.id ?? $index) {
          <div
            class="bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4"
            style="border-left-color: #6f93cd;"
          >
            @if (item.icon) {
              <span
                class="material-icons flex-shrink-0 mt-0.5"
                [style.fontSize.px]="item.iconSize || 32"
                style="color: #2d4b7b;"
              >{{ item.icon }}</span>
            }
            <div>
              @if (item.title) {
                <h3 class="font-semibold text-base mb-1" style="color: #2d4b7b;">{{ item.title }}</h3>
              }
              @if (item.text) {
                <p class="text-sm leading-relaxed" [style.color]="item.textColor || '#6b7280'">{{ item.text }}</p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class InformationCardComponent {
  @Input({ required: true }) dataComponents!: DataComponentModel[];
}
