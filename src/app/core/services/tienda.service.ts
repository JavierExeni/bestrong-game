import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  constructor(private http: HttpClient) {}

  getproducts() {
    const url = `${environment.apibase}tienda/producto/`;
    return this.http.get(url);
  }

  getproductById(id: number) {
    const url = `${environment.apibase}tienda/producto/${id}/`;
    return this.http.get(url);
  }
}
