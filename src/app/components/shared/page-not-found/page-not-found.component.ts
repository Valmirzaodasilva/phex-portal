import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-[#6f93cd]">404</h1>
        <h2 class="text-2xl font-semibold text-[#2d4b7b] mt-4">Página não encontrada</h2>
        <p class="text-gray-500 mt-2">A página que você está procurando não existe.</p>
        <a routerLink="/" class="mt-6 inline-block bg-[#6f93cd] text-white px-6 py-3 rounded-lg hover:bg-[#2d4b7b] transition-colors">
          Voltar ao início
        </a>
      </div>
    </div>
  `,
})
export class PageNotFoundComponent {}
