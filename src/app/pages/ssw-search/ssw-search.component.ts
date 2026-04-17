import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SswService } from '../../core/services/ssw.service';
import { PortalService } from '../../core/services/portal.service';
import { InputSSW, MenuPortal, SearchPageSSWData } from '../../core/models';
import { LoadingSkeletonComponent } from '../../components/shared/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-ssw-search',
  standalone: true,
  imports: [FormsModule, LoadingSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <app-loading-skeleton />
    } @else if (pageData()) {
      <div class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-[#2d4b7b] mb-2">{{ pageData()!.title }}</h1>
        <div class="bg-white rounded-xl shadow-md p-6 mt-6">
          <form (ngSubmit)="onSubmit()" #searchForm="ngForm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              @for (input of pageData()!.inputs; track input.id) {
                <div [class.sm:col-span-2]="input.screenSize >= 12">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ input.description }}
                    @if (input.required) { <span class="text-red-500">*</span> }
                  </label>
                  @if (input.name === 'senha') {
                    <div class="mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                      ⚠️ A senha é fornecida pela transportadora. Se enviada e validada, a resposta incluirá o comprovante de entrega.
                    </div>
                  }
                  <input
                    [name]="input.name"
                    [(ngModel)]="formValues[input.name]"
                    [type]="getInputType(input.type)"
                    [required]="input.required"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6f93cd] focus:border-transparent"
                    [placeholder]="input.description"
                  />
                </div>
              }
            </div>

            <div class="mt-6 flex gap-3"
                 [class.justify-start]="pageData()!.buttonAlignments === 'LEFT'"
                 [class.justify-center]="pageData()!.buttonAlignments === 'CENTER'"
                 [class.justify-end]="pageData()!.buttonAlignments === 'RIGHT'"
            >
              <button
                type="submit"
                [disabled]="searching()"
                [style.backgroundColor]="pageData()!.buttonConfirmColor || '#6f93cd'"
                class="text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {{ searching() ? 'Consultando...' : pageData()!.buttonConfirmText }}
              </button>
              @if (pageData()!.hasClearButton) {
                <button
                  type="button"
                  (click)="clearForm()"
                  [style.backgroundColor]="pageData()!.buttonClearColor || '#ef4b43'"
                  class="text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  {{ pageData()!.buttonClearText || 'Limpar' }}
                </button>
              }
            </div>
          </form>

          @if (result()) {
            <div class="mt-8 p-4 border border-gray-200 rounded-lg">
              <div [innerHTML]="result()"></div>
            </div>
          }
          @if (errorMsg()) {
            <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {{ errorMsg() }}
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class SswSearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sswService = inject(SswService);
  private portal = inject(PortalService);
  private sanitizer = inject(DomSanitizer);

  pageData = signal<SearchPageSSWData | null>(null);
  loading = signal(true);
  searching = signal(false);
  result = signal<SafeHtml | null>(null);
  errorMsg = signal('');
  formValues: Record<string, string> = {};

  ngOnInit(): void {
    const url = this.route.snapshot.paramMap.get('url');
    const menu = this.portal.menus().find((m: MenuPortal) => m.url === url);
    if (menu?.idSearchPageSSW) {
      this.sswService.getSearchPageData(menu.idSearchPageSSW).subscribe({
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

  getInputType(type: InputSSW['type']): string {
    const map: Record<string, string> = { TEXT: 'text', NUMBER: 'number', DATE: 'date', PASSWORD: 'password' };
    return map[type] ?? 'text';
  }

  onSubmit(): void {
    this.errorMsg.set('');
    this.result.set(null);
    this.searching.set(true);
    this.sswService.searchSSW(this.pageData()!.endpoint, this.formValues).subscribe({
      next: (data: unknown) => {
        const d = data as Record<string, unknown>;
        if (d?.['html']) {
          this.result.set(this.sanitizer.bypassSecurityTrustHtml(d['html'] as string));
        } else if (d?.['message']) {
          this.errorMsg.set(d['message'] as string);
        }
        this.searching.set(false);
      },
      error: () => {
        this.errorMsg.set('Erro ao realizar a consulta. Tente novamente.');
        this.searching.set(false);
      },
    });
  }

  clearForm(): void {
    this.formValues = {};
    this.result.set(null);
    this.errorMsg.set('');
  }
}
