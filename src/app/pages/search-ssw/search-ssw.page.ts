import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ALIGN_ENUM } from 'src/app/shared/enums/align-enum.enum';
import { NavigationMenuModel } from 'src/app/shared/models/navigation-menu.model';
import {
  InputSearchModel,
  SearchSSWPageModel,
} from 'src/app/shared/models/search-ssw-page-models/search-ssw-page-model';
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

  inputsSSW: InputSearchModel[];

  searchForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private searchSSWPageService: SearchSSWPageService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.data = this.route?.snapshot?.data['menu'] as NavigationMenuModel;

    this.loadPageData();
  }

  getAlign(align: ALIGN_ENUM): string {
    if (align === ALIGN_ENUM.LEFT) {
      return 'start';
    } else if (align === ALIGN_ENUM.RIGHT) {
      return 'end';
    } else {
      return 'center';
    }
  }

  searchSSW(): void {
    // TODO: Implement search
    console.log('(this.searchForm.valid', this.searchForm.valid);
    // this.searchForm.markAllAsTouched();
    // if (this.searchForm.valid) {
    //   // Form is valid, perform search
    //   console.log('search', this.searchForm.value);
    // } else {
    //   // Form is invalid, display error messages
    //   console.log('Form is invalid');
    // }
  }

  private createForm(): void {
    const formControls = {};
    this.inputsSSW.forEach((input) => {
      formControls[input.name] = new FormControl('');
    });
    this.searchForm = new FormGroup(formControls);
  }

  private loadPageData(): void {
    try {
      this.searchSSWPageService.getSearchSSWPageData(this.data?.id.toString()).subscribe((data) => {
        this.searchSSWPageData = data.response[0];
        this.inputsSSW = this.searchSSWPageData?.inputSSW;
        this.createForm();
        this.headerService.setMenuActive(this.data?.id.toString());
      });
    } catch (error) {
      console.error('Error loading page data', error);
    }
  }
}
