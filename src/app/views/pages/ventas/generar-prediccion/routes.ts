import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ventas'
    },
    children: [
      {
        path: '',
        redirectTo: 'ventas',
        pathMatch: 'full'
      },
      {
        path: 'ventas',
        loadComponent: () => import('./generar-prediccion.component').then(m => m.GenerarPrediccionComponent),
        data: {
          title: 'Ventas'
        }
      }
    ]
  }
];

