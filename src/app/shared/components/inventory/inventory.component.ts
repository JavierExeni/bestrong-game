import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Producto } from '../../models/Tienda/Producto';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('inventario').subscribe(({ productos }) => {
      this.productos = productos;
    });
  }

}
