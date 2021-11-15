import { createAction, props } from '@ngrx/store';
import { Producto } from '../../shared/models/Tienda/Producto';

export const cargarInventario = createAction(
  '[INVENTARIO] Cargar Inventario',
  props<{ id: number }>()
);

export const cargarInventarioSuccess = createAction(
  '[INVENTARIO] Cargar Inventario Success',
  props<{ producto: Producto }>()
);

export const cargarInventarioError = createAction(
  '[INVENTARIO] Cargar Inventario Error',
  props<{ payload: any }>()
);
