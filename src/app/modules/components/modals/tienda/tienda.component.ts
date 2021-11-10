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

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  productos!: Producto[];

  filtroActual: filtrosValidos;

  cliente: Cliente;

  noMoney = false;

  constructor(
    private tiendaService: TiendaService,
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
      bodyinfo: this.cliente.bodyinfo,
      nivel: this.cliente.nivel,
    };
    this.store.dispatch(cargarUsuarioSuccess({ cliente: cliente }));
  }

  validar() {
    return false;
  }
}
