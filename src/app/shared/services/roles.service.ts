import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

constructor(private http:HttpClient) { }

  public getRoles(){
    return this.http.get(`${environment.urlAdmin}/catalogos/roles`);
  }

}
