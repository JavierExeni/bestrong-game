import { Action, createReducer, on } from '@ngrx/store';
import { filtrosValidos, setFiltro } from '../actions';


export const initialState: filtrosValidos = 'Receta';

const _filtroReducer = createReducer<filtrosValidos, Action>(
  initialState,
  on(setFiltro, (state, { filtro }) => filtro)
);

export function filtroReducer(
  state: filtrosValidos = initialState,
  action: Action
) {
  return _filtroReducer(state, action);
}
