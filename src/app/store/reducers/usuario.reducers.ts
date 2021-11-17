import { Action, createReducer, on } from '@ngrx/store';
import { Cliente } from '../../shared/models/User/Cliente';
import {
  cargarUsuario,
  cargarUsuarioError,
  cargarUsuarioSuccess,
  cargarPuntosUsuario,
  cargarUsuarioSuccessUpdate,
  cargarBodyUsuario,
  cargarUsuarioSuccessLogin,
} from '../actions';

export interface UsuarioState {
  id: number | null;
  user: Cliente | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const usuarioInitialState: UsuarioState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _usuarioReducer = createReducer(
  usuarioInitialState,

  on(cargarUsuario, (state, { id }) => ({
    ...state,
    loading: true,
    id: id,
  })),
  on(cargarPuntosUsuario, (state, { puntos }) => ({
    ...state,
    user: {
      puntos: puntos,
      ...state.user,
    },
  })),
  on(cargarBodyUsuario, (state, { bodyinfo }) => ({
    ...state,
    user: {
      ...state.user,
      bodyinfo: bodyinfo,
    },
  })),
  on(cargarUsuarioSuccessLogin, (state, { cliente }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...cliente },
  })),
  on(cargarUsuarioSuccess, (state, { cliente }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...cliente },
  })),
  on(cargarUsuarioSuccessUpdate, (state, { cliente }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...cliente },
  })),
  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function usuarioReducer(
  state: UsuarioState = usuarioInitialState,
  action: Action
) {
  return _usuarioReducer(state, action);
}
