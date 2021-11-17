import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TiendaComponent } from 'src/app/modules/components/modals/tienda/tienda.component';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { Cliente } from '../../models/User/Cliente';
import { AppState } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { cargarInventario } from '../../../store/actions/inventario.actions';
import { ProfileComponent } from '../../../modules/components/modals/profile/profile.component';
import { LogrosComponent } from '../../../modules/components/modals/logros/logros.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebar_open: boolean = false;

  arrow1: boolean = false;
  arrow2: boolean = false;
  arrow3: boolean = false;

  value: number = 20;

  user!: any;

  cliente: Cliente;

  constructor(
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    Swal.fire({
      title: '¡Cargando Juego!',
      timerProgressBar: true,
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.store.select('usuario').subscribe(({ user }) => {
      console.log('*************************');
      console.log(user);
      let olduser = localStorage.getItem('user');
      if (olduser) this.cliente = JSON.parse(olduser);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        let olduser = localStorage.getItem('user');
        if (olduser) this.cliente = JSON.parse(olduser);
      }
    });
  }

  changeEventBtn() {
    this.sidebar_open = !this.sidebar_open;
  }

  dropdown(tipo: number) {
    switch (tipo) {
      case 1:
        this.arrow1 = !this.arrow1;
        break;
      case 2:
        this.arrow2 = !this.arrow2;
        break;
      case 3:
        this.arrow3 = !this.arrow3;
        break;
    }
  }

  validar() {
    if (this.auth.getUser()) {
      return true;
    }
    return false;
  }

  getValue() {
    return this.cliente?.puntos / 10;
  }

  open_store() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '50%';
    dialog_config.height = '80%';
    //dialog_config.panelClass = ['custom_dialog', 'my-dialog'];
    let dialogo = this.dialog.open(TiendaComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.store.dispatch(cargarInventario({ id: result.id }));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openProfile() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '50%';
    dialog_config.data = this.cliente;
    let dialogo = this.dialog.open(ProfileComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirLogros() {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '30%';
    dialog_config.data = this.cliente;
    let dialogo = this.dialog.open(LogrosComponent, dialog_config);
    dialogo.afterClosed().subscribe(
      (result) => {
        if (result) {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
