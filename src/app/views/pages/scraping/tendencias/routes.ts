import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tendencias'
    },
    children: [
      {
        path: '',
        redirectTo: 'tendencias',
        pathMatch: 'full'
      },
      {
        path: 'tendencias',
        loadComponent: () => import('../tendencias/tendencias.component').then(m => m.TendenciasComponent),
        data: {
          title: 'Tendencias'
        }
      }
    ]
  }
];
