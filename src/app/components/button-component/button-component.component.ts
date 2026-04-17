import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataComponentModel } from '../../core/models/dynamic-component.model';
import { AlignEnum } from '../../core/models/enums';

@Component({
  selector: 'app-button-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full py-4 px-4" [class]="containerAlignClass">
      <a
        [href]="data.url || '#'"
        [style.backgroundColor]="data.color || '#6f93cd'"
        class="btn-phex"
      >
        {{ data.text || data.textButton }}
      </a>
    </div>
  `,
})
export class ButtonComponentComponent {
  @Input({ required: true }) data!: DataComponentModel;

  get containerAlignClass(): string {
    switch (this.data.alignment) {
      case AlignEnum.LEFT: return 'flex justify-start';
      case AlignEnum.RIGHT: return 'flex justify-end';
      default: return 'flex justify-center';
    }
  }
}
