import { Action, createReducer, on } from '@ngrx/store';
import { Actividad } from '../../shared/models/Clases/Actividad';
import { Opcion } from '../../shared/models/Clases/Opcion';

import {
  cargarActividad,
  sacarActividad,
  cargarOpcion,
  cargarError,
  BorrarTodo,
} from '../actions';

export interface ActividadState {
  actividades: Actividad[];
  opciones: Opcion[];
  error: any;
}

export const actividadInitialState: ActividadState = {
  actividades: [],
  opciones: [],
  error: null,
};

const _actividadReducer = createReducer(
  actividadInitialState,

  on(cargarActividad, (state, { actividad }) => ({
    ...state,
    actividades: [...state.actividades, actividad],
  })),
  on(sacarActividad, (state, { unsetindex, actvidad_id }) => ({
    ...state,
    actividades: state.actividades.filter(
      (actividad, index) => index != unsetindex
    ),
    opciones: []
      .concat(...state.opciones)
      .filter((opcion) => opcion.actividad != actvidad_id),
  })),
  on(cargarOpcion, (state, { opcion }) => ({
    ...state,
    opciones: [...state.opciones, opcion],
  })),
  on(cargarError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  })),
  on(BorrarTodo, (state) => ({
    ...state,
    opciones: [],
    actividades: [],
  }))
);

export function actividadReducer(
  state: ActividadState = actividadInitialState,
  action: Action
) {
  return _actividadReducer(state, action);
}
