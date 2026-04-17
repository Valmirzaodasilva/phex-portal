import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoadingSkeletonComponent } from './components/shared/loading-skeleton/loading-skeleton.component';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    <main class="min-h-screen">
      @if (loading.loading()) {
        <app-loading-skeleton />
      } @else {
        <router-outlet />
      }
    </main>
    <app-footer />
  `,
})
export class AppComponent {
  constructor(readonly loading: LoadingService) {}
}
