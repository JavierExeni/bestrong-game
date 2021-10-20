import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { CalendarioComponent } from './calendario/calendario.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrincipalComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModulesRoutingModule,
    SharedModule,
  ]
})
export class ModulesModule { }
