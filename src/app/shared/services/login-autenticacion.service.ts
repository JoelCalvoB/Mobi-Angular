import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { autenticacion } from 'src/app/core/modelos/autenticacion';
import { Usuario } from 'src/app/core/modelos/usuarioLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAutenticacionService {

  private _usuario!: Usuario;



  constructor(private http: HttpClient) { }
  public login(logearse: autenticacion): Observable<Usuario | boolean> {
    const json = JSON.stringify(logearse);
    return this.http.post(`${environment.urlAdmin}/auth/login`, json).pipe(map((s: any) => this.guardarToken(s.access_token)), catchError(s => of(false)));
  }

  public guardarToken(token: string): Usuario {
    sessionStorage.setItem("token", token);
    const respuesta = this.parsearJwt(token);
    console.log(respuesta);
    this._usuario = respuesta;
    return this.usuarioSesion;
  }

  private parsearJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  public get usuarioSesion(): Usuario {
    return this._usuario;
  };
}
