import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ejercicio } from 'src/app/shared/models/Workout/Ejercicio';
import { Rutina } from '../../shared/models/Workout/Rutina';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.scss'],
})
export class RutinaComponent implements OnInit {
  rutina: Rutina;
  ejercicios: Ejercicio[];
  finish: boolean;

  ejeSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private dialog_ref: MatDialogRef<RutinaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { rutina: Rutina; ejercicio: Ejercicio; finish: boolean }
  ) {}

  ngOnInit(): void {
    console.log(this.data.finish);
    this.rutina = this.data.rutina;
    this.finish = this.data.finish['finish'];
    this.ejeSubs = this.store.select('ejercicio').subscribe(({ ejercicio }) => {
      console.log('ejercicio');
      console.log(ejercicio);
      if (ejercicio) {
        let ejer: any = ejercicio;
        this.ejercicios = ejer;
      }
    });
  }

  cambiarEstado() {
    this.finish = true;
  }
}
