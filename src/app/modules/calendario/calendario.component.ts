import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';

import esLocale from '@fullcalendar/core/locales/es';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Ejercicio } from 'src/app/shared/models/Workout/Ejercicio';
import { AppState } from '../../store/app.reducers';
import { RutinaComponent } from '../rutina/rutina.component';
import { cargarEjercicio } from '../../store/actions/ejercicio.actions';
import { Subscription } from 'rxjs';
import { Rutina } from '../../shared/models/Workout/Rutina';
import { updateRutina } from '../../store/actions/rutina.actions';
import { Cliente } from '../../shared/models/User/Cliente';
import { cargarUsuarioSuccess } from '../../store/actions/usuario.actions';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { WinAwardComponent } from '../components/alert/win-award/win-award.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {
  locales = [esLocale];

  calendarOptions: CalendarOptions;

  format = 'YYYY-MM-DD';

  events: {
    title: string;
    date: string;
    finish: boolean;
    rutina?: Ejercicio;
  }[] = [];

  rutina: Rutina;

  cliente: Cliente;

  rutinaSubs: Subscription;
  ejeSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) this.cliente = JSON.parse(user);
    this.rutinaSubs = this.store.select('rutina').subscribe(({ rutina }) => {
      if (rutina) {
        console.log(rutina);
        this.rutina = rutina;
        this.store.dispatch(cargarEjercicio({ id: rutina.id }));
        this.configuration();
      }
    });
  }

  handleDateClick(arg: any) {
    console.log(arg);
  }

  openRoutine(data) {
    console.log(data.event);
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '50%';
    dialog_config.height = '70%';
    dialog_config.data = {
      rutina: this.rutina,
      finish: data.event._def.extendedProps,
    };
    //dialog_config.panelClass = ['custom_dialog', 'my-dialog'];
    let dialogo = this.dialog.open(RutinaComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          console.log('Resultadoooo');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  configuration() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: esLocale,
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events: this.events,
      eventClick: this.openRoutine.bind(this),
    };
    if (this.rutina.nivel == 1) {
      this.getMondays();
      this.getWednesday();
      this.getFriday();
    }
    if (this.rutina.nivel == 2) {
      this.getMondays();
      this.getTuesdays();
      this.getThursday();
      this.getFriday();
    }
  }

  getMondays() {
    var monday = moment().startOf('month').day('Monday');
    if (monday.date() > 7) monday.add(7, 'd');
    var month = monday.month();
    while (month === monday.month()) {
      let dateTime = moment(monday).format(this.format);
      this.events.push({
        title: this.rutina.nombre,
        date: dateTime,
        finish: false,
      });
      monday.add(7, 'd');
    }
  }

  getTuesdays() {
    var tuesday = moment().startOf('month').day('Tuesday');
    if (tuesday.date() > 7) tuesday.add(7, 'd');
    var month = tuesday.month();
    while (month === tuesday.month()) {
      let dateTime = moment(tuesday).format(this.format);
      this.events.push({
        title: this.rutina.nombre,
        date: dateTime,
        finish: false,
      });
      tuesday.add(7, 'd');
    }
  }

  getWednesday() {
    var miercoles = moment().startOf('month').day('Wednesday');
    if (miercoles.date() > 7) miercoles.add(7, 'd');
    var month = miercoles.month();
    while (month === miercoles.month()) {
      let dateTime = moment(miercoles).format(this.format);
      this.events.push({
        title: this.rutina.nombre,
        date: dateTime,
        finish: false,
      });
      miercoles.add(7, 'd');
    }
  }

  getThursday() {
    var thursday = moment().startOf('month').day('Thursday');
    if (thursday.date() > 7) thursday.add(7, 'd');
    var month = thursday.month();
    while (month === thursday.month()) {
      let dateTime = moment(thursday).format(this.format);
      this.events.push({
        title: this.rutina.nombre,
        date: dateTime,
        finish: false,
      });
      thursday.add(7, 'd');
    }
  }

  getFriday() {
    var friday = moment().startOf('month').day('Friday');
    if (friday.date() > 7) friday.add(7, 'd');
    var month = friday.month();
    while (month === friday.month()) {
      let dateTime = moment(friday).format(this.format);
      this.events.push({
        title: this.rutina.nombre,
        date: dateTime,
        finish: false,
      });
      friday.add(7, 'd');
    }
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(mensaje, buton) {
    this._snackBar.openFromComponent(WinAwardComponent, {
      data: {
        message: mensaje,
        button: buton,
      },
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  async nextLevel() {
    // Actualizar nivel del usuario
    // Dar primer logro

    if (this.rutina.nivel == 1) {
      this.cliente.bodyinfo = this.cliente.bodyinfo['id'];
      // clase C
      this.openSnackBar('Héroe Clase - C', 'OK');
      this.cliente.logro = [1];
    } else {
      this.openSnackBar('Héroe Clase - B', 'OK');
      this.cliente.logro.push(2);
    }

    await this.store.dispatch(cargarUsuarioSuccess({ cliente: this.cliente }));

    console.log(this.rutina.id, this.cliente.id, this.rutina.nivel);
    this.events = [];
    await this.store.dispatch(
      updateRutina({
        rutina: this.rutina.id,
        user: this.cliente.id,
        nivel: this.rutina.nivel,
      })
    );
  }
}
