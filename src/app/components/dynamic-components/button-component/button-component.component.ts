import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataComponent } from '../../../core/models/dynamic-page.model';

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="btn-comp container" [style.text-align]="getAlign()">
      @for (item of data; track item.id) {
        @if (isExternal(item.url || '')) {
          <a
            class="dynamic-btn"
            [href]="item.url"
            target="_blank"
            rel="noopener noreferrer"
            [style.background-color]="item.textColor || 'var(--color-primary)'"
          >
            {{ item.textButton || item.text }}
            <span class="material-icons btn-icon">open_in_new</span>
          </a>
        } @else {
          <a
            class="dynamic-btn"
            [routerLink]="item.url"
            [style.background-color]="item.textColor || 'var(--color-primary)'"
          >
            {{ item.textButton || item.text }}
          </a>
        }
      }
    </div>
  `,
  styles: [`
    .btn-comp { padding: 1.5rem 0; }
    .dynamic-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      color: white;
      font-weight: 600;
      font-size: 0.9375rem;
      border-radius: var(--radius-md);
      transition: filter var(--transition-fast), transform var(--transition-fast);
      min-height: 44px;
      
      &:hover {
        filter: brightness(0.9);
        transform: translateY(-1px);
      }
    }
    .btn-icon { font-size: 0.875rem; }
  `]
})
export class ButtonComponentComponent {
  @Input({ required: true }) data!: DataComponent[];

  getAlign(): string {
    const align = this.data?.[0]?.alignment;
    if (align === 'LEFT') return 'left';
    if (align === 'RIGHT') return 'right';
    return 'center';
  }

  isExternal(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
  }
}
