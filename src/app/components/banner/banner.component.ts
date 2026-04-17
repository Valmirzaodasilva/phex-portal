import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DataComponentModel } from '../../core/models/dynamic-component.model';

@Component({
  selector: 'app-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative overflow-hidden w-full" style="height: 500px;">
      @for (image of data.images ?? []; track $index) {
        <div
          class="absolute inset-0 transition-opacity duration-700 bg-center bg-cover"
          [class.opacity-100]="activeSlide() === $index"
          [class.opacity-0]="activeSlide() !== $index"
          [style.backgroundImage]="'url(' + image + ')'"
        >
          <div
            class="absolute inset-0 flex items-center justify-center"
            style="background-color: rgba(45, 75, 123, 0.65);"
          >
            <div class="text-center text-white px-6 max-w-3xl">
              @if (data.title) {
                <h1
                  class="font-bold drop-shadow-lg mb-4"
                  [style.fontSize.px]="data.fontSize || 42"
                >
                  {{ data.title }}
                </h1>
              }
              @if (data.subtitle) {
                <p class="text-xl drop-shadow">{{ data.subtitle }}</p>
              }
            </div>
          </div>
        </div>
      }

      <!-- Fallback when no images -->
      @if (!data.images?.length) {
        <div
          class="absolute inset-0 flex items-center justify-center"
          style="background: linear-gradient(135deg, #2d4b7b 0%, #6f93cd 100%);"
        >
          <div class="text-center text-white px-6">
            @if (data.title) {
              <h1 class="font-bold drop-shadow-lg mb-4" [style.fontSize.px]="data.fontSize || 42">
                {{ data.title }}
              </h1>
            }
            @if (data.subtitle) {
              <p class="text-xl drop-shadow">{{ data.subtitle }}</p>
            }
          </div>
        </div>
      }

      <!-- Slide indicators -->
      @if ((data.images?.length ?? 0) > 1) {
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          @for (image of data.images!; track $index) {
            <button
              (click)="goToSlide($index)"
              class="w-3 h-3 rounded-full transition-all duration-300 focus:outline-none"
              [style.backgroundColor]="activeSlide() === $index ? '#f5ff7d' : 'rgba(255,255,255,0.6)'"
              [attr.aria-label]="'Slide ' + ($index + 1)"
            ></button>
          }
        </div>
      }
    </div>
  `,
})
export class BannerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: DataComponentModel;

  readonly activeSlide = signal(0);
  private interval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    const total = this.data.images?.length ?? 0;
    if (total > 1) {
      this.interval = setInterval(() => {
        this.activeSlide.update((i) => (i + 1) % total);
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }

  goToSlide(index: number): void {
    this.activeSlide.set(index);
  }
}
