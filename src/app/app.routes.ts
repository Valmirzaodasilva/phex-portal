import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'rastreamento/:menuUrl',
    loadComponent: () => import('./pages/ssw-search/ssw-search.component').then(m => m.SswSearchComponent)
  },
  {
    path: ':menuUrl',
    loadComponent: () => import('./pages/dynamic-page/dynamic-page.component').then(m => m.DynamicPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
