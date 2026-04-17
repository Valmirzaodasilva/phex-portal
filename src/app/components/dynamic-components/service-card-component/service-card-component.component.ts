import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataComponent } from '../../../core/models/dynamic-page.model';
import { ImagesService } from '../../../core/services/images.service';

@Component({
  selector: 'app-service-card-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="service-section">
      <div class="container">
        <div class="service-grid">
          @for (item of data; track item.id) {
            <div class="service-card" [style.background-image]="item.images?.[0] ? 'url(' + getImageUrl(item.images![0]) + ')' : 'none'">
              <div class="service-overlay">
                @if (item.icon) {
                  <span class="material-icons service-icon">{{ item.icon }}</span>
                }
                @if (item.title) {
                  <h3 class="service-title">{{ item.title }}</h3>
                }
                @if (item.text) {
                  <p class="service-text">{{ item.text }}</p>
                }
                @if (item.linkButton) {
                  @if (isExternal(item.linkButton)) {
                    <a class="service-btn" [href]="item.linkButton" target="_blank" rel="noopener noreferrer">
                      {{ item.textButton || 'Saiba mais' }}
                    </a>
                  } @else {
                    <a class="service-btn" [routerLink]="item.linkButton">{{ item.textButton || 'Saiba mais' }}</a>
                  }
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .service-section { padding: 4rem 0; }
    .service-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
      @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
    }
    .service-card {
      position: relative;
      min-height: 280px;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background-color: var(--color-dark);
      background-size: cover;
      background-position: center;
      transition: transform var(--transition-base);
      
      &:hover {
        transform: translateY(-6px);
        .service-overlay { background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(45,75,123,0.7)); }
      }
    }
    .service-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(45,75,123,0.4));
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.75rem;
      transition: background var(--transition-base);
    }
    .service-icon {
      font-size: 2.25rem;
      color: var(--color-yellow);
      margin-bottom: 0.75rem;
    }
    .service-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.5rem;
    }
    .service-text {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.85);
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    .service-btn {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1.25rem;
      background: var(--color-primary);
      color: white;
      border-radius: var(--radius-md);
      font-size: 0.8125rem;
      font-weight: 600;
      transition: background var(--transition-fast);
      align-self: flex-start;
      
      &:hover { background: var(--color-light); color: var(--color-dark); }
    }
  `]
})
export class ServiceCardComponentComponent {
  @Input({ required: true }) data!: DataComponent[];
  private imagesService = inject(ImagesService);

  getImageUrl(img: string): string {
    return this.imagesService.getImageUrl(img);
  }

  isExternal(url: string): boolean {
    return url.startsWith('http') || url.startsWith('//');
  }
}
