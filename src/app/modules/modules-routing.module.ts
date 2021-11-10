import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { PrincipalComponent } from './principal/principal.component';
import { LeccionComponent } from './leccion/leccion.component';
import { ClaseComponent } from './clase/clase.component';
import { ActividadComponent } from './actividad/actividad.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'game',
        component: PrincipalComponent,
      },
      {
        path: 'calendario',
        component: CalendarioComponent,
      },
      {
        path: 'leccion/:id',
        component: LeccionComponent,
      },
      {
        path: 'actividad/:id',
        component: ActividadComponent,
      },
      {
        path: 'clase/:id',
        component: ClaseComponent,
      },
      {
        path: '**',
        redirectTo: 'game',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {}
