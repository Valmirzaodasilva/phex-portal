import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { PortalService } from '../../core/services/portal.service';
import { DynamicPageData } from '../../core/models';
import { DynamicPageRendererComponent } from '../../components/dynamic/dynamic-page-renderer/dynamic-page-renderer.component';
import { LoadingSkeletonComponent } from '../../components/shared/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DynamicPageRendererComponent, LoadingSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <app-loading-skeleton />
    } @else if (pageData()) {
      <app-dynamic-page-renderer [pageData]="pageData()!" />
    }
  `,
})
export class HomeComponent implements OnInit {
  private portal = inject(PortalService);
  pageData = signal<DynamicPageData | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const menus = this.portal.menus();
    const firstMenu = menus[0];
    if (firstMenu?.idDynamicPage) {
      this.portal.getDynamicPageData(firstMenu.idDynamicPage).subscribe({
        next: res => {
          this.pageData.set(res.response?.[0] ?? null);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    } else {
      this.loading.set(false);
    }
  }
}
