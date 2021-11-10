import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EjercicioService {
  constructor(private http: HttpClient) {}

  getEjerciciosByRutina(rutina_id: number) {
    let body = {
      rutina: rutina_id,
    };
    const url = `${environment.apibase}rutinas/ejercicio/lista-ejercicios/`;
    return this.http.post(url, body);
  }
}
