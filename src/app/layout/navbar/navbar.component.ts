import { Component, ChangeDetectionStrategy, signal, inject, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PortalService } from '../../core/services/portal.service';
import { ConfigService } from '../../core/services/config.service';
import { MenuPortal } from '../../core/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="sticky top-0 z-50 bg-[#2d4b7b] transition-shadow duration-300"
         [class.shadow-lg]="scrolled()">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center">
            @if (config.config().logoUrl) {
              <img [src]="config.config().logoUrl" alt="PHEX" class="h-10 object-contain" />
            } @else {
              <span class="text-white font-bold text-2xl tracking-wider">PHEX</span>
            }
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-1">
            @for (menu of portal.menus(); track menu.id) {
              <a
                [routerLink]="getMenuRoute(menu)"
                routerLinkActive="border-b-2 border-[#6f93cd] text-[#d1e2ff]"
                class="text-white hover:text-[#d1e2ff] px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-white/10"
              >{{ menu.name }}</a>
            }
          </div>

          <!-- Mobile hamburger -->
          <button
            (click)="toggleMobileMenu()"
            class="md:hidden text-white p-2 rounded-md hover:bg-white/10"
            aria-label="Menu"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (mobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Drawer -->
      <div
        class="md:hidden overflow-hidden transition-all duration-300"
        [class.max-h-0]="!mobileMenuOpen()"
        [class.max-h-screen]="mobileMenuOpen()"
      >
        <div class="px-4 pt-2 pb-4 space-y-1 bg-[#2d4b7b] border-t border-white/20">
          @for (menu of portal.menus(); track menu.id) {
            <a
              [routerLink]="getMenuRoute(menu)"
              routerLinkActive="bg-[#6f93cd]/30 text-[#d1e2ff]"
              (click)="closeMobileMenu()"
              class="block text-white hover:text-[#d1e2ff] px-3 py-2 text-base font-medium rounded-md hover:bg-white/10 transition-colors"
            >{{ menu.name }}</a>
          }
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  readonly portal = inject(PortalService);
  readonly config = inject(ConfigService);

  mobileMenuOpen = signal(false);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 10);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  getMenuRoute(menu: MenuPortal): string {
    if (menu.idDynamicPage) return `/pagina/${menu.url}`;
    if (menu.idSearchPageSSW) return `/rastreamento/${menu.url}`;
    return `/${menu.url}`;
  }
}
