import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-provisional-ssw-modal',
  templateUrl: './provisional-ssw-modal.component.html',
  styleUrls: ['./provisional-ssw-modal.component.scss'],
  standalone: true,
  imports: [NgbDatepickerModule, FontAwesomeModule],
})
export class ProvisionalSswModalComponent implements OnInit {
  @Input() public menu: { id: number; menuPortalName: string; menuPortalUrl: string };

  faIconExternalLink = faShare;

  safeUrl: SafeResourceUrl;

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.menu.menuPortalUrl);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
