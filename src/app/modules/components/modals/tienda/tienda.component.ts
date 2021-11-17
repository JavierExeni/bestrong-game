import { Component, OnInit } from '@angular/core';
import { TIPO_PRODUCTO } from 'src/app/shared/Enums';
import { Producto } from 'src/app/shared/models/Tienda/Producto';
import { filtrosValidos } from 'src/app/store/actions';
import { TiendaService } from '../../../../core/services/tienda.service';
import { AppState } from '../../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { setFiltro } from '../../../../store/actions/filtro.actions';
import { Cliente } from 'src/app/shared/models/User/Cliente';
import { cargarUsuarioSuccess } from '../../../../store/actions/usuario.actions';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  productos!: Producto[];
  s;

  filtroActual: filtrosValidos;

  cliente: Cliente;

  noMoney = false;

  constructor(
    private tiendaService: TiendaService,
    private dialog_ref: MatDialogRef<TiendaComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.subscribe(({ filtro, usuario }) => {
      this.filtroActual = filtro;
      let user = localStorage.getItem('user');
      if (user) this.cliente = JSON.parse(user);
      if (usuario.user) {
        console.log(usuario.user);
      }
    });
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.tiendaService.getproducts().subscribe(
      (res: any) => {
        console.log(res);
        this.productos = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerTipoProducto(tipo: number) {
    return TIPO_PRODUCTO[tipo];
  }

  cambiarFiltro(filtro: filtrosValidos) {
    this.store.dispatch(setFiltro({ filtro: filtro }));
  }

  comprar(producto: Producto) {
    if (producto.precio_pts > this.cliente.puntos) {
      this.noMoney = true;
      setTimeout(() => {
        this.noMoney = false;
      }, 2500);
      return;
    }
    let puntos = this.cliente.puntos - producto.precio_pts;
    if (this.cliente.producto) {
      let ids = [];
      this.cliente.producto.forEach((element) => {
        ids.push(element.id);
      });
      this.cliente.producto = [...ids, producto.id];
    } else {
      this.cliente.producto = [producto.id];
    }

    let cliente: Cliente = {
      edad: this.cliente.edad,
      email: this.cliente.email,
      first_name: this.cliente.first_name,
      last_name: this.cliente.last_name,
      genero: this.cliente.genero,
      password: this.cliente.password,
      username: this.cliente.username,
      puntos: puntos,
      id: this.cliente.id,
      bodyinfo: this.cliente.bodyinfo['id'],
      producto: this.cliente.producto,
    };
    console.log('Antes de actualizar usuario');
    console.log(cliente);
    // Se actualiza el usuario
    this.store.dispatch(cargarUsuarioSuccess({ cliente: cliente }));
    this.dialog_ref.close({ id: producto.id });
  }

  validar() {
    return false;
  }
}
