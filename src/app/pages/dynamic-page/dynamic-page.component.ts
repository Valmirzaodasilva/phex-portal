import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DynamicPageService } from '../../core/services/dynamic-page.service';
import { PortalService } from '../../core/services/portal.service';
import { DynamicPageData } from '../../core/models/dynamic-page.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { DynamicComponentRendererComponent } from '../../components/dynamic-components/dynamic-component-renderer/dynamic-component-renderer.component';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, ErrorStateComponent, DynamicComponentRendererComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dynamic-page">
      @if (loading()) {
        <div class="page-loading">
          <app-loading-spinner message="Carregando página..." />
        </div>
      } @else if (error()) {
        <app-error-state (retry)="loadPage()" />
      } @else if (pageData()) {
        <div class="page-content animate-fadeIn">
          @for (component of pageData()!.dynamicComponents; track component.id) {
            <app-dynamic-component-renderer [component]="component" />
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .dynamic-page { min-height: 60vh; }
    .page-loading { padding: 4rem 0; }
    .page-content { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class DynamicPageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private dynamicPageService = inject(DynamicPageService);
  private portal = inject(PortalService);

  readonly loading = signal(false);
  readonly error = signal(false);
  readonly pageData = signal<DynamicPageData | null>(null);

  private routeSub?: Subscription;

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const menuUrl = params.get('menuUrl');
      if (menuUrl) {
        this.loadPageByUrl(menuUrl);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  loadPage(): void {
    const menuUrl = this.route.snapshot.paramMap.get('menuUrl');
    if (menuUrl) this.loadPageByUrl(menuUrl);
  }

  private loadPageByUrl(menuUrl: string): void {
    const menus = this.portal.menuList();
    const menu = menus.find(m => m.url === menuUrl);

    if (!menu) {
      this.error.set(true);
      return;
    }

    this.loading.set(true);
    this.error.set(false);
    this.pageData.set(null);

    this.dynamicPageService.getDynamicPageData(menu.idDynamicPage).subscribe({
      next: (data) => {
        this.pageData.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
