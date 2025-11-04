import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Productos Relacionados'
    },
    children: [
      {
        path: '',
        redirectTo: 'productos-relacionados',
        pathMatch: 'full'
      },
      {
        path: 'productos-relacionados',
        loadComponent: () => import('../productos-relacionados/productos-relacionados.component').then(m => m.ProductosRelacionadosComponent),
        data: {
          title: 'Productos Relacionados'
        }
      }
    ]
  }
];
