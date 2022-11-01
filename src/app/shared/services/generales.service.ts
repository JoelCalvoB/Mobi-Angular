import { Injectable } from '@angular/core';
import { first, Observable, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {
  private prdMostrarmenu!:Subject<void> ;

  constructor(private http:HttpClient) { 
    
  }
  
 
   public serviciomenu(){
    this.prdMostrarmenu =  new Subject<void>();
    return this.prdMostrarmenu;
   }

  public showMenu(){
    this.prdMostrarmenu.next();
  }
}
