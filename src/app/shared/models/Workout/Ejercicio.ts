export class Ejercicio {
  constructor(
    public id: number,
    public nombre: string,
    public sets: number,
    public reps: number,
    public rest: string,
    public rutina: number,
    public path_video?: string,
    public file?: string
  ) {}
}
