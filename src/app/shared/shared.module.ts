import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogComponent } from './components/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SelectionBodyTypeComponent } from './components/modals/selection-body-type/selection-body-type.component';
import { PresentationBodyTypeComponent } from './components/modals/presentation-body-type/presentation-body-type.component';
import { PresentationComponent } from './components/modals/presentation/presentation.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RouterModule } from '@angular/router';
import { CalculoCaloricoComponent } from './components/modals/calculo-calorico/calculo-calorico.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DialogComponent,
    SelectionBodyTypeComponent,
    PresentationBodyTypeComponent,
    PresentationComponent,
    InventoryComponent,
    CalculoCaloricoComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatGridListModule,
    FlexLayoutModule,
    MatRippleModule,
    MatDialogModule,
  ],
  exports: [DialogComponent, InventoryComponent, SidebarComponent],
})
export class SharedModule {}
