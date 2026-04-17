import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortalService } from '../../core/services/portal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private portal = inject(PortalService);
  private router = inject(Router);

  readonly menuList = this.portal.menuList;
  readonly sswMenuList = this.portal.sswMenuList;
  readonly config = this.portal.configPortal;

  readonly isMobileOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly activeSswDropdown = signal(false);

  private scrollHandler!: () => void;

  ngOnInit(): void {
    this.scrollHandler = () => {
      this.isScrolled.set(window.scrollY > 10);
    };
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  toggleMobile(): void {
    this.isMobileOpen.update(v => !v);
  }

  closeMobile(): void {
    this.isMobileOpen.set(false);
    this.activeSswDropdown.set(false);
  }

  toggleSswDropdown(event: Event): void {
    event.stopPropagation();
    this.activeSswDropdown.update(v => !v);
  }

  navigateTo(url: string): void {
    this.closeMobile();
    this.router.navigateByUrl('/' + url);
  }
}
