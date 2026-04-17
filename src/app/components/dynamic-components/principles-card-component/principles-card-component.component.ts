import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from '../../../core/models/dynamic-page.model';

@Component({
  selector: 'app-principles-card-component',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="principles-section">
      <div class="container">
        <div class="cards-grid">
          @for (item of data; track $index) {
            <div class="principle-card animate-slideUp">
              @if (item.icon) {
                <div class="card-icon-wrap">
                  <span class="material-icons card-icon" [style.font-size]="item.iconSize || '2.5rem'" [style.color]="item.textColor || 'var(--color-primary)'">{{ item.icon }}</span>
                </div>
              }
              @if (item.title) {
                <h3 class="card-title">{{ item.title }}</h3>
              }
              @if (item.text) {
                <p class="card-text" [style.color]="item.textColor || 'inherit'">{{ item.text }}</p>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .principles-section { padding: 4rem 0; }
    .cards-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
      @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
    }
    .principle-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem 1.5rem;
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-base), box-shadow var(--transition-base);
      border: 1px solid var(--color-gray-200);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
      }
    }
    .card-icon-wrap {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: var(--color-light);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;
    }
    .card-icon { color: var(--color-primary); }
    .card-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-dark);
      margin-bottom: 0.75rem;
    }
    .card-text {
      font-size: 0.9rem;
      line-height: 1.7;
      color: var(--color-gray-600);
    }
  `]
})
export class PrinciplesCardComponentComponent {
  @Input({ required: true }) data!: DataComponent[];
}
