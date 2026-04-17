import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataComponentModel } from '../../core/models/dynamic-component.model';
import { AlignEnum } from '../../core/models/enums';

@Component({
  selector: 'app-text-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full py-4 px-4">
      <p
        [style.color]="data.textColor || '#374151'"
        [style.maxWidth]="data.screenSize ? data.screenSize + '%' : '100%'"
        [class]="alignClass"
        class="text-base leading-relaxed"
      >
        {{ data.text }}
      </p>
    </div>
  `,
})
export class TextComponentComponent {
  @Input({ required: true }) data!: DataComponentModel;

  get alignClass(): string {
    switch (this.data.alignment) {
      case AlignEnum.LEFT: return 'text-left';
      case AlignEnum.RIGHT: return 'text-right';
      default: return 'text-center';
    }
  }
}
