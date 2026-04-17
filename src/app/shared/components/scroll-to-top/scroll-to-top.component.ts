import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="scroll-btn"
      [class.visible]="isVisible()"
      (click)="scrollToTop()"
      aria-label="Voltar ao topo"
    >
      <span class="material-icons">keyboard_arrow_up</span>
    </button>
  `,
  styles: [`
    .scroll-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--color-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);
      opacity: 0;
      transform: translateY(20px);
      transition: opacity var(--transition-base), transform var(--transition-base), background var(--transition-fast);
      pointer-events: none;
      z-index: 500;
      
      &.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
      }
      
      &:hover { background: var(--color-dark); }
      
      .material-icons { font-size: 1.25rem; }
    }
  `]
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  readonly isVisible = signal(false);
  private scrollHandler!: () => void;

  ngOnInit(): void {
    this.scrollHandler = () => {
      this.isVisible.set(window.scrollY > 300);
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
