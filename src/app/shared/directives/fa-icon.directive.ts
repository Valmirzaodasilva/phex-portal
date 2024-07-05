import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { library, icon } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckCircle,
  faChevronCircleDown,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faDolly,
  faDollyBox,
  faMotorcycle,
  faPaperPlane,
  faTruckFast,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Directive({
  selector: '[appFaIcon]',
})
export class FaIconDirective implements OnChanges {
  @Input('appFaIcon') iconName: string;

  private icons: { [key: string]: IconDefinition } = {
    faChevronRight,
    faChevronLeft,
    faChevronDown,
    faChevronUp,
    faPaperPlane,
    faTruckFast,
    faMotorcycle,
    faDolly,
    faDollyBox,
  };

  constructor(private el: ElementRef) {
    // Adicione todos os ícones que você deseja usar
    // library.add(faCoffee);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['iconName']) {
      this.updateIcon();
    }
  }

  private updateIcon() {
    const faIcon = this.icons[this.iconName];
    if (faIcon) {
      const faIconElement = icon(faIcon).node[0];
      this.el.nativeElement.innerHTML = '';
      this.el.nativeElement.appendChild(faIconElement);
    }
  }
}
