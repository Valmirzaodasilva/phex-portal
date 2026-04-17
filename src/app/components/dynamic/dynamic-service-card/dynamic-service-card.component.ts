import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DynamicComponent, DynamicDataComponent } from '../../../core/models';

@Component({
  selector: 'app-dynamic-service-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (item of items(); track $index) {
          <div class="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white">
            @if (item.images && item.images.length > 0) {
              <img [src]="item.images[0]" [alt]="item.title || ''" class="w-full h-48 object-cover" />
            }
            <div class="p-6">
              @if (item.icon) {
                <div class="text-[#6f93cd] mb-2 text-2xl">{{ item.icon }}</div>
              }
              @if (item.title) {
                <h3 class="font-bold text-[#2d4b7b] text-lg mb-2">{{ item.title }}</h3>
              }
              @if (item.text) {
                <p class="text-gray-600 text-sm mb-4">{{ item.text }}</p>
              }
              @if (item.nameButton && item.linkButton) {
                <a
                  [href]="item.linkButton"
                  class="inline-block bg-[#6f93cd] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#2d4b7b] transition-colors"
                >{{ item.nameButton }}</a>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DynamicServiceCardComponent {
  component = input.required<DynamicComponent>();

  items(): DynamicDataComponent[] {
    return this.component().data.items ?? [this.component().data];
  }
}
