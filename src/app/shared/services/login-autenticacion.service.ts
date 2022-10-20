import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { autenticacion } from 'src/app/core/modelos/autenticacion';
import { Usuario } from 'src/app/core/modelos/usuarioLogin';
import { myTokenUserIndicator } from 'src/app/core/tokens/tokenRecurso';
import { MY_USER_TOKEN } from 'src/app/core/tokens/tokensProviders';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAutenticacionService {


  constructor(private http: HttpClient, @Inject(MY_USER_TOKEN) private userToken: myTokenUserIndicator) { }
  public login(logearse: autenticacion): Observable<Usuario | boolean> {
    const json = JSON.stringify(logearse);
    return this.http.post(`${environment.urlAdmin}/auth/login`, json).pipe(map((s: any) => this.guardarToken(s.access_token)), catchError(s => of(false)));
  }

  public guardarToken(token: string): Usuario {
    sessionStorage.setItem("token", token);
    const respuesta: Usuario = this.parsearJwt(token);
    this.userToken.setValue = respuesta;
    return respuesta;
  }

  private establecerUsuario(token: string) {
    const respuesta: Usuario = this.parsearJwt(token);
    this.userToken.setValue = respuesta;
  }

  private parsearJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  public obtenerToken(): string {
    const token = sessionStorage.getItem("token") as string;
    if (token) this.establecerUsuario(token);
    return token;
  }

  public cerrarSesion(){
    sessionStorage.setItem("token","");
  }
}
