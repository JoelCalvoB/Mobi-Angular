import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

constructor(private http:HttpClient) { }

  public getRoles(){
    return this.http.get(`${environment.urlAdmin}/catalogos/roles`);
  }

  public guardar(request:any):Observable<any>{
    const json = JSON.stringify(request);
    return this.http.post(`${environment.urlAdmin}/catalogos/roles`,json);
  }

}
