import { Component, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger("abriendomenu", [
      state("abrir", style({
        display: 'block',
      })),
      state("cerrar", style({
        width: '0px',
        opacity: 0.0
      })),
      transition("abrir => cerrar", [
        animate('0.2s')
      ]),
      transition("cerrar => abrir", [
        animate('0.2s')])]
    )]
})
export class MenuComponent implements OnInit {

  public mostrar:boolean = true;

  constructor(private generalesPrd:GeneralesService) { }

  ngOnInit(): void {
    this.generalesPrd.serviciomenu().subscribe(datos =>{
      console.log("entra");
      this.mostrar = !this.mostrar;
    });
  }

}
