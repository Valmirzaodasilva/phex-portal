import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicPageModel } from 'src/app/shared/models/dynamic-page-models/dynamic-page.model';
import { NavigationMenuModel } from 'src/app/shared/models/navigation-menu.model';
import { DynamicPageService } from 'src/app/shared/services/dynamic-page.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.page.html',
  styleUrls: ['./dynamic.page.scss'],
})
export class DynamicPage implements OnInit {
  public dynamicPageData: DynamicPageModel;

  private data?: NavigationMenuModel;

  constructor(
    private route: ActivatedRoute,
    private dynamicPageService: DynamicPageService,
    private headerService: HeaderService,
  ) {}

  ngOnInit() {
    this.data = this.route?.snapshot?.data['menu'] as NavigationMenuModel;
    this.loadPageData();
  }

  private loadPageData(): void {
    try {
      this.dynamicPageService
        .getDynamicPageData(this.data?.id.toString())
        .subscribe((data) => {
          this.dynamicPageData = data;
          this.headerService.setMenuActive(this.data?.id.toString());
        });
    } catch (error) {
      console.error('Error loading page data', error);
    }
  }
}
