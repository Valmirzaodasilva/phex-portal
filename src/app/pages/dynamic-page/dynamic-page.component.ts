import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortalService } from '../../core/services/portal.service';
import { DynamicPageData, MenuPortal } from '../../core/models';
import { DynamicPageRendererComponent } from '../../components/dynamic/dynamic-page-renderer/dynamic-page-renderer.component';
import { LoadingSkeletonComponent } from '../../components/shared/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-dynamic-page',
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
export class DynamicPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private portal = inject(PortalService);

  pageData = signal<DynamicPageData | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');
    const menu = this.portal.menus().find((m: MenuPortal) => m.url === url);
    if (menu?.idDynamicPage) {
      this.portal.getDynamicPageData(menu.idDynamicPage).subscribe({
        next: res => {
          this.pageData.set(res.response?.[0] ?? null);
          this.loading.set(false);
          this.portal.setActiveMenu(menu.id);
        },
        error: () => this.loading.set(false),
      });
    } else {
      this.loading.set(false);
    }
  }
}
