import { createAction, props } from '@ngrx/store';
import { Rutina } from '../../shared/models/Workout/Rutina';

export const cargarRutina = createAction(
  '[RUTINA] Cargar Rutina',
  props<{ id: number }>()
);

export const cargarRutinaSuccess = createAction(
  '[RUTINA] Cargar Rutina Success',
  props<{ rutina: Rutina }>()
);

export const cargarRutinaError = createAction(
  '[RUTINA] Cargar Rutina Error',
  props<{ payload: any }>()
);
