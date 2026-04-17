import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="loading-container" [class.fullpage]="fullPage">
      <div class="spinner-wrapper">
        <div class="spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        @if (message) {
          <p class="spinner-message">{{ message }}</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      
      &.fullpage {
        position: fixed;
        inset: 0;
        background: rgba(255, 255, 255, 0.9);
        z-index: 9999;
      }
    }
    
    .spinner-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .spinner {
      width: 48px;
      height: 48px;
      position: relative;
    }
    
    .spinner-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 3px solid transparent;
      
      &:nth-child(1) {
        border-top-color: var(--color-primary);
        animation: spin 1s linear infinite;
      }
      &:nth-child(2) {
        border-right-color: var(--color-dark);
        animation: spin 0.8s linear infinite reverse;
        inset: 6px;
      }
      &:nth-child(3) {
        border-bottom-color: var(--color-secondary);
        animation: spin 1.2s linear infinite;
        inset: 12px;
      }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .spinner-message {
      color: var(--color-gray-600);
      font-size: 0.875rem;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message = '';
  @Input() fullPage = false;
}
