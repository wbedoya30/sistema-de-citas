import { Routes } from '@angular/router';
import { TabsPeluqueroPage } from './tabs-peluquero.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPeluqueroPage,
    children: [
      {
        path: 'fila',
        loadComponent: () =>
          import('../fila/fila.page').then((m) => m.FilaPage),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('../servicios/servicios.page').then((m) => m.ServiciosPage),
      },
      {
        path: 'reservar',
        loadComponent: () =>
          import('../reservar/reservar.page').then((m) => m.ReservarPage),
      },
      {
        path: 'reservar/seleccionarbarbero',
        loadComponent: () =>
          import('../reservar/seleccionbarbero/seleccionarbarbero.page').then((m) => m.SeleccionarBarberoPage),
      },
      {
        path: 'reservar/fechayhora',
        loadComponent: () =>
          import('../reservar/fechayhora/fechayhora.page').then((m) => m.FechaYHoraPage),
      },
      {
        path: 'reservar/servicio',
        loadComponent: () => import('../reservar/servicio/servicio.page').then( m => m.ServicioPage)
      },
      {
        path: 'reservar/resumen',
        loadComponent: () => import('../reservar/resumen/resumen.page').then( m => m.ResumenPage)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('../perfil/perfil-peluquero.page').then((m) => m.PerfilPeluqueroPage),
      },
      {
        path: 'horario',
        loadComponent: () => import('../horario/horario.page').then( m => m.HorarioPage)
      },
      {
        path: '',
        redirectTo: '/peluquero/fila',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/peluquero/fila',
    pathMatch: 'full',
  },
];
