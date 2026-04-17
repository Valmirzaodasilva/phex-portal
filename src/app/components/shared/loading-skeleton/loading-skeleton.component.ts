import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="animate-pulse">
      <div class="h-16 bg-gray-300 rounded mb-4"></div>
      <div class="max-w-7xl mx-auto px-4 py-8 space-y-4">
        <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="grid grid-cols-3 gap-4 mt-6">
          <div class="h-32 bg-gray-200 rounded-xl"></div>
          <div class="h-32 bg-gray-200 rounded-xl"></div>
          <div class="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  `,
})
export class LoadingSkeletonComponent {}
