import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss'],
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
        animate('0.4s')
      ]),
      transition("cerrar => abrir", [
        animate('0.4s')])]
    )]
})
export class ContenidoComponent implements OnInit {
  public cerrando: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
