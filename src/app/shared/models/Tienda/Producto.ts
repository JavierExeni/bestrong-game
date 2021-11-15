export class Producto {
  constructor(
    public description: string,
    public nombre: string,
    public path_video: string,
    public precio_pts: number,
    public tipo_producto: number,
    public id?: number,
    public file?: string
  ) {}
}
