import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BodyType } from '../../shared/models/User/BodyInfo';

@Injectable({
  providedIn: 'root',
})
export class BodyinfoService {
  constructor(private http: HttpClient) {}

  crearBodyInfo(body: BodyType) {
    let newbody: BodyType = {
      ...body,
    };
    const url = `${environment.apibase}auth/bodyInfo/`;
    return this.http.post(url, newbody);
  }
}
