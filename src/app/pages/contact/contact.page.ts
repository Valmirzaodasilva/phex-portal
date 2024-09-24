import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactPageModel } from 'src/app/shared/models/contact-page.model';
import { NavigationMenuModel } from 'src/app/shared/models/navigation-menu.model';
import { ContactPageService } from 'src/app/shared/services/contact-page.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    private headerService: HeaderService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.data = this.route?.snapshot?.data['menu'] as NavigationMenuModel;
    this.loadContactPageData();
  }

  sendEmail(): void {
    console.log('Sending email');
  }

  getContactWhatsapp(): string {
    const phone = this.contactPageData?.whatsapp;
    const message = this.contactPageData?.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURI(message)}`;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private loadContactPageData(): void {
    try {
      this.contactService.getContactPageData().subscribe((data) => {
        this.contactPageData = data.response;
        this.headerService.setMenuActive(this.data?.id.toString());
      });
    } catch (error) {
      console.error('Error loading page data', error);
    }
  }
}
