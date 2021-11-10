import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as rutinaActions from '../actions';

import { of } from 'rxjs';

import { RutinaService } from '../../core/services/workout/rutina.service';

@Injectable()
export class RutinaEffects {
  constructor(
    private actions$: Actions,
    private rutinasService: RutinaService
  ) {}

  cargarRutina$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rutinaActions.cargarRutina),
      mergeMap((action) =>
        this.rutinasService.getRutinasByNivel(action.id).pipe(
          map((rutina: any) => {
            console.log('Mellegaaaa', rutina);
            return rutinaActions.cargarRutinaSuccess({ rutina: rutina[0] });
          }),
          catchError((error) =>
            of(rutinaActions.cargarRutinaError({ payload: error }))
          )
        )
      )
    )
  );
}
