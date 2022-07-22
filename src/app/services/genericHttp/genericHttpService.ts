import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {


  constructor(private http: HttpClient) { }

  /* Servicios genericos de HTTP del proyecto */

  postObject<T>(url: string, data: T): Observable<HttpResponse<T>> {
    return this.http.post<T>(url, data, { observe: 'response' });
  }

  getObject<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(url, { observe: 'response' });
  }
 
  putObject<T>(url: string, data: T): Observable<HttpResponse<T>> {
    return this.http.put<T>(url, data, { observe: 'response' });
  }

  deleteObject<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.delete<T>(url, { observe: 'response' });
  }

  /**********************************************/
}
