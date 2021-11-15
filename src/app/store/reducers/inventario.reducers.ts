import { Action, createReducer, on } from '@ngrx/store';

import { Producto } from '../../shared/models/Tienda/Producto';
import {
  cargarInventario,
  cargarInventarioSuccess,
  cargarInventarioError,
} from '../actions';

export interface InventarioState {
  productos: Producto[];
  error: any;
}

export const inventarioInitialState: InventarioState = {
  productos: [],
  error: null,
};

const _inventarioReducer = createReducer(
  inventarioInitialState,

  on(cargarInventario, (state, { id }) => ({
    ...state,
    loading: true,
    id: id,
  })),

  on(cargarInventarioSuccess, (state, { producto }) => ({
    ...state,
    productos: [...state.productos, producto],
  })),

  on(cargarInventarioError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function inventarioReducer(
  state: InventarioState = inventarioInitialState,
  action: Action
) {
  return _inventarioReducer(state, action);
}
