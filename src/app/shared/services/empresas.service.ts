import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get(`${environment.urlAdmin}/administracion/empresas`);
  }

  public guardar(obj: any): Observable<any> {
    const json = JSON.stringify(obj);
    return this.http.post(
      `${environment.urlAdmin}/administracion/empresas`,
      json
    );
  }
}
