import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginAutenticacionService } from "src/app/shared/services/login-autenticacion.service";


@Injectable({
    providedIn:'root'
})
export class protegerRutas implements CanActivate{
    constructor(private auth:LoginAutenticacionService,private routerPrd:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = this.auth.obtenerToken();
        if(!Boolean(token)) return this.routerPrd.parseUrl("/auth/login");
        return Boolean(token);
    }
    
}