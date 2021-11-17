import { Producto } from '../Tienda/Producto';
export class Cliente {
  constructor(
    public edad: number,
    public genero: number,
    public email: string,
    public first_name: string,
    public last_name: string,
    public password: string,
    public username: string,
    public id?: number,
    public puntos?: number,
    public bodyinfo?: number,
    public producto?: any[],
  ) {}
}
