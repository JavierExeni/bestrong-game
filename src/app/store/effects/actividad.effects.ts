import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actividadActions from '../actions';

import { of } from 'rxjs';
import { ActividadService } from '../../core/services/actividad.service';
import { Opcion } from '../../shared/models/Clases/Opcion';

@Injectable()
export class ActividadEffects {
  constructor(
    private actions$: Actions,
    private actividadService: ActividadService
  ) {}

  cargarActividad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actividadActions.cargarActividad),
      mergeMap(({actividad}) => {
        return this.actividadService
          .getOpcionesByActividad(actividad[0].id)
          .pipe(
            map((opcion: Opcion) => {
              return actividadActions.cargarOpcion({ opcion: opcion });
            }),
            catchError((error) =>
              of(actividadActions.cargarError({ payload: error }))
            )
          );
      })
    )
  );
}
