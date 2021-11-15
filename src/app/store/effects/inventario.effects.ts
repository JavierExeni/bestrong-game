import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as inventarioActions from '../actions';

import { of } from 'rxjs';

import { TiendaService } from '../../core/services/tienda.service';

@Injectable()
export class InventarioEffects {
  constructor(
    private actions$: Actions,
    private tiendaService: TiendaService
  ) {}

  cargarInventario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inventarioActions.cargarInventario),
      mergeMap((action) =>
        this.tiendaService.getproductById(action.id).pipe(
          map((producto: any) => {
            return inventarioActions.cargarInventarioSuccess({ producto });
          }),
          catchError((error) =>
            of(inventarioActions.cargarInventarioError({ payload: error }))
          )
        )
      )
    )
  );
}
