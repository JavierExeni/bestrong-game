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

  rutinaSubs: Subscription;
  ejeSubs: Subscription;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.rutinaSubs = this.store.select('rutina').subscribe(({ rutina }) => {
      console.log(rutina);
      if (rutina) {
        this.rutina = rutina;
        this.store.dispatch(cargarEjercicio({ id: rutina.id }));
        this.rutinaSubs.unsubscribe();
      }
    });


    this.configuration();
  }

  handleDateClick(arg: any) {
    console.log(arg);
  }

  openRoutine(data) {
    console.log(data.event._def.extendedProps);
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
    this.getMondays();
    this.getWednesday();
    this.getFriday();
  }

  getWednesday() {
    var miercoles = moment().startOf('month').day('Wednesday');
    if (miercoles.date() > 7) miercoles.add(7, 'd');
    var month = miercoles.month();
    while (month === miercoles.month()) {
      let dateTime = moment(miercoles).format(this.format);
      this.events.push({
        title: 'Full Body Workout',
        date: dateTime,
        finish: false,
      });
      miercoles.add(7, 'd');
    }
  }

  getMondays() {
    var monday = moment().startOf('month').day('Monday');
    if (monday.date() > 7) monday.add(7, 'd');
    var month = monday.month();
    while (month === monday.month()) {
      let dateTime = moment(monday).format(this.format);
      this.events.push({
        title: 'Full Body Workout',
        date: dateTime,
        finish: false,
      });
      monday.add(7, 'd');
    }
  }

  getFriday() {
    var friday = moment().startOf('month').day('Friday');
    if (friday.date() > 7) friday.add(7, 'd');
    var month = friday.month();
    while (month === friday.month()) {
      let dateTime = moment(friday).format(this.format);
      this.events.push({
        title: 'Full Body Workout',
        date: dateTime,
        finish: false,
      });
      friday.add(7, 'd');
    }
  }
}
