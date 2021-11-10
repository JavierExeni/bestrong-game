import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  constructor(private http: HttpClient) {}

  getActividadesByLeccion(leccion_id: number) {
    let body = {
      leccion: leccion_id,
    };
    const url = `${environment.apibase}lecciones/actividad/lista-actividades/`;
    return this.http.post(url, body);
  }

  getOpcionesByActividad(actividad_id: number) {
    let body = {
      actividad: actividad_id,
    };
    const url = `${environment.apibase}lecciones/opcion/lista-opciones/`;
    return this.http.post(url, body);
  }
}
