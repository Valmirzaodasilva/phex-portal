import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from '../../../core/models/dynamic-page.model';
import { ImagesService } from '../../../core/services/images.service';

@Component({
  selector: 'app-banner-component',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './banner-component.component.html',
  styleUrls: ['./banner-component.component.scss']
})
export class BannerComponentComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: DataComponent[];

  private imagesService = inject(ImagesService);

  readonly currentIndex = signal(0);
  private slideInterval?: ReturnType<typeof setInterval>;

  readonly banner = computed(() => this.data?.[0]);

  readonly allImages = computed(() => {
    const b = this.banner();
    if (!b) return [];
    return b.images ?? [];
  });

  readonly currentImageUrl = computed(() => {
    const imgs = this.allImages();
    if (imgs.length === 0) return '';
    return this.imagesService.getImageUrl(imgs[this.currentIndex()]);
  });

  ngOnInit(): void {
    if (this.allImages().length > 1) {
      this.startSlideshow();
    }
  }

  ngOnDestroy(): void {
    this.stopSlideshow();
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.stopSlideshow();
    this.startSlideshow();
  }

  private startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      const imgs = this.allImages();
      if (imgs.length > 1) {
        this.currentIndex.update(i => (i + 1) % imgs.length);
      }
    }, 5000);
  }

  private stopSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
