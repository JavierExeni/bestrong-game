import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { Producto } from '../../../shared/models/Tienda/Producto';
import { TIPO_PRODUCTO } from '../../../shared/Enums';
import { Cliente } from '../../../shared/models/User/Cliente';
import { cargarUsuario } from '../../../store/actions/usuario.actions';

@Component({
  selector: 'app-inventario-all',
  templateUrl: './inventario-all.component.html',
  styleUrls: ['./inventario-all.component.scss'],
})
export class InventarioAllComponent implements OnInit {
  productos: Producto[] = [];

  panelOpenState = false;

  cliente: Cliente;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('inventario').subscribe(({ productos }) => {
      let olduser = localStorage.getItem('user');
      if (olduser) this.cliente = JSON.parse(olduser);
      this.productos = this.cliente.producto;
    });
  }

  getTipo(tipo) {
    return TIPO_PRODUCTO[tipo];
  }
}
