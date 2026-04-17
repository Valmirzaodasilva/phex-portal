import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PortalService } from '../../core/services/portal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<div></div>`
})
export class HomeComponent implements OnInit {
  private portal = inject(PortalService);
  private router = inject(Router);

  ngOnInit(): void {
    const menus = this.portal.menuList();
    if (menus.length > 0) {
      this.router.navigateByUrl('/' + menus[0].url, { replaceUrl: true });
    }
  }
}
