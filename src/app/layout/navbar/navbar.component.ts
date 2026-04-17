import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-50 transition-shadow duration-300"
      [class.shadow-lg]="scrolled()"
      style="background-color: #2d4b7b; backdrop-filter: blur(8px);"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-3 flex-shrink-0">
            @if (config().logoUrl) {
              <img [src]="config().logoUrl" alt="PHEX Logística" class="h-10 w-auto" />
            } @else {
              <span class="text-white font-bold text-xl tracking-wide">
                PHEX<span style="color: #f5ff7d;">.</span>
              </span>
            }
          </a>

          <!-- Desktop Menu -->
          <nav class="hidden md:flex items-center gap-1">
            @for (menu of menuList(); track menu.id) {
              <a
                [routerLink]="'/' + menu.url"
                routerLinkActive="border-b-2"
                [routerLinkActiveOptions]="{ exact: false }"
                class="px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200 hover:text-yellow-300 relative group"
              >
                {{ menu.name }}
                <span class="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style="background-color: #ef4b43;"></span>
              </a>
            }
            @for (menu of sswMenuList(); track menu.id) {
              <a
                [href]="isExternalUrl(menu.menuPortalUrl) ? menu.menuPortalUrl : '/' + menu.menuPortalUrl"
                [target]="isExternalUrl(menu.menuPortalUrl) ? '_blank' : '_self'"
                class="px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200 hover:text-yellow-300 relative group"
              >
                {{ menu.menuPortalName }}
                <span class="material-icons text-xs ml-1 align-middle" style="font-size: 14px;">open_in_new</span>
              </a>
            }
          </nav>

          <!-- Mobile hamburger -->
          <button
            class="md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            (click)="toggleDrawer()"
            aria-label="Toggle menu"
          >
            <span class="material-icons">{{ drawerOpen() ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    @if (drawerOpen()) {
      <div
        class="fixed inset-0 z-40 bg-black/60 md:hidden"
        (click)="closeDrawer()"
      ></div>

      <!-- Drawer -->
      <div
        class="fixed top-0 left-0 z-50 h-full w-72 shadow-2xl md:hidden transform transition-transform duration-300"
        style="background-color: #2d4b7b;"
      >
        <div class="flex items-center justify-between p-4 border-b border-white/20">
          <span class="text-white font-bold text-lg">
            PHEX<span style="color: #f5ff7d;">.</span>
          </span>
          <button
            class="text-white p-1 rounded-md"
            (click)="closeDrawer()"
            aria-label="Close menu"
          >
            <span class="material-icons">close</span>
          </button>
        </div>

        <nav class="flex flex-col p-4 gap-1">
          @for (menu of menuList(); track menu.id) {
            <a
              [routerLink]="'/' + menu.url"
              (click)="closeDrawer()"
              class="px-4 py-3 text-white font-medium rounded-lg transition-colors duration-200 hover:bg-white/10"
              style="color: #d1e2ff;"
            >
              {{ menu.name }}
            </a>
          }
          @for (menu of sswMenuList(); track menu.id) {
            <a
              [href]="isExternalUrl(menu.menuPortalUrl) ? menu.menuPortalUrl : '/' + menu.menuPortalUrl"
              [target]="isExternalUrl(menu.menuPortalUrl) ? '_blank' : '_self'"
              (click)="closeDrawer()"
              class="px-4 py-3 font-medium rounded-lg transition-colors duration-200 hover:bg-white/10 flex items-center gap-2"
              style="color: #d1e2ff;"
            >
              {{ menu.menuPortalName }}
              <span class="material-icons text-xs" style="font-size: 14px;">open_in_new</span>
            </a>
          }
        </nav>
      </div>
    }
  `,
})
export class NavbarComponent {
  private readonly configService = inject(ConfigService);

  readonly menuList = this.configService.menuList;
  readonly sswMenuList = this.configService.sswMenuList;
  readonly config = this.configService.config;

  readonly drawerOpen = signal(false);
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 10);
  }

  toggleDrawer(): void {
    this.drawerOpen.update((v) => !v);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  isExternalUrl(url: string): boolean {
    return url?.startsWith('http://') || url?.startsWith('https://');
  }
}
