import {
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortalApiService } from '../../core/services/portal-api.service';
import { ConfigService } from '../../core/services/config.service';
import { DynamicPageModel } from '../../core/models/dynamic-page.model';
import { DynamicRendererComponent } from '../../components/dynamic-renderer/dynamic-renderer.component';
import { SkeletonLoaderComponent } from '../../components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [DynamicRendererComponent, SkeletonLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <app-skeleton-loader [count]="6" />
      </div>
    } @else if (error()) {
      <div class="max-w-7xl mx-auto px-4 py-20 text-center">
        <span class="material-icons text-5xl mb-4 block" style="color: #ef4b43;">error_outline</span>
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Página não encontrada</h2>
        <p class="text-gray-500">{{ error() }}</p>
      </div>
    } @else if (pageData()) {
      <div class="w-full">
        @for (component of pageData()!.dynamicComponents ?? []; track component.id ?? $index) {
          <app-dynamic-renderer [component]="component" />
        }
        @if (!pageData()!.dynamicComponents?.length) {
          <div class="max-w-7xl mx-auto px-4 py-20 text-center">
            <span class="material-icons text-5xl mb-4 block" style="color: #6f93cd;">inventory_2</span>
            <p class="text-gray-500">Nenhum conteúdo disponível para esta página.</p>
          </div>
        }
      </div>
    }
  `,
})
export class DynamicPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PortalApiService);
  private readonly configService = inject(ConfigService);

  readonly pageData = signal<DynamicPageModel | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params['pageSlug'] as string;
      this.loadPage(slug);
    });
  }

  private loadPage(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    const menuItem = this.configService.menuList().find(
      (m) => m.url === slug || m.url === '/' + slug
    );

    if (!menuItem) {
      this.loading.set(false);
      this.error.set('Página não encontrada.');
      return;
    }

    const pageId = menuItem.idDynamicPage ?? menuItem.id;

    this.api.getDynamicPage(pageId).subscribe({
      next: (res) => {
        this.pageData.set(res.response?.[0] ?? null);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading page:', err);
        this.error.set('Erro ao carregar a página. Tente novamente.');
        this.loading.set(false);
      },
    });
  }
}
