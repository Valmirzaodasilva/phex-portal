import {
  Component,
  OnInit,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PortalApiService } from '../../core/services/portal-api.service';
import { FooterModel } from '../../core/models/footer.model';
import { SkeletonLoaderComponent } from '../../components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SkeletonLoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer style="background-color: #2d4b7b;" class="text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        @if (loading()) {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (i of [1, 2, 3]; track i) {
              <app-skeleton-loader [count]="3" />
            }
          </div>
        } @else if (footer()) {
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Col 1: Logo + Description -->
            <div>
              @if (footer()!.logoUrl) {
                <img [src]="footer()!.logoUrl" alt="PHEX Logística" class="h-12 mb-4" />
              } @else {
                <div class="text-2xl font-bold mb-4">
                  PHEX<span style="color: #f5ff7d;">.</span>
                </div>
              }
              @if (footer()!.description) {
                <p class="text-sm leading-relaxed" style="color: #d1e2ff;">{{ footer()!.description }}</p>
              } @else {
                <p class="text-sm leading-relaxed" style="color: #d1e2ff;">
                  Quando o assunto é transporte de cargas e encomendas, a PHEX Logística é a melhor e a mais confiável opção! Fundada desde 2010, atendendo Mato Grosso.
                </p>
              }
            </div>

            <!-- Col 2: Contact Information -->
            <div>
              <h3 class="font-semibold text-lg mb-4" style="color: #f5ff7d;">Contato</h3>
              <ul class="space-y-3">
                @for (info of footer()!.contactInformation; track $index) {
                  <li class="flex items-start gap-3 text-sm" style="color: #d1e2ff;">
                    <span class="material-icons text-base mt-0.5 flex-shrink-0" style="color: #6f93cd; font-size: 18px;">
                      {{ info.icon }}
                    </span>
                    <span>{{ info.text }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Col 3: Social + WhatsApp -->
            <div>
              <h3 class="font-semibold text-lg mb-4" style="color: #f5ff7d;">Redes Sociais</h3>
              <div class="flex gap-3 mb-6">
                @for (social of footer()!.social_media; track $index) {
                  <a
                    [href]="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 hover:opacity-80"
                    style="background-color: #6f93cd;"
                    [attr.aria-label]="social.icon"
                  >
                    <span class="material-icons text-white" style="font-size: 18px;">{{ social.icon }}</span>
                  </a>
                }
              </div>

              @for (wa of footer()!.contactWhatsapp; track $index) {
                <a
                  [href]="wa.url || ('https://wa.me/' + wa.phone)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style="background-color: #25d366; color: #ffffff;"
                >
                  <span class="material-icons" style="font-size: 20px;">chat</span>
                  {{ wa.text || 'WhatsApp' }}
                </a>
              }
            </div>
          </div>

          <!-- Copyright bar -->
          <div class="mt-10 pt-6 border-t border-white/20 text-center text-sm" style="color: #d1e2ff;">
            @for (copy of footer()!.copyright; track $index) {
              <p>© {{ copy.year }} {{ copy.company }}. {{ copy.text }}</p>
            }
            @if (!footer()!.copyright?.length) {
              <p>© {{ currentYear }} PHEX Logística. Todos os direitos reservados.</p>
            }
          </div>
        } @else {
          <div class="text-center py-8" style="color: #d1e2ff;">
            <p class="text-sm">© {{ currentYear }} PHEX Logística. Todos os direitos reservados.</p>
          </div>
        }
      </div>
    </footer>
  `,
})
export class FooterComponent implements OnInit {
  private readonly api = inject(PortalApiService);

  readonly footer = signal<FooterModel | null>(null);
  readonly loading = signal(true);
  readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.api.getFooter().subscribe({
      next: (res) => {
        this.footer.set(res.response);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
