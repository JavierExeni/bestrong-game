import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeccionService {
  constructor(private http: HttpClient) {}

  getLeccionesByNivel(nivel_id: number) {
    let body = {
      nivel: nivel_id,
    };
    const url = `${environment.apibase}lecciones/leccion/lista-lecciones/`;
    return this.http.post(url, body);
  }
}
