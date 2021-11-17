import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../../../shared/models/Tienda/Producto';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.scss']
})
export class ProductoDetailComponent implements OnInit {

  constructor(
    private dialog_ref: MatDialogRef<ProductoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
  ) { }

  ngOnInit(): void {
  }

}
