import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PrincipalComponent } from './principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarioComponent } from './calendario/calendario.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { LeccionComponent } from './leccion/leccion.component';
import { TiendaComponent } from './components/modals/tienda/tienda.component';
import { ClaseComponent } from './clase/clase.component';
import { ActividadComponent } from './actividad/actividad.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatRadioModule } from '@angular/material/radio';
import { RutinaComponent } from './rutina/rutina.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    PrincipalComponent,
    CalendarioComponent,
    LeccionComponent,
    TiendaComponent,
    ClaseComponent,
    ActividadComponent,
    RutinaComponent,
    FiltroPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModulesRoutingModule,
    YouTubePlayerModule,
    SharedModule,
    DragDropModule,
    FullCalendarModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
  ],
})
export class ModulesModule {}
