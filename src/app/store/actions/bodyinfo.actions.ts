import { createAction, props } from '@ngrx/store';
import { BodyType } from '../../shared/models/User/BodyInfo';

export const crearBodyType = createAction(
  '[BODY] Crear BodyType',
  props<{ body: BodyType }>()
);

export const cargarBodySuccess = createAction(
  '[BODY] Cargar Body Success',
  props<{ body: BodyType }>()
);

export const cargarBodyError = createAction(
  '[BODY] Cargar Body Error',
  props<{ payload: any }>()
);

export const setBodyType = createAction(
  '[BODY] Set BodyType',
  props<{ body_type: number }>()
);

export const setBodyRest = createAction(
  '[BODY] Set BodyRest',
  props<{
    altura: number;
    peso: number;
    calorias: number;
    objetivo: number;
  }>()
);
