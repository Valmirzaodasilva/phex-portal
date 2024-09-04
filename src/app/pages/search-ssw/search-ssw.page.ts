import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationMenuModel } from 'src/app/shared/models/navigation-menu.model';
import { SearchSSWPageModel } from 'src/app/shared/models/search-ssw-page-models/search-ssw-page-model';
import { HeaderService } from 'src/app/shared/services/header.service';
import { SearchSSWPageService } from 'src/app/shared/services/search-ssw-page.service';

@Component({
  selector: 'app-search-ssw',
  templateUrl: './search-ssw.page.html',
  styleUrls: ['./search-ssw.page.scss'],
})
export class SearchSSWPage implements OnInit {
  public searchSSWPageData: SearchSSWPageModel;

  private data?: NavigationMenuModel;

  constructor(
    private route: ActivatedRoute,
    private searchSSWPageService: SearchSSWPageService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.data = this.route?.snapshot?.data['menu'] as NavigationMenuModel;
    this.loadPageData();
  }

  private loadPageData(): void {
    try {
      this.searchSSWPageService.getSearchSSWPageData(this.data?.id.toString()).subscribe((data) => {
        this.searchSSWPageData = data.response[0];
        this.headerService.setMenuActive(this.data?.id.toString());
      });
    } catch (error) {
      console.error('Error loading page data', error);
    }
  }
}
