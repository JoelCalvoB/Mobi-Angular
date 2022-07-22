import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenericHttpService } from '../genericHttp/GenericHttpService';

declare const Buffer: any;


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  public url: string = environment.url;
  public decodedToken="";

  constructor(private prd: GenericHttpService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let tokenReq;
     // this.decodedToken = atob(localStorage.getItem('tokenPrecua'));
  
    switch (localStorage.getItem('tipo_header')) {
      case 'applicationjson':
        tokenReq = req.clone({
          setHeaders: {
            'Authorization': `${this.decodedToken}`,
            'Content-Type': 'application/json'
          }
        });
        break;
      case 'authorization':
        tokenReq = req.clone({
          setHeaders: {
            'Authorization': `${this.decodedToken}`
          }
        });
        break;
      default:
        tokenReq = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });

        break;
    }
    return next.handle(tokenReq)
  }
}
