import { Routes } from '@angular/router';
import { ProductosRelacionadosComponent } from './scraping/productos-relacionados/productos-relacionados.component';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'ventas',
    loadComponent: () => import('./ventas/CargarVentas/ventas.component').then(m => m.VentasComponent),
    data: {
      title: 'Ventas'
    }
  },
   {
    path: 'registrar',
    loadComponent: () => import('./ventas/registrar/registrar.component').then(m => m.registrarComponent),
    data: {
      title: 'Registrar'
    }
  },
   {
    path: 'generar-prediccion',
    loadComponent: () => import('./ventas/generar-prediccion/generar-prediccion.component').then(m => m.GenerarPrediccionComponent),
    data: {
      title: 'Generar Prediccion'
    }
  },
   {
    path: 'productos-relacionados',
    loadComponent: () => import('./scraping/productos-relacionados/productos-relacionados.component').then(m => m.ProductosRelacionadosComponent),
    data: {
      title: 'Productos Relacionados'
    }
  },
   {
    path: 'tendencias',
    loadComponent: () => import('./scraping/tendencias/tendencias.component').then(m => m.TendenciasComponent),
    data: {
      title: 'Tendencias'
    }
  }
];
