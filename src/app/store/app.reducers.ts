import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
import { filtrosValidos } from './actions/filtro.actions';

export interface AppState {
  usuario: reducers.UsuarioState;
  bodyInfo: reducers.BodyState;
  actividad: reducers.ActividadState;
  rutina: reducers.RutinaState;
  ejercicio: reducers.EjercicioState;
  filtro: filtrosValidos;
  inventario: reducers.InventarioState;
}

export const appReducers: ActionReducerMap<AppState> = {
  usuario: reducers.usuarioReducer,
  bodyInfo: reducers.bodyReducer,
  actividad: reducers.actividadReducer,
  rutina: reducers.rutinaReducer,
  ejercicio: reducers.ejercicioReducer,
  filtro: reducers.filtroReducer,
  inventario: reducers.inventarioReducer,
};
