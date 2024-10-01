import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationMenuModel } from 'src/app/shared/models/navigation-menu.model';
import { CoveragePageService } from 'src/app/shared/services/coverage-page.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.page.html',
  styleUrls: ['./coverage.page.scss'],
})
export class CoveragePage implements OnInit {
  public coveragePageData: any; // TODO: Create a model for this data

  private data?: NavigationMenuModel;

  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private coverageService: CoveragePageService
  ) {}

  ngOnInit() {
    this.data = this.route?.snapshot?.data['menu'] as NavigationMenuModel;
    this.loadContactPageData();
  }

  private loadContactPageData(): void {
    try {
      this.headerService.setMenuActive(this.data?.id.toString());
    } catch (error) {
      console.error('Error loading page data', error);
    }
  }
}
