import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from '../../../core/models/dynamic-page.model';

@Component({
  selector: 'app-text-component',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-comp container" [style.text-align]="getAlign()">
      @for (item of data; track $index) {
        @if (isTitle) {
          <h2 class="text-title" [style.color]="item.textColor || 'var(--color-dark)'" [style.font-size]="item.fontSize ? item.fontSize + 'rem' : null">
            {{ item.text }}
          </h2>
          @if (item.subtitle) {
            <p class="text-subtitle">{{ item.subtitle }}</p>
          }
        } @else {
          <div
            class="text-body"
            [style.color]="item.textColor || 'inherit'"
            [style.max-width]="item.screenSize ? item.screenSize + '%' : '100%'"
            [style.margin]="getAlign() === 'center' ? '0 auto' : getAlign() === 'right' ? '0 0 0 auto' : '0'"
          >
            @for (line of getLines(item.text || ''); track $index) {
              <p>{{ line }}</p>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .text-comp { padding: 2rem 0; }
    .text-title {
      font-weight: 700;
      margin-bottom: 0.5rem;
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        display: block;
        width: 60px;
        height: 3px;
        background: var(--color-primary);
        margin-top: 0.5rem;
        border-radius: 2px;
      }
    }
    .text-subtitle {
      color: var(--color-gray-600);
      font-size: 1.1rem;
      margin-top: 0.5rem;
    }
    .text-body p {
      margin-bottom: 0.75rem;
      color: inherit;
      line-height: 1.7;
      &:last-child { margin-bottom: 0; }
    }
  `]
})
export class TextComponentComponent {
  @Input({ required: true }) data!: DataComponent[];
  @Input() isTitle = false;

  getAlign(): string {
    const align = this.data?.[0]?.alignment;
    if (align === 'LEFT') return 'left';
    if (align === 'CENTER') return 'center';
    if (align === 'RIGHT') return 'right';
    return 'left';
  }

  getLines(text: string): string[] {
    return text.split('\n').filter(l => l.trim() !== '');
  }
}
