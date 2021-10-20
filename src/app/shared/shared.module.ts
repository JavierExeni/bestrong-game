import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogComponent } from './components/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectionBodyTypeComponent } from './components/modals/selection-body-type/selection-body-type.component';
import { PresentationBodyTypeComponent } from './components/modals/presentation-body-type/presentation-body-type.component';
import { PresentationComponent } from './components/modals/presentation/presentation.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DialogComponent,
    SelectionBodyTypeComponent,
    PresentationBodyTypeComponent,
    PresentationComponent,
    InventoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule,
    MatRippleModule,
  ],
  exports: [DialogComponent, InventoryComponent],
})
export class SharedModule {}
