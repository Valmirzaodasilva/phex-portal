import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactPageModel } from 'src/app/shared/models/contact-page.model';
import { NavigationMenuModel } from 'src/app/shared/models/navigation-menu.model';
import { ContactPageService } from 'src/app/shared/services/contact-page.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public contactPageData: ContactPageModel;

  private data?: NavigationMenuModel;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactPageService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.data = this.route?.snapshot?.data['menu'] as NavigationMenuModel;
    this.loadPageData();
  }

  private loadPageData(): void {
    try {
      this.contactService.getContactPageData(this.data?.id.toString()).subscribe((data) => {
        this.contactPageData = data.response[0];
        this.headerService.setMenuActive(this.data?.id.toString());
      });
    } catch (error) {
      console.error('Error loading page data', error);
    }
  }
}
