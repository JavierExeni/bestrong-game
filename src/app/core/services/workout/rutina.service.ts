import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rutina } from '../../../shared/models/Workout/Rutina';

@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  constructor(private http: HttpClient) {}

  getRutinaById(id){
    const url = `${environment.apibase}rutinas/rutina/${id}/`;
    return this.http.get(url);
  }

  updateRutinaWithUser(id, rutina: Rutina){
    const url = `${environment.apibase}rutinas/rutina/${id}/`;
    return this.http.patch(url, rutina);
  }

  getRutinasByNivel(nivel_rutina_id: number) {
    let body = {
      nivel: nivel_rutina_id,
    };
    const url = `${environment.apibase}rutinas/rutina/lista-rutinas/`;
    return this.http.post(url, body);
  }

  nextLevel(rutina: number, nivel: number, user: number) {
    let body = {
      rutina: rutina,
      nivel: nivel,
      user: user,
    };
    const url = `${environment.apibase}rutinas/rutina/update-rutina/`;
    return this.http.post(url, body);
  }
}
