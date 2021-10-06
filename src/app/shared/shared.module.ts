import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectionBodyTypeComponent } from './components/modals/selection-body-type/selection-body-type.component';
import { PresentationBodyTypeComponent } from './components/modals/presentation-body-type/presentation-body-type.component';
import { PresentationComponent } from './components/modals/presentation/presentation.component';

@NgModule({
  declarations: [
    DialogComponent,
    SelectionBodyTypeComponent,
    PresentationBodyTypeComponent,
    PresentationComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatRippleModule,
  ],
  exports: [DialogComponent],
})
export class SharedModule {}
