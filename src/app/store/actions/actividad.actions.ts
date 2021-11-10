import { createAction, props } from '@ngrx/store';
import { Actividad } from '../../shared/models/Clases/Actividad';
import { Opcion } from '../../shared/models/Clases/Opcion';

export const cargarActividad = createAction(
  '[Actividad] Cargar Actividad',
  props<{ actividad: Actividad }>()
);

export const sacarActividad = createAction(
  '[Actividad] Sacar Actividad',
  props<{ unsetindex: number; actvidad_id: number }>()
);

export const cargarOpcion = createAction(
  '[Actividad] Cargar Opcion',
  props<{ opcion: Opcion }>()
);

export const sacarOpcion = createAction(
  '[Actividad] Sacar Opcion',
  props<{ actvidad_id: number }>()
);

export const cargarError = createAction(
  '[Actividad] Cargar Error',
  props<{ payload: any }>()
);

export const BorrarTodo = createAction('[Actividad] Borrar Todo');
