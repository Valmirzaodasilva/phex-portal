import { Component, ChangeDetectionStrategy, input, signal, OnInit, OnDestroy, computed } from '@angular/core';
import { DynamicComponent } from '../../../core/models';

@Component({
  selector: 'app-dynamic-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-hidden" style="min-height: 400px">
      @for (image of images(); track $index) {
        <div
          class="absolute inset-0 transition-opacity duration-700"
          [class.opacity-100]="currentIndex() === $index"
          [class.opacity-0]="currentIndex() !== $index"
          [style.backgroundImage]="'url(' + image + ')'"
          style="background-size: cover; background-position: center"
        ></div>
      }

      <div class="absolute inset-0 bg-black/40"></div>

      <div class="relative z-10 flex items-center justify-center text-center px-4" style="min-height: 400px">
        <div>
          @if (component().data.title) {
            <h2
              [style.color]="component().data.textColor || '#ffffff'"
              [style.fontSize]="component().data.fontSize || '2.5rem'"
              class="font-bold mb-4 drop-shadow-lg"
            >{{ component().data.title }}</h2>
          }
          @if (component().data.subtitle) {
            <p class="text-white/90 text-lg drop-shadow">{{ component().data.subtitle }}</p>
          }
        </div>
      </div>

      @if (images().length > 1) {
        <button
          (click)="prev()"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
          style="transform: translateY(-50%)"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          (click)="next()"
          class="absolute right-4 top-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
          style="transform: translateY(-50%)"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <div class="absolute bottom-4 left-1/2 z-20 flex gap-2" style="transform: translateX(-50%)">
          @for (image of images(); track $index) {
            <button
              (click)="goTo($index)"
              class="w-2.5 h-2.5 rounded-full transition-colors"
              [style.backgroundColor]="currentIndex() === $index ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'"
            ></button>
          }
        </div>
      }
    </div>
  `,
})
export class DynamicBannerComponent implements OnInit, OnDestroy {
  component = input.required<DynamicComponent>();
  currentIndex = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  images = computed((): string[] => this.component().data.images ?? []);

  ngOnInit(): void {
    if (this.images().length > 1) {
      this.intervalId = setInterval(() => this.next(), 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  next(): void {
    this.currentIndex.update(i => (i + 1) % this.images().length);
  }

  prev(): void {
    this.currentIndex.update(i => (i - 1 + this.images().length) % this.images().length);
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }
}
