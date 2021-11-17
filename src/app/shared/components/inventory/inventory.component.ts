import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Producto } from '../../models/Tienda/Producto';
import { Cliente } from '../../models/User/Cliente';
import { ProductoDetailComponent } from '../../../modules/components/modals/producto-detail/producto-detail.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  productos: Producto[] = [];

  cliente: Cliente;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select('inventario').subscribe(({ productos }) => {
      let olduser = localStorage.getItem('user');
      if (olduser) this.cliente = JSON.parse(olduser);
      this.productos = this.cliente.producto;
    });
  }

  llevarInventario(producto: Producto) {
    const dialog_config = new MatDialogConfig();
    dialog_config.disableClose = false;
    dialog_config.autoFocus = true;
    dialog_config.width = '50%';
    dialog_config.height = '80%';
    dialog_config.data = producto;
    //dialog_config.panelClass = ['custom_dialog', 'my-dialog'];
    let dialogo = this.dialog.open(ProductoDetailComponent, dialog_config);
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
}
