import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as bodyActions from '../actions';

import { of } from 'rxjs';

import { BodyinfoService } from '../../core/services/bodyinfo.service';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import { cargarBodyUsuario } from '../actions/usuario.actions';

@Injectable()
export class BodyInfoEffects {
  constructor(
    private actions$: Actions,
    private bodyService: BodyinfoService,
    private sotre: Store<AppState>
  ) {}

  cargarBody$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bodyActions.crearBodyType),
      mergeMap((action) =>
        this.bodyService.crearBodyInfo(action.body).pipe(
          map((body: any) => {
            console.log('Body Info creada!!', body)
            this.sotre.dispatch(cargarBodyUsuario({bodyinfo: body.id}))
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
