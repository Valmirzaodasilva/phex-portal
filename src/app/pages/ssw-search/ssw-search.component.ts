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
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SswService } from '../../core/services/ssw.service';
import { PortalService } from '../../core/services/portal.service';
import { SearchPageSSWData, InputSSW } from '../../core/models/ssw.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-ssw-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ssw-search.component.html',
  styleUrls: ['./ssw-search.component.scss']
})
export class SswSearchComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private sswService = inject(SswService);
  private portal = inject(PortalService);
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);

  readonly loading = signal(false);
  readonly pageLoading = signal(false);
  readonly error = signal(false);
  readonly pageData = signal<SearchPageSSWData | null>(null);
  readonly searchResult = signal<SafeHtml | null>(null);
  readonly searchError = signal('');
  readonly showPasswords = signal<Record<string, boolean>>({});

  searchForm!: FormGroup;
  private routeSub?: Subscription;

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const menuUrl = params.get('menuUrl');
      if (menuUrl) this.loadPageByUrl(menuUrl);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  togglePassword(fieldName: string): void {
    this.showPasswords.update(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  }

  isPasswordVisible(fieldName: string): boolean {
    return !!this.showPasswords()[fieldName];
  }

  getInputType(input: InputSSW): string {
    if (input.type === 'PASSWORD') {
      return this.isPasswordVisible(input.name) ? 'text' : 'password';
    }
    const map: Record<string, string> = {
      TEXT: 'text', NUMBER: 'number', DATE: 'date', SELECT: 'text'
    };
    return map[input.type] || 'text';
  }

  isPasswordField(input: InputSSW): boolean {
    return input.type === 'PASSWORD' || input.name.toLowerCase().includes('senha');
  }

  onSubmit(): void {
    if (!this.searchForm?.valid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.searchError.set('');
    this.searchResult.set(null);

    const formData = this.searchForm.value as Record<string, string>;

    this.sswService.search(formData).subscribe({
      next: (html) => {
        this.searchResult.set(this.sanitizer.bypassSecurityTrustHtml(html as unknown as string));
        this.loading.set(false);
      },
      error: () => {
        this.searchError.set('Não foi possível realizar a consulta. Verifique os dados e tente novamente.');
        this.loading.set(false);
      }
    });
  }

  onClear(): void {
    this.searchForm?.reset();
    this.searchResult.set(null);
    this.searchError.set('');
  }

  loadPage(): void {
    const menuUrl = this.route.snapshot.paramMap.get('menuUrl');
    if (menuUrl) this.loadPageByUrl(menuUrl);
  }

  private loadPageByUrl(menuUrl: string): void {
    const sswMenus = this.portal.sswMenuList();
    const menu = sswMenus.find(m => m.menuPortalUrl === menuUrl);
    if (!menu) { this.error.set(true); return; }

    this.pageLoading.set(true);
    this.error.set(false);

    this.sswService.getSearchPageData(menu.id).subscribe({
      next: (data) => {
        this.pageData.set(data);
        this.buildForm(data.inputSSW ?? []);
        this.pageLoading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.pageLoading.set(false);
      }
    });
  }

  private buildForm(inputs: InputSSW[]): void {
    const controls: Record<string, unknown> = {};
    inputs.forEach(input => {
      controls[input.name] = [{ value: '', disabled: false }, input.required ? Validators.required : []];
    });
    this.searchForm = this.fb.group(controls);
  }
}
