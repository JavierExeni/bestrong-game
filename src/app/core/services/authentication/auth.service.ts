import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable, EMPTY } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Login } from '../../../shared/models/Auth/login';
import { environment } from '../../../../environments/environment';
import { Token } from '../../../shared/models/Auth/token';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'access_cl';
  private readonly REFRESH_TOKEN = 'refresh_cl';
  private loggedUser: string = '';

  user: any = null;

  ItsValid = false;

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {}

  login(user: Login): Observable<boolean> {
    return this.http.post<any>(environment.auth.login, user).pipe(
      tap((tokens:any) => {
        const decoded = helper.decodeToken(tokens['access']);
        console.log(decoded);
        //let type = decoded['user_type'];
        this.doLoginUser(user.username, tokens);
      }),
      mapTo(true)
    );
  }

  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    if (this.getJwtToken()) {
      return true;
    }
    return false;
  }

  refreshToken() {
    return this.http.post<any>(environment.auth.refresh, {
      refresh: this.getRefreshToken(),
    });
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Token) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  setUser(nombre: string) {
    let token = this.getJwtToken();
    if (token) {
      const decoded = helper.decodeToken(token);
      this.user = {
        user_id: decoded['user_id'],
        user_type: decoded['user_type'],
        nombre: nombre,
      };
    }
  }

  getUser() {
    let token = this.getJwtToken();
    if (token) {
      const decoded = helper.decodeToken(token);
      this.user = {
        user_id: decoded['user_id'],
        user_type: decoded['user_type'],
      };
      return this.user;
    }
    return null;
  }

  getHasUser(): boolean {
    let hasUser: boolean = false;
    var stringValue = localStorage.getItem('hasUser');
    hasUser = stringValue == 'true';
    return hasUser;
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Token) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.clear();
  }
}
