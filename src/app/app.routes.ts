import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'pagina/:url',
    loadComponent: () => import('./pages/dynamic-page/dynamic-page.component').then(m => m.DynamicPageComponent),
  },
  {
    path: 'rastreamento/:url',
    loadComponent: () => import('./pages/ssw-search/ssw-search.component').then(m => m.SswSearchComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./components/shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  },
];
