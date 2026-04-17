import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicComponent } from '../../../core/models';

@Component({
  selector: 'app-dynamic-text',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-4xl mx-auto px-4 py-4"
         [class.text-left]="component().data.alignment === 'LEFT'"
         [class.text-center]="component().data.alignment === 'CENTER'"
         [class.text-right]="component().data.alignment === 'RIGHT'"
    >
      <div
        [innerHTML]="safeHtml()"
        [style.color]="component().data.textColor || 'inherit'"
        [style.fontSize]="component().data.fontSize || 'inherit'"
        class="prose max-w-none"
      ></div>
    </div>
  `,
})
export class DynamicTextComponent {
  component = input.required<DynamicComponent>();
  private sanitizer = inject(DomSanitizer);

  safeHtml = computed((): SafeHtml =>
    this.sanitizer.bypassSecurityTrustHtml(this.component().data.text ?? '')
  );
}
