import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as usuarioActions from '../actions';

import { of } from 'rxjs';
import { UsuarioService } from '../../core/services/usuario.service';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) {}

  cargarUsario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap((action) =>
        this.usuariosService.ObtenerUsuarioId(action.id).pipe(
          map((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            return usuarioActions.cargarUsuarioSuccess({ cliente: user });
          }),
          catchError((error) =>
            of(usuarioActions.cargarUsuarioError({ payload: error }))
          )
        )
      )
    )
  );

  updateUsario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuarioSuccess),
      mergeMap((action) => {
        console.log(action);
        return this.usuariosService
          .actualizarUsuario(action.cliente.id, action.cliente)
          .pipe(
            map((user: any) => {
              localStorage.setItem('user', JSON.stringify(user));
              return usuarioActions.cargarUsuarioSuccessUpdate({
                cliente: user,
              });
            }),
            catchError((error) =>
              of(usuarioActions.cargarUsuarioError({ payload: error }))
            )
          );
      })
    )
  );
}
