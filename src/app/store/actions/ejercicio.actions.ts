import { createAction, props } from '@ngrx/store';
import { Ejercicio } from '../../shared/models/Workout/Ejercicio';

export const cargarEjercicio = createAction(
  '[EJERCICIO] Cargar Ejercicio',
  props<{ id: number }>()
);

export const cargarEjercicioSuccess = createAction(
  '[EJERCICIO] Cargar Ejercicio Success',
  props<{ ejercicio: Ejercicio[] }>()
);

export const cargarEjercicioError = createAction(
  '[EJERCICIO] Cargar Ejercicio Error',
  props<{ payload: any }>()
);
