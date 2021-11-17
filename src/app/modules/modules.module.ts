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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { GameComponent } from './game/game.component';
import { InventarioAllComponent } from './components/inventario-all/inventario-all.component';
import { ProfileComponent } from './components/modals/profile/profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LogrosComponent } from './components/modals/logros/logros.component';
import { ProductoDetailComponent } from './components/modals/producto-detail/producto-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WinAwardComponent } from './components/alert/win-award/win-award.component';
import { MatDialogModule } from '@angular/material/dialog';

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
    GameComponent,
    InventarioAllComponent,
    ProfileComponent,
    LogrosComponent,
    ProductoDetailComponent,
    WinAwardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModulesRoutingModule,
    MatSnackBarModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    MatFormFieldModule,
    DragDropModule,
    FullCalendarModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
  ],
})
export class ModulesModule {}
