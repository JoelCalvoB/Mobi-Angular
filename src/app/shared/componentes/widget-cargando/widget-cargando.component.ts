import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-cargando',
  templateUrl: './widget-cargando.component.html',
  styleUrls: ['./widget-cargando.component.scss']
})
export class WidgetCargandoComponent implements OnInit {

  @Input() mensaje!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
