import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'catalog',
    loadComponent: () =>
      import('./pages/catalog-page/catalog-page.component').then(
        (m) => m.CatalogPageComponent
      ),
  },
  {
    path: 'sessions/:eventId',
    loadComponent: () =>
      import('./pages/sessions-page/sessions-page.component').then(
        (m) => m.SessionsPageComponent
      ),
  },
  { path: '**', redirectTo: 'catalog' },
];
