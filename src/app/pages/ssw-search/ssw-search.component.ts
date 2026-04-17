import {
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PortalApiService } from '../../core/services/portal-api.service';
import { SswService } from '../../core/services/ssw.service';
import { SearchSSWPageModel, InputSearchModel } from '../../core/models/search-page-ssw.model';
import { AlignEnum, InputTypeEnum } from '../../core/models/enums';
import { SkeletonLoaderComponent } from '../../components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-ssw-search',
  standalone: true,
  imports: [ReactiveFormsModule, SkeletonLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-3xl mx-auto px-4 py-12">
      @if (loading()) {
        <app-skeleton-loader [count]="5" />
      } @else if (pageData()) {
        <!-- Page header -->
        @if (pageData()!.title) {
          <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold mb-2" style="color: #2d4b7b;">{{ pageData()!.title }}</h1>
            @if (pageData()!.subtitle) {
              <p class="text-gray-600">{{ pageData()!.subtitle }}</p>
            }
          </div>
        }

        <!-- Search Form -->
        <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <form [formGroup]="searchForm" (ngSubmit)="onSearch()">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              @for (input of pageData()!.inputSSW ?? []; track input.name) {
                <div
                  class="flex flex-col gap-1"
                  [class.md:col-span-2]="(input.screenSize ?? 50) > 75"
                >
                  <label
                    [for]="input.name"
                    class="text-sm font-medium text-gray-700"
                  >
                    {{ input.description }}
                    @if (input.required) {
                      <span class="text-red-500 ml-1">*</span>
                    }
                  </label>

                  @if (input.options?.length) {
                    <select
                      [id]="input.name"
                      [formControlName]="input.name"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    >
                      <option value="">Selecione...</option>
                      @for (opt of input.options!; track opt) {
                        <option [value]="opt">{{ opt }}</option>
                      }
                    </select>
                  } @else {
                    <input
                      [id]="input.name"
                      [formControlName]="input.name"
                      [type]="getInputType(input)"
                      [placeholder]="input.description"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    />
                  }

                  <!-- Password hint -->
                  @if (isPasswordField(input)) {
                    <p class="text-xs text-blue-600 bg-blue-50 rounded-md p-2 mt-1 flex items-start gap-1.5">
                      <span class="material-icons flex-shrink-0 mt-0.5" style="font-size: 14px;">info</span>
                      Senha fornecida pela transportadora. Quando enviada e validada, o comprovante de entrega será retornado se disponível.
                    </p>
                  }

                  @if (searchForm.get(input.name)?.invalid && searchForm.get(input.name)?.touched) {
                    <span class="text-xs text-red-500">Campo obrigatório.</span>
                  }
                </div>
              }
            </div>

            <!-- Buttons -->
            <div
              class="mt-6 flex gap-3"
              [class.justify-start]="pageData()!.buttonAlignments === AlignEnum.LEFT"
              [class.justify-center]="pageData()!.buttonAlignments === AlignEnum.CENTER || !pageData()!.buttonAlignments"
              [class.justify-end]="pageData()!.buttonAlignments === AlignEnum.RIGHT"
            >
              <button
                type="submit"
                [disabled]="searching()"
                class="btn-phex min-w-28 flex items-center justify-center gap-2"
                [style.backgroundColor]="pageData()!.buttonConfirmColor || '#6f93cd'"
              >
                @if (searching()) {
                  <span class="material-icons animate-spin" style="font-size: 18px;">refresh</span>
                }
                {{ pageData()!.buttonConfirmText || 'Buscar' }}
              </button>

              @if (pageData()!.hasClearButton) {
                <button
                  type="button"
                  (click)="onClear()"
                  class="btn-phex-secondary min-w-28"
                  [style.backgroundColor]="pageData()!.buttonClearColor || '#ef4b43'"
                >
                  {{ pageData()!.buttonClearText || 'Limpar' }}
                </button>
              }
            </div>
          </form>
        </div>

        <!-- Error message -->
        @if (errorMsg()) {
          <div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <span class="material-icons text-red-500 flex-shrink-0">error_outline</span>
            <p class="text-sm text-red-700">{{ errorMsg() }}</p>
          </div>
        }

        <!-- Result -->
        @if (resultHtml()) {
          <div class="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 class="font-semibold text-lg mb-4" style="color: #2d4b7b;">Resultado</h3>
            <div [innerHTML]="resultHtml()" class="ssw-result overflow-auto"></div>
          </div>
        }
      } @else {
        <div class="text-center py-20">
          <span class="material-icons text-5xl mb-4 block" style="color: #ef4b43;">error_outline</span>
          <p class="text-gray-500">Não foi possível carregar a página de busca.</p>
        </div>
      }
    </div>
  `,
})
export class SswSearchComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(PortalApiService);
  private readonly sswService = inject(SswService);
  private readonly fb = inject(FormBuilder);
  private readonly sanitizer = inject(DomSanitizer);

  readonly AlignEnum = AlignEnum;

  readonly pageData = signal<SearchSSWPageModel | null>(null);
  readonly loading = signal(true);
  readonly searching = signal(false);
  readonly errorMsg = signal<string | null>(null);
  readonly resultHtml = signal<SafeHtml | null>(null);

  searchForm!: FormGroup;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as string;
    this.loadPage(id);
  }

  private loadPage(id: string): void {
    this.api.getSSWPageData(id).subscribe({
      next: (res) => {
        const data = res.response?.[0] ?? null;
        this.pageData.set(data);
        this.buildForm(data?.inputSSW ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private buildForm(inputs: InputSearchModel[]): void {
    const controls: Record<string, unknown[]> = {};
    inputs.forEach((input) => {
      controls[input.name] = [
        '',
        input.required ? [Validators.required] : [],
      ];
    });
    this.searchForm = this.fb.group(controls);
  }

  onSearch(): void {
    this.searchForm.markAllAsTouched();
    if (!this.searchForm.valid) return;

    this.searching.set(true);
    this.errorMsg.set(null);
    this.resultHtml.set(null);

    this.sswService.search(this.searchForm.value as Record<string, unknown>).subscribe({
      next: (html) => {
        this.resultHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
        this.searching.set(false);
      },
      error: () => {
        this.errorMsg.set('Erro ao realizar a busca. Por favor, tente novamente.');
        this.searching.set(false);
      },
    });
  }

  onClear(): void {
    this.searchForm.reset();
    this.resultHtml.set(null);
    this.errorMsg.set(null);
  }

  getInputType(input: InputSearchModel): string {
    switch (input.type) {
      case InputTypeEnum.NUMBER: return 'number';
      case InputTypeEnum.DATE: return 'date';
      case InputTypeEnum.PASSWORD: return 'password';
      default: return 'text';
    }
  }

  isPasswordField(input: InputSearchModel): boolean {
    return input.name === 'senha' || input.type === InputTypeEnum.PASSWORD;
  }
}
