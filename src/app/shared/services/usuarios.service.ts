import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/modelos/usuarioLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

constructor(private http:HttpClient) { }

public getAll():Observable<Usuario[]>{
   return this.http.get<Usuario[]>(`${environment.urlAdmin}/administracion/usuarios`);
}

public guardar(request:any){
   return this.http.post(`${environment.urlAdmin}/administracion/usuarios`,JSON.stringify(request));
}

}
