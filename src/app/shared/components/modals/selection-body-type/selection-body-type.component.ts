import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { setBodyType } from '../../../../store/actions/bodyinfo.actions';

@Component({
  selector: 'selection-body-type',
  templateUrl: './selection-body-type.component.html',
  styleUrls: ['./selection-body-type.component.scss'],
})
export class SelectionBodyTypeComponent implements OnInit {
  @Output() seleccion = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  selected(tipo: number) {
    this.store.dispatch(setBodyType({ body_type: tipo }));
    this.seleccion.emit(false);
  }
}
