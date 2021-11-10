import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as ejercicioActions from '../actions';

import { of } from 'rxjs';

import { EjercicioService } from '../../core/services/workout/ejercicio.service';

@Injectable()
export class EjercicioEffects {
  constructor(
    private actions$: Actions,
    private ejercicioService: EjercicioService
  ) {}

  cargarEjercicio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ejercicioActions.cargarEjercicio),
      mergeMap((action) =>
        this.ejercicioService.getEjerciciosByRutina(action.id).pipe(
          map((ejercicio: any) => {
            return ejercicioActions.cargarEjercicioSuccess({ ejercicio: ejercicio });
          }),
          catchError((error) =>
            of(ejercicioActions.cargarEjercicioError({ payload: error }))
          )
        )
      )
    )
  );
}
