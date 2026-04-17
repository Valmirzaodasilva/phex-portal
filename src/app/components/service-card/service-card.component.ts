import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataComponentModel } from '../../core/models/dynamic-component.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full py-8 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (item of dataComponents; track item.id ?? $index) {
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100">
            @if (item.images?.length) {
              <img
                [src]="item.images![0]"
                [alt]="item.title || 'Serviço PHEX'"
                class="w-full h-48 object-cover"
              />
            } @else {
              <div class="w-full h-48 flex items-center justify-center" style="background-color: #d1e2ff;">
                <span class="material-icons text-5xl" style="color: #6f93cd;">local_shipping</span>
              </div>
            }
            <div class="p-6 flex flex-col flex-1">
              @if (item.icon) {
                <span class="material-icons text-3xl mb-2" style="color: #6f93cd;">{{ item.icon }}</span>
              }
              @if (item.title) {
                <h3 class="font-bold text-lg mb-2" style="color: #2d4b7b;">{{ item.title }}</h3>
              }
              @if (item.text) {
                <p class="text-sm leading-relaxed text-gray-600 flex-1">{{ item.text }}</p>
              }
              @if (item.nameButton || item.textButton) {
                <a
                  [href]="item.url || item.linkButton || '#'"
                  class="btn-phex-secondary mt-4 text-center text-sm"
                >
                  {{ item.nameButton || item.textButton }}
                </a>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ServiceCardComponent {
  @Input({ required: true }) dataComponents!: DataComponentModel[];
}
