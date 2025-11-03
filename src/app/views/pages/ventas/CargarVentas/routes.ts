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
        loadComponent: () => import('../CargarVentas/ventas.component').then(m => m.VentasComponent),
        data: {
          title: 'Ventas'
        }
      }
    ]
  }
];

