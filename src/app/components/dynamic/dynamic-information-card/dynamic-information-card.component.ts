import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DynamicComponent, DynamicDataComponent } from '../../../core/models';

@Component({
  selector: 'app-dynamic-information-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        @for (item of items(); track $index) {
          <div class="border border-[#d1e2ff] rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow bg-white">
            @if (item.icon) {
              <div class="text-[#6f93cd] flex-shrink-0">
                <span [style.fontSize]="item.iconSize || '2rem'">{{ item.icon }}</span>
              </div>
            }
            <div>
              @if (item.title) {
                <h3 class="font-bold text-[#2d4b7b] text-lg mb-2">{{ item.title }}</h3>
              }
              @if (item.text) {
                <p [style.color]="item.textColor || '#374151'" class="text-sm leading-relaxed">{{ item.text }}</p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DynamicInformationCardComponent {
  component = input.required<DynamicComponent>();

  items(): DynamicDataComponent[] {
    return this.component().data.items ?? [this.component().data];
  }
}
