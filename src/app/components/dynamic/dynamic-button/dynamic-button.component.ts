import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicComponent } from '../../../core/models';

@Component({
  selector: 'app-dynamic-button',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="px-4 py-3 flex"
         [class.justify-start]="component().data.alignment === 'LEFT'"
         [class.justify-center]="component().data.alignment === 'CENTER' || !component().data.alignment"
         [class.justify-end]="component().data.alignment === 'RIGHT'"
    >
      @if (isExternal()) {
        <a
          [href]="component().data.url"
          target="_blank"
          rel="noopener noreferrer"
          [style.backgroundColor]="component().data.color || '#6f93cd'"
          class="inline-block text-white px-6 py-3 rounded-lg font-medium hover:opacity-80 transition-opacity"
        >{{ component().data.text }}</a>
      } @else {
        <a
          [routerLink]="component().data.url"
          [style.backgroundColor]="component().data.color || '#6f93cd'"
          class="inline-block text-white px-6 py-3 rounded-lg font-medium hover:opacity-80 transition-opacity"
        >{{ component().data.text }}</a>
      }
    </div>
  `,
})
export class DynamicButtonComponent {
  component = input.required<DynamicComponent>();

  isExternal = computed((): boolean => {
    const url = this.component().data.url ?? '';
    return url.startsWith('http://') || url.startsWith('https://');
  });
}
