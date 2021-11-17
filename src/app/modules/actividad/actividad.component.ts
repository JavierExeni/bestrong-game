import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Leccion } from '../../shared/models/Clases/Leccion';
import { ActividadService } from '../../core/services/actividad.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarActividad } from 'src/app/store/actions';
import { Actividad } from '../../shared/models/Clases/Actividad';
import { Opcion } from '../../shared/models/Clases/Opcion';
import {
  sacarActividad,
  BorrarTodo,
} from '../../store/actions/actividad.actions';
import { Subscription } from 'rxjs';
import { TIPO_ACTIVIDAD } from 'src/app/shared/Enums';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss'],
})
export class ActividadComponent implements OnInit, OnDestroy {
  actividad: Actividad;
  new_opciones: Opcion[] = [];

  tiempo: number = 10;

  selected: any;

  flag: number = 1;

  actividades;

  activeSubs: Subscription;

  cant_preguntas = 0;
  pregunta_actual = 1;

  cant_correctas = 0;
  cant_incorrectas = 0;

  puntos: number = 0;

  TIPO_ACTIVIDAD = TIPO_ACTIVIDAD;
  COMPLETADO = TIPO_ACTIVIDAD['COMPLETADO DE COLUMNAS'];

  data_count: number = 0;
  data_enter: number = 0;

  todo = [];

  done = [];

  opciones_correctas = [];

  drop(event: CdkDragDrop<string[]>) {
    if (this.opciones_correctas.includes(event.item.data)) {
      console.log(event);
      this.data_enter += 1;
      console.log(this.data_enter);
      if (this.data_enter === this.opciones_correctas.length) {
        this.store.dispatch(
          sacarActividad({ unsetindex: 0, actvidad_id: this.actividad.id })
        );
        this.store.dispatch(BorrarTodo());
        this.dialog_ref.close({
          puntos: this.puntos,
        });
      }
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  constructor(
    private actividaService: ActividadService,
    private dialog_ref: MatDialogRef<ActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public lecciones: Leccion[],
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.activeSubs = this.store
      .select('actividad')
      .subscribe(({ actividades, opciones }) => {
        this.actividades = actividades;
        if (actividades.length > 0) {
          let options: any = opciones[0];
          this.actividad = actividades[0][0];
          if (options) {
            const flattenedArray = [].concat(...opciones);
            this.new_opciones = flattenedArray.filter(
              (opcion) => this.actividad.id == opcion.actividad
            );
            if (this.actividad.tipo_actividad == this.COMPLETADO) {
              console.log(this.new_opciones[0].opcion);
              let opciones = this.new_opciones[0].opcion
                .split('-')[0]
                .split(',');
              console.log(this.new_opciones[0].opcion);
              this.new_opciones[0].opcion;
              this.todo = opciones;
              this.opciones_correctas = this.new_opciones[0].opcion
                .split('-')[1]
                .split(',');
            }
            console.log(this.new_opciones);
          }
        }
      });
  }

  ngOnDestroy(): void {
    console.log('Destruyendo subscription');
    this.puntos = 0;
    this.activeSubs.unsubscribe();
  }

  cargarDatos() {
    this.lecciones.forEach(async (leccion) => {
      await this.actividaService
        .getActividadesByLeccion(leccion.id)
        .subscribe((actividad: Actividad) => {
          this.cant_preguntas += 1;
          this.store.dispatch(cargarActividad({ actividad }));
        });
    });
  }

  radioChange(event: any) {
    if (!this.selected.op_correcta) {
      this.flag = 3;
      this.cant_incorrectas += 1;
      this.puntos -= 5;
    } else {
      this.flag = 2;
      this.cant_correctas += 1;
      this.puntos += this.actividad.puntos;
    }

    setTimeout(() => {
      this.flag = 0;
      // sacar actividad y opciones del state
      this.store.dispatch(
        sacarActividad({ unsetindex: 0, actvidad_id: this.actividad.id })
      );
      if (this.actividades.length == 0) {
        console.log('Cerrrar modal', this.puntos);
        this.store.dispatch(BorrarTodo());
        this.dialog_ref.close({
          puntos: this.puntos,
        });
      }
      this.pregunta_actual += 1;
    }, 2500);
  }

  obtenerRespuesta() {
    console.log(this.new_opciones);
    let opcion = '';
    this.new_opciones.forEach((element) => {
      if (element.op_correcta) {
        opcion = element.opcion;
      }
    });
    return opcion;
  }

  getTipo(tipo) {
    return TIPO_ACTIVIDAD[tipo];
  }

  evenPredicate(item: CdkDrag<string>) {
    return [
      'Buena planificación para principiantes',
      'Ganancia de Fuerza',
    ].includes(item.data);
  }

  noReturnPredicate() {
    return false;
  }
}
