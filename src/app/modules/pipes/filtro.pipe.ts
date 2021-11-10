import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from 'src/app/store/actions';
import { Producto } from '../../shared/models/Tienda/Producto';

@Pipe({
  name: 'filtroProducto',
})
export class FiltroPipe implements PipeTransform {
  transform(producto: Producto[], filtro: filtrosValidos): Producto[] {
    switch (filtro) {
      case 'Receta':
        return producto.filter((prod) => prod.tipo_producto === 0);
      case 'Truco':
        return producto.filter((prod) => prod.tipo_producto === 1);
      default:
        return producto;
    }
  }
}
