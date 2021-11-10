import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  constructor(private http: HttpClient) {}

  getRutinasByNivel(nivel_rutina_id: number) {
    let body = {
      nivel: nivel_rutina_id,
    };
    const url = `${environment.apibase}rutinas/rutina/lista-rutinas/`;
    return this.http.post(url, body);
  }
}
