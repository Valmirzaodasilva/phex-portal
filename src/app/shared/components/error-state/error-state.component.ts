import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error-container">
      <div class="error-icon">
        <span class="material-icons">error_outline</span>
      </div>
      <h3 class="error-title">{{ title }}</h3>
      <p class="error-message">{{ message }}</p>
      @if (showRetry) {
        <button class="retry-btn" (click)="retry.emit()">
          <span class="material-icons">refresh</span>
          Tentar novamente
        </button>
      }
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
      gap: 1rem;
    }
    .error-icon {
      .material-icons {
        font-size: 3.5rem;
        color: var(--color-secondary);
      }
    }
    .error-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-dark);
    }
    .error-message {
      color: var(--color-gray-600);
      max-width: 400px;
    }
    .retry-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--color-primary);
      color: white;
      border-radius: var(--radius-md);
      font-weight: 500;
      font-size: 0.875rem;
      transition: background var(--transition-fast);
      
      &:hover { background: var(--color-dark); }
      
      .material-icons { font-size: 1rem; }
    }
  `]
})
export class ErrorStateComponent {
  @Input() title = 'Ocorreu um erro';
  @Input() message = 'Não foi possível carregar os dados. Por favor, tente novamente.';
  @Input() showRetry = true;
  @Output() retry = new EventEmitter<void>();
}
