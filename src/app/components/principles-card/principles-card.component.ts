import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataComponentModel } from '../../core/models/dynamic-component.model';

@Component({
  selector: 'app-principles-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full py-8 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (item of dataComponents; track item.id ?? $index) {
          <div class="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            @if (item.icon) {
              <span
                class="material-icons mb-4"
                [style.fontSize.px]="item.iconSize || 48"
                style="color: #6f93cd;"
              >{{ item.icon }}</span>
            }
            @if (item.title) {
              <h3 class="font-bold text-lg mb-2" style="color: #2d4b7b;">{{ item.title }}</h3>
            }
            @if (item.text) {
              <p class="text-sm leading-relaxed" [style.color]="item.textColor || '#6b7280'">{{ item.text }}</p>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class PrinciplesCardComponent {
  @Input({ required: true }) dataComponents!: DataComponentModel[];
}
