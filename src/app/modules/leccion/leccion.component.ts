import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LeccionService } from 'src/app/core/services/leccion.service';
import { Leccion } from 'src/app/shared/models/Clases/Leccion';
import { TIPO_NIVEL } from '../../shared/Enums';
import { ActividadComponent } from '../actividad/actividad.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import {
  cargarPuntosUsuario,
  cargarUsuarioSuccess,
} from '../../store/actions/usuario.actions';
import { Cliente } from 'src/app/shared/models/User/Cliente';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leccion',
  templateUrl: './leccion.component.html',
  styleUrls: ['./leccion.component.scss'],
})
export class LeccionComponent implements OnInit, OnDestroy {
  nivel_id?: number;

  lecciones: Leccion[] = [];
  panelOpenState = false;

  cliente: Cliente;

  userSubs: Subscription;

  constructor(
    private route_param: ActivatedRoute,
    private leccionService: LeccionService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.userSubs = this.store.select('usuario').subscribe(({ user }) => {
      console.log(user);
      if (user) {
        this.cliente = user;
      }
    });
    this.route_param.params.subscribe((params) => {
      console.log(params['id']);
      this.nivel_id = params['id'];
    });
    this.getLecciones();
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  getLecciones() {
    this.leccionService.getLeccionesByNivel(this.nivel_id!).subscribe(
      (res: any) => {
        this.lecciones = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getNivel(nivel: number) {
    return TIPO_NIVEL[nivel];
  }

  hacerActividad() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = true;
    dialog_config.autoFocus = true;
    dialog_config.width = '50%';
    dialog_config.data = this.lecciones;
    //dialog_config.panelClass = ['custom_dialog', 'my-dialog'];
    let dialogo = this.dialog.open(ActividadComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          console.log('Resultadoooo');
          Swal.fire({
            icon: 'success',
            title: '¡Genial!',
            text: `¡Haz conseguido ${result.puntos} puntos!`,
            timer: 1500,
          });
          let cliente: Cliente = {
            edad: this.cliente.edad,
            email: this.cliente.email,
            first_name: this.cliente.first_name,
            last_name: this.cliente.last_name,
            genero: this.cliente.genero,
            password: this.cliente.password,
            username: this.cliente.username,
            puntos: this.cliente.puntos + result.puntos,
            id: this.cliente.id,
            bodyinfo: this.cliente.bodyinfo['id'],
            producto: this.cliente.producto['id'],
          };
          this.store.dispatch(cargarUsuarioSuccess({ cliente }));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
