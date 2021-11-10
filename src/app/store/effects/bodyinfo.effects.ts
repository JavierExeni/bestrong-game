import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as bodyActions from '../actions';

import { of } from 'rxjs';

import { BodyinfoService } from '../../core/services/bodyinfo.service';

@Injectable()
export class BodyInfoEffects {
  constructor(
    private actions$: Actions,
    private bodyService: BodyinfoService
  ) {}

  cargarBody$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bodyActions.crearBodyType),
      mergeMap((action) =>
        this.bodyService.crearBodyInfo(action.body).pipe(
          map((body: any) => {
            console.log('Body Info creada!!', body)
            return bodyActions.cargarBodySuccess({ body: body });
          }),
          catchError((error) =>{
            console.log(error);
            return of(bodyActions.cargarBodyError({ payload: error }))
          }

          )
        )
      )
    )
  );
}
