import { Action, createReducer, on } from '@ngrx/store';
import { BodyType } from '../../shared/models/User/BodyInfo';
import {
  crearBodyType,
  setBodyRest,
  cargarBodySuccess,
  cargarBodyError,
} from '../actions';
import { setBodyType } from '../actions/bodyinfo.actions';

export interface BodyState {
  body: BodyType | null;
  body_type: number | null;
  altura: number | null;
  peso: number | null;
  calorias: number | null;
  objetivo: number | null;
  error: any;
}

export const bodyInitialState: BodyState = {
  body: null,
  body_type: null,
  altura: null,
  peso: null,
  calorias: null,
  objetivo: null,
  error: null,
};

const _bodyReducer = createReducer(
  bodyInitialState,

  on(crearBodyType, (state, { body }) => ({
    ...state,
    body: new BodyType(
      body.altura,
      body.peso,
      body.calorias,
      body.body_type,
      body.objetivo
    ),
  })),
  on(setBodyRest, (state, { altura, calorias, peso, objetivo }) => ({
    ...state,
    altura,
    calorias,
    peso,
    objetivo,
  })),
  on(setBodyType, (state, { body_type }) => ({
    ...state,
    body_type,
  })),
  on(cargarBodySuccess, (state, { body }) => ({
    ...state,
    body: { ...body },
  })),
  on(cargarBodyError, (state, { payload }) => ({
    ...state,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function bodyReducer(
  state: BodyState = bodyInitialState,
  action: Action
) {
  return _bodyReducer(state, action);
}
