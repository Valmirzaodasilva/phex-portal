import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'rastreio/:id',
    loadComponent: () =>
      import('./pages/ssw-search/ssw-search.component').then(
        (m) => m.SswSearchComponent
      ),
  },
  {
    path: ':pageSlug',
    loadComponent: () =>
      import('./pages/dynamic-page/dynamic-page.component').then(
        (m) => m.DynamicPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
