export class Actividad {
  constructor(
    public pregunta: string,
    public puntos: number,
    public tipo_actividad: number,
    public leccion: number,
    public id: number
  ) {}
}
