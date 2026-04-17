import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from '../../../core/models/dynamic-page.model';

@Component({
  selector: 'app-information-card-component',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="info-section">
      <div class="container">
        <div class="info-grid">
          @for (item of data; track $index) {
            <div class="info-card">
              @if (item.icon) {
                <div class="info-icon-wrap">
                  <span class="material-icons info-icon" [style.color]="item.textColor || 'var(--color-primary)'">{{ item.icon }}</span>
                </div>
              }
              <div class="info-content">
                @if (item.title) { <h4 class="info-title">{{ item.title }}</h4> }
                @if (item.text) { <p class="info-text">{{ item.text }}</p> }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .info-section { padding: 3rem 0; }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
      @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
      @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
    }
    .info-card {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--color-gray-100);
      border-radius: var(--radius-lg);
      border-left: 4px solid var(--color-primary);
      transition: background var(--transition-fast);
      
      &:hover { background: var(--color-light); }
    }
    .info-icon-wrap { flex-shrink: 0; }
    .info-icon { font-size: 1.75rem; }
    .info-content { flex: 1; }
    .info-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-dark);
      margin-bottom: 0.375rem;
    }
    .info-text {
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--color-gray-600);
    }
  `]
})
export class InformationCardComponentComponent {
  @Input({ required: true }) data!: DataComponent[];
}
