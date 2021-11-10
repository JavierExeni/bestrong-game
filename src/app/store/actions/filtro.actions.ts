import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'Receta' | 'Truco';

export const setFiltro = createAction(
  '[Filtro] Set Filtro',
  props<{ filtro: filtrosValidos }>()
);
