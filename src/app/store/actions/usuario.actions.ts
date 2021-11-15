import { createAction, props } from '@ngrx/store';
import { Cliente } from 'src/app/shared/models/User/Cliente';

export const cargarUsuario = createAction(
  '[USUARIO] Cargar Usuario',
  props<{ id: number }>()
);

export const cargarUsuarioSuccess = createAction(
  '[USUARIO] Cargar Usuario Success',
  props<{ cliente: Cliente }>()
);

export const cargarUsuarioSuccessUpdate = createAction(
  '[USUARIO] Cargar Usuario Success Update',
  props<{ cliente: Cliente }>()
);

export const cargarUsuarioError = createAction(
  '[USUARIO] Cargar Usuario Error',
  props<{ payload: any }>()
);

export const cargarPuntosUsuario = createAction(
  '[USUARIO] Cargar Puntos Usuario',
  props<{ puntos: number }>()
);

export const cargarBodyUsuario = createAction(
  '[USUARIO] Cargar Body Usuario',
  props<{ bodyinfo: number }>()
);

