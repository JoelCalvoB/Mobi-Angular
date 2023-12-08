import { Versiones } from './../../core/modelos/usuarioLogin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({providedIn:'root'})
export class VersionesServices{
   constructor(private http:HttpClient){

   }



   public getModulos():Observable<Versiones[]>{
     return this.http.get<Versiones[]>(`${environment.urlAdmin}/catalogos/versiones/modulos`);
   }
}
