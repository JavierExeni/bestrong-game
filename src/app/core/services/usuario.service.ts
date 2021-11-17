import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/shared/models/User/Cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  insertarUsuario(cliente: Cliente) {
    const url = `${environment.apibase}auth/user/`;
    return this.http.post(url, cliente);
  }

  ObtenerUsuarioId(id: number): Observable<any> {
    const url = `${environment.apibase}auth/user/${id}/`;
    return this.http.get(url);
  }

  actualizarUsuario(id: number, cliente: Cliente) {
    const url = `${environment.apibase}auth/user/${id}/`;
    return this.http.patch(url, cliente);
  }

  getRutinasByUser(id: number) {
    let body = {
      user: 1,
    };
    const url = `${environment.apibase}auth/user/get-rutina/`;
    return this.http.post(url, body);
  }
}
