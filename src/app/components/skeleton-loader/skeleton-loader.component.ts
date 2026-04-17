import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="animate-pulse space-y-4">
      @for (i of rows; track i) {
        <div class="skeleton h-5 rounded" [style.width]="widths[i % widths.length]"></div>
      }
    </div>
  `,
})
export class SkeletonLoaderComponent {
  @Input() count = 4;

  readonly widths = ['100%', '85%', '92%', '75%', '88%'];

  get rows(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
}
