import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactPageModel } from 'src/app/shared/models/contact-page.model';
import { NavigationMenuModel } from 'src/app/shared/models/navigation-menu.model';
import { ContactPageService } from 'src/app/shared/services/contact-page.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public contactPageData: ContactPageModel;

  private data?: NavigationMenuModel;

  isShowingAlert = false;
  isErrored = false;

  contactForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactPageService,
    private headerService: HeaderService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.data = this.route?.snapshot?.data['menu'] as NavigationMenuModel;
    this.loadContactPageData();
    this.initializeForm();
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formData = this.contactForm.value;

    emailjs
      .send(environment.emailjs_service_id, environment.emailjs_template_id, formData, environment.emailjs_user_id)
      .then(
        (response: EmailJSResponseStatus) => {
          this.isErrored = false;
          this.isShowingAlert = true;
          console.log('SUCCESS!', response.text);
        },
        (error: EmailJSResponseStatus) => {
          this.isErrored = true;
          this.isShowingAlert = true;
          console.log('FAILED...', error.text);
        }
      )
      .finally(() => {
        this.contactForm.reset();
        setTimeout(() => {
          this.isShowingAlert = false;
        }, 5000);
      });
  }

  getContactWhatsapp(): string {
    const phone = this.contactPageData?.whatsapp;
    const message = this.contactPageData?.whatsappMessage;
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURI(message)}`;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
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
