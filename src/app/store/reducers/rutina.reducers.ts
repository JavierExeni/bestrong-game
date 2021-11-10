import { Action, createReducer, on } from '@ngrx/store';
import { Rutina } from '../../shared/models/Workout/Rutina';

import {
  cargarRutina,
  cargarRutinaSuccess,
  cargarRutinaError,
} from '../actions';

export interface RutinaState {
  rutina: Rutina;
  error: any;
}

export const rutinaInitialState: RutinaState = {
  rutina: null,
  error: null,
};
const _rutinaReducer = createReducer(
  rutinaInitialState,

  on(cargarRutina, (state, { id }) => ({
    ...state,
    id: id,
  })),
  on(cargarRutinaSuccess, (state, { rutina }) => ({
    ...state,
    rutina: { ...rutina },
  })),
  on(cargarRutinaError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function rutinaReducer(
  state: RutinaState = rutinaInitialState,
  action: Action
) {
  return _rutinaReducer(state, action);
}
