import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MY_EMPRESA_DATA } from '../tokens/tokensProviders';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private base64Empresa:string = "";
  constructor(@Inject(MY_EMPRESA_DATA) private empresa:BehaviorSubject<any>) {



  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.base64Empresa = btoa(JSON.stringify(sessionStorage.getItem("empresa")||{}));
    req = req.clone({
      headers:new HttpHeaders({
          'Content-type':'application/json',
          'Authorization':`Bearer ${sessionStorage.getItem("token")}`,
          'empresa':`${this.base64Empresa}`
      })
    });
    return next.handle(req);
  }
}
