import { Injectable } from '@angular/core';
import { first, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {
  private prdMostrarmenu!:Subject<void> ;

  constructor() { }
  
 
   public serviciomenu(){
    this.prdMostrarmenu =  new Subject<void>();
    return this.prdMostrarmenu;
   }

  public showMenu(){
    this.prdMostrarmenu.next();
  }
}
