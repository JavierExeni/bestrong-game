import { Action, createReducer, on } from '@ngrx/store';
import { Ejercicio } from '../../shared/models/Workout/Ejercicio';

import {
  cargarEjercicio,
  cargarEjercicioSuccess,
  cargarEjercicioError,
} from '../actions';

export interface EjercicioState {
  ejercicio: Ejercicio[];
  error: any;
}

export const ejercicioInitialState: EjercicioState = {
  ejercicio: [],
  error: null,
};
const _ejercicioReducer = createReducer(
  ejercicioInitialState,

  on(cargarEjercicio, (state, { id }) => ({
    ...state,
    id: id,
  })),
  on(cargarEjercicioSuccess, (state, { ejercicio }) => ({
    ...state,
    ejercicio: [...ejercicio ],
  })),
  on(cargarEjercicioError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function ejercicioReducer(
  state: EjercicioState = ejercicioInitialState,
  action: Action
) {
  return _ejercicioReducer(state, action);
}
