import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Ventas'
    },
    children: [
      {
        path: '',
        redirectTo: 'ventas',
        pathMatch: 'full'
      },
      {
        path: 'ventas',
        loadComponent: () => import('../registrar/registrar.component').then(m => m.registrarComponent),
        data: {
          title: 'Ventas'
        }
      }
    ]
  }
];

